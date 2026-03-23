"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiShoppingCart, 
  FiMapPin, 
  FiCreditCard, 
  FiCheckCircle,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiTruck,
  FiHome,
  FiPhone,
  FiUser,
  FiArrowLeft,
  FiArrowRight,
  FiAlertCircle
} from 'react-icons/fi';
import { FaMoneyBillWave } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = ['Cart Review', 'Delivery Details', 'Payment', 'Confirmation'];

// Format price in Indian Rupees
const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

const CheckoutPage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // Cart state from API
  const [cartItems, setCartItems] = useState([]);

  // Delivery state
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    apartment: '',
    instructions: '',
    contactNumber: '',
    contactName: ''
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upiId: ''
  });

  // Validation errors
  const [validationErrors, setValidationErrors] = useState({});

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Get auth token from localStorage
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  // Get cart ID from localStorage
  const getCartId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cartId');
    }
    return null;
  };

  // Get user ID from localStorage
  const getUserId = () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          return JSON.parse(user).id;
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  };

  // Get user data
  const getUserData = () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          return JSON.parse(user);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    // Get auth token on component mount
    const token = getAuthToken();
    setAuthToken(token);
    
    // If user is logged in, pre-fill contact details
    const user = getUserData();
    if (user) {
      setDeliveryDetails(prev => ({
        ...prev,
        contactName: user.name || '',
        contactNumber: user.phone || '',
        address: user.address || ''
      }));
    }
    
    fetchCart();
  }, []);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const cartId = getCartId();
      if (!cartId) {
        setCartItems([]);
        setInitialLoading(false);
        return;
      }

      const response = await fetch(`${apiUrl}/Cart/${cartId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart items');
    } finally {
      setInitialLoading(false);
    }
  };

  // Update quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch(`${apiUrl}/Cart/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (!response.ok) throw new Error('Failed to update quantity');
      
      // Refresh cart
      await fetchCart();
      
      // Trigger cart update event for navbar
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update cart');
    }
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${apiUrl}/Cart/delete/${itemId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to remove item');
      
      // Refresh cart
      await fetchCart();
      
      // Trigger cart update event for navbar
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item');
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.Dish?.price || 0) * item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.05; // 5% tax
  };

  const calculateDeliveryFee = (subtotal) => {
    return subtotal > 500 ? 0 : 40; // Free delivery over ₹500
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = calculateDeliveryFee(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + deliveryFee + tax;

  // Handle delivery details change
  const handleDeliveryChange = (e) => {
    setDeliveryDetails({
      ...deliveryDetails,
      [e.target.name]: e.target.value
    });
    // Clear validation error for this field
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      });
    }
  };

  // Handle payment details change
  const handlePaymentChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  // Validate delivery details
  const validateDeliveryDetails = () => {
    const errors = {};
    if (!deliveryDetails.address) errors.address = 'Address is required';
    if (!deliveryDetails.contactNumber) errors.contactNumber = 'Contact number is required';
    if (!deliveryDetails.contactName) errors.contactName = 'Contact name is required';
    
    // Phone number validation (Indian format)
    if (deliveryDetails.contactNumber && !/^[6-9]\d{9}$/.test(deliveryDetails.contactNumber)) {
      errors.contactNumber = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate payment details
  const validatePaymentDetails = () => {
    if (paymentMethod === 'card' || paymentMethod === 'debit') {
      const errors = {};
      if (!paymentDetails.cardNumber) errors.cardNumber = 'Card number is required';
      if (!paymentDetails.cardName) errors.cardName = 'Name on card is required';
      if (!paymentDetails.expiry) errors.expiry = 'Expiry date is required';
      if (!paymentDetails.cvv) errors.cvv = 'CVV is required';
      
      // Basic card validation
      if (paymentDetails.cardNumber && !/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (paymentDetails.expiry && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentDetails.expiry)) {
        errors.expiry = 'Please enter a valid expiry date (MM/YY)';
      }
      if (paymentDetails.cvv && !/^\d{3}$/.test(paymentDetails.cvv)) {
        errors.cvv = 'Please enter a valid 3-digit CVV';
      }
      
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    }
    
    if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId) {
        setValidationErrors({ upiId: 'UPI ID is required' });
        return false;
      }
      // Basic UPI validation
      if (!/^[\w\.\-]+@[\w\.\-]+$/.test(paymentDetails.upiId)) {
        setValidationErrors({ upiId: 'Please enter a valid UPI ID' });
        return false;
      }
    }
    
    return true;
  };

  // Handle next step
  const handleNext = () => {
    setError('');
    
    if (activeStep === 0) {
      if (cartItems.length === 0) {
        setError('Your cart is empty');
        return;
      }
    } else if (activeStep === 1) {
      if (!validateDeliveryDetails()) {
        setError('Please fill in all required delivery details correctly');
        return;
      }
    } else if (activeStep === 2) {
      if (!validatePaymentDetails()) {
        setError('Please fill in all payment details correctly');
        return;
      }
    }

    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError('');
  };

  // Place order
  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');

    try {
      const cartId = getCartId();
      if (!cartId) {
        throw new Error('Cart not found');
      }

      // Get restaurant ID from first item
      const restaurantId = cartItems[0]?.Dish?.restaurantId;
      if (!restaurantId) {
        throw new Error('Restaurant information missing');
      }

      // Get user ID if logged in
      const userId = getUserId();
      const token = getAuthToken();

      // Format items for order
      const orderItems = cartItems.map(item => ({
        dishId: item.dishId,
        quantity: item.quantity,
        price: item.Dish?.price || 0,
        name: item.Dish?.name || 'Unknown Dish'
      }));

      // Prepare order data in the format your backend expects
      const orderData = {
        items: orderItems,
        restaurantId: restaurantId,
        totalAmount: total,
        deliveryAddress: deliveryDetails.address,
        deliveryApartment: deliveryDetails.apartment || '',
        deliveryInstructions: deliveryDetails.instructions || '',
        contactName: deliveryDetails.contactName,
        contactNumber: deliveryDetails.contactNumber,
        paymentMethod: paymentMethod.toUpperCase(),
        cartId: cartId ? parseInt(cartId) : null,
        userId: userId || null
      };

      console.log('Sending order data:', orderData);

      // Create order with authorization header
      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(orderData)
      });

      // Get response text
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        let errorMessage = 'Failed to place order';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = responseText || `Server responded with ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      // Parse successful response
      let order;
      try {
        order = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid response from server');
      }
      
      setCreatedOrder(order);
      setOrderSuccess(true);
      
      // Clear cart from localStorage
      localStorage.removeItem('cartId');
      
      // Trigger cart update event for navbar
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
      }
      
      // Move to confirmation step
      setActiveStep(steps.length);
      
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Cart Review Step
  const renderCartReview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiShoppingCart className="text-blue-600 text-xl" />
            Review Your Items
          </h3>
          <hr className="border-gray-200 mb-4" />
          
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => router.push('/')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                <div className="w-20 h-20 flex-shrink-0 relative">
                  {item.Dish?.image ? (
                    <img
                      src={`${apiUrl.replace('/api', '')}/uploads/${item.Dish.image}`}
                      alt={item.Dish.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">🍽️</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-800">{item.Dish?.name || 'Unknown Dish'}</h4>
                  <p className="text-sm text-gray-500">{item.Dish?.restaurant?.name || 'Restaurant'}</p>
                  <p className="text-sm text-gray-500 mt-1">Price: {formatINR(item.Dish?.price || 0)} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus className="text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button 
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FiPlus className="text-gray-600" />
                  </button>
                </div>
                <div className="text-right min-w-[100px]">
                  <span className="font-semibold text-blue-600">
                    {formatINR((item.Dish?.price || 0) * item.quantity)}
                  </span>
                </div>
                <button 
                  className="text-red-500 hover:text-red-600 p-2"
                  onClick={() => removeItem(item.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          <hr className="border-gray-200 mb-4" />
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              {deliveryFee === 0 ? (
                <span className="text-green-600">FREE</span>
              ) : (
                <span>{formatINR(deliveryFee)}</span>
              )}
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (5%)</span>
              <span>{formatINR(tax)}</span>
            </div>
          </div>
          
          {subtotal < 500 && subtotal > 0 && (
            <div className="bg-orange-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-700 flex items-center gap-2">
                <FiAlertCircle className="flex-shrink-0" />
                Add {formatINR(500 - subtotal)} more for FREE delivery
              </p>
            </div>
          )}
          
          <hr className="border-gray-200 mb-4" />
          
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="text-xl font-bold text-blue-600">{formatINR(total)}</span>
          </div>
          
          {cartItems[0]?.Dish?.restaurant && (
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2 text-gray-600">
              <FiHome className="text-gray-400" />
              <span className="text-sm">{cartItems[0].Dish.restaurant.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Delivery Details Step
  const renderDeliveryDetails = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiMapPin className="text-blue-600 text-xl" />
          Delivery Address
        </h3>
        <hr className="border-gray-200 mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiHome className="text-gray-400" />
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.address ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              value={deliveryDetails.address}
              onChange={handleDeliveryChange}
              placeholder="Enter your street address"
            />
            {validationErrors.address && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.address}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apartment/Suite (Optional)
            </label>
            <input
              type="text"
              name="apartment"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={deliveryDetails.apartment}
              onChange={handleDeliveryChange}
              placeholder="Apt, Suite, Building (optional)"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Instructions (Optional)
            </label>
            <textarea
              name="instructions"
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              value={deliveryDetails.instructions}
              onChange={handleDeliveryChange}
              placeholder="e.g., Leave at door, Gate code, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiUser className="text-gray-400" />
              Contact Name *
            </label>
            <input
              type="text"
              name="contactName"
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.contactName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              value={deliveryDetails.contactName}
              onChange={handleDeliveryChange}
              placeholder="Your full name"
            />
            {validationErrors.contactName && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.contactName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <FiPhone className="text-gray-400" />
              Contact Number *
            </label>
            <input
              type="tel"
              name="contactNumber"
              className={`w-full px-4 py-3 rounded-lg border ${
                validationErrors.contactNumber ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              value={deliveryDetails.contactNumber}
              onChange={handleDeliveryChange}
              placeholder="10-digit mobile number"
              maxLength="10"
            />
            {validationErrors.contactNumber && (
              <p className="mt-1 text-sm text-red-500">{validationErrors.contactNumber}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Step
  const renderPayment = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiCreditCard className="text-blue-600 text-xl" />
          Payment Method
        </h3>
        <hr className="border-gray-200 mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <label className={`border rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === 'card' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <FiCreditCard className={`text-2xl ${paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-600'}`}>
                Credit Card
              </span>
            </div>
          </label>
          
          <label className={`border rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === 'debit' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="debit"
              checked={paymentMethod === 'debit'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <FiCreditCard className={`text-2xl ${paymentMethod === 'debit' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${paymentMethod === 'debit' ? 'text-blue-500' : 'text-gray-600'}`}>
                Debit Card
              </span>
            </div>
          </label>
          
          <label className={`border rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === 'upi' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <span className={`text-2xl ${paymentMethod === 'upi' ? 'text-blue-500' : 'text-gray-400'}`}>UPI</span>
              <span className={`text-sm font-medium ${paymentMethod === 'upi' ? 'text-blue-500' : 'text-gray-600'}`}>
                UPI
              </span>
            </div>
          </label>
          
          <label className={`border rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === 'cash' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <FaMoneyBillWave className={`text-2xl ${paymentMethod === 'cash' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${paymentMethod === 'cash' ? 'text-blue-500' : 'text-gray-600'}`}>
                Cash on Delivery
              </span>
            </div>
          </label>
        </div>
        
        {(paymentMethod === 'card' || paymentMethod === 'debit') && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
              {validationErrors.cardNumber && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.cardNumber}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card *</label>
              <input
                type="text"
                name="cardName"
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.cardName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                value={paymentDetails.cardName}
                onChange={handlePaymentChange}
                placeholder="John Doe"
              />
              {validationErrors.cardName && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.cardName}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                <input
                  type="text"
                  name="expiry"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    validationErrors.expiry ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  value={paymentDetails.expiry}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {validationErrors.expiry && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.expiry}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                <input
                  type="password"
                  name="cvv"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    validationErrors.cvv ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                  value={paymentDetails.cvv}
                  onChange={handlePaymentChange}
                  placeholder="123"
                  maxLength="3"
                />
                {validationErrors.cvv && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID *</label>
              <input
                type="text"
                name="upiId"
                className={`w-full px-4 py-3 rounded-lg border ${
                  validationErrors.upiId ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                value={paymentDetails.upiId}
                onChange={handlePaymentChange}
                placeholder="username@okhdfcbank"
              />
              {validationErrors.upiId && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.upiId}</p>
              )}
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
              <span className="text-blue-500 text-xl">📱</span>
              <p className="text-sm text-blue-700">
                You will receive a payment request on your UPI app to complete the transaction.
              </p>
            </div>
          </div>
        )}
        
        {paymentMethod === 'cash' && (
          <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
            <FaMoneyBillWave className="text-blue-500 text-xl flex-shrink-0 mt-1" />
            <p className="text-sm text-blue-700">
              Pay with cash when your order is delivered. Please have exact change if possible.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Confirmation Step
  const renderConfirmation = () => (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your order has been placed successfully.
        </p>
        
        {createdOrder && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Order #{createdOrder.orderId || createdOrder.id}</h3>
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
              <FiTruck />
              <span className="text-sm font-medium">Preparing your order</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Total: {formatINR(createdOrder.total || total)}
            </p>
          </div>
        )}
        
        <p className="text-sm text-gray-500 mb-6">
          You will receive an email confirmation shortly. Track your order in the Orders page.
        </p>
        
        <div className="space-y-3">
          <Link href="/orders" className="block w-full">
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              View My Orders
            </button>
          </Link>
          
          <Link href="/" className="block w-full">
            <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  // Get step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderCartReview();
      case 1:
        return renderDeliveryDetails();
      case 2:
        return renderPayment();
      case 3:
        return renderConfirmation();
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          {/* Stepper */}
          <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
            {steps.map((label, index) => (
              <div key={label} className="relative z-10 flex flex-col items-center bg-gray-50 px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  index <= activeStep 
                    ? index < activeStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-600 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <span className={`text-sm font-medium ${
                  index <= activeStep ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex justify-between items-center">
              <span>{error}</span>
              <button className="text-red-500 hover:text-red-600" onClick={() => setError('')}>×</button>
            </div>
          )}
          
          {orderSuccess ? (
            renderConfirmation()
          ) : (
            <>
              {getStepContent(activeStep)}
              
              <div className="flex justify-between mt-8 max-w-2xl mx-auto">
                <button
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  <FiArrowLeft className="inline mr-2" />
                  Back
                </button>
                
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  onClick={handleNext}
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Processing...
                    </>
                  ) : activeStep === steps.length - 1 ? (
                    'Place Order'
                  ) : (
                    <>
                      Next
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;