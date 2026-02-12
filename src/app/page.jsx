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
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Current Location');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
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
      <div className="bg-white fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-br from-red-200/20 to-red-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-br from-rose-200/20 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-br from-red-200/20 to-rose-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section - Clean white/light background */}
      <section className="relative bg-gradient-to-br from-white via-red-50/20 to-white overflow-hidden">
        <div className="container mx-auto px-4 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 relative z-10">
          {/* Animated Header */}
          <div className="text-center mb-10 sm:mb-14 relative">
            <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 animate-spin-slow" />
            </div>
            
            {/* Header */}
            <h1 className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight animate-slide-up px-2">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent animate-gradient">
                  Order Food.
                </span>
                <Heart className="absolute -top-2 -right-6 sm:-top-4 sm:-right-8 w-5 h-5 sm:w-8 sm:h-8 text-red-500 animate-bounce fill-red-400/20" />
              </span>
              <br className="hidden xs:block" />
              <span className="text-gray-900 relative">
                Discover the best restaurants.
                <Sparkle className="absolute -right-4 sm:-right-6 top-1/2 w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
              </span>
              <br className="hidden xs:block" />
              <span className="relative inline-block mt-2 sm:mt-0">
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent relative">
                  Ruchi Bazaar it!
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-500 blur opacity-20 rounded-full animate-pulse"></div>
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              From local favorites to fresh meals, everything delivered to your doorstep in minutes.
              <span className="inline-block ml-1 sm:ml-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 inline animate-pulse" />
              </span>
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-3xl mx-auto relative px-2 sm:px-0">
            {/* Trending Banner */}
            <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6 overflow-x-auto pb-2 no-scrollbar">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-50 to-red-100 rounded-full border border-red-200 whitespace-nowrap">
                <Navigation className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                <span className="text-xs sm:text-sm font-medium text-red-700">Live Tracking</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full border border-orange-200 whitespace-nowrap">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                <span className="text-xs sm:text-sm font-medium text-orange-700">Trending Now</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-50 to-rose-50 rounded-full border border-red-200 whitespace-nowrap">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                <span className="text-xs sm:text-sm font-medium text-red-700">Fastest Delivery</span>
              </div>
            </div>

            {/* Search Box - Food Only */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-400 via-red-500 to-red-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-1000 hidden lg:block"></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Food Delivery Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">Food Delivery</h3>
                      <p className="text-xs sm:text-sm text-white/90">Restaurants & Dishes</p>
                    </div>
                  </div>
                </div>

                {/* Search Input */}
                <form onSubmit={handleSearch} className="p-3 sm:p-4 lg:p-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 lg:pl-5 flex items-center pointer-events-none">
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for restaurants, dishes, or cuisines..."
                      className="w-full pl-10 sm:pl-12 lg:pl-14 pr-24 sm:pr-28 lg:pr-32 py-3 sm:py-4 lg:py-5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base lg:text-lg placeholder-gray-400 transition-all duration-300 hover:bg-gray-50 text-gray-900"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
                      <button
                        type="submit"
                        className="px-3 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2 group text-xs sm:text-sm whitespace-nowrap"
                      >
                        <span className="hidden xs:inline">Search</span>
                        <span className="xs:hidden">Go</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform hidden xs:block" />
                      </button>
                    </div>
                  </div>
                </form>

                {/* Location & Weather */}
                <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs text-gray-500">Delivering to</div>
                      <button className="flex items-center gap-1 sm:gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors text-xs sm:text-sm">
                        <span className="truncate max-w-[100px] sm:max-w-[150px]">{selectedLocation}</span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Weather */}
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
                    {weatherConditions.map((weather, idx) => (
                      <div key={idx} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white rounded-lg border border-gray-200 hover:scale-105 transition-transform cursor-pointer flex-shrink-0">
                        <weather.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-500 flex-shrink-0" />
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">{weather.temp}</div>
                          <div className="text-[8px] sm:text-xs text-gray-500 whitespace-nowrap">{weather.condition}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Sections - Seamless flow with clean backgrounds */}
      <div className="bg-white">
        <CategoriesSection />
      </div>
      <div className="bg-white">
        <WhyChooseUs />
      </div>
      <div className="bg-white">
        <PopularRestaurants />
      </div>
      <div className="bg-white">
        <AchievementsSection />
      </div>
      <div className="bg-white">
        <SpecialOffer />
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 animate-float hidden 2xl:block">
        <div className="w-16 lg:w-20 lg:h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <Smartphone className="w-8 lg:w-10 h-8 lg:h-10 text-white" />
        </div>
      </div>
      <div className="fixed top-40 right-10 animate-float delay-1000 hidden 2xl:block">
        <div className="w-14 lg:w-16 h-14 lg:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <Download className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
        </div>
      </div>
      <div className="fixed bottom-40 left-20 animate-float delay-500 hidden 2xl:block">
        <div className="w-12 lg:w-14 h-12 lg:h-14 bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <Gift className="w-5 lg:w-7 h-5 lg:h-7 text-white" />
        </div>
      </div>
      <div className="fixed bottom-20 right-20 animate-float delay-1500 hidden 2xl:block">
        <div className="w-10 lg:w-12 h-10 lg:h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <Discount className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
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
        @media (min-width: 480px) {
          .xs\\:block { display: block; }
          .xs\\:inline { display: inline; }
          .xs\\:hidden { display: none; }
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