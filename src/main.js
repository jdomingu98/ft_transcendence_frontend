import '/src/bootstrap.scss';
import './pages';
import '#WebComponent/components';
import '#common';

import WebComponent from '#WebComponent';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css?inline';
import style from './styles.css?inline';



WebComponent.defineGlobalCSS([style, bootstrap]);
