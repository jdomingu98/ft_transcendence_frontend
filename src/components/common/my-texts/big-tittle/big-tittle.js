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
        .black{
            color: black;
            text-shadow: -1px -1.3px 0 #ffff,  1.3px -1.3px 0 #ffff,-1px  1.3px 0 #ffff,1.3px  1.3px 0 #ffff;
        }
        .truncate {
            display: inline-block;
            max-width: 250px;
        }
    `
},
        
class BigTittle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        const bootstrap = this.getAttribute("bootstrap") || "";
        return `<h1 class="mt-4 big-tittle ${bootstrap}">${text}</h1>`
    }
}
);