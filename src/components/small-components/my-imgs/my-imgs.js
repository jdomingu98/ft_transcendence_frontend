"use strict";

import css from "./styles.css?inline";

import { Component, WebComponent } from "#WebComponent"


export const MediaImg = Component(
{
    tagName: "media-img",
    styleCSS: css
},
    
class MediaImg extends WebComponent
{   
    render() {
        const src = this.getAttribute("src") || "No img found";
        return `<img src="${src}" alt="laptop.img" style="size:35rem;">`
    }
}
);

export const CardImg = Component(
{
    tagName: "card-img",
    styleCSS: css
},
    
class CardImg extends WebComponent
{   
    render() {
        const src = this.getAttribute("src") || "No img found";
        const stly = this.getAttribute("style") || "No img found";
        return `
        <img src="${src}" class="card-img" alt="..." style="${stly}">
        `
    }
}
);