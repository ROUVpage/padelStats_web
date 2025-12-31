import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes, FaSpinner, FaShieldAlt, FaTruck, FaTag } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountMessage, setDiscountMessage] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
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
      const orderData = {
        ...formData,
        product_name: 'PadelStats Sensor',
        quantity: cartData.quantity,
        unit_price: cartData.unitPrice,
        total_amount: calculateTotal(),
        discount_code: appliedDiscount ? appliedDiscount.code : null,
        discount_amount: calculateDiscount()
      };

      const response = await fetch('http://localhost:8000/api/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Limpiar carrito
        localStorage.removeItem('padelstats_cart');
        setOrderComplete(true);
      } else {
        throw new Error('Error al procesar el pedido');
      }
    } catch (error) {
      alert('Error al procesar el pedido. Inténtalo de nuevo.');
    } finally {
      setOrderLoading(false);
    }
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
                <h2 className="card-title">Información de Envío</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Nombre completo *</label>
                      <input
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Teléfono *</label>
                      <input
                        type="tel"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">País</label>
                      <input
                        type="text"
                        name="shipping_country"
                        value={formData.shipping_country}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Dirección de envío *</label>
                      <textarea
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleInputChange}
                        required
                        className="form-textarea"
                        rows="3"
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
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={orderLoading}
                    className="order-button"
                  >
                    {orderLoading ? (
                      <FaSpinner className="button-icon" />
                    ) : (
                      <FaCheck className="button-icon" />
                    )}
                    {orderLoading ? 'Procesando...' : `Realizar Pedido - €${calculateTotal().toFixed(2)}`}
                  </button>
                </form>
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
    </div>
  );
};

export default Cart;