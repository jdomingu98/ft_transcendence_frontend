import { Component, WebComponent } from "#WebComponent"

export const LangBtn = Component(
{
    tagName: "lang-btn",
    styleCSS: `
        .language-btn {
            background-color: transparent;
            color: rgb(129, 126, 126);
            border: 1px solid #ABD9D9;
            border-radius: 5px;
            padding: 0.01rem 3rem;
            position: relative;
            text-align: left; 
            display: flex; 
            padding-left: 1rem;
        }
    `
},
    
class LangBtn extends WebComponent
{
    render(){
        const text = this.innerHTML || "Click me";
        return `<button class="language-btn text-aling-left">${text}</button>`
    }
}
);

