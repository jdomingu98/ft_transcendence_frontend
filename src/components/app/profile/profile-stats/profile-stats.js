import WebComponent, { Component } from '#WebComponent';

import css from './profile-stats.css?inline';

const playerData = {
    goalsScored: '123',
    goalsAgainst: '32',
    goalsStopped: '569',
    soloWr: '40',
    timePlayed: '125h',
    maxWinStreak: '16'
};


export default Component ({
    tagName: 'profile-stats',
    styleCSS: css
},

class ProfileStats extends WebComponent {

    init() {
        this.state = {
            stats: [{
                statName: '{{ translator.translate("PROFILE.STATS.GOALS_SCORED") }}',
                statValue: playerData.goalsScored,
                statColor: 'var(--app-green-color)',
            }, {
                statName: '{{ translator.translate("PROFILE.STATS.GOALS_AGAINST") }}',
                statValue: playerData.goalsAgainst,
                statColor: 'var(--app-red-color)'
            }, {
                statName: '{{ translator.translate("PROFILE.STATS.GOALS_STOPPED") }}',
                statValue: playerData.goalsStopped,
                statColor: 'var(--app-blue-color)'
            }, {
                statName: '{{ translator.translate("PROFILE.STATS.TIME_PLAYED") }}',
                statValue: playerData.timePlayed,
                statColor: 'white'
            }, {
                statName: `${ this.translator.translate('PROFILE.STATS.WINRATE')}`,
                statValue: playerData.soloWr,
                statCode: 'wr'
            }, {
                statName: `${ this.translator.translate('PROFILE.STATS.STREAK')}`,
                statValue: playerData.maxWinStreak,
                statCode: 'streak'
            }]
        };
    }

    afterViewInit() {
        const soloWRValue = playerData.soloWr;
        const circle = this._getDOM().querySelector('.circle-progress');
        setTimeout(() => {
            circle.style.strokeDashoffset = 157 - (157 * soloWRValue) / 100;
        });
    }

    mapStatsToDiv() {
        return this.state.stats.map(stat => {
            if (stat.statCode === 'wr') {
                return`
                    <div class="stat">
                        <h3>${stat.statName}</h3>
                        <div
                            class="position-relative d-flex justify-content-center align-items-center mt-2"
                            style="width: 75px; height: 60px;"
                        >
                            <svg width="60" height="60" style="transform: rotate(-90deg);">
                                <circle cx="30" cy="30" r="25" class="circle-bg" />
                                <circle cx="30" cy="30" r="25" class="circle-progress" />
                            </svg>
                            <p class="position-absolute text-white mb-2 solo-wr-value" style="font-size: 1.3rem">${stat.statValue}</p>
                        </div>
                    </div>
                `;
            } else if (stat.statCode === 'streak') {
                return`
                    <div class="stat">
                        <h3>${stat.statName}</h3>
                        <div class="d-flex position-relative">
                            <img src="/src/resources/fire.gif" alt="Fire GIF" class="my-0 mx-auto" style="width: 5rem"/>
                            <p class="position-absolute text-black win-streak">${stat.statValue}</p>
                        </div>
                    </div>
                `;
            }
            return`
                    <div class="stat">
                        <h3>${stat.statName}</h3>
                        <p style="color: ${stat.statColor}">${stat.statValue}</p>
                    </div>
                `;

        }).join('');
    }

    render() {
        return `
            <div class="d-grid mt-3 pt-5 pb-3 gap-3 stats-container">
                ${ this.mapStatsToDiv() }
            </div>
        `;

    }
});