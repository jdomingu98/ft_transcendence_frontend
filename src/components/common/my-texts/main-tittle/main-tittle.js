import { Component, WebComponent } from "#WebComponent"


export const MainTittle = Component(
{
    tagName: "main-tittle",
    styleCSS: `
        .tittle{
            color: #ffff;
            font-weight: bold;
            font-size: 1.5rem;
            text-transform: uppercase;
        }
    `
},
    
class MainTittle extends WebComponent
{   
    render(){
        const style = this.getAttribute("style") || "";
        const text = this.innerHTML || "";
        const bootstrap = this.getAttribute("bootstrap") || "";
        return `<h3 class="tittle text-center text-lg-start ${bootstrap}" style="${style}">${text}</h3>`
    }
}
);