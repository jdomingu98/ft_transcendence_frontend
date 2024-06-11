"use strict";

import css from "./small-card.css?inline";
import {CardImg } from "../../../common/my-imgs/my-imgs.js";

import { Component, WebComponent } from "#WebComponent"

export const SmallCard = Component(
{
    tagName: "small-card",
    styleCSS: css
},
    
class SmallCard extends WebComponent
{   
    render() {
        const src = this.getAttribute("src") || "No img found";
        const tittle = this.getAttribute("tittle") || "";
        const text = this.getAttribute("text") || "";
        const text2 = this.getAttribute("text2") || "";
        const alt = this.getAttribute("alt") || ""
        return `
            <div class="card text-center">
                <div class="card-img-top">
                    <card-img src="${src}" alt="${alt}"></card-img>
                </div>
                <div class="card-body">
                    <h5 class="card-tittle text-light fw-bold mb-4">${tittle}</h5>
                    <div class="d-flex h-100 gap-3 flex-column align-items-center justify-content-center">
                        <h3 class="text-light">${text}</h3>
                        ${ text2 ? ` <h3 class="text-light">${text2}</h3>` : ''}
                    </div>
                </div>
            </div>
        `
    }
});

