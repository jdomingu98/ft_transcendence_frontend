"use strict";

import { Component, WebComponent } from "#WebComponent"
import { BgBtn } from "../common/my-buttons/bg-btn/bg-btn.js"
import { SmallTittle} from "../common/my-texts/small-tittle/small-tittle.js"
import { BigTittle } from "../common/my-texts/big-tittle/big-tittle.js"


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
        const src = this.getAttribute("src") || "";
        const imagenLeft = (this.getAttribute("imagenLeft") || false) === 'true';
        const alt = this.getAttribute("alt") || ""
        const smallTittle = this.getAttribute("smallTittle")
        const bigTittle = this.getAttribute("bigTittle")
        const p = this.getAttribute("p")

        return `
        <section class="row" style="margin-top: 7rem;">
        ${ imagenLeft ?
            `<div class="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-start px-0 order-lg-0 order-1 custom-image-left">
                <img src="${src}" alt="${alt}"></img>
            </div>` : ''}
        
        <div class="col-12 col-lg-6 d-flex flex-column justify-content-center  ${imagenLeft ? 'align-items-center align-items-lg-end align-items-xl-start' : 'align-items-lg-start'} px-0 text-center text-lg-start">
        ${ smallTittle ? `<small-tittle>${smallTittle}</small-tittle>` : '' }
            ${ bigTittle ? `<big-tittle class="${imagenLeft ? 'text-center text-lg-end text-xl-start' : 'text-center text-lg-start'}">${bigTittle}</big-tittle>` : ''}
            ${ p ? `<p class="mt-3 text-light">${p}</p>` : ''}
            <div class="d-flex pt-3 gap-3 justify-content-center ${imagenLeft ? 'justify-content-lg-end' : 'justify-content-lg-start'}">
                ${this.innerHTML}
            </div>
        </div>
    
        ${ !imagenLeft ?
            `<div class="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end p-0">
                <img src="${src}" alt="${alt}"></img>
            </div>`: ''}
    </section>`
    }
})
