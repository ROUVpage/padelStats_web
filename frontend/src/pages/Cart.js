import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes, FaSpinner, FaShieldAlt, FaTruck, FaTag, FaUser, FaEnvelope, FaMapMarkerAlt, FaGlobeEurope, FaGoogle, FaPhone } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountMessage, setDiscountMessage] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_postal_code: '',
    shipping_country: 'España'
  });

  useEffect(() => {
    // Cargar datos del carrito desde localStorage
    const savedCart = localStorage.getItem('padelstats_cart');
    if (savedCart) {
      setCartData(JSON.parse(savedCart));
    } else {
      // Si no hay datos del carrito, redirigir a producto
      navigate('/producto');
    }
  }, [navigate]);

  const calculateSubtotal = () => {
    if (!cartData) return 0;
    return cartData.quantity * cartData.unitPrice;
  };

  const calculateDiscount = () => {
    if (!appliedDiscount || !cartData) return 0;
    return calculateSubtotal() * (appliedDiscount.discount_percentage / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 5.99;
    const discount = calculateDiscount();
    return subtotal + shipping - discount;
  };

  const applyDiscountCode = async () => {
    if (!discountCode.trim()) {
      setDiscountMessage('Por favor, ingresa un código de descuento');
      return;
    }

    setDiscountLoading(true);
    setDiscountMessage('');

    try {
      const response = await fetch(`http://localhost:8000/api/orders/validate-discount/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: discountCode.trim().toLowerCase()
        }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setAppliedDiscount(data);
        setDiscountMessage(`¡Código aplicado! Descuento del ${data.discount_percentage}%`);
        setDiscountCode('');
      } else {
        setAppliedDiscount(null);
        setDiscountMessage('Código de descuento no válido');
      }
    } catch (error) {
      setDiscountMessage('Error al validar el código. Inténtalo de nuevo.');
    } finally {
      setDiscountLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOrderLoading(true);

    try {
      // Generar número de seguimiento simulado
      const trackingNumber = 'CP' + Date.now().toString().slice(-8);
      
      const orderData = {
        ...formData,
        product_name: 'PadelStats Sensor',
        quantity: cartData.quantity,
        unit_price: cartData.unitPrice,
        total_amount: calculateTotal(),
        discount_code: appliedDiscount ? appliedDiscount.code : null,
        discount_amount: calculateDiscount(),
        tracking_number: trackingNumber,
        payment_method: 'contrarembolso'
      };

      const response = await fetch('http://localhost:8000/api/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        setOrderNumber(result.order_number || trackingNumber);
        setShowCheckoutModal(false);
        setShowConfirmationModal(true);
        // Limpiar carrito después de mostrar confirmación
        setTimeout(() => {
          localStorage.removeItem('padelstats_cart');
        }, 3000);
      } else {
        throw new Error(result.error || 'Error al procesar el pedido');
      }
    } catch (error) {
      alert('Error al procesar el pedido: ' + error.message);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const closeModals = () => {
    setShowCheckoutModal(false);
    setShowConfirmationModal(false);
  };

  const handleGoogleFill = () => {
    // Simular autocompletado con Google
    alert('Función de Google Sign-In no implementada en demo. Por favor, completa el formulario manualmente.');
  };

  if (orderComplete) {
    return (
      <div className="cart-container">
        <div className="success-container">
          <FaCheck className="success-icon" />
          <h1 className="success-title">
            ¡Pedido Realizado con Éxito!
          </h1>
          <p className="success-message">
            Hemos recibido tu pedido y te hemos enviado un email de confirmación.
            Recibirás tu PadelStats en 2-3 días laborables.
          </p>
          <div className="success-buttons">
            <Link to="/" className="success-button">
              Volver al Inicio
            </Link>
            <Link to="/producto" className="success-button secondary-button">
              Ver más Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!cartData) {
    return (
      <div className="cart-container">
        <div className="success-container">
          <FaSpinner className="success-icon" />
          <p className="success-message">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header */}
      <section className="cart-header">
        <div className="cart-header-container">
          <div className="cart-header-content">
            <Link to="/producto" className="back-button">
              <FaArrowLeft className="back-icon" />
              Volver al Producto
            </Link>
            <h1 className="cart-title">Mi Carrito</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="cart-main">
        <div className="cart-main-container">
          <div className="cart-grid">
            {/* Product Details and Shipping Form */}
            <div>
              {/* Product Card */}
              <div className="product-card">
                <h2 className="card-title">Resumen del Pedido</h2>
                
                <div className="product-info">
                  <div className="product-image">
                    <span className="product-image-placeholder">Imagen</span>
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">PadelStats Sensor</h3>
                    <p className="product-description">
                      Sensor inteligente para pádel que mide potencia, precisión, efecto y exigencia física.
                    </p>
                    <div className="quantity-info">
                      <span className="quantity-label">Cantidad: {cartData.quantity}</span>
                      <span className="unit-price">€{cartData.unitPrice.toFixed(2)} c/u</span>
                    </div>
                  </div>
                </div>

                {/* Discount Section */}
                <div className="discount-section">
                  <div className="discount-header">
                    <FaTag className="discount-icon" />
                    <h3 className="discount-title">Código de Descuento</h3>
                  </div>

                  <div className="discount-input-container">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Ingresa tu código aquí"
                      className="discount-input"
                      disabled={discountLoading}
                    />
                    <button
                      onClick={applyDiscountCode}
                      disabled={discountLoading || !discountCode.trim()}
                      className="apply-button"
                    >
                      {discountLoading ? (
                        <FaSpinner className="apply-icon" />
                      ) : (
                        <FaCheck className="apply-icon" />
                      )}
                      Aplicar
                    </button>
                  </div>

                  {discountMessage && (
                    <div className={`discount-message ${
                      appliedDiscount ? 'discount-success' : 'discount-error'
                    }`}>
                      {discountMessage}
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Form */}
              <div className="shipping-form">
                <h2 className="card-title">Información de Entrega</h2>
                <div className="payment-info">
                  <div className="payment-method">
                    <FaShieldAlt className="payment-icon" />
                    <div className="payment-details">
                      <h3 className="payment-title">Pago Contrarembolso</h3>
                      <p className="payment-description">
                        Pagas cuando recibes el producto. Sin riesgos, sin comisiones adicionales.
                      </p>
                    </div>
                  </div>
                  <div className="delivery-info">
                    <FaTruck className="delivery-icon" />
                    <div className="delivery-details">
                      <h3 className="delivery-title">Entrega a domicilio</h3>
                      <p className="delivery-description">
                        Enviado con Correos España. Entrega en 2-4 días laborables.
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="checkout-button"
                >
                  <FaCheck className="button-icon" />
                  Proceder al Checkout
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2 className="card-title">Resumen de Compra</h2>

              <div className="summary-item">
                <span className="summary-label">Subtotal ({cartData.quantity} productos)</span>
                <span className="summary-value">€{calculateSubtotal().toFixed(2)}</span>
              </div>

              <div className="summary-item">
                <span className="summary-label">Gastos de envío</span>
                <span className="summary-value">€5.99</span>
              </div>

              {appliedDiscount && (
                <div className="summary-item">
                  <span className="summary-label">
                    Descuento ({appliedDiscount.discount_percentage}%)
                  </span>
                  <span className="summary-discount">
                    -€{calculateDiscount().toFixed(2)}
                  </span>
                </div>
              )}

              <div className="summary-item summary-total">
                <span className="total-label">Total</span>
                <span className="total-value">€{calculateTotal().toFixed(2)}</span>
              </div>

              {/* Security Features */}
              <div className="security-features">
                <div className="security-item">
                  <FaShieldAlt className="security-icon" />
                  <span className="security-text">Pago seguro</span>
                </div>
                <div className="security-item">
                  <FaTruck className="security-icon" />
                  <span className="security-text">Envío gratuito</span>
                </div>
                <div className="security-item">
                  <FaCheck className="security-icon" />
                  <span className="security-text">Garantía 2 años</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">Información de Entrega</h2>
              <button onClick={closeModals} className="modal-close">
                <FaTimes />
              </button>
            </div>

            <div className="modal-content">
              <div className="google-fill-container">
                <button onClick={handleGoogleFill} className="google-fill-button">
                  <FaGoogle className="google-icon" />
                  Autocompletar con Google
                </button>
              </div>

              <div className="divider">
                <span className="divider-text">o completa manualmente</span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <FaUser className="label-icon" />
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaEnvelope className="label-icon" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaPhone className="label-icon" />
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="+34 600 000 000"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FaGlobeEurope className="label-icon" />
                      País
                    </label>
                    <select
                      name="shipping_country"
                      value={formData.shipping_country}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="España">España</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Francia">Francia</option>
                      <option value="Italia">Italia</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">
                      <FaMapMarkerAlt className="label-icon" />
                      Dirección de envío *
                    </label>
                    <input
                      type="text"
                      name="shipping_address"
                      value={formData.shipping_address}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Calle, número, piso, puerta..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ciudad *</label>
                    <input
                      type="text"
                      name="shipping_city"
                      value={formData.shipping_city}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Tu ciudad"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Código postal *</label>
                    <input
                      type="text"
                      name="shipping_postal_code"
                      value={formData.shipping_postal_code}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="28001"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={closeModals}
                    className="cancel-button"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={orderLoading}
                    className="confirm-order-button"
                  >
                    {orderLoading ? (
                      <>
                        <FaSpinner className="button-icon spinning" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <FaCheck className="button-icon" />
                        Confirmar Pedido - €{calculateTotal().toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div className="modal-container confirmation-modal">
            <div className="modal-content">
              <div className="confirmation-icon">
                <FaCheck className="success-check" />
              </div>
              
              <h2 className="confirmation-title">¡Pedido Confirmado!</h2>
              
              <p className="confirmation-message">
                Tu pedido ha sido procesado correctamente. Hemos enviado todos los detalles 
                a tu correo electrónico <strong>{formData.customer_email}</strong>.
              </p>

              <div className="confirmation-details">
                <div className="detail-item">
                  <span className="detail-label">Número de pedido:</span>
                  <span className="detail-value">{orderNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Número de seguimiento:</span>
                  <span className="detail-value">{orderNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Método de pago:</span>
                  <span className="detail-value">Contrarembolso</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Importe a pagar:</span>
                  <span className="detail-value">€{(calculateTotal() + 5.99).toFixed(2)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tiempo de entrega:</span>
                  <span className="detail-value">2-4 días laborables</span>
                </div>
              </div>

              <div className="important-note">
                <FaShieldAlt className="note-icon" />
                <p className="note-text">
                  <strong>¡Importante!</strong> Pagarás €{(calculateTotal() + 5.99).toFixed(2)} al repartidor 
                  (incluye €5.99 de gastos de envío). Guarda este correo como comprobante de tu pedido.
                </p>
              </div>

              <div className="tracking-info">
                <p className="tracking-text">
                  Puedes hacer el seguimiento de tu envío en:
                </p>
                <a 
                  href="https://www.correos.es/es/es/herramientas/localizador/envios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tracking-link"
                >
                  🔗 Seguimiento Correos España
                </a>
              </div>

              <div className="modal-footer">
                <button
                  onClick={() => {
                    closeModals();
                    navigate('/');
                  }}
                  className="go-home-button"
                >
                  Ir al Inicio
                </button>
                <button
                  onClick={() => {
                    closeModals();
                    navigate('/producto');
                  }}
                  className="buy-more-button"
                >
                  Comprar más
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;