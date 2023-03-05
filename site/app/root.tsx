import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import rootStyles from '~/styles/root.css'
import sharedStyles from '~/styles/shared.css'
import tailwindStyles from '~/styles/tailwind.css'
import dataLinks from '~/data/links'
import React from "react"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Matt Mazzola Projects",
  description: "Matt Mazzola Projects and Experience",
  viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: rootStyles },
  { rel: "stylesheet", href: sharedStyles },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <div className="centerWrapper">
            <div className="headerContent">
              <img className="photo" src="images/avatar.png" alt="Matt Mazzola" />
              <div>Matt Mazzola</div>
              <div>Personal Projects</div>
              <div className="headerLinks">
                <dl>
                  {dataLinks.map(link => {
                    let { description, href, text } = link
                    text = text ?? href

                    return (
                      <React.Fragment key={href}>
                        <dt>{description ? `${description}: ` : ''}</dt>
                        <dd><a href={href} target="_blank" rel="noreferrer">{text}</a></dd>
                      </React.Fragment>
                    )
                  })}
                </dl>
              </div>
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <div className="centerWrapper">
            <div className="footerContent">
              <div>
                <h3>Links</h3>
                <ul>
                  {dataLinks.map(link => {
                    let { href, text } = link
                    text = text ?? href

                    return (
                      <li key={href}><a href={href} target="_blank" rel="noreferrer">{text}</a></li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
