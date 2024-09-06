import WebComponent, { Component } from '#WebComponent';

export default Component ({
    tagName: 'landing-navbar',
},

class LandingNavBar extends WebComponent {

    init() {
        this.state = {
            showRegister: false,
        };
    }

    closeModal() {
        this.setState({
            ...this.state,
            showRegister: false,
        });
    }

    handleModalEvents() {
        const modal = this._getDOM().querySelector('modal-card');
        if (modal) {
            this.subscribe('modal-card','CLOSE_MODAL', () => this.closeModal());
        }
    }

    bind() {
        this.subscribe('#btn-modal', 'click', () => {
            this.setState({
                ...this.state,
                showRegister: true,
            });
            this.handleModalEvents();
        });

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
                <router-link
                    class="nav-link link-light text-decoration-none col-2"
                    rel="noreferrer"
                    href="/game"
                    style="font-size: 20px;z-index: 1;"
                >
                    {{ translator.translate("LANDING.NAVBAR.PLAY") }}
                </router-link>
                <router-link
                    class="nav-link link-light text-decoration-none col-2"
                    rel="noreferrer"
                    href="/tourneys"
                    style="font-size: 20px;z-index: 1;"
                >
                    {{ translator.translate("LANDING.NAVBAR.TOURNAMENTS") }}
                </router-link>
                <language-selector class="col-2" w="130px" h="35px"></language-selector>
                <primary-button id="btn-modal" w="165px" h="45px">
                    {{ translator.translate("LANDING.NAVBAR.LOGIN") }}
                </primary-button>
            </nav>
            ${this.state.showRegister ? '<modal-card id="modal-register"></modal-card>' : ''}
        `;
    }
});
