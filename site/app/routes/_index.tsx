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
      <div className="projects shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] shadow-cyan-600/50">
        {projects.map((project, i) => (
          <Project key={i} project={project} />
        ))}
      </div>
    </>
  )
}
