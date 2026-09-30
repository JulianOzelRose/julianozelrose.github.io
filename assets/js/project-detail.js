// project-detail.js

function getCurrentProject() {
    const path = window.location.pathname;

    return projects.find(project => project.href === path);
}

function createProjectActions(actions) {
    return actions.map(action => `
        <a
            class="btn ${action.primary ? 'btn-primary' : 'btn-outline-secondary'}"
            href="${action.href}"
            target="_blank"
            rel="noopener noreferrer">
            ${action.label}
        </a>
    `).join('');
}

function createTextSection(title, paragraphs) {
    return `
        <section class="project-detail-block">

            <h2 class="project-detail-heading">
                ${title}
            </h2>

            ${paragraphs.map(paragraph => `
                <p class="project-detail-text">
                    ${paragraph}
                </p>
            `).join('')}

        </section>
    `;
}

function createListSection(title, items) {
    return `
        <section class="project-detail-block">

            <h2 class="project-detail-heading">
                ${title}
            </h2>

            <ul class="project-detail-list">
                ${items.map(item => `
                    <li>
                        ${item}
                    </li>
                `).join('')}
            </ul>

        </section>
    `;
}

function createTechnologiesSection(technologies) {
    return `
        <section class="project-detail-block">

            <h2 class="project-detail-heading">
                Technologies &amp; Tools
            </h2>

            <div class="project-detail-technologies">
                ${technologies.map(technology => `
                    <span class="project-technology">
                        ${technology}
                    </span>
                `).join('')}
            </div>

        </section>
    `;
}

function createProjectDetail(project) {
    const detail = project.detail;

    return `
        <header class="project-detail-header">

            <h1 class="project-detail-title">
                ${project.title}
            </h1>

            <p class="project-detail-category">
                ${detail.category}
            </p>

            <p class="project-detail-intro">
                ${detail.intro}
            </p>

            <div class="project-detail-actions">
                ${createProjectActions(detail.actions)}
            </div>

        </header>


        <div class="project-detail-content">

            <div class="project-detail-image-container">
                <figure class="project-detail-figure">
                    <img
                        class="project-detail-image"
                        src="${project.image}"
                        alt="${detail.imageAlt}">

                    ${detail.imageCaption
                        ? `<figcaption class="project-detail-image-caption">
                            ${detail.imageCaption}
                        </figcaption>`
                        : ''
                    }
                </figure>
            </div>

            ${createTextSection(
                'Overview',
                detail.overview
            )}

            ${detail.features
                ? createListSection('Features', detail.features)
                : ''
            }

            ${createListSection(
                'Technical Highlights',
                detail.technicalHighlights
            )}

            ${createTechnologiesSection(
                detail.technologies
            )}

        </div>
    `;
}

function renderProjectDetail() {
    const container = document.getElementById('project-detail');

    if (!container) {
        return;
    }

    const project = getCurrentProject();

    if (!project || !project.detail) {
        return;
    }

    container.innerHTML = createProjectDetail(project);
}

renderProjectDetail();