$sharedResourceGroupName = "shared"
$sharedRgString = 'klgoyi'
$resourceGroupLocation = "westus3"
$personalProjectsResourceGroupName = "personalprojects"

Import-Module "C:/repos/shared-resources/pipelines/scripts/common.psm1" -Force

Write-Step "Create Resource Group"
az group create -l $resourceGroupLocation -g $personalProjectsResourceGroupName --query name -o tsv

Write-Step "Fetch params from Azure"
$sharedResourceNames = Get-ResourceNames $sharedResourceGroupName $sharedRgString

$containerAppsEnvResourceId = $(az containerapp env show -g $sharedResourceGroupName -n $sharedResourceNames.containerAppsEnv --query "id" -o tsv)
$acrJson = $(az acr credential show -n $sharedResourceNames.containerRegistry --query "{ username:username, password:passwords[0].value }" | ConvertFrom-Json)
$registryUrl = $(az acr show -g $sharedResourceGroupName -n $sharedResourceNames.containerRegistry --query "loginServer" -o tsv)
$registryUsername = $acrJson.username
$registryPassword = $acrJson.password

$clientContainerName = "$personalProjectsResourceGroupName-client"
$clientImageTag = $(Get-Date -Format "yyyyMMddhhmm")
$clientImageName = "${registryUrl}/${clientContainerName}:${clientImageTag}"

$data = [ordered]@{
  "clientImageName"             = $clientImageName

  "containerAppsEnvResourceId"  = $containerAppsEnvResourceId
  "registryUrl"                 = $registryUrl
  "registryUsername"            = $registryUsername
  "registryPassword"            = "$($registryPassword.Substring(0, 5))..."
}

Write-Hash "Data" $data

Write-Step "Build and Push $clientImageName Image"
docker build -t $clientImageName ./site
docker push $clientImageName
# az acr build -r $registryUrl -t $clientImageName ./site

Write-Step "Deploy $clientImageName Container App"
$clientBicepContainerDeploymentFilePath = "$PSScriptRoot/../bicep/modules/clientContainerApp.bicep"
$clientFqdn = $(az deployment group create `
    -g $personalProjectsResourceGroupName `
    -f $clientBicepContainerDeploymentFilePath `
    -p managedEnvironmentResourceId=$containerAppsEnvResourceId `
    registryUrl=$registryUrl `
    registryUsername=$registryUsername `
    registryPassword=$registryPassword `
    imageName=$clientImageName `
    containerName=$clientContainerName `
    --query "properties.outputs.fqdn.value" `
    -o tsv)

$clientUrl = "https://$clientFqdn"
Write-Output $clientUrl
