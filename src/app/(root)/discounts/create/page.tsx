"use client";

import { ArrowLeft,
    Calendar,
    Tag,
    Percent,
    DollarSign,
    Package,
    Gift,
    Settings, } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

function page({searchParams}: {searchParams: {discountType: string}}) {
    const {discountType} = React.use(searchParams);
    const [formData, setFormData] = useState({
        method: "discount-code",
        discountCode: "",
        discountTitle: "",
        valueType: "percentage",
        value: "",
        appliesTo: "all-products",
        minimumRequirement: "none",
        hasEndDate: false,
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        combinations: {
            productDiscounts: false,
            orderDiscounts: false,
            shippingDiscounts: false,
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <>
        <div className="flex justify-between items-center mb-4">
    <div className={`flex items-center gap-4`}>
      <Link
        href="/discounts"
        className="p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
      >
        <ArrowLeft
          size={30}
          className="text-gray-600 group-hover:text-black"
        />
      </Link>
      <h1 className="text-3xl">Create discount</h1>
    </div>
  </div>
  <section className='bg-gray-200 rounded-4xl space-y-8 p-4'>
    <h1 className='text-2xl'>{discountType}</h1>
    {/* Content */}
    <div className="overflow-y-auto max-h-[calc(95vh-140px)] p-4 md:p-6 space-y-4 md:space-y-6 no-scrollbar">
            {/* Method Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <h3 className="text-md md:text-lg font-semibold text-gray-900 flex items-center mb-4 md:mb-6">
                <Settings className="w-5 h-5 mr-3" />
                Method
              </h3>

              <div className="space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  <label className="flex items-start space-x-3 md:space-x-4 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <input
                      type="radio"
                      name="method"
                      value="discount-code"
                      checked={formData.method === "discount-code"}
                      onChange={(e) =>
                        handleInputChange("method", e.target.value)
                      }
                      className="w-5 h-5 text-black mt-1 border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        Discount code
                      </div>
                      <div className="text-sm text-gray-600 mb-3 md:mb-4">
                        Customers must enter a code to receive the discount
                      </div>
                    </div>
                  </label>

                  {formData.method === "discount-code" && (
                    <div className="ml-7 md:ml-9">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount code
                      </label>
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <input
                          type="text"
                          placeholder="Enter discount code"
                          value={formData.discountCode}
                          onChange={(e) =>
                            handleInputChange("discountCode", e.target.value)
                          }
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        <button
                          className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                          onClick={() => {
                            const code = `DISC${Math.floor(
                              Math.random() * 10000
                            )}`;
                            handleInputChange("discountCode", code);
                          }}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 md:space-y-4">
                  <label className="flex items-start space-x-3 md:space-x-4 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <input
                      type="radio"
                      name="method"
                      value="automatic"
                      checked={formData.method === "automatic"}
                      onChange={(e) =>
                        handleInputChange("method", e.target.value)
                      }
                      className="w-5 h-5 text-black mt-1 border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        Automatic discount
                      </div>
                      <div className="text-sm text-gray-600 mb-3 md:mb-4">
                        Discount is automatically applied at checkout
                      </div>
                    </div>
                  </label>

                  {formData.method === "automatic" && (
                    <div className="ml-7 md:ml-9">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter discount title"
                        value={formData.discountTitle}
                        onChange={(e) =>
                          handleInputChange("discountTitle", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Value Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <h3 className="text-md md:text-lg font-semibold text-gray-900 flex items-center mb-4 md:mb-6">
                <Percent className="w-5 h-5 mr-3" />
                Value
              </h3>

              <div className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <input
                      type="radio"
                      name="valueType"
                      value="percentage"
                      checked={formData.valueType === "percentage"}
                      onChange={(e) =>
                        handleInputChange("valueType", e.target.value)
                      }
                      className="w-5 h-5 text-black border-gray-300"
                    />
                    <span className="font-medium">Percentage</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <input
                      type="radio"
                      name="valueType"
                      value="fixed"
                      checked={formData.valueType === "fixed"}
                      onChange={(e) =>
                        handleInputChange("valueType", e.target.value)
                      }
                      className="w-5 h-5 text-black border-gray-300"
                    />
                    <span className="font-medium">Fixed amount</span>
                  </label>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {formData.valueType === "percentage" ? (
                      <Percent className="h-5 w-5 text-gray-400" />
                    ) : (
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="number"
                    placeholder={
                      formData.valueType === "percentage" ? "10" : "10.00"
                    }
                    value={formData.value}
                    onChange={(e) => handleInputChange("value", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Applies To Section */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <h3 className="text-md md:text-lg font-semibold text-gray-900 flex items-center mb-4 md:mb-6">
                <Package className="w-5 h-5 mr-3" />
                Applies to
              </h3>

              <div className="space-y-3 md:space-y-4">
                <div className="space-y-2 md:space-y-3">
                  {[
                    "all-products",
                    "specific-collections",
                    "specific-products",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <input
                        type="radio"
                        name="appliesTo"
                        value={option}
                        checked={formData.appliesTo === option}
                        onChange={(e) =>
                          handleInputChange("appliesTo", e.target.value)
                        }
                        className="w-5 h-5 text-black border-gray-300"
                      />
                      <span className="font-medium">
                        {option === "all-products" && "All products"}
                        {option === "specific-collections" &&
                          "Specific collections"}
                        {option === "specific-products" && "Specific products"}
                      </span>
                    </label>
                  ))}
                </div>

                {(formData.appliesTo === "specific-collections" ||
                  formData.appliesTo === "specific-products") && (
                  <button className="px-4 md:px-6 py-2 md:py-3 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Browse{" "}
                    {formData.appliesTo === "specific-collections"
                      ? "collections"
                      : "products"}
                  </button>
                )}
              </div>
            </div>

            {/* Minimum Purchase Requirements */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <h3 className="text-md md:text-lg font-semibold text-gray-900 flex items-center mb-4 md:mb-6">
                <Tag className="w-5 h-5 mr-3" />
                Minimum purchase requirements
              </h3>

              <div className="space-y-3 md:space-y-4">
                {["none", "amount", "quantity"].map((requirement) => (
                  <div key={requirement} className="space-y-2 md:space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                      <input
                        type="radio"
                        name="minimumRequirement"
                        value={requirement}
                        checked={formData.minimumRequirement === requirement}
                        onChange={(e) =>
                          handleInputChange(
                            "minimumRequirement",
                            e.target.value
                          )
                        }
                        className="w-5 h-5 text-black border-gray-300"
                      />
                      <span className="font-medium">
                        {requirement === "none" && "No minimum requirements"}
                        {requirement === "amount" && "Minimum purchase amount"}
                        {requirement === "quantity" &&
                          "Minimum quantity of items"}
                      </span>
                    </label>

                    {formData.minimumRequirement === requirement &&
                      requirement !== "none" && (
                        <div className="ml-7 md:ml-9">
                          {requirement === "amount" ? (
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="number"
                                placeholder="0.00"
                                value={formData.minimumAmount}
                                onChange={(e) =>
                                  handleInputChange(
                                    "minimumAmount",
                                    e.target.value
                                  )
                                }
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                              />
                            </div>
                          ) : (
                            <input
                              type="number"
                              placeholder="1"
                              value={formData.minimumQuantity}
                              onChange={(e) =>
                                handleInputChange(
                                  "minimumQuantity",
                                  e.target.value
                                )
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Combinations */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <h3 className="text-md md:text-lg font-semibold text-gray-900 flex items-center mb-3 md:mb-4">
                <Gift className="w-5 h-5 mr-3" />
                Combinations
              </h3>
              <p className="text-sm text-gray-600 mb-4 md:mb-6">
                This discount can be combined with:
              </p>

              <div className="space-y-3 md:space-y-4">
                {[
                  { key: "productDiscounts", label: "Product discounts" },
                  { key: "orderDiscounts", label: "Order discounts" },
                  { key: "shippingDiscounts", label: "Shipping discounts" },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.combinations[key]}
                      onChange={(e) =>
                        handleCombinationChange(key, e.target.checked)
                      }
                      className="w-5 h-5 text-black rounded border-gray-300"
                    />
                    <span className="font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Active Dates */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <h3 className="text-md md:text-lg font-semibold text-gray-900 flex items-center mb-4 md:mb-6">
                <Calendar className="w-5 h-5 mr-3" />
                Active dates
              </h3>

              <div className="space-y-4 md:space-y-6">
                {/* Start date (required) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3 md:mb-4">
                    Start date and time *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start time
                      </label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          handleInputChange("startTime", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* End date (optional) */}
                <div className="space-y-3 md:space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasEndDate}
                      onChange={(e) =>
                        handleInputChange("hasEndDate", e.target.checked)
                      }
                      className="w-5 h-5 text-black rounded border-gray-300"
                    />
                    <span className="font-semibold text-gray-900">
                      Set end date and time
                    </span>
                  </label>

                  {formData.hasEndDate && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End date
                        </label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            handleInputChange("endDate", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End time
                        </label>
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) =>
                            handleInputChange("endTime", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="border-t border-gray-200 px-4 md:px-6 py-3 md:py-4 flex gap-2 flex-col-reverse sm:flex-row justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-3">
            <button
            //   onClick={handleBack}
              className="px-4 md:px-6 py-2 md:py-3 text-sm cursor-pointer font-medium text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
            >
              Cancel
            </button>
            <button
            //   onClick={handleSave}
              className="px-4 md:px-6 py-2 md:py-3 text-sm cursor-pointer font-medium text-white bg-black border-2 border-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Save discount
            </button>
          </div>
  </section>
  </>
  )
}

export default page
