"use strict";

import css from "./styles.css?inline";

import { Component, WebComponent } from "#WebComponent"


export const MainTitle = Component(
{
    tagName: "main-title",
    styleCSS: css
},
    
class MainTitle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h3 class="title text-center text-lg-start">${text}</h3>`
    }
}
);

export const BigTitle = Component(
{
    tagName: "big-title",
        styleCSS: css
},
        
class BigTitle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h1 class="mt-4 big-title">${text}</h1>`
    }
}
);

export const PgraphText = Component(
{
    tagName: "pgraph-text",
        styleCSS: css
},
        
class PgraphText extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<p class="mt-3 text-light">${text}</p>`
    }
}
);

export const SmallTitle = Component(
{
    tagName: "small-title",
    styleCSS: css
},
        
class SmallTitle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<p class="fw-bold mb-0" style="color: #ABD9D9; font-size: 1.3rem; letter-spacing: 3px;">${text}</p>`
    }
}
);

export const CardTitle = Component(
{
    tagName: "card-title",
    styleCSS: css
},
        
class CardTitle extends WebComponent
{   
    render() {
        const text = this.innerHTML || "";
        return `<h5 class="card-title text-light fw-bold mb-4">${text}</h5>`
    }
}
);

export const CardText = Component(
{
    tagName: "card-text",
    styleCSS: css
},
        
class CardText extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        const style = this.getAttribute("style") || "";
        return `<h3 class="card-text text-light" style="${style}">${text}</h3>`
    }
}
);


export const BigCardText = Component(
{
    tagName: "big-card-text",
    styleCSS: css
},
        
class BigCardText extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h4 class="card-title " style="color: #0000000;">${text}</h4>`
    }
}
);

export const FooterTitle = Component(
{
    tagName: "footer-title",
    styleCSS: css
},
        
class FooterTitle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h5 class="text-light text-lg-start fw-bold">${text}</h5>`
    }
}
);

export const FooterText = Component(
{
    tagName: "footer-text",
    styleCSS: css
},
        
class FooterText extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<p class="text-light text-lg-start">${text}</p>`
    }
}
);