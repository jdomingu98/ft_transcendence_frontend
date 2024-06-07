"use strict";


import { Component, WebComponent } from "#WebComponent"
import {TrBtn, BgBtn, LgBtn} from "../../small-components/my-buttons/my-buttons.js"
import {BigTittle,SmallTittle,PgraphText} from "../../small-components/my-texts/my-texts.js"
import { MediaImg } from "../../small-components/my-imgs/my-imgs.js";
import { SmallCard } from "../../small-components/my-cards/my-cards.js";

export default Component(
    {
        tagName: 'card-point'
},

class CardPoint extends WebComponent
{
    //PREGUNTAR ALE PQ EL DIV NO LO PUEDO PASAR
    render() {
        return `
        <section class="row justify-content-center align-items-center" style="margin-top: 8rem;">

            <div class="col-12  d-flex flex-column justify-content-center align-items-center text-center">
                <small-tittle>MEET THE TIME</small-tittle>
                <big-tittle>The Minds Behind <br> The Code</big-tittle>
            </div>

            <div-cards class=" row d-flex justify-content-center px-0" > 
                <div class="col-12 col-md-6 col-lg-3 d-flex px-0 my-5 justify-content-center">
                    <small-card src="src/img/aruzafa-.jpg" tittle="aruzafa-" text="Project Manager" text2="Fullstack Developer""></small-card>
                </div>

                <div class="col-12 col-md-6 col-lg-3 d-flex px-0 my-5 justify-content-center">
                    <small-card src="src/img/atrujill.jpg" tittle="atrujill" text="Back-end developer"></small-card>
                </div>

                <div class="col-12 col-md-6 col-lg-3 d-flex px-0 my-5 justify-content-center">
                    <small-card src="./img/cmorales.jpg" tittle="cmorales" text="Front-end developer"></small-card>
                </div>

                <div class="col-12 col-md-6 col-lg-3 d-flex px-0 my-5 justify-content-center">
                    <small-card src="./img/jdomingu.png" tittle="jdomingu" text="UX/UI <br> Designer" text2="Fullstack Developer"></small-card>
                </div> 

            </div-cards>

        </section>
        `
    }
})
