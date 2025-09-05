import React from 'react';
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
      description: "A Convenient And Flexible Moving Solution Typically Offered By A Single Professional Or A Small Team With A Van.",
      imageUrl: manAndVanServices,
    },
    {
      title: "House Removals",
      description: "House Removals Refer To The Process Of Moving (Packing, Loading, Transporting, Unloading) From One Residence To Another.",
      imageUrl: houseRemoval,
    },
    {
      title: "Furniture & Large Items",
      description: "Furniture Delivery Is A Service Focused On Transporting Furniture Items From Sellers Or Retailers To Customers' Homes.",
      imageUrl: furnitureAndLargeItems,
    },
    {
      title: "Piano Transport",
      description: "Piano Transport Involves The Specialized And Meticulous Relocation Of Pianos From One Location To Another.",
      imageUrl: pianoTransport,
    },
    {
      title: "Storage Removals",
      description: "Storage Removal Refers To The Process Of Relocating Items To Or From A Storage Facility. This Service Is Designed To Assist.",
      imageUrl: storageRemoval,
    },
    {
      title: "Office Move",
      description: "Office Move Is The Comprehensive Process Of Moving A Business From One Physical Location To Another.",
      imageUrl: officeMove,
    },
  ];

  return (
    <>
      {/* Hero Section with updated gradient */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trusted Moving Partner
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We provide reliable and professional moving services tailored to your needs. Whether it's a home, office, or specialty item, we've got you covered.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105">
            Get a Free Quote
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-12 h-1 bg-purple-600 mb-6"></div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Get Quote Button (fixed position) */}
          <div className="fixed bottom-6 right-6 z-50">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-300 transform hover:scale-105">
              Get Quote
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
