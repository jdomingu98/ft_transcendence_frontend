import { Component, WebComponent } from "#WebComponent"


export const SmallTittle = Component(
{
    tagName: "small-tittle",
    styleCSS: `
        .small-tittle{
            color: #ABD9D9;
            font-size: 1.3rem;
            letter-spacing: 3px;
        }
    `
},
        
class SmallTittle extends WebComponent
{   
    render(){
        const text = this.innerHTML || "";
        return `<p class="fw-bold mb-0 small-tittle">${text}</p>`
    }
}
);