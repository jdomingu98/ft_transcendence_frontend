"use strict";

import { Component, WebComponent } from '#WebComponent';

import { PrimaryButton, SecondaryButton, LanguageSelector } from '#common';

export default Component ({
    tagName: 'landing-navbar'
},

class LandingNavBar extends WebComponent {
    render() {
        return `
            <nav
                class="nav align-items-center justify-content-space-between my-5 text-uppercase fw-bold text-center"
            >
                <span
                    class="col-4"
                    style="font-size:24px; z-index: 1;"
                >
                    Transcendence
                </span>
                <a
                    class="nav-link link-light text-decoration-none col-2"
                    rel="noreferrer"
                    href="/game"
                    style="font-size: 20px;z-index: 1;"
                >
                    Play a game
                </a>
                <a
                    class="nav-link link-light text-decoration-none col-2"
                    rel="noreferrer"
                    href="/tourneys"
                    style="font-size: 20px;z-index: 1;"
                >
                    Tournaments
                </a>
                <language-selector class="col-2" w="130px" h="35px"></language-selector>
                <primary-button w="165px" h="45px">Log In</primary-button>
            </nav>
        `;
    }
});
