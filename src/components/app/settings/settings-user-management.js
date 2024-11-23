
import WebComponent, { Component } from '#WebComponent';
import { SnackbarService }from '#services/SnackbarService';
import UserService from '#services/UserService';
import { VISIBILITY } from '#const';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-user-management',
    styleCSS: css
},
class SettingsUserManagement extends WebComponent {

    sectionId = this.getAttribute('sectionId');

    init() {
        this.state = {
            user: {},
            profileFile: null,
            bannerFile: null,
        };
        this.getMyInfo();
    }

    getMyInfo() {
        UserService.getMyInfo().then(user => this.setState({...this.state, user}));
    }

    isValidImageType(type) {
        return type === 'image/png' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/webp';
    }

    bind() {
        this.subscribe('#username-settings', 'input', e => {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    username: e.target.value.trim()
                }
            });
        });

        this.subscribe('#profile-img', 'change', e => {
            const selectedFile = this._getDOM().getElementById('profile-filename');
            if (this.isValidImageType(e.target.files[0].type)) {
                this.setState({...this.state, profileFile: e.target.files[0]});
                selectedFile.classList.remove('error-message');
                selectedFile.textContent = this.translator.translate('SETTINGS.USER_MANAGEMENT.SELECTED_FILE') + `${this.state.profileFile.name}`;
            }
            else {
                selectedFile.textContent = this.translator.translate('SETTINGS.USER_MANAGEMENT.INVALID_IMG_TYPE');
                selectedFile.classList.add('error-message');
            }
        });

        this.subscribe('#banner-img', 'change', e => {
            const selectedFile = this._getDOM().getElementById('banner-filename');
            if (this.isValidImageType(e.target.files[0].type)) {
                this.setState({...this.state, bannerFile: e.target.files[0]});
                selectedFile.classList.remove('error-message');
                selectedFile.textContent = this.translator.translate('SETTINGS.USER_MANAGEMENT.SELECTED_FILE') + `${this.state.bannerFile.name}`;
            } else {
                selectedFile.textContent = this.translator.translate('SETTINGS.USER_MANAGEMENT.INVALID_IMG_TYPE');
                selectedFile.classList.add('error-message');
            }
        });

        this.subscribe('#visibility-selector', 'change', e => this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                visibility: e.target.value
            }
        }));

        this.subscribe('primary-button', 'click', () => {

            const formData = new FormData();
            formData.append('username', this.state.user.username);
            formData.append('visibility', this.state.user.visibility);

            if (this.state.profileFile)
                formData.append('profile_img', this.state.profileFile);

            if (this.state.bannerFile)
                formData.append('banner', this.state.bannerFile);

            formData.append('language', localStorage.getItem('lang'));
            UserService.patch(this.state.user.id, formData)
                .then(() => {
                    this.getMyInfo();
                    this._getDOM().querySelector('#profile-filename').textContent = this.translator.translate('SETTINGS.USER_MANAGEMENT.NO_FILE_SELECTED');
                    this._getDOM().querySelector('#banner-filename').textContent = this.translator.translate('SETTINGS.USER_MANAGEMENT.NO_FILE_SELECTED');
                    setTimeout(() => {
                        SnackbarService.addToast({
                            title: this.translator.translate('SNACKBAR.SETTINGS.USER_MANAGEMENT_DONE.TITLE'),
                            body: this.translator.translate('SNACKBAR.SETTINGS.USER_MANAGEMENT_DONE.DESC')
                        });
                    }, 3000);
                }).catch( e => {
                    setTimeout(() => {
                        SnackbarService.addToast({
                            title: this.translator.translate('SNACKBAR.SETTINGS.USER_MANAGEMENT_ERROR.TITLE'),
                            body: this.translator.translate('SNACKBAR.SETTINGS.USER_MANAGEMENT_ERROR.DESC'),
                        });
                    }, 3000);
                    if (e?.username) {
                        const input = this._getDOM().getElementById('username-settings');
                        const errorMessage = this._getDOM().querySelector('#username-settings + .error-message');

                        input.classList.add('input-error');
                        errorMessage.textContent = this.translator.translate(e.username[0]);
                        errorMessage.classList.remove('hidden');
                    }
                });
        });
    }

    afterViewInit() {
        const visibilitySelector = this._getDOM().getElementById('visibility-selector');
        if (visibilitySelector)
            visibilitySelector.value = this.state.user.visibility;
    }

    getOptionText(file) {
        return file?.name
            ? this.translator.translate('SETTINGS.USER_MANAGEMENT.SELECTED_FILE') + file.name
            : this.translator.translate('SETTINGS.USER_MANAGEMENT.NO_FILE_SELECTED');
    }

    render() {
        const profilePicture = (this.state.profileFile && URL.createObjectURL(this.state.profileFile) || this.state.user.profile_img);
        const banner = (this.state.bannerFile && URL.createObjectURL(this.state.bannerFile) || this.state.user.banner);

        return `
            <div class="my-3 row">
                <div id='${this.sectionId}' class="d-flex flex-column my-5 gap-4" style="width: 85%">
                    <h2-text color="var(--app-secondary-color)">
                        {{ translator.translate('SETTINGS.SECTIONS.USER_MANAGEMENT') }}
                    </h2-text>
                    <profile-header
                        [username]="state.user.username"
                        profilePicture="${ profilePicture }"
                        banner="${ banner }"
                        [connected]="state.user.is_connected">
                    </profile-header>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">
                            {{ translator.translate('LANDING.FORMS.USERNAME') }}
                        </sub-header-text>
                    </div>
                    <input type="text" id="username-settings" class="p-3" minlength="3" maxlength="20" [placeholder]="translator.translate('SETTINGS.USER_MANAGEMENT.USERNAME_PHOLDER')" aria-label="Username input field">
                    <p class="error-message hidden"></p>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">
                            {{ translator.translate('SETTINGS.USER_MANAGEMENT.PROFILE_PICTURE') }}
                        </sub-header-text>
                        <p id="profile-filename" class="mt-2 text-white file-selected">${this.getOptionText(this.state.profileFile) }</p>
                    </div>
                    <input type="file" id="profile-img" class="p-3" aria-label="Profile picture input field" [data-content]="translator.translate('SETTINGS.USER_MANAGEMENT.PROFILE_PICTURE_PHOLDER')">
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">
                            {{ translator.translate('SETTINGS.USER_MANAGEMENT.BACKGROUND_IMG') }}
                        </sub-header-text>
                        <p id="banner-filename" class="mt-2 text-white file-selected">${ this.getOptionText(this.state.bannerFile) }</p>
                    </div>
                    <input id="banner-img" type="file" class="p-3" aria-label="Banner input field" [data-content]="translator.translate('SETTINGS.USER_MANAGEMENT.BACKGROUND_IMG_PHOLDER')">
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">
                            {{ translator.translate('SETTINGS.USER_MANAGEMENT.PROFILE_VISIBILITY') }}
                        </sub-header-text>
                    </div>
                    <select id="visibility-selector" class="form-select text-uppercase text-white d-flex justify-content-start" aria-label="Profile visibility selector">
                        <option value="${VISIBILITY.PUBLIC}">
                            {{ translator.translate('SETTINGS.USER_MANAGEMENT.PUBLIC') }}
                        </option>
                        <option value="${VISIBILITY.PRIVATE}">
                            {{ translator.translate('SETTINGS.USER_MANAGEMENT.PRIVATE') }}
                        </option>
                        <option value="${VISIBILITY.ANONYMOUS}">
                            {{ translator.translate('SETTINGS.USER_MANAGEMENT.ANONYMOUS') }}
                        </option>
                    </select>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">
                            {{ translator.translate('SETTINGS.USER_MANAGEMENT.LANGUAGE') }}
                        </sub-header-text>
                    </div>
                    <div class="d-flex justify-content-start" width="85%">
                        <language-selector w="850px" h="62px" ></language-selector>
                    </div>
                </div>
                <primary-button w="85%" h="62px">
                    {{ translator.translate('SETTINGS.USER_MANAGEMENT.SAVE') }}
                </primary-button>
            </div>
        `;
    }
});