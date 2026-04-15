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
            'proj_title': 'Portafolio de Proyectos',
            'skills_title': 'Habilidades Técnicas',
            'certs_title': 'Certificaciones Oficiales',
            'edu_title': 'Formación Académica',
            'edu_status1': 'En curso', 'edu_status2': 'Titulado'
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
            'proj_title': 'Project Portfolio',
            'skills_title': 'Technical Skills',
            'certs_title': 'Official Certifications',
            'edu_title': 'Education',
            'edu_status1': 'In progress', 'edu_status2': 'Graduated'
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