import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "STEMM Lab",
        start: "Start Experiment",
        join: "Join Team"
      }
    },
    id: {
      translation: {
        title: "Lab STEMM",
        start: "Mulai Eksperimen",
        join: "Gabung Tim"
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;