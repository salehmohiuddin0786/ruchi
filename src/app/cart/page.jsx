"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  Package,
  Truck,
  CreditCard,
  Shield,
  Tag,
  X,
  ChevronRight,
  Store,
  Utensils,
  AlertCircle
} from 'lucide-react'

const Page = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Fresh Vegetables Pack',
      store: 'FreshMart Supermarket',
      type: 'grocery',
      price: 249,
      quantity: 1,
      image: '🥦',
      deliveryTime: '30-45 mins',
      inStock: true,
      notes: ''
    },
    {
      id: 2,
      name: 'Butter Chicken',
      restaurant: 'Food Palace',
      type: 'restaurant',
      price: 349,
      quantity: 2,
      image: '🍛',
      deliveryTime: '25-35 mins',
      inStock: true,
      notes: 'Extra spicy'
    },
    {
      id: 3,
      name: 'Margherita Pizza',
      restaurant: 'Pizza Corner',
      type: 'restaurant',
      price: 299,
      quantity: 1,
      image: '🍕',
      deliveryTime: '20-30 mins',
      inStock: true,
      notes: ''
    },
    {
      id: 4,
      name: 'Milk - 1L',
      store: 'Daily Needs',
      type: 'grocery',
      price: 65,
      quantity: 3,
      image: '🥛',
      deliveryTime: 'Within 1 hour',
      inStock: false,
      notes: ''
    }
  ])

  const [address, setAddress] = useState({
    name: 'John Doe',
    street: '123, Green Park Apartments',
    area: 'Sector 15',
    city: 'Noida, Uttar Pradesh 201301',
    phone: '+91 98765 43210'
  })

  const [deliveryOption, setDeliveryOption] = useState('standard')
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)

  const deliveryOptions = [
    { id: 'standard', name: 'Standard Delivery', time: '30-45 mins', price: 29 },
    { id: 'express', name: 'Express Delivery', time: '15-20 mins', price: 49 },
    { id: 'scheduled', name: 'Schedule Later', time: 'Choose time', price: 29 }
  ]

  const promoCodes = [
    { code: 'FIRST20', discount: 20, type: 'percentage', minAmount: 199 },
    { code: 'FREEDEL', discount: 0, type: 'free_delivery', minAmount: 299 },
    { code: 'SAVE50', discount: 50, type: 'fixed', minAmount: 499 }
  ]

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateDelivery = () => {
    const option = deliveryOptions.find(opt => opt.id === deliveryOption)
    return option ? option.price : 0
  }

  const calculateDiscount = () => {
    if (!appliedPromo) return 0
    
    const subtotal = calculateSubtotal()
    if (subtotal < appliedPromo.minAmount) return 0
    
    if (appliedPromo.type === 'percentage') {
      return (subtotal * appliedPromo.discount) / 100
    } else if (appliedPromo.type === 'fixed') {
      return appliedPromo.discount
    }
    return 0
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const delivery = calculateDelivery()
    const discount = calculateDiscount()
    
    return subtotal + delivery - discount
  }

  const updateQuantity = (id, change) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change
          if (newQuantity >= 1) {
            return { ...item, quantity: newQuantity }
          }
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase())
    if (promo) {
      setAppliedPromo(promo)
      setPromoCode('')
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Cart</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <ShoppingBag className="w-5 h-5" />
              <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items</span>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Add delicious food and groceries from restaurants and stores near you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300">
                  Browse Restaurants
                </button>
                <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-300">
                  Shop Groceries
                </button>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column - Cart Items */}
              <div className="lg:col-span-2">
                
                {/* Cart Items */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
                    
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-200 transition-colors duration-300">
                          
                          {/* Item Image/Icon */}
                          <div className="flex-shrink-0">
                            <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl ${
                              item.type === 'grocery' ? 'bg-green-50' : 'bg-orange-50'
                            }`}>
                              {item.image}
                            </div>
                          </div>

                          {/* Item Details */}
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                  {item.type === 'grocery' ? (
                                    <>
                                      <Store className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-600">{item.store}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Utensils className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-600">{item.restaurant}</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  {item.deliveryTime}
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900 mb-2">
                                  ₹{item.price * item.quantity}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ₹{item.price} × {item.quantity}
                                </div>
                              </div>
                            </div>

                            {/* Quantity Control & Actions */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="flex items-center gap-4">
                                {item.notes && (
                                  <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                    Note: {item.notes}
                                  </span>
                                )}
                                {!item.inStock && (
                                  <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    Out of stock
                                  </span>
                                )}
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Notes */}
                    <div className="mt-8">
                      <h4 className="font-semibold text-gray-900 mb-3">Add Special Instructions</h4>
                      <textarea 
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        rows="3"
                        placeholder="Any special instructions for your order?"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Delivery Address
                    </h2>
                    <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">
                      Change Address
                    </button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-900">{address.name}</p>
                    <p className="text-gray-600">{address.street}</p>
                    <p className="text-gray-600">{address.area}</p>
                    <p className="text-gray-600">{address.city}</p>
                    <p className="text-gray-600 mt-2">{address.phone}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                
                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  {/* Delivery Options */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Delivery Options
                    </h3>
                    <div className="space-y-2">
                      {deliveryOptions.map((option) => (
                        <label 
                          key={option.id}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                            deliveryOption === option.id 
                              ? 'border-orange-500 bg-orange-50' 
                              : 'border-gray-200 hover:border-orange-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="deliveryOption"
                              value={option.id}
                              checked={deliveryOption === option.id}
                              onChange={(e) => setDeliveryOption(e.target.value)}
                              className="text-orange-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{option.name}</div>
                              <div className="text-sm text-gray-500">{option.time}</div>
                            </div>
                          </div>
                          <div className="font-semibold text-gray-900">
                            {option.price === 0 ? 'FREE' : `₹${option.price}`}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Promo Code
                    </h3>
                    
                    {appliedPromo ? (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-green-700">{appliedPromo.code} Applied</div>
                            <div className="text-sm text-green-600">
                              {appliedPromo.type === 'percentage' ? `${appliedPromo.discount}% discount` :
                               appliedPromo.type === 'free_delivery' ? 'Free delivery' :
                               `₹${appliedPromo.discount} off`}
                            </div>
                          </div>
                          <button 
                            onClick={removePromoCode}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <button 
                          onClick={applyPromoCode}
                          className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    
                    {/* Available Promo Codes */}
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Available codes:</p>
                      <div className="flex flex-wrap gap-2">
                        {promoCodes.map((promo) => (
                          <span 
                            key={promo.code}
                            className="text-xs px-2 py-1 border border-orange-200 text-orange-600 rounded-full cursor-pointer hover:bg-orange-50"
                            onClick={() => setPromoCode(promo.code)}
                          >
                            {promo.code}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 border-t border-gray-200 pt-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{calculateSubtotal()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>₹{calculateDelivery()}</span>
                    </div>
                    {appliedPromo && calculateDiscount() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedPromo.code})</span>
                        <span>-₹{calculateDiscount()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Estimated delivery: {deliveryOption === 'express' ? '15-20 mins' : '30-45 mins'}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Proceed to Checkout
                    <ChevronRight className="inline-block ml-2 w-5 h-5" />
                  </button>

                  {/* Security Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Shield className="w-4 h-4" />
                      <span>Secure payment • 100% Safe • SSL encrypted</span>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Safe & Secure Ordering
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Contactless delivery available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Live order tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>24/7 customer support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Easy returns & refunds</span>
                    </li>
                  </ul>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Accepted Payment Methods
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['💳', '📱', '🏦', '💎'].map((icon, index) => (
                      <div key={index} className="w-12 h-8 border border-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{icon}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Page