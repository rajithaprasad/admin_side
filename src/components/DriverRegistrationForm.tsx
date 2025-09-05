import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DriverRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DriverRegistrationForm({ isOpen, onClose }: DriverRegistrationFormProps) {
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
      title: "Application Submitted!",
      description: "Thank you for your application. We'll review it and get back to you within 24 hours.",
    });
    
    onClose();
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
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition-colors">
          {file ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">{file.name}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleFileUpload(field, null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center space-y-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
              <span className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</span>
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-600">
            Join Our Driver Network
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Start earning with MoveXpress - Fill out the application below
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="+44 7XXX XXXXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="SW1A 1AA"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street, London"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type *</Label>
                  <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                    <SelectTrigger>
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
                  <Label htmlFor="vehicleRegistration">Vehicle Registration Number *</Label>
                  <Input
                    id="vehicleRegistration"
                    value={formData.vehicleRegistration}
                    onChange={(e) => handleInputChange('vehicleRegistration', e.target.value)}
                    placeholder="AB12 CDE"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Uploads */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploadField label="Front Of Driving Licence" field="drivingLicenceFront" />
                <FileUploadField label="Back Of Driving Licence" field="drivingLicenceBack" />
                <FileUploadField label="Photo Of Your Selfie" field="selfiePhoto" />
              </div>
            </CardContent>
          </Card>

          {/* Insurance Documents */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Documents</h3>
              
              {/* Van Insurance */}
              <div className="mb-6">
                <FileUploadField label="Van Insurance Copy" field="vanInsurance" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="vanInsuranceStart">Start Date *</Label>
                    <Input
                      id="vanInsuranceStart"
                      type="date"
                      value={formData.vanInsuranceStart}
                      onChange={(e) => handleInputChange('vanInsuranceStart', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vanInsuranceEnd">End Date *</Label>
                    <Input
                      id="vanInsuranceEnd"
                      type="date"
                      value={formData.vanInsuranceEnd}
                      onChange={(e) => handleInputChange('vanInsuranceEnd', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Goods In Transit Insurance */}
              <div className="mb-6">
                <FileUploadField label="Goods In Transit Insurance Copy" field="goodsInsurance" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="goodsInsuranceStart">Start Date *</Label>
                    <Input
                      id="goodsInsuranceStart"
                      type="date"
                      value={formData.goodsInsuranceStart}
                      onChange={(e) => handleInputChange('goodsInsuranceStart', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goodsInsuranceEnd">End Date *</Label>
                    <Input
                      id="goodsInsuranceEnd"
                      type="date"
                      value={formData.goodsInsuranceEnd}
                      onChange={(e) => handleInputChange('goodsInsuranceEnd', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Public Liability Insurance */}
              <div>
                <FileUploadField label="Public Liability Insurance Copy" field="liabilityInsurance" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="liabilityInsuranceStart">Start Date *</Label>
                    <Input
                      id="liabilityInsuranceStart"
                      type="date"
                      value={formData.liabilityInsuranceStart}
                      onChange={(e) => handleInputChange('liabilityInsuranceStart', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="liabilityInsuranceEnd">End Date *</Label>
                    <Input
                      id="liabilityInsuranceEnd"
                      type="date"
                      value={formData.liabilityInsuranceEnd}
                      onChange={(e) => handleInputChange('liabilityInsuranceEnd', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}