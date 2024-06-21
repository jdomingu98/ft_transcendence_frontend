"use strict";

import { Component, WebComponent } from '#WebComponent';

import css from './landing-info-section.css?inline';

import { BigTitle, SmallTitle, ParagraphText } from '#common';

export default Component ({
    tagName: 'landing-info-section',
    styleCSS: css
},

class LandingInfoSection extends WebComponent {
    render() {
        const source = this.getAttribute("src") || "";
        const imagenLeft = (this.getAttribute("imagenLeft") || false) === 'true';
        const alt = this.getAttribute("alt") || ""
        const smallTitle = this.getAttribute("smallTitle")
        const bigTitle = this.getAttribute("bigTitle")
        const p = this.getAttribute("p")

        return `
            <section class="row" style="margin-top: 7rem;">
                ${ !imagenLeft ? '' :
                    `<div class="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-start px-0 order-lg-0 order-1 custom-image-left">
                        <landing-mailbox></landing-mailbox>
                    </div>`
                }
                
                <div class="col-12 col-lg-6 d-flex flex-column justify-content-center  ${imagenLeft ? 'align-items-center align-items-lg-end align-items-xl-start' : 'align-items-lg-start'} px-0 text-center text-lg-start">
                    ${ smallTitle ? `<small-title>${smallTitle}</small-title>` : '' }
                    ${ bigTitle ? `<big-title class="${imagenLeft ? 'text-center text-lg-end text-xl-start' : 'text-center text-lg-start'}">${bigTitle}</big-title>` : ''}
                    ${ p ? `<paragraph-text>${p}</paragraph-text>` : ''}
                    <div class="d-flex pt-3 gap-3 justify-content-center ${imagenLeft ? 'justify-content-lg-end' : 'justify-content-lg-start'}">
                        ${this.innerHTML}
                    </div>
                </div>
                
                ${ imagenLeft ? '' :
                    `<div class="col-12 col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end p-0">
                        
                        <landing-laptop></landing-laptop>
                    </div>`
                }
            </section>
        `;
    }
});
