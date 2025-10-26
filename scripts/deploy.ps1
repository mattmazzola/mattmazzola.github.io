Param([switch]$WhatIf = $True)

$scriptPath = $MyInvocation.MyCommand.Path
$scriptDir = Split-Path $scriptPath

# Find repo root by searching upward for README.md
$currentDir = $scriptDir
$repoRoot = $null
while ($currentDir -and -not $repoRoot) {
  if (Test-Path (Join-Path $currentDir "README.md")) {
    $repoRoot = $currentDir
  }
  else {
    $currentDir = Split-Path $currentDir
  }
}
if (-not $repoRoot) {
  throw "Could not find repo root (no README.md found in parent directories)."
}

echo "Script Path: $scriptPath"
echo "Script Dir: $scriptDir"
echo "Repo Root: $repoRoot"

$sharedModulePath = Resolve-Path "$repoRoot/../shared-resources/pipelines/scripts/common.psm1"

echo "Shared Module Path: $sharedModulePath"

Import-Module $sharedModulePath -Force

$inputs = @{
  "WhatIf" = $WhatIf
}

Write-Hash "Inputs" $inputs

$sharedResourceGroupName = "shared"
$sharedRgString = 'klgoyi'
$resourceGroupLocation = "westus3"
$personalProjectsResourceGroupName = "personalprojects"

$sharedResourceNames = Get-ResourceNames $sharedResourceGroupName $sharedRgString

Write-Step "Fetch params from Azure"
$sharedResourceVars = Get-SharedResourceDeploymentVars $sharedResourceGroupName $sharedRgString

Write-Step "Provision Additional $sharedResourceGroupName Resources (What-If: $($WhatIf))"
$mainBicepFile = "$repoRoot/bicep/main.bicep"

if ($WhatIf -eq $True) {
  az deployment group create `
    -g $sharedResourceGroupName `
    -f $mainBicepFile `
    --what-if
}
else {
  az deployment group create `
    -g $sharedResourceGroupName `
    -f $mainBicepFile `
    --query "properties.provisioningState" `
    -o tsv
}

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
  "linksJsonBlobUrl"            = $linksJsonBlobUrl
  "projectsJsonBlobUrl"         = $projectsJsonBlobUrl
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
