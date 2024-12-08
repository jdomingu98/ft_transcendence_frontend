import WebComponent, { Component } from '#WebComponent';

import css from './profile-stats.css?inline';

export default Component ({
    tagName: 'profile-stats',
    styleCSS: css
},

class ProfileStats extends WebComponent {

    get playerStats() {
        return this.getAttribute('stats');
    }

    getStats() {
        const playerData = this.playerStats;
        return [{
            statName: '{{ translator.translate("PROFILE.STATS.GOALS_SCORED") }}',
            statValue: playerData?.goalsScored,
            statColor: 'var(--app-green-color)',
        }, {
            statName: '{{ translator.translate("PROFILE.STATS.GOALS_AGAINST") }}',
            statValue: playerData?.goalsAgainst,
            statColor: 'var(--app-red-color)'
        }, {
            statName: '{{ translator.translate("PROFILE.STATS.GOALS_STOPPED") }}',
            statValue: playerData?.goalsStopped,
            statColor: 'var(--app-blue-color)'
        }, {
            statName: '{{ translator.translate("PROFILE.STATS.TIME_PLAYED") }}',
            statValue: playerData?.timePlayed,
            statColor: 'white'
        }, {
            statName: `${ this.translator.translate('PROFILE.STATS.WINRATE')}`,
            statValue: playerData?.soloWr,
            statCode: 'wr'
        }, {
            statName: `${ this.translator.translate('PROFILE.STATS.STREAK')}`,
            statValue: playerData?.maxWinStreak,
            statCode: 'streak'
        }];

    }

    mapStatsToDiv() {
        return this.getStats().map(stat => {
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
                                <circle cx="30" cy="30" r="25" class="circle-progress" style="stroke-dashoffset: ${157 - (157 * (stat.statValue ?? 0)) / 100}" />
                            </svg>
                            <p class="position-absolute text-white solo-wr-value" style="font-size: 1.3rem">${stat.statValue ?? 0}</p>
                        </div>
                    </div>
                `;
            } else if (stat.statCode === 'streak') {
                const streak = stat.statValue ?? 0;
                return `
                    ${ streak >= 2 ? `
                        <div class="stat">
                            <h3>${stat.statName}</h3>
                            <div style="height: 80px; aspect-ratio: 2/1; position: relative;">
                                <div class="w-100 h-100 d-flex">
                                    <img src="/resources/fire.gif" alt="Max streak fire gif" 
                                        class="position-absolute top-0 start-50 translate-middle-x w-50"/>
                                    <p class="position-absolute bottom-0 text-black start-50 translate-middle-x text-center" 
                                        style="font-size: ${streak >= 10 ? '1.4rem' : '1.75rem'}; z-index: 1;">
                                            ${streak}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                `;
            }
            return`
                    <div class="stat">
                        <h3>${stat.statName}</h3>
                        <p style="color: ${stat.statColor}">${stat.statValue ?? 0}</p>
                    </div>
                `;

        }).join('');
    }

    render() {
        return `
            <div class="container mt-3 p-3 pb-0">
                <h4 class="fw-bold mb-4">{{ translator.translate("PROFILE.STATS.TITLE") }}</h4>
            </div>
            <div class="d-grid mt-3 py-3 gap-3 stats-container">
                ${ this.mapStatsToDiv() }
            </div>
        `;

    }
});