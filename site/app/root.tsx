import type { LinksFunction, LoaderArgs } from "@remix-run/node"

import { cssBundleHref } from "@remix-run/css-bundle"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  V2_MetaFunction,
  useLoaderData,
} from "@remix-run/react"
import React from "react"
import rootStyles from '~/styles/root.css'
import sharedStyles from '~/styles/shared.css'
import tailwindStyles from '~/styles/tailwind.css'
import { Link, Project } from "./models"

export const meta: V2_MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { title: "Matt Mazzola Projects" },
    { name: "description", content: "Matt Mazzola Projects and Experience" },
  ]
}

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : []),
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: rootStyles },
  { rel: "stylesheet", href: sharedStyles },
]

export const loader = async ({ }: LoaderArgs) => {
  const linksResponse = await fetch(process.env.LINKS_JSON_BLOB_URL!)
  const links: Link[] = await linksResponse.json()

  const projectsResponse = await fetch(process.env.PROJECTS_JSON_BLOB_URL!)
  const projects: Project[] = await projectsResponse.json()

  return { links, projects }
}

export default function App() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <html lang="en" className="min-h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen flex flex-col bg-gradient-to-r from-slate-900 via-slate-700 from-10% to-slate-900 text-slate-300 font-sans subpixel-antialiased">
        <header className="container mx-auto flex gap-x-4 justify-between items-center px-10 py-6">
          <img className="h-24 rounded-full outline outline-3 outline-sky-400 shadow-xl shadow-cyan-500/50" src="https://sharedklgoyistorage.blob.core.windows.net/mattmazzola-github-io/images/avatar.png" alt="Matt Mazzola" />
          <div className="text-5xl text-slate-100">Matt Mazzola</div>
          <div className="text-5xl">Projects</div>
          <dl className="hidden xl:grid grid-cols-[max-content_max-content] gap-x-2">
            {loaderData.links.map(link => {
              let { description, href, text } = link
              text = text ?? href

              return (
                <React.Fragment key={href}>
                  <dt className="font-medium">{description ? `${description}: ` : ''}</dt>
                  <dd className="underline"><a href={href} target="_blank" rel="noreferrer">{text}</a></dd>
                </React.Fragment>
              )
            })}
          </dl>
        </header>
        <main className="flex-1">
          <Outlet context={loaderData.projects} />
        </main>
        <footer className="container mx-auto py-12">
          <h3 className="text-2xl text-slate-100 font-bold">Links</h3>
          <dl className="grid grid-cols-[max-content_max-content] gap-x-2">
            {loaderData.links.map(link => {
              let { description, href, text } = link
              text = text ?? href

              return (
                <React.Fragment key={href}>
                  <dt className="font-medium">{description ? `${description}: ` : ''}</dt>
                  <dd className="underline"><a href={href} target="_blank" rel="noreferrer">{text}</a></dd>
                </React.Fragment>
              )
            })}
          </dl>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
