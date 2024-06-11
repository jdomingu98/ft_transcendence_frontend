"use strict";


import { Component, WebComponent } from "#WebComponent"
import { SmallTittle} from "../../common/my-texts/small-tittle/small-tittle.js"
import { BigTittle } from "../../common/my-texts/big-tittle/big-tittle.js"
import { SmallCard } from "./small-card/small-card.js";


export default Component(
{
    tagName: 'landing-dev-list'
},

class LandingDevList extends WebComponent
{
    init() {
        this.state = {
            devs: [
                {
                    src: "src/img/people/aruzafa-.jpg",
                    name: "aruzafa-",
                    job: "Project Manager",
                    desc: "Fullstack Developer",
                    alt: "aruzafa-",
                },
                {
                    src: "src/img/people/atrujill.jpg",
                    name: "atrujill",
                    job: "Back-end developer",
                    desc: "",
                    alt: "atrujill",
                },
                {
                    src: "src/img/people/cmorales.jpg",
                    name: "cmorales",
                    job: "Front-end developer",
                    desc: "",
                    alt: "cmorales",
                },
                {
                    src: "src/img/people/jdomingu.png",
                    name: "jdomingu",
                    job: "UX/UI Designer",
                    desc: "Fullstack Developer",
                    alt: "jdomingu",
                },
            ]
        }
    }

    developersToHTML() {
        return this.state.devs.map(dev => `
            <div class="col-12 col-md-6 col-lg-3 d-flex px-0 my-5 justify-content-center">
                <small-card src="${dev.src}" alt="${dev.alt}" tittle="${dev.name}" text="${dev.job}" text2="${dev.desc}"></small-card>
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
