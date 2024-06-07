"use strict";

import css from "./styles.css?inline";

import { Component, WebComponent } from "#WebComponent"

import {TrBtn, BgBtn, LgBtn} from "../../small-components/my-buttons/my-buttons.js"
import {BigTittle,SmallTittle,PgraphText, BigCardText} from "../../small-components/my-texts/my-texts.js"
import { MediaImg } from "../../small-components/my-imgs/my-imgs.js";
import { SmallCard } from "../../small-components/my-cards/my-cards.js";

export default Component(
{
    tagName: "big-card-point",
    styleCSS: css
},

class BigCardPoint extends WebComponent
{
    //PREGUNTAR ALE PQ EL DIV NO LO PUEDO PASAR
    render() {
        return `
        <section class="row" style="margin-top: 7rem;">
            <div class="col">
                <div class="bg-card text-center d-flex">
                    <div class="card-body d-flex justify-content-center align-items-center flex-column gap-5">
                        <big-card-text>READY TO SHOW <br> WHAT ARE YOU MADE OF?</big-card-text>
                        <big-tittle>Be Part Of This <br>Community</big-tittle>
                        <bg-btn class="black" style="font-size:1.2rem; height:80px">GET STARTED</bg-btn>
                    </div>
                </div>
            </div>
        </section>
        `
    }
})