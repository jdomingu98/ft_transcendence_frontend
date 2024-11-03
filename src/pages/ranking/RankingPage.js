import WebComponent, { Component } from '#WebComponent';
import { DEFAULT_PROFILE_IMG } from '#const';
import NavigatorService from '#services/NavigatorService';
import UserService from '#services/UserService';

import css from './RankingPage.css?inline';

export default Component ({
    tagName: 'ranking-page',
    styleCSS: css
},

class RankingPage extends WebComponent {
    init() {
        this.state = {
            topTen: [],
            userPosition: 0,
            userPoints: 0,
        };
        UserService.getLeaderBoard().then(leaderBoardInfo => this.setState({
            topTen: leaderBoardInfo.leaderboard,
            userPosition: leaderBoardInfo.position,
            userPoints: leaderBoardInfo.punctuation
        }));
    }

    getRank(id) {
        if (id === 0) return 'first';
        if (id === 1) return 'second';
        if (id === 2) return 'third';
        return 'rest';
    }

    bind() {
        this.subscribeAll('.position', 'click', e => {
            const username = e.currentTarget.querySelector('img').alt;
            const userData = this.state.topTen.filter(user => user.username === username);
            NavigatorService.goToProfile(userData[0].id);

        });
    }

    afterViewInit() {
        const divs = this._getDOM().querySelectorAll('.position div');
        this.subscribeAll('.position', 'animationend', e => {
            if (e.animationName === 'growBar') {
                divs.forEach(div => {
                    div.classList.remove('hidden');
                    div.classList.add('fade-in');
                });
            }
        });
    }

    createLeaderboard() {
        return this.state.topTen.map((user, index) => `
            <div class="position" data-rank="${this.getRank(index)}">
                <div class="d-flex justify-content-between align-items-center w-100 h-100 hidden">
                    <img src="${user.profile_img ?? DEFAULT_PROFILE_IMG}" alt="${user.username}" class="profile-picture">
                    <div class="d-flex justify-content-evenly align-items-center flex-grow-1">
                        <p class="fw-bold">${user.username}</p>
                        <span>
                            <p class="fw-bold points" style="display: inline-block">${user.punctuation}</p>
                            <p style="display: inline-block">{{ translator.translate('LEADERBOARD.PTS') }}</p>
                        </span>
                    </div>
                    <div class="d-flex justify-content-end align-items-center">
                        <p class="rank-position px-3">#${index + 1}</p>
                    </div>
                </div>
            </div>`
        ).join('');
    }

    render() {
        return `
            <div class="container mt-5 text-white">
                <h1-text>{{ translator.translate('LEADERBOARD.TITLE') }}</h1-text>
                <div class="p-5">
                    <div class="text-center pb-5">
                        <div class="card text-white rounded py-3" style="background-color: var(--app-secondary-bg-color);">
                            <h2-text>{{ translator.translate('LEADERBOARD.POSITION') }}</h2-text>
                            <div class="text-capitalize fw-bold" style="font-size: 3.45rem;">
                                <span style="color: var(--app-primary-color)">
                                    #${this.state.userPosition}
                                </span> - 
                                <span style="color: var(--app-secondary-color)">
                                    {{ state.userPoints }}
                                </span>
                                <span style="color: var(--app-secondary-color)">
                                    {{ translator.translate('LEADERBOARD.PTS') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    ${ this.createLeaderboard() }
                </div>
            </div>
        `;
    }
});