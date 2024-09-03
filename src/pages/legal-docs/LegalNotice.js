import WebComponent, { Component } from '#WebComponent';

import css from './LegalDocs.css?inline';

export default Component ({
    tagName: 'legal-notice',
    styleCSS: css
},

class LegalNotice extends WebComponent {

    bind() {
        const currentPath = window.location.pathname;
        if (currentPath === '/app/legal-notice') {
            this.shadowRoot.querySelector('#navbar-legal-notice').style.display = 'none';
        }

    }

    render() {

        return `
                <section class="container-fuild base">
                    <div id="navbar-legal-notice" class="w-100">
                        <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                        <landing-navbar></landing-navbar>
                    </div>
                    <div class="card base-card">
                        <div class="card-body text-white body p-5">
                            <h1-text>Aviso Legal</h1-text>
                            <p><strong>Última actualización:</strong> 02/09/2024</p>

                            <p>Este aviso legal regula el uso del sitio web <strong>Transcendence</strong> (en adelante, "el Sitio Web"), que pone a disposición de los usuarios de Internet la entidad <strong>Transcendence</strong> (en adelante, "la Empresa").</p>

                            <h2>1. Datos del Titular del Sitio Web</h2>
                            <ul>
                                <li><strong>Nombre de la Empresa:</strong> Transcendence</li>
                                <li><strong>NIF/CIF:</strong> 12345678A</li>
                                <li><strong>Dirección:</strong> Av de Sor Teresa Prat, 15, Carretera de Cádiz, 29003 Málaga</li>
                                <li><strong>Correo Electrónico:</strong> pongtrancendence@gmail.com</li>
                                <li><strong>Teléfono de Contacto:</strong> +34123456789</li>
                            </ul>

                            <h2>2. Condiciones de Uso</h2>
                            <p>El acceso y uso del Sitio Web atribuye la condición de "Usuario" e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal, en la versión publicada por la Empresa en el momento mismo en que el Usuario acceda al Sitio Web. Por lo tanto, se recomienda al Usuario leer atentamente este Aviso Legal cada vez que acceda al Sitio Web.</p>

                            <h2>3. Propiedad Intelectual e Industrial</h2>
                            <p>Todos los contenidos del Sitio Web, entendiendo por estos a título enunciativo los textos, fotografías, gráficos, imágenes, iconos, tecnología, software, y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de la Empresa o de terceros, sin que puedan entenderse cedidos al Usuario ninguno de los derechos de explotación sobre ellos más allá de lo estrictamente necesario para el correcto uso del Sitio Web.</p>
                            <p>Las marcas, nombres comerciales o signos distintivos son titularidad de la Empresa o de terceros, sin que pueda entenderse que el acceso al Sitio Web atribuye ningún derecho sobre los mismos.</p>

                            <h2>4. Exclusión de Responsabilidad</h2>
                            <p>El contenido de este Sitio Web es de carácter general y tiene una finalidad meramente informativa. La Empresa no garantiza plenamente el acceso a todos los contenidos, ni su exhaustividad, corrección, vigencia o actualidad, ni su idoneidad o utilidad para un objetivo específico.</p>
                            <p>La Empresa no se responsabiliza de los daños y perjuicios de cualquier naturaleza derivados de:</p>
                            <ul>
                                <li>La imposibilidad de acceso al Sitio Web o la falta de veracidad, exactitud, exhaustividad y/o actualidad de los contenidos, así como de la existencia de vicios y defectos de toda clase en los contenidos transmitidos, difundidos, almacenados, puestos a disposición a los que se haya accedido a través del Sitio Web o de los servicios que se ofrecen.</li>
                                <li>La presencia de virus u otros elementos en los contenidos que puedan producir alteraciones en los sistemas informáticos, documentos electrónicos o datos de los Usuarios.</li>
                                <li>El incumplimiento de las leyes, la buena fe, el orden público, los usos del tráfico y el presente Aviso Legal como consecuencia del uso incorrecto del Sitio Web. En particular, y a modo ejemplificativo, la Empresa no se hace responsable de las actuaciones de terceros que vulneren derechos de propiedad intelectual e industrial, secretos empresariales, derechos al honor, a la intimidad personal y familiar y a la propia imagen, así como la normativa en materia de competencia desleal y publicidad ilícita.</li>
                            </ul>

                            <h2>5. Enlaces Externos</h2>
                            <p>Este Sitio Web puede incluir enlaces a sitios web de terceros. La Empresa no asume ninguna responsabilidad por el contenido, políticas de privacidad o prácticas de esos sitios externos. El Usuario accede bajo su exclusiva responsabilidad al contenido de dichos sitios web y debe revisar sus políticas de privacidad y condiciones de uso.</p>

                            <h2>6. Protección de Datos Personales</h2>
                            <p>De conformidad con lo dispuesto en el Reglamento General de Protección de Datos (GDPR), informamos a los Usuarios que este Sitio Web no recopila datos personales ni utiliza cookies.</p>
                            <p>Si el Usuario decide contactar con la Empresa a través de los medios facilitados en este Sitio Web, como el correo electrónico o formularios de contacto, sus datos serán tratados conforme a nuestra Política de Privacidad, disponible en el Sitio Web.</p>

                            <h2>7. Legislación Aplicable y Jurisdicción</h2>
                            <p>Las relaciones establecidas entre la Empresa y el Usuario se regirán por lo dispuesto en la normativa española vigente, siendo competentes para resolver cualquier controversia que se derive del acceso o uso de este Sitio Web los juzgados y tribunales de Málaga.</p>

                        </div>
                    </div>
                </section>
        `;
    }
});