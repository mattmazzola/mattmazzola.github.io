export type Project = {
    name: string

    imgUrl: string
    codeUrl: string
    websiteUrl?: string
    articleUrl?: string

    description: string
}

export type Link = {
    description?: string
    href: string
    text?: string
}