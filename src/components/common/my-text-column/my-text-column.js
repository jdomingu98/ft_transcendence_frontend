"use strict";
import { Component, WebComponent } from "#WebComponent"

export const TextColumn = Component(
{
    tagName: "text-column",
},
    
class TextColumn extends WebComponent
{   
    render(){
        const tittle = this.getAttribute("tittle") || "";
        const text = this.getAttribute("text") || "";
        const text2 = this.getAttribute("text2") || "";
        const text3 = this.getAttribute("text3") || "";
        return `
            <h5 class="text-light text-lg-start fw-bold">${tittle}</h5>
            <div class="mt-4">
                ${ text ? `<p class="text-light text-lg-start">${text}</p>` : ""}
                ${ text2 ? `<p class="text-light text-lg-start">${text2}</p>` : ""}
                ${ text3 ? `<p class="text-light text-lg-start">${text3}</p>` : ""}
            </div>
        `
    }
}
);