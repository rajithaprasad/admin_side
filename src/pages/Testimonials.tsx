import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Check, ShieldCheck, Users, Truck, Clock, Smile, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const Testimonials = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "London",
      rating: 5,
      text: "Absolutely fantastic service! The team arrived on time, were incredibly professional, and handled all my furniture with care. Moving house is stressful enough, but MoveXpress made it so much easier. Highly recommend!",
      service: "Home Moving",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David Thompson",
      location: "Manchester",
      rating: 5,
      text: "Used MoveXpress for our office relocation and they were brilliant. Minimal disruption to our business, everything arrived safely, and the price was very competitive. Will definitely use them again.",
      service: "Office Relocation",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Emma Johnson",
      location: "Birmingham",
      rating: 5,
      text: "Needed a same-day delivery for an urgent document and they delivered perfectly. Great communication throughout and very reasonable pricing. Excellent customer service!",
      service: "Package Delivery",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Michael Brown",
      location: "Liverpool",
      rating: 5,
      text: "The man and van service was exactly what I needed for my student move. The driver was friendly, helpful, and even helped me carry everything up three flights of stairs. Great value for money!",
      service: "Man & Van Service",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      name: "Lisa Chen",
      location: "Edinburgh",
      rating: 5,
      text: "Professional furniture delivery service. They assembled my new sofa and placed it exactly where I wanted it. No damage, no fuss, just excellent service from start to finish.",
      service: "Furniture Delivery",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      name: "James Wilson",
      location: "Bristol",
      rating: 5,
      text: "Been using MoveXpress for our business deliveries for over a year now. They're reliable, punctual, and their tracking system is very useful. Wouldn't use anyone else!",
      service: "Business Delivery",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg"
    }
  ];

  const stats = [
    { number: "4.9/5", label: "Average Rating", icon: Star },
    { number: "10,000+", label: "Happy Customers", icon: Users },
    { number: "99%", label: "On-Time Delivery", icon: Clock },
    { number: "24/7", label: "Customer Support", icon: Smile }
  ];

  const faqs = [
    {
      question: "Will I have to pay the Congestion Charge in London?",
      answer: "If you are booking a man and van in London with a pickup or dropoff location within the congestion charge zone, an additional £15.00 for the Congestion Charge will be added to your quote.",
      open: true
    },
    {
      question: "Does my quote include VAT?",
      answer: "All our quotes include VAT at the current rate of 20%. You'll see a full breakdown of costs including VAT in your final quote."
    },
    {
      question: "Do my quotes include ferry costs?",
      answer: "Ferry costs are not included in standard quotes. If your move requires ferry transportation, we'll calculate these costs separately and include them in your final quote."
    },
    {
      question: "Do drivers dismantle and re-assemble items?",
      answer: "Yes, our professional drivers can dismantle and re-assemble basic furniture items as part of our standard service. For complex items, we recommend professional assembly services."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 px-4 text-center bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Trusted by Thousands of Happy Customers
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-12 opacity-90">
            See why our customers consistently rate us 5 stars for our moving and delivery services
          </p>
          <div className="flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border-0"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-purple-100 flex items-center justify-center mx-auto">
                  <stat.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Real Stories from Real Customers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border-0 shadow-sm"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-xl mr-4 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-[#9333EA]">
                      <span className="text-sm font-medium text-purple-600">
                        {testimonial.service}
                      </span>
                      <Quote className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
              Get Quote
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-all duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-6 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Customers Choose MoveXpress
          </h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Reviews</h3>
              <p className="text-gray-600">
                All our reviews come from real customers who have used our services
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Service</h3>
              <p className="text-gray-600">
                Our trained professionals handle your belongings with care
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-purple-600 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">On-Time Guarantee</h3>
              <p className="text-gray-600">
                We pride ourselves on our 99% on-time delivery rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Join thousands of satisfied customers who trust MoveXpress for their moving needs
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Your Free Quote
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Read More Reviews
            </button>
          </div>

          <div className="mt-12 flex justify-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold">10,000+</div>
              <p className="text-sm opacity-80">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">4.9/5</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
