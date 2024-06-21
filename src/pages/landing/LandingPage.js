import WebComponent, { Component } from '#WebComponent';

import css from './LandingPage.css?inline';

import  {   
            LandingCallToActionCard,
            LandingDevCards,
            LandingFooter, 
            LandingInfoSection, 
            LandingNavBar
        } from '/src/components/app/landing';

import { LandingLightPoint } from '/src/components/svg';

import { BgBtn } from '#common';

export default Component ({
    tagName: 'landing-page',
    styleCSS: css
},

class LandingPage extends WebComponent {
    render() {
        return `

                <div class="bg">
                    <!--<div class="lights top-light"></div>
                    <div class="lights middle-light"></div>
                    <div class="lights bottom-light"></div>-->
                <div class="container">
                    
                    <landing-navbar style="padding-top: 6rem; position: relative;"></landing-navbar>
                    <landing-info-section src="/src/img/points/laptop.png" imagenLeft="false" bigTitle="Play PVP <br> Pong For Free"
                        p="Play against your friends in local mode or <br>organize local tournamets up to 32 players"
                        alt="laptop">
                        <bg-btn>TRY LOCAL MODE</bg-btn>
                        <bg-btn class="no-color">CREATE A <br> TOURNAMENT</bg-btn>
                    </landing-info-section>

                    <landing-info-section src="/src/img/points/stats.png" imagenLeft="true" smallTitle="SOCIAL MEDIA" bigTitle="Discover People<br>And Become Friends"
                        p="Send friend requests and chat with people you <br> play with from all over the world"
                        alt="stats">
                        <bg-btn style="width: 330px;">MEET NEW PEOPLE</bg-btn>
                    </landing-info-section>

                    <landing-info-section src="/src/img/points/movil.png" imagenLeft="false" smallTitle="COMPETE WORLDWIDE" bigTitle="Be The Top Player On <br>The Leaderboard"
                        p="Compete in online games and gain points <br> Become the best player of Pong in the world"
                        alt="mobile">
                        <bg-btn style="width: 330px;">REGISTER NOW</bg-btn>
                    </landing-info-section>
                    <landing-dev-cards></landing-dev-cards>
                    <landing-call-to-action-card></landing-call-to-action-card>
                    <landing-footer></landing-footer>
                </div>
                </div>
        `;
    }
});