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
                    <td>${match.result}</td>
                    <td>${match.against}</td>
                    <td>${match.earned}</td>
                    <td>${match.time}</td>
                </tr>
            `).join('');
    }

    render() {
        return `
            <table class="matches-table">
                <thead>
                    <tr>
                        <th>Result</th>
                        <th>Against</th>
                        <th>Earned</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    ${ this.mapMatchesResults() }
                </tbody>
            </table>
            <div class="pagination">
                <span class="pagination-button">&lt; Previous</span>
                <span>${currentPage} of ${maxPages}</span>
                <span class="pagination-button">Next &gt;</span>
            </div>
        `;
    }
});