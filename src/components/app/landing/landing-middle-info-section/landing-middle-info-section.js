"use strict";

import { Component, WebComponent } from '#WebComponent';

import css from './landing-middle-info-section.css?inline';

import { H2Text, SubHeaderText, BodyText, PrimaryButton } from '#common';

import { LandingMailbox } from '#svg';

export default Component ({
    tagName: 'landing-middle-info-section',
    styleCSS: css
},

class LandingMiddleInfoSection extends WebComponent {
    render() {
        const subHeader = this.getAttribute("subHeader")
        const title = this.getAttribute("title")
        const desc = this.getAttribute("desc")

        return `
            <section id="middle-section" class="d-flex col align-items-center">
                <div class="col col-5">
                    <landing-mailbox></landing-mailbox>
                </div>
                <div class="col col-1"></div>
                <div class="col col-6">
                    <sub-header-text color="var(--app-secondary-color)">${subHeader}</sub-header-text>
                    <h2-text>${title}</h2-text>
                    <div class="mt-3 col-8">
                        <body-text>${desc}</body-text>
                    </div>
                    <!--<div class="d-flex pt-3 gap-3 justify-content-center">
                        ${this.innerHTML}
                    </div>-->
                    <div class="mt-4">
                        <primary-button w="346px" h="76px">Meet new people</primary-button>
                    </div>
                </div>
            </section>
        `;
    }
});
