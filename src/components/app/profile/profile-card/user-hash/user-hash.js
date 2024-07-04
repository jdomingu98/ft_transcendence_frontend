import WebComponent, { Component } from "#WebComponent";

import { BigTittle } from "../../../common/my-texts/big-tittle/big-tittle";

export default Component({
    tagName: "user-hash",
    styleCSS: `
        .margin-right{
            margin-right:5vw;
        }
        @media (max-width: 1250px) {
            .posleft{
                margin-left: 0;
            }

            .margin-right{
                margin-right: 0;
            }
        }
    `
},
class UserHash extends WebComponent
{
render() {
    return `
        <div class="d-flex flex-column gap-3 justify-content-center h-25 margin-right" >
            <div class="d-flex flex-row align-items-end gap-4 p-0">
                <big-tittle bootstrap="truncate">Cmorales</big-tittle>
                <big-tittle bootstrap="black">#42</big-tittle>
            </div>
            <lang-btn>Edit Profile</lang-btn>
        </div>
    `
}
})