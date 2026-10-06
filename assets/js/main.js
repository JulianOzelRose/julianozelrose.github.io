// main.js

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('navbar', '/components/navbar.html');
    await loadComponent('footer', '/components/footer.html');

    renderProjectMenu();
    setCurrentYear();
    setActiveNavigation();
    highlightCodeBlocks();
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

function highlightCodeBlocks() {
    document.querySelectorAll('.code-block').forEach(block => {
        const language = block.querySelector('.code-block-language')?.textContent.trim().toLowerCase();
        const code = block.querySelector('pre code');

        if (!code) {
            return;
        }

        switch (language) {
            case 'c':
            case 'c++':
            case 'c#':
                code.innerHTML = highlightCStyleComments(code.textContent);
                break;

            case 'asm':
                code.innerHTML = highlightLineComments(code.textContent, ';');
                break;

            case 'python':
                code.innerHTML = highlightPython(code.textContent);
                break;

            case 'shell':
            case 'bash':
                code.innerHTML = highlightShell(code.textContent);
                break;
        }
    });
}

function highlightCStyleComments(source) {
    let output = '';
    let i = 0;

    while (i < source.length) {
        // String literal
        if (source[i] === '"') {
            const start = i++;

            while (i < source.length) {
                if (source[i] === '\\') {
                    i += 2;
                    continue;
                }

                if (source[i++] === '"') {
                    break;
                }
            }

            output += escapeHtml(source.slice(start, i));
            continue;
        }

        // Character literal
        if (source[i] === "'") {
            const start = i++;

            while (i < source.length) {
                if (source[i] === '\\') {
                    i += 2;
                    continue;
                }

                if (source[i++] === "'") {
                    break;
                }
            }

            output += escapeHtml(source.slice(start, i));
            continue;
        }

        // Single-line comment
        if (source.startsWith('//', i)) {
            const end = source.indexOf('\n', i);
            const stop = end === -1 ? source.length : end;

            output += span('comment', source.slice(i, stop));
            i = stop;
            continue;
        }

        // Multi-line comment
        if (source.startsWith('/*', i)) {
            const end = source.indexOf('*/', i + 2);
            const stop = end === -1 ? source.length : end + 2;

            output += span('comment', source.slice(i, stop));
            i = stop;
            continue;
        }

        output += escapeHtml(source[i]);
        i++;
    }

    return output;
}

function highlightPython(source) {
    return source
        .split('\n')
        .map(line => {
            let quote = null;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];

                if (char === '\\') {
                    i++;
                    continue;
                }

                if (char === '"' || char === "'") {
                    if (quote === char) {
                        quote = null;
                    } else if (!quote) {
                        quote = char;
                    }

                    continue;
                }

                if (char === '#' && !quote) {
                    return (
                        escapeHtml(line.slice(0, i)) +
                        span('comment', line.slice(i))
                    );
                }
            }

            return escapeHtml(line);
        })
        .join('\n');
}

function highlightLineComments(source, marker) {
    return source
        .split('\n')
        .map(line => {
            const index = line.indexOf(marker);

            if (index === -1) {
                return escapeHtml(line);
            }

            const code = line.slice(0, index);
            const comment = line.slice(index);

            return escapeHtml(code) + span('comment', comment);
        })
        .join('\n');
}

function highlightShell(source) {
    return source
        .split('\n')
        .map(line => {
            if (/^\s*~\s+#\s+/.test(line)) {
                return escapeHtml(line);
            }

            const index = findShellComment(line);

            if (index === -1) {
                return escapeHtml(line);
            }

            return (
                escapeHtml(line.slice(0, index)) +
                span('comment', line.slice(index))
            );
        })
        .join('\n');
}

function findShellComment(line) {
    let quote = null;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '\\') {
            i++;
            continue;
        }

        if (char === '"' || char === "'") {
            if (quote === char) {
                quote = null;
            } else if (!quote) {
                quote = char;
            }

            continue;
        }

        if (char === '#' && !quote) {
            return i;
        }
    }

    return -1;
}

function span(type, value) {
    return `<span class="syntax-${type}">${escapeHtml(value)}</span>`;
}

function escapeHtml(value) {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}