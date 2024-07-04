import WebComponent, { Component } from "#WebComponent";

import { BigTittle } from "../../common/my-texts/big-tittle/big-tittle";
import { LangBtn } from "../../common/my-buttons/lang-btn/lang-btn";

import FireStreak from "./fire-streak/fire-streak";
import UserHash from "./user-hash/user-hash";
import BannerProfile from "./banner-profile/banner-profile";
import CircleProfile from "./circle-profile/circle-profile";
import StatsProfile from "./stats-profile/stats-profile";

import css from "./styles.css?inline";

export default Component({
    tagName: "profile-card",
    styleCSS: css
},
class ProfileCard extends WebComponent
{
render() {

    return `
        <div class="card mt-4">
            <banner-profile></banner-profile>
            <circle-profile></circle-profile>
            <div class="section-1" style="z-index:1; margin-top:5rem;">
                <div class="d-flex flex-lg-row flex-column justify-content-center justify-content-lg-between align-items-center">
                    <fire-streak></fire-streak>
                    <user-hash></user-hash>
                </div>
            </div>
            <div class="section-2" style="margin-top:4rem">
                <stats-profile
                    tittle="Goals Scored"
                    num="123"
                    tittle2="Goals Against"
                    num2="32"
                    tittle3="Goals Stopped"
                    num3="569"
                >
                </stats-profile>
            </div>
            <div class="section-3 mb-5" style="margin-top:5rem">
                <stats-profile
                    bigTittle="true"
                    tittle="Solo Wr"
                    num="90"
                    tittle2="Tourney Wr"
                    num2="75"
                    tittle3="Time played"
                    num3="125h"
                    circleNum="true"
                    bigNum="true"
                >
                </stats-profile>
            </div>
        </div>
    `
}
})