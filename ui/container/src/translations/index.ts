import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { toAbsoluteUrl } from '../utils/Utils';

import {az} from './az';
import {en} from './en';


export const LangList = [
    {
        slug: "az",
        title: "Azərbaycanca",
        translations: az,
        flag: toAbsoluteUrl('/static/img/flags/en.svg'),
    },
    {
        slug: "en",
        title: "English",
        translations: en,
        flag: toAbsoluteUrl('/static/img/flags/az.svg'),
    },
    {
        slug: "ru",
        title: "Russian",
        translations: en,
        flag: toAbsoluteUrl('/static/img/flags/ru.svg'),
    },
]

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources:LangList.reduce((result, curr)=>{
            result[curr.slug] = curr.translations;
            return result;
        }, {}),
        // fallbackLng: "en",
        // debug: true,
        // saveMissing: true,
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: false, // we use content as keys
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
