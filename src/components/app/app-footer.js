"use strict";


import { Component, WebComponent } from "#WebComponent"
import {TrBtn, BgBtn, LgBtn} from "../common/my-buttons/my-buttons.js"
import {BigTittle,SmallTittle,PgraphText, BigCardText} from "../common/my-texts/my-texts.js"
import { SmallCard } from "../landing/developer-list/my-cards/small-card.js";
import { TextColumn } from "../common/my-text-column/my-text-column.js";
import { FooterInput } from "../common/my-inputs/my-inputs.js";

export default Component(
{
    tagName: "app-footer",
},

class AppFooter extends WebComponent
{
    
    render() {
        return `
            <section class="row py-5" style="margin-top: 5rem;">
                <div class="col-12 col-lg-3 mb-5  text-md-start text-center">
                    <main-tittle>Transcendence</main-tittle>
                </div>

                <div class="col-12 col-lg-2 d-flex flex-column align-items-center align-items-lg-start mb-4 text-center text-lg-start">
                    <text-column tittle="Transcendence" text="Home" text2="Play A Game" text3="Tournaments"></text-column>
                </div>

                <div class="col-12 col-lg-3 d-flex flex-column align-items-center align-items-lg-start mb-4 text-center text-lg-start">
                    <text-column tittle="Important resources" text="Legal Notice" text2="Privacy Policy" text3="Cookie Policy"></text-column>
                </div>

                <div class="col-12 col-lg-4 px-5 px-lg-0 d-flex flex-column align-items-center align-items-lg-start mt-5 mt-lg-0">
                    <footer-tittle>Contact with us</footer-tittle>
                    <footer-input class="w-100 mt-2"></footer-input>
                    <bg-btn class="footer-btn mt-3 w-100">SUBMIT</bg-btn>
                </div>
            </section>
        `
    }
})