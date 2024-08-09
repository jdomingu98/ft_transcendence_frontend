import { Component, WebComponent } from '#WebComponent';

export default Component ({
    tagName: 'landing-navbar'
},

class LandingNavBar extends WebComponent {
    bind() {

        this.subscribe("#modal", "click", () => {
            const modal = this._getDOM().querySelector("#myModal");
            if (modal){
                modal._getDOM().querySelector('.overlay').classList.remove('hidden');
                modal._getDOM().querySelector('.modal-form').classList.remove('hidden');
                modal.scrollIntoView();
            }
        
        })
    } 
    render() {
        return `
            <nav
                class="nav align-items-center justify-content-space-between my-5 text-uppercase fw-bold text-center"
            >
                <span
                    class="col-4"
                    style="font-size:24px; z-index: 1;"
                >
                    Transcendence
                </span>
                <a
                    class="nav-link link-light text-decoration-none col-2"
                    rel="noreferrer"
                    href="/game"
                    style="font-size: 20px;z-index: 1;"
                >
                    Play a game
                </a>
                <a
                    class="nav-link link-light text-decoration-none col-2"
                    rel="noreferrer"
                    href="/tourneys"
                    style="font-size: 20px;z-index: 1;"
                >
                    Tournaments
                </a>
                <language-selector class="col-2" w="130px" h="35px"></language-selector>
                <primary-button id="modal" w="165px" h="45px">Log In</primary-button>
            </nav>
            <modal-1 id="myModal"></modal-1>
        `;
    }
});
