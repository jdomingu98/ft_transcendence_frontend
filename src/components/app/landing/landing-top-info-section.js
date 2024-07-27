import '#svg';
import { Component, WebComponent } from '#WebComponent';


export default Component ({
    tagName: 'landing-top-info-section'
},

class LandingTopInfoSection extends WebComponent {
    render() {
        const title = this.getAttribute('title');
        const desc = this.getAttribute('desc');

        return `
            <section class="d-flex col justify-content-center align-items-center my-5">
                <div class="col col-6">
                    <h1-text>${title}</h1-text>
                    <div class="mt-3 col-7">
                        <body-text>${desc}</body-text>
                    </div>
                    <div class="col col-11 d-flex mt-4 justify-content-between">
                        <primary-button w="255px" h="75px">Try local mode</primary-button>
                        <secondary-button w="255px" h="75px">Create a <br> tournament</secondary-button>
                    </div>
                </div>
                <landing-laptop></landing-laptop>
            </section>
        `;
    }
});
