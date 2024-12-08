import WebComponent, { Component } from '#WebComponent';
import { LOCALE_LANG } from '#const';
import UserService from '#services/UserService';

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
        UserService.getMatchHistory(userId, page).then(page => this.setState({
            ...this.state,
            maxPages: Math.ceil(page.count / page.results.numItems),
            matches: page.results.data.map(match => ({
                ...match,
                result: match.num_goals_scored > match.num_goals_against
                    ? 'victory'
                    : 'defeat'
            }))
        }));
    }

    setPage(page) {
        if (page > 0 && page <= this.state.maxPages) {
            this.currentPage = page;
            this.getMatches(page);
        }
    }

    formatDate(date) {
        const language = localStorage.getItem('lang');

        if (!date) return date.toISOString();
        let formattedDate = new Intl.DateTimeFormat(LOCALE_LANG[language] , {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }).format(date);

        formattedDate = formattedDate.replace(',', '');
        formattedDate = formattedDate.replace(/\b(\d)\b/g, '0$1');
        return formattedDate;
    }

    mapMatchResults() {
        return this.state.matches.map(match => `
            <details class="text-white">
                <summary class="d-flex justify-content-between align-items-center py-3 px-5">
                    <p class="${match.result} d-flex align-items-center gap-3 text-uppercase" style="font-size: 1.2rem">
                        {{ translator.translate('PROFILE.MATCH_HISTORY.RESULT_STATUS.${match.result.toUpperCase()}') }}
                        <span class="text-white fw-semibold text-normal" style="font-size: 1rem;">${match.user_b}</span>
                    </p>
                    <p class="fst-italic date">${this.formatDate(new Date(match.start_date))}</p>
                </summary>
                <div class="p-3 container">
                    <div class="px-5 row row-cols-2 g-3 justify-content-center fs-5">
                        <div class="col">
                            <p>${ this.translator.translate('PROFILE.MATCH_HISTORY.DETAILS.GOALS_SCORED') } ${match.num_goals_scored}</p>
                        </div>
                        <div class="col">
                            <p>${ this.translator.translate('PROFILE.MATCH_HISTORY.DETAILS.GOALS_AGAINST') } ${match.num_goals_against}</p>
                        </div>
                        <div class="col">
                            <p>${ this.translator.translate('PROFILE.MATCH_HISTORY.DETAILS.GOALS_STOPPED') } ${match.num_goals_stopped_a}</p>
                        </div>
                        <div class="col">
                            <p>${ this.translator.translate('PROFILE.MATCH_HISTORY.DETAILS.GOALS_STOPPED_RIVAL') } ${match.user_b}: ${match.num_goals_stopped_b}</p>
                        </div>
                        <div class="col">
                            <p>${ this.translator.translate('PROFILE.MATCH_HISTORY.DETAILS.GAME_TIME') } ${match.time_played}</p>
                        </div>
                        <div class="col">
                            <p>${ this.translator.translate('PROFILE.MATCH_HISTORY.DETAILS.POINTS_EARNED') } ${match.result === 'victory' ? '+10' : '-5'}</p>
                        </div>
                    </div>
                </div>           
            </details>
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
            <div class="d-flex flex-column align-items-center gap-4">
                ${ this.state.matches.length > 0 ? this.mapMatchResults() : `
                        <div class="col-md-12 text-center">
                            <h5 class="text-white">
                                {{ translator.translate("PROFILE.MATCH_HISTORY.EMPTY") }}
                            </h5>
                        </div>
                    `}
            </div>
            ${ this.state.matches.length > 0 ? `<div class="d-flex align-items-center justify-content-evenly text-white mt-5 pagination">
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
            </div>` : ''}
        `;
    }
});