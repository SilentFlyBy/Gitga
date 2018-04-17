import * as I18n from "i18next";
import "./resources/translations";

/* tslint:disable: no-var-requires */
const foo = require("./resources/translations");

const i18n = I18n
    .init({
        backend: {
            loadPath: "/resources/translations/{{lng}}/{{ns}}/.json",
        },
        fallbackLng: "en",
        debug: true,

        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: false,
            nsMode: "default",
        },
        resources: foo,
});

export default i18n;
