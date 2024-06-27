import WebComponent, { Component } from '#WebComponent';

import css from './LandingPage.css?inline';

import  {   
            LandingCallToActionCard,
            LandingDevCards,
            LandingFooter, 
            LandingTopInfoSection,
            LandingMiddleInfoSection,
            LandingBottomInfoSection,
            LandingNavBar
        } from '/src/components/app/landing';

import { PrimaryButton, SecondaryButton } from '#common';

export default Component ({
    tagName: 'landing-page',
    styleCSS: css
},

class LandingPage extends WebComponent {
    render() {
        return `
            <div class="landing">
                <div class="landing-container d-flex row">
                    <div class="col-12 p-0 lights top-light"></div>
                    <div class="col-12 p-0 lights middle-light"></div>
                    <div class="col-12 p-0 lights bottom-light"></div>

                    <landing-navbar class="col-12 p-0"></landing-navbar>

                    <landing-top-info-section
                        class="col-12 p-0"
                        title="play pvp pong for free"
                        desc="Play against your friends in local mode or organize local tournamets up to 32 players"
                    >
                    </landing-top-info-section>

                    <landing-middle-info-section
                        subHeader="social media"
                        title="discover people and become friends"
                        desc="Send friend requests and chat with people you play with from all over the world"
                    >
                    </landing-middle-info-section>

                    <landing-bottom-info-section
                        subHeader="compete worldwide"
                        title="be the top player on the leaderboard"
                        desc="Compete in online games and gain points.<br>Become the best Pong player in the world"
                    >
                    </landing-bottom-info-section>

                    <landing-dev-cards></landing-dev-cards>

                    <landing-call-to-action-card></landing-call-to-action-card>

                    <landing-footer></landing-footer>
                </div>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
});