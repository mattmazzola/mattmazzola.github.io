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
        <a className="relative overflow-hidden text-neutral-300 hover:text-white" href={href} target="_blank" rel="noreferrer">
            <img className="object-cover object-top w-full h-64 hover:scale-110 hover:duration-[5000ms] duration-1000" src={project.imgUrl} alt={`${project.name} project`} />
            <div className="absolute bottom-0 left-0 right-0 flex items-end bg-neutral-900/70 p-4 pointer-events-none">
                <div className="flex-1 flex flex-col gap-0.5">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    <p className="text-xs">{project.description}</p>
                </div>
                {(project.articleUrl || project.codeUrl) && (
                    <div className="flex gap-2 pointer-events-auto">
                        {project.articleUrl
                            && <a href={project.articleUrl} target="_blank" rel="noreferrer" className="rounded-full bg-amber-200/30 hover:bg-amber-500 px-2 py-1 text-xs">Article</a>}
                        {project.codeUrl
                            && <a href={project.codeUrl} target="_blank" rel="noreferrer" className="rounded-full bg-sky-200/30 hover:bg-sky-400 px-2 py-1 text-xs">Code</a>}
                    </div>
                )}
            </div>
        </a>
    )
}

export default Project