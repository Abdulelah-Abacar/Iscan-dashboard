"use client";

import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CustomizeEliteCardDialog = ({ product, onClose, onBack, onContinue }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [matteOrGlossy, setMatteOrGlossy] = useState("Matte");
  const [forntOrBackTap, setForntOrBackTap] = useState("Front");
  const [quantity, setQuantity] = useState(product.minQuantity || 10);
  const [notes, setNotes] = useState("");

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

  const handleQuantityChange = (operation) => {
    setQuantity((prev) => {
      if (operation === "increment") {
        return prev + 1;
      } else if (operation === "decrement" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-2xl border-2 border-black p-8 max-w-6xl w-full max-h-[95vh] overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl">Customize Your {product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left Side - Card Design */}
          <div className="flex-shrink-0 w-80">
            {/* Card Preview */}
            <div className="mb-6 aspect-[1.6/1] flex items-center justify-center relative">
              <Image
                alt="card"
                src={"/IscanCard.png"}
                fill
                className="rounded-md shadow-md"
              />
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-1 mb-6 bg-white rounded-full py-1 px-2 w-fit mx-auto">
              {["Front", "Back"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setForntOrBackTap(tab)}
                  className={`px-6 py-1 rounded-full font-medium transition-colors ${
                    forntOrBackTap === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Warning Notice */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div className="text-xs text-yellow-700">
                  <span className="font-semibold">Notice:</span>
                  <br />
                  Before uploading your design, please ensure you have reviewed
                  the{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    design guidelines
                  </span>{" "}
                  thoroughly.
                  <br />
                  <br />
                  For further assistance,{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    contact Signature Client Services
                  </span>{" "}
                  — an exclusive standard for those who expect nothing but
                  excellence.
                </div>
              </div>
            </div>
          </div>

          {/* Middle - Form Upload */}
          <div className="flex-1 grid gap-6">
            <div className="space-y-4 mb-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Card Finish
                  </span>
                </div>
                <div className="flex gap-5">
                  {["Matte", "Glossy"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setMatteOrGlossy(tab)}
                      className={`px-6 py-1 rounded-sm font-medium transition-colors flex-1 ${
                        matteOrGlossy === tab
                          ? "bg-blue-600 text-white"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Upload Sections */}
            <div className="space-y-4 mb-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Front Face
                  </span>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <button className="text-sm text-black hover:gray-red-700 font-medium">
                    Upload
                  </button>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Back Face
                  </span>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <button className="text-sm text-black hover:text-gray-700 font-medium">
                    Upload
                  </button>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center justify-between gap-3 bg-white rounded-full py-1 px-2">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Notes */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Please write the notes you want..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                rows={3}
              />
            </div> */}
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
            onClick={onBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-500 rounded-lg"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};