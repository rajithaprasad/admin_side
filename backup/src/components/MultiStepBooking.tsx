import { useState, useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import lutonBoxVanTailLiftImage from "@/assets/Luton-Box-Van-Tail-lift.jpg";
import * as LucideIcons from "lucide-react";
import {
  MapPin,
  Truck,
  Users,
  Check,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Navigation,
  Plus,
  Building,
  Car,
  Layers,
  ArrowUpDown,
  Minus,
  ShoppingCart,
  Package,
  X,
  Clock,
  Calendar,
} from "lucide-react";
import smallVanImage from "@/assets/small-van.webp";
import mediumVanImage from "@/assets/medium-van.jpg";
import largeVanImage from "@/assets/large-van.jpg";
import lutonVanImage from "@/assets/luton-van.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface LocationCoordinates {
  lat: number;
  lng: number;
}

interface LocationDetails {
  floor: string;
  hasLift: boolean;
  parkingAvailable: boolean;
  entranceSteps: number;
}

interface SelectedItem {
  main: string;
  sub: string;
  qty: number;
}

interface VanTimeInfo {
  loadingUnloadingTime: string;
  hourlyRate: number;
  basePrice: number;
}

interface PricingConfig {
  weekdayHelperCost: number;
  weekendHelperCost: number;
  distanceRate: number;
  weekdayDates: string[];
  weekendDates: string[];
  weekdayDriverCost: number;
  weekendDriverCost: number;
}

interface AddressSuggestion {
  summaryline: string;
  street: string;
  posttown: string;
  county: string;
  postcode: string;
}

// Van options
const vanOptions = [
  {
    id: "small",
    name: "Small Van",
    price: "60",
    image: smallVanImage,
    description: "Perfect for small moves",
  },
  {
    id: "medium",
    name: "Medium Van",
    image: mediumVanImage,
    price: "70",
    description: "Ideal for medium moves",
  },
  {
    id: "large",
    name: "Large Van",
    image: largeVanImage,
    price: "80",
    description: "Great for large moves",
  },
  {
    id: "luton",
    name: "Luton Van",
    image: lutonVanImage,
    price: "90",
    description: "Best for big moves",
  },
  {
    id: "luton-box-tail-lift",
    name: "Luton Box Van with Tail Lift",
    image: lutonBoxVanTailLiftImage,
    price: "110",
    description: "Perfect for heavy or bulky items with tail lift assistance",
  },
];

// Help options
const helpOptions = [
  {
    id: "no-help",
    name: "No Help Needed",
    description: "You will load and unload the van yourself",
    price: 0,
  },
  {
    id: "1-helper",
    name: "1 Helper",
    description: "1 helper will assist with loading and unloading",
    price: 0,
  },
  {
    id: "2-helpers",
    name: "2 Helpers",
    description: "2 helpers will assist with loading and unloading",
    price: 0,
  },
];

const MultiStepBooking = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  // Configurable pricing variables
  const pricingConfig: PricingConfig = {
    weekdayHelperCost: 25,
    weekendHelperCost: 35,
    distanceRate: 10,
    weekdayDates: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    weekendDates: ["Saturday", "Sunday"],
    weekdayDriverCost: 20,
    weekendDriverCost: 30,
  };
  // Van time and rate information
  const vanTimeInfo: Record<string, VanTimeInfo> = {
    small: {
      loadingUnloadingTime: "0h 30m",
      hourlyRate: 60,
      basePrice: 60,
    },
    medium: {
      loadingUnloadingTime: "1h 0m",
      hourlyRate: 70,
      basePrice: 70,
    },
    large: {
      loadingUnloadingTime: "1h 30m",
      hourlyRate: 80,
      basePrice: 80,
    },
    luton: {
      loadingUnloadingTime: "2h 0m",
      hourlyRate: 90,
      basePrice: 90,
    },
    "luton-box-tail-lift": {
      loadingUnloadingTime: "2h 30m",
      hourlyRate: 110,
      basePrice: 110,
    },
  };

  // State declarations
  const [currentStep, setCurrentStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupCoords, setPickupCoords] = useState<LocationCoordinates | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<LocationCoordinates | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [travelTime, setTravelTime] = useState<string | null>(null);
  const [selectedVan, setSelectedVan] = useState("");
  const [selectedHelp, setSelectedHelp] = useState("");
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState("0");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationType, setLocationType] = useState<"pickup" | "dropoff">("pickup");
  const [locationDetails, setLocationDetails] = useState<{
    pickup: LocationDetails;
    dropoff: LocationDetails;
  }>({
    pickup: {
      floor: "0",
      hasLift: false,
      parkingAvailable: false,
      entranceSteps: 0,
    },
    dropoff: {
      floor: "0",
      hasLift: false,
      parkingAvailable: false,
      entranceSteps: 0,
    },
  });
  const [locationDetailsSaved, setLocationDetailsSaved] = useState<{
    pickup: boolean;
    dropoff: boolean;
  }>({
    pickup: false,
    dropoff: false,
  });
  const [locationModalStep, setLocationModalStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [pickupSuggestions, setPickupSuggestions] = useState<AddressSuggestion[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<AddressSuggestion[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [manualItem, setManualItem] = useState("");
  const [manualItemQty, setManualItemQty] = useState(1);

  const mapRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const directionsServiceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const postcoderApiKey = "PCWUV-6MDMY-UEA4G-BUMCZ";

  // Calculate total time in minutes for comparison
  const calculateTotalMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split("h ").map((part) => {
      if (part.includes("m")) return parseInt(part.replace("m", ""));
      return parseInt(part) * 60;
    });
    return (hours || 0) + (minutes || 0);
  };

  const getDriverCost = () => {
    if (!selectedDate) return 0;
    const isSelectedWeekend = isWeekend(selectedDate);
    return isSelectedWeekend ? pricingConfig.weekendDriverCost : pricingConfig.weekdayDriverCost;
  };

  // Calculate total time string from minutes
  const formatTimeFromMinutes = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  // Calculate total estimated time
  const getTotalEstimatedTime = () => {
    if (!travelTime || !selectedVan) return "0h 0m";
    const travelMinutes = calculateTotalMinutes(travelTime);
    const loadingMinutes = calculateTotalMinutes(vanTimeInfo[selectedVan].loadingUnloadingTime);
    const totalMinutes = travelMinutes + loadingMinutes;
    return formatTimeFromMinutes(totalMinutes);
  };

  // Check if selected date is weekend
  const isWeekend = (date: Date | null) => {
    if (!date) return false;
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    return pricingConfig.weekendDates.includes(dayName);
  };

  // Get helper cost based on date
  const getHelperCost = () => {
    if (!selectedDate || !selectedHelp) return 0;
    const isSelectedWeekend = isWeekend(selectedDate);
    const helperCost = isSelectedWeekend ? pricingConfig.weekendHelperCost : pricingConfig.weekdayHelperCost;
    if (selectedHelp === "no-help") return 0;
    if (selectedHelp === "1-helper") return helperCost;
    if (selectedHelp === "2-helpers") return helperCost * 2;
    return 0;
  };

  // Generate date options for selection
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    options.push({
      value: today.toISOString(),
      label: "Today",
      isToday: true,
      date: today,
    });
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    options.push({
      value: tomorrow.toISOString(),
      label: "Tomorrow",
      isToday: false,
      date: tomorrow,
    });
    for (let i = 2; i <= 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(nextDay.getDate() + i);
      options.push({
        value: nextDay.toISOString(),
        label: nextDay.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        isToday: false,
        date: nextDay,
      });
    }
    return options;
  };

  // Generate hour options for dropdown
  const generateHourOptions = () => {
    if (!selectedVan || !travelTime) return [];
    const totalMinutes = calculateTotalMinutes(getTotalEstimatedTime());
    const options = [];
    // Start from the minimum required time
    for (let i = totalMinutes; i <= totalMinutes + 6 * 60; i += 30) {
      options.push({
        value: i,
        label: formatTimeFromMinutes(i),
      });
    }
    return options;
  };

  // Calculate estimated price
  useEffect(() => {
  setIsCalculating(true);
  let total = 0;

  // Add van base price if selected
  if (selectedVan) {
    total += vanTimeInfo[selectedVan].basePrice;
  }

  // Add distance cost if available
  if (distance !== null) {
    const distanceCost = distance * pricingConfig.distanceRate;
    total += distanceCost;
  }

  // Add time cost ONLY if selectedHours is not null
  if (selectedVan && travelTime && selectedHours !== null) {
    const hourlyCost = (selectedHours / 60) * vanTimeInfo[selectedVan].hourlyRate;
    total += hourlyCost;
  }

  // Add helper cost if selected
  if (selectedHelp) {
    const helperTotal = getHelperCost();
    total += helperTotal;
  }

  // Add driver cost if date is selected
  if (selectedDate) {
    total += getDriverCost();
  }

  setEstimatedPrice(total.toFixed(2));
  setIsCalculating(false);
}, [selectedVan, selectedHelp, distance, travelTime, selectedHours, selectedDate]);


  // Item categories and sub-items
  const itemCategories = [
    {
      main: "Bags",
      subItems: [
        "Large Clothes Storage Bag 90 Litres",
        "Medium Holdall Bag 70 litres",
        "Small Holdall Bag 50 litres",
      ],
    },
    {
      main: "Bathroom Items",
      subItems: ["Bathroom Cabinet", "Shower Screen", "Shower Tray"],
    },
    {
      main: "Bedroom Items",
      subItems: [
        "Bedside",
        "Cot",
        "Double Bed & Mattress",
        "Futon Sofabed",
        "Playhouse",
        "Single Bed & Mattress",
        "Small Sofa Bed",
      ],
    },
    {
      main: "Computer Parts",
      subItems: ["Desktop Pcs", "Laptop"],
    },
    {
      main: "Dining Room",
      subItems: [
        "6 Seater Dining Table",
        "Carver Chair",
        "French Dresser",
        "High Chair",
        "Lamp, Floor",
        "Two Seater Bench",
      ],
    },
    {
      main: "Garage & Garden",
      subItems: ["BBQ", "Playhouse", "Wheelbarrow", "Wicker Chair"],
    },
    {
      main: "Kitchen & Hall",
      subItems: [
        "Cooker",
        "Double Pushchair",
        "High Chair",
        "Kitchen Dresser",
        "Upright Fridge",
      ],
    },
    {
      main: "Living Room",
      subItems: [
        "Bookcase",
        "Corner Sofa (Five Seater)",
        "Sideboard, small",
        "Small Sofa Bed",
      ],
    },
    {
      main: "Moving Boxes",
      subItems: [
        "Archive Box approx 40x25x34",
        "Medium Box approx 45x30x30cm",
        "Small Box approx 30x25x34cm",
      ],
    },
    {
      main: "Piano",
      subItems: ["Baby Grand Piano", "Electric Keyboard", "Upright Piano"],
    },
    {
      main: "Rucksacks",
      subItems: [
        "Large Rucksack 50-60 litres",
        "Medium Rucksack 35-50 litres",
        "Small Rucksack 25-35 litres",
      ],
    },
    {
      main: "Sofas",
      subItems: [
        "Corner Sofa (Five Seater)",
        "Futon Sofa bed",
        "Small Sofa Bed",
      ],
    },
    {
      main: "Special Items",
      subItems: [
        "Aga Cooker",
        "Arcade Machine",
        "Piano, Upright",
        "Pool Table",
      ],
    },
    {
      main: "Suitcases",
      subItems: [
        "Archive Box approx 40x25x34",
        "Medium Suitcase approx 63x41x27cm",
        "Small Box approx 30x25x34cm",
        "Small Suitcase 53x36x24cm",
        "Suitcase",
      ],
    },
    {
      main: "Tables",
      subItems: [
        "Bedside Table",
        "Big Table",
        "Coffee Table",
        "Computer Table",
        "Small Table",
      ],
    },
    {
      main: "Wardrobes",
      subItems: [
        "Double Wardrobe",
        "Quad Wardrobe",
        "Single Wardrobe",
        "Triple Wardrobe",
      ],
    },
  ];

  // Location modal steps
  const locationSteps = [
    { id: 1, title: "Floor Selection", icon: Building },
    { id: 2, title: "Lift Availability", icon: ArrowUpDown },
    { id: 3, title: "Parking & Entrance", icon: Car },
  ];

  // Steps
  const steps = [
    {
      id: 1,
      title: "Plan Your Journey",
      description: "Enter pickup and destination",
    },
    { id: 2, title: "Select Items", description: "Choose what you're moving" },
    { id: 3, title: "Choose Your Van", description: "Select vehicle type" },
    {
      id: 4,
      title: "Select Date & Duration",
      description: "Choose when and how long",
    },
    { id: 5, title: "Helper Service", description: "Choose assistance level" },
    { id: 6, title: "Confirm & Book", description: "Review and complete" },
  ];

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Add/remove item quantity
  const updateItemQty = (main: string, sub: string, delta: number) => {
    setSelectedItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.main === main && item.sub === sub
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].qty += delta;
        if (updatedItems[existingItemIndex].qty <= 0) {
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      } else if (delta > 0) {
        return [...prev, { main, sub, qty: delta }];
      }
      return prev;
    });
  };

  // Add manual item
  const addManualItem = () => {
    if (manualItem.trim() && manualItemQty > 0) {
      setSelectedItems((prev) => [
        ...prev,
        { main: "Manual Items", sub: manualItem, qty: manualItemQty },
      ]);
      setManualItem("");
      setManualItemQty(1);
    }
  };

  // Remove item
  const removeItem = (main: string, sub: string) => {
    setSelectedItems((prev) =>
      prev.filter((item) => !(item.main === main && item.sub === sub))
    );
  };

  // Fetch address suggestions from Postcoder API
  const fetchAddressSuggestions = async (
    searchTerm: string,
    type: "pickup" | "dropoff"
   ) => {
    if (!searchTerm || searchTerm.length < 3) {
      if (type === "pickup") setPickupSuggestions([]);
      else setDropoffSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://ws.postcoder.com/pcw/${postcoderApiKey}/address/UK/${encodeURIComponent(
          searchTerm
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        if (type === "pickup") {
          setPickupSuggestions(data);
          setShowPickupSuggestions(true);
        } else {
          setDropoffSuggestions(data);
          setShowDropoffSuggestions(true);
        }
      } else {
        console.error("Failed to fetch address suggestions");
        if (type === "pickup") setPickupSuggestions([]);
        else setDropoffSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      if (type === "pickup") setPickupSuggestions([]);
      else setDropoffSuggestions([]);
    }
  };

  // Geocode address using Google Maps API
  const geocodeAddress = (
    address: string
  ): Promise<LocationCoordinates | null> => {
    return new Promise((resolve) => {
      if (!window.google) {
        resolve(null);
        return;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status
          );
          resolve(null);
        }
      });
    });
  };

  // Handle address selection
  const handleAddressSelect = async (
    address: AddressSuggestion,
    type: "pickup" | "dropoff"
  ) => {
    const fullAddress = address.summaryline;
    if (type === "pickup") {
      setPickupLocation(fullAddress);
      setShowPickupSuggestions(false);
      setPickupSuggestions([]);
      const coords = await geocodeAddress(fullAddress);
      if (coords) {
        setPickupCoords(coords);
        setLocationType("pickup");
        setLocationModalStep(1);
        setShowLocationModal(true);
        if (dropoffCoords) {
          calculateRoute(coords, dropoffCoords);
        } else if (mapInstanceRef.current) {
          mapInstanceRef.current.setCenter(coords);
          mapInstanceRef.current.setZoom(12);
          new window.google.maps.Marker({
            position: coords,
            map: mapInstanceRef.current,
            title: "Pickup Location",
          });
        }
      }
    } else {
      setDropoffLocation(fullAddress);
      setShowDropoffSuggestions(false);
      setDropoffSuggestions([]);
      const coords = await geocodeAddress(fullAddress);
      if (coords) {
        setDropoffCoords(coords);
        setLocationType("dropoff");
        setLocationModalStep(1);
        setShowLocationModal(true);
        if (pickupCoords) {
          calculateRoute(pickupCoords, coords);
        } else if (mapInstanceRef.current) {
          mapInstanceRef.current.setCenter(coords);
          mapInstanceRef.current.setZoom(12);
          new window.google.maps.Marker({
            position: coords,
            map: mapInstanceRef.current,
            title: "Dropoff Location",
          });
        }
      }
    }
  };

  // Load Google Maps script
  useEffect(() => {
    if (!window.google && !isScriptLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB5HXMB2gEyG0nanDJY9TvTZpCQdg3ZvpY&libraries=places,geocoding&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initializeMap;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.head.appendChild(script);
    } else if (window.google && !isScriptLoaded) {
      setIsScriptLoaded(true);
    }
  }, []);

  // Initialize map
  const initializeMap = () => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 55.9533, lng: -3.1883 },
        zoom: 6,
        styles: [{ featureType: "all", stylers: [{ saturation: -10 }] }],
      });
      mapInstanceRef.current = map;
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer(
        {
          map,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: "#3b82f6",
            strokeOpacity: 0.8,
            strokeWeight: 5,
          },
        }
      );
    }
  };

  // Calculate route
  const calculateRoute = (
    origin: LocationCoordinates,
    destination: LocationCoordinates
  ) => {
    if (!directionsServiceRef.current || !directionsRendererRef.current) return;
    directionsServiceRef.current.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response: any, status: any) => {
        if (status === "OK") {
          directionsRendererRef.current.setDirections(response);
          const route = response.routes[0];
          let totalDistance = 0;
          let totalDuration = 0;
          for (let i = 0; i < route.legs.length; i++) {
            totalDistance += route.legs[i].distance.value;
            totalDuration += route.legs[i].duration.value;
          }
          const distanceInMiles = totalDistance / 1609.34;
          const durationInMinutes = Math.round(totalDuration / 60);
          setDistance(parseFloat(distanceInMiles.toFixed(1)));
          setTravelTime(
            `${Math.floor(durationInMinutes / 60)}h ${durationInMinutes % 60}m`
          );
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

  // Navigation
  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return pickupLocation && dropoffLocation && distance;
      case 2:
        return selectedItems.length > 0;
      case 3:
        return selectedVan;
      case 4:
        return selectedHours !== null && selectedDate !== null;
      case 5:
        return selectedHelp;
      default:
        return true;
    }
  };

  const handleBooking = () => {
    const bookingDetails = {
      pickupLocation,
      pickupLocationDetails: locationDetails.pickup,
      dropoffLocation,
      dropoffLocationDetails: locationDetails.dropoff,
      distance,
      travelTime,
      selectedVan: vanOptions.find((van) => van.id === selectedVan)?.name,
      selectedHelp: helpOptions.find((h) => h.id === selectedHelp)?.name,
      selectedHours: selectedHours
        ? formatTimeFromMinutes(selectedHours)
        : "Not selected",
      selectedDate: selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      selectedItems,
      estimatedPrice: `£${estimatedPrice}`,
    };
    alert(`Booking Details:\n\n${JSON.stringify(bookingDetails, null, 2)}`);
  };

  // Location details modal functions
  const closeLocationModal = () => {
    setShowLocationModal(false);
  };

  const nextLocationModalStep = () => {
    if (locationModalStep < 3) {
      setLocationModalStep(locationModalStep + 1);
    } else {
      setLocationDetailsSaved((prev) => ({
        ...prev,
        [locationType]: true,
      }));
      closeLocationModal();
    }
  };

  const prevLocationModalStep = () => {
    if (locationModalStep > 1) {
      setLocationModalStep(locationModalStep - 1);
    } else {
      closeLocationModal();
    }
  };

  const handleLocationDetailChange = (
    field: keyof LocationDetails,
    value: any
  ) => {
    setLocationDetails((prev) => ({
      ...prev,
      [locationType]: {
        ...prev[locationType],
        [field]: value,
      },
    }));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
            Book Your Move 1 2 3
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart booking system with instant quotes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center md:flex-row md:items-center"
              >
                <div
                  className={`flex flex-col items-center ${
                    currentStep >= step.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-sm font-medium text-center">
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-card mb-8">
          <CardContent className="p-8">
            {/* Step 1: Journey Planning */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-semibold text-foreground">
                          Pickup Location
                        </label>
                        {locationDetailsSaved.pickup && (
                          <div className="flex items-center gap-1 text-green-500 text-sm">
                            <Check className="w-4 h-4" />
                            Saved
                          </div>
                        )}
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full z-10"></div>
                        <Input
                          ref={pickupInputRef}
                          placeholder="Enter pickup address or postal code..."
                          value={pickupLocation}
                          onChange={(e) => {
                            setPickupLocation(e.target.value);
                            fetchAddressSuggestions(e.target.value, "pickup");
                          }}
                          onFocus={() => {
                            if (pickupSuggestions.length > 0) {
                              setShowPickupSuggestions(true);
                            }
                          }}
                          onBlur={() => {
                            setTimeout(
                              () => setShowPickupSuggestions(false),
                              200
                            );
                          }}
                          className="pl-12 h-16 text-lg border-2 border-border/40 hover:border-primary/50 focus:border-primary"
                        />
                        {showPickupSuggestions &&
                          pickupSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                              {pickupSuggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                  onMouseDown={() =>
                                    handleAddressSelect(suggestion, "pickup")
                                  }
                                >
                                  {suggestion.summaryline}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <ChevronRight className="w-6 h-6 text-muted-foreground rotate-90" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-semibold text-foreground">
                          Destination
                        </label>
                        {locationDetailsSaved.dropoff && (
                          <div className="flex items-center gap-1 text-green-500 text-sm">
                            <Check className="w-4 h-4" />
                            Saved
                          </div>
                        )}
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent rounded-full z-10"></div>
                        <Input
                          ref={dropoffInputRef}
                          placeholder="Enter destination address or postal code..."
                          value={dropoffLocation}
                          onChange={(e) => {
                            setDropoffLocation(e.target.value);
                            fetchAddressSuggestions(e.target.value, "dropoff");
                          }}
                          onFocus={() => {
                            if (dropoffSuggestions.length > 0) {
                              setShowDropoffSuggestions(true);
                            }
                          }}
                          onBlur={() => {
                            setTimeout(
                              () => setShowDropoffSuggestions(false),
                              200
                            );
                          }}
                          className="pl-12 h-16 text-lg border-2 border-border/40 hover:border-accent/50 focus:border-accent"
                        />
                        {showDropoffSuggestions &&
                          dropoffSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                              {dropoffSuggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                  onMouseDown={() =>
                                    handleAddressSelect(suggestion, "dropoff")
                                  }
                                >
                                  {suggestion.summaryline}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* Distance Display */}
                    {distance && (
                      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                              <Navigation className="w-5 h-5 text-primary" />
                              Distance
                            </h4>
                            <p className="text-muted-foreground">
                              Between pickup and destination
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {distance} miles
                            </p>
                            <p className="text-sm text-muted-foreground">
                              £
                              {(distance * pricingConfig.distanceRate).toFixed(
                                2
                              )}{" "}
                              (£{pricingConfig.distanceRate}/mile)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="lg:border-left lg:border-border lg:pl-8">
                    <div
                      ref={mapRef}
                      className="w-full h-80 bg-muted rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Item Selection */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  Select Items to Move
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        Item Categories
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {itemCategories.map((category) => (
                          <div
                            key={category.main}
                            className="border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                            onClick={() => toggleCategory(category.main)}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">
                                {category.main}
                              </span>
                              <ChevronRight
                                className={`w-5 h-5 transition-transform ${
                                  expandedCategories.includes(category.main)
                                    ? "transform rotate-90"
                                    : ""
                                }`}
                              />
                            </div>
                            {expandedCategories.includes(category.main) && (
                              <div className="mt-3 space-y-2">
                                {category.subItems.map((subItem) => {
                                  const existingItem = selectedItems.find(
                                    (item) =>
                                      item.main === category.main &&
                                      item.sub === subItem
                                  );
                                  const qty = existingItem
                                    ? existingItem.qty
                                    : 0;
                                  return (
                                    <div
                                      key={subItem}
                                      className="flex items-center justify-between p-2 border rounded-md bg-background"
                                    >
                                      <span className="text-sm">{subItem}</span>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-8 w-8"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            updateItemQty(
                                              category.main,
                                              subItem,
                                              -1
                                            );
                                          }}
                                          disabled={qty <= 0}
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="font-medium w-6 text-center">
                                          {qty}
                                        </span>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-8 w-8"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            updateItemQty(
                                              category.main,
                                              subItem,
                                              1
                                            );
                                          }}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Manual Item Entry */}
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary" />
                        Add Manual Item
                      </h4>
                      <div className="space-y-3">
                        <Input
                          placeholder="Item name"
                          value={manualItem}
                          onChange={(e) => setManualItem(e.target.value)}
                        />
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            min="1"
                            placeholder="Qty"
                            value={manualItemQty}
                            onChange={(e) =>
                              setManualItemQty(parseInt(e.target.value) || 1)
                            }
                            className="w-20"
                          />
                          <Button
                            onClick={addManualItem}
                            disabled={!manualItem.trim()}
                          >
                            Add Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      Selected Items
                    </h4>
                    {selectedItems.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No items selected
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {selectedItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-background rounded-md"
                          >
                            <div>
                              <p className="font-medium">{item.sub}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.main}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.qty}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => removeItem(item.main, item.sub)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Van Selection */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  Select Your Van
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {vanOptions.map((van) => (
                    <div
                      key={van.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedVan === van.id
                          ? "border-primary shadow-lg scale-105"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedVan(van.id)}
                    >
                      <div className="mb-4 h-32 bg-muted rounded-md overflow-hidden">
                        <img
                          src={van.image}
                          alt={van.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-lg mb-1">{van.name}</h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        {van.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-primary">£{van.price}</p>
                        <p className="text-xs text-muted-foreground">
                          £{vanTimeInfo[van.id].hourlyRate}/hr
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Date and Duration Selection */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  Select Date and Duration
                </h3>
                {selectedVan && travelTime && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Date Selection */}
                    <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Select Move Date
                      </h4>
                      <div className="space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? (
                                format(selectedDate, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <ShadcnCalendar
                              mode="single"
                              selected={selectedDate || undefined}
                              onSelect={setSelectedDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <p className="text-sm text-muted-foreground">
                          {isWeekend(selectedDate) ? (
                            <span className="font-medium text-yellow-600">
                              Weekend rates apply: Driver £
                              {pricingConfig.weekendDriverCost}
                            </span>
                          ) : (
                            <span className="font-medium text-green-600">
                              Weekday rates apply: Driver £
                              {pricingConfig.weekdayDriverCost}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    {/* Duration Selection */}
                    <div className="space-y-6">
                      <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                        <h4 className="font-semibold text-lg flex items-center gap-2">
                          <Truck className="w-5 h-5 text-primary" />
                          {vanOptions.find((van) => van.id === selectedVan)?.name}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Estimated Travel Time:
                            </span>
                            <span className="font-medium">{travelTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Loading/Unloading Time:
                            </span>
                            <span className="font-medium">
                              {vanTimeInfo[selectedVan].loadingUnloadingTime}
                            </span>
                          </div>
                          <div className="border-t border-border pt-3 flex justify-between font-bold">
                            <span>Total Estimated Time:</span>
                            <span>{getTotalEstimatedTime()}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground pt-2">
                          We estimate the move takes around {getTotalEstimatedTime()}.
                        </p>
                      </div>
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          Select Duration
                        </h4>
                        <div className="space-y-4">
                          <select
                            value={selectedHours || ""}
                            onChange={(e) =>
                              setSelectedHours(parseInt(e.target.value))
                            }
                            className="w-full p-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select hours needed</option>
                            {generateHourOptions().map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.label} - £
                                {(
                                  (option.value / 60) *
                                  vanTimeInfo[selectedVan].hourlyRate
                                ).toFixed(2)}
                              </option>
                            ))}
                          </select>
                          <div className="text-sm text-muted-foreground">
                            <p>
                              Hourly rate: £
                              {vanTimeInfo[selectedVan].hourlyRate}/hr
                            </p>
                            <p className="mt-1">
                              Minimum booking starts from {getTotalEstimatedTime()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Helper Service */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  Do You Need Help?
                </h3>
                <div className="mb-6 bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-center">
                    {isWeekend(selectedDate) ? (
                      <span className="font-medium text-yellow-600">
                        Weekend rates apply: Helper £
                        {pricingConfig.weekendHelperCost} each
                      </span>
                    ) : (
                      <span className="font-medium text-green-600">
                        Weekday rates apply: Helper £
                        {pricingConfig.weekdayHelperCost} each
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {helpOptions.map((help) => {
                    const helperCost = () => {
                      if (help.id === "no-help") return 0;
                      const isSelectedWeekend = isWeekend(selectedDate);
                      const helperCost = isSelectedWeekend
                        ? pricingConfig.weekendHelperCost
                        : pricingConfig.weekdayHelperCost;
                      if (help.id === "1-helper") return helperCost;
                      if (help.id === "2-helpers") return helperCost * 2;
                      return 0;
                    };
                    return (
                      <div
                        key={help.id}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                          selectedHelp === help.id
                            ? "border-primary shadow-lg bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedHelp(help.id)}
                      >
                        <h4 className="font-semibold text-lg mb-2">
                          {help.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-4">
                          {help.description}
                        </p>
                        {help.id !== "no-help" && (
                          <div>
                            <p className="font-bold text-primary mb-1">
                              Helper(s): £
                              {isWeekend(selectedDate)
                                ? pricingConfig.weekendHelperCost
                                : pricingConfig.weekdayHelperCost}{" "}
                              × {help.id === "1-helper" ? 1 : 2}
                            </p>
                            <p className="font-bold text-primary">
                              Total: £{helperCost()}
                            </p>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {help.id === "1-helper" && "1 helper included"}
                          {help.id === "2-helpers" && "2 helpers included"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 6: Confirmation */}
            {currentStep === 6 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-8">
                  Confirm Your Booking
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Journey Details
                      </h4>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">From:</span>{" "}
                          {pickupLocation}
                        </p>
                        <p className="text-sm text-muted-foreground pl-4">
                          Floor: {locationDetails.pickup.floor},{" "}
                          {locationDetails.pickup.hasLift
                            ? "Lift available"
                            : "No lift"}
                          ,{" "}
                          {locationDetails.pickup.parkingAvailable
                            ? "Parking available"
                            : "Limited parking"}
                        </p>
                        <p>
                          <span className="font-medium">To:</span>{" "}
                          {dropoffLocation}
                        </p>
                        <p className="text-sm text-muted-foreground pl-4">
                          Floor: {locationDetails.dropoff.floor},{" "}
                          {locationDetails.dropoff.hasLift
                            ? "Lift available"
                            : "No lift"}
                          ,{" "}
                          {locationDetails.dropoff.parkingAvailable
                            ? "Parking available"
                            : "Limited parking"}
                        </p>
                        <p>
                          <span className="font-medium">Distance:</span>{" "}
                          {distance} miles
                        </p>
                        <p>
                          <span className="font-medium">
                            Estimated Travel Time:
                          </span>{" "}
                          {travelTime}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        Items to Move
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {selectedItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-background rounded-md"
                          >
                            <div>
                              <p className="font-medium">{item.sub}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.main}
                              </p>
                            </div>
                            <span className="font-medium">{item.qty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-primary" />
                        Vehicle Details
                      </h4>
                      <p>
                        {vanOptions.find((van) => van.id === selectedVan)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Duration:{" "}
                        {selectedHours
                          ? formatTimeFromMinutes(selectedHours)
                          : "Not selected"}
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Assistance
                      </h4>
                      <p>
                        {helpOptions.find((h) => h.id === selectedHelp)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedHelp !== "no-help" && (
                          <>
                            Helper(s): £
                            {isWeekend(selectedDate)
                              ? pricingConfig.weekendHelperCost
                              : pricingConfig.weekdayHelperCost}{" "}
                            × {selectedHelp === "1-helper" ? 1 : 2}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                    <h4 className="font-bold text-xl mb-4">Price Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Van Rental:</span>
                        <span>
                          £
                          {
                            vanOptions.find((van) => van.id === selectedVan)
                              ?.price
                          }
                          .00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Distance ({distance} miles × £
                          {pricingConfig.distanceRate}):
                        </span>
                        <span>
                          £
                          {distance
                            ? (distance * pricingConfig.distanceRate).toFixed(2)
                            : "0.00"}
                        </span>
                      </div>
                      {selectedHours !== null && (
                        <div className="flex justify-between">
                          <span>
                            Duration ({formatTimeFromMinutes(selectedHours)} × £
                            {vanTimeInfo[selectedVan].hourlyRate}/hr):
                          </span>
                          <span>
                            £
                            {(
                              (selectedHours / 60) *
                              vanTimeInfo[selectedVan].hourlyRate
                            ).toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Helper Cost:</span>
                        <span>
                          £
                          {selectedHelp === "1-helper"
                            ? isWeekend(selectedDate)
                              ? pricingConfig.weekendHelperCost
                              : pricingConfig.weekdayHelperCost
                            : selectedHelp === "2-helpers"
                            ? isWeekend(selectedDate)
                              ? pricingConfig.weekendHelperCost * 2
                              : pricingConfig.weekdayHelperCost * 2
                            : 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Driver Cost:</span>
                        <span>£{getDriverCost()}</span>
                      </div>
                      <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>£{estimatedPrice}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      This is an estimate. Final price may vary based on actual
                      distance and time.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Price Breakdown Alert */}
        {currentStep >= 1 && currentStep < 6 && (
          <div className="mb-8">
            <Card className="border-2 border-primary/20 bg-primary/5 p-4">
              <CardContent className="p-3">
                {isCalculating ? (
                  <div className="flex justify-center items-center h-16">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-base text-primary">
                        Price Breakdown
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Van Rental:</span>
                        <span>
                          £
                          {selectedVan
                            ? vanOptions.find((van) => van.id === selectedVan)
                                ?.price
                            : "0.00"}
                          .00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Distance ({distance} miles × £
                          {pricingConfig.distanceRate}):
                        </span>
                        <span>
                          £
                          {distance
                            ? (distance * pricingConfig.distanceRate).toFixed(2)
                            : "0.00"}
                        </span>
                      </div>
                      {selectedHours !== null && (
                        <div className="flex justify-between">
                          <span>
                            Duration ({formatTimeFromMinutes(selectedHours)} × £
                            {vanTimeInfo[selectedVan]?.hourlyRate}/hr):
                          </span>
                          <span>
                            £
                            {selectedHours && selectedVan
                              ? (
                                  (selectedHours / 60) *
                                  vanTimeInfo[selectedVan].hourlyRate
                                ).toFixed(2)
                              : "0.00"}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Helper Cost:</span>
                        <span>£{getHelperCost().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Driver Cost:</span>
                        <span>£{getDriverCost().toFixed(2)}</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base">
                        <span>Total:</span>
                        <span>£{estimatedPrice}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This is an estimate. Final price may vary.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          {currentStep < 6 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleBooking}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-3"
            >
              Book Now
            </Button>
          )}
        </div>
      </div>

      {/* Location Details Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md md:max-w-2xl mx-auto p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              {locationType === "pickup" ? (
                <>
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  Pickup Location Details
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  Destination Location Details
                </>
              )}
            </h3>
            {/* Location Modal Progress Steps */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                {locationSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center md:flex-row md:items-center"
                    >
                      <div
                        className={`flex flex-col items-center ${
                          locationModalStep >= step.id
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 ${
                            locationModalStep >= step.id
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-muted-foreground"
                          }`}
                        >
                          {locationModalStep > step.id ? (
                            <Check className="w-4 h-4 md:w-5 md:h-5" />
                          ) : (
                            <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                          )}
                        </div>
                        <div className="mt-1 md:mt-2 text-xs md:text-sm font-medium text-center">
                          {step.title}
                        </div>
                      </div>
                      {index < locationSteps.length - 1 && (
                        <div
                          className={`hidden md:block w-12 md:w-16 h-0.5 mx-2 md:mx-4 ${
                            locationModalStep > step.id
                              ? "bg-primary"
                              : "bg-muted"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Step 1: Floor Selection */}
            {locationModalStep === 1 && (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 md:mb-4 text-center">
                    What floor are you on?
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                    {Array.from({ length: 13 }, (_, i) => (
                      <div
                        key={i}
                        className={`border-2 rounded-lg p-2 md:p-4 cursor-pointer text-center transition-all duration-200 ${
                          locationDetails[locationType].floor === i.toString()
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() =>
                          handleLocationDetailChange("floor", i.toString())
                        }
                      >
                        <div className="font-semibold text-xs md:text-sm mb-0.5">
                          {i === 0 ? "Ground" : `Floor ${i}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {i === 0
                            ? "No stairs"
                            : `${i} floor${i > 1 ? "s" : ""} up`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Step 2: Lift Availability */}
            {locationModalStep === 2 && (
              <div className="space-y-4 md:space-y-6">
                {locationDetails[locationType].floor !== "0" ? (
                  <>
                    <label className="block text-sm font-medium mb-2 md:mb-4 text-center">
                      Is there a lift available?
                    </label>
                    <RadioGroup
                      value={
                        locationDetails[locationType].hasLift ? "yes" : "no"
                      }
                      onValueChange={(value) =>
                        handleLocationDetailChange("hasLift", value === "yes")
                      }
                      className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="yes"
                          id="lift-yes"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="lift-yes"
                          className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 md:p-4 hover:bg-accept hover:text-accent-foreground w-full cursor-pointer ${
                            locationDetails[locationType].hasLift
                              ? "border-primary bg-primary/5"
                              : ""
                          }`}
                        >
                          <span className="font-semibold text-xs md:text-sm">
                            Yes
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Lift available
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="no"
                          id="lift-no"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="lift-no"
                          className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 md:p-4 hover:bg-accept hover:text-accent-foreground w-full cursor-pointer ${
                            !locationDetails[locationType].hasLift
                              ? "border-primary bg-primary/5"
                              : ""
                          }`}
                        >
                          <span className="font-semibold text-xs md:text-sm">
                            No
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Stairs only
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </>
                ) : (
                  <div className="text-center py-4 md:py-8">
                    <p className="text-muted-foreground text-xs md:text-sm">
                      No lift information needed for ground floor.
                    </p>
                  </div>
                )}
              </div>
            )}
            {/* Step 3: Parking and Entrance */}
            {locationModalStep === 3 && (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 md:mb-4 text-center">
                    Is parking available near the entrance?
                  </label>
                  <RadioGroup
                    value={
                      locationDetails[locationType].parkingAvailable
                        ? "yes"
                        : "no"
                    }
                    onValueChange={(value) =>
                      handleLocationDetailChange(
                        "parkingAvailable",
                        value === "yes"
                      )
                    }
                    className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes"
                        id="parking-yes"
                        className="sr-only"
                      />
                      <Label
                        htmlFor="parking-yes"
                        className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 md:p-4 hover:bg-accept hover:text-accent-foreground w-full cursor-pointer ${
                          locationDetails[locationType].parkingAvailable
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        <span className="font-semibold text-xs md:text-sm">
                          Yes
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Easy access
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no"
                        id="parking-no"
                        className="sr-only"
                      />
                      <Label
                        htmlFor="parking-no"
                        className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 md:p-4 hover:bg-accept hover:text-accent-foreground w-full cursor-pointer ${
                          !locationDetails[locationType].parkingAvailable
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        <span className="font-semibold text-xs md:text-sm">
                          No
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Limited parking
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevLocationModalStep}
                className="text-xs md:text-sm"
              >
                {locationModalStep === 1 ? "Cancel" : "Back"}
              </Button>
              <Button
                onClick={nextLocationModalStep}
                className="text-xs md:text-sm"
              >
                {locationModalStep === 3 ? "Save Details" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MultiStepBooking;
