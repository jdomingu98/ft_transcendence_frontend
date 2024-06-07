"use strict";

import css from "./styles.css?inline";

import { Component, WebComponent } from "#WebComponent"

export const LightPoint = Component(
{
    tagName: "light-point",
    styleCSS: css
},
    
class LightPoint extends WebComponent
{
    render(){
        const num = this.getAttribute("num") || "";
        return `<div class="light${num}">HOLAAAAA</div>`
    }
}
);