"use strict";

import { Component, WebComponent } from '#WebComponent'

import css from './landing-call-to-action-card.css?inline';

import { SubHeaderText, H2Text, PrimaryButton } from "#common"

export default Component ({
    tagName: "landing-call-to-action-card",
    styleCSS: css
},

class LandingCallToActionCard extends WebComponent {
    render() {
        return `
            <section class="row" style="margin-top: 7rem;">
                <div class="col">
                    <div class="bg-card text-center d-flex">
                        <div class="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                            <sub-header-text color="black">ready to show <br> what are you made of?</sub-header-text>
                            <h2-text>Be part of this <br>community</h2-text>
                            <primary-button color="black" w="259px" h="89px">get started</primary-button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
});