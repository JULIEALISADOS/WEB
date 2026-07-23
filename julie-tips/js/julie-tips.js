/**
 * Julie Tips - Engine JS v1.0
 * Lógica modular para el centro de contenidos Julie Tips
 */

document.addEventListener('DOMContentLoaded', async () => {
    let articlesData = [];
    const isArticlePage = document.body.classList.contains('julie-tips-single');
    const isHubPage = document.body.classList.contains('julie-tips-hub');

    try {
        const response = await fetch('./data/articles.json');
        if (!response.ok) {
            throw new Error('Error al cargar articles.json');
        }
        const data = await response.json();
        articlesData = Array.isArray(data) ? data : [data];
    } catch (err) {
        console.error('No se pudo cargar la base de artículos:', err);
    }

    if (isHubPage) {
        initHubPage(articlesData);
    } else if (isArticlePage) {
        initArticlePage(articlesData);
    }

    // Scroll Progress bar en artículos
    initReadingProgressBar();
});

// Inicialización de la Revista Digital / Hub
function initHubPage(articles) {
    const searchInput = document.getElementById('tips-search');
    const categoryTagsContainer = document.getElementById('category-tags');
    const articlesGrid = document.getElementById('articles-grid');
    const featuredCardContainer = document.getElementById('featured-article-container');
    const popularList = document.getElementById('popular-articles-list');
    const currentCategoryTitle = document.getElementById('current-category-name');

    if (!articles || articles.length === 0) return;

    let activeCategory = 'Todos';
    let searchQuery = '';

    // Renderizar Artículo Destacado (el primero marcado con featured: true)
    const featured = articles.find(a => a.featured) || articles[0];
    if (featuredCardContainer && featured) {
        featuredCardContainer.innerHTML = createFeaturedCardHTML(featured);
    }

    // Renderizar Artículos Más Leídos (top por views)
    if (popularList) {
        const sortedByViews = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
        popularList.innerHTML = sortedByViews.map(createPopularItemHTML).join('');
    }

    // Renderizar Parrilla Principal de Artículos
    function renderGrid() {
        if (!articlesGrid) return;

        let filtered = articles.filter(article => {
            const matchesCategory = activeCategory === 'Todos' || 
                article.category === activeCategory || 
                (article.categories && article.categories.includes(activeCategory));

            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q || 
                article.title.toLowerCase().includes(q) || 
                article.summary.toLowerCase().includes(q) || 
                article.category.toLowerCase().includes(q) ||
                (article.content && article.content.toLowerCase().includes(q));

            return matchesCategory && matchesSearch;
        });

        if (currentCategoryTitle) {
            currentCategoryTitle.textContent = activeCategory === 'Todos' ? 'Todos los Artículos' : activeCategory;
        }

        if (filtered.length === 0) {
            articlesGrid.innerHTML = `
                <div class="no-results">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <h3>No encontramos artículos</h3>
                    <p>Intenta con otra búsqueda o selecciona una categoría diferente.</p>
                </div>
            `;
            return;
        }

        articlesGrid.innerHTML = filtered.map(createArticleCardHTML).join('');
    }

    // Eventos de Búsqueda Instantánea
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderGrid();
        });
    }

    // Eventos de Categoría
    if (categoryTagsContainer) {
        categoryTagsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.cat-chip');
            if (!btn) return;

            categoryTagsContainer.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');

            activeCategory = btn.dataset.category || 'Todos';
            renderGrid();
        });
    }

    // Render inicial
    renderGrid();
}

// Inicialización de la Página de Artículo Individual
function initArticlePage(articles) {
    const urlParams = new URLSearchParams(window.location.search);
    let slug = urlParams.get('slug');

    // Manejar ruteo amigable en servidores con soporte de rutas o fallback
    if (!slug) {
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 1 && pathSegments[0] === 'julie-tips') {
            slug = pathSegments[1].replace('.html', '');
        }
    }

    // Si sigue sin slug, fallback al primer artículo
    if (!slug || slug === 'index' || slug === 'articulo') {
        slug = 'cuanto-dura-un-alisado';
    }

    const article = articles.find(a => a.slug === slug || a.id === slug) || articles[0];
    if (!article) return;

    // Actualizar Head Metadata SEO
    document.title = article.seo?.title || article.title;
    updateMeta('description', article.seo?.description || article.summary);
    updateMeta('keywords', (article.seo?.keywords || []).join(', '));
    updateCanonical(`https://juliealisados.com/julie-tips/${article.slug}`);

    // Inyectar Schemas JSON-LD
    injectSchemas(article);

    // Inyectar Contenido en el DOM
    const breadcrumbElem = document.getElementById('breadcrumb-current');
    if (breadcrumbElem) breadcrumbElem.textContent = article.title;

    document.getElementById('art-title').textContent = article.title;
    document.getElementById('art-subtitle').textContent = article.subtitle || '';
    document.getElementById('art-category').textContent = article.category;
    document.getElementById('art-author').textContent = article.author;
    document.getElementById('art-date').textContent = formatDate(article.date);
    document.getElementById('art-readtime').textContent = article.readTime;
    
    const heroImg = document.getElementById('art-hero-img');
    if (heroImg) {
        heroImg.src = article.image;
        heroImg.alt = article.alt || article.title;
    }

    const contentBox = document.getElementById('art-body');
    if (contentBox) {
        contentBox.innerHTML = article.content;
    }

    // Generar Tabla de Contenidos Automática
    generateTableOfContents();

    // Renderizar FAQ
    const faqContainer = document.getElementById('art-faqs');
    if (faqContainer && article.faqs && article.faqs.length > 0) {
        faqContainer.innerHTML = article.faqs.map(faq => `
            <details class="faq-accordion-item">
                <summary class="faq-accordion-header">
                    <span>${faq.question}</span>
                    <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </summary>
                <div class="faq-accordion-body">
                    <p>${faq.answer}</p>
                </div>
            </details>
        `).join('');
    }

    // Renderizar Fuentes y Bibliografía Científica
    const sourcesBox = document.getElementById('art-sources-container');
    const sourcesList = document.getElementById('art-sources-list');
    if (sourcesBox && sourcesList) {
        if (article.sources && article.sources.length > 0) {
            sourcesList.innerHTML = article.sources.map(src => `<li>${src}</li>`).join('');
            sourcesBox.style.display = 'block';
        } else {
            sourcesBox.style.display = 'none';
        }
    }

    // Renderizar Navegación Anterior / Siguiente
    const currentIndex = articles.findIndex(a => a.id === article.id || a.slug === article.slug);
    const prevNav = document.getElementById('art-prev-nav');
    const nextNav = document.getElementById('art-next-nav');

    if (prevNav) {
        if (currentIndex > 0) {
            const prevArticle = articles[currentIndex - 1];
            prevNav.innerHTML = `<a href="./${prevArticle.slug}" style="color: var(--gold-dark); text-decoration: none; font-weight:700; font-size: 0.9rem;">← Anterior: ${prevArticle.title}</a>`;
        } else {
            prevNav.innerHTML = '';
        }
    }
    if (nextNav) {
        if (currentIndex >= 0 && currentIndex < articles.length - 1) {
            const nextArticle = articles[currentIndex + 1];
            nextNav.innerHTML = `<a href="./${nextArticle.slug}" style="color: var(--gold-dark); text-decoration: none; font-weight:700; font-size: 0.9rem;">Siguiente: ${nextArticle.title} →</a>`;
        } else {
            nextNav.innerHTML = '';
        }
    }

    // Renderizar Productos Relacionados
    const productsContainer = document.getElementById('art-related-products');
    if (productsContainer && article.relatedProducts) {
        productsContainer.innerHTML = article.relatedProducts.map(p => `
            <div class="related-card product-card">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <h4>${p.name}</h4>
                <p>${p.desc}</p>
                <a href="${p.link}" class="btn-secondary-gold">Ver producto</a>
            </div>
        `).join('');
    }

    // Renderizar Servicios Relacionados
    const servicesContainer = document.getElementById('art-related-services');
    if (servicesContainer && article.relatedServices) {
        servicesContainer.innerHTML = article.relatedServices.map(s => `
            <div class="related-card service-card">
                <img src="${s.image}" alt="${s.name}" loading="lazy">
                <h4>${s.name}</h4>
                <p>${s.desc}</p>
                <a href="${s.link}" class="btn-gold-fill" onclick="return gtag_report_conversion(this.href);">Agendar servicio</a>
            </div>
        `).join('');
    }

    // Renderizar Artículos Relacionados (excluyendo el actual)
    const relatedArticlesContainer = document.getElementById('art-related-posts');
    if (relatedArticlesContainer) {
        const others = articles.filter(a => a.id !== article.id).slice(0, 3);
        relatedArticlesContainer.innerHTML = others.map(createArticleCardHTML).join('');
    }

    // Setup Botones de Compartir
    setupSocialShares(article);

    // Setup Tracking de Analytics
    setupAnalyticsTracking(article);
}

// Generador automático de Tabla de Contenidos
function generateTableOfContents() {
    const content = document.getElementById('art-body');
    const tocList = document.getElementById('toc-list');
    if (!content || !tocList) return;

    const headings = content.querySelectorAll('h2, h3');
    if (headings.length === 0) {
        const tocContainer = document.getElementById('toc-container');
        if (tocContainer) tocContainer.style.display = 'none';
        return;
    }

    let tocHTML = '';
    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `heading-toc-${index}`;
        }
        const isH3 = heading.tagName.toLowerCase() === 'h3';
        tocHTML += `
            <li class="${isH3 ? 'toc-subitem' : 'toc-item'}">
                <a href="#${heading.id}">${heading.textContent}</a>
            </li>
        `;
    });

    tocList.innerHTML = tocHTML;
}

// Barra de progreso de lectura superior
function initReadingProgressBar() {
    const progressBar = document.getElementById('reading-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
}

// Inyección de Schemas JSON-LD
function injectSchemas(article) {
    // 1. Schema BlogPosting
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.seo?.description || article.summary,
        "image": `https://juliealisados.com/${article.image.replace('../', '')}`,
        "author": {
            "@type": "Person",
            "name": article.author,
            "jobTitle": article.authorRole || "Especialista Capilar"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Julie Alisados",
            "logo": {
                "@type": "ImageObject",
                "url": "https://juliealisados.com/logo%201.png"
            }
        },
        "datePublished": article.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://juliealisados.com/julie-tips/${article.slug}`
        }
    };

    // 2. Schema BreadcrumbList
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://juliealisados.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Julie Tips",
                "item": "https://juliealisados.com/julie-tips/"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": article.title,
                "item": `https://juliealisados.com/julie-tips/${article.slug}`
            }
        ]
    };

    appendSchemaScript(blogSchema);
    appendSchemaScript(breadcrumbSchema);

    // 3. Schema FAQPage si aplica
    if (article.faqs && article.faqs.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": article.faqs.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.answer
                }
            }))
        };
        appendSchemaScript(faqSchema);
    }
}

function appendSchemaScript(schemaObj) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaObj);
    document.head.appendChild(script);
}

// Helpers de Metadata
function updateMeta(name, value) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
    }
    el.content = value;
}

function updateCanonical(url) {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) {
        el = document.createElement('link');
        el.rel = 'canonical';
        document.head.appendChild(el);
    }
    el.href = url;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Plantillas HTML para tarjetas
function createFeaturedCardHTML(article) {
    return `
        <div class="featured-card">
            <div class="featured-image">
                <img src="${article.image}" alt="${article.alt || article.title}" fetchpriority="high">
                <span class="badge-gold">Destacado</span>
            </div>
            <div class="featured-content">
                <span class="article-cat">${article.category}</span>
                <h2><a href="./articulo.html?slug=${article.slug}">${article.title}</a></h2>
                <p>${article.summary}</p>
                <div class="article-meta">
                    <span>${article.author}</span> • 
                    <span>${formatDate(article.date)}</span> • 
                    <span>${article.readTime}</span>
                </div>
                <a href="./articulo.html?slug=${article.slug}" class="btn-gold-fill btn-read">Leer artículo completo</a>
            </div>
        </div>
    `;
}

function createArticleCardHTML(article) {
    return `
        <article class="article-card">
            <div class="card-img-wrap">
                <img src="${article.image}" alt="${article.alt || article.title}" loading="lazy">
                <span class="badge-cat">${article.category}</span>
            </div>
            <div class="card-body">
                <h3><a href="./articulo.html?slug=${article.slug}">${article.title}</a></h3>
                <p>${article.summary}</p>
                <div class="card-footer-meta">
                    <span class="date">${formatDate(article.date)}</span>
                    <span class="read-time">${article.readTime}</span>
                </div>
                <a href="./articulo.html?slug=${article.slug}" class="btn-secondary-gold card-btn">Leer artículo</a>
            </div>
        </article>
    `;
}

function createPopularItemHTML(article, index) {
    return `
        <li class="popular-item">
            <span class="popular-num">0${index + 1}</span>
            <div class="popular-info">
                <h4><a href="./articulo.html?slug=${article.slug}">${article.title}</a></h4>
                <span class="popular-cat">${article.category}</span>
            </div>
        </li>
    `;
}

// Redes Sociales
function setupSocialShares(article) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);

    const btnWa = document.getElementById('share-wa');
    if (btnWa) btnWa.href = `https://api.whatsapp.com/send?text=${text}%20${url}`;

    const btnFb = document.getElementById('share-fb');
    if (btnFb) btnFb.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    const btnTw = document.getElementById('share-tw');
    if (btnTw) btnTw.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}

// GA4 / Pixel Tracking Event listener
function setupAnalyticsTracking(article) {
    let scrolled90 = false;
    window.addEventListener('scroll', () => {
        if (scrolled90) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const scrollPct = (window.scrollY / totalHeight) * 100;
        if (scrollPct >= 90) {
            scrolled90 = true;
            if (typeof gtag === 'function') {
                gtag('event', 'article_scroll_90', {
                    'article_title': article.title,
                    'article_category': article.category
                });
            }
        }
    });

    // Tracking de conversión WhatsApp desde el artículo
    const ctaWa = document.getElementById('cta-article-wa');
    if (ctaWa) {
        ctaWa.addEventListener('click', () => {
            if (typeof gtag_report_conversion === 'function') {
                gtag_report_conversion(undefined, 10000, 'COP');
            }
        });
    }
}
