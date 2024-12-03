import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "NED",
        resources: {
                    NED: {
                        translation: {
                            tabla: {
                                simbolo: "Symbool",
                                cotizacion: "Citaat",
                                variacion: "Dagelijkse variatie",
                            },
                            grafico: {
                                1: '1 dag',
                                5: '5 dagen',
                                mes: '1 maand',
                                todos:'Alle indexen'
                            },
                            participacion:'Marktaandeel'
                    },
                },
                    ESP: {
                        translation: {
                            tabla: {
                                simbolo: "Simbolo",
                                cotizacion: "Cotización",
                                variacion: "Variación Diaria",
                            },
                            grafico: {
                                1: '1 día',
                                5: '5 días',
                                mes: '1 mes',
                                todos:'Todos los indices'
                            },
                            participacion:'Participación de mercado'
                        }
                    }
        }
    });