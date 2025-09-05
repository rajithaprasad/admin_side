import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Star, Search, ChevronDown, ChevronUp } from 'lucide-react';

const CoverageSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularCities = [
    { name: "London", deliveryTime: "Same day" },
    { name: "Manchester", deliveryTime: "Same day" },
    { name: "Birmingham", deliveryTime: "Same day" },
    { name: "Leeds", deliveryTime: "Next day" },
    { name: "Liverpool", deliveryTime: "Next day" },
  ];

  const otherCities = [
    { name: "Sheffield", deliveryTime: "Next day" },
    { name: "Bristol", deliveryTime: "Next day" },
    { name: "Glasgow", deliveryTime: "Next day" },
    { name: "Edinburgh", deliveryTime: "Next day" },
    { name: "Cardiff", deliveryTime: "Next day" },
    { name: "Nottingham", deliveryTime: "Next day" },
    { name: "Brighton", deliveryTime: "Next day" },
    { name: "Newcastle", deliveryTime: "Next day" },
    { name: "Leicester", deliveryTime: "Next day" },
    { name: "Belfast", deliveryTime: "2 days" },
  ];

  const features = [
    { 
      icon: <MapPin className="w-5 h-5 text-[#FF6B35]" />, 
      title: "Door-to-door service", 
      description: "Available in all major UK cities" 
    },
    { 
      icon: <Clock className="w-5 h-5 text-[#FF6B35]" />, 
      title: "Express delivery", 
      description: "Within London M25 area" 
    },
    { 
      icon: <CheckCircle className="w-5 h-5 text-[#FF6B35]" />, 
      title: "Nationwide coverage", 
      description: "With reliable partners across the UK" 
    },
    { 
      icon: <Star className="w-5 h-5 text-[#FF6B35]" />, 
      title: "Real-time tracking", 
      description: "For all your deliveries" 
    },
  ];

  const filteredCities = [...popularCities, ...otherCities].filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="coverage" className="py-20 bg-gradient-to-br from-[#1E124C] to-[#0F0825] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#9333EA]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3D2B7A]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF9B7B]">
            UK-Wide Coverage
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We deliver to every corner of the UK, with same-day service in major cities
            and next-day delivery nationwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Coverage Map Representation */}
          <div className="bg-gradient-to-b from-[#2D1B69] to-[#1E124C] rounded-2xl p-8 border border-[#3D2B7A] shadow-2xl shadow-[#9333EA]/10">
            <h3 className="text-2xl font-bold mb-6 text-center">Service Areas</h3>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your city..."
                className="w-full pl-10 pr-4 py-3 bg-[#1E124C] border border-[#3D2B7A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Cities Grid */}
            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <Star className="w-5 h-5 text-[#FF6B35] mr-2" />
                Popular Cities
              </h4>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {popularCities.map((city, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-r from-[#3D2B7A]/50 to-[#2D1B69]/50 border border-[#3D2B7A] hover:border-[#FF6B35]/30 transition-all duration-300 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-[#FF6B35] mr-3" />
                      <span className="font-semibold">{city.name}</span>
                    </div>
                    <span className="text-sm bg-[#FF6B35]/20 px-2 py-1 rounded-full">{city.deliveryTime}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-lg mb-4">Other Cities</h4>
              <div className="grid grid-cols-1 gap-3">
                {(searchQuery ? filteredCities : (isExpanded ? otherCities : otherCities.slice(0, 3))).map((city, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gradient-to-r from-[#3D2B7A]/30 to-[#2D1B69]/30 border border-[#3D2B7A] hover:border-[#9333EA]/30 transition-all duration-300 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-[#9333EA] mr-3" />
                      <span className="font-medium">{city.name}</span>
                    </div>
                    <span className="text-sm bg-[#9333EA]/20 px-2 py-1 rounded-full">{city.deliveryTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {!searchQuery && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-3 bg-[#3D2B7A]/50 hover:bg-[#3D2B7A] border border-[#3D2B7A] rounded-lg flex items-center justify-center transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Show More Cities
                  </>
                )}
              </button>
            )}
          </div>

          {/* Features List */}
          <div>
            <h3 className="text-3xl font-bold mb-8">Comprehensive Delivery Network</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-[#2D1B69] to-[#1E124C] p-5 rounded-xl border border-[#3D2B7A] hover:border-[#FF6B35]/30 transition-all duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-[#FF6B35]/10 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-lg">{feature.title}</h4>
                  </div>
                  <p className="text-gray-300 text-sm pl-11">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-gradient-to-br from-[#2D1B69] to-[#1E124C] p-5 rounded-xl border border-[#3D2B7A] text-center">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">200+</div>
                <div className="text-gray-300">Cities Covered</div>
              </div>
              <div className="bg-gradient-to-br from-[#2D1B69] to-[#1E124C] p-5 rounded-xl border border-[#3D2B7A] text-center">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">50+</div>
                <div className="text-gray-300">Partner Depots</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#FF8C42] hover:to-[#FF6B35] text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg shadow-[#FF6B35]/20 hover:shadow-[#FF6B35]/40">
                Check Your Area
                <MapPin className="w-5 h-5 ml-2" />
              </button>
              <p className="text-center text-gray-400 mt-4 text-sm">
                Enter your postcode to check delivery options
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;