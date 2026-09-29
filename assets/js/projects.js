// projects.js

function createProjectCard(project, options = {}) {
    const {
        columnClasses = 'col-12 col-md-6',
        headingLevel = 2,
        headingClass = 'h4'
    } = options;

    const headingTag = `h${headingLevel}`;

    return `
        <div class="project-column ${columnClasses}">

            <article class="project-card card h-100">

                <div class="project-image-container">
                    <img
                        class="project-image"
                        src="${project.image}"
                        alt="${project.alt}">
                </div>

                <div class="project-card-body card-body">

                    <${headingTag} class="project-title ${headingClass}">
                        <a
                            class="project-title-link stretched-link"
                            href="${project.href}">
                            ${project.title}
                        </a>
                    </${headingTag}>

                    <p class="project-description">
                        ${project.description}
                    </p>

                    <div class="project-technologies">
                        ${project.technologies.map(technology => `
                            <span class="project-technology">
                                ${technology}
                            </span>
                        `).join('')}
                    </div>

                </div>

                <div class="project-card-footer card-footer">
                    <span class="project-view-link">
                        View Project &rarr;
                    </span>
                </div>

            </article>

        </div>
    `;
}

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');

    if (projectsGrid) {
        projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');
    }

    const featuredProjectsGrid = document.getElementById('featured-projects-grid');

    if (featuredProjectsGrid) {
        featuredProjectsGrid.innerHTML = projects
            .filter(project => project.featured)
            .map(project => createProjectCard(project, {
                columnClasses: 'col-12 col-md-6 col-lg-4',
                headingLevel: 3,
                headingClass: 'h5'
            }))
            .join('');
    }
}

renderProjects();