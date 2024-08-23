import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'modal-span-text',
    styleCSS: `
        .text{
            color: #FFFFFF;
            opacity: 70%;
            font-size: 20px;
            opacity: 70%;
            animation: fadeIn 3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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

        return `
            <span class="text text-start d-flex justify-content-center mb-4 mt-5">${content}</span>
        `;
    }
});