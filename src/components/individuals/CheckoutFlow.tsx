"use client";
import Image from "next/image";
import {
  Plus,
  X,
  CheckCircle,
  Check,
  ChevronDown,
  Search,
  SaudiRiyal,
} from "lucide-react";
import { useEffect, useState } from "react";

export const CheckoutFlow = ({ onClose, onBack, selectedProduct }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    city: "",
    province: "",
    postalCode: "",
    address: "",
  });
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Estimated delivery in 5-7 business days",
      price: 2.22,
      image: "/elite-card.png",
      features: [
        "products.eliteCard.features.0",
        "products.eliteCard.features.1",
        "products.eliteCard.features.2",
        "products.eliteCard.features.3",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Estimated delivery in 2-3 business days",
      price: 9.99,
      image: "/elite-pass.png",
      features: [
        "products.elitePass.features.0",
        "products.elitePass.features.1",
        "products.elitePass.features.2",
        "products.elitePass.features.3",
      ],
    },
    {
      id: "elite",
      name: "Elite",
      description: "Estimated delivery in 1 business day",
      price: 19.99,
      image: "/elite-print.png",
      features: [
        "products.elitePrint.features.0",
        "products.elitePrint.features.1",
        "products.elitePrint.features.2",
        "products.elitePrint.features.3",
      ],
    },
  ];

  const slides = [
    {
      title: "Contact+",
      content:
        "The quiet river danced under the silver moonlight, while forgotten whispers echoed through the timeless valley. Shadows of ancient tree",
    },
    {
      title: "Information",
      content:
        "Discover advanced features and premium capabilities that will enhance your experience. Access exclusive content and unlock powerful tools designed for professionals.",
    },
    {
      title: "Global Access",
      content:
        "Connect with users worldwide and access global features. Experience seamless integration across different platforms and regions with our international support.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleShippingChange = (field, value) => {
    setShippingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDiscountApply = () => {
    if (discountCode === "SAVE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    const productPrice = selectedProduct.price * quantity;
    const shipping = selectedPlan ? selectedPlan.price : 0;
    const discountAmount = (productPrice * discount) / 100;
    return productPrice + shipping - discountAmount;
  };

  // Step 1: Plan Selection
  const PlanStep = () => (
    <div className="bg-gray-100 rounded-2xl border-2 border-black p-8 max-w-5xl w-full max-h-[95vh] overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Plans</h2>
        {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button> */}
        <button className="bg-white py-1 px-4 rounded-full text-sm">
          See all details
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-4xl p-6">
            <div className="text-center flex flex-col items-center justify-between gap-2 h-full">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src="https://primary.jwwb.nl/public/y/y/h/temp-spmntgnbnohsannikjun/image-high-m3qrgg.png?enable-io=true&enable=upscale&width=160"
                  width={100}
                  height={100}
                  alt="sign"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              {/* Features */}
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-100 flex items-center justify-center rounded-full">
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="h-full w-full flex flex-col items-center justify-end mt-5">
                <div className="text-2xl mb-4 flex items-center justify-center gap-2">
                  <SaudiRiyal size={28} /> <span>{plan.price.toFixed(2)}</span>{" "}
                  / YEAR
                </div>
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-2 px-4 rounded-full font-medium flex items-center gap-2 justify-center bg-gray-200 ${
                    selectedPlan?.id === plan.id
                      ? "text-green-400"
                      : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {selectedPlan?.id === plan.id ? (
                    <Check
                      className="text-green-400"
                      strokeWidth={3}
                      size={22}
                    />
                  ) : (
                    <Plus size={22} />
                  )}
                  {selectedPlan?.id === plan.id
                    ? "Selected Plan"
                    : "Select Plan"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          className="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-medium ${
            selectedPlan
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedPlan}
          onClick={() => selectedPlan && setCurrentStep(2)}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 2: Shipping Address
  const ShippingStep = () => (
    <div className="bg-gray-100 rounded-2xl border-2 border-black p-8 max-w-5xl w-full max-h-[95vh] overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Shipping Address
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First name"
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              value={shippingData.firstName}
              onChange={(e) =>
                handleShippingChange("firstName", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              value={shippingData.lastName}
              onChange={(e) => handleShippingChange("lastName", e.target.value)}
            />
          </div>

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            value={shippingData.phoneNumber}
            onChange={(e) =>
              handleShippingChange("phoneNumber", e.target.value)
            }
          />

          <div className="relative">
            <select
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all appearance-none"
              value={shippingData.country}
              onChange={(e) => handleShippingChange("country", e.target.value)}
            >
              <option value="">Country/Region</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="IN">India</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              value={shippingData.city}
              onChange={(e) => handleShippingChange("city", e.target.value)}
            />
            <input
              type="text"
              placeholder="Province"
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              value={shippingData.province}
              onChange={(e) => handleShippingChange("province", e.target.value)}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              value={shippingData.postalCode}
              onChange={(e) =>
                handleShippingChange("postalCode", e.target.value)
              }
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Address"
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all pr-10"
              value={shippingData.address}
              onChange={(e) => handleShippingChange("address", e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="w-80">
          <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-between">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="https://primary.jwwb.nl/public/y/y/h/temp-spmntgnbnohsannikjun/image-high-m3qrgg.png?enable-io=true&enable=upscale&width=160"
                width={100}
                height={100}
                alt="sign"
                className="rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {slides[currentSlide].title}
              </h3>

              <div className="text-sm text-gray-600 leading-relaxed mb-4 text-center min-h-[80px] transition-all duration-500">
                <p>{slides[currentSlide].content}</p>
              </div>
            </div>

            <div className="w-full">
              <button className="rounded-full bg-gray-100 py-2 px-3 w-full my-5">
                Add to cart
              </button>
            </div>

            <div className="flex justify-center space-x-2 mb-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-black" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button
          className="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
          onClick={() => setCurrentStep(1)}
        >
          Back
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          onClick={() => setCurrentStep(3)}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 3: Checkout
  const CheckoutStep = () => (
    <div className="bg-gray-100 rounded-2xl border-2 border-black p-8 max-w-5xl w-full max-h-[95vh] overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Check Out</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white">
              <span className="font-bold">iScan</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{selectedProduct.name}</h3>
              <p className="text-sm text-gray-600">Quantity: {quantity}</p>
            </div>
            <div className="text-xl font-bold flex items-center justify-center gap-1">
              <SaudiRiyal size={22} />{" "}
              {(selectedProduct.price * quantity).toFixed(2)}
            </div>
          </div>

          <div className="flex space-x-2 bg-white rounded-xl p-2">
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="flex-1 rounded-xl focus:bg-white outline-none transition-all"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button
              className="px-6 py-1 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              onClick={handleDiscountApply}
            >
              Apply
            </button>
          </div>

          <div className="space-y-4 bg-white p-4 rounded-xl">
            <div className="flex justify-between">
              <span>Discount</span>
              <div className="flex items-center justify-center gap-2">
                <SaudiRiyal size={22} />
                <span>
                  {discount > 0
                    ? (
                        (selectedProduct.price * quantity * discount) /
                        100
                      ).toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <div className="flex items-center justify-center gap-2">
                <SaudiRiyal size={22} />
                <span>{(selectedProduct.price * quantity).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <div className="flex items-center justify-center gap-2">
                <SaudiRiyal size={22} />
                <span>{selectedPlan?.price.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xl bg-white py-3 px-4 rounded-xl">
            <span>Total</span>
            <div className="flex items-center justify-center gap-2">
              <SaudiRiyal size={22} />
              <span>{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="w-80">
          <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-between">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="https://primary.jwwb.nl/public/y/y/h/temp-spmntgnbnohsannikjun/image-high-m3qrgg.png?enable-io=true&enable=upscale&width=160"
                width={100}
                height={100}
                alt="sign"
                className="rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {slides[currentSlide].title}
              </h3>

              <div className="text-sm text-gray-600 leading-relaxed mb-4 text-center min-h-[80px] transition-all duration-500">
                <p>{slides[currentSlide].content}</p>
              </div>
            </div>

            <div className="w-full">
              <button className="rounded-full bg-gray-100 py-2 px-3 w-full my-5">
                Add to cart
              </button>
            </div>

            <div className="flex justify-center space-x-2 mb-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-black" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button
          className="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
          onClick={() => setCurrentStep(2)}
        >
          Back
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          onClick={() => setCurrentStep(4)}
        >
          Check Out
        </button>
      </div>
    </div>
  );

  // Step 3: Thanks
  const ThanksStep = () => (
    <div className="bg-gray-100 rounded-2xl border-2 border-black p-8 max-w-xl w-full max-h-[95vh] overflow-y-auto no-scrollbar">
      <div className="w-4/5 mx-auto">
        <div className="flex items-center justify-center">
          <Image width={150} height={50} alt={"logo"} src={"/logo.png"} />
        </div>
        <div className="flex flex-col items-center justify-center gap-6 mt-8">
          <div className="space-y-3 text-center">
            <h1 className="text-5xl">You're all set.</h1>
            <p className="text-4xl">
              Your order has been <br />
              placed successfully.
            </p>
          </div>
          <p className="px-6 py-1.5 text-xl w-full text-center bg-white text-gray-600 rounded-sm font-medium">
            order <span className="text-black">#123456</span>
          </p>
        </div>

        <div className="w-full flex justify-center mt-8">
          <button
            className="w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors"
            onClick={onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      {currentStep === 1 && <PlanStep />}
      {currentStep === 2 && <ShippingStep />}
      {currentStep === 3 && <CheckoutStep />}
      {currentStep === 4 && <ThanksStep />}
    </div>
  );
};