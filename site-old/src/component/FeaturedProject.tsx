import React from "react"
import { Project } from "../models"

type Props = {
    project: Project
}

const FeaturedProject: React.FC<Props> = () => {

    return (
        <div>
            Featured Project
        </div>
    )
}

export default FeaturedProject