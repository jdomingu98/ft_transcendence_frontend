import "../../components/index.js";

import WebComponent, { Component } from "#WebComponent"

import css from "./LandingPage.css?inline"

export default Component(
{
    tagName: "landing-page",
    styleCSS: css
},
    
class LandingPage extends WebComponent
{   
    render(){
        return `
        <div class="landing">
        <div class="container">    
                <light-point num="1"></light-point>
                <nav-point style="padding-top: 6rem; position: relative;">
                    <light-point num="1"></light-point>
                </nav-point>

                <tst-point
                    src="/src/img/laptop.png"
                    imagenLeft="false"
                    bigTittle="Play PVP <br> Pong For Free"
                    p="Play against your friends in local mode or <br>organize local tournamets up to 32 players">
                        <bg-btn>TRY LOCAL MODE</bg-btn>
                        <bg-btn class="no-color">CREATE A <br> TOURNAMENT</bg-btn>
                </tst-point>

                <tst-point
                src="src/img/stats.png"
                imagenLeft="true"
                smallTittle="SOCIAL MEDIA"
                bigTittle="Discover People<br>And Become Friends"
                p="Send friend requests and chat with people you <br> play with from all over the world">
                <bg-btn style="width: 330px;">MEET NEW PEOPLE</bg-btn>
                </tst-point>
            
                <light-point num="2"></light-point>

                <tst-point
                    src="src/img/movil.png"
                    imagenLeft="false"
                    smallTittle="COMPETE WORLDWIDE"
                    bigTittle="Be The Top Player On <br>The Leaderboard"
                    p="Compete in online games and gain points <br> Become the best player of Pong in the world">
                        <light-point num="3"></light-point>

                        <bg-btn style="width: 330px;">REGISTER NOW</bg-btn>
                </tst-point>

                <card-point></card-point>
                
                <big-card-point></big-card-point>

                <footer-point></footer-point>
            </div>
        </div>
        `
    }
}
);