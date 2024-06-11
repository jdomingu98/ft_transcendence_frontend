"use strict";


import { Component, WebComponent } from "#WebComponent"
import { TrBtn, BgBtn, LgBtn } from "../../common/my-buttons/my-buttons.js"
import { BigTittle,SmallTittle,PgraphText } from "../../common/my-texts/my-texts.js"
import { SmallCard } from "./my-cards/small-card.js";

export default Component(
{
    tagName: 'developer-list'
},

class DeveloperList extends WebComponent
{
    init() {
        this.state = {
            devs: [
                {
                    src: "src/img/people/aruzafa-.jpg",
                    name: "aruzafa-",
                    job: "Project Manager",
                    desc: "Fullstack Developer",
                },
                {
                    src: "src/img/people/atrujill.jpg",
                    name: "atrujill",
                    job: "Back-end developer",
                    desc: "",
                },
                {
                    src: "src/img/people/cmorales.jpg",
                    name: "cmorales",
                    job: "Front-end developer",
                    desc: "",
                },
                {
                    src: "src/img/people/jdomingu.png",
                    name: "jdomingu",
                    job: "UX/UI Designer",
                    desc: "Fullstack Developer",
                },
            ]
        }
    }

    developersToHTML() {
        return this.state.devs.map(dev => `
            <div class="col-12 col-md-6 col-lg-3 d-flex px-0 my-5 justify-content-center">
                <small-card src="${dev.src}" tittle="${dev.name}" text="${dev.job}" text2="${dev.desc}"></small-card>
            </div>
        `).join('')
    }

    render() {
        return `
        <section class="row justify-content-center align-items-center" style="margin-top: 8rem;">

            <div class="col-12  d-flex flex-column justify-content-center align-items-center text-center">
                <small-tittle>MEET THE TIME</small-tittle>
                <big-tittle>The Minds Behind <br> The Code</big-tittle>
            </div>

            <div-cards class=" row d-flex justify-content-center px-0" > 
                ${this.developersToHTML()}
            </div-cards>

        </section>
        `
    }
})
