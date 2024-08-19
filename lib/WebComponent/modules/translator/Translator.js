import Observable from '../observable';

class Translator {
    _lang;

    INITIAL_LANGUAGE = 'es';

    _dictionary = {};

    _fileList = [];

    observable$ = new Observable();

    async setLanguage(lang) {
        this._lang = lang;

        return this._loadJSONDictionary(lang)
            .then(() => this.observable$.next(lang));
    }

    static _instance;

    static getInstance() {
        if (!Translator._instance) {
            Translator._instance = new Translator();
        }
        return Translator._instance;
    }

    static _promiseLoadLang;

    static async init(config) {
        if (!Translator._promiseLoadLang) {
            Translator._promiseLoadLang = new Promise(resolve => {
                const translator = Translator.getInstance();
                translator._fileList = config.fileList || [];
                const initialLanguage = Translator._getLangFromNavigator();
                translator.setLanguage(initialLanguage)
                    .then(() => resolve(Translator._instance));
            });
        }
        return Translator._promiseLoadLang;
    }

    getLanguage() {
        return this._lang;
    }

    translate(key) {
        return key.split('.').reduce((acc, k) => acc instanceof Object ? acc[k] : key, this._dictionary) || key;
    }

    async _loadJSONDictionary(lang) {
        const file = this._fileList.find(({ language }) => language === lang) || this._getDefaultPageLanguage();
        return fetch(file.url)
            .then(response => response.json())
            .then(data => this._dictionary = data);
    }

    static _getLangFromNavigator() {
        const lang = navigator.language || navigator.userLanguage;
        if (lang.includes('_')) {
            return lang.split('_')[0];
        }
        return lang;
    }

    _getDefaultPageLanguage() {
        return this._fileList.find(file => file.default);
    }
}

export default Translator;