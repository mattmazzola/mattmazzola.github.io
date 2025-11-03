targetScope = 'subscription'

param environmentName string
param location string

param sharedResourceGroupName string
param sharedContainerAppsEnvironmentName string
param sharedAcrName string

param resourceGroupName string
param containerAppName string = '${resourceGroupName}-client'

resource sharedRg 'Microsoft.Resources/resourceGroups@2025-04-01' existing= {
  name: sharedResourceGroupName
}

var uniqueRgString = take(uniqueString(sharedRg.id), 6)

resource sharedContainerAppsEnv 'Microsoft.App/managedEnvironments@2025-02-02-preview' existing = {
  name: sharedContainerAppsEnvironmentName
  scope: sharedRg
}

resource sharedAcr 'Microsoft.ContainerRegistry/registries@2025-05-01-preview' existing = {
  name: sharedAcrName
  scope: sharedRg
}


module storageBlobContainers 'modules/storageBlobContainers.bicep' = {
  name: 'storageBlobContainersModule'
  scope: sharedRg
  params: {
    uniqueRgString: uniqueRgString
  }
}

var linksJsonBlobUrl = '${storageBlobContainers.outputs.staticFilesContainerUrl}/links.json'
var projectsJsonBlobUrl = '${storageBlobContainers.outputs.staticFilesContainerUrl}/projects.json'

var tags = {
  'azd-env-name': '${containerAppName}-${environmentName}' // e.g., "shared-dev", "shared-prod"
  project: resourceGroupName
}

resource rg 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  name: resourceGroupName
  location: location
  tags: tags
}

param containerAppImageName string = ''
var defaultImageName = 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'

module clientContainerApp 'modules/clientContainerApp.bicep' = {
  name: 'clientContainerAppModule'
  scope: resourceGroup(resourceGroupName)
  params: {
    name: containerAppName
    location: location
    tags: union(tags, { 'azd-service-name': 'site' })
    imageName: !empty(containerAppImageName) ? containerAppImageName : defaultImageName
    registryUsername: sharedAcr.name
    managedEnvironmentResourceId: sharedContainerAppsEnv.id
    containerName: containerAppName
    registryPassword: sharedAcr.listCredentials().passwords[0].value
    linksJsonBlobUrl: linksJsonBlobUrl
    projectsJsonBlobUrl: projectsJsonBlobUrl
  }
}

// Outputs required by azd
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output AZURE_RESOURCE_GROUP string = rg.name

// Outputs for the services
output SERVICE_SITE_NAME string = clientContainerApp.outputs.name
output SERVICE_SITE_ENDPOINT string = clientContainerApp.outputs.appUrl

// Convenience outputs for the shared static files container
output BLOB_CONTAINER_URL string = storageBlobContainers.outputs.staticFilesContainerUrl
output LINKS_JSON_BLOB_URL string = linksJsonBlobUrl
output PROJECTS_JSON_BLOB_URL string = projectsJsonBlobUrl
