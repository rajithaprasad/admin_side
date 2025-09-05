import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Clock, Package, Shield, Star, CheckCircle, Users, MapPin, ArrowRight } from "lucide-react";
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
      features: ["Professional drivers", "Flexible timing", "Affordable rates", "Same-day service"],
      price: "From £25/hour",
      popular: true
    },
    {
      title: "House Removals",
      description: "Complete house moving service including packing, loading, transporting, and unloading with care and precision.",
      imageUrl: houseRemoval,
      features: ["Full packing service", "Furniture protection", "Insurance included", "Professional team"],
      price: "From £150"
    },
    {
      title: "Furniture & Large Items",
      description: "Specialized delivery service for furniture and large items with assembly options and careful handling.",
      imageUrl: furnitureAndLargeItems,
      features: ["Assembly service", "Careful handling", "Same-day delivery", "White glove service"],
      price: "From £45"
    },
    {
      title: "Piano Transport",
      description: "Expert piano moving service with specialized equipment and trained professionals for safe transportation.",
      imageUrl: pianoTransport,
      features: ["Specialized equipment", "Expert handling", "Fully insured", "Climate controlled"],
      price: "From £200"
    },
    {
      title: "Storage Removals",
      description: "Efficient storage facility transfers with secure handling and flexible scheduling options.",
      imageUrl: storageRemoval,
      features: ["Secure handling", "Flexible scheduling", "Storage solutions", "Inventory tracking"],
      price: "From £80"
    },
    {
      title: "Office Move",
      description: "Professional business relocation services with minimal downtime and comprehensive planning.",
      imageUrl: officeMove,
      features: ["Minimal downtime", "Professional planning", "IT equipment care", "Weekend service"],
      price: "From £300"
    },
  ];

  const whyChooseUs = [
    {
      icon: <CheckCircle className="w-12 h-12 text-purple-600" />,
      title: "20 Years of Experience",
      description: "We are an established company with proven track record"
    },
    {
      icon: <Package className="w-12 h-12 text-purple-600" />,
      title: "Fixed Prices",
      description: "No hidden fees, transparent pricing structure"
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-600" />,
      title: "Trustworthy",
      description: "We're fully insured and licensed for your peace of mind"
    },
    {
      icon: <Star className="w-12 h-12 text-purple-600" />,
      title: "5-Star Rating",
      description: "Rated 4.9/5 on Trustpilot by satisfied customers"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Moving & Delivery Services
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            From single items to complete house moves, we provide reliable and professional moving services tailored to your needs across the UK.
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

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Moving Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of moving and delivery services designed to meet your specific needs
            </p>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 relative">
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold z-10">
                    Most Popular
                  </div>
                )}
                <div className={`grid ${index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-0`}>
                  <div className={`relative h-80 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-purple-600 font-bold text-lg">{service.price}</span>
                    </div>
                  </div>
                  <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex-1">
                        Book Now
                      </Button>
                      <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 py-3 px-6 rounded-lg flex items-center">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Customers Trust MoveXpress</h2>
            <p className="text-xl text-gray-600">Trusted by thousands across the UK for reliable moving services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to get your items moved safely</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { 
                step: "1", 
                title: "Get a Quote", 
                desc: "Input your details for a tailored quotation",
                icon: <CheckCircle className="w-8 h-8 text-white" />
              },
              { 
                step: "2", 
                title: "Schedule", 
                desc: "Confirm a delivery date and time",
                icon: <Clock className="w-8 h-8 text-white" />
              },
              { 
                step: "3", 
                title: "Delivery", 
                desc: "We'll do all the heavy lifting",
                icon: <Truck className="w-8 h-8 text-white" />
              },
              { 
                step: "4", 
                title: "Sit Back", 
                desc: "Enjoy your stress-free move",
                icon: <Star className="w-8 h-8 text-white" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Step {item.step}</h3>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h4>
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
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-8 py-4 rounded-full font-semibold text-lg shadow-lg">
              Get Free Quote
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full font-semibold text-lg">
              Call Us Now: 0800 123 4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;