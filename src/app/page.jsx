"use client";
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoriesSection from './components/CategoriesSection';
import WhyChooseUs from './components/WhyChooseUs';
import PopularRestaurants from './components/PopularRestaurants';
import AchievementsSection from './components/AchievementsSection';
import SpecialOffer from './components/SpecialOffer';
import { 
  Search, Star, Clock, Shield, Truck, ArrowRight, ShoppingBag, Utensils, 
  TrendingUp, Users, Award, Sparkles, Heart, Zap, ChevronRight, 
  MapPin, Gift, Phone, Mail, ChefHat, Package, ShoppingCart,
  ThumbsUp, Target, Sparkle, TrendingDown, CloudRain, Sun,
  CloudSnow, Wind, Navigation,
  Smartphone, Play, Apple as AppleIcon, Download, Tag
} from 'lucide-react';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('food');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const weatherConditions = [
    { icon: Sun, condition: "Sunny", temp: "32°C" },
    { icon: CloudRain, condition: "Rainy", temp: "26°C" },
    { icon: CloudSnow, condition: "Cool", temp: "18°C" },
    { icon: Wind, condition: "Windy", temp: "28°C" },
  ];

  return (
    <>
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-200/20 to-red-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-br from-red-200/20 to-rose-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-[#F9FAFB] via-red-50/30 to-[#F9FAFB] overflow-hidden">
        <div className="container mx-auto px-4 pt-8 pb-20 relative z-10">
          {/* Animated Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <Sparkles className="w-8 h-8 text-red-500 animate-spin-slow" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-slide-up">
              <span className="relative">
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent animate-gradient">
                  Order Food & Groceries.
                </span>
                <Heart className="absolute -top-4 -right-8 w-8 h-8 text-red-500 animate-bounce fill-red-400/20" />
              </span>
              <br />
              <span className="text-[#111827] relative">
                Discover the best restaurants.
                <Sparkle className="absolute -right-6 top-1/2 w-6 h-6 text-yellow-400 animate-pulse" />
              </span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent relative">
                  Ruchi Bazaar it!
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-500 blur opacity-20 rounded-full animate-pulse"></div>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              From local favorites to fresh groceries, everything delivered to your doorstep in minutes.
              <span className="inline-block ml-2">
                <Zap className="w-5 h-5 text-yellow-500 inline animate-pulse" />
              </span>
            </p>
          </div>

          {/* Enhanced Search Section */}
          <div className="max-w-4xl mx-auto mb-16 relative">
            {/* Weather/Trending Banner */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-red-100 rounded-full border border-red-200">
                <Navigation className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Live Tracking</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full border border-orange-200">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">Trending Now</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 rounded-full border border-red-200">
                <Target className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Fastest Delivery</span>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-400 via-red-500 to-red-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-1000"></div>
              
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-100 overflow-hidden">
                {/* Type Selector */}
                <div className="flex border-b border-red-100">
                  <button
                    onClick={() => setSelectedType('food')}
                    className={`flex-1 px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 ${selectedType === 'food' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'text-gray-600 hover:bg-red-50'}`}
                  >
                    <div className={`p-2 rounded-lg ${selectedType === 'food' ? 'bg-white/20' : 'bg-red-100'}`}>
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Food Delivery</div>
                      <div className="text-sm opacity-80">Restaurants & Dishes</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedType('groceries')}
                    className={`flex-1 px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 ${selectedType === 'groceries' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'text-gray-600 hover:bg-red-50'}`}
                  >
                    <div className={`p-2 rounded-lg ${selectedType === 'groceries' ? 'bg-white/20' : 'bg-red-100'}`}>
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Groceries</div>
                      <div className="text-sm opacity-80">Fresh & Daily Needs</div>
                    </div>
                  </button>
                </div>

                {/* Search Input */}
                <form onSubmit={handleSearch} className="p-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Search className="w-6 h-6 text-red-500" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={selectedType === 'food' ? "Search for restaurants, dishes, or cuisines..." : "Search for groceries, vegetables, or fruits..."}
                      className="w-full pl-14 pr-40 py-5 bg-red-50/50 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg placeholder-gray-500 transition-all duration-300 hover:bg-red-50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 group"
                      >
                        <span>Search Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Location & Weather */}
                <div className="px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Delivering to</div>
                      <button className="flex items-center gap-2 text-red-700 font-bold hover:text-red-800 transition-colors">
                        <span>Current Location</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {weatherConditions.map((weather, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-lg border border-gray-100 hover:scale-105 transition-transform cursor-pointer">
                        <weather.icon className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="text-sm font-medium">{weather.temp}</div>
                          <div className="text-xs text-gray-500">{weather.condition}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import all categorized components */}
      <CategoriesSection />
      <WhyChooseUs />
      <PopularRestaurants />
      <AchievementsSection />
      <SpecialOffer />

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 animate-float hidden xl:block">
        <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <Smartphone className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="fixed top-40 right-10 animate-float delay-1000 hidden xl:block">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <Download className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="fixed bottom-40 left-20 animate-float delay-500 hidden xl:block">
        <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <Gift className="w-7 h-7 text-white" />
        </div>
      </div>
      <div className="fixed bottom-20 right-20 animate-float delay-1500 hidden xl:block">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <Discount className="w-6 h-6 text-white" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
      `}</style>

      <Footer />
    </>
  );
};

// Discount Icon Component
const Discount = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
  </svg>
);

export default Page;