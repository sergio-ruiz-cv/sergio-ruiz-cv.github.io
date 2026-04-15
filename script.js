/**
 * Sergio Ruiz Torres - CV Profesional e Interactivo
 * Módulos: Settings Panel, Tema, Idioma, Accesibilidad, Radar, Terminal.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. LÓGICA DEL PANEL DE CONTROL (Settings Drawer)
       ========================================= */
    const settingsBtn = document.getElementById('settings-btn');
    const closeSettingsBtn = document.getElementById('close-settings');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsOverlay = document.getElementById('settings-overlay');
    const body = document.body;

    // Abrir/Cerrar Panel
    const togglePanel = () => {
        settingsPanel.classList.toggle('active');
        settingsOverlay.classList.toggle('active');
    };

    if (settingsBtn) settingsBtn.addEventListener('click', togglePanel);
    if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', togglePanel);
    if (settingsOverlay) settingsOverlay.addEventListener('click', togglePanel);

    /* =========================================
       2. MODO OSCURO / CLARO
       ========================================= */
    const themeSwitch = document.getElementById('theme-toggle-switch');
    
    // Cargar preferencia
    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeSwitch) themeSwitch.checked = true;
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
            if(window.skillsRadarChart) window.skillsRadarChart.update();
        });
    }

    /* =========================================
       3. CAMBIO DE IDIOMA (i18n Básico)
       ========================================= */
    const dict = {
        'es': {
            'settings_title': '<i class="fa-solid fa-gear"></i> Panel de Control',
            'download_cv': 'Descargar CV en PDF',
            'theme': 'Apariencia', 'light': 'Claro', 'dark': 'Oscuro',
            'language': 'Idioma', 'font_size': 'Accesibilidad (Texto)', 'accent_color': 'Color de Acento',
            'subtitle': 'Ingeniería Civil Electrónica | Data Engineer Junior | Fundador de S&F Atelier',
            'profile_title': 'Perfil Profesional',
            'profile_desc': 'Estudiante de Ingeniería Civil Electrónica con sólida base técnica en hardware y automatización, actualmente especializándose en <strong>Data Engineering.</strong> Cuento con experiencia práctica en la resolución de problemas complejos, desde la reparación de sistemas electrónicos hasta la creación de una empresa de diseño digital <strong>S&F Atelier.</strong> Mi enfoque combina la precisión de la electrónica con el manejo de flujos de datos, buscando mi primera oportunidad profesional en el área de datos para aplicar conocimientos en Python, SQL y procesos ETL.',
            'exp_title': 'Experiencia Destacada',
            'exp_sf_title': 'Founder & Lead Designer | S&F Atelier',
            'exp_sf_loc': 'Viña del Mar, Chile',
            'present': 'Presente',
            'exp_sf_list': '<li>Diseño y construcción de <strong>Router CNC de 3x2 metros</strong> con perfiles de aluminio y motores paso a paso.</li><li>Modelado 3D avanzado en <strong>Fusion 360</strong> y <strong>SketchUp</strong> para mobiliario y piezas mecánicas.</li><li>Implementación de control electrónico mediante diseño del <strong>tablero eléctrico</strong> y software <strong>Mach3</strong>.</li>',
            'exp_andes_title': 'Data Engineer Junior | Andes Hosting',
            'exp_andes_loc': 'Valparaíso / Remoto',
            'exp_andes_date': 'Pasantía Enero 2026 - Abril 2026',
            'exp_andes_list': '<li>Desarrollo de flujos ETL utilizando <strong>Python</strong> y orquestación con <strong>Dagster</strong>.</li><li>Consultas y gestión de bases de datos con <strong>SQL</strong> y <strong>ClickHouse</strong>.</li><li>Creación de dashboards dinámicos con <strong>Power BI</strong> y herramientas web como <strong>Streamlit</strong>.</li>',
            'exp_adexus_title': 'Instalador de Equipos Transbank | Adexus',
            'exp_adexus_loc': 'Viña del Mar / Valparaíso',
            'exp_adexus_date': 'Pasantía 2018',
            'exp_adexus_list': '<li>Instalación y configuración técnica de terminales de punto de venta (POS) Transbank.</li><li>Diagnóstico básico de conectividad y redes para el funcionamiento de los equipos.</li><li>Gestión de rutas de atención técnica cumpliendo con estándares de calidad corporativos.</li>',
            'proj_title': 'Portafolio de Proyectos',
            'proj_cnc_title': 'Diseño y Construcción de CNC',
            'proj_cnc_desc': 'Desarrollo estructural en perfiles de aluminio y sistema de control Mach3. Desde el modelado 3D hasta la puesta en marcha técnica.',
            'tag_industrial': 'Diseño industrial',
            'tag_electronics': 'Electrónica',
            'proj_data_title': 'Arquitectura de Datos',
            'proj_data_desc': 'Desarrollo de un ecosistema de datos modular batch-oriented. Extracción de fuentes semi-estructuradas (Google Sheets) orquestada mediante DAGs y triggers condicionales en Mage.ai. Modelado de capa Staging en PostgreSQL y carga analítica final (OLAP) en ClickHouse para minimizar tiempos de consulta. Visualización final desarrollada en Streamlit.',
            'sim_title': 'Flujo de Datos en Vivo',
            'run_btn': 'Ejecutar',
            'sim_wait': 'Esperando inicialización del trigger...',
            'tag_prog': 'Programación',
            'tag_data_analysis': 'Análisis de datos',
            'proj_web_title': 'Desarrollo Frontend E-commerce',
            'proj_web_desc': 'Diseño e implementación de interfaz web responsiva. Optimización de tiempos de carga, animaciones CSS y estructuración semántica para mejorar el SEO y la experiencia de usuario (UX/UI).',
            'code_btn': 'Código',
            'demo_btn': 'Demo',
            'skills_title': 'Habilidades Técnicas',
            'certs_title': 'Certificaciones Oficiales',
            'edu_title': 'Formación Académica',
            'edu_degree1': 'Ingeniería Civil Electrónica',
            'edu_uni1': 'Pontificia Universidad Católica de Valparaíso (PUCV)',
            'edu_status1': 'En curso',
            'edu_degree2': 'Técnico en Electrónica',
            'edu_uni2': 'Licencia de Enseñanza Media con Titulación Técnica',
            'edu_status2': 'Titulado',
            'footer_desc': 'Ingeniería Civil Electrónica & Data Engineering. Construyendo soluciones donde el hardware y el software convergen.',
            'footer_nav': 'Navegación',
            'nav_profile': 'Perfil',
            'nav_exp': 'Experiencia',
            'nav_proj': 'Portafolio',
            'footer_deploy': 'Desplegado en GitHub Pages © 2026',
            'footer_rights': 'Todos los derechos reservados.'
        },
        'en': {
            'settings_title': '<i class="fa-solid fa-gear"></i> Control Panel',
            'download_cv': 'Download PDF Resume',
            'theme': 'Appearance', 'light': 'Light', 'dark': 'Dark',
            'language': 'Language', 'font_size': 'Accessibility (Text)', 'accent_color': 'Accent Color',
            'subtitle': 'Electronic Civil Engineering | Junior Data Engineer | Founder of S&F Atelier',
            'profile_title': 'Professional Profile',
            'profile_desc': 'Electronic Civil Engineering student with a solid technical background in hardware and automation, currently specializing in <strong>Data Engineering.</strong> I have practical experience solving complex problems, from repairing electronic systems to founding a digital design company, <strong>S&F Atelier.</strong> My approach combines electronics precision with data flow management, seeking my first professional opportunity in the data field to apply my skills in Python, SQL, and ETL processes.',
            'exp_title': 'Key Experience',
            'exp_sf_title': 'Founder & Lead Designer | S&F Atelier',
            'exp_sf_loc': 'Viña del Mar, Chile',
            'present': 'Present',
            'exp_sf_list': '<li>Design and construction of a <strong>3x2 meter CNC Router</strong> with aluminum profiles and stepper motors.</li><li>Advanced 3D modeling in <strong>Fusion 360</strong> and <strong>SketchUp</strong> for furniture and mechanical parts.</li><li>Electronic control implementation through <strong>electrical panel</strong> design and <strong>Mach3</strong> software.</li>',
            'exp_andes_title': 'Junior Data Engineer | Andes Hosting',
            'exp_andes_loc': 'Valparaíso / Remote',
            'exp_andes_date': 'Internship Jan 2026 - Apr 2026',
            'exp_andes_list': '<li>ETL pipeline development using <strong>Python</strong> and orchestration with <strong>Dagster</strong>.</li><li>Database querying and management with <strong>SQL</strong> and <strong>ClickHouse</strong>.</li><li>Creation of dynamic dashboards with <strong>Power BI</strong> and web tools like <strong>Streamlit</strong>.</li>',
            'exp_adexus_title': 'Transbank Equipment Installer | Adexus',
            'exp_adexus_loc': 'Viña del Mar / Valparaíso',
            'exp_adexus_date': 'Internship 2018',
            'exp_adexus_list': '<li>Technical installation and configuration of Transbank Point of Sale (POS) terminals.</li><li>Basic network and connectivity troubleshooting for equipment operation.</li><li>Management of technical service routes complying with corporate quality standards.</li>',
            'proj_title': 'Project Portfolio',
            'proj_cnc_title': 'CNC Design and Construction',
            'proj_cnc_desc': 'Structural development using aluminum profiles and Mach3 control system. From 3D modeling to technical commissioning.',
            'tag_industrial': 'Industrial Design',
            'tag_electronics': 'Electronics',
            'proj_data_title': 'Data Architecture',
            'proj_data_desc': 'Development of a batch-oriented modular data ecosystem. Extraction from semi-structured sources (Google Sheets) orchestrated via DAGs and conditional triggers in Mage.ai. Staging layer modeling in PostgreSQL and final analytical load (OLAP) in ClickHouse to minimize query times. Final visualization built in Streamlit.',
            'sim_title': 'Live Data Flow',
            'run_btn': 'Run',
            'sim_wait': 'Waiting for trigger initialization...',
            'tag_prog': 'Programming',
            'tag_data_analysis': 'Data Analysis',
            'proj_web_title': 'E-commerce Frontend Development',
            'proj_web_desc': 'Design and implementation of a responsive web interface. Load time optimization, CSS animations, and semantic structuring to improve SEO and user experience (UX/UI).',
            'code_btn': 'Code',
            'demo_btn': 'Demo',
            'skills_title': 'Technical Skills',
            'certs_title': 'Official Certifications',
            'edu_title': 'Education',
            'edu_degree1': 'Electronic Civil Engineering',
            'edu_uni1': 'Pontificia Universidad Católica de Valparaíso (PUCV)',
            'edu_status1': 'In progress',
            'edu_degree2': 'Electronics Technician',
            'edu_uni2': 'High School Diploma with Technical Degree',
            'edu_status2': 'Graduated',
            'footer_desc': 'Electronic Civil Engineering & Data Engineering. Building solutions where hardware and software converge.',
            'footer_nav': 'Navigation',
            'nav_profile': 'Profile',
            'nav_exp': 'Experience',
            'nav_proj': 'Portfolio',
            'footer_deploy': 'Deployed on GitHub Pages © 2026',
            'footer_rights': 'All rights reserved.'
        }
    };

    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    const changeLanguage = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[lang][key]) el.innerHTML = dict[lang][key];
        });
        
        if (lang === 'en') {
            langEnBtn.classList.add('active');
            langEsBtn.classList.remove('active');
        } else {
            langEsBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        }
    };

    if (langEsBtn) langEsBtn.addEventListener('click', () => changeLanguage('es'));
    if (langEnBtn) langEnBtn.addEventListener('click', () => changeLanguage('en'));


    /* =========================================
       4. TAMAÑO DE FUENTE (Accesibilidad)
       ========================================= */
    const root = document.documentElement;
    const btnDecrease = document.getElementById('font-decrease');
    const btnReset = document.getElementById('font-reset');
    const btnIncrease = document.getElementById('font-increase');

    const updateFontBtns = (activeBtn) => {
        [btnDecrease, btnReset, btnIncrease].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    };

    if (btnDecrease) btnDecrease.addEventListener('click', () => { root.style.setProperty('--base-font-size', '14px'); updateFontBtns(btnDecrease); });
    if (btnReset) btnReset.addEventListener('click', () => { root.style.setProperty('--base-font-size', '16px'); updateFontBtns(btnReset); });
    if (btnIncrease) btnIncrease.addEventListener('click', () => { root.style.setProperty('--base-font-size', '18px'); updateFontBtns(btnIncrease); });


    /* =========================================
       5. COLOR DE ACENTO
       ========================================= */
    const colorDots = document.querySelectorAll('.color-dot');
    
    // Cargar color guardado
    const savedColor = localStorage.getItem('accentColor') || 'blue';
    body.setAttribute('data-color', savedColor);
    colorDots.forEach(dot => {
        if(dot.getAttribute('data-color') === savedColor) dot.classList.add('active');
    });

    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            const newColor = dot.getAttribute('data-color');
            body.setAttribute('data-color', newColor);
            localStorage.setItem('accentColor', newColor);
            
            // Actualizar color del gráfico si existe
            if(window.skillsRadarChart) {
                const hexColor = getComputedStyle(body).getPropertyValue('--primary').trim() || '#2563eb';
                window.skillsRadarChart.data.datasets[0].borderColor = hexColor;
                window.skillsRadarChart.data.datasets[0].pointBackgroundColor = hexColor;
                window.skillsRadarChart.update();
            }
        });
    });


    /* =========================================
       EL RESTO DEL CÓDIGO (Typing, Radar, Terminal, Swiper)
       ========================================= */
    
    // Efecto Typing
    const titleElement = document.querySelector('.typing-text');
    if (titleElement) {
        const textToType = titleElement.textContent.trim(); 
        titleElement.textContent = ''; 
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                titleElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40);
            }
        }
        setTimeout(typeWriter, 300);
    }

    // Gráfico Radar
    const ctx = document.getElementById('skillsChart');
    if (ctx) {
        const initialColor = getComputedStyle(body).getPropertyValue('--primary').trim() || '#2563eb';
        window.skillsRadarChart = new Chart(ctx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Data Arch (ETL)', 'SQL & DBs', 'Python/JS Dev', 'IoT & Auto', 'Digital Fab (CNC)', 'Data Viz (BI)'],
                datasets: [{
                    label: 'Nivel', data: [80, 85, 95, 90, 85, 75], 
                    backgroundColor: 'rgba(128, 128, 128, 0.1)', borderColor: initialColor, pointBackgroundColor: initialColor, borderWidth: 2
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false } } }, plugins: { legend: { display: false } } }
        });
    }

    // Swiper
    document.querySelectorAll('.projectSwiper').forEach((element) => {
        new Swiper(element, {
            loop: true, autoHeight: true, spaceBetween: 10,
            pagination: { el: element.querySelector('.swiper-pagination'), clickable: true },
            navigation: { nextEl: element.querySelector('.swiper-button-next'), prevEl: element.querySelector('.swiper-button-prev') },
        });
    });

    // Terminal
    const tInput = document.getElementById('terminalInput');
    const tOutput = document.getElementById('terminalOutput');
    if (tInput && tOutput) {
        tInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = tInput.value.toLowerCase().trim();
                const line = document.createElement('p');
                line.className = 'terminal-line';
                if (cmd === 'clear') { tOutput.innerHTML = ''; } 
                else if (cmd === 'run-pipeline') {
                    line.innerHTML = `<span style="color: var(--primary)">>>> ${cmd}</span><br>[INFO] Extraction complete.<br>[SUCCESS] Loaded into ClickHouse.`;
                    tOutput.appendChild(line);
                } else if (cmd === 'help') {
                    line.innerHTML = `<span style="color: var(--primary)">>>> ${cmd}</span><br>Commands: run-pipeline, clear`;
                    tOutput.appendChild(line);
                } else if (cmd !== "") {
                    line.innerHTML = `<span style="color: #ff5f56">>>> Command not found.</span>`;
                    tOutput.appendChild(line);
                }
                tInput.value = ''; tOutput.scrollTop = tOutput.scrollHeight;
            }
        });
    }

    // Filtros Skills
    const skillInput = document.getElementById('skillInput');
    if (skillInput) {
        skillInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.tags span').forEach(span => {
                span.style.display = span.textContent.toLowerCase().includes(term) || term === "" ? "inline-block" : "none";
                if(term !== "") { span.style.background = "var(--primary)"; span.style.color = "white"; }
                else { span.style.background = ""; span.style.color = ""; }
            });
        });
    }

    // Flechas Detalles
    document.querySelectorAll('.exp-card').forEach(details => {
        details.addEventListener('toggle', () => {
            const arrow = details.querySelector('.icon-arrow');
            if (arrow) { arrow.style.transform = details.open ? 'rotate(180deg)' : 'rotate(0deg)'; }
        });
    });
});
/* =========================================
       6. SIMULADOR DE PIPELINE INTERACTIVO
       ========================================= */
    const runPipeBtn = document.getElementById('run-pipeline-btn');
    const dataDot = document.getElementById('data-dot');
    const consoleBox = document.getElementById('pipeline-console');
    
    // Nodos y sus respectivos logs
    const pipelineSteps = [
        { id: 'node-sheets', log: '[INFO] Iniciando Extracción desde Google Sheets API...' },
        { id: 'node-mage', log: '[INFO] Mage.ai Triggered: Transformando y limpiando datos (L, T, D)...' },
        { id: 'node-pg', log: '[SUCCESS] Carga inicial completa en Staging (PostgreSQL).' },
        { id: 'node-ch', log: '[INFO] Sincronizando con Data Warehouse columnar (ClickHouse)...' },
        { id: 'node-st', log: '[OK] Dashboard analítico de Streamlit actualizado en tiempo real. 🚀' }
    ];

    if (runPipeBtn && dataDot && consoleBox) {
        runPipeBtn.addEventListener('click', async () => {
            // Bloquear botón durante la ejecución
            runPipeBtn.disabled = true;
            runPipeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Ejecutando...';
            
            // Limpiar consola
            consoleBox.innerHTML = '';
            dataDot.style.opacity = '1';

            // Quitar clase activa de todos los nodos
            pipelineSteps.forEach(step => document.getElementById(step.id).classList.remove('active'));

            const graphContainer = document.getElementById('pipeline-graph');
            const containerRect = graphContainer.getBoundingClientRect();

            // Función auxiliar para esperar
            const sleep = ms => new Promise(r => setTimeout(r, ms));

            // Recorrer cada nodo
            for (let i = 0; i < pipelineSteps.length; i++) {
                const step = pipelineSteps[i];
                const nodeEl = document.getElementById(step.id);
                const nodeRect = nodeEl.getBoundingClientRect();

                // Calcular posición relativa al contenedor
                const targetX = nodeRect.left - containerRect.left + (nodeRect.width / 2) - 6; // -6 por la mitad del ancho del dot
                const targetY = nodeRect.top - containerRect.top + (nodeEl.querySelector('i').offsetHeight / 2) - 6;

                // Mover el punto
                dataDot.style.transform = `translate(${targetX}px, ${targetY}px)`;

                // Esperar a que el punto "viaje" (0.6s de la transición CSS + un poquito)
                await sleep(600);

                // Iluminar nodo actual
                nodeEl.classList.add('active');

                // Imprimir log
                const logLine = document.createElement('p');
                logLine.innerHTML = `<span style="color: #94a3b8;">[${new Date().toLocaleTimeString().split(' ')[0]}]</span> ${step.log}`;
                consoleBox.appendChild(logLine);
                consoleBox.scrollTop = consoleBox.scrollHeight;

                // Simular tiempo de "procesamiento" en ese nodo
                await sleep(800);
                
                // Apagar nodo anterior (opcional, si quieres que se mantenga prendido quita esta línea)
                if (i < pipelineSteps.length - 1) {
                    nodeEl.classList.remove('active');
                }
            }

            // Ocultar punto y restaurar botón
            await sleep(1000);
            dataDot.style.opacity = '0';
            dataDot.style.transform = `translate(0px, 50%)`; // Reset position
            runPipeBtn.disabled = false;
            runPipeBtn.innerHTML = '<i class="fa-solid fa-play"></i> Re-Ejecutar';
        });
    }