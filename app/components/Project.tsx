import React from 'react'
import * as models from '~/models'

type Props = {
    project: models.Project
}

const Project: React.FC<Props> = ({ project }) => {
    const href = project.websiteUrl
        ?? project.articleUrl
        ?? project.codeUrl

    return (
        <a className="wrapper project" href={href} target="_blank" rel="noreferrer">
            <img className="previewImage" src={project.imgUrl} alt={`${project.name} project`} />
            <div className="metadata">
                <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
                {(project.articleUrl || project.websiteUrl) && (
                    <div className="buttons">
                        {project.articleUrl
                            && <a className="articleButton" href={project.articleUrl} target="_blank" rel="noreferrer">Article</a>}
                        <a className="codeButton" href={project.codeUrl} target="_blank" rel="noreferrer">Code</a>
                    </div>
                )}
            </div>
        </a>
    )
}

export default Project