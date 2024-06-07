"use strict";

import css from "./styles.css?inline";


import { Component, WebComponent } from "#WebComponent"
import {TrBtn, BgBtn, LgBtn} from "../../small-components/my-buttons/my-buttons.js"
import {BigTittle,SmallTittle,PgraphText} from "../../small-components/my-texts/my-texts.js"

import { MediaImg } from "../../small-components/my-imgs/my-imgs.js";


export default Component(
{
    tagName: 'tst-point',
    styleCSS: css
},

class TstPoint extends WebComponent
{
    render() {
        const source = this.getAttribute("src") || "";
        const imagenLeft = (this.getAttribute("imagenLeft") || false) === 'true';
        const smallTittle = this.getAttribute("smallTittle")
        const bigTittle = this.getAttribute("bigTittle")
        const p = this.getAttribute("p")

        return `
        <section class="row" style="margin-top: 7rem;">
        ${ imagenLeft ?
            `<div class="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-start px-0 order-lg-0 order-1 custom-image-left">
                <media-img src="${source}"></media-img>
            </div>` : ''}
        
        <div class="col-12 col-lg-6 d-flex flex-column justify-content-center  ${imagenLeft ? 'align-items-center align-items-lg-end align-items-xl-start' : 'align-items-lg-start'} px-0 text-center text-lg-start">
        ${ smallTittle ? `<small-tittle>${smallTittle}</small-tittle>` : '' }
            ${ bigTittle ? `<big-tittle class="${imagenLeft ? 'text-center text-lg-end text-xl-start' : 'text-center text-lg-start'}">${bigTittle}</big-tittle>` : ''}
            ${ p ? `<pgraph-text>${p}</pgraph-text>` : ''}
            <div class="d-flex pt-3 gap-3 justify-content-center ${imagenLeft ? 'justify-content-lg-end' : 'justify-content-lg-start'}">
                ${this.innerHTML}
            </div>
        </div>
    
        ${ !imagenLeft ?
            `<div class="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end p-0">
                <media-img src="${source}"></media-img>
            </div>`: ''}
    </section>`
    

    }
})
