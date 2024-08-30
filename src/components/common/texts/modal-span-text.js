import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'modal-span-text',
    styleCSS: `
        .text{
            color: #FFFFFF;
            opacity: 70%;
            font-size: 16px;
            opacity: 70%;
        }
        @media (max-width: 1000px) {
            .text{
                font-size: 15px;
                min-width: 0;
            }
        }
    
    `
},

class ModalSpanText extends WebComponent {
    render() {
        const content = this.innerHTML;
        const mt = this.getAttribute('mt') || '';
        const mb = this.getAttribute('mb') || '';

        return `
            <span class="text text-start d-flex justify-content-center" style="margin-top:${mt}; margin-bottom:${mb};">${content}</span>
        `;
    }
});