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
                statName: 'Goals Scored',
                statValue: playerData.goalsScored,
                statColor: '#8DDAB5'
            }, {
                statName: 'Goals Against',
                statValue: playerData.goalsAgainst,
                statColor: '#DA8D8D'
            }, {
                statName: 'Goals Stopped',
                statValue: playerData.goalsStopped,
                statColor: '#8DBEDA'
            }, {
                statName: 'Time Played',
                statValue: playerData.timePlayed,
                statColor: 'white'
            }, {
                statName: 'WinRate',
                statValue: playerData.soloWr
            }, {
                statName: 'Max Win Streak',
                statValue: playerData.maxWinStreak
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
            if (stat.statName === 'WinRate') {
                return`
                    <div class="stat">
                        <h3>${stat.statName}</h3>
                        <div class="circle-wrapper">
                            <svg class="progress-circle" width="60" height="60">
                                <circle cx="30" cy="30" r="25" class="circle-bg" />
                                <circle cx="30" cy="30" r="25" class="circle-progress" />
                            </svg>
                            <p class="solo-wr-value">${stat.statValue}</p>
                        </div>
                    </div>
                `;
            } else if (stat.statName === 'Max Win Streak') {
                return`
                    <div class="stat">
                        <h3>${stat.statName}</h3>
                        <div class="d-flex position-relative">
                            <img src="/src/resources/fire.gif" alt="Fire GIF" class="fire-gif"/>
                            <p class="position-absolute win-streak">${stat.statValue}</p>
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
            <div class="stats-container">
                ${ this.mapStatsToDiv() }
            </div>
        `;

    }
});