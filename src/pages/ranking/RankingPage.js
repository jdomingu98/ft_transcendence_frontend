import WebComponent, { Component } from '#WebComponent';

import css from './RankingPage.css?inline';

export default Component ({
    tagName: 'ranking-page',
    styleCSS: css
},

class RankingPage extends WebComponent {

    init() {
        this.state = {
            topTen: [{
                username: 'ARUZAFA-',
                profileImg: '/src/resources/devs/aruzafa-.jpg',
                points: 10042,
                position: 1,
                rank: 'first'
            },
            {
                username: 'ATRUJILL',
                profileImg: '/src/resources/devs/atrujill.jpg',
                points: 7890,
                position: 2,
                rank: 'second'
            },
            {
                username: 'CMORALES',
                profileImg: '/src/resources/devs/cmorales.jpg',
                points: 4042,
                position: 3,
                rank: 'third'
            },
            {
                username: 'JDOMINGU',
                profileImg: '/src/resources/devs/jdomingu.png',
                points: 2024,
                position: 4,
                rank: 'rest'
            },
            {
                username: 'ANONYMOUS',
                profileImg: '/src/resources/devs/jdomingu.png',
                points: 1514,
                position: 5,
                rank: 'rest'
            },
            {
                username: 'ANONYMOUS',
                profileImg: '/src/resources/devs/jdomingu.png',
                points: 1514,
                position: 6,
                rank: 'rest'
            },
            {
                username: 'ANONYMOUS',
                profileImg: '/src/resources/devs/jdomingu.png',
                points: 1514,
                position: 7,
                rank: 'rest'
            },
            {
                username: 'ANONYMOUS',
                profileImg: '/src/resources/devs/jdomingu.png',
                points: 1514,
                position: 8,
                rank: 'rest'
            },
            {
                username: 'ANONYMOUS',
                profileImg: '/src/resources/devs/jdomingu.png',
                points: 1514,
                position: 9,
                rank: 'rest'
            },
            {
                username: 'ANONYMOUS',
                profileImg: '/src/resources/devs/jdomingu.png',
                points: 1514,
                position: 10,
                rank: 'rest'
            }],
            currentPos: {
                position: 42,
                points: 100
            }
        };
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
        return this.state.topTen.map( index => `
            <div class="position" data-rank="${index.rank}">
                        <div class="d-flex justify-content-between align-items-center w-100 h-100 hidden">
                            <img src="${index.profileImg}" alt="${index.username}" class="profile-picture">
                            <div class="d-flex justify-content-evenly align-items-center flex-grow-1">
                                <p class="fw-bold">${index.username}</p>
                                <span>
                                    <p class="fw-bold points" style="display: inline-block">${index.points}</p>
                                    <p style="display: inline-block">{{ translator.translate('LEADERBOARD.PTS') }}</p>
                                </span>
                            </div>
                            <div class="d-flex justify-content-end align-items-center">
                                <p class="rank-position px-3">#${index.position}</p>
                            </div>
                        </div>
                    </div>
            `
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
                            <h2-text>
                                <span style="color: var(--app-primary-color)">
                                    #${this.state.currentPos.position}
                                </span> - 
                                <span style="color: var(--app-secondary-color)">
                                ${this.state.currentPos.points}
                                </span>
                                <span style="color: var(--app-secondary-color)">
                                    {{ translator.translate('LEADERBOARD.PTS') }}
                                </span>
                            </h2-text>
                        </div>
                    </div>
                    ${ this.createLeaderboard() }
                </div>
            </div>
        `;
    }
});