import React from 'react'
import * as models from '../models'
import styled from 'styled-components'

type Props = {
    project: models.Project
}

const Project: React.FC<Props> = ({ project }) => {

    return (
        <Wrapper className="project" href={project.websiteUrl ?? project.articleUrl ?? project.codeUrl} target="_blank" rel="noreferrer">
            <PreviewImage src={project.imgUrl} alt={`${project.name} project`} />
            <Metadata>
                <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
                {(project.articleUrl || project.websiteUrl) && (
                    <Buttons>
                        {project.articleUrl
                            && <ArticleButton href={project.articleUrl} target="_blank" rel="noreferrer">Article</ArticleButton>}
                        <CodeButton href={project.codeUrl} target="_blank" rel="noreferrer">Code</CodeButton>
                    </Buttons>
                )}
            </Metadata>
        </Wrapper>
    )
}

const PreviewImage = styled.img`
    transition: all 0.5s ease-out;

    & p {
        color: hsl(0, 0%, 76%);
    }
`

const Metadata = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1rem;

    align-items: end;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    padding: 1rem;
    color: hsl(0, 0%, 85%);
    background-color: hsla(0, 0%, 0%, 0.6);

    & h2, h3, h4 {
        margin: 0;
        padding: 0;
    }

    & p {
        margin: 0;
        padding: 0;
    
        font-size: 0.75rem;
    }
`

const Buttons = styled.div`
    justify-self: end;

    display: grid;
    grid-gap: 0.5rem;;
    
    & a {
        border-radius: 1rem;
        padding: 0.25rem 0.5rem;
        background-color: hsl(0, 0%, 33%);
        color: white;
        font-size: 0.75rem;
    
        text-decoration: none;
    }
`

const ArticleButton = styled.a`
    &:hover {
        background-color: hsl(0, 87%, 76%);
    }
`

const CodeButton = styled.a`
    &:hover {
        background-color: hsl(202, 67%, 71%);
    }
`

const Wrapper = styled.a`
    height: 250px;
    position: relative;
    overflow: hidden;

    &:hover ${PreviewImage} {
        transform: scale(1.1);
        transition: all 5s ease-out;
    }

    &:hover ${Metadata} {
        color: white;

        & p {
            color: white;
        }
    }
`


export default Project