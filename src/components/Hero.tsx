import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeroProps {
  scrollToBooking: () => void;
}

// Multi-step form component
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    size: "",
    details: "",
    contact: ""
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    alert("Booking submitted successfully!");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Book Your Move</h3>
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-8 h-2 rounded-full ${i === step ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Address</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter pickup location"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Address</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter delivery location"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Move Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Move Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select size</option>
                <option value="studio">Studio Apartment</option>
                <option value="1bed">1-Bedroom</option>
                <option value="2bed">2-Bedroom</option>
                <option value="3bed">3-Bedroom</option>
                <option value="4bed">4+ Bedroom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={3}
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Special requirements, fragile items, etc."
              ></textarea>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your phone number or email"
                required
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-medium text-gray-800 mb-2">Summary</h4>
              <p className="text-gray-600 text-sm">From: {formData.from || "Not provided"}</p>
              <p className="text-gray-600 text-sm">To: {formData.to || "Not provided"}</p>
              <p className="text-gray-600 text-sm">Date: {formData.date || "Not provided"}</p>
              <p className="text-gray-600 text-sm">Size: {formData.size || "Not provided"}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <Button
              type="button"
              onClick={prevStep}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300 px-6 py-3"
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 font-medium"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 font-medium"
            >
              Confirm Booking
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

const Hero = ({ scrollToBooking }: HeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 overflow-hidden min-h-screen flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-48 h-48 bg-blue-100 rounded-full opacity-70"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-30"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Form */}
          <div className="order-2 lg:order-1">
            <MultiStepForm />
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-blue-100">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ customers</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-800">Professional</span>
              <span className="text-blue-600 block mt-2">Moving Solutions</span>
              <span className="text-gray-800 block mt-2">Made Simple</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Experience the future of moving with our smart booking system, professional drivers, and transparent pricing. Your journey starts here.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800">99.5%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-5a1 1 0 00-.293-.707l-4-4A1 1 0 0016 4H3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800">1000+</div>
                  <div className="text-sm text-gray-600">Deliveries</div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="text-lg px-8 py-4 font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Learn More About Our Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;