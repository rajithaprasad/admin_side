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
      icon: <MapPin className="w-5 h-5 text-purple-600" />, 
      title: "Door-to-door service", 
      description: "Available in all major UK cities" 
    },
    { 
      icon: <Clock className="w-5 h-5 text-purple-600" />, 
      title: "Express delivery", 
      description: "Within London M25 area" 
    },
    { 
      icon: <CheckCircle className="w-5 h-5 text-purple-600" />, 
      title: "Nationwide coverage", 
      description: "With reliable partners across the UK" 
    },
    { 
      icon: <Star className="w-5 h-5 text-purple-600" />, 
      title: "Real-time tracking", 
      description: "For all your deliveries" 
    },
  ];

  const filteredCities = [...popularCities, ...otherCities].filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="coverage" className="py-20 bg-gray-50">

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            UK-Wide Coverage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We deliver to every corner of the UK, with same-day service in major cities
            and next-day delivery nationwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Coverage Map Representation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-0">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Service Areas</h3>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search your city..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Cities Grid */}
            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <Star className="w-5 h-5 text-purple-600 mr-2" />
                Popular Cities
              </h4>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {popularCities.map((city, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all duration-300 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-purple-600 mr-3" />
                      <span className="font-semibold text-gray-900">{city.name}</span>
                    </div>
                    <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">{city.deliveryTime}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-lg mb-4 text-gray-900">Other Cities</h4>
              <div className="grid grid-cols-1 gap-3">
                {(searchQuery ? filteredCities : (isExpanded ? otherCities : otherCities.slice(0, 3))).map((city, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all duration-300 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-purple-600 mr-3" />
                      <span className="font-medium text-gray-900">{city.name}</span>
                    </div>
                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{city.deliveryTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {!searchQuery && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl flex items-center justify-center transition-colors text-gray-700"
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
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Comprehensive Delivery Network</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900">{feature.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600">Partner Depots</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg">
                Check Your Area
                <MapPin className="w-5 h-5 ml-2" />
              </button>
              <p className="text-center text-gray-600 mt-4 text-sm">
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