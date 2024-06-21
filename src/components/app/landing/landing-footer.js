"use strict";

import { Component, WebComponent } from '#WebComponent';

import { BgBtn, TextColumn, FooterInput, FooterTitle, MainTitle } from '#common';

export default Component ({
    tagName: 'landing-footer'
},

class LandingFooter extends WebComponent {
    render() {
        return `
            <section class="row py-5" style="margin-top: 5rem;">
                <div class="col-12 col-lg-3 mb-5  text-md-start text-center">
                    <main-title>Transcendence</main-title>
                </div>

                <div class="col-12 col-lg-2 d-flex flex-column align-items-center align-items-lg-start mb-4 text-center text-lg-start">
                    <text-column title="Transcendence" text="Home" text2="Play A Game" text3="Tournaments"></text-column>
                </div>

                <div class="col-12 col-lg-3 d-flex flex-column align-items-center align-items-lg-start mb-4 text-center text-lg-start">
                    <text-column title="Important resources" text="Legal Notice" text2="Privacy Policy" text3="Cookie Policy"></text-column>
                </div>

                <div class="col-12 col-lg-4 px-5 px-lg-0 d-flex flex-column align-items-center align-items-lg-start mt-5 mt-lg-0">
                    <footer-title>Contact with us</footer-title>
                    <footer-input class="w-100 mt-2"></footer-input>
                    <bg-btn class="footer-btn mt-3 w-100">SUBMIT</bg-btn>
                </div>
            </section>
        `;
    }
});