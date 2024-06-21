"use strict";

import { Component, WebComponent } from '#WebComponent'

import css from './landing-call-to-action-card.css?inline';

import {BgBtn, BigTitle, BigCardText} from "#common"

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
                            <big-card-text>READY TO SHOW <br> WHAT ARE YOU MADE OF?</big-card-text>
                            <big-title>Be Part Of This <br>Community</big-title>
                            <bg-btn style="background-color:black; font-size:1.2rem; height:80px">GET STARTED</bg-btn>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
});