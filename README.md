# Matt Mazzola (Personal Projects Site)

## Deployment Test

```powershell
az login
az acr login --name sharedklgoyiacr

.\scripts\deploy.ps1 -WhatIf:$true
```

## Deployment

```powershell
.\scripts\deploy.ps1 -WhatIf:$false
```