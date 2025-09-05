import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Clock, MapPin, Star, Truck, ShieldCheck } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Clock, label: "On-Time Delivery", value: "99%" },
    { icon: MapPin, label: "Cities Covered", value: "50+" },
  ];

  const testimonials = [
    {
      quote: "MoveXpress made our office relocation seamless. Their team was professional, punctual, and handled everything with care. Highly recommended!",
      name: "Emily Carter",
      role: "Office Manager, TechCorp",
    },
    {
      quote: "I've used MoveXpress twice now, and both times they exceeded my expectations. Their attention to detail is unmatched.",
      name: "James Wilson",
      role: "Homeowner",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with updated gradient */}
      <section className="py-24 bg-gradient-to-b from-[#2D1B69] to-[#3B2F8A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Experience Stress-Free Moving with MoveXpress
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 animate-fade-in animation-delay-200">
            At MoveXpress, we understand that moving can be demanding and stressful.
            That's why we are dedicated to making the process smooth and seamless for you.
          </p>
          <button className="mt-8 bg-[#FF6B35] hover:bg-[#E55A1B] text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Get a Free Quote
          </button>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2D1B69] to-[#9333EA] rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D1B69] mb-4">Our Mission</h2>
              <p className="text-gray-700">
                To provide reliable, efficient, and stress-free moving solutions that exceed our customers' expectations,
                ensuring their belongings are handled with the utmost care and professionalism.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2D1B69] to-[#9333EA] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D1B69] mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To be the most trusted and preferred moving company, known for our integrity, innovation,
                and commitment to customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#2D1B69] mb-12 relative inline-block">
              Our Story
              <span className="block w-24 h-1 bg-[#9333EA] mt-2 mx-auto"></span>
            </h2>
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <p className="text-lg text-gray-700">
                Founded in 2009, MoveXpress began as a small family business with a simple mission:
                to provide reliable, professional delivery and moving services that customers can trust.
                What started with a single van and a commitment to excellence has grown into one of the
                most trusted moving companies in the region.
              </p>
              <p className="text-lg text-gray-700">
                Over the years, we've helped thousands of families and businesses move their belongings
                safely and efficiently. Our success is built on three core principles: reliability,
                transparency, and exceptional customer service.
              </p>
              <p className="text-lg text-gray-700">
                Today, with a fleet of modern vehicles and a team of highly trained professionals,
                we continue to set the standard for moving excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2D1B69] text-center mb-12 relative inline-block">
            Our Impact
            <span className="block w-24 h-1 bg-[#9333EA] mt-2 mx-auto"></span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#2D1B69]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-[#9333EA]" />
                  </div>
                  <div className="text-3xl font-bold text-[#2D1B69] mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2D1B69] text-center mb-12 relative inline-block">
            Our Values
            <span className="block w-24 h-1 bg-[#9333EA] mt-2 mx-auto"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Award className="w-8 h-8 text-white" />,
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service, from the initial quote to the final delivery.",
              },
              {
                icon: <Users className="w-8 h-8 text-white" />,
                title: "Trust",
                description: "Building lasting relationships with our customers through honest, reliable service and transparent pricing.",
              },
              {
                icon: <Clock className="w-8 h-8 text-white" />,
                title: "Reliability",
                description: "When you book with us, you can count on us to be there on time and handle your belongings with care.",
              },
            ].map((value, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-[#2D1B69] to-[#9333EA] rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#2D1B69] mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2D1B69] text-center mb-12 relative inline-block">
            What Our Customers Say
            <span className="block w-24 h-1 bg-[#9333EA] mt-2 mx-auto"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#FF6B35] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                  <div className="font-semibold text-[#2D1B69]">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#2D1B69] to-[#9333EA] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in">Ready for a Seamless Move?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 animate-fade-in animation-delay-200">
            Let MoveXpress handle your next move with care and professionalism.
            Contact us today for a free, no-obligation quote!
          </p>
          <button className="bg-[#FF6B35] hover:bg-[#E55A1B] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Get Your Free Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
