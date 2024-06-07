"use strict";

import css from "./styles.css?inline";

import { Component, WebComponent } from "#WebComponent"


export const MainTittle = Component(
{
    tagName: "main-tittle",
    styleCSS: css
},
    
class MainTittle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h3 class="tittle text-center text-lg-start">${text}</h3>`
    }
}
);

export const BigTittle = Component(
{
    tagName: "big-tittle",
    stylesURL: "My-Components/small-components/my-texts/styles.css"
},
        
class BigTittle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h1 class="mt-4 big-tittle">${text}</h1>`
    }
}
);

export const PgraphText = Component(
{
    tagName: "pgraph-text",
    stylesURL: "My-Components/small-components/my-texts/styles.css"
},
        
class PgraphText extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<p class="mt-3 text-light">${text}</p>`
    }
}
);

export const SmallTittle = Component(
{
    tagName: "small-tittle",
    stylesURL: "My-Components/small-components/my-texts/styles.css"
},
        
class SmallTittle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<p class="fw-bold mb-0" style="color: #ABD9D9; font-size: 1.3rem; letter-spacing: 3px;">${text}</p>`
    }
}
);

export const CardTittle = Component(
{
    tagName: "card-tittle",
    stylesURL: "My-Components/small-components/my-texts/styles.css"
},
        
class CardTittle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h5 class="card-tittle text-light fw-bold mb-4">${text}</h5>`
    }
}
);

export const CardText = Component(
{
    tagName: "card-text",
    stylesURL: "My-Components/small-components/my-texts/styles.css"
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
    stylesURL: "My-Components/small-components/my-texts/styles.css"
},
        
class BigCardText extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h4 class="card-title " style="color: #0000000;">${text}</h4>`
    }
}
);

export const FooterTittle = Component(
{
    tagName: "footer-tittle",
    stylesURL: "My-Components/small-components/my-texts/styles.css"
},
        
class FooterTittle extends WebComponent
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
    stylesURL: "My-Components/small-components/my-texts/styles.css"
},
        
class FooterText extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<p class="text-light text-lg-start">${text}</p>`
    }
}
);