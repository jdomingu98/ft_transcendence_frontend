import { Component, WebComponent } from "#WebComponent"


export const BigTittle = Component(
{
    tagName: "big-tittle",
    styleCSS: `
        .big-tittle{
            color: #ffff;
            font-weight: bold;
            font-size: 2.5rem;
            text-transform: uppercase;
        }
    `
},
        
class BigTittle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<h1 class="mt-4 big-tittle">${text}</h1>`
    }
}
);