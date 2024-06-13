import WebComponent, { Component } from "#WebComponent";

export default Component({
    tagName: "banner-profile",
    styleCSS: `
        .banner {
            width: 100%;
            height: 220px; 
            background-color: #ffcc00;
            background-size: cover;
            background-position: center;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .img-banner {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `
},
class BannerProfile extends WebComponent
{
render() {
    return `
        <div class="banner mt-0">
            <img src="https://via.placeholder.com/800x200" class="img-banner" alt="Banner">
        </div>
    `
}
})