import WebComponent, { Component } from "#WebComponent";

export default Component({
    tagName: "circle-profile",
    styleCSS: `
        .perfil {
            position: absolute;
            top: 25vh; 
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20vw;
            aspect-ratio: 1 / 1; /* Mantiene una proporción de 1:1 para asegurar que sea un círculo */
            min-width: 150px;
            max-width: 250px;
            border-radius: 50%;
            overflow: hidden;
        }
        
        .img-perfil {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    `
},
class CircleProfile extends WebComponent
{
render() {
    return `
        <div class="perfil">
            <img src="https://via.placeholder.com/120" class="img-perfil" alt="Perfil">
        </div>
    `
}
})