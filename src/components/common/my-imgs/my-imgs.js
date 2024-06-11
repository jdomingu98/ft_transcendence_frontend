"use strict";

import { Component, WebComponent } from "#WebComponent"

export const CardImg = Component(
{
    tagName: "card-img",
    styleCSS: ` 
        .card-img{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 160%;
            transform: translate(-50%, -50%);
        }
    `
},
    
class CardImg extends WebComponent
{   
    render() {
        const src = this.getAttribute("src") || "";
        const alt = this.getAttribute("alt") || ""
        const stly = this.getAttribute("style") || "No img found";
        
        return `
            <img src="${src}" class="card-img" alt="${alt}" style="${stly}">
        `
    }
}
);