/**
 * CLIMA PRIME - ANALYTICS & EVENT TRACKING SETUP
 * Prepared for Google Analytics 4 (GA4), Google Tag Manager (GTM), and Google Search Console.
 */

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.ClimaAnalytics = {
  // Configured IDs
  GTM_CONTAINER_ID: '[INSERT_GTM_CONTAINER_ID]',
  GA4_MEASUREMENT_ID: 'G-MBHEKTL764',
  ADS_CONVERSION_ID: 'AW-18441347849',

  init: function() {
    console.log('Clima Prime Analytics Initialized - Ready for GTM/GA4 integration');
  },

  trackWhatsAppClick: function(serviceType) {
    window.dataLayer.push({
      event: 'whatsapp_click',
      event_category: 'Lead Conversion',
      event_label: serviceType || 'general',
      value: 1
    });
    console.log(`[Analytics Event]: WhatsApp Clicked -> ${serviceType}`);
  },

  trackFormSubmit: function(serviceType) {
    window.dataLayer.push({
      event: 'quote_form_submit',
      event_category: 'Lead Conversion',
      event_label: serviceType || 'general',
      value: 1
    });
    console.log(`[Analytics Event]: Form Submitted -> ${serviceType}`);
  },

  trackPhoneClick: function() {
    window.dataLayer.push({
      event: 'phone_click',
      event_category: 'Contact',
      event_label: '(12) 99784-2329'
    });
  },

  trackCTAClick: function(ctaName) {
    window.dataLayer.push({
      event: 'cta_click',
      event_category: 'User Engagement',
      event_label: ctaName
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.ClimaAnalytics.init();
});
