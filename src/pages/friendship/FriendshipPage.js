import { DECISION_THRESHOLD, DEFAULT_PROFILE_IMG } from '#const';
import WebComponent, { Component } from '#WebComponent';
import FriendService from '#services/FriendService';

import css from './FriendshipPage.css?inline';

export default Component ({
    tagName: 'friendship-page',
    styleCSS: css
},
class FriendshipPage extends WebComponent {

    init() {

        FriendService.getFriendRequests().then(friendsData => this.setState({...this.state, friendsData }));

        this.state = {
            /** id?, username, profile_img */
            friendsData: [],
            dragEvent: {
                startX: 0,
                actualCard: null,
                isAnimating: false,
                pullDeltaX: 0,
            },
        };
    }

    mapFriendsToArticles() {
        return this.state.friendsData.map( friend => `
            <article>
                <img src="${friend.profilePicture ?? DEFAULT_PROFILE_IMG}" alt="${friend.username} profile picture" />
                <h2>${friend.username}</h2>
                <div class="choice reject text-uppercase">{{ translator.translate("FRIENDSHIP.REJECT") }}</div>
                <div class="choice accept text-uppercase">{{ translator.translate("FRIENDSHIP.ACCEPT") }}</div>
            </article>
        `).join('');
    }

    startDrag(event) {
        if (this.state.dragEvent.isAnimating) return;

        // get the first article element
        const actualCard = event.target.closest('article');
        if (!actualCard) return;

        this.setState({ ...this.state, dragEvent: {
            ...this.state.dragEvent,
            actualCard,
            startX: event.pageX
        }});

        // listen the mouse movements
        document.addEventListener('mousemove', this.onMove.bind(this));
        document.addEventListener('mouseup', this.onEnd.bind(this));
    }

    onMove(event) {
        // current position of mouse
        const { startX, actualCard } = this.state.dragEvent;

        if (!actualCard) return;

        const currentX = event.pageX;
        const pullDeltaX = currentX - startX;

        // the distance between the initial and current position
        this.setState({ ...this.state, dragEvent: {
            ...this.state.dragEvent,
            pullDeltaX,
            isAnimating: true
        }});

        // there is no distance traveled in X axis
        if (pullDeltaX === 0) return;

        // From here we are animating

        // apply the transformation to the card
        actualCard.style.transform = `translateX(${this.state.dragEvent.pullDeltaX}px)`;

        // change the cursor to grabbing
        actualCard.style.cursor = 'grabbing';

        // change opacity of the choice info
        const opacity = Math.abs(pullDeltaX) / 100;
        const isRight = pullDeltaX > 0;

        const choiceElement = isRight
            ? actualCard.querySelector('.choice.accept')
            : actualCard.querySelector('.choice.reject');

        const hideElement = isRight
            ? actualCard.querySelector('.choice.reject')
            : actualCard.querySelector('.choice.accept');

        choiceElement.style.opacity = opacity;
        hideElement.style.opacity = 0;
    }

    onEnd() {

        const { actualCard, pullDeltaX } = this.state.dragEvent;

        if (!actualCard) return;

        // remove the event listeners
        document.removeEventListener('mousemove', this.onMove.bind(this));
        document.removeEventListener('mouseup', this.onEnd.bind(this));

        // saber si el usuario tomo una decisión
        const isDecisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD;
        if (isDecisionMade) {
            const isRightChoice = pullDeltaX >= 0;

            // add class according to the decision
            actualCard.classList.add(isRightChoice ? 'go-right' : 'go-left');
            actualCard.addEventListener('transitionend', () => {
                const username = actualCard.querySelector('h2').textContent;
                const currentIndex = this.state.friendsData.findIndex(friend => friend.username === username);
                if (currentIndex !== -1) {
                    this.setState({
                        ...this.state,
                        friendsData: [
                            ...this.state.friendsData.slice(0, currentIndex),
                            ...this.state.friendsData.slice(currentIndex + 1)
                        ]
                    });
                }
                actualCard.remove();
            });
        } else {
            actualCard.classList.add('reset');
            actualCard.classList.remove('go-right', 'go-left');
            actualCard.querySelectorAll('.choice').forEach(choice => choice.style.opacity = 0);
        }

        // reset the variables
        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style');
            actualCard.classList.remove('reset');
            this.setState({ ...this.state, dragEvent: {
                pullDeltaX: 0,
                startX: 0,
                actualCard: null,
                isAnimating: false
            }});
        });

        // reset the choice info opacity
        actualCard
            .querySelectorAll('.choice')
            .forEach(element => element.style.opacity = 0);
    }

    afterViewInit() {
        this.subscribeAll('article', 'mousedown', e => this.startDrag(e));
    }

    render() {
        return `
            <h2 class="text-white my-3"> {{ translator.translate('FRIENDSHIP.TITLE') }} </h2>
            <div class="friendship-container">
                <div class="shadow">
                    <aside>
                        <section class="h-100">
                            <div class="card-background"></div>
                            <div class="cards">
                                ${ this.mapFriendsToArticles() }
                                <span> {{ translator.translate('FRIENDSHIP.NO_MORE_REQUESTS') }} </span>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        `;
    }
});