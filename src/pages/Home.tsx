import React from 'react';
import { Star, Clock, Truck, Package, Check, Shield, Phone, Mail, MapPin, CheckCircle, Calendar, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from '@/components/BookingSection';
import CoverageSection from '@/components/CoverageSection';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden min-h-screen">
        {/* Clean geometric background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
            {/* Left Side */}
            <div className="text-white order-2 lg:order-1">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-2" />
                <span className="text-sm">Trusted by thousands across the UK</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Move Smart.
                <br />
                Move Easy.
                <br />
                <span className="text-yellow-400">MoveXpress.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed">
                Book reliable, stress-free removals across London today.
              </p>
              
              {/* Trust indicators */}
              <div className="flex items-center space-x-8 mb-10">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-medium">Trustpilot 4.1/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Licensed & Insured</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="w-5 h-5" />
                <span>Trusted across London</span>
              </div>
            </div>
            {/* Right Side - Booking Form */}
            <div className="order-1 lg:order-2">
              <BookingForm />
            </div>
          </div>
        </div>
        
        {/* Bottom trust bar */}
        <div className="bg-yellow-400 py-4">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-purple-900 font-semibold text-lg">
                Rated 4.1 ★ on Trustpilot — see what our customers say
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Step {index + 1}</h3>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Customers Trust Movexpress
            </h2>
          </div>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
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

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive delivery solutions tailored to your specific needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <CoverageSection />

      {/* App Download Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Download Our App</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the MoveXpress app for easy booking, real-time tracking, and exclusive mobile offers
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* App Features */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Book on the go</h3>
                <div className="space-y-4 mb-8">
                  {[
                    "Quick booking in under 2 minutes",
                    "Real-time tracking of your delivery",
                    "Instant quotes and pricing",
                    "24/7 customer support chat",
                    "Exclusive mobile app discounts"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#" 
                    className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="text-lg font-semibold">App Store</div>
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs">Get it on</div>
                        <div className="text-lg font-semibold">Google Play</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* App Preview */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                      <div className="bg-purple-600 h-20 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">MoveXpress</span>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="bg-gray-100 h-12 rounded-lg flex items-center px-3">
                          <span className="text-gray-600 text-sm">From: Your location</span>
                        </div>
                        <div className="bg-gray-100 h-12 rounded-lg flex items-center px-3">
                          <span className="text-gray-600 text-sm">To: Destination</span>
                        </div>
                        <div className="bg-yellow-400 h-12 rounded-lg flex items-center justify-center">
                          <span className="text-gray-900 font-semibold">Get Quote</span>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-gray-100 h-8 rounded"></div>
                          <div className="bg-gray-100 h-8 rounded w-3/4"></div>
                          <div className="bg-gray-100 h-8 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Clean Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by businesses and individuals across the UK
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-6">Have you moved with us?</p>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold">
              Leave a Review
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

// Updated data
const steps = [
  {
    title: "Get a Quote",
    description: "Input your details for a tailored quotation",
    icon: <CheckCircle className="w-8 h-8 text-white" />,
  },
  {
    title: "Schedule",
    description: "Confirm a delivery date and time",
    icon: <Calendar className="w-8 h-8 text-white" />,
  },
  {
    title: "Delivery",
    description: "We'll do all the heavy lifting",
    icon: <Truck className="w-8 h-8 text-white" />,
  },
  {
    title: "Sit Back",
    description: "Enjoy your new furniture",
    icon: <ThumbsUp className="w-8 h-8 text-white" />,
  },
];

const whyChooseUs = [
  {
    title: "20 Years of Experience",
    description: "We are an established company",
    icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
  },
  {
    title: "Fixed Prices",
    description: "No hidden fees, transparent prices",
    icon: <Package className="w-8 h-8 text-purple-600" />,
  },
  {
    title: "Trustworthy",
    description: "We're insured and licensed",
    icon: <Shield className="w-8 h-8 text-purple-600" />,
  },
  {
    title: "5-Star Rating",
    description: "Rated 4.9 on Trustpilot",
    icon: <Star className="w-8 h-8 text-purple-600" />,
  },
];

const services = [
  {
    icon: <Truck className="w-8 h-8 text-purple-600" />,
    title: "Same Day Delivery",
    description: "Urgent deliveries handled with speed and care",
  },
  {
    icon: <Clock className="w-8 h-8 text-purple-600" />,
    title: "Scheduled Services",
    description: "Plan ahead with our convenient booking system",
  },
  {
    icon: <Package className="w-8 h-8 text-purple-600" />,
    title: "Package Handling",
    description: "Professional handling for fragile and valuable items",
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-600" />,
    title: "Secure Transport",
    description: "Fully insured and tracked deliveries for peace of mind",
  },
];

const testimonials = [
  {
    text: "Movexpress made my house move so easy. The team was professional, fast, and handled everything with care. Highly recommend!",
    name: "Sarah L.",
    initials: "SL",
    location: "London",
  },
  {
    text: "Excellent service from start to finish. The booking process was simple, and the movers were on time and friendly.",
    name: "James P.",
    initials: "JP",
    location: "Manchester",
  },
  {
    text: "I was worried about moving day, but Movexpress took all the stress away. They packed and delivered everything safely.",
    name: "Amira K.",
    initials: "AK",
    location: "Birmingham",
  },
];

export default Home;
