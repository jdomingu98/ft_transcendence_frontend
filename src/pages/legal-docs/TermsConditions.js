import WebComponent, { Component } from '#WebComponent';

import css from './LegalDocs.css?inline';

export default Component ({
    tagName: 'terms-conditions',
    styleCSS: css
},

class TermsConditions extends WebComponent {

    bind() {
        const currentPath = window.location.pathname;
        if (currentPath === '/app/terms-conditions') {
            this.shadowRoot.querySelector('#navbar-terms-conditions').style.display = 'none';
        }

    }

    render() {

        return `
                <section class="container-fuild base">
                    <div id="navbar-terms-conditions" class="w-100">
                        <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                        <landing-navbar></landing-navbar>
                    </div>
                    <div class="card base-card">
                        <div class="card-body text-white body p-5">
                            <h1-text>Términos y Condiciones de Uso</h1-text>
                            <p><strong>Última actualización:</strong> 02/09/2024</p>

                            <p><strong>Transcendence</strong> ("nosotros", "nuestro") está comprometido con la protección de su privacidad y con la transparencia en el tratamiento de sus datos personales. Para cumplir con el Reglamento General de Protección de Datos (GDPR), le pedimos su consentimiento explícito para recopilar y tratar los siguientes datos personales cuando crea una cuenta en nuestro sitio web.</p>

                            <h2>1. Datos Personales Recogidos</h2>
                            <p>Al crear una cuenta en nuestro sitio web, recopilaremos y trataremos los siguientes datos personales:</p>
                            <ul>
                                <li><strong>Imágenes:</strong> Se recogen únicamente dos imágenes, una como imagen representativa del usuario y la otra como imagen de fondo para su perfil.</li>
                                <li><strong>Correo electrónico:</strong> Para identificar y comunicarnos con usted.</li>
                                <li><strong>Contraseña:</strong> Para asegurar el acceso a su cuenta.</li>
                                <li><strong>Nombre de usuario:</strong> Para identificar su cuenta en nuestro sitio.</li>
                                <li><strong>Código de vinculación (opcional):</strong> Puede optar por vincular su cuenta con un servicio de terceros (42 en nuestro caso) utilizando un código de vinculación.</li>
                            </ul>

                            <h2>2. Finalidad del Tratamiento de los Datos</h2>
                            <p>Sus datos personales serán tratados con las siguientes finalidades:</p>
                            <ul>
                                <li><strong>Imágenes:</strong>Para la personalización del perfil de usuario.</li>
                                <li><strong>Correo electrónico:</strong> Para gestionar su cuenta y enviar notificaciones relacionadas con el servicio.</li>
                                <li><strong>Contraseña:</strong> Para asegurar el acceso a su cuenta de forma confidencial.</li>
                                <li><strong>Nombre de usuario:</strong> Para identificar su cuenta en nuestro sistema y permitirle interactuar con otras funciones del sitio.</li>
                                <li><strong>Código de vinculación (opcional):</strong> Para permitir la vinculación con servicios de terceros, facilitando el acceso y mejorando su experiencia en nuestro sitio web.</li>
                            </ul>

                            <h2>3. Base Legal para el Tratamiento</h2>
                            <p>El tratamiento de sus datos personales se realiza sobre la base de su consentimiento explícito (Art. 6.1.a GDPR) al marcar la casilla correspondiente y enviar este formulario.</p>

                            <h2>4. Duración del Tratamiento de los Datos</h2>
                            <p>Sus datos personales serán conservados mientras su cuenta permanezca activa. Si decide cerrar su cuenta, eliminaremos sus datos personales, salvo que estemos obligados a conservarlos para cumplir con obligaciones legales.</p>

                            <h2>5. Derechos del Titular de los Datos</h2>
                            <p>Usted tiene derecho a:</p>
                            <ul>
                                <li>Acceder a sus datos personales y obtener una copia de ellos.</li>
                                <li>Rectificar cualquier dato inexacto o incompleto.</li>
                                <li>Suprimir sus datos personales cuando ya no sean necesarios para los fines para los que fueron recopilados.</li>
                                <li>Limitar el tratamiento de sus datos en determinadas circunstancias.</li>
                                <li>Portabilidad de sus datos personales a otro responsable del tratamiento.</li>
                                <li>Oponerse al tratamiento de sus datos personales en determinadas situaciones.</li>
                            </ul>
                            <p>Para ejercer sus derechos, puede contactarnos en cualquier momento en <strong>pongtrancendence@gmail.com</strong>.</p>

                            <h2>6. Transferencias Internacionales de Datos</h2>
                            <p>Sus datos personales no serán transferidos fuera del Espacio Económico Europeo (EEE), salvo que se adopten las medidas de protección adecuadas conforme a la GDPR.</p>

                            <h2>7. Consentimiento</h2>
                            <p>Al marcar la casilla y registrarse, usted consiente de manera libre, específica, informada e inequívoca al tratamiento de sus datos personales tal como se describe en esta política.</p>
                        </div>
                    </div>
                </section>
        `;
    }
});