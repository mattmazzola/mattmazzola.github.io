# Matt Mazzola Personal Site

Location to give overview of the projects I've worked on over the years

## Instructions to Deploy Site

Current it is manually run locally so that updated /docs folder will be included in push
Would be nice to automate with github actions

1. npm run build
1. rm -r -fo -ErrorAction ignore docs
1. mv build docs
1. Commit updated /docs
1. git push