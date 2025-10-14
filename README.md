# Matt Mazzola (Personal Projects Site)

## Deployment Test

```powershell
az login
az account set -n "Matt Mazzola - Personal Projects"
az account show --query "name"
az acr login --name sharedzkpwxzacr

.\scripts\deploy.ps1 -WhatIf:$true
```

## Deployment

```powershell
.\scripts\deploy.ps1 -WhatIf:$false
```
