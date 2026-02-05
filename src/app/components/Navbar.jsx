"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  MapPin,
  Heart,
  Truck,
  Gift,
  Clock,
  ChevronDown,
  User,
} from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [cartItemsCount] = useState(3);
  const [userLocation, setUserLocation] = useState("New York, NY");

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const locationRef = useRef(null);

  // SCROLL SHADOW
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // CLICK OUTSIDE HANDLERS
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchSuggestions(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setShowLocationMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  // NAVIGATION
  const navigateTo = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  // SEARCH HANDLER
  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setSearchQuery("");
      setShowSearchSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // LOCATION HANDLERS
  const locations = [
    { id: "ny", name: "New York, NY" },
    { id: "la", name: "Los Angeles, CA" },
    { id: "chi", name: "Chicago, IL" },
    { id: "mia", name: "Miami, FL" },
  ];

  const handleLocationSelect = (location) => {
    setUserLocation(location.name);
    setShowLocationMenu(false);
    localStorage.setItem("userLocation", location.name);
  };

  // NAV DATA
  const navItems = [
    { label: "Home", icon: "🏠", path: "/" },
    { label: "Restaurants", icon: "🍕", path: "/Restaurants" },
    { label: "Groceries", icon: "🛒", path: "/Groceries" },
    { label: "Offers", icon: "🎁", path: "/Offers" },
    { label: "Orders", icon: "📋", path: "/Orders" },
    { label: "Cart", icon: "🛍️", path: "/Cart", badge: true },
  ];

  const searchSuggestions = [
    { id: 1, text: "Chicken Biryani", type: "dish" },
    { id: 2, text: "Margherita Pizza", type: "dish" },
    { id: 3, text: "Fresh Vegetables", type: "category" },
    { id: 4, text: "Organic Fruits", type: "category" },
    { id: 5, text: "Burger King", type: "restaurant" },
    { id: 6, text: "Starbucks Coffee", type: "restaurant" },
  ];

  const popularCategories = [
    { name: "Pizza", icon: "🍕" },
    { name: "Burger", icon: "🍔" },
    { name: "Sushi", icon: "🍣" },
    { name: "Salad", icon: "🥗" },
    { name: "Dessert", icon: "🍰" },
    { name: "Coffee", icon: "☕" },
  ];

  return (
    <>
      {/* PROMO BANNER */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Truck size={16} className="animate-pulse" />
              <span>🚀 30 min Delivery</span>
            </div>
            <span className="hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <Gift size={16} />
              <span>50% OFF First Order</span>
            </div>
          </div>
          <button 
            onClick={() => navigateTo("/orders")}
            className="font-medium hover:text-gray-100 transition-colors"
          >
            Order Now →
          </button>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav
        className={`sticky top-0 z-50 bg-white border-b transition-shadow duration-200 ${isScrolled ? "shadow-lg" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* TOP ROW */}
          <div className="h-16 lg:h-20 flex items-center justify-between">
            {/* LEFT: LOGO & MENU */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <button
                onClick={() => navigateTo("/")}
                className="flex items-center gap-3 group"
              >
                {/* Logo Image */}
                <div className="flex items-center">
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                    {/* Replace "/logo.png" with your actual logo path */}
                    <Image
                      src="/logo.png"
                      alt="Ruchi Bazaar Logo"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                      className="group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
                
                {/* Brand Text */}
                <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-black text-gray-900">
                    Ruchi Bazaar
                  </h1>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={12} className="text-red-500" />
                    <span>Fresh & Fast</span>
                  </div>
                </div>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.slice(0, 5).map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigateTo(item.path)}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${pathname === item.path
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER: SEARCH (DESKTOP) */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-6" ref={searchRef}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search restaurants, groceries, dishes..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
                
                {/* Search Suggestions */}
                {showSearchSuggestions && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        Popular Searches
                      </h3>
                      <div className="space-y-2">
                        {searchSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => {
                              setSearchQuery(suggestion.text);
                              handleSearch(suggestion.text);
                            }}
                            className="flex items-center gap-3 w-full p-2 hover:bg-red-50 rounded-lg transition-colors text-left"
                          >
                            <Search className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {suggestion.text}
                              </div>
                              <div className="text-xs text-gray-500 capitalize">
                                {suggestion.type}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Desktop Location */}
              <div className="hidden lg:block relative" ref={locationRef}>
                <button
                  onClick={() => setShowLocationMenu(!showLocationMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div className="text-left">
                    <div className="text-sm font-semibold">Location</div>
                    <div className="text-xs text-gray-500 truncate max-w-[120px]">
                      {userLocation}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Location Dropdown */}
                {showLocationMenu && (
                  <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Select Location
                      </h3>
                      {locations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => handleLocationSelect(location)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 last:mb-0 transition-colors ${userLocation === location.name
                              ? "bg-red-50 text-red-600 font-medium"
                              : "hover:bg-gray-100 text-gray-700"
                            }`}
                        >
                          {location.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Favorites */}
              <button
                onClick={() => navigateTo("/favorites")}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </button>

              {/* Cart */}
              <button
                onClick={() => navigateTo("/cart")}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button
                onClick={() => navigateTo("/profile")}
                className="hidden lg:flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>

              {/* Mobile Search Button */}
              <button
                onClick={() => setShowSearchSuggestions(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH & CATEGORIES */}
          <div className="lg:hidden py-3 border-t" ref={searchRef}>
            {/* Search Bar */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchSuggestions(true)}
                onKeyPress={handleKeyPress}
                placeholder="What would you like to order?"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {popularCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => router.push(`/category/${category.name.toLowerCase()}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-red-100 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE SIDEBAR MENU */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50" ref={menuRef}>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="absolute left-0 top-0 w-80 h-full bg-white shadow-xl">
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center gap-3 mb-6">
                    {/* Logo in Mobile Menu */}
                    <div className="relative w-12 h-12">
                      <Image
                        src="/logo.png"
                        alt="Ruchi Bazaar Logo"
                        fill
                        style={{ objectFit: 'contain' }}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900 text-lg">Ruchi Bazaar</h2>
                      <p className="text-sm text-gray-500">Fresh & Fast</p>
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Welcome Back!</p>
                      <p className="text-sm text-gray-500">Sign in for better experience</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-4">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => navigateTo(item.path)}
                      className={`flex items-center gap-4 w-full p-3 rounded-lg mb-2 transition-colors ${pathname === item.path
                          ? "bg-red-50 text-red-600 font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-lg">{item.label}</span>
                      {item.badge && cartItemsCount > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {cartItemsCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t">
                  <button
                    onClick={() => navigateTo("/orders")}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
        <div className="grid grid-cols-5 h-16">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`flex flex-col items-center justify-center transition-colors relative ${pathname === item.path
                  ? "text-red-600"
                  : "text-gray-500 hover:text-red-500"
                }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium mt-1">{item.label}</span>
              {item.badge && cartItemsCount > 0 && (
                <span className="absolute top-1 right-4 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SPACER FOR MOBILE BOTTOM NAV */}
      <div className="h-16 lg:hidden" />

      <style jsx>{`
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

export default Navbar;