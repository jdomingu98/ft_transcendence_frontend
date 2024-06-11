import WebComponent, { Component } from "#WebComponent"

import "/src/components/landing"
import "/src/components/landing/landing-lights/landing-lights"
import "/src/components/app/app-footer/app-footer.js"

import css from "./LandingPage.css?inline"

export default Component(
{
    tagName: "landing-page",
    styleCSS: css
},

class LandingPage extends WebComponent
{
    render() {
        return `
        <div class="parent">
            <div class="bg">
                <light-point num="1"></light-point>
                <light-point num="2"></light-point>
                <light-point num="3"></light-point>
            </div>
            <div class="container content">
                <landing-nav style="padding-top: 6rem; position: relative;"></landing-nav>
                <landing-section src="/src/img/points/laptop.png" imagenLeft="false" bigTittle="Play PVP <br> Pong For Free"
                    p="Play against your friends in local mode or <br>organize local tournamets up to 32 players"
                    alt="laptop">
                    <bg-btn>TRY LOCAL MODE</bg-btn>
                    <bg-btn class="no-color">CREATE A <br> TOURNAMENT</bg-btn>
                </landing-section>

                <landing-section src="/src/img/points/stats.png" imagenLeft="true" smallTittle="SOCIAL MEDIA" bigTittle="Discover People<br>And Become Friends"
                    p="Send friend requests and chat with people you <br> play with from all over the world"
                    alt="stats">
                    <bg-btn style="width: 330px;">MEET NEW PEOPLE</bg-btn>
                </landing-section>
            
                <landing-section src="/src/img/points/movil.png" imagenLeft="false" smallTittle="COMPETE WORLDWIDE" bigTittle="Be The Top Player On <br>The Leaderboard"
                    p="Compete in online games and gain points <br> Become the best player of Pong in the world"
                    alt="mobile">
                    <bg-btn style="width: 330px;">REGISTER NOW</bg-btn>
                </landing-section>
                <landing-dev-list></landing-dev-list>
                <landing-card></landing-card>
                <app-footer></app-footer>
            </div>
        </div>
        `
    }
}
);