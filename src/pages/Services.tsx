import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Clock, Package, Shield, Star, CheckCircle, Users, MapPin } from "lucide-react";
// Import images from assets
import manAndVanServices from '../assets/man and van serices.webp';
import houseRemoval from '../assets/house removal.webp';
import furnitureAndLargeItems from '../assets/furniture and large items.webp';
import pianoTransport from '../assets/piano transport.webp';
import storageRemoval from '../assets/storage removal.webp';
import officeMove from '../assets/office move.webp';

const ServicesSection = () => {
  const services = [
    {
      title: "Man & Van Services",
      description: "A convenient and flexible moving solution with professional drivers and modern vans for all your delivery needs.",
      imageUrl: manAndVanServices,
      features: ["Professional drivers", "Flexible timing", "Affordable rates"],
      price: "From £25/hour"
    },
    {
      title: "House Removals",
      description: "Complete house moving service including packing, loading, transporting, and unloading with care and precision.",
      imageUrl: houseRemoval,
      features: ["Full packing service", "Furniture protection", "Insurance included"],
      price: "From £150"
    },
    {
      title: "Furniture & Large Items",
      description: "Specialized delivery service for furniture and large items with assembly options and careful handling.",
      imageUrl: furnitureAndLargeItems,
      features: ["Assembly service", "Careful handling", "Same-day delivery"],
      price: "From £45"
    },
    {
      title: "Piano Transport",
      description: "Expert piano moving service with specialized equipment and trained professionals for safe transportation.",
      imageUrl: pianoTransport,
      features: ["Specialized equipment", "Expert handling", "Fully insured"],
      price: "From £200"
    },
    {
      title: "Storage Removals",
      description: "Efficient storage facility transfers with secure handling and flexible scheduling options.",
      imageUrl: storageRemoval,
      features: ["Secure handling", "Flexible scheduling", "Storage solutions"],
      price: "From £80"
    },
    {
      title: "Office Move",
      description: "Professional business relocation services with minimal downtime and comprehensive planning.",
      imageUrl: officeMove,
      features: ["Minimal downtime", "Professional planning", "IT equipment care"],
      price: "From £300"
    },
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for your peace of mind"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "On-Time Guarantee",
      description: "99% on-time delivery rate with real-time tracking"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Professional Team",
      description: "Trained and vetted professionals handle your belongings"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "5-Star Service",
      description: "Rated 4.9/5 stars by thousands of satisfied customers"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Professional Moving Services
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            From single items to complete house moves, we provide reliable and professional moving services tailored to your needs.
          </p>
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>UK-Wide Coverage</span>
            </div>
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold py-4 px-8 rounded-full text-lg shadow-lg">
            Get Free Quote
          </Button>
        </div>
      </section>

      {/* Services Grid - New Layout */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Moving Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of moving and delivery services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                      {service.price}
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg">
                      Book Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MoveXpress?</h2>
            <p className="text-xl text-gray-600">Trusted by thousands across the UK</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to get your items moved</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "1", title: "Get Quote", desc: "Tell us what you need moved", icon: "💬" },
              { step: "2", title: "Book Service", desc: "Choose your preferred date and time", icon: "📅" },
              { step: "3", title: "We Move", desc: "Our team handles everything safely", icon: "🚚" },
              { step: "4", title: "Done!", desc: "Enjoy your stress-free move", icon: "✅" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Move?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get your free quote today and experience stress-free moving with MoveXpress
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-8 py-4 rounded-full font-semibold text-lg">
              Get Free Quote
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full font-semibold text-lg">
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;