import React, { useState } from 'react';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment logic here
    console.log({
      paymentMethod,
      cardDetails,
      billingAddress
    });
    alert('Payment processed successfully!');
  };
const navigate = useNavigate();
const handleClick = () => {
  navigate('/my-reservations')
}

  return (
    <div className="payment-container">
      <h1>Payment Information</h1>
      
      <div className="payment-methods">
        <h2>Select Payment Method</h2>
        <div className="method-options">
          <label>
            <input
              type="radio"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
            />
            Bank Transfer
          </label>
        </div>
      </div>

      {paymentMethod === 'credit' && (
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="card-details">
            <h2>Card Details</h2>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                required
              />
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleCardChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>
          </div>

          <div className="billing-address">
            <h2>Billing Address</h2>
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                value={billingAddress.street}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={billingAddress.city}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={billingAddress.state}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP/Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  value={billingAddress.zip}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>
          </div>

          <button onClick={handleClick} type="submit" className="pay-button">
            Complete Payment
          </button>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <div className="alternative-method">
          <p>You will be redirected to PayPal to complete your payment</p>
          <button className="pay-button">Proceed to PayPal</button>
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div className="alternative-method">
          <p>Bank transfer details will be provided after booking confirmation</p>
          <button className="pay-button">Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;