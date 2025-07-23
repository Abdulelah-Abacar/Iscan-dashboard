"use client";

import { Minus, Plus, SaudiRiyal, Star } from "lucide-react";
import { useState } from "react";

export const ProductDetailDialog = ({ product, onClose, onBack, onContinue }) => {
  const [quantity, setQuantity] = useState(product.minQuantity || 1);
  const [selectedType, setSelectedType] = useState(product.types?.[0] || "NFC");
  const [selectedColor, setSelectedColor] = useState("Beige");

  const productImages = [
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
    "/api/placeholder/400/400",
  ];

  const colors = [
    { name: "Black", value: "bg-black" },
    { name: "Beige", value: "bg-amber-100" },
    { name: "Blue", value: "bg-blue-400" },
  ];

  const decreaseQuantity = () => {
    if (quantity > product.minQuantity) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-2xl border-2 border-black p-8 max-w-5xl w-full max-h-[95vh] overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Images */}
          <div className="flex gap-4">
            {/* Thumbnail images */}
            <div className="flex flex-col gap-3">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors"
                >
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <span className="text-white text-xs font-bold">iScan</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Main product image */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">iScan</span>
              </div>
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="flex flex-col space-y-6">
            {/* Product title and rating */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold flex gap-1 items-center">
                <SaudiRiyal size={28} /> <span>{product.price}</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <div className="flex">{renderStars(product.rating)}</div> */}
                <span className="text-lg font-medium text-gray-700">
                  {product.rating}
                </span>
                <Star className={`w-4 h-4 fill-yellow-400 text-yellow-400`} />
                <span className="text-sm text-gray-500">
                  ({product.reviews})
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-lg font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Type selection */}
            {product.types && (
              <div className="space-y-3">
                <label className="text-lg font-medium text-gray-700">
                  Type: <span className="font-bold">{selectedType}</span>
                </label>
                <div className="flex space-x-3">
                  {product.types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-6 py-2 rounded-full border-2 transition-colors ${
                        selectedType === type
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selection */}
            <div className="space-y-3">
              <label className="text-lg font-medium text-gray-700">
                Color: <span className="font-bold">{selectedColor}</span>
              </label>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      color.value
                    } ${
                      selectedColor === color.name
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={onBack}
                className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={onContinue}
                className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};