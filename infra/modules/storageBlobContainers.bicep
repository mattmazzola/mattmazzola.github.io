param uniqueRgString string

// global	3-24 Alphanumerics.
// https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-name-rules#microsoftstorage
@minLength(3)
@maxLength(24)
param storageAccountName string = '${resourceGroup().name}${uniqueRgString}storage'

resource storageAccount 'Microsoft.Storage/storageAccounts@2025-01-01' existing = {
  name: storageAccountName
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2025-01-01' existing = {
  parent: storageAccount
  name: 'default'
}

resource staticFilesContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' = {
  parent: blobService
  name: 'mattmazzola-github-io'
  properties: {
    publicAccess: 'Blob'
  }
}

// Public HTTPS URL to the container (since publicAccess = 'Blob')
// Use the storage account's primary blob endpoint to avoid hardcoding cloud suffixes
output staticFilesContainerUrl string = '${storageAccount.properties.primaryEndpoints.blob}${staticFilesContainer.name}'
