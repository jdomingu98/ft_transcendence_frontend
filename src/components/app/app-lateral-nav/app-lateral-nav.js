"use strict";

import { Component, WebComponent } from "#WebComponent"
import { MainTittle } from "../../common/my-texts/main-tittle/main-tittle.js"
import { NavButton } from "./nav-button/nav-button.js"

export default Component(
{
    tagName: "lateral-nav",
    styleCSS: `
        .symbol {
            width: 44px;
            margin-bottom: 10px;
        }
    `
},

class LateralNav extends WebComponent 
{
    render() {

        return `
            <div class="d-flex flex-column align-items-center justify-content-start gap-0" style="margin-bottom: 5rem; margin-top: 3rem;">
                <img src="/src/img/icons/logo.png" alt="logo" class="symbol">
                <main-tittle bootstrap="d-none d-lg-block">Transcendence</main-tittle>
            </div>
            <div class="d-flex flex-column">
                <nav-button src="/src/img/icons/home.png" text="home"></nav-button>
                <nav-button src="/src/img/icons/chat.png" text="chats"></nav-button>
                <nav-button src="/src/img/icons/game.png" text="play game"></nav-button>
                <nav-button src="/src/img/icons/tourneys.png" text="tourneys"></nav-button>
                <nav-button src="/src/img/icons/ranking.png" text="ranking"></nav-button>
                <nav-button src="/src/img/icons/history.png" text="history"></nav-button>
            </div>

            <div class="d-flex flex-column" style="margin-top: 5rem; margin-bottom: 3rem;">
                <nav-button src="/src/img/icons/settings.png" text="settings"></nav-button>
            </div>

        `;
    }
})