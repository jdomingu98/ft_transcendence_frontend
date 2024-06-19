"use strict";

import { Component, WebComponent } from "#WebComponent"
import {TrBtn, BgBtn, LgBtn} from "../common/my-buttons/my-buttons.js"
import {BigTitle,SmallTitle,PgraphText} from "../common/my-texts/my-texts.js"


export default Component(
{
    tagName: 'landing-section',
    styleCSS: `
        .custom-image-left {
            margin-left: -71px;
        }
        @media (max-width: 992px) {
            .custom-image-left {
                margin-left: 0;
            }
        }
        img {
            size: 35rem;
        }
    `
},
class LandingSection extends WebComponent
{
    render() {
        const source = this.getAttribute("src") || "";
        const imagenLeft = (this.getAttribute("imagenLeft") || false) === 'true';
        const alt = this.getAttribute("alt") || ""
        const smallTitle = this.getAttribute("smallTitle")
        const bigTitle = this.getAttribute("bigTitle")
        const p = this.getAttribute("p")

        return `
        <section class="row" style="margin-top: 7rem;">
        ${ imagenLeft ?
            `<div class="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-start px-0 order-lg-0 order-1 custom-image-left">
                <img src="${source}" alt="${alt}"></img>
            </div>` : ''}
        
        <div class="col-12 col-lg-6 d-flex flex-column justify-content-center  ${imagenLeft ? 'align-items-center align-items-lg-end align-items-xl-start' : 'align-items-lg-start'} px-0 text-center text-lg-start">
        ${ smallTitle ? `<small-title>${smallTitle}</small-title>` : '' }
            ${ bigTitle ? `<big-title class="${imagenLeft ? 'text-center text-lg-end text-xl-start' : 'text-center text-lg-start'}">${bigTitle}</big-title>` : ''}
            ${ p ? `<pgraph-text>${p}</pgraph-text>` : ''}
            <div class="d-flex pt-3 gap-3 justify-content-center ${imagenLeft ? 'justify-content-lg-end' : 'justify-content-lg-start'}">
                ${this.innerHTML}
            </div>
        </div>
    
        ${ !imagenLeft ?
            `<div class="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end p-0">
                <img src="${source}" alt="${alt}"></img>
            </div>`: ''}
    </section>`
    }
})
