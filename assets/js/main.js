// main.js

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('navbar', '/components/navbar.html');
    await loadComponent('footer', '/components/footer.html');

    renderProjectMenu();
    setCurrentYear();
    setActiveNavigation();
    initializeCopyBlocks();
});

async function loadComponent(id, path) {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load component: ${path}`);
    }

    element.innerHTML = await response.text();
}

function setCurrentYear() {
    const year = document.getElementById('current-year');

    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

function setActiveNavigation() {
    const path = window.location.pathname;

    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');

        if (!href || href === '#') {
            return;
        }

        if (path === href || (href !== '/' && path.startsWith(href))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    if (path.startsWith('/projects/')) {
        const projectsLink = document.querySelector('.navbar-nav .dropdown-toggle');

        if (projectsLink) {
            projectsLink.classList.add('active');
            projectsLink.setAttribute('aria-current', 'page');
        }
    }

    document.querySelectorAll('.dropdown-item').forEach(link => {
        const href = link.getAttribute('href');

        if (href && path === href) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

function renderProjectMenu() {
    const menu = document.getElementById('projects-dropdown-menu');

    if (!menu) {
        return;
    }

    const featuredProjects = projects.filter(project => project.featured);

    menu.insertAdjacentHTML(
        'beforeend',
        featuredProjects.map(project => `
            <li>
                <a class="dropdown-item" href="${project.href}">
                    ${project.title}
                </a>
            </li>
        `).join('')
    );
}

function initializeCopyBlocks() {
    document.querySelectorAll('.code-block-copy, .hex-block-copy').forEach(button => {
        button.addEventListener('click', async () => {
            const block = button.closest('.code-block, .hex-block');

            const content = block?.querySelector(
                'pre code, .hex-view'
            );

            if (!content) {
                return;
            }

            try {
                await navigator.clipboard.writeText(content.textContent);

                const originalText = button.textContent;

                button.textContent = 'COPIED';

                setTimeout(() => {
                    button.textContent = originalText;
                }, 1500);
            }
            catch (error) {
                console.error('Failed to copy content:', error);
            }
        });
    });
}