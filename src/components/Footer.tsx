import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {

  return (
    <div>
      {/* Join as Driver CTA */}
      <div className="bg-yellow-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-purple-900 mb-2">Want to Drive with Us?</h3>
          <p className="text-purple-800 mb-6 text-lg">Join our network of professional drivers and start earning today</p>
          <Link to="/driver-registration">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg">
              Join as a Driver
            </Button>
          </Link>
        </div>
      </div>

      <footer className="bg-gray-900 text-white">

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src={logo}
                alt="MoveExpress Logo"
                className="w-12 h-12 mr-3 rounded-lg"
              />
              <span className="text-2xl font-bold">MOVEXPRESS</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The UK's most trusted van delivery service. Fast, reliable, and professional
              delivery solutions for homes and businesses.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Home Deliveries</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Business Logistics</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Furniture Delivery</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Same-Day Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">White Glove Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Assembly Service</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Driver Application</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Insurance</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1 text-purple-400" />
                <div>
                  <div className="font-medium">24/7 Booking</div>
                  <div>0800 123 4567</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1 text-purple-400" />
                <div>
                  <div className="font-medium">Email Support</div>
                  <div>hello@moveexpress.co.uk</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-purple-400" />
                <div>
                  <div className="font-medium">Head Office</div>
                  <div>123 Delivery Street<br />London, SW1A 1AA</div>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 mt-1 text-purple-400" />
                <div>
                  <div className="font-medium">Operating Hours</div>
                  <div>24/7 Booking Available<br />Delivery: 6AM - 10PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 MOVEXPRESS Ltd. All rights reserved. Licensed delivery service provider.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>VAT: GB123456789</span>
              <span>License: DL123456</span>
              <span>Insured up to £1M</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
