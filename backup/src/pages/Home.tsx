import React from 'react';
import { Star, Clock, Truck, Package, Check, Shield, Phone, Mail, MapPin } from 'lucide-react';
import BookingForm from '@/components/BookingSection';
import CoverageSection from '@/components/CoverageSection';

const Home = () => {
  return (
    <div className="bg-[#2D1B69]">
      {/* Hero Section */}
      <section className="bg-[#2D1B69] relative overflow-hidden min-h-screen">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        {/* Radiant color lines with animations and thicker lines */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Orange lines - slide left to right */}
          <div className="absolute top-1/4 -left-[300px] w-[600px] h-[3px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent -rotate-45 animate-slide-left-to-right"></div>
          <div className="absolute top-1/3 -left-[400px] w-[800px] h-[3px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent -rotate-45 animate-slide-left-to-right animation-delay-1000"></div>
          {/* Purple lines - slide right to left */}
          <div className="absolute bottom-1/4 -right-[300px] w-[600px] h-[3px] bg-gradient-to-r from-transparent via-[#9333EA] to-transparent rotate-45 animate-slide-right-to-left"></div>
          <div className="absolute bottom-1/3 -right-[400px] w-[800px] h-[3px] bg-gradient-to-r from-transparent via-[#9333EA] to-transparent rotate-45 animate-slide-right-to-left animation-delay-1000"></div>
          {/* Additional diagonal lines */}
          <div className="absolute top-1/2 left-1/4 w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#FF8C42]/50 to-transparent rotate-12 animate-slide-left-to-right animation-delay-2000"></div>
          <div className="absolute bottom-1/2 right-1/4 w-[700px] h-[2px] bg-gradient-to-r from-transparent via-[#9333EA]/50 to-transparent -rotate-12 animate-slide-right-to-left animation-delay-2000"></div>
        </div>
        {/* Animated elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF8C42]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
            {/* Left Side - Hero Content */}
            <div className="text-white order-2 lg:order-1">
              <div className="inline-flex items-center bg-[#9333EA]/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-[#9333EA]/30">
                <Star className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35] mr-2" />
                <span className="text-sm">Trusted by thousands across the UK</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                We Cover Your
                <br />
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] bg-clip-text text-transparent">M</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Experience The Ease Of Moving With MoveExpress, Local Or Nationwide.
              </p>
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-[#FF6B35]/10 p-2 rounded-lg mr-3">
                    <Clock className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Quick Booking</h3>
                    <p className="text-gray-300 text-sm">Book in under 2 minutes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#FF6B35]/10 p-2 rounded-lg mr-3">
                    <Truck className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Various Sizes</h3>
                    <p className="text-gray-300 text-sm">Vans for any need</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#FF6B35]/10 p-2 rounded-lg mr-3">
                    <Package className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Any Package</h3>
                    <p className="text-gray-300 text-sm">We handle it all</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Side - BookingForm Component */}
            <div className="order-1 lg:order-2">
              <BookingForm />
              {/* Trust indicators */}
              <div className="flex items-center justify-center mt-6 text-gray-300">
                <div className="flex items-center mr-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  ))}
                  <span className="text-sm ml-2">4.9/5</span>
                </div>
                <div className="text-sm">10,000+ deliveries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#1E124C]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive delivery solutions tailored to your specific needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#2D1B69] p-8 rounded-xl border border-gray-700 hover:border-[#FF6B35] transition-all duration-300 group"
              >
                <div className="bg-[#FF6B35]/10 p-3 rounded-lg w-fit mb-6 group-hover:bg-[#FF6B35]/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#2D1B69]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple, efficient process from booking to delivery
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line for steps */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-[#FF6B35]/30"></div>
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 relative z-10">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <CoverageSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-[#1E124C]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by businesses and individuals across the UK
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#2D1B69] p-8 rounded-xl border border-gray-700">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-full flex items-center justify-center text-[#FF6B35] mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-300 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#9333EA]/30 to-[#FF6B35]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Book your van delivery today and experience the difference for yourself
          </p>
          <button className="bg-[#FF6B35] hover:bg-[#FF8C42] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Get Quote
          </button>
        </div>
      </section>
    </div>
  );
};

// Data for services
const services = [
  {
    icon: <Truck className="w-8 h-8 text-[#FF6B35]" />,
    title: "Same Day Delivery",
    description: "Urgent deliveries handled with speed and care",
  },
  {
    icon: <Clock className="w-8 h-8 text-[#FF6B35]" />,
    title: "Scheduled Services",
    description: "Plan ahead with our convenient booking system",
  },
  {
    icon: <Package className="w-8 h-8 text-[#FF6B35]" />,
    title: "Package Handling",
    description: "Professional handling for fragile and valuable items",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#FF6B35]" />,
    title: "Secure Transport",
    description: "Fully insured and tracked deliveries for peace of mind",
  },
];

// Data for steps
const steps = [
  {
    title: "Book Online",
    description: "Quick and easy booking process in under 2 minutes",
  },
  {
    title: "Confirm Details",
    description: "We'll confirm your booking and assign a driver",
  },
  {
    title: "Pickup & Delivery",
    description: "Our driver collects and delivers your items safely",
  },
  {
    title: "Track & Complete",
    description: "Track in real-time and receive delivery confirmation",
  },
];

// Data for testimonials
const testimonials = [
  {
    text: "I use this service weekly for my business deliveries. Reliable, professional, and always on time. Couldn't ask for more!",
    name: "Sarah Johnson",
    initials: "SJ",
    location: "London",
  },
  {
    text: "Moved apartments and needed help with furniture delivery. The driver was careful with my belongings and everything arrived perfectly.",
    name: "Michael Trent",
    initials: "MT",
    location: "Manchester",
  },
  {
    text: "As a small business owner, finding affordable and reliable delivery has been a game changer. Highly recommended!",
    name: "Emma Wilson",
    initials: "EW",
    location: "Birmingham",
  },
];

export default Home;
