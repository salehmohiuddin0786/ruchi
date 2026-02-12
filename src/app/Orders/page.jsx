"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  CreditCard, 
  Truck, 
  CheckCircle,
  Package,
  ChevronRight,
  AlertCircle,
  Star,
  Phone,
  MessageCircle,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const Page = () => {
  const [activeTab, setActiveTab] = useState('active')
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    tracking: true,
    address: true,
    payment: true
  })

  // Sample order data
  const orders = {
    active: [
      {
        id: '#ORD-789456',
        type: 'Restaurant',
        restaurant: 'Food Palace',
        items: [
          { name: 'Butter Chicken', quantity: 1 },
          { name: 'Garlic Naan', quantity: 2 },
          { name: 'Cold Drink', quantity: 1 }
        ],
        total: '₹549',
        status: 'preparing',
        statusText: 'Preparing your order',
        time: '25-35 mins',
        estimatedDelivery: '7:30 PM',
        driver: {
          name: 'Rajesh Kumar',
          rating: 4.8,
          phone: '+91 98765 43210'
        }
      },
      {
        id: '#ORD-123456',
        type: 'Grocery',
        store: 'FreshMart Supermarket',
        items: [
          { name: 'Fresh Vegetables Pack', quantity: 1 },
          { name: 'Milk - 1L', quantity: 2 },
          { name: 'Bread', quantity: 1 },
          { name: 'Eggs - Dozen', quantity: 1 }
        ],
        total: '₹329',
        status: 'on_the_way',
        statusText: 'Out for delivery',
        time: '10-15 mins',
        estimatedDelivery: '7:15 PM',
        driver: {
          name: 'Amit Sharma',
          rating: 4.9,
          phone: '+91 98765 43211'
        }
      }
    ],
    past: [
      {
        id: '#ORD-654321',
        type: 'Restaurant',
        restaurant: 'Pizza Corner',
        items: [
          { name: 'Margherita Pizza', quantity: 1 },
          { name: 'Garlic Bread', quantity: 1 }
        ],
        total: '₹449',
        status: 'delivered',
        statusText: 'Delivered on Dec 20',
        time: 'Yesterday, 7:45 PM',
        rating: 4,
        review: 'Food was hot and delicious!'
      },
      {
        id: '#ORD-321654',
        type: 'Grocery',
        store: 'Daily Needs',
        items: [
          { name: 'Rice - 5kg', quantity: 1 },
          { name: 'Cooking Oil', quantity: 1 }
        ],
        total: '₹689',
        status: 'delivered',
        statusText: 'Delivered on Dec 19',
        time: '2 days ago, 6:30 PM',
        rating: 5,
        review: 'Fresh products, fast delivery'
      }
    ]
  }

  const deliveryAddress = {
    name: 'John Doe',
    address: '123, Green Park Apartments, Sector 15',
    city: 'Noida, Uttar Pradesh 201301',
    phone: '+91 98765 43210',
    default: true
  }

  const paymentMethods = [
    { type: 'credit_card', last4: '4242', default: true },
    { type: 'upi', id: 'john.doe@okhdfcbank' },
    { type: 'cash', text: 'Cash on Delivery' }
  ]

  const orderSteps = [
    { id: 1, title: 'Order Placed', time: '6:45 PM', active: true, completed: true },
    { id: 2, title: 'Order Confirmed', time: '6:50 PM', active: true, completed: true },
    { id: 3, title: 'Preparing Food', time: '7:00 PM', active: true, completed: true },
    { id: 4, title: 'Out for Delivery', time: '7:15 PM', active: true, completed: false },
    { id: 5, title: 'Delivered', time: 'Estimated 7:30 PM', active: false, completed: false }
  ]

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'on_the_way': return 'bg-blue-100 text-blue-700'
      default: return 'bg-orange-100 text-orange-700'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'on_the_way': return <Truck className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          
          {/* Mobile Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Your Orders
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Track and manage all your orders in one place
            </p>
          </div>

          {/* Mobile Order Stats - Quick Summary */}
          <div className="lg:hidden grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold">Active</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{orders.active.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Completed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{orders.past.length}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column - Order List */}
            <div className="lg:col-span-2">
              
              {/* Order Tabs - Mobile Optimized */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`flex-1 py-3 px-2 sm:px-4 text-center text-sm sm:text-base font-semibold transition-colors relative ${
                    activeTab === 'active'
                      ? 'text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Active Orders ({orders.active.length})
                  {activeTab === 'active' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex-1 py-3 px-2 sm:px-4 text-center text-sm sm:text-base font-semibold transition-colors relative ${
                    activeTab === 'past'
                      ? 'text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Past Orders ({orders.past.length})
                  {activeTab === 'past' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></span>
                  )}
                </button>
              </div>

              {/* Orders List - Mobile Optimized */}
              <div className="space-y-4 sm:space-y-6">
                {orders[activeTab].map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    {/* Order Header - Always Visible */}
                    <div 
                      className="p-4 sm:p-6 border-b border-gray-100 cursor-pointer lg:cursor-default"
                      onClick={() => toggleOrderExpand(order.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          {/* Icon - Responsive */}
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            order.type === 'Restaurant' ? 'bg-orange-100' : 'bg-green-100'
                          }`}>
                            {order.type === 'Restaurant' ? (
                              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            ) : (
                              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                              {order.id}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              {order.type === 'Restaurant' ? order.restaurant : order.store}
                            </p>
                          </div>
                        </div>

                        {/* Mobile Expand/Collapse Icon */}
                        <button className="lg:hidden">
                          {expandedOrder === order.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>

                      {/* Order Summary - Always Visible */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg sm:text-2xl font-bold text-gray-900">
                          {order.total}
                        </span>
                        <div className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="truncate max-w-[120px] sm:max-w-none">
                            {order.statusText}
                          </span>
                        </div>
                      </div>

                      {/* Mobile: Show minimal info when collapsed */}
                      {expandedOrder !== order.id && (
                        <div className="mt-2 text-xs text-gray-500 lg:hidden">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    {/* Expanded Content - Mobile Only */}
                    {(expandedOrder === order.id) && (
                      <div className="p-4 sm:p-6 border-t border-gray-100 lg:hidden">
                        {/* Order Items */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                            Order Items
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">
                                  {item.quantity} × {item.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {activeTab === 'active' ? (
                          <>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              <button className="bg-orange-500 text-white py-2.5 px-3 rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call
                              </button>
                              <button className="border border-gray-300 text-gray-700 py-2.5 px-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Message
                              </button>
                            </div>
                            
                            <button className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors mb-4">
                              Track Order
                            </button>

                            {/* Driver Info */}
                            {order.driver && (
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Truck className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                                      {order.driver.name}
                                    </h4>
                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                      <span>{order.driver.rating} • Est. {order.estimatedDelivery}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < order.rating ? 'fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">
                                Reorder
                              </button>
                            </div>
                            {order.review && (
                              <p className="mt-2 text-sm text-gray-600">"{order.review}"</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Desktop View - Always Expanded */}
                    <div className="hidden lg:block p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-700">
                              {item.quantity} × {item.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Desktop Action Buttons */}
                      {activeTab === 'active' ? (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex gap-3">
                            <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                              <Phone className="w-4 h-4" />
                              Call Driver
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              Message
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                              Track Order
                            </button>
                          </div>

                          {order.driver && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{order.driver.name}</h4>
                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                      {order.driver.rating} • Estimated delivery: {order.estimatedDelivery}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${i < order.rating ? 'fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                              <span className="ml-2 text-gray-700">{order.rating}/5</span>
                            </div>
                            <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">
                              Reorder
                            </button>
                          </div>
                          {order.review && (
                            <p className="mt-3 text-gray-600 italic">"{order.review}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Order Tracking & Info */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* Order Tracking - Mobile Collapsible */}
              {activeTab === 'active' && orders.active.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div 
                    className="p-4 sm:p-6 flex items-center justify-between cursor-pointer lg:cursor-default"
                    onClick={() => toggleSection('tracking')}
                  >
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>Order Tracking</span>
                    </h3>
                    <button className="lg:hidden">
                      {expandedSections.tracking ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  
                  {(expandedSections.tracking || window.innerWidth >= 1024) && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="relative">
                        {orderSteps.map((step, index) => (
                          <div key={step.id} className="flex items-start mb-6 last:mb-0">
                            <div className="relative flex-shrink-0">
                              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                                step.completed 
                                  ? 'bg-green-500 text-white'
                                  : step.active
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-200'
                              }`}>
                                {step.completed ? (
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                ) : (
                                  <span className="text-xs sm:text-sm font-semibold">{step.id}</span>
                                )}
                              </div>
                              {index < orderSteps.length - 1 && (
                                <div className={`absolute top-6 sm:top-8 left-3 sm:left-4 w-0.5 h-8 sm:h-12 ${
                                  step.completed ? 'bg-green-500' : 'bg-gray-200'
                                }`}></div>
                              )}
                            </div>
                            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                              <h4 className={`text-sm sm:text-base font-semibold truncate ${
                                step.active ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {step.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-500">{step.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Address - Mobile Collapsible */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div 
                  className="p-4 sm:p-6 flex items-center justify-between cursor-pointer lg:cursor-default"
                  onClick={() => toggleSection('address')}
                >
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Delivery Address</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-orange-600 font-semibold hover:text-orange-700 hidden lg:flex items-center gap-1">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="lg:hidden">
                      {expandedSections.address ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                
                {(expandedSections.address || window.innerWidth >= 1024) && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <p className="font-semibold text-gray-900">{deliveryAddress.name}</p>
                      <p className="text-gray-600">{deliveryAddress.address}</p>
                      <p className="text-gray-600">{deliveryAddress.city}</p>
                      <p className="text-gray-600">{deliveryAddress.phone}</p>
                    </div>
                    
                    {deliveryAddress.default && (
                      <span className="inline-block mt-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Default Address
                      </span>
                    )}

                    {/* Mobile Edit Button */}
                    <button className="lg:hidden w-full mt-4 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Address
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Methods - Mobile Collapsible */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div 
                  className="p-4 sm:p-6 flex items-center justify-between cursor-pointer lg:cursor-default"
                  onClick={() => toggleSection('payment')}
                >
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Methods</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-orange-600 font-semibold hover:text-orange-700 hidden lg:block">
                      Add New
                    </button>
                    <button className="lg:hidden">
                      {expandedSections.payment ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                
                {(expandedSections.payment || window.innerWidth >= 1024) && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="space-y-3">
                      {paymentMethods.map((method, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                {method.type === 'credit_card' ? `Credit Card •••• ${method.last4}` :
                                 method.type === 'upi' ? `UPI - ${method.id}` :
                                 method.text}
                              </p>
                            </div>
                          </div>
                          {method.default && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded flex-shrink-0">
                              Default
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Mobile Add Payment Button */}
                    <button className="lg:hidden w-full mt-4 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                      + Add Payment Method
                    </button>
                  </div>
                )}
              </div>

              {/* Help Section - Mobile Optimized */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 sm:p-6">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2">Need Help?</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Having issues with your order? We're here to help!
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-white text-gray-900 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat with Support
                  </button>
                  <button className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call: 1800-123-456
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Page