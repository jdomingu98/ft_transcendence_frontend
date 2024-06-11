"use strict";

import { Component, WebComponent } from "#WebComponent"
import { ClearBtn } from "../common/my-buttons/clear-btn/clear-btn.js"
import { BgBtn } from "../common/my-buttons/bg-btn/bg-btn.js"
import { LangBtn } from "../common/my-buttons/lang-btn/lang-btn.js"
import { MainTittle } from "../common/my-texts/main-tittle/main-tittle.js"

export default Component(
{
    tagName: "landing-nav",
},

class LandingNav extends WebComponent 
{
    render() {
        const style = this.getAttribute('style') || '';

        return `
        <nav class="row d-flex flex-sm-row flex-md-row flex-lg-row flex-xl-row flex-xxl-row align-items-center" style="${style}">
            <div class="col-12 col-lg-5 p-0 mb-lg-0 mb-5">
                <main-tittle> Transcendence </main-tittle>
            </div>
            <div class="col-12 col-lg-7 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-sm-0 gap-4">
                <clear-btn>Play a game</clear-btn>
                <clear-btn>Tourneys</clear-btn>
                <bg-btn style="height:50px;width:150px;">Log in</bg-btn>
            </div>
            <div class="col-12 d-flex justify-content-end mt-5">
                <lang-btn>English</lang-btn>
            </div>
        </nav>
        `;
    }
})
