import React from 'react'
import * as models from '../models'
import './Project.css'

type Props = {
    project: models.Project
}

const Project: React.FC<Props> = (props) => {
    return (
        <a className="project" href={props.project.websiteUrl ?? props.project.codeUrl} target="_blank" rel="noreferrer">
            <img src={props.project.imgUrl} alt={`Preview image for ${props.project.name} project`}/>
            <div className="metadata">
                <h3>{props.project.name}</h3>
                <p>{props.project.description}</p>

                {props.project.websiteUrl &&
                    (
                        <a href={props.project.codeUrl} className="button-code" target="_blank" rel="noreferrer">Code</a>
                    )}
            </div>
        </a>
    )
}

export default Project