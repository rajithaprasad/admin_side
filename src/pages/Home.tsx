import React from 'react';
import { Star, Clock, Truck, Package, Check, Shield, Phone, Mail, MapPin, CheckCircle, Calendar, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
