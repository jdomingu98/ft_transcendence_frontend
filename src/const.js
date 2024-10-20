
const BUTTON_DEFAULT_MSG = 'Click me';

const DEFAULT_DIMENSION_VALUE = 'auto';

const DEFAULT_IMG_DIMENSION = '100px';

const BUTTON_DEFAULT_PRIMARY_COLOR = 'var(--app-primary-color)';

const BUTTON_DEFAULT_SECONDARY_COLOR = 'var(--app-secondary-color)';

const DEFAULT_PROFILE_IMG = 'https://placehold.co/100/png';

const DEFAULT_BANNER_IMG = 'https://placehold.co/1000x200/png';

const DEFAULT_SIDEBAR_PROFILE_IMG = 'https://placehold.co/50/png';

export const LANGUAGES = [
    { language: 'es', flag:  '🇪🇸', url: '/src/i18n/es.json', name: 'Español', default: true },
    { language: 'en', flag:  '🇺🇸', url: '/src/i18n/en.json', name: 'English'},
    { language: 'fr', flag:  '🇫🇷', url: '/src/i18n/fr.json', name: 'Français'},
    { language: 'zh', flag:  '🇨🇳', url: '/src/i18n/zh.json', name: '简体中文'}
];

const DECISION_THRESHOLD = 300;

export {
    BUTTON_DEFAULT_MSG,
    DEFAULT_DIMENSION_VALUE,
    DEFAULT_IMG_DIMENSION,
    BUTTON_DEFAULT_PRIMARY_COLOR,
    BUTTON_DEFAULT_SECONDARY_COLOR,
    DEFAULT_PROFILE_IMG,
    DEFAULT_BANNER_IMG,
    DEFAULT_SIDEBAR_PROFILE_IMG,
    DECISION_THRESHOLD
};