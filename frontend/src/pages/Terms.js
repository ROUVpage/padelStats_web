import React, { useEffect } from 'react';
import './Legal.css';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-container">
      <div className="legal-header">
        <div className="legal-header-container">
          <h1 className="legal-title">Términos de Uso</h1>
          <p className="legal-subtitle">Última actualización: agosto de 2025</p>
        </div>
      </div>

      <div className="legal-main">
        <div className="legal-content">

          <section className="legal-section">
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el sitio web de PadelStats y adquirir nuestros productos, usted acepta quedar vinculado
              por estos Términos de Uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar
              nuestros servicios.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Descripción del Producto</h2>
            <p>
              PadelStats es un dispositivo sensor que se fija a la pala de pádel para medir parámetros de juego como
              potencia, velocidad de la bola, técnica y exigencia física. El dispositivo funciona en combinación con la
              aplicación móvil PadelStats, disponible en Google Play Store y Apple App Store.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Uso del Servicio</h2>
            <p>Usted se compromete a utilizar el servicio únicamente para fines legales y de acuerdo con estos términos. Queda prohibido:</p>
            <ul>
              <li>Reproducir, duplicar o revender cualquier parte del servicio sin autorización expresa.</li>
              <li>Utilizar el servicio de manera que pueda dañar, deshabilitar o perjudicar el funcionamiento del sistema.</li>
              <li>Intentar obtener acceso no autorizado a cualquier parte del servicio.</li>
              <li>Usar el servicio para transmitir contenido ilegal, ofensivo o perjudicial.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Compras y Pagos</h2>
            <p>
              Todos los precios se muestran en euros (€) e incluyen el IVA aplicable. PadelStats se reserva el derecho
              de modificar los precios en cualquier momento. El pago se procesa de forma segura a través de los
              proveedores de pago habilitados. Una vez confirmado el pago, recibirá un correo electrónico de confirmación
              con los detalles de su pedido.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Política de Envíos</h2>
            <p>
              Los pedidos se procesan en un plazo de 1-3 días hábiles. El tiempo de entrega estimado es de 3-7 días
              hábiles para España peninsular. PadelStats no se responsabiliza de los retrasos causados por circunstancias
              ajenas a su control (huelgas, eventos climáticos, etc.).
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Devoluciones y Garantía</h2>
            <p>
              Dispone de 14 días desde la recepción del producto para solicitar una devolución, siempre que el producto
              se encuentre en su estado original y sin usar. El dispositivo PadelStats cuenta con una garantía de 2 años
              frente a defectos de fabricación. La garantía no cubre daños causados por uso indebido, golpes o
              modificaciones del producto.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos, diseños y software, es
              propiedad de PadelStats o de sus licenciantes y está protegido por las leyes de propiedad intelectual
              aplicables. Queda prohibida su reproducción sin autorización previa y por escrito.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Limitación de Responsabilidad</h2>
            <p>
              PadelStats no será responsable de ningún daño indirecto, incidental o consecuente derivado del uso o
              la imposibilidad de uso del producto. La responsabilidad máxima de PadelStats se limitará al importe
              abonado por el producto adquirido.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Modificaciones</h2>
            <p>
              PadelStats se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán
              en vigor en el momento de su publicación en el sitio web. El uso continuado del servicio tras la
              publicación de los cambios implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Legislación Aplicable</h2>
            <p>
              Estos términos se rigen por la legislación española. Cualquier disputa derivada de su interpretación
              o cumplimiento será sometida a los juzgados y tribunales competentes del domicilio del consumidor,
              conforme a la normativa vigente de protección al consumidor.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con estos Términos de Uso, puede ponerse en contacto con nosotros a
              través del formulario de contacto disponible en la sección de Ayuda o enviando un correo electrónico
              a <a href="mailto:padelstats0@gmail.com">padelstats0@gmail.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;
