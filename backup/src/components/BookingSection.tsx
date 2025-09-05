import React, { useState, useEffect, useRef, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe outside of your component
const stripePromise = loadStripe(
  "pk_test_51ONfTLDV5BvUmx0Rbwv1xTz4eSWCecfgCINl7oy8j3pOJgCHm1X8aRfH7cpkixNHqHRg4RSb37ilJTCxgbXoS65a00KyXNn3T0"
);

import smallVanImage from "../assets/small-van.webp";
import mediumVanImage from "../assets/medium-van.jpg";
import largeVanImage from "../assets/large-van.jpg";
import lutonVanImage from "../assets/luton-van.jpg";
import lutonBoxTailLiftVanImage from "../assets/Luton-Box-Van-Tail-lift.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Truck,
  Users,
  Package,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Navigation,
  ChevronRight,
  Building,
  ArrowUpDown,
  Car,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Star,
  CheckCircle,
} from "lucide-react";

const BookingSection = () => {
  // ========== CONFIGURATION ==========
  const config = {
    postcoderApiKey: "PCWUV-6MDMY-UEA4G-BUMCZ",
    pricing: {
      weekdayHelperCost: 25,
      weekendHelperCost: 35,
      distanceRate: 10,
      weekdayDriverCost: 20,
      weekendDriverCost: 30,
      weekdayDates: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      weekendDates: ["Saturday", "Sunday"],
    },
    vanTimeInfo: {
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
    },
    timeSlots: [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
    ],
  };

  // ========== STATE ==========
  const [currentStep, setCurrentStep] = useState(1);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [manualItem, setManualItem] = useState("");
  const [manualItemQty, setManualItemQty] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [moveType, setMoveType] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    serviceType: "",
    date: "",
    time: "",
    selectedVan: "",
    selectedHelp: "",
    selectedHours: null,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    packageSize: "",
    notes: "",
    pickupFloor: "",
    pickupElevator: false,
    dropFloor: "",
    dropElevator: false,
  });
  const [locationDetails, setLocationDetails] = useState({
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
  const [locationDetailsSaved, setLocationDetailsSaved] = useState({
    pickup: false,
    dropoff: false,
  });
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState("0");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [showCustomItemForm, setShowCustomItemForm] = useState(false);
  const [showOrderSummaryModal, setShowOrderSummaryModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [filterText, setFilterText] = useState("");

  // ========== REFS ==========
  const pickupInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  // ========== CONSTANTS ==========
  const vanOptions = [
    {
      id: "small",
      name: "Small Van",
      description: "Perfect for small moves",
      image: smallVanImage,
      capacity: "Up to 10 cubic feet",
      features: ["Compact size", "Easy parking", "City friendly"],
    },
    {
      id: "medium",
      name: "Medium Van",
      description: "Ideal for medium moves",
      image: mediumVanImage,
      capacity: "Up to 20 cubic feet",
      features: ["Good storage", "Versatile", "Popular choice"],
    },
    {
      id: "large",
      name: "Large Van",
      description: "Great for large moves",
      image: largeVanImage,
      capacity: "Up to 35 cubic feet",
      features: ["Spacious", "Heavy items", "Long distance"],
    },
    {
      id: "luton",
      name: "Luton Van",
      description: "Best for big moves",
      image: lutonVanImage,
      capacity: "Up to 50 cubic feet",
      features: ["Maximum space", "Commercial grade", "Heavy duty"],
    },
    {
      id: "luton-box-tail-lift",
      name: "Luton Box Van with Tail Lift",
      description: "Perfect for heavy or bulky items",
      image: lutonBoxTailLiftVanImage,
      capacity: "Up to 60 cubic feet",
      features: ["Tail lift", "Heavy items", "Commercial grade"],
    },
  ];

  const helpOptions = [
    {
      id: "no-help",
      name: "No Help Needed",
      description: "You will load and unload the van yourself",
      icon: Car,
    },
    {
      id: "1-helper",
      name: "1 Helper",
      description: "1 helper will assist with loading and unloading",
      icon: Users,
    },
    {
      id: "2-helpers",
      name: "2 Helpers",
      description: "2 helpers will assist with loading and unloading",
      icon: Users,
    },
  ];

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

  const steps = [
    {
      id: 1,
      title: "Plan Your Journey",
      description: "Enter pickup and destination",
    },
    { id: 2, title: "Choose Your Van", description: "Select vehicle type" },
    {
      id: 3,
      title: "Select Date & Duration",
      description: "Choose when and how long",
    },
    { id: 4, title: "Select Items", description: "Choose what you're moving" },
    { id: 5, title: "Helper Service", description: "Choose assistance level" },
  ];

  // ========== MEMOS ==========
  const filteredCategories = useMemo(() => {
    return itemCategories
      .map((category) => ({
        ...category,
        subItems: category.subItems.filter((subItem) =>
          subItem.toLowerCase().includes(filterText.toLowerCase())
        ),
      }))
      .filter((category) => category.subItems.length > 0);
  }, [filterText, itemCategories]);

  // ========== CUSTOM ITEM STATE ==========
  const [customItem, setCustomItem] = useState({
    title: "",
    qty: 1,
    width: "",
    height: "",
    depth: "",
    weight: "",
    instructions: "",
  });

  // ========== HELPER FUNCTIONS ==========
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split("T")[0],
        display: date.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        isToday: i === 0,
        isTomorrow: i === 1,
      });
    }
    return dates;
  };

  const fetchAddressSuggestions = async (searchTerm, type) => {
    if (!searchTerm || searchTerm.length < 3) {
      if (type === "pickup") {
        setPickupSuggestions([]);
        setShowPickupSuggestions(false);
      } else {
        setDropoffSuggestions([]);
        setShowDropoffSuggestions(false);
      }
      return;
    }
    try {
      const response = await fetch(
        `https://ws.postcoder.com/pcw/${
          config.postcoderApiKey
        }/address/UK/${encodeURIComponent(searchTerm)}`
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
        if (type === "pickup") {
          setPickupSuggestions([]);
          setShowPickupSuggestions(false);
        } else {
          setDropoffSuggestions([]);
          setShowDropoffSuggestions(false);
        }
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      if (type === "pickup") {
        setPickupSuggestions([]);
        setShowPickupSuggestions(false);
      } else {
        setDropoffSuggestions([]);
        setShowDropoffSuggestions(false);
      }
    }
  };

  const handleAddressSelect = (address, type) => {
    const fullAddress = address.summaryline;
    if (type === "pickup") {
      setFormData((prev) => ({ ...prev, pickup: fullAddress }));
      setShowPickupSuggestions(false);
      setPickupSuggestions([]);
      geocodeAddress(fullAddress, "pickup");
      setLocationDetails((prev) => ({
        ...prev,
        pickup: {
          floor: "0",
          hasLift: false,
          parkingAvailable: false,
          entranceSteps: 0,
        },
      }));
      setLocationDetailsSaved((prev) => ({ ...prev, pickup: true }));
    } else {
      setFormData((prev) => ({ ...prev, destination: fullAddress }));
      setShowDropoffSuggestions(false);
      setDropoffSuggestions([]);
      geocodeAddress(fullAddress, "dropoff");
      setLocationDetails((prev) => ({
        ...prev,
        dropoff: {
          floor: "0",
          hasLift: false,
          parkingAvailable: false,
          entranceSteps: 0,
        },
      }));
      setLocationDetailsSaved((prev) => ({ ...prev, dropoff: true }));
    }
  };

  const initializeMap = () => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 55.9533, lng: -3.1883 },
        zoom: 6,
        styles: [
          {
            featureType: "all",
            stylers: [{ saturation: -20 }, { lightness: 10 }],
          },
          {
            featureType: "water",
            stylers: [{ color: "#06b6d4" }, { lightness: 20 }],
          },
        ],
      });
      mapInstanceRef.current = map;
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer(
        {
          map,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: "#06b6d4",
            strokeOpacity: 0.8,
            strokeWeight: 6,
          },
        }
      );
    }
  };

  const geocodeAddress = (address, type) => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        const coords = { lat: location.lat(), lng: location.lng() };
        if (type === "pickup") {
          setPickupCoords(coords);
          if (dropoffCoords) calculateRoute(coords, dropoffCoords);
        } else {
          setDropoffCoords(coords);
          if (pickupCoords) calculateRoute(pickupCoords, coords);
        }
      }
    });
  };

  const calculateRoute = (origin, destination) => {
    if (!directionsServiceRef.current || !directionsRendererRef.current) return;
    directionsServiceRef.current.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
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
        }
      }
    );
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowOrderSummaryModal(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "pickup" && value.length >= 3)
      fetchAddressSuggestions(value, "pickup");
    else if (field === "destination" && value.length >= 3)
      fetchAddressSuggestions(value, "dropoff");
  };

  const calculateTotalMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split("h ").map((part) => {
      if (part.includes("m")) return parseInt(part.replace("m", ""));
      return parseInt(part) * 60;
    });
    return (hours || 0) + (minutes || 0);
  };

  const formatTimeFromMinutes = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  const getTotalEstimatedTime = () => {
    if (!travelTime || !formData.selectedVan) return "0h 0m";
    const travelMinutes = calculateTotalMinutes(travelTime);
    const loadingMinutes = calculateTotalMinutes(
      config.vanTimeInfo[formData.selectedVan].loadingUnloadingTime
    );
    const totalMinutes = travelMinutes + loadingMinutes;
    return formatTimeFromMinutes(totalMinutes);
  };

  const isWeekend = (date) => {
    if (!date) return false;
    const dayName = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return config.pricing.weekendDates.includes(dayName);
  };

  const generateHourOptions = () => {
    if (!formData.selectedVan || !travelTime) return [];
    const totalMinutes = calculateTotalMinutes(getTotalEstimatedTime());
    const roundedTotalMinutes = Math.ceil(totalMinutes / 30) * 30;
    const options = [];
    for (
      let i = roundedTotalMinutes;
      i <= roundedTotalMinutes + 6 * 60;
      i += 30
    ) {
      options.push({ value: i, label: formatTimeFromMinutes(i) });
    }
    return options;
  };

  const getDriverCost = () => {
    if (!formData.date) return 0;
    const isSelectedWeekend = isWeekend(formData.date);
    return isSelectedWeekend
      ? config.pricing.weekendDriverCost
      : config.pricing.weekdayDriverCost;
  };

  const getHelperCost = () => {
    if (!formData.date || !formData.selectedHelp) return 0;
    const isSelectedWeekend = isWeekend(formData.date);
    const helperCost = isSelectedWeekend
      ? config.pricing.weekendHelperCost
      : config.pricing.weekdayHelperCost;
    if (formData.selectedHelp === "no-help") return 0;
    if (formData.selectedHelp === "1-helper") return helperCost;
    if (formData.selectedHelp === "2-helpers") return helperCost * 2;
    return 0;
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const updateItemQty = (main, sub, delta) => {
    setSelectedItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.main === main && item.sub === sub
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].qty += delta;
        if (updatedItems[existingItemIndex].qty <= 0)
          updatedItems.splice(existingItemIndex, 1);
        return updatedItems;
      } else if (delta > 0) {
        return [...prev, { main, sub, qty: delta }];
      }
      return prev;
    });
  };

  const addCustomItem = () => {
    if (customItem.title.trim()) {
      setSelectedItems((prev) => [
        ...prev,
        {
          main: "Custom Items",
          sub: customItem.title,
          qty: customItem.qty,
          dimensions: `${customItem.width}cm x ${customItem.height}cm x ${customItem.depth}cm`,
          weight: `${customItem.weight}kg`,
          instructions: customItem.instructions,
        },
      ]);
      setCustomItem({
        title: "",
        qty: 1,
        width: "",
        height: "",
        depth: "",
        weight: "",
        instructions: "",
      });
      setShowCustomItemForm(false);
    }
  };

  const removeItem = (main, sub) => {
    setSelectedItems((prev) =>
      prev.filter((item) => !(item.main === main && item.sub === sub))
    );
  };

  const handleMoveTypeChange = (type) => {
    setMoveType(type);
    if (type === "fill-van") setSelectedItems([]);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.pickup &&
          formData.destination &&
          distance &&
          locationDetailsSaved.pickup &&
          locationDetailsSaved.dropoff
        );
      case 2:
        return formData.selectedVan;
      case 3:
        return (
          formData.selectedHours !== null && formData.date && formData.time
        );
      case 4:
        return moveType === "add-items" ? selectedItems.length > 0 : true;
      case 5:
        return formData.selectedHelp;
      default:
        return true;
    }
  };

  const handleConfirmOrder = () => {
    setShowOrderSummaryModal(false);
    setShowContactModal(true);
  };

  const handleProceed = async () => {
    const bookingDetails = {
      pickupLocation: formData.pickup,
      pickupLocationDetails: locationDetails.pickup,
      dropoffLocation: formData.destination,
      dropoffLocationDetails: locationDetails.dropoff,
      distance,
      travelTime,
      selectedVan: vanOptions.find((van) => van.id === formData.selectedVan)
        ?.name,
      selectedHelp: helpOptions.find((h) => h.id === formData.selectedHelp)
        ?.name,
      selectedHours: formData.selectedHours
        ? formatTimeFromMinutes(formData.selectedHours)
        : "Not selected",
      selectedDate: formData.date,
      selectedTime: formData.time,
      selectedItems,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      packageSize: formData.packageSize,
      notes: formData.notes,
      estimatedPrice: estimatedPrice,
    };

    console.log(
      `Booking Details:\n\n${JSON.stringify(bookingDetails, null, 2)}`
    );

    try {
      const response = await fetch(
        "https://sandybrown-beaver-820293.hostingersite.com/backend/strip.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit booking details");
      }

      const result = await response.json();
      console.log("Response from PHP:", result);

      // Use the stripePromise
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: result.sessionId });
      }
    } catch (error) {
      console.error("Error:", error);
      // Show error to user
    }

    setShowContactModal(false);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // ========== EFFECTS ==========
  useEffect(() => {
    if (!window.google && !isScriptLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB5HXMB2gEyG0nanDJY9TvTZpCQdg3ZvpY&libraries=places,geocoding&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initializeMap;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
    } else if (window.google && !isScriptLoaded) {
      setIsScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isScriptLoaded && window.google) initializeMap();
  }, [isScriptLoaded]);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
      setShowDatePicker(false);
      setShowTimePicker(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsCalculating(true);
    let total = 0;
    if (formData.selectedVan)
      total += config.vanTimeInfo[formData.selectedVan].basePrice;
    if (distance !== null) total += distance * config.pricing.distanceRate;
    if (formData.selectedVan && travelTime && formData.selectedHours !== null) {
      const hourlyCost =
        (formData.selectedHours / 60) *
        config.vanTimeInfo[formData.selectedVan].hourlyRate;
      total += hourlyCost;
    }
    if (formData.selectedHelp) total += getHelperCost();
    if (formData.date) total += getDriverCost();
    setEstimatedPrice(total.toFixed(2));
    setIsCalculating(false);
  }, [
    formData.selectedVan,
    formData.selectedHelp,
    distance,
    travelTime,
    formData.selectedHours,
    formData.date,
  ]);

  // ========== COMPONENTS ==========
  const CustomDatePicker = ({ value, onChange, placeholder }) => {
    const dates = generateDates();
    const selectedDate = dates.find((d) => d.date === value);
    return (
      <div className="relative">
        <div
          className="flex items-center justify-between w-full px-3 py-3 border border-slate-200 rounded-xl cursor-pointer bg-white hover:border-cyan-300 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            setShowDatePicker(!showDatePicker);
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-700">Select Date</p>
              <p
                className={
                  value
                    ? "text-sm text-slate-800 font-medium"
                    : "text-sm text-slate-400"
                }
              >
                {selectedDate
                  ? selectedDate.isToday
                    ? "Today"
                    : selectedDate.isTomorrow
                    ? "Tomorrow"
                    : selectedDate.display
                  : placeholder}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              showDatePicker ? "rotate-180" : ""
            }`}
          />
        </div>
        {showDatePicker && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="grid grid-cols-1 gap-1">
                {dates.map((dateOption) => (
                  <div
                    key={dateOption.date}
                    className={`px-3 py-2 cursor-pointer rounded-lg transition-all duration-200 flex items-center justify-between hover:bg-cyan-50 ${
                      value === dateOption.date
                        ? "bg-cyan-100 border border-cyan-300"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(dateOption.date);
                      setShowDatePicker(false);
                    }}
                  >
                    <div>
                      <p className="font-medium text-sm text-slate-800">
                        {dateOption.isToday
                          ? "Today"
                          : dateOption.isTomorrow
                          ? "Tomorrow"
                          : dateOption.display}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(dateOption.date).toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    {(dateOption.isToday || dateOption.isTomorrow) && (
                      <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full font-medium">
                        {dateOption.isToday ? "Today" : "Tomorrow"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CustomTimePicker = ({ value, onChange, placeholder }) => {
    const selectedTime = config.timeSlots.find((time) => time === value);
    return (
      <div className="relative">
        <div
          className="flex items-center justify-between w-full px-3 py-3 border border-slate-200 rounded-xl cursor-pointer bg-white hover:border-cyan-300 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            setShowTimePicker(!showTimePicker);
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-700">Select Time</p>
              <p
                className={
                  value
                    ? "text-sm text-slate-800 font-medium"
                    : "text-sm text-slate-400"
                }
              >
                {selectedTime || placeholder}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              showTimePicker ? "rotate-180" : ""
            }`}
          />
        </div>
        {showTimePicker && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="grid grid-cols-2 gap-1">
                {config.timeSlots.map((time) => (
                  <div
                    key={time}
                    className={`px-2 py-2 cursor-pointer rounded-lg transition-all duration-200 text-center hover:bg-purple-50 ${
                      value === time
                        ? "bg-purple-100 border border-purple-300 text-purple-700"
                        : "text-slate-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(time);
                      setShowTimePicker(false);
                    }}
                  >
                    <span className="font-medium text-sm">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CustomSelect = ({
    options,
    value,
    onChange,
    placeholder,
    className = "",
  }) => {
    const isOpen = openDropdown === placeholder;
    return (
      <div className={`relative ${className}`}>
        <div
          className="flex items-center justify-between w-full px-3 py-3 border border-slate-200 rounded-xl cursor-pointer bg-white hover:border-cyan-300 transition-all duration-200 shadow-sm hover:shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(isOpen ? null : placeholder);
          }}
        >
          <span
            className={
              value
                ? "text-sm text-slate-800 font-medium"
                : "text-sm text-slate-400"
            }
          >
            {options.find((option) => option.value === value)?.label ||
              placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-40 overflow-y-auto">
            <div className="p-1">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-cyan-50 transition-colors rounded-lg text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(option.value);
                    setOpenDropdown(null);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const ToggleSwitch = ({ checked, onChange, label }) => {
    return (
      <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white hover:border-cyan-300 transition-all duration-200">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <button
          type="button"
          className={`relative inline-flex h-6 w-10 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 shadow-sm ${
            checked
              ? "bg-gradient-to-r from-cyan-500 to-cyan-600"
              : "bg-slate-300"
          }`}
          onClick={onChange}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
              checked ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    );
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Where to?";
      case 2:
        return "Choose Your Van";
      case 3:
        return "When?";
      case 4:
        return "What's moving?";
      case 5:
        return "Need Help?";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Tell us your pickup and destination";
      case 2:
        return "Select your perfect vehicle";
      case 3:
        return "Pick your preferred date and time";
      case 4:
        return "Choose what you're moving";
      case 5:
        return "Choose your assistance level";
      default:
        return "";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Pickup Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <input
                  ref={pickupInputRef}
                  type="text"
                  placeholder="Enter pickup address"
                  value={formData.pickup}
                  onChange={(e) => handleInputChange("pickup", e.target.value)}
                  onFocus={() => {
                    if (pickupSuggestions.length > 0)
                      setShowPickupSuggestions(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowPickupSuggestions(false), 200);
                  }}
                  className="w-full pl-12 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm hover:shadow-md bg-white text-sm"
                />
                {showPickupSuggestions && pickupSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-40 overflow-y-auto">
                    <div className="p-1">
                      {pickupSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors text-sm"
                          onMouseDown={() =>
                            handleAddressSelect(suggestion, "pickup")
                          }
                        >
                          <p className="font-medium text-slate-800">
                            {suggestion.summaryline}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {locationDetailsSaved.pickup && (
                <div className="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                  <Check className="w-3 h-3" />
                  <span className="font-medium">Location details saved</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Destination Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <input
                  ref={destinationInputRef}
                  type="text"
                  placeholder="Enter destination address"
                  value={formData.destination}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                  onFocus={() => {
                    if (dropoffSuggestions.length > 0)
                      setShowDropoffSuggestions(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowDropoffSuggestions(false), 200);
                  }}
                  className="w-full pl-12 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm hover:shadow-md bg-white text-sm"
                />
                {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-40 overflow-y-auto">
                    <div className="p-1">
                      {dropoffSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors text-sm"
                          onMouseDown={() =>
                            handleAddressSelect(suggestion, "dropoff")
                          }
                        >
                          <p className="font-medium text-slate-800">
                            {suggestion.summaryline}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {locationDetailsSaved.dropoff && (
                <div className="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                  <Check className="w-3 h-3" />
                  <span className="font-medium">Location details saved</span>
                </div>
              )}
            </div>
            <div
              ref={mapRef}
              className="mt-4 rounded-xl overflow-hidden border border-slate-200 h-40 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center shadow-inner"
            >
              {isScriptLoaded ? (
                <div className="text-center">
                  <Navigation className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <p className="text-slate-500 text-xs font-medium">
                    Map will appear when addresses are entered
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-1"></div>
                  <p className="text-slate-500 text-xs font-medium">
                    Loading maps...
                  </p>
                </div>
              )}
            </div>
            {distance && (
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Navigation className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        Distance
                      </h4>
                      <p className="text-slate-600 text-xs">
                        Between pickup and destination
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-cyan-600">
                      {distance} <span className="text-sm">miles</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 mb-1">
                Choose Your Perfect Van
              </h3>
              <p className="text-slate-600 text-sm">
                Select the right size for your move
              </p>
            </div>
            <div className="space-y-3">
              {vanOptions.map((van) => (
                <div
                  key={van.id}
                  className={`border rounded-xl p-3 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                    formData.selectedVan === van.id
                      ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 transform scale-[1.02] shadow-md"
                      : "border-slate-200 hover:border-cyan-300 bg-white"
                  }`}
                  onClick={() => handleInputChange("selectedVan", van.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                      <img
                        src={van.image}
                        alt={van.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-bold text-sm text-slate-800">
                            {van.name}
                          </h3>
                          <p className="text-slate-600 text-xs">
                            {van.description}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {van.capacity}
                          </p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            formData.selectedVan === van.id
                              ? "border-cyan-500 bg-cyan-500 shadow-sm"
                              : "border-slate-300"
                          }`}
                        >
                          {formData.selectedVan === van.id && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {van.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                When do you need us?
              </h3>
              <p className="text-slate-600 text-base max-w-md mx-auto">
                Select your preferred date and time for your move
              </p>
            </div>
            {formData.selectedVan && travelTime && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-blue-900/5">
                  <h4 className="font-bold text-lg flex items-center gap-2 mb-4 text-slate-800">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    {
                      vanOptions.find((van) => van.id === formData.selectedVan)
                        ?.name
                    }{" "}
                    - Time Estimation
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        Travel Time:
                      </span>
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg text-sm">
                        {travelTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-slate-500" />
                        Loading/Unloading:
                      </span>
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg text-sm">
                        {
                          config.vanTimeInfo[formData.selectedVan]
                            .loadingUnloadingTime
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg mt-3">
                      <span className="font-bold text-white text-sm">
                        Estimated Total Time:
                      </span>
                      <span className="font-bold text-white text-lg">
                        {getTotalEstimatedTime()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-slate-700">
                    <p>
                      Based on a{" "}
                      {vanOptions
                        .find((van) => van.id === formData.selectedVan)
                        ?.name.toLowerCase()}
                      , we estimate it will take {getTotalEstimatedTime()} to
                      complete your move. Please adjust this to reflect the
                      exact time you need to load and unload.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-lg shadow-blue-900/5">
                  <h4 className="font-bold text-base flex items-center gap-2 mb-3 text-slate-800">
                    <div className="p-1.5 bg-amber-100 rounded-lg">
                      <Package className="w-4 h-4 text-amber-600" />
                    </div>
                    Loading & Unloading Time
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      How much time do you need to load and unload?
                    </label>
                    <CustomSelect
                      options={generateHourOptions().map((option) => ({
                        value: option.value,
                        label: option.label,
                      }))}
                      value={formData.selectedHours}
                      onChange={(value) =>
                        handleInputChange("selectedHours", value)
                      }
                      placeholder="Select duration"
                    />
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-lg shadow-blue-900/5">
                  <h4 className="font-bold text-base flex items-center gap-2 mb-4 text-slate-800">
                    <div className="p-1.5 bg-purple-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    Select Date & Time
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="relative w-full">
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Choose your moving date
                      </label>
                      <DatePicker
                        selected={
                          formData.date ? new Date(formData.date) : null
                        }
                        onChange={(date: Date | null) =>
                          handleInputChange(
                            "date",
                            date ? date.toISOString().split("T")[0] : ""
                          )
                        }
                        minDate={new Date()}
                        className="w-full px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md bg-white text-sm"
                        placeholderText="Select a date"
                        dateFormat="EEE, MMM d, yyyy"
                        selectsStart
                        selectsEnd
                        startDate={
                          formData.date ? new Date(formData.date) : null
                        }
                        endDate={formData.date ? new Date(formData.date) : null}
                      />
                    </div>
                    <div className="relative w-full">
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Preferred start time
                      </label>
                      <CustomTimePicker
                        value={formData.time}
                        onChange={(value) => handleInputChange("time", value)}
                        placeholder="Choose time"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 mb-1">
                What are you moving?
              </h3>
              <p className="text-slate-600 text-sm">
                Choose your moving approach
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => handleMoveTypeChange("fill-van")}
                className={`p-3 rounded-xl font-semibold transition-all duration-300 border ${
                  moveType === "fill-van"
                    ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-cyan-600 shadow-md transform scale-[1.02]"
                    : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-cyan-300"
                }`}
              >
                <Truck className="w-5 h-5 mx-auto mb-1" />
                <span className="block text-xs">Fill a Van</span>
              </button>
              <button
                onClick={() => handleMoveTypeChange("add-items")}
                className={`p-3 rounded-xl font-semibold transition-all duration-300 border ${
                  moveType === "add-items"
                    ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-cyan-600 shadow-md transform scale-[1.02]"
                    : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-cyan-300"
                }`}
              >
                <Package className="w-5 h-5 mx-auto mb-1" />
                <span className="block text-xs">Add Items</span>
              </button>
            </div>
            {moveType === "add-items" && !showCustomItemForm && (
              <>
                <div className="relative mb-4">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <input
                    placeholder="Search for items..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="w-full pl-12 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm hover:shadow-md bg-white text-sm"
                  />
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.main}
                      className="border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div
                        className="flex justify-between items-center p-3 cursor-pointer hover:bg-slate-50 rounded-xl"
                        onClick={() => toggleCategory(category.main)}
                      >
                        <span className="font-semibold text-slate-800 text-sm">
                          {category.main}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-300 text-slate-500 ${
                            expandedCategories.includes(category.main)
                              ? "transform rotate-90"
                              : ""
                          }`}
                        />
                      </div>
                      {expandedCategories.includes(category.main) && (
                        <div className="px-3 pb-3 space-y-1">
                          {category.subItems.map((subItem) => {
                            const existingItem = selectedItems.find(
                              (item) =>
                                item.main === category.main &&
                                item.sub === subItem
                            );
                            const qty = existingItem ? existingItem.qty : 0;
                            return (
                              <div
                                key={subItem}
                                className="flex items-center justify-between p-2 border border-slate-100 rounded-lg bg-slate-50 hover:bg-white transition-colors"
                              >
                                <span className="text-xs font-medium text-slate-700">
                                  {subItem}
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateItemQty(category.main, subItem, -1);
                                    }}
                                    disabled={qty <= 0}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:border-red-300 hover:bg-red-50 disabled:opacity-50 transition-all duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-slate-600" />
                                  </button>
                                  <span className="font-bold w-6 text-center text-slate-800 bg-white px-1 py-0.5 rounded-lg text-xs">
                                    {qty}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateItemQty(category.main, subItem, 1);
                                    }}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-slate-600" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowCustomItemForm(true)}
                  className="w-full py-3 text-cyan-600 hover:text-cyan-800 font-semibold flex items-center justify-center gap-1 border border-dashed border-cyan-300 rounded-xl hover:border-cyan-400 hover:bg-cyan-50 transition-all duration-200 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add custom item
                </button>
                {selectedItems.length > 0 && (
                  <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-sm mb-3 flex items-center gap-1 text-slate-800">
                      <ShoppingCart className="w-4 h-4 text-cyan-600" />
                      Selected Items ({selectedItems.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 text-xs">
                              {item.sub}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {item.main}
                            </p>
                            {item.dimensions && (
                              <p className="text-xs text-slate-500">
                                {item.dimensions}, {item.weight}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full text-xs">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => removeItem(item.main, item.sub)}
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors group"
                            >
                              <X className="h-3 w-3 text-slate-400 group-hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            {moveType === "add-items" && showCustomItemForm && (
              <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    Add Custom Item
                  </h4>
                  <button
                    onClick={() => setShowCustomItemForm(false)}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <X className="h-3 w-3 text-slate-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      placeholder="What are you moving?"
                      value={customItem.title}
                      onChange={(e) =>
                        setCustomItem({ ...customItem, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Quantity
                    </label>
                    <div className="flex items-center justify-center gap-3 bg-white p-2 rounded-lg border border-slate-200">
                      <button
                        onClick={() =>
                          setCustomItem({
                            ...customItem,
                            qty: Math.max(1, customItem.qty - 1),
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-red-100 border border-slate-200 hover:border-red-300 transition-all"
                      >
                        <Minus className="h-4 w-4 text-slate-600" />
                      </button>
                      <span className="font-bold text-lg w-8 text-center text-slate-800">
                        {customItem.qty}
                      </span>
                      <button
                        onClick={() =>
                          setCustomItem({
                            ...customItem,
                            qty: customItem.qty + 1,
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-green-100 border border-slate-200 hover:border-green-300 transition-all"
                      >
                        <Plus className="h-4 w-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Width (cm)
                      </label>
                      <input
                        type="number"
                        placeholder="Width"
                        value={customItem.width}
                        onChange={(e) =>
                          setCustomItem({
                            ...customItem,
                            width: e.target.value,
                          })
                        }
                        className="w-full px-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        placeholder="Height"
                        value={customItem.height}
                        onChange={(e) =>
                          setCustomItem({
                            ...customItem,
                            height: e.target.value,
                          })
                        }
                        className="w-full px-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Depth (cm)
                      </label>
                      <input
                        type="number"
                        placeholder="Depth"
                        value={customItem.depth}
                        onChange={(e) =>
                          setCustomItem({
                            ...customItem,
                            depth: e.target.value,
                          })
                        }
                        className="w-full px-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        placeholder="Weight"
                        value={customItem.weight}
                        onChange={(e) =>
                          setCustomItem({
                            ...customItem,
                            weight: e.target.value,
                          })
                        }
                        className="w-full px-2 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Special Instructions
                    </label>
                    <textarea
                      placeholder="Any special handling needed?"
                      value={customItem.instructions}
                      onChange={(e) =>
                        setCustomItem({
                          ...customItem,
                          instructions: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm text-sm"
                      rows={2}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowCustomItemForm(false)}
                      className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold rounded-lg hover:bg-slate-100 transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addCustomItem}
                      disabled={!customItem.title.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 transition-all font-semibold shadow-sm text-sm"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            )}
            {moveType === "fill-van" && (
              <div className="text-center py-8 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-sm text-slate-800 mb-1">
                  Fill a Van Selected
                </h4>
                <p className="text-slate-600 text-sm">
                  Perfect choice! Proceed to select your assistance level.
                </p>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 mb-1">
                Need Help Loading?
              </h3>
              <p className="text-slate-600 text-sm">
                Choose your assistance level
              </p>
            </div>
            <div className="space-y-3">
              {helpOptions.map((help) => {
                const IconComponent = help.icon;
                return (
                  <div
                    key={help.id}
                    className={`border rounded-xl p-3 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                      formData.selectedHelp === help.id
                        ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 transform scale-[1.02] shadow-md"
                        : "border-slate-200 hover:border-cyan-300 bg-white"
                    }`}
                    onClick={() => handleInputChange("selectedHelp", help.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                            formData.selectedHelp === help.id
                              ? "bg-gradient-to-br from-cyan-500 to-cyan-600"
                              : "bg-gradient-to-br from-slate-400 to-slate-500"
                          }`}
                        >
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm text-slate-800 mb-1">
                            {help.name}
                          </h3>
                          <p className="text-slate-600 text-xs mb-2">
                            {help.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                          formData.selectedHelp === help.id
                            ? "border-cyan-500 bg-cyan-500 shadow-sm"
                            : "border-slate-300"
                        }`}
                      >
                        {formData.selectedHelp === help.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 max-w-lg mx-auto border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-100 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
      <div className="mb-6 relative">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {getStepTitle()}
          </h2>
          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl shadow-sm">
            {currentStep} of 5
          </div>
        </div>
        <p className="text-slate-600 text-sm font-medium">
          {getStepDescription()}
        </p>
        <div className="mt-4 w-full bg-slate-200 rounded-full h-1.5 shadow-inner">
          <div
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-1.5 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          >
            <div className="h-full bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="min-h-[300px] relative">{renderStep()}</div>
      <div className="mt-6 pt-4 border-t border-slate-200">
        {currentStep > 1 && (
          <button
            onClick={handlePrev}
            className="flex items-center space-x-1 px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full flex items-center justify-center space-x-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-5 py-3 rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.02] disabled:transform-none text-sm`}
        >
          {currentStep === 1 && (
            <>
              <Sparkles className="w-4 h-4 mr-1" />
              <span>Show Quote</span>
            </>
          )}
          {currentStep === 2 && (
            <>
              <span>Next: Select Date & Time</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
          {currentStep === 3 && (
            <>
              <span>Next: Select Items</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
          {currentStep === 4 && (
            <>
              <span>Next: Select Helper</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
          {currentStep === 5 && (
            <>
              <Check className="w-4 h-4 mr-1" />
              <span>Show My Quote</span>
            </>
          )}
        </button>
      </div>

      {/* Order Summary Modal */}
      {showOrderSummaryModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4 transition-opacity duration-300">
    <div className="bg-white rounded-xl shadow-xl p-4 md:p-5 max-w-lg w-full max-h-[85vh] overflow-y-auto border border-slate-200">
      {/* Compact Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-slate-800 mb-1">Quote Summary</h3>
        <p className="text-slate-500 text-xs">Review your quote details</p>
      </div>

      {/* Price Card */}
      <div className="bg-gradient-to-br from-cyan-600 to-teal-600 p-4 rounded-lg text-white shadow-md mb-4 relative overflow-hidden">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-cyan-100 font-medium text-xs block mb-1">Estimated Total</span>
           
          </div>
          <span className="font-bold text-xl">
            {isCalculating ? (
              <div className="animate-pulse">
                <span className="inline-block w-16 h-6 bg-white/20 rounded-md"></span>
              </div>
            ) : (
              `£${estimatedPrice}`
            )}
          </span>
        </div>
      </div>

      {/* Compact Quote Details */}
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-4 mb-4">
        <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
          <Check className="w-3 h-3 text-green-600" />
          Quote Details
        </h4>

        {/* Location Section */}
        <div className="space-y-2">
          <div className="flex items-center text-slate-500 mb-1">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="text-xs font-medium">Location</span>
          </div>
          
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 text-xs">From:</span>
            <span className="font-medium text-slate-800 text-xs text-right">
              {formData.pickup || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 text-xs">To:</span>
            <span className="font-medium text-slate-800 text-xs text-right">
              {formData.destination || "Not specified"}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 text-xs">Distance:</span>
            <span className="font-medium text-slate-800 text-xs">
              {distance} miles
            </span>
          </div>
        </div>

        {/* Service Section */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center text-slate-500 mb-1">
            <Truck className="w-3 h-3 mr-1" />
            <span className="text-xs font-medium">Service</span>
          </div>
          
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 text-xs">Van:</span>
            <span className="font-medium text-slate-800 text-xs">
              {vanOptions.find((van) => van.id === formData.selectedVan)?.name || "Not selected"}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-600 text-xs">Helpers:</span>
            <span className="font-medium text-slate-800 text-xs">
              {helpOptions.find((h) => h.id === formData.selectedHelp)?.name || "Not selected"}
            </span>
          </div>
        </div>

        {/* Date & Time Section */}
        {formData.date && (
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center text-slate-500 mb-1">
              <Calendar className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">Date & Time</span>
            </div>
            
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 text-xs">Date:</span>
              <span className="font-medium text-slate-800 text-xs">
                {new Date(formData.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 text-xs">Time:</span>
              <span className="font-medium text-slate-800 text-xs">
                {formData.time || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 text-xs">Duration:</span>
              <span className="font-medium text-slate-800 text-xs">
                {formData.selectedHours ? formatTimeFromMinutes(formData.selectedHours) : "Not specified"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
        <button
          onClick={() => setShowOrderSummaryModal(false)}
          className="px-4 py-2 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-100 transition-all border border-slate-300"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmOrder}
          className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all font-semibold text-sm flex items-center justify-center gap-1"
        >
          <CheckCircle className="w-4 h-4" />
          Confirm & Book
        </button>
      </div>
    </div>
  </div>
)}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 max-w-2xl w-full border border-slate-100">
            <div className="text-center mb-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">
                Contact Information
              </h3>
              <p className="text-slate-600 text-sm">How can we reach you?</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.contactName}
                    onChange={(e) =>
                      handleInputChange("contactName", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm hover:shadow-md bg-white text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      handleInputChange("contactEmail", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm hover:shadow-md bg-white text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      handleInputChange("contactPhone", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm hover:shadow-md bg-white text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    placeholder="Any special requests or instructions for the driver?"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm hover:shadow-md bg-white resize-none text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-100 transition-all text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                disabled={
                  !formData.contactName ||
                  !formData.contactEmail ||
                  !formData.contactPhone
                }
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all font-semibold shadow-sm text-sm md:text-base"
              >
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSection;
