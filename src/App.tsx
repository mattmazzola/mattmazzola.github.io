import React from 'react'
import './App.css'
import * as models from './models'
import Project from './component/Project'
import FeaturedProject from './component/FeaturedProject'
import projects from './projects'

const featuredProject: models.Project | undefined = undefined

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <div className="wrapper">
          <div className="header">
            <img src="images/avatar.png" className="photo" />
            <div className="name">Matt Mazzola</div>
          </div>
        </div>
      </header>
      <main>
        {featuredProject &&
          <FeaturedProject project={featuredProject} />}
        <div className="projects">
          {projects.map(project => (
            <Project project={project} />
          ))}
        </div>
      </main>
      <footer>
        <div className="wrapper">
          <div className="footer">
            <div>
              <h3>Links</h3>
              <ul>
                <li><a href="https://github.com/mattmazzola" target="_blank" rel="noreferrer">https://github.com/mattmazzola</a></li>
                <li><a href="https://github.com/sc2iq" target="_blank" rel="noreferrer">https://github.com/sc2iq</a></li>
                <li><a href="https://mattmazzola.medium.com" target="_blank" rel="noreferrer">https://mattmazzola.medium.com/</a></li>
                <li><a href="https://www.twitter.com/mdmazola" target="_blank" rel="noreferrer">@mdmazzola</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
