import WebComponent, { Component } from '#WebComponent';

import css from './profile-history.css?inline';

const currentPage = 1;
const maxPages = 50;

export default Component ({
    tagName: 'profile-history',
    styleCSS: css
},

class ProfileHistory extends WebComponent {
    init() {
        this.state = {
            matches: [{
                result: 'VICTORY',
                against: 'aTRuJiLl',
                earned: '329 pts',
                time: '1min 30s'
            }, {
                result: 'DEFEAT',
                against: 'castor-afanoso',
                earned: '-87 pts',
                time: '5min'
            }, {
                result: 'DEFEAT',
                against: '-----',
                earned: '-101 pts',
                time: '4min 1s'
            }, {
                result: 'DRAW',
                against: '-----',
                earned: '0 pts',
                time: '5min'
            }, {
                result: 'VICTORY',
                against: 'cMoraleS',
                earned: '94 pts',
                time: '4min 42 s'
            }]
        };
    }

    mapMatchesResults() {
        return this.state.matches.map( match =>
            `
                <tr class="${match.result.toLowerCase()}">
                    <td class="text-uppercase fw-bold">
                        {{ translator.translate("PROFILE.MATCH_HISTORY.RESULT_STATUS." + '${match.result}') }}
                    </td>
                    <td>${match.against}</td>
                    <td>${match.earned}</td>
                    <td>${match.time}</td>
                </tr>
            `).join('');
    }

    render() {
        return `
            <table class="w-100 mb-2 text-center" style="border-collapse: separate;">
                <thead>
                    <tr>
                        <th>{{ translator.translate("PROFILE.MATCH_HISTORY.TABLE_HEAD.RESULT") }}</th>
                        <th>{{ translator.translate("PROFILE.MATCH_HISTORY.TABLE_HEAD.OPPONENT") }}</th>
                        <th>{{ translator.translate("PROFILE.MATCH_HISTORY.TABLE_HEAD.EARNED") }}</th>
                        <th>{{ translator.translate("PROFILE.MATCH_HISTORY.TABLE_HEAD.TIME") }}</th>
                    </tr>
                </thead>
                <tbody>
                    ${ this.mapMatchesResults() }
                </tbody>
            </table>
            <div class="d-flex align-items-center justify-content-evenly text-white mt-5 pagination">
                <span class="pagination-button">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.PREVIOUS") }}
                </span>
                <div>
                    <span>${currentPage}</span>
                    <span>{{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.OF") }}</span>
                    <span> ${maxPages}</span>
                </div>
                <span class="pagination-button">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.NEXT") }}
                </span>
            </div>
        `;
    }
});