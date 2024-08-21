import '/src/bootstrap.scss';
import './pages';
import '#WebComponent/components';
import '#common';

import { LANGUAGES } from './const';
import Translator from '#WebComponent/modules/translator';
import WebComponent from '#WebComponent';

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css?inline';
import bootstrapIcons from 'bootstrap-icons/font/bootstrap-icons.min.css?inline';

import style from './styles.css?inline';

WebComponent.defineGlobalCSS([style, bootstrap, bootstrapIcons]);

Translator.init({ fileList: LANGUAGES });