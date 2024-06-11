"use strict";

import { Component, WebComponent } from "#WebComponent"

import {TrBtn, BgBtn, LgBtn} from "../common/my-buttons/my-buttons.js"
import {BigTittle,SmallTittle,PgraphText, BigCardText} from "../common/my-texts/my-texts.js"
import { SmallCard } from "./developer-list/my-cards/small-card.js";

export default Component(
{
    tagName: "landing-card",
    styleCSS: `
        .bg-card{
            background: rgb(171,217,217);
            background: linear-gradient(315deg, rgb(141, 223, 223) 0%, rgba(81,81,198,1) 100%);
            border-radius: 1.5rem; 
            height: 30rem;
        }
    `
},

class LandingCard extends WebComponent
{
    render() {
        return `
        <section class="row" style="margin-top: 7rem;">
            <div class="col">
                <div class="bg-card text-center d-flex">
                    <div class="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                        <big-card-text>READY TO SHOW <br> WHAT ARE YOU MADE OF?</big-card-text>
                        <big-tittle>Be Part Of This <br>Community</big-tittle>
                        <bg-btn class="black" style="font-size:1.2rem; height:80px">GET STARTED</bg-btn>
                    </div>
                </div>
            </div>
        </section>
        `
    }
})