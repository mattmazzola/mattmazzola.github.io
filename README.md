# Matt Mazzola (Personal Projects Site)

## Deployment Test

### Setup Context

```bash
az login
# Matt Mazzola - Personal
az account set -n 375b0f6d-8ad5-412d-9e11-15d36d14dc63
az acr login --name sharedklgoyiacr
az account show --query "name" -o tsv
```

### What If Deployment

```powershell
.\scripts\deploy.ps1 -WhatIf:$true
```

## Deployment

```powershell
.\scripts\deploy.ps1 -WhatIf:$false
```
