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
  Trash2
} from 'lucide-react'

const Page = () => {
  const [activeTab, setActiveTab] = useState('active')
  
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

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Orders</h1>
            <p className="text-gray-600">Track and manage all your orders in one place</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Order List */}
            <div className="lg:col-span-2">
              
              {/* Order Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`flex-1 py-3 px-4 text-center font-semibold ${
                    activeTab === 'active'
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Active Orders ({orders.active.length})
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex-1 py-3 px-4 text-center font-semibold ${
                    activeTab === 'past'
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Past Orders ({orders.past.length})
                </button>
              </div>

              {/* Orders List */}
              <div className="space-y-6">
                {orders[activeTab].map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* Order Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            {order.type === 'Restaurant' ? (
                              <div className="p-2 bg-orange-100 rounded-lg">
                                <ShoppingBag className="w-5 h-5 text-orange-600" />
                              </div>
                            ) : (
                              <div className="p-2 bg-green-100 rounded-lg">
                                <Package className="w-5 h-5 text-green-600" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-bold text-gray-900">{order.id}</h3>
                              <p className="text-sm text-gray-500">
                                {order.type === 'Restaurant' ? order.restaurant : order.store}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-bold text-gray-900">{order.total}</span>
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'on_the_way'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {order.status === 'delivered' && <CheckCircle className="w-4 h-4" />}
                            {order.status === 'on_the_way' && <Truck className="w-4 h-4" />}
                            {order.statusText}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2">
                            <span className="text-gray-700">
                              {item.quantity} × {item.name}
                            </span>
                            {order.type === 'Grocery' && (
                              <span className="text-sm text-gray-500">Fresh</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      {activeTab === 'active' ? (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2">
                              <Phone className="w-4 h-4" />
                              Call Driver
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              Message
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300">
                              Track Order
                            </button>
                          </div>

                          {/* Driver Info for Active Orders */}
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
            <div className="space-y-6">
              
              {/* Order Tracking */}
              {activeTab === 'active' && orders.active.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Order Tracking
                  </h3>
                  
                  <div className="relative">
                    {orderSteps.map((step, index) => (
                      <div key={step.id} className="flex items-start mb-8 last:mb-0">
                        <div className="relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-500 text-white'
                              : step.active
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-200'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-sm font-semibold">{step.id}</span>
                            )}
                          </div>
                          {index < orderSteps.length - 1 && (
                            <div className={`absolute top-8 left-4 w-0.5 h-12 ${
                              step.completed ? 'bg-green-500' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>
                        <div className="ml-4">
                          <h4 className={`font-semibold ${
                            step.active ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-500">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </h3>
                  <button className="text-sm text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">{deliveryAddress.name}</p>
                  <p className="text-gray-600">{deliveryAddress.address}</p>
                  <p className="text-gray-600">{deliveryAddress.city}</p>
                  <p className="text-gray-600">{deliveryAddress.phone}</p>
                </div>
                
                {deliveryAddress.default && (
                  <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    Default Address
                  </span>
                )}
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </h3>
                  <button className="text-sm text-orange-600 font-semibold hover:text-orange-700">
                    Add New
                  </button>
                </div>
                
                <div className="space-y-3">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {method.type === 'credit_card' ? `Credit Card •••• ${method.last4}` :
                             method.type === 'upi' ? `UPI - ${method.id}` :
                             method.text}
                          </p>
                        </div>
                      </div>
                      {method.default && (
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Having issues with your order? We're here to help!
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat with Support
                  </button>
                  <button className="w-full border-2 border-white text-white bg-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Support: 1800-123-456
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