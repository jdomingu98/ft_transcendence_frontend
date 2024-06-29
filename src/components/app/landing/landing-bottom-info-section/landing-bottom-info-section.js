"use strict";

import { Component, WebComponent } from '#WebComponent';

import css from './landing-bottom-info-section.css?inline';

import { H2Text, SubHeaderText, BodyText, PrimaryButton } from '#common';
import { LandingMobile } from '#svg';

export default Component ({
    tagName: 'landing-bottom-info-section',
    styleCSS: css
},

class LandingBottomInfoSection extends WebComponent {
    render() {
        const subHeader = this.getAttribute('subHeader');
        const title = this.getAttribute('title');
        const desc = this.getAttribute('desc');

        return `
            <section id="bottom-section" class="d-flex col align-items-center">
                <div class="col col-7">
                    <sub-header-text color="var(--app-secondary-color)">${subHeader}</sub-header-text>
                    <h2-text>${title}</h2-text>
                    <div class="mt-3 col-9">
                        <body-text>${desc}</body-text>
                    </div>
                    <div class="mt-4">
                        <primary-button w="345px" h="80px">Register now</primary-button>
                    </div>
                </div>
                <landing-mobile></landing-mobile>
            </section>
        `;
    }
});
