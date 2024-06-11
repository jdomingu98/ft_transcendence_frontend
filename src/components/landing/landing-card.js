"use strict";

import { Component, WebComponent } from "#WebComponent"
import { BgBtn } from "../common/my-buttons/bg-btn/bg-btn.js"
import { BigTittle } from "../common/my-texts/big-tittle/big-tittle.js"

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
                        <h4 style="color: #0000000;">READY TO SHOW <br> WHAT ARE YOU MADE OF?</h4>
                        <big-tittle>Be Part Of This <br>Community</big-tittle>
                        <bg-btn class="black" style="font-size:1.2rem; height:80px">GET STARTED</bg-btn>
                    </div>
                </div>
            </div>
        </section>
        `
    }
})