import WebComponent, { Component } from '#WebComponent';

export default Component ({
    tagName: 'landing-navbar',
},

class LandingNavBar extends WebComponent {

    bind() {
        this.subscribe('primary-button', 'click', () => this.emit('OPEN_MODAL'));
    }

    render() {
        return `
            <nav class="nav d-flex align-items-center justify-content-around py-5 text-uppercase fw-bold text-center"
                style="background-color: var(--app-primary-bg-color)">
                <router-link
                    class="nav-link link-light text-decoration-none"
                    style="font-size:24px; z-index: 1;"
                    rel="noreferrer"
                    href="/"
                >
                    Transcendence
                </router-link>
                <router-link
                    class="nav-link link-light text-decoration-none"
                    rel="noreferrer"
                    href="/game"
                    style="font-size: 20px;z-index: 1;"
                >
                    {{ translator.translate("LANDING.NAVBAR.PLAY") }}
                </router-link>
                <router-link
                    class="nav-link link-light text-decoration-none"
                    rel="noreferrer"
                    href="/tournament"
                    style="font-size: 20px; z-index: 1;"
                >
                    {{ translator.translate("LANDING.NAVBAR.TOURNAMENTS") }}
                </router-link>
                <div style="z-index: 1">
                    <language-selector w="140px" h="35px"></language-selector>
                </div>
                <div style="z-index: 1">
                    <primary-button w="165px" h="45px">
                        {{ translator.translate("LANDING.NAVBAR.LOGIN") }}
                    </primary-button>
                </div>
            </nav>
        `;
    }
});
