"use strict";

import { Component, WebComponent } from "#WebComponent"


export const NavButton = Component(
{
    tagName: "nav-button",
    styleCSS: `
        .nav-item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 200px;
        }    
    `
},

class NavButton extends WebComponent 
{
    render() {
        const src = this.getAttribute('src') || "";
        const text = this.getAttribute('text') || "";
        return `       
        <div class="nav-item flex-column justify-content-start flex-lg-row mb-5 text-center gap-1 gap-xl-3">
            <a href="#">
                <img class="symbol" src="${src}" alt=""> 
            </a>
            <a class="nav-link fs-4 fw-bold text-white text-uppercase d-none d-md-block" href="#">${text}</a>
        </div>
        `;
    }
})