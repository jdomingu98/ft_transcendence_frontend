
const BUTTON_DEFAULT_MSG = 'Click me';

const DEFAULT_DIMENSION_VALUE = 'auto';

const DEFAULT_IMG_DIMENSION = '100px';

const BUTTON_DEFAULT_PRIMARY_COLOR = 'var(--app-primary-color)';

const BUTTON_DEFAULT_SECONDARY_COLOR = 'var(--app-secondary-color)';

const DEFAULT_PROFILE_IMG = 'https://placehold.co/100/png';

const DEFAULT_BANNER_IMG = '/resources/default-banner.webp';

const DEFAULT_SIDEBAR_PROFILE_IMG = 'https://placehold.co/50/png';

const LANGUAGES = [
    { language: 'es', flag:  '🇪🇸', url: '/i18n/es.json', name: 'Español', default: true },
    { language: 'en', flag:  '🇺🇸', url: '/i18n/en.json', name: 'English' },
    { language: 'fr', flag:  '🇫🇷', url: '/i18n/fr.json', name: 'Français' },
    { language: 'zh', flag:  '🇨🇳', url: '/i18n/zh.json', name: '简体中文' }
];

const LOCALE_LANG = {
    es: 'es-ES',
    en: 'en-US',
    fr: 'fr-FR',
    zh: 'zh-CN'
};

const DECISION_THRESHOLD = 300;

const VISIBILITY = {
    PUBLIC: 1,
    PRIVATE: 2,
    ANONYMOUS: 3
};

const UserStatus = {
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
};

export {
    BUTTON_DEFAULT_MSG,
    BUTTON_DEFAULT_PRIMARY_COLOR,
    BUTTON_DEFAULT_SECONDARY_COLOR,
    DECISION_THRESHOLD,
    DEFAULT_BANNER_IMG,
    DEFAULT_DIMENSION_VALUE,
    DEFAULT_IMG_DIMENSION,
    DEFAULT_PROFILE_IMG,
    DEFAULT_SIDEBAR_PROFILE_IMG,
    LANGUAGES,
    LOCALE_LANG,
    VISIBILITY,
    UserStatus,
};