import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Tag, 
  Percent, 
  Clock, 
  ShoppingBag, 
  Coffee, 
  Pizza, 
  ShoppingCart, 
  Truck,
  Shield,
  Star
} from 'lucide-react'

const Page = () => {
  // Featured offers data
  const featuredOffers = [
    {
      id: 1,
      title: "First Order Discount",
      discount: "40% OFF",
      description: "Get 40% off on your first grocery order",
      code: "FIRST40",
      validUntil: "31 Dec 2024",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
      category: "groceries"
    },
    {
      id: 2,
      title: "Free Delivery",
      discount: "FREE",
      description: "Free delivery on all restaurant orders above ₹299",
      code: "FREEDEL",
      validUntil: "Ongoing",
      icon: <Truck className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-600",
      category: "delivery"
    },
    {
      id: 3,
      title: "Weekend Special",
      discount: "30% OFF",
      description: "30% off on all pizza orders this weekend",
      code: "WEEKEND30",
      validUntil: "Every Weekend",
      icon: <Pizza className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      category: "restaurants"
    }
  ]

  // Restaurant deals
  const restaurantDeals = [
    {
      id: 1,
      restaurant: "Food Palace",
      deal: "Buy 1 Get 1 Free",
      cuisine: "North Indian",
      deliveryTime: "25-35 mins",
      rating: 4.3,
      minOrder: "₹199"
    },
    {
      id: 2,
      restaurant: "Pizza Corner",
      deal: "30% OFF on all pizzas",
      cuisine: "Italian",
      deliveryTime: "20-30 mins",
      rating: 4.5,
      minOrder: "₹249"
    },
    {
      id: 3,
      restaurant: "Burger Hub",
      deal: "Combo Meal at ₹199",
      cuisine: "Fast Food",
      deliveryTime: "15-25 mins",
      rating: 4.2,
      minOrder: "₹149"
    },
    {
      id: 4,
      restaurant: "Sushi Express",
      deal: "Lunch Special - 25% OFF",
      cuisine: "Japanese",
      deliveryTime: "30-40 mins",
      rating: 4.4,
      minOrder: "₹299"
    }
  ]

  // Grocery offers
  const groceryOffers = [
    {
      id: 1,
      category: "Fresh Vegetables",
      offer: "20% OFF",
      items: "On all fresh vegetables",
      delivery: "Within 2 hours",
      icon: "🥦"
    },
    {
      id: 2,
      category: "Daily Essentials",
      offer: "Buy 2 Get 1 Free",
      items: "Milk, Bread, Eggs",
      delivery: "Within 1 hour",
      icon: "🥛"
    },
    {
      id: 3,
      category: "Beverages",
      offer: "15% OFF",
      items: "Cold drinks & Juices",
      delivery: "Within 90 mins",
      icon: "🥤"
    },
    {
      id: 4,
      category: "Snacks",
      offer: "Flat ₹50 OFF",
      items: "Above ₹199 purchase",
      delivery: "Within 1 hour",
      icon: "🍿"
    }
  ]

  // Delivery benefits
  const deliveryBenefits = [
    {
      id: 1,
      title: "Express Delivery",
      description: "Get groceries in 30 minutes",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Contactless Delivery",
      description: "Safe and hygienic delivery",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 3,
      title: "No Surge Pricing",
      description: "Same delivery fee always",
      icon: <Tag className="w-5 h-5" />
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Exclusive Offers & Deals
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing discounts on restaurants, groceries, and enjoy fast delivery 
              with our special offers
            </p>
          </div>

          {/* Featured Offers */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Offers</h2>
              <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-2">
                View All <span>→</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredOffers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className={`h-2 bg-gradient-to-r ${offer.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br bg-gray-50">
                        {offer.icon}
                      </div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full">
                        {offer.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-green-600">{offer.discount}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Use code</div>
                        <div className="text-lg font-mono font-bold text-gray-900">{offer.code}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Valid till: {offer.validUntil}
                      </div>
                    </div>
                    
                    <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
                      Grab Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurant Deals */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Coffee className="w-8 h-8" /> Restaurant Deals
              </h2>
              <button className="text-orange-600 font-semibold hover:text-orange-700">
                View all restaurants →
              </button>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {restaurantDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{deal.restaurant}</h3>
                        <p className="text-gray-500 text-sm">{deal.cuisine}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        ⭐ {deal.rating}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 font-semibold rounded-full text-sm">
                        {deal.deal}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span className="font-semibold">{deal.deliveryTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min. Order</span>
                        <span className="font-semibold">{deal.minOrder}</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grocery Offers */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-8 h-8" /> Grocery Offers
              </h2>
              <button className="text-orange-600 font-semibold hover:text-orange-700">
                View all groceries →
              </button>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {groceryOffers.map((offer) => (
                <div key={offer.id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{offer.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{offer.category}</h3>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-green-600">{offer.offer}</span>
                    <p className="text-gray-600 text-sm mt-1">{offer.items}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Truck className="w-4 h-4" />
                    {offer.delivery}
                  </div>
                  <button className="w-full mt-4 border-2 border-green-600 text-green-600 py-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
                    Shop Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Delivery</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {deliveryBenefits.map((benefit) => (
                <div key={benefit.id} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex p-3 rounded-full bg-orange-100 text-orange-600 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
            <p className="text-orange-100 text-lg mb-6 max-w-2xl mx-auto">
              Get additional 10% off on your first app order. Plus, enjoy exclusive 
              app-only deals and faster checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300">
                Download on App Store
              </button>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Get it on Google Play
              </button>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Page