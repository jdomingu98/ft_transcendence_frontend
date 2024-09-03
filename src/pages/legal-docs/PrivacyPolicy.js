import WebComponent, { Component } from '#WebComponent';

import css from './LegalDocs.css?inline';

export default Component ({
    tagName: 'privacy-policy',
    styleCSS: css
},

class PrivacyPolicy extends WebComponent {

    bind() {
        const currentPath = window.location.pathname;
        if (currentPath === '/app/privacy-policy') {
            this.shadowRoot.querySelector('#navbar-privacy').style.display = 'none';
        }

    }

    render() {

        return `
                <section class="container-fuild base">
                    <div id="navbar-privacy" class="w-100">
                        <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                        <landing-navbar></landing-navbar>
                    </div>
                    <div class="card base-card">
                        <div class="card-body text-white body p-5">
                            <h1-text>Política de Privacidad</h1-text>
                            <p><strong>Última actualización:</strong> 02/09/2024</p>

                            <p>En <strong>Transcendence</strong> ("nosotros", "nuestro", "la Empresa"), respetamos y protegemos la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo manejamos la información personal en nuestro sitio web <strong>Transcendence</strong>.</p>

                            <h2>1. Responsable del Tratamiento de Datos</h2>
                            <p>El responsable del tratamiento de datos personales en este sitio web es:</p>
                            <ul>
                                <li><strong>Nombre de la Empresa:</strong> Transcendence</li>
                                <li><strong>Dirección:</strong> Av de Sor Teresa Prat, 15, Carretera de Cádiz, 29003 Málaga</li>
                                <li><strong>Correo Electrónico:</strong> pongtrancendence@gmail.com</li>
                            </ul>

                            <h2>2. Recopilación de Datos Personales</h2>
                            <p>No recopilamos ningún dato personal de los usuarios que visitan nuestro sitio web. No almacenamos ni procesamos información personal identificable, tales como nombres, direcciones de correo electrónico, números de teléfono, direcciones IP u otra información que pueda identificar a los usuarios.</p>

                            <h2>3. Uso de Cookies</h2>
                            <p>Nuestro sitio web no utiliza cookies ni otras tecnologías de seguimiento para recopilar información sobre los visitantes. Esto incluye tanto cookies propias como de terceros.</p>

                            <h2>4. Enlaces a Sitios Web de Terceros</h2>
                            <p>Nuestro sitio web puede contener enlaces a otros sitios web que no son operados por nosotros. Si haces clic en un enlace de terceros, serás dirigido al sitio de ese tercero. Te recomendamos revisar la política de privacidad de cada sitio que visites. No tenemos control sobre el contenido, las políticas de privacidad o las prácticas de sitios web de terceros y no asumimos responsabilidad alguna por ellos.</p>

                            <h2>5. Seguridad de los Datos</h2>
                            <p>Aunque no recopilamos datos personales, hemos implementado medidas de seguridad adecuadas para proteger la información que puedas proporcionarnos por otros medios (como a través de correos electrónicos o formularios de contacto).</p>

                            <h2>6. Tus Derechos</h2>
                            <p>Como usuario, tienes derecho a:</p>
                            <ul>
                                <li><strong>Acceso:</strong> Solicitar información sobre cualquier dato personal que pueda haber sido recopilado.</li>
                                <li><strong>Rectificación:</strong> Pedir la corrección de cualquier dato personal incorrecto.</li>
                                <li><strong>Supresión:</strong> Solicitar la eliminación de cualquier dato personal que pueda haberse recopilado.</li>
                                <li><strong>Limitación:</strong> Restringir el tratamiento de tus datos personales en ciertos casos.</li>
                                <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos personales.</li>
                            </ul>
                            <p>Si deseas ejercer alguno de estos derechos, por favor, contacta con nosotros a través de los datos proporcionados en la sección 1.</p>

                            <h2>7. Cambios en la Política de Privacidad</h2>
                            <p>Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas o en la legislación aplicable. Cualquier cambio se publicará en esta página y se indicará la fecha de la última actualización.</p>


                            <h2>8. Contacto</h2>
                            <p>Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad o sobre nuestras prácticas, no dudes en contactarnos:</p>
                            <ul>
                                <li><strong>Correo Electrónico:</strong> pongtrancendence@gmail.com</li>
                                <li><strong>Dirección Postal:</strong> Av de Sor Teresa Prat, 15, Carretera de Cádiz, 29003 Málaga</li>
                            </ul>             
                        </div>
                    </div>
                </section>
        `;
    }
});