import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, X, CheckCircle, ArrowLeft, ArrowRight, Truck, FileText, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DriverRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
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

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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

  const stepIcons = [
    { icon: User, title: "Personal Info" },
    { icon: Truck, title: "Vehicle Details" },
    { icon: FileText, title: "Documents" },
    { icon: Shield, title: "Insurance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Driver Registration</h1>
              <p className="text-sm text-gray-600">Join our professional driver network</p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 mb-6" />
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {stepIcons.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`text-xs font-medium ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <User className="w-6 h-6" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
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
                  <div className="space-y-2">
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
            )}

            {/* Step 2: Vehicle Information */}
            {currentStep === 2 && (
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Truck className="w-6 h-6" />
                    <span>Vehicle Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
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
                  
                  {/* Vehicle Requirements Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Vehicle Requirements</h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Vehicle must be less than 10 years old</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Valid MOT certificate required</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Clean and professional appearance</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Document Uploads */}
            {currentStep === 3 && (
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <FileText className="w-6 h-6" />
                    <span>Required Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUploadField label="Front Of Driving Licence" field="drivingLicenceFront" />
                    <FileUploadField label="Back Of Driving Licence" field="drivingLicenceBack" />
                  </div>
                  <FileUploadField label="Photo Of Your Selfie" field="selfiePhoto" />
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-semibold text-yellow-900 mb-3">Document Guidelines</h4>
                    <ul className="space-y-2 text-sm text-yellow-800">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-yellow-600" />
                        <span>Ensure all documents are clear and readable</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-yellow-600" />
                        <span>Documents must be current and valid</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-yellow-600" />
                        <span>Selfie should clearly show your face</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Insurance Documents */}
            {currentStep === 4 && (
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center space-x-2">
                    <Shield className="w-6 h-6" />
                    <span>Insurance Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Van Insurance */}
                  <div className="space-y-4">
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
                  <div className="space-y-4">
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
                  <div className="space-y-4">
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
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Application</span>
                </Button>
              )}
            </div>
          </form>

          {/* Benefits Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Drive with MoveXpress?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">£</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Competitive Earnings</h4>
                <p className="text-gray-600 text-sm">Earn up to £200+ per day with flexible working hours</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Full Support</h4>
                <p className="text-gray-600 text-sm">24/7 support team and comprehensive training provided</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Flexible Schedule</h4>
                <p className="text-gray-600 text-sm">Work when you want, choose your own hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}