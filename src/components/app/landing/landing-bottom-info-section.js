"use strict";

import { Component, WebComponent } from '#WebComponent';

import { H2Text, SubHeaderText, BodyText, PrimaryButton } from '#common';
import { LandingMobile } from '#svg';

export default Component ({
    tagName: 'landing-bottom-info-section'
},

class LandingBottomInfoSection extends WebComponent {
    render() {
        const subHeader = this.getAttribute('subHeader');
        const title = this.getAttribute('title');
        const desc = this.getAttribute('desc');

        return `
            <section class="d-flex col align-items-center my-5 gap-5">
                <div class="col col-6">
                    <sub-header-text color="var(--app-secondary-color)">${subHeader}</sub-header-text>
                    <h2-text>${title}</h2-text>
                    <div class="my-4 col-9">
                        <body-text>${desc}</body-text>
                    </div>
                    <primary-button w="345px" h="80px">Register now</primary-button>
                </div>
                <landing-mobile></landing-mobile>
            </section>
        `;
    }
});
