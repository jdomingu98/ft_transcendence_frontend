import { Component, WebComponent } from '#WebComponent';


export default Component ({
    tagName: 'landing-call-to-action-card'
},

class LandingCallToActionCard extends WebComponent {
    render() {
        return `
            <section
                class="col d-flex text-center my-5"
                style="background: var(--app-landing-footer-gradient); border-radius: 30px;height: 30rem;"
            >
                <div class="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                    <sub-header-text color="black">ready to show <br> what are you made of?</sub-header-text>
                    <h2-text>Be part of this <br>community</h2-text>
                    <primary-button color="black" w="260px" h="90px">get started</primary-button>
                </div>
            </section>
        `;
    }
});