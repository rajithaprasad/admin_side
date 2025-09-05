import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, CheckCircle, Truck, FileText, Shield, User, Star, Clock, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function DriverRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    postalCode: '',
    address: '',
    vehicleType: '',
    vehicleRegistration: '',
    vanInsuranceStart: '',
    vanInsuranceEnd: '',
    goodsInsuranceStart: '',
    goodsInsuranceEnd: '',
    liabilityInsuranceStart: '',
    liabilityInsuranceEnd: ''
  });

  const [files, setFiles] = useState({
    drivingLicenceFront: null as File | null,
    drivingLicenceBack: null as File | null,
    selfiePhoto: null as File | null,
    vanInsurance: null as File | null,
    goodsInsurance: null as File | null,
    liabilityInsurance: null as File | null
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required files are uploaded
    const requiredFiles = ['drivingLicenceFront', 'drivingLicenceBack', 'selfiePhoto', 'vanInsurance', 'goodsInsurance', 'liabilityInsurance'];
    const missingFiles = requiredFiles.filter(field => !files[field as keyof typeof files]);
    
    if (missingFiles.length > 0) {
      toast({
        title: "Missing Documents",
        description: "Please upload all required documents before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Application Submitted Successfully!",
      description: "Thank you for your application. We'll review it and get back to you within 24 hours.",
    });
    
    // Redirect to home page after successful submission
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const FileUploadField = ({ 
    label, 
    field, 
    required = true 
  }: { 
    label: string; 
    field: keyof typeof files; 
    required?: boolean;
  }) => {
    const file = files[field];
    
    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-400 transition-colors bg-gray-50/50">
          {file ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{file.name}</span>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFileUpload(field, null)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Preview uploaded file */}
              <div className="mt-4">
                {file.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="Preview" 
                    className="max-w-full h-48 object-contain rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-48">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">PDF Document</p>
                      <p className="text-xs text-gray-500">{file.name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-gray-900">Click to upload or drag and drop</span>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    handleFileUpload(field, selectedFile);
                  }
                }}
              />
            </label>
          )}
        </div>
      </div>
    );
  };

  const benefits = [
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Competitive Earnings",
      description: "Earn up to £200+ per day with flexible working hours"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Full Support",
      description: "24/7 support team and comprehensive training provided"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Flexible Schedule",
      description: "Work when you want, choose your own hours"
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      title: "Professional Network",
      description: "Join a trusted network of professional drivers"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Professional Driver Network
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Become part of the MoveXpress family and start earning with flexible hours, competitive rates, and full support.
          </p>
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Driver Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span>500+ Active Drivers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Drive With Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Drive with MoveXpress?</h2>
            <p className="text-xl text-gray-600">Join thousands of drivers earning great money with flexible schedules</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Driver Image */}
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <img 
                src="https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Professional Driver" 
                className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                Join Our Team!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Driver Registration</h2>
              <p className="text-xl text-gray-600">Fill out the form below to join our driver network</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <User className="w-6 h-6 text-purple-600" />
                    <span>Personal Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        className="h-12 border-2 focus:border-purple-400 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        className="h-12 border-2 focus:border-purple-400 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+44 7XXX XXXXXX"
                        className="h-12 border-2 focus:border-purple-400 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className="h-12 border-2 focus:border-purple-400 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="h-12 border-2 focus:border-purple-400 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="SW1A 1AA"
                        className="h-12 border-2 focus:border-purple-400 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-6">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">Full Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street, London"
                      className="h-12 border-2 focus:border-purple-400 rounded-xl"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Information */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <Truck className="w-6 h-6 text-purple-600" />
                    <span>Vehicle Information</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType" className="text-sm font-medium text-gray-700">Vehicle Type *</Label>
                      <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                        <SelectTrigger className="h-12 border-2 focus:border-purple-400 rounded-xl">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small-van">Small Van</SelectItem>
                          <SelectItem value="medium-van">Medium Van</SelectItem>
                          <SelectItem value="large-van">Large Van</SelectItem>
                          <SelectItem value="luton-van">Luton Van</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleRegistration" className="text-sm font-medium text-gray-700">Vehicle Registration Number *</Label>
                      <Input
                        id="vehicleRegistration"
                        value={formData.vehicleRegistration}
                        onChange={(e) => handleInputChange('vehicleRegistration', e.target.value)}
                        placeholder="AB12 CDE"
                        className="h-12 border-2 focus:border-purple-400 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Uploads */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <FileText className="w-6 h-6 text-purple-600" />
                    <span>Required Documents</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FileUploadField label="Front Of Driving Licence" field="drivingLicenceFront" />
                    <FileUploadField label="Back Of Driving Licence" field="drivingLicenceBack" />
                  </div>
                  <FileUploadField label="Photo Of Your Selfie" field="selfiePhoto" />
                </CardContent>
              </Card>

              {/* Insurance Documents */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-purple-600" />
                    <span>Insurance Documents</span>
                  </h3>
                  
                  {/* Van Insurance */}
                  <div className="space-y-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900">Van Insurance</h4>
                    <FileUploadField label="Van Insurance Copy" field="vanInsurance" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vanInsuranceStart" className="text-sm font-medium text-gray-700">Start Date *</Label>
                        <Input
                          id="vanInsuranceStart"
                          type="date"
                          value={formData.vanInsuranceStart}
                          onChange={(e) => handleInputChange('vanInsuranceStart', e.target.value)}
                          className="h-12 border-2 focus:border-purple-400 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vanInsuranceEnd" className="text-sm font-medium text-gray-700">End Date *</Label>
                        <Input
                          id="vanInsuranceEnd"
                          type="date"
                          value={formData.vanInsuranceEnd}
                          onChange={(e) => handleInputChange('vanInsuranceEnd', e.target.value)}
                          className="h-12 border-2 focus:border-purple-400 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Goods In Transit Insurance */}
                  <div className="space-y-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900">Goods In Transit Insurance</h4>
                    <FileUploadField label="Goods In Transit Insurance Copy" field="goodsInsurance" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="goodsInsuranceStart" className="text-sm font-medium text-gray-700">Start Date *</Label>
                        <Input
                          id="goodsInsuranceStart"
                          type="date"
                          value={formData.goodsInsuranceStart}
                          onChange={(e) => handleInputChange('goodsInsuranceStart', e.target.value)}
                          className="h-12 border-2 focus:border-purple-400 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goodsInsuranceEnd" className="text-sm font-medium text-gray-700">End Date *</Label>
                        <Input
                          id="goodsInsuranceEnd"
                          type="date"
                          value={formData.goodsInsuranceEnd}
                          onChange={(e) => handleInputChange('goodsInsuranceEnd', e.target.value)}
                          className="h-12 border-2 focus:border-purple-400 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Public Liability Insurance */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900">Public Liability Insurance</h4>
                    <FileUploadField label="Public Liability Insurance Copy" field="liabilityInsurance" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="liabilityInsuranceStart" className="text-sm font-medium text-gray-700">Start Date *</Label>
                        <Input
                          id="liabilityInsuranceStart"
                          type="date"
                          value={formData.liabilityInsuranceStart}
                          onChange={(e) => handleInputChange('liabilityInsuranceStart', e.target.value)}
                          className="h-12 border-2 focus:border-purple-400 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="liabilityInsuranceEnd" className="text-sm font-medium text-gray-700">End Date *</Label>
                        <Input
                          id="liabilityInsuranceEnd"
                          type="date"
                          value={formData.liabilityInsuranceEnd}
                          onChange={(e) => handleInputChange('liabilityInsuranceEnd', e.target.value)}
                          className="h-12 border-2 focus:border-purple-400 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg"
                >
                  Submit Application
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  We'll review your application and get back to you within 24 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Driver Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Valid UK driving licence</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Minimum 2 years driving experience</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Clean driving record</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Professional attitude</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Vehicle Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Vehicle less than 10 years old</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Valid MOT certificate</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Comprehensive insurance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Clean and professional appearance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}