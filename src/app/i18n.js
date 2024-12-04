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
                            participacion:'Marktaandeel',
                            bolsa: 'Euronext is de belangrijkste effectenbeurs van Nederland, de basis is gevestigd in Amsterdam. Deze beurs heeft de Euronext Index, de index die de prestaties meet van de belangrijkste bedrijven die erop genoteerd zijn. Hier tonen we de deelname van elk aan de markt op basis van het aantal aandelen en de waarde van zijn aandelen.'
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
                            participacion:'Participación de mercado',
                            bolsa: 'Euronext es la bolsa mas importante de Holanda, su base se encuentra en Amsterdam. Esta bolsa cuenta con el Euronext Index es el indice que amide el rendimiento de las empresas mas importantes que cotizan en ella. Aqui mostramos la participacion de cada una en el mercado de acuerdo a su cantidad de acciones y el valor de sus acciones.'
                        }
                    }
        }
    });