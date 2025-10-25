# Matt Mazzola (Personal Projects Site)

## Deployment Test

### Setup Context

```bash
az login
az account set -n "Matt Mazzola - Personal Projects Recovered"
az account show --query "name" -o tsv
az acr login --name sharedklgoyiacr
```

### What If Deployment

```powershell
.\scripts\deploy.ps1 -WhatIf:$true
```

## Deployment

```powershell
.\scripts\deploy.ps1 -WhatIf:$false
```
