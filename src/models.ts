export type Project = {
    name: string

    imgUrl: string
    codeUrl: string
    websiteUrl?: string
    articleUrl?: string

    description: string
}

export type Link = {
    href: string
    text?: string
}