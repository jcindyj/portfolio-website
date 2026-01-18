import React from 'react'
import './Projects.css'

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Mobile App',
      description: 'Redesigned shopping experience with focus on user engagement and conversion.',
      tags: ['UX Design', 'Mobile', 'E-Commerce'],
      image: 'https://via.placeholder.com/400x300?text=E-Commerce+App'
    },
    {
      id: 2,
      title: 'Healthcare Platform',
      description: 'Improved patient portal interface for better accessibility and user experience.',
      tags: ['UX/UI Design', 'Web', 'Healthcare'],
      image: 'https://via.placeholder.com/400x300?text=Healthcare+Platform'
    },
    {
      id: 3,
      title: 'SaaS Dashboard',
      description: 'Created intuitive dashboard design for data visualization and analytics.',
      tags: ['UI Design', 'Dashboard', 'SaaS'],
      image: 'https://via.placeholder.com/400x300?text=SaaS+Dashboard'
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">A selection of my recent work</p>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <a href="#" className="project-link">View Case Study →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
