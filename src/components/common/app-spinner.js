import WebComponent, { Component } from '#WebComponent';

export default Component({
    tagName: 'app-spinner',
},
class AppSpinner extends WebComponent {
    DEFAULT_SIZE = '17rem';

    render() {
        const size = this.getAttribute('size') || this.DEFAULT_SIZE;
        return `
            <div style="width: ${size}; height: ${size};">
                <img src="/src/resources/loading-paddle.gif" style="width:100%" />
            </div>
        `;
    }
}
);