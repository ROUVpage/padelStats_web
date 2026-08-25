import React, { useEffect } from 'react';
import './Legal.css';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-container">
      <div className="legal-header">
        <div className="legal-header-container">
          <h1 className="legal-title">Política de Privacidad</h1>
          <p className="legal-subtitle">Última actualización: agosto de 2025</p>
        </div>
      </div>

      <div className="legal-main">
        <div className="legal-content">

          <section className="legal-section">
            <h2>1. Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de sus datos personales es <strong>PadelStats</strong>, con dirección
              de correo electrónico <a href="mailto:padelstats0@gmail.com">padelstats0@gmail.com</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Datos que Recopilamos</h2>
            <p>Recopilamos los siguientes tipos de datos personales:</p>
            <ul>
              <li><strong>Datos de identificación:</strong> nombre y apellidos.</li>
              <li><strong>Datos de contacto:</strong> dirección de correo electrónico y número de teléfono.</li>
              <li><strong>Datos de envío:</strong> dirección postal para la entrega del pedido.</li>
              <li><strong>Datos de uso:</strong> métricas de juego generadas por el sensor PadelStats (velocidad, potencia, técnica), asociadas a su cuenta de la aplicación móvil.</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador y páginas visitadas, recopilados mediante cookies técnicas.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Finalidad y Base Legal del Tratamiento</h2>
            <ul>
              <li><strong>Gestión de pedidos:</strong> procesar su compra y gestionar el envío. Base legal: ejecución de contrato.</li>
              <li><strong>Atención al cliente:</strong> responder a sus consultas y solicitudes. Base legal: interés legítimo.</li>
              <li><strong>Prestación del servicio de la app:</strong> almacenar y mostrar sus estadísticas de juego. Base legal: ejecución de contrato.</li>
              <li><strong>Comunicaciones comerciales:</strong> enviar información sobre productos y ofertas, únicamente si ha prestado su consentimiento. Base legal: consentimiento.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Conservación de los Datos</h2>
            <p>
              Sus datos se conservarán durante el tiempo necesario para la prestación del servicio y el cumplimiento
              de las obligaciones legales aplicables. Los datos de pedidos se conservan durante 5 años conforme a
              la legislación fiscal vigente. Puede solicitar la supresión de sus datos en cualquier momento.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Destinatarios de los Datos</h2>
            <p>
              Sus datos no se ceden a terceros salvo en los siguientes casos:
            </p>
            <ul>
              <li><strong>Empresas de logística:</strong> para gestionar la entrega de su pedido.</li>
              <li><strong>Pasarelas de pago:</strong> para procesar el cobro de forma segura.</li>
              <li><strong>Obligación legal:</strong> cuando sea requerido por autoridades competentes.</li>
            </ul>
            <p>No vendemos ni alquilamos sus datos personales a terceros.</p>
          </section>

          <section className="legal-section">
            <h2>6. Sus Derechos</h2>
            <p>
              De acuerdo con el Reglamento General de Protección de Datos (RGPD) y la legislación española aplicable,
              usted tiene derecho a:
            </p>
            <ul>
              <li><strong>Acceso:</strong> conocer qué datos personales tratamos sobre usted.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de sus datos.</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos.</li>
              <li><strong>Portabilidad:</strong> recibir sus datos en un formato estructurado y legible.</li>
              <li><strong>Limitación:</strong> solicitar la restricción del tratamiento en determinadas circunstancias.</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, contacte con nosotros en{' '}
              <a href="mailto:padelstats0@gmail.com">padelstats0@gmail.com</a>. También tiene derecho a presentar
              una reclamación ante la Agencia Española de Protección de Datos (AEPD) en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Cookies</h2>
            <p>
              Este sitio web utiliza únicamente cookies técnicas estrictamente necesarias para su funcionamiento.
              No utilizamos cookies de seguimiento ni publicidad de terceros. Puede configurar su navegador para
              bloquear o eliminar cookies, aunque esto puede afectar al funcionamiento del sitio.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas adecuadas para proteger sus datos personales frente a
              accesos no autorizados, pérdida o destrucción. Las transmisiones de datos se realizan mediante
              conexiones cifradas (HTTPS).
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Cambios en esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos cualquier cambio
              significativo publicando la nueva versión en esta página con la fecha de actualización. Le recomendamos
              revisarla regularmente.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Contacto</h2>
            <p>
              Si tiene cualquier pregunta sobre esta Política de Privacidad o sobre el tratamiento de sus datos,
              puede contactarnos en <a href="mailto:padelstats0@gmail.com">padelstats0@gmail.com</a> o a través
              del formulario de contacto en la sección de Ayuda.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;
