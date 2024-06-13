import WebComponent, { Component } from "#WebComponent";

import css from "./styles.css?inline";

export default Component({
    tagName: "fire-streak",
    styleCSS: css
},
class FireStreak extends WebComponent
{
render() {
    return `
        <div class="d-flex flex-column align-items-end margin-left" >
            <div class="d-flex justify-content-start" style="position:relative;">
                <img src="/src/img/icons/fire.gif" class="img-streak" alt="">
                <span class="text-light number-streak">16</span>
                <span class="text-center text-light text-streak">MAX</span>
            </div>

            <span class="text-light fw-bold fs-4 mt-2">WIN STREAK</span>
        </div>
    `
}
})