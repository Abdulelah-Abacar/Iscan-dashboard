"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const AddOnsDialog = ({ onClose, onBack, onContinue }) => {
  const t = useTranslations("Calculator")
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const addOns = [
    {
      id: "wallet-1",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
    {
      id: "wallet-2",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
    {
      id: "wallet-3",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
    {
      id: "wallet-4",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
    {
      id: "wallet-5",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
  ];

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-100 rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar p-6 space-y-5"
      >
        {/* Dialog Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-4xl">{t("addOnsTitle")}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Add-Ons List */}
        <div className="space-y-4">
          {addOns.map((addOn) => (
            <div
              key={addOn.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={addOn.id}
                  checked={selectedAddOns.includes(addOn.id)}
                  onChange={() => handleAddOnToggle(addOn.id)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <div>
                  <h3 className="text-lg font-medium">{addOn.name}</h3>
                  <p className="text-gray-600 text-sm">{addOn.description}</p>
                </div>
              </div>
              <div className="text-lg font-medium text-gray-900">
                +{addOn.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Dialog Footer */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onBack}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};