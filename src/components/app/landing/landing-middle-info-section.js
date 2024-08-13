import '#svg';
import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'landing-middle-info-section'
},

class LandingMiddleInfoSection extends WebComponent {
    render() {
        const subHeader = this.getAttribute('subHeader');
        const title = this.getAttribute('title');
        const desc = this.getAttribute('desc');

        return `
            <section class="d-flex col align-items-center my-5 gap-5">
                <div class="col col-6">
                    <landing-mailbox></landing-mailbox>
                </div>
                <div class="col col-6">
                    <sub-header-text color="var(--app-secondary-color)">${subHeader}</sub-header-text>
                    <h2-text>${title}</h2-text>
                    <div class="my-4 col-8">
                        <body-text>${desc}</body-text>
                    </div>
                    <primary-button w="346px" h="76px">Meet new people</primary-button>
                </div>
            </section>
        `;
    }
});
