import { Component, WebComponent } from '#WebComponent';


export default Component ({
    tagName: 'modal-h1-text',
    styleCSS: `
        h1{
            font-size: 55px; 
            animation: fadeIn 3s ease-in-out;
            text-align: center;
            min-width: 500px;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @media (max-width: 1300px) {
            h1{
                font-size: 42px;
                min-width: 0px;
            }
        }
        @media (max-width: 1000px) {
            h1{
                min-width: 0px;
                font-size: 40px;
            }
        }
    `
},

class ModalH1Text extends WebComponent {
    render() {
        const content = this.innerHTML || '';
        const color = this.getAttribute('color') || '#FFFFFF';
        const uppercase = this.getAttribute('uperppercase') || 'false';
        const transformedContent = uppercase === 'true' ? content.toUpperCase() : content;

        return `
            <h1
                class=" fw-bold mt-4 text-center "
                style="color: ${color}; font-weight: 600;"
            >
                ${transformedContent}
            </h1>
        `;
    }
});