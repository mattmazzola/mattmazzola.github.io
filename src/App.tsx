import React from 'react'
import './App.css'
import * as models from './models'
import Project from './component/Project'
import FeaturedProject from './component/FeaturedProject'
import projects from './projects'
import links from './links'

const featuredProject: models.Project | undefined = undefined

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <div className="wrapper">
          <div className="header">
            <img src="images/avatar.png" alt="Matt Mazzola" className="photo" />
            <div className="name">Matt Mazzola</div>
            <div>Personal Projects</div>
            <div className="links">
              <dl>
                {links.map(link => {
                  let { description, href, text } = link
                  text = text ?? href

                  return (
                    <>
                      <dt>{description ? `${description}: ` : ''}</dt>
                      <dd><a href={href} target="_blank" rel="noreferrer">{text}</a></dd>
                    </>
                  )
                })}
              </dl>
            </div>
          </div>
        </div>
      </header>
      <main>
        {featuredProject &&
          <FeaturedProject project={featuredProject} />}
        <div className="projects">
          {projects.map((project, i) => (
            <Project key={i} project={project} />
          ))}
        </div>
      </main>
      <footer>
        <div className="wrapper">
          <div className="footer">
            <div>
              <h3>Links</h3>
              <ul>
                {links.map(link => {
                  let { href, text } = link
                  text = text ?? href

                  return (
                    <li><a href={href} target="_blank" rel="noreferrer">{text}</a></li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}

export default App
