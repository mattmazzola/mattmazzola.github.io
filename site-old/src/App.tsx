import React from 'react'
import * as models from './models'
import Project from './component/Project'
import FeaturedProject from './component/FeaturedProject'
import projects from './projects'
import links from './links'
import styled from 'styled-components'

const featuredProject: models.Project | undefined = undefined

const App: React.FC = () => {
  return (
    <AppWrapper>
      <Header>
        <CenterWrapper>
          <HeaderContent>
            <Photo src="images/avatar.png" alt="Matt Mazzola" />
            <Name>Matt Mazzola</Name>
            <div>Personal Projects</div>
            <HeaderLinks>
              <dl>
                {links.map(link => {
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
            </HeaderLinks>
          </HeaderContent>
        </CenterWrapper>
      </Header>
      <Main>
        {featuredProject &&
          <FeaturedProject project={featuredProject} />}
        <Projects>
          {projects.map((project, i) => (
            <Project key={i} project={project} />
          ))}
        </Projects>
      </Main>
      <Footer>
        <CenterWrapper>
          <FooterContent>
            <div>
              <h3>Links</h3>
              <ul>
                {links.map(link => {
                  let { href, text } = link
                  text = text ?? href

                  return (
                    <li key={href}><a href={href} target="_blank" rel="noreferrer">{text}</a></li>
                  )
                })}
              </ul>
            </div>
          </FooterContent>
        </CenterWrapper>
      </Footer>
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  min-height: 100vh;

  display: grid;
  grid-template-rows: min-content 1fr min-content;
`

const Header = styled.header`
  padding: 1rem;
`

const CenterWrapper = styled.div`
  margin: 0 auto;
  max-width: 1400px;
`
 
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  font-size: 3rem;
  flex-wrap: wrap;
`

const HeaderLinks = styled.div`
  font-size: 1rem;
  color: hsl(0, 0%, 30%);

  & a {
    color: hsl(224, 51%, 32%);
  }
`

const Photo = styled.img`
  border: 4px solid hsl(192, 48%, 62%);
  border-radius: 50%;
  box-shadow: var(--shadow-elevation-high);
  background-color: grey;
  width: 82px;
  line-height: 0;
`

const Name = styled.div`
`

const Main = styled.div`
  background-color: hsl(197, 6%, 22%);
`

const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`

const Footer = styled.footer`
  padding: 2rem;
`

const FooterContent = styled.div`
  padding-bottom: 2em;

  & a:link,
  & a:visited {
    color: black;
  }
`



export default App
