import '/src/components/app/profile';
import WebComponent, { Component } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';
import UserService from '#services/UserService';

document.querySelector('meta[name="description"]').content = 'View your profile information, stats, and friends.';

export default Component ({
    tagName: 'profile-page',
    styleCSS: `
        .card-container {
            font-family: 'Outfit', sans-serif;
        }

        .profile-container {
            background-color: var(--app-secondary-bg-color);
            border-radius: 10px;
        }
    `
},

class ProfilePage extends WebComponent {

    init() {
        UserService.getMyInfo().then(({ id: meId }) => {
            let id = meId;
            if (!this.isMePage) {
                const urlId = window.location.pathname.split('/').pop();
                if (Number(urlId) === meId) {
                    NavigatorService.goToHome();
                    return;
                }
                id = urlId;
            }
            this.setUserData(id);
        });
    }

    setUserData(id) {
        UserService.getById(id)
            .then(user => this.setState({
                id: user.id,
                username: user.username,
                email: user.email,
                profileImg: user.profile_img,
                banner: user.banner,
                visibility: user.visibility,
                isConnected: user.is_connected,
                language: user.language,
                punctuation: user.punctuation,
                position: user.position,
                isFriend: user.is_friend,
                hasRequestedFriendship: user.has_requested_friendship,
                stats: {
                    goalsScored: user.num_goals_scored,
                    goalsAgainst: user.num_goals_against,
                    goalsStopped: user.num_goals_stopped,
                    soloWr: user.win_rate,
                    timePlayed: user.time_played,
                    maxWinStreak: user.max_streak
                },
            }))
            .catch(() => NavigatorService.goToHome());
    }

    get isMePage() {
        return window.location.pathname === '/app/me';
    }

    render() {
        return `
        <profile-search></profile-search>
            <div class="container d-flex flex-column justify-content-center align-items-center p-3 text-white card-container">
                <div class="w-100 mx-auto my-3 pb-4 profile-container">
                    <profile-header
                        [username]="state.username ?? ''"
                        [profilePicture]="state.profileImg"
                        [banner]="state.banner"
                        [connected]="state.isConnected"
                        [position]="state.position"
                        [points]="state.punctuation"
                        [isFriend]="state.isFriend"
                        [id]="state.id"
                        [hasRequestedFriendship]="state.hasRequestedFriendship"
                    ></profile-header>
                    <profile-stats [stats]="state.stats"></profile-stats>
                </div>
                <div class="w-100 mx-auto my-3 pb-4 profile-container">
                    <div class="mt-4">
                        ${ this.state.id ? '<profile-friendship [userId]="state.id"></profile-friendship>' : ''}
                    </div>
                </div>
                <div class="w-100 mx-auto my-3 pb-4 profile-container">
                    <div class="mt-4">
                        ${ this.state.id ? '<profile-history [userId]="state.id"></profile-history>' : ''}
                    </div>
                </div>
            </div>
        `;
    }
});