import { Component, WebComponent } from "#WebComponent"

export const ClearBtn = Component(
{
    tagName: "clear-btn",
    styleCSS: `
        .tr-btn{
            color: var(--white);
            font-size: 1.2rem;
            font-weight: bold;
            border: none;
            background: transparent;
            z-index: 1;
            text-transform: uppercase;
        }
    `
},

class ClearBtn extends WebComponent
{
    render(){
        const text = this.innerHTML || "Click me";
        return `<button class="btn tr-btn">${text}</button>`
    }
}
);