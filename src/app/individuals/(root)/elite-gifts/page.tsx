"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  CreditCard,
  Plus,
  LockKeyholeOpen,
  MoreVertical,
  Gift,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import RequestCardDialog from "@/components/individuals/RequestCardDialog";
import { ElitePassDialog } from "@/components/individuals/ElitePassDialog";
import { CustomizeEliteCardDialog } from "@/components/individuals/CustomizeEliteCardDialog";
import { ProductDetailDialog } from "@/components/individuals/ProductDetailDialog";
import { AddOnsDialog } from "@/components/individuals/AddOnsDialog";
import { CheckoutFlow } from "@/components/individuals/CheckoutFlow";

export default function EliteGift() {
  const [code, setCode] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [newGift, setShowNewGift] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRequestCardDialogOpen, setIsRequestCardDialogOpen] = useState(false);
  const [isElitePassDialogOpen, setIsElitePassDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customizeEliteCardDialog, setShowCustomizeEliteCardDialog] =
    useState(false);
  const [addOnsDialog, setShowAddOnsDialog] = useState(false);
  const [productDetailDialog, setProductDetailDialog] = useState(false);
  const [checkoutDialog, setShowCheckoutDialog] = useState(false);
  const [userCards, setUserCards] = useState([
    {
      id: 1,
      name: "Omar Card",
      activationDate: "11/11/2023",
      linkedAccount: "Username",
      type: "Elite Card",
      vendor: "iScan",
      status: "Active",
    },
    {
      id: 2,
      name: "Omar Card",
      activationDate: "11/11/2023",
      linkedAccount: "Username",
      type: "Elite Card",
      vendor: "iScan",
      status: "Active",
    },
    {
      id: 3,
      name: "Omar Card",
      activationDate: "",
      linkedAccount: "",
      type: "",
      vendor: "",
      status: "Inactive",
    },
  ]);

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

  const products = [
    {
      id: "elite-card",
      name: "products.eliteCard.name",
      description: "products.eliteCard.description",
      image: "/elite-card.png",
      features: [
        "products.eliteCard.features.0",
        "products.eliteCard.features.1",
        "products.eliteCard.features.2",
        "products.eliteCard.features.3",
      ],
      minQuantity: 1,
      price: 82.99,
      rating: 4.9,
      reviews: 1000,
      colors: ["black", "beige", "blue"],
      types: ["NFC", "NFC + RFID"],
    },
    {
      id: "elite-pass",
      name: "products.elitePass.name",
      description: "products.elitePass.description",
      image: "/elite-pass.png",
      features: [
        "products.elitePass.features.0",
        "products.elitePass.features.1",
        "products.elitePass.features.2",
        "products.elitePass.features.3",
      ],
      minQuantity: 5,
      price: 65.99,
      rating: 4.7,
      reviews: 850,
      colors: ["black", "beige", "blue"],
      types: ["NFC", "NFC + RFID"],
    },
    {
      id: "elite-print",
      name: "products.elitePrint.name",
      description: "products.elitePrint.description",
      image: "/elite-print.png",
      features: [
        "products.elitePrint.features.0",
        "products.elitePrint.features.1",
        "products.elitePrint.features.2",
        "products.elitePrint.features.3",
      ],
      minQuantity: 10,
      price: 58.99,
      rating: 4.8,
      reviews: 920,
      colors: ["black", "beige", "blue"],
      types: ["NFC", "NFC + RFID"],
    },
  ];

  const handleRequestCard = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setQuantity(product.minQuantity);
    // setIsRequestCardDialogOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const generateRandomCode = () => {
    const words = [
      "river",
      "moon",
      "silver",
      "whisper",
      "shadow",
      "valley",
      "ancient",
      "timeless",
      "dance",
      "quiet",
    ];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomNumbers = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const generatedCode = `${randomWord}${randomNumbers}`;
    setCode(generatedCode);
    setAvailabilityMessage("");
  };

  const checkAvailability = async () => {
    if (!code.trim()) {
      return;
    }

    setIsChecking(true);
    setAvailabilityMessage("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate random availability (70% chance of being available)
    const isAvailable = Math.random() > 0.3;

    if (isAvailable) {
      setAvailabilityMessage("Good news ..\nThis iScanKey available");
    } else {
      setAvailabilityMessage("Unfortunately,\nthis iScanKey is not available.");
    }

    setIsChecking(false);
  };

  // Handle Continue
  const handleContinueFromCustomizeEliteCardDialog = () => {
    setShowCustomizeEliteCardDialog(false);
    setProductDetailDialog(true);
  };

  const handleContinueFromProductDetail = () => {
    setProductDetailDialog(false);
    setShowAddOnsDialog(true);
  };

  const handleContinueFromAddOns = () => {
    setShowAddOnsDialog(false);
    setShowCheckoutDialog(true);
  };

  const onGiftCodeContinue = () => {
    setShowNewGift(false);
    setIsRequestCardDialogOpen(true);
  };

  const onRequestCardContinue = () => {
    setIsRequestCardDialogOpen(false);
    setIsElitePassDialogOpen(true);
  };

  const onElitePassContinue = () => {
    setIsElitePassDialogOpen(false);
    setShowCustomizeEliteCardDialog(true);
  };

  // Handle back
  const handleBackFromCustomizeEliteCardDialog = () => {
    setShowCustomizeEliteCardDialog(false);
    setIsRequestCardDialogOpen(true);
  };

  const handleBackFromProductDetail = () => {
    setProductDetailDialog(false);
    setShowCustomizeEliteCardDialog(true);
  };

  const handleBackFromAddOns = () => {
    setShowAddOnsDialog(false);
    setProductDetailDialog(true);
  };

  const handleBackFromCheckout = () => {
    setShowCheckoutDialog(false);
    setShowAddOnsDialog(true);
  };

  const onElitePassBack = () => {
    setIsElitePassDialogOpen(false);
    setIsRequestCardDialogOpen(true);
  };

  return (
    <>
      <div className="flex items-center relative px-4 md:px-0">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className={`hidden lg:block absolute -left-13 top-5`}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">
          Elite Gifts
        </h1>
      </div>
      <section className="bg-gray-200 p-3 md:p-5 rounded-4xl mt-5 mb-24 md:mb-0">
        {userCards.length === 0 ? (
          // Empty State
          <div className="w-full max-w-md space-y-6 mx-auto mt-10">
            <div className="w-[200px] aspect-square bg-white p-5 rounded-full flex items-center justify-center mx-auto">
              <Gift size={150} strokeWidth={1} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl">Discover and Share Meaningful Gifts</h2>
              <p className="text-gray-600 text-xl">
                Find, personalize, and send exclusive gifts — all in one elegant
                space.
              </p>
            </div>
            <div className="mx-auto w-fit my-10">
              <button
                onClick={() => setShowNewGift(true)}
                className="inline-flex items-center gap-2 px-8 py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                <Plus size={20} />
                <span className="text-lg font-medium">New Gift</span>
              </button>
            </div>
          </div>
        ) : (
          // Cards Grid
          <div className="">
            {/* New Card Button - Top Right */}
            <div className="mb-5">
              <button
                onClick={() => setShowNewGift(true)}
                className="ml-auto flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm text-sm"
              >
                <Plus size={16} />
                <span className="font-medium">New Gift</span>
              </button>
            </div>

            <div className="bg-gray-100 py-3 px-2 rounded-full mb-28 relative text-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[99%] h-0.5 bg-black" />
              <h3 className="text-3xl bg-gray-100 px-4 z-10 relative w-fit mx-auto">
                Leap2026
              </h3>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {userCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-gray-100 rounded-[50px] p-6 shadow-sm flex flex-col items-center justify-center gap-4 relative"
                >
                  {/* Card Visual */}
                  <div className="flex justify-center z-20">
                    <Image
                      alt="card"
                      src={"/IscanCard.png"}
                      width={270}
                      height={150}
                      className="rounded-md shadow-md -mt-24"
                    />
                  </div>

                  {/* Card Name */}
                  <h3 className="text-2xl font-medium text-center">
                    {card.name}
                  </h3>

                  {/* Card Details */}
                  {card.status === "Active" ? (
                    <div className="space-y-2 text-sm grid grid-cols-2 gap-2 place-content-between w-full flex-1">
                      <div className="flex justify-center flex-col items-center">
                        <span className="">Activation Date:</span>
                        <span className="bg-white rounded-full py-0.5 px-4">
                          {card.activationDate}
                        </span>
                      </div>
                      <div className="flex justify-center flex-col items-center">
                        <span className="">Linked Account:</span>
                        <span className="bg-white rounded-full py-0.5 px-4">
                          {card.linkedAccount}
                        </span>
                      </div>
                      <div className="flex justify-center flex-col items-center">
                        <span className="">Type:</span>
                        <span className="bg-white rounded-full py-0.5 px-4">
                          {card.type}
                        </span>
                      </div>
                      <div className="flex justify-center flex-col items-center">
                        <span className="">Vendor:</span>
                        <span className="bg-white rounded-full py-0.5 px-4">
                          {card.vendor}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full flex-1">
                      <div className="absolute backdrop-blur-sm inset-0 rounded-[50px] z-10" />
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 bg-white py-2 px-5 rounded-full z-20">
                          <div
                            className={`w-5 h-5 rounded-full bg-orange-500`}
                          ></div>
                          <span className={`text-2xl font-medium`}>
                            {card.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status and Actions */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 bg-white py-1 px-4 rounded-full">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          card.status === "Active"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      ></div>
                      <span className={`text-lg font-medium`}>
                        {card.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* New Gift Dialog */}
      {newGift && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar p-6 space-y-5 ">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl flex-1">iScanKey</h2>
              <button
                onClick={() => setShowNewGift(false)}
                className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex gap-8">
              {/* Left Side */}
              <div className="flex-1 flex flex-col">
                <p className="text-lg">
                  The quiet river danced under the silver moonlight
                </p>
                <div
                  className={`flex-1 flex items-${
                    availabilityMessage ? "end" : "center"
                  }`}
                >
                  <div className="space-y-4 mb-6 flex-1">
                    <div className="flex flex-1 rounded-full bg-white p-2 pl-5">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                          setAvailabilityMessage("");
                        }}
                        className="flex-1 focus:outline-none text-gray-700 placeholder-gray-400"
                        placeholder="iScanKey"
                      />
                      <button
                        onClick={generateRandomCode}
                        className="px-6 py-2 text-sm bg-gray-100 rounded-full transition-colors duration-200 font-medium"
                      >
                        Generate
                      </button>
                    </div>

                    <button
                      onClick={checkAvailability}
                      disabled={!code.trim() || isChecking}
                      className="w-4/5 flex mx-auto rounded-full items-center justify-center py-2 bg-white disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                      {isChecking ? "Checking..." : "Check Availability"}
                    </button>

                    {/* Availability Message */}
                    {availabilityMessage && (
                      <div className={`text-center py-3 rounded-xl`}>
                        <div className="whitespace-pre-line text-lg font-medium">
                          {availabilityMessage}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Slideshow */}
              <div className="flex-shrink-0 w-80">
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

                  <div className="flex justify-center space-x-2 mb-6">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-end items-center gap-5 mt-8">
              <button
                onClick={onGiftCodeContinue}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Card Dialog */}
      {isRequestCardDialogOpen && (
        <RequestCardDialog
          onClose={() => setIsRequestCardDialogOpen(false)}
          onContinue={onRequestCardContinue}
          onRequest={handleRequestCard}
          products={products}
        />
      )}

      {/* Elite Pass Dialog */}
      {isElitePassDialogOpen && (
        <ElitePassDialog
          onBack={onElitePassBack}
          onContinue={onElitePassContinue}
        />
      )}

      {/* Customize Elite Card Dialog */}
      {customizeEliteCardDialog && selectedProduct && (
        <CustomizeEliteCardDialog
          product={selectedProduct}
          onClose={() => setShowCustomizeEliteCardDialog(false)}
          onBack={handleBackFromCustomizeEliteCardDialog}
          onContinue={handleContinueFromCustomizeEliteCardDialog}
        />
      )}

      {/* Product Detail Dialog */}
      {productDetailDialog && selectedProduct && (
        <ProductDetailDialog
          product={selectedProduct}
          onClose={() => setProductDetailDialog(false)}
          onBack={handleBackFromProductDetail}
          onContinue={handleContinueFromProductDetail}
        />
      )}

      {/* Add Ons Dialog */}
      {addOnsDialog && (
        <AddOnsDialog
          onClose={() => setShowAddOnsDialog(false)}
          onBack={handleBackFromAddOns}
          onContinue={handleContinueFromAddOns}
        />
      )}

      {checkoutDialog && (
        <CheckoutFlow
          onClose={() => setShowCheckoutDialog(false)}
          onBack={handleBackFromCheckout}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
}
