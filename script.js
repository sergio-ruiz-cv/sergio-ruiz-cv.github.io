/**
 * Sergio Ruiz Torres - CV Profesional e Interactivo
 * Módulos: Modo Oscuro, Gráfico de Radar, Engineering Terminal, Carruseles y UX
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MODO OSCURO (Dark Mode Toggle)
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
        if(window.skillsRadarChart) { window.skillsRadarChart.update(); }
    });


    /* =========================================
       2. EFECTO TYPING EN EL HEADER (Fix &amp;)
       ========================================= */
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


    /* =========================================
       3. GRÁFICO DE RADAR (Foco Data Engineer)
       ========================================= */
    const ctx = document.getElementById('skillsChart');
    if (ctx) {
        window.skillsRadarChart = new Chart(ctx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: [
                    'Arquitectura de Datos (ETL)', 
                    'Sistemas y BD (SQL)', 
                    'Software Dev (Python/JS)', 
                    'Automatización e IoT', 
                    'Manufactura Digital (CNC)', 
                    'Data Viz (Power BI)'
                ],
                datasets: [{
                    label: 'Nivel Técnico',
                    data: [80, 85, 95, 90, 85, 75], 
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: '#2563eb',
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(128, 128, 128, 0.2)' },
                        grid: { color: 'rgba(128, 128, 128, 0.2)' },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        pointLabels: {
                            font: { family: 'Inter', size: window.innerWidth < 600 ? 10 : 12, weight: '600' },
                            color: '#888888'
                        },
                        ticks: { display: false }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }


    /* =========================================
       4. INICIALIZACIÓN DE CARRUSELES
       ========================================= */
    const projectSwipers = document.querySelectorAll('.projectSwiper');
    projectSwipers.forEach((element) => {
        new Swiper(element, {
            loop: true,
            grabCursor: true,
            autoHeight: true, 
            spaceBetween: 10,
            pagination: { el: element.querySelector('.swiper-pagination'), clickable: true, dynamicBullets: true },
            navigation: {
                nextEl: element.querySelector('.swiper-button-next'),
                prevEl: element.querySelector('.swiper-button-prev'),
            },
            autoplay: { delay: 4500, pauseOnMouseEnter: true, disableOnInteraction: false },
            effect: "slide",
            speed: 600,
        });
    });


    /* =========================================
       5. LÓGICA DE LA TERMINAL: ENGINEERING LOGS
       ========================================= */
    const tInput = document.getElementById('terminalInput');
    const tOutput = document.getElementById('terminalOutput');

    if (tInput && tOutput) {
        const commands = {
            'help': 'Comandos: status, stack, run-pipeline, clear, contact',
            'status': '🟢 System: Online | ETL_Worker: Idle | CNC_Link: Connected | DB_ClickHouse: Ready',
            'stack': 'Core Tech: Python 3.11, SQL, Dagster (Orchestration), ClickHouse, Fusion 360, JavaScript.',
            'contact': 'sergio.r.a.ruiz.t@gmail.com | LinkedIn: sergio-ruiz-torres-engineer',
            'clear': ''
        };

        tInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = tInput.value.toLowerCase().trim();
                const line = document.createElement('p');
                line.className = 'terminal-line';
                
                if (cmd === 'clear') {
                    tOutput.innerHTML = '';
                } 
                else if (cmd === 'run-pipeline') {
                    line.innerHTML = `<span style="color: #3b82f6">>>> ${cmd}</span><br>
                    [INFO] Iniciando Pipeline de Datos de Sergio...<br>
                    [INFO] Extrayendo datos de S&F Atelier API (CNC Logs)...<br>
                    [INFO] Transformando: Limpieza de nulos y normalización de esquemas...<br>
                    [SUCCESS] 128,450 filas cargadas en ClickHouse Data Warehouse exitosamente.`;
                    tOutput.appendChild(line);
                }
                else if (commands[cmd]) {
                    line.innerHTML = `<span style="color: #3b82f6">>>> ${cmd}</span><br>${commands[cmd]}`;
                    tOutput.appendChild(line);
                } 
                else if (cmd !== "") {
                    line.innerHTML = `<span style="color: #ff5f56">>>> Comando '${cmd}' no reconocido. Prueba 'status' o 'run-pipeline'.</span>`;
                    tOutput.appendChild(line);
                }
                
                tInput.value = '';
                tOutput.scrollTop = tOutput.scrollHeight;
            }
        });
    }


    /* =========================================
       6. FILTRADO DINÁMICO DE SKILLS
       ========================================= */
    const skillInput = document.getElementById('skillInput');
    const skillSpans = document.querySelectorAll('.tags span');

    if (skillInput) {
        skillInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            skillSpans.forEach(span => {
                const skillText = span.textContent.toLowerCase();
                if (skillText.includes(searchTerm) || searchTerm === "") {
                    span.style.display = "inline-block";
                    if (searchTerm !== "") {
                        span.style.backgroundColor = "var(--primary)";
                        span.style.color = "#ffffff";
                    } else {
                        span.style.backgroundColor = "";
                        span.style.color = "";
                    }
                } else {
                    span.style.display = "none";
                }
            });
        });
    }

    /* =========================================
       7. ANIMACIÓN DE FLECHAS (Experiencia)
       ========================================= */
    const detailElements = document.querySelectorAll('.exp-card');
    detailElements.forEach(details => {
        details.addEventListener('toggle', () => {
            const arrow = details.querySelector('.icon-arrow');
            if (arrow) {
                arrow.style.transform = details.open ? 'rotate(180deg)' : 'rotate(0deg)';
                arrow.style.color = details.open ? 'var(--primary)' : 'var(--text-muted)';
            }
        });
    });

});