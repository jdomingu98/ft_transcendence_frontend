import WebComponent, { Component } from "#WebComponent";

import css from "./styles.css?inline";

export default Component({
    tagName: "stats-profile",
    styleCSS: css
},
class StatsProfile extends WebComponent
{
    render() {
        const tittle = this.getAttribute("tittle") || "";
        const tittle2 = this.getAttribute("tittle2") || "";
        const tittle3 = this.getAttribute("tittle3") || "";
        
        const num = this.getAttribute("num") || "";
        const num2 = this.getAttribute("num2") || "";
        const num3 = this.getAttribute("num3") || "";

        const circleNum = this.getAttribute("circleNum") === "true";
        const bigNum = this.getAttribute("bigNum") === "true";

        const BigTittle = this.getAttribute("bigTittle") === "true";

        return `
            <div class="row d-flex  justify-content-center align-items-start">
                <div class="col-4 d-flex flex-column align-items-center text-center">
                    <span class="${circleNum ? 'stat-tittle fs-2' : 'stat-tittle'}">${tittle}</span>
                    <span class="stat-number ${circleNum ? 'stat-number-circle' : 'green'}">${num}</span>
                </div>
                <div class="col-4 d-flex flex-column align-items-center text-center">
                    <span class="${circleNum ? 'stat-tittle fs-2' : 'stat-tittle'}">${tittle2}</span>
                    <span class="stat-number ${circleNum ? 'stat-number-circle' : 'red'}">${num2}</span>
                </div>
                <div class="col-4 d-flex flex-column align-items-center text-center">
                    <span class="${circleNum ? 'stat-tittle fs-2' : 'stat-tittle'}">${tittle3}</span>
                    <span class="stat-number ${bigNum ? 'stat-big-number' : 'blue'}">${num3}</span>
                </div>
            </div>
        `;
    }
});


