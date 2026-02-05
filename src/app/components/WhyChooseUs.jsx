"use client";
import React from 'react';
import { Clock, Star, Shield, Truck, Zap, ThumbsUp } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    { 
      icon: Clock, 
      title: '30-Min Delivery', 
      desc: 'Fastest in the city', 
      highlight: true 
    },
    { 
      icon: Star, 
      title: '4.8 Star Rating', 
      desc: 'Based on 50K+ reviews', 
      highlight: false 
    },
    { 
      icon: Shield, 
      title: 'Safe & Hygienic', 
      desc: '100% contactless delivery', 
      highlight: false 
    },
    { 
      icon: Truck, 
      title: 'Free Delivery', 
      desc: 'On orders above ₹299', 
      highlight: true 
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-[#F9FAFB] to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23DC2626%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-red-100 to-red-100 rounded-full mb-6">
            <ThumbsUp className="w-6 h-6 text-red-600" />
            <span className="font-semibold text-red-700 text-lg">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
            Experience the Best
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just delivering food, we're delivering happiness, one meal at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="relative group">
              <div className={`absolute -inset-4 bg-gradient-to-r ${feature.highlight ? 'from-red-400 to-red-500' : 'from-gray-400 to-gray-300'} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.highlight ? 'from-red-500 to-red-600' : 'from-gray-600 to-gray-700'} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.desc}</p>
                {feature.highlight && (
                  <div className="flex items-center gap-2 text-red-600 font-medium">
                    <Zap className="w-4 h-4 animate-pulse" />
                    <span>Most Popular</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;