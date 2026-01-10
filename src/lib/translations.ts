/**
 * Comprehensive Translations System for Multi-Language SEO
 * 
 * This file contains all translatable content for the website.
 * All strings are organized by page/section for easy maintenance.
 * 
 * SEO Best Practices:
 * - Each page has unique, localized meta titles and descriptions
 * - Keywords are researched for each locale (English global, Danish local)
 * - Content is culturally adapted, not just translated
 */

import { Language } from './languages'

// Type-safe translation keys
export type TranslationKey = keyof typeof translations.en

// Main translations object
export const translations = {
  en: {
    // ============================================
    // SITE-WIDE / COMMON
    // ============================================
    site: {
      name: 'Ceptiv',
      tagline: 'Your dev team. Without the overhead.',
      description: 'Professional web development, mobile apps, and digital solutions for small to mid-size businesses.',
    },
    
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      about: 'About',
      pricing: 'Pricing',
      contact: 'Contact',
      login: 'Login',
      startProject: 'Start Project',
      getInTouch: 'Get in Touch',
    },
    
    // Common CTAs
    cta: {
      startProject: 'Start Your Project',
      viewPricing: 'View Pricing',
      getQuote: 'Get a Quote',
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      talkToUs: 'Talk to Us',
      seeFullPricing: 'See Full Pricing',
    },
    
    // Footer
    footer: {
      services: 'Services',
      company: 'Company',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      copyright: '© {year} Ceptiv. All rights reserved.',
      reachOut: "Go ahead, reach out. We don't bite. Much.",
      forSmallBusiness: 'For smaller businesses without in-house dev teams',
      focusOnBusiness: "You focus on your business. We handle the tech. No need to hire developers—get enterprise-quality solutions at a fraction of the cost.",
    },

    // ============================================
    // HOME PAGE
    // ============================================
    home: {
      hero: {
        title: 'Your dev team.',
        titleAccent: 'Without the overhead.',
        subtitle: 'We build custom web applications from scratch. You get a complete solution—designed, developed, and maintained—for a fixed monthly price. No hiring. No surprises.',
        stats: {
          integrations: '40+ Integrations',
          delivery: '24h Quote delivery',
          pricing: '100% Fixed price',
        },
      },
      features: {
        fixedPricing: 'Fixed pricing',
        quoteDelivery: '24h quote delivery',
        builtFromScratch: 'Built from scratch',
      },
      cta: {
        title: 'Ready to automate your business?',
        subtitle: 'Tell us what you need. Get a fixed-price proposal in 24 hours. No obligations, just honest conversation about your goals.',
      },
    },

    // ============================================
    // ABOUT PAGE
    // ============================================
    about: {
      hero: {
        title: 'About Us',
        subtitle: 'Building digital solutions that power small businesses forward.',
      },
      mission: {
        title: 'Our Mission',
        content: 'We believe every business deserves access to enterprise-quality digital solutions. Our mission is to democratize software development by providing affordable, professional services to small and mid-size businesses.',
      },
      values: {
        title: 'Our Values',
        transparency: 'Transparency',
        transparencyDesc: 'No hidden fees. No surprises. What you see is what you get.',
        quality: 'Quality',
        qualityDesc: 'We build to last. Every solution is crafted with care and precision.',
        partnership: 'Partnership',
        partnershipDesc: 'Your success is our success. We grow together.',
      },
    },

    // ============================================
    // SERVICES PAGE
    // ============================================
    services: {
      hero: {
        title: 'Our Services',
        subtitle: 'Comprehensive digital solutions tailored to your business needs.',
      },
      web: {
        title: 'Web Development',
        shortTitle: 'Websites',
        description: 'Modern, responsive websites that convert visitors into customers.',
        features: [
          'Custom design & development',
          'Mobile-first approach',
          'SEO optimization',
          'Performance focused',
        ],
      },
      mobile: {
        title: 'Mobile Apps',
        shortTitle: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        features: [
          'iOS & Android development',
          'Cross-platform solutions',
          'App Store optimization',
          'Push notifications',
        ],
      },
      ai: {
        title: 'AI Integrations',
        shortTitle: 'AI Integration',
        description: 'Leverage the power of artificial intelligence to automate and enhance your business.',
        features: [
          'Chatbots & virtual assistants',
          'Document processing',
          'Predictive analytics',
          'Custom AI solutions',
        ],
      },
      automation: {
        title: 'Backend Applications',
        shortTitle: 'Backend Applications',
        description: 'Robust backend systems that power your business operations.',
        features: [
          'Database design',
          'API development',
          'System integrations',
          'Workflow automation',
        ],
      },
      payments: {
        title: 'Integrations',
        shortTitle: 'Integrations',
        description: 'Connect your systems and tools for seamless data flow.',
        features: [
          'Payment processing',
          'CRM integration',
          'ERP connections',
          'Third-party APIs',
        ],
      },
    },

    // ============================================
    // PORTFOLIO PAGE
    // ============================================
    portfolio: {
      hero: {
        title: 'Our Work',
        subtitle: 'See how we\'ve helped businesses transform their digital presence.',
      },
      cta: {
        title: 'Ready to Start Your Project?',
        subtitle: 'Let\'s discuss how we can help you achieve your goals.',
      },
    },

    // ============================================
    // PRICING PAGE
    // ============================================
    pricing: {
      hero: {
        title: 'Simple, Transparent Pricing',
        subtitle: 'No hidden fees. No surprises. Just honest pricing for quality work.',
      },
      packages: {
        small: {
          name: 'Small',
          description: 'Perfect for startups and small projects',
        },
        medium: {
          name: 'Medium',
          description: 'Ideal for growing businesses',
        },
        large: {
          name: 'Large',
          description: 'Full-featured enterprise solutions',
        },
      },
      features: 'features',
      integration: 'integration',
      integrations: 'integrations',
      oneTimeSetup: 'One-time setup',
      monthlyMaintenance: 'Monthly maintenance',
      getStarted: 'Get Started',
      mostPopular: 'Most Popular',
      customQuote: 'Need something custom? Contact us for a quote.',
    },

    // ============================================
    // CONTACT PAGE
    // ============================================
    contact: {
      hero: {
        title: 'Get in Touch',
        subtitle: 'Have a project in mind? We\'d love to hear from you.',
      },
      form: {
        name: 'Name',
        email: 'Email',
        company: 'Company (optional)',
        message: 'Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Thank you! We\'ll get back to you soon.',
        error: 'Something went wrong. Please try again.',
      },
      info: {
        title: 'Contact Information',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
      },
    },

    // ============================================
    // START PROJECT PAGE
    // ============================================
    start: {
      hero: {
        title: 'Start Your Project',
        subtitle: 'Tell us about your vision and get a personalized quote.',
      },
      steps: {
        approach: 'What\'s the situation?',
        type: 'What are we building?',
        details: 'Tell us about your project',
        budget: 'Timeline & Project Size',
        aiReview: 'AI Project Review',
        contact: 'Your Information',
        review: 'Review & Submit',
      },
    },

    // ============================================
    // PRIVACY PAGE
    // ============================================
    privacy: {
      hero: {
        title: 'Privacy Policy',
        subtitle: 'How we collect, use, and protect your data.',
      },
      lastUpdated: 'Last updated: {date}',
    },

    // ============================================
    // TERMS PAGE
    // ============================================
    terms: {
      hero: {
        title: 'Terms of Service',
        subtitle: 'The legal stuff. We keep it simple.',
      },
      lastUpdated: 'Last updated: {date}',
    },
  },

  da: {
    // ============================================
    // SITE-WIDE / COMMON
    // ============================================
    site: {
      name: 'Ceptiv',
      tagline: 'Dit udviklerteam. Uden overhead.',
      description: 'Professionel webudvikling, mobilapps og digitale løsninger til små og mellemstore virksomheder.',
    },
    
    // Navigation
    nav: {
      home: 'Hjem',
      services: 'Tjenester',
      portfolio: 'Portefølje',
      about: 'Om Os',
      pricing: 'Priser',
      contact: 'Kontakt',
      login: 'Log ind',
      startProject: 'Start Projekt',
      getInTouch: 'Kontakt Os',
    },
    
    // Common CTAs
    cta: {
      startProject: 'Start Dit Projekt',
      viewPricing: 'Se Priser',
      getQuote: 'Få et Tilbud',
      learnMore: 'Læs Mere',
      contactUs: 'Kontakt Os',
      talkToUs: 'Tal Med Os',
      seeFullPricing: 'Se Alle Priser',
    },
    
    // Footer
    footer: {
      services: 'Tjenester',
      company: 'Virksomhed',
      legal: 'Juridisk',
      privacyPolicy: 'Privatlivspolitik',
      termsOfService: 'Vilkår og Betingelser',
      copyright: '© {year} Ceptiv. Alle rettigheder forbeholdes.',
      reachOut: 'Tøv ikke med at kontakte os. Vi bider ikke. Meget.',
      forSmallBusiness: 'For mindre virksomheder uden in-house udviklerteams',
      focusOnBusiness: 'Du fokuserer på din virksomhed. Vi håndterer teknologien. Ingen grund til at ansætte udviklere—få enterprise-kvalitet løsninger til en brøkdel af prisen.',
    },

    // ============================================
    // HOME PAGE
    // ============================================
    home: {
      hero: {
        title: 'Dit udviklerteam.',
        titleAccent: 'Uden overhead.',
        subtitle: 'Vi bygger skræddersyede webapplikationer fra bunden. Du får en komplet løsning—designet, udviklet og vedligeholdt—for en fast månedlig pris. Ingen ansættelser. Ingen overraskelser.',
        stats: {
          integrations: '40+ Integrationer',
          delivery: '24t Tilbud',
          pricing: '100% Fast pris',
        },
      },
      features: {
        fixedPricing: 'Fast pris',
        quoteDelivery: '24t tilbud',
        builtFromScratch: 'Bygget fra bunden',
      },
      cta: {
        title: 'Klar til at automatisere din virksomhed?',
        subtitle: 'Fortæl os hvad du har brug for. Få et tilbud med fast pris inden for 24 timer. Ingen forpligtelser, bare ærlig samtale om dine mål.',
      },
    },

    // ============================================
    // ABOUT PAGE
    // ============================================
    about: {
      hero: {
        title: 'Om Os',
        subtitle: 'Vi bygger digitale løsninger der driver små virksomheder fremad.',
      },
      mission: {
        title: 'Vores Mission',
        content: 'Vi tror på, at enhver virksomhed fortjener adgang til enterprise-kvalitet digitale løsninger. Vores mission er at demokratisere softwareudvikling ved at levere overkommelige, professionelle tjenester til små og mellemstore virksomheder.',
      },
      values: {
        title: 'Vores Værdier',
        transparency: 'Gennemsigtighed',
        transparencyDesc: 'Ingen skjulte gebyrer. Ingen overraskelser. Det du ser er det du får.',
        quality: 'Kvalitet',
        qualityDesc: 'Vi bygger til at holde. Hver løsning er håndværksmæssigt udført med omhu og præcision.',
        partnership: 'Partnerskab',
        partnershipDesc: 'Din succes er vores succes. Vi vokser sammen.',
      },
    },

    // ============================================
    // SERVICES PAGE
    // ============================================
    services: {
      hero: {
        title: 'Vores Tjenester',
        subtitle: 'Omfattende digitale løsninger tilpasset dine forretningsbehov.',
      },
      web: {
        title: 'Webudvikling',
        shortTitle: 'Websites',
        description: 'Moderne, responsive hjemmesider der konverterer besøgende til kunder.',
        features: [
          'Skræddersyet design & udvikling',
          'Mobile-first tilgang',
          'SEO-optimering',
          'Performance fokuseret',
        ],
      },
      mobile: {
        title: 'Mobilapps',
        shortTitle: 'Mobilapps',
        description: 'Native og cross-platform mobilapplikationer til iOS og Android.',
        features: [
          'iOS & Android udvikling',
          'Cross-platform løsninger',
          'App Store optimering',
          'Push-notifikationer',
        ],
      },
      ai: {
        title: 'AI-Integrationer',
        shortTitle: 'AI-Integration',
        description: 'Udnyt kunstig intelligens til at automatisere og forbedre din virksomhed.',
        features: [
          'Chatbots & virtuelle assistenter',
          'Dokumentbehandling',
          'Prædiktiv analyse',
          'Skræddersyede AI-løsninger',
        ],
      },
      automation: {
        title: 'Backend-Applikationer',
        shortTitle: 'Backend-Applikationer',
        description: 'Robuste backend-systemer der driver din virksomheds operationer.',
        features: [
          'Database-design',
          'API-udvikling',
          'Systemintegrationer',
          'Workflow-automatisering',
        ],
      },
      payments: {
        title: 'Integrationer',
        shortTitle: 'Integrationer',
        description: 'Forbind dine systemer og værktøjer for problemfri dataflow.',
        features: [
          'Betalingsbehandling',
          'CRM-integration',
          'ERP-forbindelser',
          'Tredjeparts-API\'er',
        ],
      },
    },

    // ============================================
    // PORTFOLIO PAGE
    // ============================================
    portfolio: {
      hero: {
        title: 'Vores Arbejde',
        subtitle: 'Se hvordan vi har hjulpet virksomheder med at transformere deres digitale tilstedeværelse.',
      },
      cta: {
        title: 'Klar til at Starte Dit Projekt?',
        subtitle: 'Lad os diskutere hvordan vi kan hjælpe dig med at nå dine mål.',
      },
    },

    // ============================================
    // PRICING PAGE
    // ============================================
    pricing: {
      hero: {
        title: 'Enkle, Gennemsigtige Priser',
        subtitle: 'Ingen skjulte gebyrer. Ingen overraskelser. Bare ærlige priser for kvalitetsarbejde.',
      },
      packages: {
        small: {
          name: 'Lille',
          description: 'Perfekt til startups og små projekter',
        },
        medium: {
          name: 'Mellem',
          description: 'Ideel til voksende virksomheder',
        },
        large: {
          name: 'Stor',
          description: 'Fuldt udstyrede enterprise-løsninger',
        },
      },
      features: 'funktioner',
      integration: 'integration',
      integrations: 'integrationer',
      oneTimeSetup: 'Engangs-setup',
      monthlyMaintenance: 'Månedlig vedligeholdelse',
      getStarted: 'Kom i Gang',
      mostPopular: 'Mest Populær',
      customQuote: 'Brug for noget skræddersyet? Kontakt os for et tilbud.',
    },

    // ============================================
    // CONTACT PAGE
    // ============================================
    contact: {
      hero: {
        title: 'Kontakt Os',
        subtitle: 'Har du et projekt i tankerne? Vi vil meget gerne høre fra dig.',
      },
      form: {
        name: 'Navn',
        email: 'E-mail',
        company: 'Virksomhed (valgfri)',
        message: 'Besked',
        submit: 'Send Besked',
        sending: 'Sender...',
        success: 'Tak! Vi vender tilbage hurtigst muligt.',
        error: 'Noget gik galt. Prøv venligst igen.',
      },
      info: {
        title: 'Kontaktinformation',
        email: 'E-mail',
        phone: 'Telefon',
        location: 'Placering',
      },
    },

    // ============================================
    // START PROJECT PAGE
    // ============================================
    start: {
      hero: {
        title: 'Start Dit Projekt',
        subtitle: 'Fortæl os om din vision og få et personligt tilbud.',
      },
      steps: {
        approach: 'Hvad er situationen?',
        type: 'Hvad skal vi bygge?',
        details: 'Fortæl os om dit projekt',
        budget: 'Tidslinje & Projektstørrelse',
        aiReview: 'AI Projektgennemgang',
        contact: 'Dine Oplysninger',
        review: 'Gennemse & Indsend',
      },
    },

    // ============================================
    // PRIVACY PAGE
    // ============================================
    privacy: {
      hero: {
        title: 'Privatlivspolitik',
        subtitle: 'Hvordan vi indsamler, bruger og beskytter dine data.',
      },
      lastUpdated: 'Sidst opdateret: {date}',
    },

    // ============================================
    // TERMS PAGE
    // ============================================
    terms: {
      hero: {
        title: 'Vilkår og Betingelser',
        subtitle: 'Det juridiske. Vi holder det enkelt.',
      },
      lastUpdated: 'Sidst opdateret: {date}',
    },
  },
} as const

// Type for the translation structure
export type Translations = typeof translations

// Helper function to get translations for a language
export function getTranslations(lang: Language): Translations['en'] {
  return translations[lang] || translations.en
}

// Helper function to get a specific translation with type safety
export function t(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Fallback to English
      value = translations.en
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey]
        } else {
          return key // Return key if not found
        }
      }
    }
  }
  
  return typeof value === 'string' ? value : key
}

// Helper function to replace template variables
export function tWithVars(lang: Language, key: string, vars: Record<string, string | number>): string {
  let text = t(lang, key)
  
  for (const [varKey, varValue] of Object.entries(vars)) {
    text = text.replace(`{${varKey}}`, String(varValue))
  }
  
  return text
}
