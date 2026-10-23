/**
 * CLIMA PRIME - MAIN JAVASCRIPT LOGIC
 * Handles navigation, mobile drawer, dynamic WhatsApp pre-filled links, FAQ accordions & portfolio filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initFaqAccordion();
  initProjectFilters();
  initWhatsAppButtons();
  initQuickQuoteForm();
});

/* 1. Header scroll effect */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 2. Mobile drawer navigation */
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (!mobileToggle || !mobileDrawer) return;

  function toggleMenu() {
    const isActive = mobileDrawer.classList.contains('active');
    if (isActive) {
      mobileToggle.classList.remove('active');
      mobileDrawer.classList.remove('active');
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileToggle.classList.add('active');
      mobileDrawer.classList.add('active');
      if (mobileOverlay) mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  mobileToggle.addEventListener('click', toggleMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);

  // Close menu when clicking links inside drawer
  const drawerLinks = mobileDrawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/* 3. FAQ Accordion */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    if (!button) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* 4. Portfolio Filter Tabs */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* 5. Dynamic WhatsApp URL Builder */
const WHATSAPP_NUMBER = '5512997842329';

const PREFILLED_MESSAGES = {
  general: 'Olá, Clima Prime! Gostaria de solicitar um orçamento.',
  instalacao: 'Olá, Clima Prime! Gostaria de solicitar um orçamento para instalação de ar-condicionado.',
  manutencao: 'Olá, Clima Prime! Gostaria de solicitar um orçamento para manutenção do meu ar-condicionado.',
  higienizacao: 'Olá, Clima Prime! Gostaria de solicitar um orçamento para higienização do meu ar-condicionado.',
  climatizacao: 'Olá, Clima Prime! Gostaria de saber mais sobre soluções em climatização residencial e comercial.',
  avaliacao: 'Olá, Clima Prime! Gostaria de uma avaliação para o meu ar-condicionado que está apresentando problemas.',
  foto: 'Olá, Clima Prime! Gostaria de enviar fotos do meu equipamento para um orçamento.'
};

function getWhatsAppUrl(type = 'general', customText = '') {
  let message = PREFILLED_MESSAGES[type] || PREFILLED_MESSAGES.general;
  if (customText) {
    message = customText;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function initWhatsAppButtons() {
  const waButtons = document.querySelectorAll('[data-wa-type]');
  waButtons.forEach(btn => {
    const type = btn.getAttribute('data-wa-type');
    btn.setAttribute('href', getWhatsAppUrl(type));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');

    btn.addEventListener('click', () => {
      if (window.ClimaAnalytics) {
        window.ClimaAnalytics.trackWhatsAppClick(type);
      }
    });
  });
}

/* 6. Contact & Quick Quote Form on /contato.html */
function initQuickQuoteForm() {
  const form = document.querySelector('#quick-quote-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.querySelector('#quote-name')?.value.trim() || '';
    const service = document.querySelector('#quote-service')?.value || 'Orçamento Geral';
    const location = document.querySelector('#quote-location')?.value.trim() || 'São José dos Campos';
    const details = document.querySelector('#quote-details')?.value.trim() || '';

    let customMsg = `Olá, Clima Prime! Meu nome é ${name}.\n`;
    customMsg += `Gostaria de solicitar um orçamento para: *${service}*.\n`;
    customMsg += `Localização: ${location}.\n`;
    if (details) {
      customMsg += `Detalhes/Sintomas: ${details}\n`;
    }
    customMsg += `Aguardando retorno!`;

    const waUrl = getWhatsAppUrl('general', customMsg);
    
    if (window.ClimaAnalytics) {
      window.ClimaAnalytics.trackFormSubmit(service);
    }

    window.open(waUrl, '_blank');
  });
}
