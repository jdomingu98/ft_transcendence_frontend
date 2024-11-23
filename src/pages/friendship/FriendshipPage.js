import { DECISION_THRESHOLD, DEFAULT_PROFILE_IMG_SWIPE } from '#const';
import WebComponent, { Component } from '#WebComponent';
import FriendService from '#services/FriendService';
import css from './FriendshipPage.css?inline';

document.querySelector('meta[name="description"]').content = 'Accept or reject friend requests by swapping them left or right.';

export default Component ({
    tagName: 'friendship-page',
    styleCSS: css
},
class FriendshipPage extends WebComponent {

    constructor() {
        super();
        this.onMoveBound = this.onMove.bind(this);
        this.onEndBound = this.onEnd.bind(this);
    }

    init() {
        this.state = {
            friendsData: [],
            dragEvent: {
                startX: 0,
                actualCard: null,
                isAnimating: false,
                pullDeltaX: 0,
            },
        };
        FriendService.getFriendRequests().then(friendsData => this.setState({...this.state, friendsData }));
    }

    mapFriendsToArticles() {
        return this.state.friendsData?.map( friend => `
            <article>
                <img src="${friend.profile_img ?? DEFAULT_PROFILE_IMG_SWIPE}" alt="${friend.username} profile picture" style="aspect-ratio: 16/9"/>
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

        document.addEventListener('mousemove', this.onMoveBound);
        document.addEventListener('mouseup', this.onEndBound);
    }

    onMove = (event) => {

        // current position of mouse
        const { startX, actualCard } = this.state.dragEvent;

        if (!actualCard) return;

        const currentX = event.pageX;
        const pullDeltaX = currentX - startX;

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
    };

    onEnd = () => {
        const { actualCard, pullDeltaX } = this.state.dragEvent;

        if (!actualCard) return;

        const isDecisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD;
        if (isDecisionMade) {
            const isRightChoice = pullDeltaX >= 0;

            actualCard.classList.add(isRightChoice ? 'go-right' : 'go-left');
            actualCard.addEventListener('transitionend', e => {
                if (e.target !== actualCard || e.propertyName !== 'transform') return;

                const username = actualCard.querySelector('h2').textContent;
                const friend = this.state.friendsData.find(friend => friend.username === username);

                if (!friend) return;
                const index = this.state.friendsData.indexOf(friend);
                const friendshipResolution = isRightChoice
                    ? FriendService.acceptFriendship
                    : FriendService.deleteFriendship;

                friendshipResolution(friend.id)
                    .then(() => {
                        actualCard.removeAttribute('style');
                        actualCard.classList.remove('reset');
                        actualCard.querySelectorAll('.choice').forEach(element => element.style.opacity = 0);
                        this.setState({
                            ...this.state,
                            friendsData: [
                                ...this.state.friendsData.slice(0, index),
                                ...this.state.friendsData.slice(index + 1)
                            ],
                            dragEvent: {
                                pullDeltaX: 0,
                                startX: 0,
                                actualCard: null,
                                isAnimating: false
                            }
                        });
                        actualCard.remove();
                    });
            });
        } else {
            actualCard.classList.add('reset');
            actualCard.classList.remove('go-right', 'go-left');
            actualCard.querySelectorAll('.choice').forEach(choice => choice.style.opacity = 0);

            actualCard.addEventListener('transitionend', e => {
                if (e.target !== actualCard || e.propertyName !== 'transform') return;
                actualCard.removeAttribute('style');
                actualCard.classList.remove('reset');
                this.setState({
                    ...this.state,
                    dragEvent: {
                        pullDeltaX: 0,
                        startX: 0,
                        actualCard: null,
                        isAnimating: false
                    }
                });
            });
        }

        document.removeEventListener('mousemove', this.onMoveBound);
        document.removeEventListener('mouseup', this.onEndBound);
    };

    afterViewInit() {
        this.subscribeAll('div.cards', 'mousedown', e => {
            if (e.target.closest('article'))
                this.startDrag(e);
        });
    }

    render() {
        return `
            <h2 class="text-white my-3"> {{ translator.translate('FRIENDSHIP.TITLE') }} </h2>
            <div class="friendship-container pt-3">
                <aside class="shadow">
                    <div class="card-background"></div>
                    <div class="cards">
                        ${ this.mapFriendsToArticles() }
                        <span> {{ translator.translate('FRIENDSHIP.NO_MORE_REQUESTS') }} </span>
                    </div>
                </aside>
            </div>
        `;
    }
});