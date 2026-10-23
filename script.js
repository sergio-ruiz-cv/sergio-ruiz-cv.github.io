/**
 * SERGIO RUIZ TORRES — SENIOR UI INTERACTIVITY & MULTIMEDIA ENGINE
 * script.js | 3D Spotlight + Media Lightbox + Live Telemetry + Filters + SEC Lab
 */

document.addEventListener('DOMContentLoaded', () => {
  init3DSpotlightCards();
  initProjectFilters();
  initLiveTelemetry();
  initSecCircuitSimulator();
  initCopyEmail();
  initMediaLightbox();
});

/* 1. 3D TILT INMERSIVO + LUZ RADIAL QUE SIGUE EL PUNTERO */
function init3DSpotlightCards() {
  const panels = document.querySelectorAll('.glass-panel');

  panels.forEach((panel) => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      panel.style.setProperty('--mouse-x', `${x}px`);
      panel.style.setProperty('--mouse-y', `${y}px`);

      if (panel.classList.contains('tilt-3d') && window.innerWidth >= 960) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3.2;
        const rotateY = ((x - centerX) / centerX) * 3.2;

        panel.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
      }
    });

    panel.addEventListener('mouseleave', () => {
      if (panel.classList.contains('tilt-3d')) {
        panel.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
    });
  });
}

/* 2. FILTRADO DINÁMICO DE PROYECTOS */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => {
        b.classList.remove('btn-glow');
        b.classList.add('btn-glass');
      });
      btn.classList.remove('btn-glass');
      btn.classList.add('btn-glow');

      cards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        card.style.display = (filter === 'all' || categories.includes(filter)) ? '' : 'none';
      });
    });
  });
}

/* 3. TELEMETRÍA AMBIENTAL EN TIEMPO REAL */
function initLiveTelemetry() {
  const tempEl = document.getElementById('telemetry-temp');
  const humEl = document.getElementById('telemetry-hum');
  const vpdEl = document.getElementById('telemetry-vpd');
  const latEl = document.getElementById('telemetry-latency');

  if (!tempEl && !humEl && !vpdEl) return;

  setInterval(() => {
    const temp = (22.4 + (Math.random() * 1.2 - 0.6)).toFixed(1);
    const hum = (67.2 + (Math.random() * 2.4 - 1.2)).toFixed(1);
    const svp = 0.61078 * Math.exp((17.27 * parseFloat(temp)) / (parseFloat(temp) + 237.3));
    const vpd = (svp * (1 - parseFloat(hum) / 100)).toFixed(2);
    const latency = Math.floor(12 + Math.random() * 7);

    if (tempEl) tempEl.textContent = `${temp} °C`;
    if (humEl) humEl.textContent = `${hum} %`;
    if (vpdEl) vpdEl.textContent = `${vpd} kPa`;
    if (latEl) latEl.textContent = `${latency} ms`;
  }, 2500);
}

/* 4. SIMULADOR INTERACTIVO DE CIRCUITOS NORMATIVOS SEC */
function initSecCircuitSimulator() {
  const buttons = document.querySelectorAll('.circuit-btn');
  const titleEl = document.getElementById('circuit-title');
  const normEl = document.getElementById('circuit-norm');
  const descEl = document.getElementById('circuit-desc');

  if (!buttons.length || !titleEl || !descEl) return;

  const circuits = {
    '9-12': {
      title: 'Interruptor Simple (Efecto 9/12)',
      norm: 'Pliego RIC N°04 · Alumbrado General',
      desc: 'Control de un centro luminoso desde un punto único. La Fase ingresa al borne común del interruptor y sale como retorno conmutado hacia la carga; Neutro directo a la luminaria y conductor de Tierra de Protección continuo.'
    },
    '9-15': {
      title: 'Interruptor Doble (Efecto 9/15)',
      norm: 'Pliego RIC N°04 · Seccionamiento Dual',
      desc: 'Permite comandar dos circuitos de iluminación independientes desde un mismo punto mediante una alimentación de Fase común y dos líneas de retorno separadas.'
    },
    '9-24': {
      title: 'Combinación Escalera / Pasillo (Efecto 9/24)',
      norm: 'Pliego RIC N°04 · Conmutación de 2 Puntos',
      desc: 'Conmuta un centro luminoso desde dos extremos distantes utilizando dos interruptores de 3 bornes interconectados por un par de conductores viajeros.'
    },
    '9-32': {
      title: 'Cruzamiento Multipunto (Efecto 9/32)',
      norm: 'Pliego RIC N°04 · Conmutación de 3+ Puntos',
      desc: 'Intercala un módulo inversor de 4 bornes entre los conductores viajeros de un esquema 9/24, habilitando el encendido y apagado desde tres o más ubicaciones.'
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-circuit');
      const info = circuits[key];
      if (!info) return;

      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      titleEl.textContent = info.title;
      if (normEl) normEl.textContent = info.norm;
      descEl.textContent = info.desc;
    });
  });
}

/* 5. COPIAR CORREO AL PORTAPAPELES */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('[data-copy-email]');

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy-email') || 'sergio.ruiz.t@mail.pucv.cl';
      const prevHTML = btn.innerHTML;

      try {
        await navigator.clipboard.writeText(email);
        btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Correo Copiado!';
        setTimeout(() => {
          btn.innerHTML = prevHTML;
        }, 2200);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });
}

/* 6. VISOR LIGHTBOX A PANTALLA COMPLETA PARA LAS GALERÍAS */
function initMediaLightbox() {
  const tiles = document.querySelectorAll('.media-tile[data-lightbox]');
  if (!tiles.length) return;

  const modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-content">
      <img id="lightbox-img" src="" alt="Vista ampliada del proyecto" />
      <div class="lightbox-bar">
        <strong id="lightbox-title" style="font-size: 0.95rem;"></strong>
        <button type="button" class="btn btn-glass btn-sm" id="lightbox-close">
          <i class="fa-solid fa-xmark"></i> Cerrar Vista
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const imgEl = modal.querySelector('#lightbox-img');
  const titleEl = modal.querySelector('#lightbox-title');
  const closeBtn = modal.querySelector('#lightbox-close');

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const innerImg = tile.querySelector('img');
      if (!innerImg) return;
      imgEl.src = innerImg.currentSrc || innerImg.src;
      titleEl.textContent = tile.getAttribute('data-caption') || innerImg.alt;
      modal.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}