"use strict";

import { Component, WebComponent } from '#WebComponent';

import css from './landing-navbar.css?inline';

import { PrimaryButton, SecondaryButton, LanguageSelector } from '#common';

export default Component(
{
    tagName: 'landing-navbar',
    styleCSS: css
},

class LandingNavBar extends WebComponent {
    render() {
        return `
            <nav id="navbar" class="d-flex align-items-center justify-content-space-between">
                <span class="col-4 web-name"> Transcendence </span>
                <a class="col-2" rel="noreferrer" href="/game">Play a game</a>
                <a class="col-2" rel="noreferrer" href="/tourneys">Tournaments</a>
                <language-selector class="col-2" w="130px" h="35px"></language-selector>
                <primary-button w="165px" h="45px">Log In</primary-button>
            </nav>
        `;
    }
});
