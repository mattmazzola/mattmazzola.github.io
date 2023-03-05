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
        <a className="relative h-64 overflow-hidden text-slate-200 hover:text-white" href={href} target="_blank" rel="noreferrer">
            <img className="previewImage" src={project.imgUrl} alt={`${project.name} project`} />
            <div className="absolute bottom-0 left-0 right-0 flex items-end bg-neutral-900/70 p-4">
                <div className="flex-1 flex flex-col gap-0.5">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    <p className="text-xs">{project.description}</p>
                </div>
                {(project.articleUrl || project.websiteUrl) && (
                    <div>
                        {project.articleUrl
                            && <a href={project.articleUrl} target="_blank" rel="noreferrer" className="rounded-full bg-neutral-500 hover:bg-sky-300 px-2 py-1 text-xs">Article</a>}
                        <a href={project.codeUrl} target="_blank" rel="noreferrer" className="rounded-full bg-neutral-500 hover:bg-sky-300 px-2 py-1 text-xs">Code</a>
                    </div>
                )}
            </div>
        </a>
    )
}

export default Project