import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'modal-h1-text',
    styleCSS: `
        h1{
            font-size: 42px; 
            text-align: center;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @media (max-width: 1400px) {
            h1{
                min-width: 0px;
                font-size: 35px;
            }
        }
    `
},

class ModalH1Text extends WebComponent {
    render() {
        const content = this.innerHTML || '';
        const color = this.getAttribute('color') || '#FFFFFF';
        const uppercase = this.getAttribute('uppercase') || 'false';
        const transformedContent = uppercase === 'true' ? content.toUpperCase() : content;
        const bootstrap = this.getAttribute('bootstrap') || '';
        const mt = this.getAttribute('mt') || '';
        const mb = this.getAttribute('mb') || '';
        return `
            <h1
                class=" fw-bold text-center ${bootstrap}"
                style="color: ${color}; font-weight: 600; margin-top:${mt}; margin-bottom:${mb}"
            >
                ${transformedContent}
            </h1>
        `;
    }
});