Param([switch]$WhatIf = $True)

echo "PScriptRoot: $PScriptRoot"
$repoRoot = If ('' -eq $PScriptRoot) {
  "$PSScriptRoot/.."
}
else {
  "."
}

echo "Repo Root: $repoRoot"

Import-Module "$repoRoot/../shared-resources/pipelines/scripts/common.psm1" -Force

$inputs = @{
  "WhatIf" = $WhatIf
}

Write-Hash "Inputs" $inputs

$sharedResourceGroupName = "shared"
$sharedRgString = 'klgoyi'
$resourceGroupLocation = "westus3"
$personalProjectsResourceGroupName = "personalprojects"

Write-Step "Fetch params from Azure"
$sharedResourceVars = Get-SharedResourceDeploymentVars $sharedResourceGroupName $sharedRgString

$clientContainerName = "$personalProjectsResourceGroupName-client"
$clientImageTag = $(Get-Date -Format "yyyyMMddhhmm")
$clientImageName = "$($sharedResourceVars.registryUrl)/${clientContainerName}:${clientImageTag}"

$envFilePath = "$repoRoot/site/.env"
Write-Step "Fetch Vars from .env File: $envFilePath"
$linksJsonBlobUrl = Get-EnvVarFromFile -envFilePath $envFilePath -variableName 'LINKS_JSON_BLOB_URL'
$projectsJsonBlobUrl = Get-EnvVarFromFile -envFilePath $envFilePath -variableName 'PROJECTS_JSON_BLOB_URL'

$data = [ordered]@{
  "clientImageName"             = $clientImageName

  "containerAppsEnvResourceId"  = $($sharedResourceVars.containerAppsEnvResourceId)
  "registryUrl"                 = $($sharedResourceVars.registryUrl)
  "registryUsername"            = $($sharedResourceVars.registryUsername)
  "registryPassword"            = "$(Write-Secret $sharedResourceVars.registryPassword)"
  "linksJsonBlobUrl"            = "$(Write-Secret $linksJsonBlobUrl)"
  "projectsJsonBlobUrl"         = "$(Write-Secret $projectsJsonBlobUrl)"
}

Write-Hash "Data" $data

Write-Step "Create Resource Group $personalProjectsResourceGroupName"
az group create -l $resourceGroupLocation -g $personalProjectsResourceGroupName --query name -o tsv

Write-Step "Provision $personalProjectsResourceGroupName Resources (What-If: $($WhatIf))"

Write-Step "Build $clientImageName Image (What-If: $($WhatIf))"
docker build -t $clientImageName "$repoRoot/site"

if ($WhatIf -eq $False) {
  Write-Step "Push $clientImageName Image (What-If: $($WhatIf))"
  docker push $clientImageName
  # az acr build -r $registryUrl -t $clientImageName ./site
}
else {
  Write-Step "Skipping Push $clientImageName Image (What-If: $($WhatIf))"
}

Write-Step "Get Top Image from $($sharedResourceVars.registryUrl) respository $clientContainerName to Verify Push (What-If: $($WhatIf))"
az acr repository show-tags --name $($sharedResourceVars.registryUrl)  --repository $clientContainerName --orderby time_desc --top 1 -o tsv

Write-Step "Deploy $clientImageName Container App (What-If: $($WhatIf))"
$clientBicepContainerDeploymentFilePath = "$repoRoot/bicep/modules/clientContainerApp.bicep"

if ($WhatIf -eq $True) {
  az deployment group create `
    -g $personalProjectsResourceGroupName `
    -f $clientBicepContainerDeploymentFilePath `
    -p managedEnvironmentResourceId=$($sharedResourceVars.containerAppsEnvResourceId) `
    registryUrl=$($sharedResourceVars.registryUrl) `
    registryUsername=$($sharedResourceVars.registryUsername) `
    registryPassword=$($sharedResourceVars.registryPassword) `
    imageName=$clientImageName `
    containerName=$clientContainerName `
    linksJsonBlobUrl=$linksJsonBlobUrl `
    projectsJsonBlobUrl=$projectsJsonBlobUrl `
    --what-if
}
else {
  $clientFqdn = $(az deployment group create `
      -g $personalProjectsResourceGroupName `
      -f $clientBicepContainerDeploymentFilePath `
      -p managedEnvironmentResourceId=$($sharedResourceVars.containerAppsEnvResourceId) `
      registryUrl=$($sharedResourceVars.registryUrl) `
      registryUsername=$($sharedResourceVars.registryUsername) `
      registryPassword=$($sharedResourceVars.registryPassword) `
      imageName=$clientImageName `
      containerName=$clientContainerName `
      linksJsonBlobUrl=$linksJsonBlobUrl `
      projectsJsonBlobUrl=$projectsJsonBlobUrl `
      --query "properties.outputs.fqdn.value" `
      -o tsv)
  
  $clientUrl = "https://$clientFqdn"
  Write-Output $clientUrl
}
