import WebComponent, { Component } from "#WebComponent";

import css from "./styles.css?inline";

export default Component({
    tagName: "profile-search",
    styleCSS: css
},
class ProfileSearch extends WebComponent
{
render() {

    return `
    <nav class=" d-flex justify-content-center navbar p-0">
        <div class="input-group">
            <span class="input-group-text"><img src="/src/img/icons/search.png" style="width: 30px; height: 30px;"/></span>
            <input type="text" class="form-control" placeholder="Search Users.." aria-label="Search Users..">
        </div>
    </nav>
    `
}
})