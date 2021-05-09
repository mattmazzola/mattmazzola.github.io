import React from 'react'
import * as models from '../models'
import './Project.css'

type Props = {
    project: models.Project
}

const Project: React.FC<Props> = ({ project }) => {

    return (
        <a className="project" href={project.websiteUrl ?? project.articleUrl ?? project.codeUrl} target="_blank" rel="noreferrer">
            <img src={project.imgUrl} alt={`${project.name} project`} />
            <div className="metadata">
                <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
                {(project.articleUrl || project.websiteUrl) && (
                    <div className="buttons">
                        {project.articleUrl
                            && <a href={project.articleUrl} className="button-article" target="_blank" rel="noreferrer">Article</a>}
                        <a href={project.codeUrl} className="button-code" target="_blank" rel="noreferrer">Code</a>
                    </div>
                )}
            </div>
        </a>
    )
}

export default Project