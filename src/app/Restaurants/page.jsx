"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Star, Clock, DollarSign, MapPin, 
  ChevronRight, Heart, CheckCircle, Truck, Shield,
  Zap, Flame, Leaf, Sparkles, Award, Coffee, Pizza,
  Sandwich, Salad, Cake, ChefHat, ThumbsUp,
  TrendingUp, ShoppingBag, Navigation, Thermometer,
  Users, Crown, Rocket, Percent, Tag, Bell, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RestaurantsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Toggle favorite restaurant
  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  // Categories with Lucide icons
  const categories = [
    { id: 'all', label: 'All', icon: '🍽️', count: 45, lucideIcon: ChefHat },
    { id: 'fast-food', label: 'Fast Food', icon: '🍔', count: 12, lucideIcon: Sandwich },
    { id: 'italian', label: 'Italian', icon: '🍕', count: 8, lucideIcon: Pizza },
    { id: 'asian', label: 'Asian', icon: '🍜', count: 10, lucideIcon: ChefHat },
    { id: 'indian', label: 'Indian', icon: '🍛', count: 6, lucideIcon: Flame },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥗', count: 5, lucideIcon: Leaf },
    { id: 'dessert', label: 'Desserts', icon: '🍰', count: 4, lucideIcon: Cake },
    { id: 'coffee', label: 'Cafés', icon: '☕', count: 7, lucideIcon: Coffee },
  ];

  // Price ranges
  const priceRanges = [
    { id: 'all', label: 'All Price', icon: DollarSign },
    { id: 'low', label: '$', description: 'Budget', icon: DollarSign },
    { id: 'medium', label: '$$', description: 'Moderate', icon: DollarSign },
    { id: 'high', label: '$$$', description: 'Premium', icon: Crown },
  ];

  // Sort options
  const sortOptions = [
    { id: 'recommended', label: 'Recommended', icon: ThumbsUp },
    { id: 'rating', label: 'Highest Rated', icon: Star },
    { id: 'delivery-time', label: 'Fastest Delivery', icon: Rocket },
    { id: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', label: 'Price: High to Low', icon: TrendingUp },
  ];

  // Sample restaurants data
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian • Pizza",
      rating: 4.8,
      reviewCount: 1245,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.99",
      minOrder: "$15",
      tags: ["🔥 Hot & Fresh", "⭐ Top Rated", "🚚 Free Delivery"],
      priceRange: "$$",
      distance: "1.2 mi",
      featured: true,
      offers: ["20% OFF", "Free Delivery"],
      color: "from-orange-100 to-red-100",
      trending: true,
    },
    {
      id: 2,
      name: "Burger Hub",
      cuisine: "American • Burgers",
      rating: 4.6,
      reviewCount: 892,
      deliveryTime: "15-25 min",
      deliveryFee: "Free",
      minOrder: "$10",
      tags: ["🔥 Bestseller", "💚 Healthy Options"],
      priceRange: "$",
      distance: "0.8 mi",
      featured: true,
      offers: ["Buy 1 Get 1 Free"],
      color: "from-amber-100 to-yellow-100",
      trending: true,
    },
    {
      id: 3,
      name: "Sushi Master",
      cuisine: "Japanese • Sushi",
      rating: 4.9,
      reviewCount: 2103,
      deliveryTime: "30-40 min",
      deliveryFee: "$3.99",
      minOrder: "$20",
      tags: ["⭐ Premium", "🎌 Authentic"],
      priceRange: "$$$",
      distance: "2.1 mi",
      offers: ["Free Miso Soup"],
      color: "from-blue-50 to-teal-50",
      chefChoice: true,
    },
    {
      id: 4,
      name: "Green Leaf Cafe",
      cuisine: "Vegetarian • Healthy",
      rating: 4.7,
      reviewCount: 567,
      deliveryTime: "25-35 min",
      deliveryFee: "Free",
      minOrder: "$12",
      tags: ["💚 100% Vegan", "🥗 Superfood Salads"],
      priceRange: "$$",
      distance: "1.5 mi",
      offers: ["15% OFF Vegan"],
      color: "from-emerald-50 to-green-50",
      healthy: true,
    },
    {
      id: 5,
      name: "Spice Garden",
      cuisine: "Indian • Curry",
      rating: 4.5,
      reviewCount: 1342,
      deliveryTime: "35-45 min",
      deliveryFee: "$1.99",
      minOrder: "$18",
      tags: ["🌶️ Extra Spicy", "⭐ Family Favorite"],
      priceRange: "$$",
      distance: "2.3 mi",
      offers: ["Free Naan"],
      color: "from-red-50 to-orange-50",
      spicy: true,
    },
    {
      id: 6,
      name: "Sweet Tooth",
      cuisine: "Desserts • Bakery",
      rating: 4.4,
      reviewCount: 421,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.49",
      minOrder: "$8",
      tags: ["🍰 Artisan Desserts", "🚚 Free over $20"],
      priceRange: "$",
      distance: "1.8 mi",
      offers: ["Free Cookie"],
      color: "from-pink-50 to-rose-50",
    },
  ];

  // Filter restaurants based on selections
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedCategory !== 'all' && selectedCategory !== restaurant.cuisine.toLowerCase().split(' ')[0]) {
      return false;
    }
    
    if (priceFilter !== 'all') {
      if (priceFilter === 'low' && restaurant.priceRange !== '$') return false;
      if (priceFilter === 'medium' && restaurant.priceRange !== '$$') return false;
      if (priceFilter === 'high' && restaurant.priceRange !== '$$$') return false;
    }
    
    if (ratingFilter > 0 && restaurant.rating < ratingFilter) {
      return false;
    }
    
    if (searchQuery && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'delivery-time':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'price-low':
        return a.priceRange.length - b.priceRange.length;
      case 'price-high':
        return b.priceRange.length - a.priceRange.length;
      default:
        return 0;
    }
  });

  return (
    <>
      <Navbar />
      
      {/* Main Container with White Background */}
      <div className="bg-white min-h-screen">
        {/* Hero Section - Keep colorful gradient */}
        <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-white/90" />
                <span className="text-white/90 font-medium">Discover & Order</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Taste the <span className="text-yellow-200">Best</span> Restaurants<br />
                in Your <span className="text-yellow-200">City</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 max-w-2xl">
                From sizzling street food to gourmet dining experiences. 
                Fresh, fast, and delivered to your door.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-8">
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-white">30min</div>
                    <div className="text-white/80">Avg. Delivery</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-white">500+</div>
                    <div className="text-white/80">Restaurants</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-white">4.8</div>
                    <div className="text-white/80">Avg. Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Offers Bar */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { icon: Percent, text: "50% OFF First Order", color: "bg-gradient-to-r from-red-500 to-pink-500" },
                { icon: Truck, text: "Free Delivery", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
                { icon: Star, text: "Top Rated", color: "bg-gradient-to-r from-yellow-500 to-amber-500" },
                { icon: Zap, text: "Fast Delivery", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
              ].map((offer, index) => (
                <div key={index} className={`flex items-center gap-2 px-4 py-2 ${offer.color} rounded-full shadow-lg`}>
                  <offer.icon className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold">{offer.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
          {/* Search and Filter Bar */}
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
              {/* Categories */}
              <div className="w-full overflow-x-auto pb-4">
                <div className="flex gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.lucideIcon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:-translate-y-1 min-w-[100px] ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <div className={`p-3 rounded-full ${
                          selectedCategory === category.id
                            ? 'bg-white/20'
                            : 'bg-white shadow-sm'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            selectedCategory === category.id
                              ? 'text-white'
                              : 'text-gray-600'
                          }`} />
                        </div>
                        <span className="font-semibold text-sm">{category.label}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedCategory === category.id
                            ? 'bg-white/20'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort and Filter */}
              <div className="flex items-center gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative flex-1 lg:flex-none lg:w-80">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur-sm opacity-30"></div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search restaurants, cuisine, dishes..."
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-white"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-500">×</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filters</span>
                  {(priceFilter !== 'all' || ratingFilter > 0) && (
                    <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {(priceFilter !== 'all' ? 1 : 0) + (ratingFilter > 0 ? 1 : 0)}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {sortOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <option key={option.id} value={option.id} className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-500">↓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Panel (Mobile) */}
            {showFilters && (
              <div className="lg:hidden mt-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filter Options</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      Price Range
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {priceRanges.map((range) => {
                        const IconComponent = range.icon;
                        return (
                          <button
                            key={range.id}
                            onClick={() => setPriceFilter(range.id)}
                            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                              priceFilter === range.id
                                ? 'border-red-500 bg-red-50 shadow-md'
                                : 'border-gray-200 hover:border-gray-300 hover:shadow'
                            }`}
                          >
                            <IconComponent className={`w-6 h-6 mb-2 ${
                              priceFilter === range.id ? 'text-red-600' : 'text-gray-600'
                            }`} />
                            <span className="font-bold text-lg">{range.label}</span>
                            {range.description && (
                              <span className="text-xs text-gray-500 mt-1">{range.description}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      Minimum Rating
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                          className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                            ratingFilter === rating
                              ? 'border-red-500 bg-red-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(rating)
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`font-bold ${
                            ratingFilter === rating ? 'text-red-600' : 'text-gray-700'
                          }`}>
                            {rating}+
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => {
                      setPriceFilter('all');
                      setRatingFilter(0);
                    }}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-red-500 hover:text-red-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Price Filter Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Price Range</h3>
                  </div>
                  <div className="space-y-3">
                    {priceRanges.map((range) => {
                      const IconComponent = range.icon;
                      return (
                        <button
                          key={range.id}
                          onClick={() => setPriceFilter(range.id)}
                          className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                            priceFilter === range.id
                              ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-600 border-2 border-red-200'
                              : 'hover:bg-gray-50 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${
                              priceFilter === range.id
                                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold">{range.label}</div>
                              {range.description && (
                                <div className="text-sm text-gray-500">{range.description}</div>
                              )}
                            </div>
                          </div>
                          {priceFilter === range.id && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating Filter Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Ratings</h3>
                  </div>
                  <div className="space-y-3">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                        className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                          ratingFilter === rating
                            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-600 border-2 border-yellow-200'
                            : 'hover:bg-gray-50 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            ratingFilter === rating
                              ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <Star className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(rating)
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-semibold">{rating}+</span>
                          </div>
                        </div>
                        {ratingFilter === rating && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features Filter Card */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">Features</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Free Delivery', icon: Truck, color: 'from-green-500 to-emerald-500' },
                      { label: 'Top Rated', icon: Star, color: 'from-yellow-500 to-amber-500' },
                      { label: 'Fast Delivery', icon: Rocket, color: 'from-blue-500 to-cyan-500' },
                      { label: 'Vegetarian', icon: Leaf, color: 'from-emerald-500 to-green-500' },
                    ].map((feature) => (
                      <button
                        key={feature.label}
                        className="flex items-center gap-4 w-full p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">{feature.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Restaurant Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <ChefHat className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {sortedRestaurants.length} Amazing Restaurants
                        </h2>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Navigation className="w-4 h-4" />
                          {selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.label} • `}
                          {priceFilter !== 'all' && `${priceRanges.find(p => p.id === priceFilter)?.description} • `}
                          {ratingFilter > 0 && `Rating ${ratingFilter}+`}
                          {!selectedCategory && !priceFilter && !ratingFilter && 'All available near you'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    <ShoppingBag className="w-5 h-5" />
                    View All Deals
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Restaurant Grid */}
              {sortedRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedRestaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-red-200 transition-all duration-500 transform hover:-translate-y-2"
                    >
                      {/* Restaurant Image Header */}
                      <div className="relative h-56 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${restaurant.color} animate-gradient`} />
                        
                        {/* Featured Badge */}
                        {restaurant.featured && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <Award className="w-3 h-3" />
                            Featured
                          </div>
                        )}
                        
                        {/* Trending Badge */}
                        {restaurant.trending && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </div>
                        )}
                        
                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(restaurant.id)}
                          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                        >
                          <Heart
                            className={`w-5 h-5 transition-all ${
                              favorites.has(restaurant.id)
                                ? 'text-red-500 fill-red-500 scale-110'
                                : 'text-gray-400 group-hover:text-red-400'
                            }`}
                          />
                        </button>
                        
                        {/* Offers */}
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          {restaurant.offers.map((offer, index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
                            >
                              {offer}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Restaurant Info */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-gray-900 group-hover:text-red-600 transition-colors">
                              {restaurant.name}
                            </h3>
                            <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                              <ChefHat className="w-4 h-4 text-gray-400" />
                              {restaurant.cuisine}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-2 rounded-xl">
                              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                              <span className="font-bold text-lg">{restaurant.rating}</span>
                              <span className="text-gray-500 text-sm">({restaurant.reviewCount})</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {restaurant.distance}
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {restaurant.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Delivery Info */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Delivery Time</div>
                                <div className="font-semibold text-gray-900">{restaurant.deliveryTime}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Delivery Fee</div>
                                <div className="font-semibold text-gray-900">{restaurant.deliveryFee}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button className="group/btn w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-3">
                          <span>View Full Menu</span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="w-32 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">No restaurants found</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Try adjusting your search or filters. We have many amazing restaurants waiting for you!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceFilter('all');
                      setRatingFilter(0);
                      setSearchQuery('');
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3 mx-auto"
                  >
                    <Filter className="w-5 h-5" />
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Load More */}
              {sortedRestaurants.length > 0 && (
                <div className="text-center mt-12">
                  <button className="group px-10 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-red-500 hover:text-red-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3 mx-auto">
                    <span>Load More Restaurants</span>
                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-red-50 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 group-hover:text-red-600 transition-colors" />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Promotion Banner */}
          <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-10 text-white">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-8 lg:mb-0 lg:mr-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Percent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">Limited Time Offer!</h3>
                </div>
                <h3 className="text-4xl font-black mb-4">Get 50% OFF Your First Order!</h3>
                <p className="text-white/90 mb-6 text-lg">Use code: <span className="font-black text-yellow-200">WELCOME50</span> • Valid for new users only</p>
                <button className="group px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3">
                  <span>Claim Your Deal Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black">500+</div>
                  <div className="text-white/80 text-sm">Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black">30min</div>
                  <div className="text-white/80 text-sm">Avg. Delivery</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div className="text-4xl font-black">4.8★</div>
                  <div className="text-white/80 text-sm">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      <style jsx>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default RestaurantsPage;