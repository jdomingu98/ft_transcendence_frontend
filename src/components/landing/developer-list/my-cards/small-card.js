"use strict";

import css from "./small-card.css?inline";

import { Component, WebComponent } from "#WebComponent"
import { CardImg } from "../../../common/my-imgs/my-imgs.js";

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
        return `
            <div class="card text-center">
                <div class="card-img-top">
                    <card-img src="${src}"></card-img>
                </div>
                <div class="card-body">
                    <card-tittle>${tittle}</card-tittle>
                    <card-text>${text}</card-text>
                    ${ text2 ? `<card-text style="margin-top:5px;">${text2}</card-text>` : ''};
                </div>
            </div>
        `
    }
});

