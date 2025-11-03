param name string = '${resourceGroup().name}-client'
param location string = resourceGroup().location
param tags object = {}

param managedEnvironmentResourceId string

param imageName string
param containerName string

param registryUsername string
@secure()
param registryPassword string

param projectsJsonBlobUrl string
param linksJsonBlobUrl string

var registryPasswordName = 'container-registry-password'

resource containerApp 'Microsoft.App/containerapps@2022-03-01' = {
  name: name
  location: location
  tags: tags
  properties: {
    managedEnvironmentId: managedEnvironmentResourceId
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: {
        external: true
        targetPort: 8080
      }
      registries: [
        {
          server: '${registryUsername}.azurecr.io'
          username: registryUsername
          passwordSecretRef: registryPasswordName
        }
      ]
      secrets: [
        {
          name: registryPasswordName
          value: registryPassword
        }
      ]
    }
    template: {
      containers: [
        {
          name: containerName
          image: imageName
          // https://learn.microsoft.com/en-us/azure/container-apps/containers#configuration
          resources: {
            cpu: any('0.25')
            memory: '0.5Gi'
          }
          env: [
            {
              name: 'LINKS_JSON_BLOB_URL'
              value: linksJsonBlobUrl
            }
            {
              name: 'PROJECTS_JSON_BLOB_URL'
              value: projectsJsonBlobUrl
            }
          ]
        }
      ]
      scale: {
        minReplicas: 0
        maxReplicas: 1
      }
    }
  }
}

output name string = containerApp.name
output appUrl string = 'https://${containerApp.properties.configuration.ingress.fqdn}'
