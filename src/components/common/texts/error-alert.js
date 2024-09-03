import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'error-alert',
    styleCSS: `
        .error-alert {
            position: absolute;
            left: 0;
            margin: 0;
            width: 100%;
            background-color: transparent;
            color: var(--app-red-color);
            padding: 1px;
            margin-top: 5px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: bold;
            animation: fadeInOut 3s ease-in-out forwards;
            white-space: nowrap;
        }
        
        .error-icon {
            font-size: 12px;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
        }
    `
},

class ErrorAlert extends WebComponent {
    render() {
        const content = this.innerHTML || '';
        const top = this.getAttribute('top') || 50;

        return `
            <div id="errorMessage" class="error-alert d-flex justify-content-start align-items-center gap-2" style="top:${top};">
                <span class="error-icon">⚠️</span>
                <span class="error-msg">${content}</span>
            </div>
        `;
    }
});