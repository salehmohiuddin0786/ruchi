"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/page.jsx';
import {
  ArrowLeft, Trash2, Plus, Minus, ShoppingCart,
  IndianRupee, Loader, X, Tag, MapPin, Clock,
  ChevronRight, AlertCircle, LogIn, User,
  Shield, CreditCard, Truck, Star, Info,
  Heart, Share2, ChevronDown, Home, Phone
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CartPage = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [quantityUpdateLoading, setQuantityUpdateLoading] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    landmark: ''
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const currencySymbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';

  // 🔐 Protect page - redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/Cart');
    }
  }, [authLoading, isAuthenticated, router]);

  // Generate estimated delivery time
  useEffect(() => {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 45 * 60000); // Add 45 minutes
    setEstimatedDelivery(
      deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  }, []);

  // Fetch user addresses
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${apiUrl}/user/addresses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
        if (data.length > 0) {
          setDeliveryAddress(data[0].address);
        }
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  // Get cart ID from localStorage
  const getCartId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cartId');
    }
    return null;
  };

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const cartId = getCartId();
      if (!cartId) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiUrl}/Cart/${cartId}`, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });

      if (!response.ok) throw new Error('Failed to fetch cart');
      
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch saved items (for later)
  const fetchSavedItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${apiUrl}/Cart/saved-items`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSavedItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch saved items:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchSavedItems();
      fetchAddresses();
    } else {
      fetchCart(); // Still fetch cart for guest users
    }
  }, [isAuthenticated]);

  // Update quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setQuantityUpdateLoading(itemId);
    setUpdating(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiUrl}/Cart/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
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
    } finally {
      setUpdating(false);
      setQuantityUpdateLoading(null);
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiUrl}/Cart/delete/${itemId}`, {
        method: 'DELETE',
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
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
    } finally {
      setUpdating(false);
    }
  };

  // Save for later (authenticated users only)
  const saveForLater = async (item) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/Cart');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiUrl}/Cart/save-for-later`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ itemId: item.id })
      });

      if (response.ok) {
        await removeItem(item.id);
        await fetchSavedItems();
      }
    } catch (err) {
      console.error('Failed to save item:', err);
    }
  };

  // Move to cart
  const moveToCart = async (savedItem) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiUrl}/Cart/move-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ savedItemId: savedItem.id })
      });

      if (response.ok) {
        await fetchCart();
        await fetchSavedItems();
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (err) {
      console.error('Failed to move item:', err);
    }
  };

  // Add new address
  const addAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiUrl}/user/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAddress)
      });

      if (response.ok) {
        await fetchAddresses();
        setShowAddressForm(false);
        setNewAddress({
          type: 'home',
          street: '',
          city: '',
          state: '',
          zipCode: '',
          landmark: ''
        });
      }
    } catch (err) {
      console.error('Failed to add address:', err);
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    const validPromos = {
      'SAVE10': 10,
      'SAVE20': 20,
      'FIRST50': 50,
      'FREESHIP': calculateDeliveryFee(calculateSubtotal())
    };

    if (validPromos[promoCode.toUpperCase()]) {
      if (promoCode.toUpperCase() === 'FREESHIP') {
        setPromoDiscount(calculateDeliveryFee(calculateSubtotal()));
      } else {
        setPromoDiscount((calculateSubtotal() * validPromos[promoCode.toUpperCase()]) / 100);
      }
      setPromoApplied(true);
      setError(null);
      setShowPromoInput(false);
    } else {
      setError('Invalid promo code');
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

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const delivery = calculateDeliveryFee(subtotal);
    const discount = promoApplied ? promoDiscount : 0;
    return subtotal + tax + delivery - discount;
  };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Show login prompt if not authenticated
  if (!authLoading && !isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Login Required</h2>
            <p className="text-gray-600 mb-8">
              Please log in to view your cart and proceed with checkout
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/login?redirect=/Cart')}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all"
              >
                Log In
              </button>
              <button
                onClick={() => router.push('/register?redirect=/Cart')}
                className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (authLoading || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with user info */}
          <div className="mb-6 sm:mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                  Your Cart
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>

              {/* User info badge */}
              {isAuthenticated && user && (
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <span className="text-xs sm:text-sm text-gray-600">
                    {user.name || user.email}
                  </span>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm flex-1">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="ml-auto hover:bg-red-100 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {cartItems.length === 0 ? (
            // Empty Cart
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Your cart is empty</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Browse restaurants and discover delicious dishes!
              </p>

              {/* Saved items section for authenticated users */}
              {isAuthenticated && savedItems.length > 0 && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowSavedItems(!showSavedItems)}
                    className="flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 mx-auto"
                  >
                    <Heart className="w-4 h-4" />
                    <span>You have {savedItems.length} saved items</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showSavedItems ? 'rotate-180' : ''}`} />
                  </button>

                  {showSavedItems && (
                    <div className="mt-4 space-y-3 max-w-md mx-auto">
                      {savedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                              {item.Dish?.image ? (
                                <img
                                  src={`${apiUrl.replace('/api', '')}/uploads/${item.Dish.image}`}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-xl">🍽️</span>
                                </div>
                              )}
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-sm">{item.Dish?.name}</p>
                              <p className="text-xs text-gray-500">
                                {currencySymbol}{item.Dish?.price}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => moveToCart(item)}
                            className="px-3 py-1.5 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600"
                          >
                            Move to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => router.push('/')}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all inline-flex items-center gap-2 text-sm sm:text-base"
              >
                Browse Restaurants
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          ) : (
            // Cart with items
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="flex-1 space-y-4 sm:space-y-6">
                {/* Main Cart Items */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-4 sm:p-6 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Cart Items ({itemCount})</h3>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 sm:p-6">
                        <div className="flex flex-col xs:flex-row gap-4">
                          {/* Dish Image */}
                          <div className="w-full xs:w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {item.Dish?.image ? (
                              <img
                                src={`${apiUrl.replace('/api', '')}/uploads/${item.Dish.image}`}
                                alt={item.Dish.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-2xl">🍽️</span>
                              </div>
                            )}
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                                  {item.Dish?.name || 'Unknown Dish'}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                                  {item.Dish?.description || 'Delicious dish'}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 hover:bg-red-50 rounded-full transition-colors group self-start sm:self-center"
                                disabled={updating}
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-red-500" />
                              </button>
                            </div>

                            {/* Price and Quantity */}
                            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mt-4">
                              <div className="flex items-baseline gap-1">
                                <span className="text-lg sm:text-xl font-bold text-gray-900">
                                  {currencySymbol}{item.Dish?.price || 0}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-500">each</span>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                                  disabled={updating || item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                                </button>
                                <span className="font-semibold w-8 text-center text-sm sm:text-base">
                                  {quantityUpdateLoading === item.id ? (
                                    <Loader className="w-4 h-4 animate-spin mx-auto" />
                                  ) : (
                                    item.quantity
                                  )}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center hover:from-red-600 hover:to-orange-600 transition-colors disabled:opacity-50"
                                  disabled={updating}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </button>
                              </div>
                            </div>

                            {/* Item Total */}
                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                              <span className="text-xs sm:text-sm text-gray-500">Item total</span>
                              <span className="font-semibold text-red-500 text-sm sm:text-base">
                                {currencySymbol}{((item.Dish?.price || 0) * item.quantity).toFixed(2)}
                              </span>
                            </div>

                            {/* Save for later button - only for authenticated users */}
                            {isAuthenticated && (
                              <button
                                onClick={() => saveForLater(item)}
                                className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-purple-600 transition mt-2"
                              >
                                <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                                Save for later
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address Section - for authenticated users */}
                {isAuthenticated && (
                  <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        <h3 className="font-semibold text-gray-800">Delivery Address</h3>
                      </div>
                      <button
                        onClick={() => setShowAddressForm(!showAddressForm)}
                        className="text-xs sm:text-sm text-red-500 hover:text-red-600"
                      >
                        {showAddressForm ? 'Cancel' : 'Add New'}
                      </button>
                    </div>

                    {showAddressForm ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Street Address"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="ZIP Code"
                            value={newAddress.zipCode}
                            onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                          />
                          <input
                            type="text"
                            placeholder="Landmark (optional)"
                            value={newAddress.landmark}
                            onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowAddressForm(false)}
                            className="flex-1 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={addAddress}
                            className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {addresses.length > 0 ? (
                          addresses.map((addr, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                              <input
                                type="radio"
                                name="address"
                                checked={selectedAddress === addr.type}
                                onChange={() => {
                                  setSelectedAddress(addr.type);
                                  setDeliveryAddress(addr.address);
                                }}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium capitalize">{addr.type}</p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                                </p>
                                {addr.landmark && (
                                  <p className="text-xs text-gray-500 mt-1">Landmark: {addr.landmark}</p>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-3">
                            No saved addresses. Please add a delivery address.
                          </p>
                        )}

                        <textarea
                          placeholder="Add delivery instructions (e.g., gate code, landmark)"
                          value={deliveryInstructions}
                          onChange={(e) => setDeliveryInstructions(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg text-xs sm:text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                          rows="2"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Continue Shopping */}
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/')}
                    className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-2 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-96">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>{currencySymbol}{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (5%)</span>
                      <span>{currencySymbol}{calculateTax(calculateSubtotal()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Delivery Fee
                      </span>
                      {calculateDeliveryFee(calculateSubtotal()) === 0 ? (
                        <span className="text-green-600 font-medium">FREE</span>
                      ) : (
                        <span>{currencySymbol}{calculateDeliveryFee(calculateSubtotal()).toFixed(2)}</span>
                      )}
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          Discount
                        </span>
                        <span>-{currencySymbol}{promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Promo code section */}
                  {!promoApplied ? (
                    <div className="mt-4">
                      {showPromoInput ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-black placeholder-gray-400 focus:ring-2 focus:ring-red-500"
                          />
                          <button
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                          >
                            Apply
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowPromoInput(true)}
                          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
                        >
                          <Tag className="w-4 h-4" />
                          Have a promo code?
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 p-2 bg-green-50 rounded-lg flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-green-700">
                        Promo applied: {promoCode}
                      </span>
                      <button
                        onClick={() => {
                          setPromoApplied(false);
                          setPromoDiscount(0);
                          setPromoCode('');
                        }}
                        className="text-green-700 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Free delivery threshold */}
                  {calculateSubtotal() < 500 && (
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-orange-700 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Add {currencySymbol}{(500 - calculateSubtotal()).toFixed(2)} more for FREE delivery
                      </p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{currencySymbol}{calculateTotal().toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Including all taxes</p>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => isAuthenticated ? router.push('/checkout') : router.push('/login?redirect=/checkout')}
                    className="w-full mt-6 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                    disabled={cartItems.length === 0 || updating}
                  >
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                  </button>

                  {/* Trust badges */}
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Secure
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      30 min delivery
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      100% fresh
                    </div>
                  </div>

                  {/* Delivery estimate */}
                  {cartItems.length > 0 && (
                    <div className="mt-4 p-2 bg-blue-50 rounded-lg text-center">
                      <p className="text-xs text-blue-700 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        Estimated delivery by {estimatedDelivery}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default CartPage;