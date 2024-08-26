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
                result: '{{ translator.translate("PROFILE.MATCH_HISTORY.RESULT_STATUS.VICTORY") }}',
                against: 'aTRuJiLl',
                earned: '329 pts',
                time: '1min 30s',
                classMatch: 'victory'
            }, {
                result: '{{ translator.translate("PROFILE.MATCH_HISTORY.RESULT_STATUS.DEFEAT") }}',
                against: 'castor-afanoso',
                earned: '-87 pts',
                time: '5min',
                classMatch: 'defeat'
            }, {
                result: '{{ translator.translate("PROFILE.MATCH_HISTORY.RESULT_STATUS.DEFEAT") }}',
                against: '-----',
                earned: '-101 pts',
                time: '4min 1s',
                classMatch: 'defeat'
            }, {
                result: '{{ translator.translate("PROFILE.MATCH_HISTORY.RESULT_STATUS.DRAW") }}',
                against: '-----',
                earned: '0 pts',
                time: '5min',
                classMatch: 'draw'
            }, {
                result: '{{ translator.translate("PROFILE.MATCH_HISTORY.RESULT_STATUS.VICTORY") }}',
                against: 'cMoraleS',
                earned: '94 pts',
                time: '4min 42 s',
                classMatch: 'victory'
            }]
        };
    }

    mapMatchesResults() {
        return this.state.matches.map( match =>
            `
                <tr class="${match.classMatch}">
                    <td class="text-uppercase fw-bold">${match.result}</td>
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