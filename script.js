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
        if (settingsPanel) settingsPanel.classList.toggle('active');
        if (settingsOverlay) settingsOverlay.classList.toggle('active');
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
       3. CAMBIO DE IDIOMA (i18n Básico) - COBERTURA GLOBAL
       ========================================= */
    const dict = {
        'es': {
            'settings_title': '<i class="fa-solid fa-gear"></i> Panel de Control',
            'download_cv': 'Descargar CV en PDF',
            'theme': 'Apariencia', 'light': 'Claro', 'dark': 'Oscuro',
            'language': 'Idioma', 'font_size': 'Accesibilidad (Texto)', 'accent_color': 'Color de Acento',
            'subtitle': 'Ingeniería Civil Electrónica | Operaciones & Data Engineering | Co-fundador Corporativo',
            'profile_title': 'Perfil Profesional & Visión Directiva',
            'profile_desc': 'Estudiante de Ingeniería Civil Electrónica con una sólida formación en optimización de procesos, automatización industrial y arquitectura de datos avanzada. Cuento con una marcada mentalidad analítica y capacidad para liderar unidades operativas, habiendo co-fundado y administrado empresas de diseño y servicios técnicos (S&F Atelier, Singular Electric). Experiencia directa coordinando la cadena de suministro mediante la negociación estratégica con proveedores de hardware industrial y componentes especializados en la región de Valparaíso. Mi enfoque profesional radica en el uso de metodologías ágiles y analítica de datos (Python, SQL, ClickHouse, Power BI) para transformar información cruda en métricas de rendimiento financiero y operativo, estructurando flujos organizacionales eficientes orientados a la reducción de mermas, la maximización de ingresos y la toma de decisiones ejecutivas de alto nivel.',
            'exp_title': 'Experiencia Destacada',
            'exp_sf_title': 'Co-fundador & Director Técnico | S&F Atelier',
            'exp_sf_loc': 'Viña del Mar, Chile',
            'present': 'Presente',
            'exp_sf_list': '<li>Administración integral del negocio, cálculo presupuestario, estructuras de costos de manufactura y captación activa de clientes.</li><li>Diseño, cotización y construcción de <strong>Router CNC de 3x2 metros</strong>, estableciendo alianzas de suministro con proveedores industriales de la región.</li><li>Modelado paramétrico avanzado en <strong>Fusion 360</strong> enfocado en optimizar el despiece para reducir el desperdicio de materia prima a tasas cercanas a cero.</li>',
            'exp_andes_title': 'Data Engineer Junior | Andes Hosting',
            'exp_andes_loc': 'Valparaíso / Remoto',
            'exp_andes_date': 'Pasantía Enero 2026 - Abril 2026',
            'exp_andes_list': '<li>Desarrollo de flujos ETL utilizando <strong>Python</strong> y orquestación con <strong>Dagster</strong> para automatizar el procesamiento de datos corporativos.</li><li>Consultas de alta velocidad y estructuración de bases de datos relacionales y columnares con <strong>SQL</strong> y <strong>ClickHouse</strong>.</li><li>Diseño e implementación de tableros de control ejecutivos y dashboards dinámicos mediante <strong>Power BI</strong> y <strong>Streamlit</strong>.</li>',
            'exp_adexus_title': 'Instalador de Equipos Transbank | Adexus',
            'exp_adexus_loc': 'Viña del Mar / Valparaíso',
            'exp_adexus_date': 'Pasantía 2018',
            'exp_adexus_list': '<li>Instalación técnica y configuración de conectividad en terminales POS de alta criticidad transaccional.</li><li>Cumplimiento riguroso de acuerdos de niveles de servicio (SLA) corporativos y control de rutas logísticas eficientes.</li>',
            'proj_title': 'Portafolio de Proyectos',
            'proj_cnc_title': 'Automatización Industrial y Control Numérico (CNC)',
            'proj_cnc_desc': 'Diseño, cálculo cinemático y desarrollo de un Router CNC de gran formato (3x2 metros) enfocado en manufactura digital de alta precisión. Integración completa de hardware y electrónica de potencia, incluyendo el cálculo de torque para motores paso a paso, diseño del tablero eléctrico industrial y programación del sistema de control bajo Mach3. Implementación de técnicas avanzadas de aislamiento físico y blindaje electromagnético (EMI) para garantizar la inmunidad al ruido de la lógica de control frente a las corrientes parásitas del inversor del husillo industrial.',
            'tag_industrial': 'Diseño industrial',
            'tag_electronics': 'Electrónica',
            'proj_data_title': 'Arquitectura de Datos End-to-End',
            'proj_data_desc': 'Desarrollo e implementación de un ecosistema analítico robusto de procesamiento batch. Ingestión y limpieza de fuentes semiestructuradas mediante tuberías ETL orquestadas por DAGs complejos. Diseño de un modelo híbrido con una capa de Staging relacional en PostgreSQL y un almacén de datos columnar de alto rendimiento (OLAP) en ClickHouse, logrando optimizar la latencia de lectura y consultas analíticas masivas en milisegundos. Capa de presentación integrada con dashboards interactivos en Streamlit para la toma de decisiones estratégicas.',
            'sim_title': 'Flujo de Datos en Vivo',
            'run_btn': 'Ejecutar',
            'sim_wait': 'Esperando inicialización del trigger...',
            'tag_prog': 'Programación',
            'tag_data_analysis': 'Análisis de datos',
            'proj_web_title': 'Interfaces de Usuario y Capas de Presentación Corporativas',
            'proj_web_desc': 'Diseño y desarrollo frontend de plataformas responsivas y catálogos e-commerce con un fuerte enfoque en UX/UI y rendimiento. Optimización de tiempos de carga, estructuración semántica avanzada para SEO y creación de paneles interactivos de consumo de datos. Esta competencia permite el cierre del ciclo de vida del dato, construyendo interfaces amigables y eficientes para que los tomadores de decisiones consuman e interactúen con la información procesada en los pipelines de backend.',
            'proj_electric_title': 'Ingeniería Eléctrica, Gestión Comercial y Analítica de Negocios',
            'proj_electric_desc': 'Co-fundador y gestor operativo en Singular Electric y colaborador técnico en el voluntariado Iluminando Chile de la PUCV. Lidero el ciclo completo del negocio: desde el diseño y cálculo de planos eléctricos residenciales/comerciales bajo normativa SEC, hasta la creación de estrategias comerciales en redes sociales y armado de portafolios técnicos para la captación activa de clientes. A nivel de operaciones, desarrollo el modelado y cálculo de costos de servicios e implemento un flujo de arquitectura de datos donde centralizo y ordeno todos los ingresos mensuales para alimentar un dashboard analítico interactivo que permite visualizar el rendimiento financiero del negocio, identificar las demandas estacionales y analizar cuáles son los servicios de ingeniería más solicitados.',
            'code_btn': 'Código',
            'demo_btn': 'Demo en Vivo',
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
            'footer_rights': 'Todos los derechos reservados.',
            'back_cv': 'Volver al CV',
            
            // Subpáginas de Casos de Estudio
            'pipe_head_title': 'Arquitectura de Datos End-to-End', 'pipe_head_sub': 'De la ingesta transaccional al Data Warehouse analítico',
            'pipe_sec1_title': 'El Ecosistema Completo', 'pipe_sec1_desc': 'A diferencia de los pipelines tradicionales que asumen que los datos "simplemente llegan", este proyecto demuestra un dominio Full-Stack Data. Cubre desde el desarrollo de la interfaz operativa que genera la información (Punto de Venta transaccional), hasta la orquestación del flujo ETL y la optimización de consultas en la base de datos columnar.',
            'pipe_sec2_title': '1. Capa de Origen (Ingesta Transaccional)',
            'pipe_pos_card_title': 'Sistema POS (Punto de Venta)', 'pipe_pos_card_desc': 'Desarrollé una aplicación frontend interactiva que actúa como la fuente principal de verdad (OLTP). Este sistema gestiona el catálogo, carritos de compra y emite los recibos, generando la volumetría de datos crudos (JSON/APIs) que alimenta el pipeline de backend.', 'pipe_pos_btn': 'Abrir Emulador POS',
            'pipe_line_card_title': 'Pipeline de Ingesta', 'pipe_line_card_desc': 'Los datos generados por el POS y otras fuentes semiestructuradas (como Google Sheets de inventario) son capturados mediante scripts en Python. Se aplican reglas de validación de tipos, limpieza de valores nulos y estandarización antes de insertarlos en la base de datos de staging.',
            'pipe_sec3_title': '2. Transformación y Data Warehouse', 'pipe_sec3_desc': 'Una vez capturados los datos transaccionales, el objetivo es transformarlos para que sean útiles en la toma de decisiones empresariales sin afectar el rendimiento del POS.',
            'pipe_st_title': 'Staging (PostgreSQL)', 'pipe_st_desc': 'Garantiza integridad ACID. Resuelve dependencias de tablas intermedias y almacena los metadatos de las transacciones limpias antes del modelado analítico masivo.',
            'pipe_olap_title': 'OLAP (ClickHouse)', 'pipe_olap_desc': 'El núcleo del rendimiento. Al indexar por columnas, permite procesar agregaciones históricas complejas en milisegundos, reduciendo los costos computacionales.',
            'pipe_bi_title': 'BI (Streamlit / Power BI)', 'pipe_bi_desc': 'Capa de presentación de alto nivel. Consume las vistas materializadas de ClickHouse para mostrar KPIs financieros y operativos en tiempo real a los gerentes.',
            'pipe_sec4_title': 'Optimización Analítica (Code Snippet)', 'pipe_sec4_desc': 'Ejemplo de cómo los datos del POS son consultados en la capa analítica de ClickHouse. Se eliminan los `JOINs` costosos a favor de agregaciones nativas sobre la tabla desnormalizada.',
            'pipe_sec5_title': 'Impacto del Flujo', 'pipe_kpi1': 'Latencia de consulta en ClickHouse', 'pipe_kpi2': 'Trazabilidad desde la venta hasta el dashboard', 'pipe_kpi3': 'Trabajo manual en consolidación de Excel',
            
            'cnc_head_title': 'Ingeniería Mecatrónica: Router CNC', 'cnc_head_sub': 'Ciclo completo de desarrollo: Desde el modelado analítico de distribución de esfuerzos (CAD) hasta la calibración física, diseño del control electrónico e implementación sostenible orientada a la manufactura.',
            'cnc_sec1_title': 'Gemelo Digital vs. Implementation Física', 'cnc_sec1_desc': 'Desliza la barra central para comparar el modelado 3D (realizado para validar geometrías y reducción de holguras) con el ensamblaje físico operando en el taller.', 'cnc_label_cad': 'MODELO 3D (CAD)', 'cnc_label_real': 'ENSAMBLE REAL',
            'cnc_sec2_title': 'Arquitectura Hardware y Decisiones de Diseño',
            'cnc_card1_title': 'Husillo Industrial vs. Router Comercial', 'cnc_card1_desc': 'A diferencia de los equipos comerciales de bajo costo que utilizan routers de mano (ej. Makita/Dewalt), esta máquina integra un Husillo Industrial (Spindle) controlado por un Variador de Frecuencia (VFD). Permite un ciclo de trabajo continuo (24/7), posee refrigeración activa, rodamientos de contacto angular que soportan altísimas cargas radiales/axiales y elimina el \'runout\' (oscilación), logrando acabados milimétricos imposibles con herramientas manuales adaptadas.',
            'cnc_card2_title': 'Cinemática: Motores Paso a Paso', 'cnc_card2_desc': 'Para la tracción se seleccionaron Motores Stepper (Paso a Paso) dimensionados bajo cálculos estrictos de torque de retención (holding torque) y resistencia inercial. Al utilizar drivers con microstepping, logramos resoluciones nanométricas sin la necesidad de implementar sistemas de lazo cerrado (servomotores) de alto costo. La robustez del pórtico de aluminio y guías lineales previenen la pérdida de pasos, garantizando precisión repetible en formatos de 3x2 metros.',
            'cnc_sec3_title': 'Seguridad y Tablero de Control', 'cnc_sec3_desc': 'La electrónica de potencia y la lógica de control convergen en un tablero diseñado bajo normativas de aislamiento industrial. Manejar el husillo y los motores simultáneamente genera corrientes parásitas severas.',
            'cnc_li1': '<strong>Protección Lógica y Eléctrica:</strong> El tablero integra componentes de seguridad estandarizados, incluyendo interruptor diferencial, disyuntor magnetotérmico y luces piloto, asegurando la integridad tanto del operador como de los equipos ante sobrecargas o fallas a tierra.',
            'cnc_li2': '<strong>Aislamiento EMI:</strong> Separación física y cableado apantallado para proteger la controladora (Mach3) de las interferencias electromagnéticas del VFD.',
            'cnc_li3': '<strong>Seguridad Física:</strong> Circuito de paradas de emergencia (E-Stop) interconectado por hardware (NC), interrumpiendo la potencia de tracción inmediatamente sin depender de software.',
            'cnc_sec4_title': 'Visión S&F: Sostenibilidad en la Manufactura', 'cnc_sec4_desc': 'Como fundador de S&F Atelier, la integración de esta tecnología no solo buscaba precisión, sino también responsabilidad ambiental en el diseño mobiliario.',
            'cnc_sust1_title': 'Optimización de Retazos', 'cnc_sust1_desc': 'El diseño paramétrico y el \'nesting\' (anidado) de despieces en Fusion 360 / SketchUp antes del corte reducen la pérdida de tableros a casi cero.',
            'cnc_sust2_title': 'Ciclo Cerrado (Compostaje)', 'cnc_sust2_desc': 'La extracción de polvo está canalizada. La viruta y aserrín limpios generados por el CNC son reutilizados directamente para compostaje y masillas de restauración de muebles antiguos.',

            'elec_head_title': 'Electricidad y Diseño de Circuitos', 'elec_head_sub': 'Desarrollo de proyectos residenciales y comerciales, diseño de planos bajo normativas vigentes e intervención social orientada a la seguridad eléctrica.',
            'elec_sec1_title': 'Habilidades Eléctricas Aplicadas', 'elec_sec1_desc': 'Mi formación como Técnico en Electrónica y estudiante de Ingeniería Civil Electrónica en la PUCV me otorga un dominio avanzado sobre sistemas de baja tensión, interpretación de esquemas analíticos y distribución de potencia. Esta base me permite diseñar soluciones seguras, eficientes y normalizadas tanto en hardware industrial como en redes de distribución interna.',
            'elec_sec2_title': 'Ejes de Experiencia y Proyectos',
            'elec_card1_title': 'Singular Electric', 'elec_card1_desc': 'Diseño e implementación de instalaciones eléctricas residenciales y comerciales. Levantamiento de requerimientos en terreno, cálculo de protecciones térmicas y diferenciales, dimensionamiento de alimentadores y ejecución de tableros de distribución general respetando estándares técnicos y de seguridad.',
            'elec_card2_title': 'Iluminando Chile', 'elec_card2_desc': 'Participación activa en el voluntariado de la PUCV enfocado en la regularización y mejora de redes eléctricas domésticas en sectores vulnerables. Diagnóstico de instalaciones deficientes, reestructuración de circuitos críticos, montaje de canalizaciones y concientización sobre el uso seguro de la energía para prevenir riesgos de siniestros.',
            'elec_sec3_title': 'Diseño de Circuitos y Planos Técnicos', 'elec_sec3_desc': 'Dominio de herramientas de software CAD para la confección de planos eléctricos comerciales y residenciales. Capacidad de estructurar diagramas unilineales, cuadros de carga detallados y plantas de alumbrado/fuerza listo para procesos de tramitación y ejecución en obra.',
            'elec_skills_title': 'Competencias Clave en Proyectos:',
            'elec_li1': 'Cálculo preciso de curvas de disparo para disyuntores magnetotérmicos.',
            'elec_li2': 'Coordinación de protecciones para evitar fallas en cascada y cortocircuitos.',
            'elec_li3': 'Diseño de mallas de puesta a tierra y medición de resistividad de terreno.',
            'elec_li4': 'Estructuración de canalizaciones EMT, PVC y tableros de distribución general (TDF).',

            'case_web_title': 'Casos de Estudio: Desarrollo Frontend', 'case_web_subtitle': 'Demostración interactiva de diseño responsivo y UX/UI nativo.',
            'case_psic_title': 'Plataforma Web | Psicología Clínica', 'case_psic_desc': 'Diseño de landing page enfocado en la conversión, agendamiento rápido y experiencia de usuario (UX) pacífica. Implementación 100% adaptativa.',
            'case_flash_title': 'Servicios Eléctricos | Flash', 'case_flash_desc': 'Diseño corporativo para servicios de instalaciones y regularización eléctrica. Enfoque en claridad de servicios y transmisión de confianza técnica.',
            'case_back_title': 'Desarrollo Backend & Sistemas Internos', 'case_back_subtitle': 'Arquitectura de datos, lógica de negocios e interfaces privadas.',
            'case_pos_title': 'Sistema POS (Point of Sale) & Control de Inventario', 'case_pos_desc': 'Desarrollo de interfaz de caja interactiva conectada a base de datos. Permite registro rápido de ventas, emisión de tickets y actualización de stock en tiempo real.',
            'arch_diagram': 'Arquitectura de Datos'
        },
        'en': {
            'settings_title': '<i class="fa-solid fa-gear"></i> Control Panel',
            'download_cv': 'Download PDF Resume',
            'theme': 'Appearance', 'light': 'Light', 'dark': 'Dark',
            'language': 'Language', 'font_size': 'Accessibility (Text)', 'accent_color': 'Accent Color',
            'subtitle': 'Civil Electronic Engineering | Operations & Data Engineering | Corporate Co-founder',
            'profile_title': 'Professional Profile & Executive Vision',
            'profile_desc': 'Civil Electronic Engineering student with a solid background in process optimization, industrial automation, and advanced data architecture. Possess a strong analytical mindset and ability to lead operational units, having co-founded and managed technical services and design companies (S&F Atelier, Singular Electric). Direct experience coordinating the supply chain through strategic negotiation with industrial hardware providers and specialized component suppliers in the Valparaíso region. My professional focus lies in utilizing agile methodologies and data analytics (Python, SQL, ClickHouse, Power BI) to transform raw data into financial and operational performance metrics, structuring efficient organizational workflows geared towards waste reduction, revenue maximization, and high-level executive decision-making.',
            'exp_title': 'Key Experience',
            'exp_sf_title': 'Co-founder & Technical Director | S&F Atelier',
            'exp_sf_loc': 'Viña del Mar, Chile',
            'present': 'Present',
            'exp_sf_list': '<li>Comprehensive business management, budget calculation, manufacturing cost structures, and active client acquisition.</li><li>Design, quotation, and construction of an industrial <strong>3x2 meter CNC Router</strong>, establishing supply alliances with regional industrial providers.</li><li>Advanced parametric modeling in <strong>Fusion 360</strong> focused on component nesting optimization to reduce raw material waste close to zero percent.</li>',
            'exp_andes_title': 'Junior Data Engineer | Andes Hosting',
            'exp_andes_loc': 'Valparaíso / Remote',
            'exp_andes_date': 'Internship Jan 2026 - Apr 2026',
            'exp_andes_list': '<li>ETL pipeline development using <strong>Python</strong> and orchestration with <strong>Dagster</strong> to automate corporate data processing loops.</li><li>High-speed querying and structural setup of relational and columnar databases using <strong>SQL</strong> and <strong>ClickHouse</strong>.</li><li>Design and deployment of executive control boards and dynamic analytics dashboards using <strong>Power BI</strong> and <strong>Streamlit</strong>.</li>',
            'exp_adexus_title': 'Transbank Equipment Installer | Adexus',
            'exp_adexus_loc': 'Viña del Mar / Valparaíso',
            'exp_adexus_date': 'Internship 2018',
            'exp_adexus_list': '<li>Technical installation and network configuration on high-criticality transactional POS terminals.</li><li>Rigorous fulfillment of corporate Service Level Agreements (SLAs) and deployment of efficient logistical service routing.</li>',
            'proj_title': 'Project Portfolio',
            'proj_cnc_title': 'Industrial Automation & Computer Numerical Control (CNC)',
            'proj_cnc_desc': 'Design, kinematic sizing, and hardware development of a large-format CNC Router (3x2 meters) tailored for high-precision digital manufacturing. Complete deployment of hardware and power electronics, including holding torque stepper calculations, industrial breaker board configurations, and Mach3 system control programming. Implementation of physical isolation models and electromagnetic shielding (EMI) techniques to preserve the integrity of the control logic against parasitic currents generated by the high-speed industrial spindle inverter.',
            'tag_industrial': 'Industrial Design',
            'tag_electronics': 'Electronics',
            'proj_data_title': 'End-to-End Data Architecture',
            'proj_data_desc': 'Design and deployment of a robust analytical distributed ecosystem for batch processing. Ingestion and parsing of semi-structured assets managed by complex DAG execution blocks. Modeled a hybrid storage design utilizing a transactional staging layer in PostgreSQL and an ultra-high performance columnar analytics store (OLAP) in ClickHouse, minimizing heavy query latencies down to milliseconds. Presentation layer integrated with dynamic data apps in Streamlit for strategic steering metrics.',
            'sim_title': 'Live Data Flow',
            'run_btn': 'Run',
            'sim_wait': 'Waiting for trigger initialization...',
            'tag_prog': 'Programming',
            'tag_data_analysis': 'Data Analysis',
            'proj_web_title': 'User Interfaces and Corporate Presentation Layers',
            'proj_web_desc': 'Frontend design and development of responsive platforms and e-commerce catalogs with a deep focus on UX/UI and load performance. Optimization of asset speeds, semantic SEO wiring, and layout setups for interactive analytical interfaces. This core competency completes the data life cycle, providing data-driven assets and sleek control displays for management stakeholders to seamlessly consume distributed backend datasets.',
            'proj_electric_title': 'Electrical Engineering, Business Management, and Analytics',
            'proj_electric_desc': 'Co-founder and operational manager at Singular Electric and technical contributor at PUCV’s Iluminando Chile volunteering organization. I oversee the full lifecycle of the business: from the CAD engineering and calculations of residential/commercial power distribution schemas under strict national electrical codes (SEC), to deployment of social media commercial acquisition strategies and technical portfolios. Operationally, I model labor and item costing systems and maintain data pipelines to centralize monthly cash flows, feeding a business intelligence dashboard to evaluate corporate health, identify seasonal demand curves, and track engineering requests.',
            'code_btn': 'Code',
            'demo_btn': 'Live Demo',
            'skills_title': 'Technical Skills',
            'certs_title': 'Official Certifications',
            'edu_title': 'Education',
            'edu_degree1': 'Civil Electronic Engineering',
            'edu_uni1': 'Pontificia Universidad Católica de Valparaíso (PUCV)',
            'edu_status1': 'In progress',
            'edu_degree2': 'Electronics Technician',
            'edu_uni2': 'High School Diploma with Technical Degree',
            'edu_status2': 'Graduated',
            'footer_desc': 'Civil Electronic Engineering & Data Engineering. Designing solutions where hardware and software converge.',
            'footer_nav': 'Navigation',
            'nav_profile': 'Profile',
            'nav_exp': 'Experience',
            'nav_proj': 'Portfolio',
            'footer_deploy': 'Deployed via GitHub Pages © 2026',
            'footer_rights': 'All rights reserved.',
            'back_cv': 'Back to CV',
            
            // Case Studies Subpages
            'pipe_head_title': 'End-to-End Data Architecture', 'pipe_head_sub': 'From transactional ingest to analytical Data Warehouse',
            'pipe_sec1_title': 'The Complete Ecosystem', 'pipe_sec1_desc': 'Unlike traditional pipelines that assume data "just arrives", this project demonstrates full Full-Stack Data domain. It covers everything from developing the operational frontend interface that generates information (transactional POS), to ETL workflow orchestration and columnar database query tuning.',
            'pipe_sec2_title': '1. Origin Layer (Transactional Ingestion)',
            'pipe_pos_card_title': 'POS System (Point of Sale)', 'pipe_pos_card_desc': 'Developed an interactive frontend application that acts as the primary source of truth (OLTP). This system manages the catalog, shopping carts, and prints receipts, generating raw data volume (JSON/APIs) feeding the backend infrastructure.', 'pipe_pos_btn': 'Open POS Emulator',
            'pipe_line_card_title': 'Ingestion Pipeline', 'pipe_line_card_desc': 'Data records triggered by the POS and semi-structured assets (such as inventory Google Sheets) are polled by Python scripts. Type validation, null filtering, and structured parsing schemas are applied before ingestion into staging.',
            'pipe_sec3_title': '2. Transformation & Data Warehouse', 'pipe_sec3_desc': 'Once operational datasets are parsed, the objective shifts to transforming data for corporate decision-making models without degrading live checkout speeds.',
            'pipe_st_title': 'Staging (PostgreSQL)', 'pipe_st_desc': 'Guarantees strict ACID conformity. Settles intermediate relationships and caches transactional logs prior to final analytical indexing structures.',
            'pipe_olap_title': 'OLAP (ClickHouse)', 'pipe_olap_desc': 'The core computational engine. Sized by columns, it processes huge database joins and historical calculations down to milliseconds, shrinking compute footprints.',
            'pipe_bi_title': 'BI (Streamlit / Power BI)', 'pipe_bi_desc': 'High-level dashboard presentation layer. Consumes real-time materialized data structures from ClickHouse to serve operational KPIs directly to executives.',
            'pipe_sec4_title': 'Analytical Query Optimization (Code Snippet)', 'pipe_sec4_desc': 'Production code sample highlighting how transactional entries are pulled inside ClickHouse. Heavy computing cost JOIN structures are discarded in favor of column-oriented metrics.',
            'pipe_sec5_title': 'System Performance Architecture', 'pipe_kpi1': 'Query latency inside ClickHouse cluster', 'pipe_kpi2': 'Data lineage from live receipt to analytics panel', 'pipe_kpi3': 'Manual hours spent on custom Excel macro parsing',
            
            'cnc_head_title': 'Mechatronics Engineering: CNC Router', 'cnc_head_sub': 'Full-cycle engineering: From analytical structural FEA loading profiles to mechatronic wiring alignments, inverter EMI grounding blueprints, and waste mitigation practices.',
            'cnc_sec1_title': 'Digital Twin vs. Physical Deployment', 'cnc_sec1_desc': 'Drag the middle dividing line to contrast the analytical 3D CAD blueprints (built to optimize load clearances) with the real physical gantry mechanics firing in the assembly shop.', 'cnc_label_cad': '3D CAD DATA TWIN', 'cnc_label_real': 'LIVE ASSEMBLY RUN',
            'cnc_sec2_title': 'Hardware Architecture & Mechatronic Trade-offs',
            'cnc_card1_title': 'Industrial Spindle vs. Consumer Router', 'cnc_card1_desc': 'Unlike low-tier consumer CNC framing kits relying on generic manual handheld routers (Makita/Dewalt), this build centers around an active high-frequency industrial spindle governed by a Variable Frequency Drive (VFD). This configuration allows heavy continuous duty cycles (24/7), features active liquid thermal dissipation, matches angular contact tracking bearing ratings for high axial loads, and cuts shaft runout to zero for high-tolerance routing sheets.',
            'cnc_card2_title': 'Kinematic Design: High-Torque Stepper Alignment', 'cnc_card2_desc': 'X, Y, and Z motion structures rely on heavy industrial Stepper Motors calculated against tight mechanical holding torque curves and structural inertia profiles. Paired with microstepping driver micro-indexing, the system holds high resolution without stepping into complex closed-loop servo loops. The solid aluminum crossgantry structure guarantees zero lost steps across a 3x2m frame grid.',
            'cnc_sec3_title': 'Breaker Alignment & Operational Safety Panel', 'cnc_sec3_desc': 'Power distribution and control micro-circuits are routed inside a dedicated enclosure wired against rigorous industrial isolation parameters. Running high-current spindle tasks alongside micro-logic lines triggers critical EMI noise profiles.',
            'cnc_li1': '<strong>Logic & Electrical Protection:</strong> Enclosure integrates national electrical standard safety breakers, including residual-current safety switches (RCD), thermo-magnetic overcurrent protectors, and pilot monitoring displays keeping users and components safe.',
            'cnc_li2': '<strong>EMI Suppression:</strong> Structural physical division and shielded twisted cabling insulation protect the controller framework (Mach3) from VFD overcurrent harmonic frequencies.',
            'cnc_li3': '<strong>Physical E-Stop Routing:</strong> Safety hardware loops are hardwired via Normally Closed (NC) physical nodes, dropping gantry power loops immediately without relying on processing scripts.',
            'cnc_sec4_title': 'S&F Stance: Environmental Sustainability in Production', 'cnc_sec4_desc': 'As the managing co-founder of S&F Atelier, embedding this mechatronic build wasn\'t only about material tolerance, but also bringing ecological liability to digital woodworking.',
            'cnc_sust1_title': 'Nesting Component Optimization', 'cnc_sust1_desc': 'Parametric blueprint assembly and nesting algorithms calculated inside Fusion 360 / SketchUp before running gantry cuts push layout sheets wastage down towards zero.',
            'cnc_sust2_title': 'Closed-loop In-shop Composting', 'cnc_sust2_desc': 'Gantry vacuum lines run into active material separation canisters. Pure untreated timber sawdust yields are routed straight to organic agricultural composting and historic restoration veneer matching compounds.',

            'elec_head_title': 'Electrical Systems & Schematic Design', 'elec_head_sub': 'Development of residential and commercial grid projects, CAD wire layout mapping under modern codes, and safety volunteering structures.',
            'elec_sec1_title': 'Applied Power & Electrical Competencies', 'elec_sec1_desc': 'My dual background as an Electronics Technician and Civil Electronic Engineering scholar at PUCV establishes a deep mastery of low-voltage distribution frameworks, schematic architecture, and grid layout designs. This enables me to deploy resilient, code-compliant breaker alignments across both industrial production machines and corporate facilities.',
            'elec_sec2_title': 'Operational Frameworks & Engagements',
            'elec_card1_title': 'Singular Electric', 'elec_card1_desc': 'Co-founded and operated a business mapping commercial power upgrades and residential grid arrays. Managed field surveying, calculation of overcurrent safety curves, wire gauge sizing against thermal drop factors, and assembly of code-compliant main distribution panels.',
            'elec_card2_title': 'Iluminando Chile (PUCV)', 'elec_card2_desc': 'Active leadership role within the university volunteer branch regularizing legacy household wiring arrays across underprivileged areas in Valparaíso. Handled danger tracking, calculated load balances, rewired main breakers, and educated families on electrical risk mitigation.',
            'elec_sec3_title': 'Circuit Schematics & CAD Drafting blueprints', 'elec_sec3_desc': 'Proficient application of specialized drafting toolsets (AutoCAD Electrical) to draft comprehensive engineering blueprints. Handled layout unilineal arrays, balancing load distribution charts, and drafting structural building electrical conduits ready for governmental inspections.',
            'elec_skills_title': 'Core Electrical Sizing Focus:',
            'elec_li1': 'Precise calculation of magnetic trip curve profiles for commercial breakers.',
            'elec_li2': 'Sizing coordination architectures to insulate errors and prevent cascade drop faults.',
            'elec_li3': 'Grounding grid system design and field ground resistance measuring tasks.',
            'elec_li4': 'Routing specifications for EMT, PVC conduits, and structural heavy wire trays (TDF).',

            'case_web_title': 'Case Studies: Frontend Engineering', 'case_web_subtitle': 'Interactive demonstration of responsive design and native UX/UI workflows.',
            'case_psic_title': 'Web Architecture | Clinical Psychology', 'case_psic_desc': 'Landing page conversion layout optimized for client booking pipelines, lightweight rendering speeds, and serene UX interfaces. 100% responsive.',
            'case_flash_title': 'Electrical Outfits Portfolio | Flash', 'case_flash_desc': 'Corporate portfolio mapping layout for certified contractors. Structured around service catalog index cards and technical validation layouts.',
            'case_back_title': 'Internal Systems & Business Tools Engineering', 'case_back_subtitle': 'Distributed analytical architectures, ledger backends, and metrics views.',
            'case_pos_title': 'POS Interface & Inventory Management Architecture', 'case_pos_desc': 'Custom transactional layout connected directly to a relational store. Manages instant shopping workflows, item checkouts, and stock syncing loops.',
            'arch_diagram': 'Data Architecture'
        }
    };

    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    const changeLanguage = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[lang] && dict[lang][key]) {
                el.innerHTML = dict[lang][key];
            }
        });
        
        if (lang === 'en') {
            if (langEnBtn) langEnBtn.classList.add('active');
            if (langEsBtn) langEsBtn.classList.remove('active');
        } else {
            if (langEsBtn) langEsBtn.classList.add('active');
            if (langEnBtn) langEnBtn.classList.remove('active');
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
    /* =========================================
       7. MENÚ DE HAMBURGUESA RESPONSIVE (SUBPÁGINAS)
       ========================================= */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinksMenu = document.getElementById('nav-links-menu');

    if (hamburgerBtn && navLinksMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksMenu.classList.toggle('active');
            
            // Cambiar icono según estado
            const icon = hamburgerBtn.querySelector('i');
            if (navLinksMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Cerrar el menú al hacer clic en un enlace
        navLinksMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksMenu.classList.remove('active');
                hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
            });
        });

        // Cerrar al hacer clic fuera del menú
        document.addEventListener('click', (e) => {
            if (!navLinksMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                navLinksMenu.classList.remove('active');
                hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    }