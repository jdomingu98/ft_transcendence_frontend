"use strict";

import css from "./styles.css?inline";


import { Component, WebComponent } from "#WebComponent"

export const TrBtn = Component(
{
    tagName: "tr-btn",
    styleCSS: css
},

class TrBtn extends WebComponent
{
    render(){
        const text = this.innerHTML || "Click me";
        return `<button class="btn tr-btn">${text}</button>`
    }
}
);


export const BgBtn = Component(
{
    tagName: "bg-btn",
    stylesURL: "My-Components/small-components/my-buttons/styles.css"
},
  
class BgBtn extends WebComponent
{

    render(){
        const bootStly = this.getAttribute("class") || "";
        const stly = this.getAttribute("style") || "";
        const text = this.innerHTML || "Click me";
        return `<button class="btn bg-btn ${bootStly}" style="${stly}">${text}</button>`
    }
}
);


export const LgBtn = Component(
{
    tagName: "lg-btn",
    stylesURL: "My-Components/small-components/my-buttons/styles.css"
},
    
class LgBtn extends WebComponent
{
    render(){
        const text = this.innerHTML || "Click me";
        return `<button class="language-btn text-aling-left">${text}</button>`
    }
}
);



