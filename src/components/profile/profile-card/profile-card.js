import WebComponent, { Component } from "#WebComponent";

import css from "./styles.css?inline";

export default Component({
    tagName: "profile-card",
    styleCSS: css
},
class ProfileCard extends WebComponent
{
render() {

    return `
    <div class="card mt-4 w-100" style="height:60rem; position:relative; background-color: #13124F;">
        <div class="banner mt-0">
            <img src="https://via.placeholder.com/800x200" class="img-banner" alt="Banner">
        </div>

        <div class="perfil">
            <img src="https://via.placeholder.com/120" class="img-perfil" alt="Perfil">
        </div>

        <div class="card-body">
            <div class=""></div>
        </div>
    </div>
    `
}
})