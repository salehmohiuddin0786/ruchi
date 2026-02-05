"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Shield,
  Heart,
  Clock,
  Award,
  Settings,
  Edit,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  ShoppingBag,
  Star,
  Truck,
  Package,
  Calendar,
  Gift
} from 'lucide-react'

const Page = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    profilePic: null,
    joinDate: 'January 2023',
    loyaltyPoints: 1250,
    membershipLevel: 'Gold Member'
  })

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      address: '123, Green Park Apartments, Sector 15',
      city: 'Noida, Uttar Pradesh 201301',
      phone: '+91 98765 43210',
      isDefault: true,
      type: 'home'
    },
    {
      id: 2,
      name: 'Office',
      address: '456, Tech Park, Sector 62',
      city: 'Noida, Uttar Pradesh 201309',
      phone: '+91 98765 43211',
      isDefault: false,
      type: 'office'
    },
    {
      id: 3,
      name: 'Parents House',
      address: '789, Sunrise Apartments, Sector 128',
      city: 'Noida, Uttar Pradesh 201304',
      phone: '+91 98765 43212',
      isDefault: false,
      type: 'other'
    }
  ])

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit_card',
      name: 'Visa Card',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'upi',
      name: 'Google Pay',
      id: 'john.doe@okhdfcbank',
      isDefault: false
    },
    {
      id: 3,
      type: 'wallet',
      name: 'Foodie Wallet',
      balance: '₹550',
      isDefault: false
    }
  ])

  const [preferences, setPreferences] = useState({
    notifications: {
      orderUpdates: true,
      promotions: true,
      priceDrops: false,
      newRestaurants: true,
      deliveryStatus: true
    },
    diet: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    },
    delivery: {
      contactless: true,
      leaveAtDoor: false,
      callBeforeDelivery: true
    }
  })

  const stats = {
    totalOrders: 47,
    totalSpent: '₹12,450',
    favoriteRestaurant: 'Food Palace',
    favoriteCuisine: 'North Indian',
    averageRating: 4.8,
    deliveryStreak: 5
  }

  const recentActivity = [
    { id: 1, action: 'Order placed', description: 'Food Palace', time: '2 hours ago', amount: '₹549' },
    { id: 2, action: 'Order delivered', description: 'FreshMart Groceries', time: 'Yesterday', amount: '₹329' },
    { id: 3, action: 'Added new address', description: 'Office address', time: '2 days ago' },
    { id: 4, action: 'Rated order', description: 'Pizza Corner - 5 stars', time: '3 days ago' }
  ]

  const rewards = [
    { id: 1, title: 'First Order Bonus', points: 100, status: 'earned' },
    { id: 2, title: 'Weekend Warrior', points: 250, status: 'earned' },
    { id: 3, title: 'Loyal Customer', points: 500, status: 'in-progress', progress: 75 },
    { id: 4, title: 'Food Explorer', points: 1000, status: 'locked' }
  ]

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account, preferences, and orders</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Left Column - Navigation & Quick Stats */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                      {userData.profilePic ? (
                        <img src={userData.profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-12 h-12" />
                      )}
                    </div>
                    <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{userData.name}</h2>
                  <p className="text-gray-600 text-sm mb-3">{userData.membershipLevel}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    Member since {userData.joinDate}
                  </div>

                  {/* Loyalty Points */}
                  <div className="w-full bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-gray-900">Loyalty Points</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">{userData.loyaltyPoints}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                        style={{ width: `${Math.min((userData.loyaltyPoints / 2000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">500 points to next level</p>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-1">
                  {[
                    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
                    { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-5 h-5" /> },
                    { id: 'payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
                    { id: 'orders', label: 'My Orders', icon: <ShoppingBag className="w-5 h-5" /> },
                    { id: 'favorites', label: 'Favorites', icon: <Heart className="w-5 h-5" /> },
                    { id: 'preferences', label: 'Preferences', icon: <Settings className="w-5 h-5" /> },
                    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
                    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
                    { id: 'rewards', label: 'Rewards', icon: <Gift className="w-5 h-5" /> },
                    { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-5 h-5" /> }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 last:mb-0 transition-colors duration-200 ${
                        activeTab === item.id
                          ? 'bg-orange-50 text-orange-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                      {item.id === 'orders' && (
                        <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {stats.totalOrders}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Total Orders</span>
                    <span className="font-bold text-xl">{stats.totalOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Total Spent</span>
                    <span className="font-bold">{stats.totalSpent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Avg. Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold">{stats.averageRating}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-blue-400">
                    <div className="text-sm text-blue-200">
                      Delivery streak: {stats.deliveryStreak} days 🔥
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                      <button className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            {userData.name}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {userData.phone}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                          <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                            {userData.membershipLevel}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {userData.email}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {userData.joinDate}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-green-700 font-semibold">
                            ✅ Verified Account
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                              <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{activity.action}</h4>
                              <p className="text-sm text-gray-600">{activity.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">{activity.time}</div>
                            {activity.amount && (
                              <div className="font-semibold text-gray-900">{activity.amount}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Add New Address
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-xl p-5 hover:border-orange-300 transition-colors duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-900">{address.name}</span>
                                {address.isDefault && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  address.type === 'home' ? 'bg-blue-100 text-blue-600' :
                                  address.type === 'office' ? 'bg-purple-100 text-purple-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  <MapPin className="w-4 h-4" />
                                </div>
                                <span className="capitalize">{address.type}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg">
                                <Edit className="w-4 h-4" />
                              </button>
                              {!address.isDefault && (
                                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                  <Lock className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>{address.address}</p>
                            <p>{address.city}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Phone className="w-4 h-4" />
                              {address.phone}
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-4">
                            {!address.isDefault && (
                              <button className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                                Set as Default
                              </button>
                            )}
                            <button className="text-sm font-semibold text-gray-600 hover:text-gray-700">
                              Use This Address
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Add New Card
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{method.name}</h4>
                              <p className="text-sm text-gray-600">
                                {method.type === 'credit_card' ? `•••• ${method.last4} • Expires ${method.expiry}` :
                                 method.type === 'upi' ? `ID: ${method.id}` :
                                 `Balance: ${method.balance}`}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            {method.isDefault && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                                Default
                              </span>
                            )}
                            <div className="flex gap-2">
                              <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg">
                                <Edit className="w-4 h-4" />
                              </button>
                              {!method.isDefault && (
                                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                  <Lock className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Payment Security */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Payment Security</h4>
                          <p className="text-sm text-gray-600">Your payment information is encrypted and secure</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Your Preferences</h2>
                    
                    <div className="space-y-8">
                      {/* Diet Preferences */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Utensils className="w-5 h-5" />
                          Diet Preferences
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {Object.entries(preferences.diet).map(([key, value]) => (
                            <label key={key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={() => {}}
                                className="rounded text-orange-500"
                              />
                              <span className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Preferences */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Truck className="w-5 h-5" />
                          Delivery Preferences
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(preferences.delivery).map(([key, value]) => (
                            <label key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={() => {}}
                                  className="rounded text-orange-500"
                                />
                                <span className="font-medium text-gray-900">
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </span>
                              </div>
                              {key === 'contactless' && (
                                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">Recommended</span>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Notification Preferences */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Bell className="w-5 h-5" />
                          Notification Preferences
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(preferences.notifications).map(([key, value]) => (
                            <label key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={() => {}}
                                  className="rounded text-orange-500"
                                />
                                <span className="font-medium text-gray-900">
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </span>
                              </div>
                              {key === 'orderUpdates' && (
                                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">Important</span>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rewards Tab */}
              {activeTab === 'rewards' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Loyalty Rewards</h2>
                        <p className="text-purple-100">Earn points with every order and unlock exclusive benefits</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-1">{userData.loyaltyPoints}</div>
                        <div className="text-purple-200">Total Points</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Available Rewards</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {rewards.map((reward) => (
                        <div key={reward.id} className={`p-5 border rounded-xl ${
                          reward.status === 'earned' ? 'border-green-300 bg-green-50' :
                          reward.status === 'in-progress' ? 'border-yellow-300 bg-yellow-50' :
                          'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                reward.status === 'earned' ? 'bg-green-100' :
                                reward.status === 'in-progress' ? 'bg-yellow-100' :
                                'bg-gray-100'
                              }`}>
                                <Gift className={`w-5 h-5 ${
                                  reward.status === 'earned' ? 'text-green-600' :
                                  reward.status === 'in-progress' ? 'text-yellow-600' :
                                  'text-gray-400'
                                }`} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                                <div className="flex items-center gap-2 text-sm">
                                  <Award className="w-4 h-4 text-yellow-500" />
                                  <span className="font-semibold">{reward.points} points</span>
                                </div>
                              </div>
                            </div>
                            
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                              reward.status === 'earned' ? 'bg-green-100 text-green-700' :
                              reward.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-500'
                            }`}>
                              {reward.status === 'earned' ? 'Claimed' :
                               reward.status === 'in-progress' ? `${reward.progress}%` :
                               'Locked'}
                            </span>
                          </div>
                          
                          {reward.status === 'in-progress' && (
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                              <div 
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                                style={{ width: `${reward.progress}%` }}
                              ></div>
                            </div>
                          )}
                          
                          {reward.status === 'earned' && (
                            <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                              Use Reward
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Default Content for other tabs */}
              {['orders', 'favorites', 'notifications', 'security', 'help'].includes(activeTab) && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    {activeTab === 'orders' && <ShoppingBag className="w-12 h-12 text-gray-400" />}
                    {activeTab === 'favorites' && <Heart className="w-12 h-12 text-gray-400" />}
                    {activeTab === 'notifications' && <Bell className="w-12 h-12 text-gray-400" />}
                    {activeTab === 'security' && <Shield className="w-12 h-12 text-gray-400" />}
                    {activeTab === 'help' && <HelpCircle className="w-12 h-12 text-gray-400" />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {activeTab === 'orders' && 'View and manage all your past and current orders'}
                    {activeTab === 'favorites' && 'Browse your saved restaurants and grocery stores'}
                    {activeTab === 'notifications' && 'Manage your notification preferences'}
                    {activeTab === 'security' && 'Update your password and security settings'}
                    {activeTab === 'help' && 'Get help with orders, deliveries, and account issues'}
                  </p>
                  <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300">
                    Go to {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 font-semibold">
              <LogOut className="w-5 h-5" />
              Logout from all devices
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Page