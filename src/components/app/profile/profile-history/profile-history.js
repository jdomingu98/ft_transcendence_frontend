import WebComponent, { Component } from '#WebComponent';
import GameService from '#services/GameService';

import css from './profile-history.css?inline';

export default Component ({
    tagName: 'profile-history',
    styleCSS: css
},

class ProfileHistory extends WebComponent {
    init() {
        this.state = {
            matches: [],
            maxPages: 1,
        };
        this.setPage(1);
    }

    getMatches(page) {

        const userId = this.getAttribute('userId');
        GameService.getMatchHistory(userId, page).then(page => this.setState({
            maxPages: Math.ceil(page.count / page.results.numItems),
            matches: page.results.data
        }));
    }

    setPage(page) {
        if (page > 0 && page <= this.state.maxPages) {
            this.currentPage = page;
            this.getMatches(page);
        }
    }

    mapMatchesResults() {
        return this.state.matches.map(match => `
            <tr class="victory">
                <td class="text-uppercase fw-bold">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.RESULT_STATUS." + 'VICTORY') }}
                </td>
                <td>${match.user_b}</td>
                <td>${42}</td>
                <td>${match.time_played}</td>
            </tr>
        `).join('');
    }

    bind() {
        this.subscribe('#prev-page', 'click', () => this.setPage(this.currentPage - 1));
        this.subscribe('#next-page', 'click', () => this.setPage(this.currentPage + 1));
    }

    render() {
        return `
            <div class="container p-3">
                <h4 class="mb-4 fw-bold text-white">{{ translator.translate("PROFILE.MATCH_HISTORY.TITLE") }}</h4>
            </div>
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
                <span id="prev-page" class="pagination-button">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.PREVIOUS") }}
                </span>
                <div>
                    <span>{{ currentPage }}</span>
                    <span>{{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.OF") }}</span>
                    <span>{{ state.maxPages }}</span>
                </div>
                <span id="next-page" class="pagination-button">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.NEXT") }}
                </span>
            </div>
        `;
    }
});