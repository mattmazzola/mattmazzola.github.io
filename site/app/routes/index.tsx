import FeaturedProject from "~/components/FeaturedProject"
import Project from "~/components/Project"
import projects from "~/data/projects"
import * as models from "~/models"

export default function Index() {
  const featuredProject: models.Project | undefined = undefined

  return (
    <>
      {featuredProject &&
        <FeaturedProject project={featuredProject} />}
      <div className="projects">
        {projects.map((project, i) => (
          <Project key={i} project={project} />
        ))}
      </div>
    </>
  )
}
