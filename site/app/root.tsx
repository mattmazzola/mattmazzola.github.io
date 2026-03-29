import type { LinksFunction } from "@remix-run/node"
import type { MetaFunction } from "@remix-run/react"

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react"
import React from "react"
import rootStyles from '~/styles/root.css?url'
import sharedStyles from '~/styles/shared.css?url'
import tailwindStyles from '~/styles/tailwind.css?url'
import { Link, Project } from "./models"

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { title: "Matt Mazzola Projects" },
    { name: "description", content: "Matt Mazzola Projects and Experience" },
  ]
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: rootStyles },
  { rel: "stylesheet", href: sharedStyles },
]

export const clientLoader = async () => {
  const linksUrl = import.meta.env.VITE_LINKS_JSON_URL
  const projectsUrl = import.meta.env.VITE_PROJECTS_JSON_URL

  const missing = [
    !linksUrl && "VITE_LINKS_JSON_URL",
    !projectsUrl && "VITE_PROJECTS_JSON_URL",
  ].filter(Boolean)

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
      `Make sure they are defined in your .env or .env.development file with the VITE_ prefix.`
    )
  }

  const linksResponse = await fetch(linksUrl)
  const links: Link[] = await linksResponse.json()

  const projectsResponse = await fetch(projectsUrl)
  const projects: Project[] = await projectsResponse.json()

  return { links, projects }
}

// Always rendered — wraps App, HydrateFallback, and ErrorBoundary alike.
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen flex flex-col bg-gradient-to-r from-slate-900 via-slate-700 from-10% to-slate-900 text-slate-300 font-sans subpixel-antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

// Shown while clientLoader is running.
export function HydrateFallback() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <p className="text-slate-400 text-lg">Loading…</p>
    </main>
  )
}

// Shown when clientLoader (or any child route) throws.
export function ErrorBoundary() {
  const error = useRouteError()
  const message = error instanceof Error ? error.message : String(error)

  return (
    <main className="flex-1 container mx-auto px-10 py-16 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-red-400">Application Error</h1>
      <pre className="text-sm bg-slate-800 rounded p-4 overflow-auto whitespace-pre-wrap">{message}</pre>
    </main>
  )
}

export default function App() {
  const loaderData = useLoaderData<typeof clientLoader>()

  return (
    <>
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
    </>
  )
}
