import Observable from '../observable/observable';

class Translator {
    _lang;

    _dictionary = {};

    _fileList = [];

    observable$ = new Observable();

    LANG_LOCAL_STORAGE_KEY = 'lang';

    async setLanguage(lang) {
        if (this._lang === lang) return;
        this._lang = lang;
        window.localStorage.setItem(this.LANG_LOCAL_STORAGE_KEY, lang);

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

    static async init(config) {
        const translator = Translator.getInstance();
        translator._fileList = config.fileList || [];
        const initialLanguage = Translator.getLangFromNavigator();
        translator.setLanguage(initialLanguage);
    }

    getLanguage() {
        return this._lang;
    }

    translate(key) {
        if (typeof key !== 'string')
            throw new Error('Error on translator. Key is not a string.');
        return key.split('.').reduce((acc, k) => acc instanceof Object ? acc[k] : key, this._dictionary) || key;
    }

    async _loadJSONDictionary(lang) {
        const file = this._fileList.find(({ language }) => language === lang) || this._getDefaultPageLanguage();
        return fetch(file.url)
            .then(response => response.json())
            .then(data => this._dictionary = data);
    }

    static getLangFromNavigator() {
        const instance = Translator.getInstance();
        const localStorageLang = window.localStorage.getItem(instance.LANG_LOCAL_STORAGE_KEY);
        return localStorageLang || navigator.languages
            .map(lang => lang.includes('_') ? lang.split('_')[0] : lang)
            .map(lang => lang.includes('-') ? lang.split('-')[0] : lang)
            .find(lang => instance._languageIsAvailable(lang));
    }

    _languageIsAvailable(lang) {
        return this._fileList.some(file => file.language === lang);
    }

    _getDefaultPageLanguage() {
        return this._fileList.find(file => file.default);
    }
}

export default Translator;