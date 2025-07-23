"use client";

import {
  ArrowLeft,
  Calendar,
  Tag,
  Percent,
  DollarSign,
  Package,
  Gift,
  Settings,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

function Page({ searchParams }: { searchParams: { discountType: string } }) {
  const t = useTranslations("DiscountCreate");
  const locale = useLocale();
  const { discountType } = React.use(searchParams);

  const [formData, setFormData] = useState({
    method: "discount-code",
    discountCode: "",
    discountTitle: "",
    valueType: "percentage",
    value: "",
    appliesTo: "all-products",
    minimumRequirement: "none",
    minimumAmount: "",
    minimumQuantity: "",
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCombinationChange = (key: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      combinations: {
        ...prev.combinations,
        [key]: checked,
      },
    }));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className={`flex items-center gap-4`}>
          <Link
            href="/admin/discounts"
            className="p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
          >
            {locale == "ar" ? (
              <ArrowRight
                size={24}
                className="sm:w-[30px] sm:h-[30px] text-gray-600 group-hover:text-black"
              />
            ) : (
              <ArrowLeft
                size={24}
                className="sm:w-[30px] sm:h-[30px] text-gray-600 group-hover:text-black"
              />
            )}
          </Link>
          <h1 className="text-3xl">{t("title")}</h1>
        </div>
      </div>
      <section className="bg-gray-200 rounded-4xl space-y-8 p-4">
        <h1 className="text-2xl">{discountType}</h1>
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-140px)] p-4 md:p-6 space-y-4 md:space-y-6 no-scrollbar">
          {/* Method Section */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
            <h3 className="text-md md:text-lg font-semibold text-gray-900 flex items-center mb-4 md:mb-6">
              <Settings className="w-5 h-5 mr-3" />
              {t("sections.method.title")}
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
                      {t("sections.method.discountCode.label")}
                    </div>
                    <div className="text-sm text-gray-600 mb-3 md:mb-4">
                      {t("sections.method.discountCode.description")}
                    </div>
                  </div>
                </label>

                {formData.method === "discount-code" && (
                  <div className="ml-7 md:ml-9">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("sections.method.discountCode.label")}
                    </label>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <input
                        type="text"
                        placeholder={t(
                          "sections.method.discountCode.placeholder"
                        )}
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
                        {t("sections.method.discountCode.generate")}
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
                      {t("sections.method.automatic.label")}
                    </div>
                    <div className="text-sm text-gray-600 mb-3 md:mb-4">
                      {t("sections.method.automatic.description")}
                    </div>
                  </div>
                </label>

                {formData.method === "automatic" && (
                  <div className="ml-7 md:ml-9">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("sections.method.automatic.label")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("sections.method.automatic.placeholder")}
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
              {t("sections.value.title")}
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
                  <span className="font-medium">
                    {t("sections.value.percentage")}
                  </span>
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
                  <span className="font-medium">
                    {t("sections.value.fixedAmount")}
                  </span>
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
                  placeholder={t("sections.value.placeholder")}
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
              {t("sections.appliesTo.title")}
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2 md:space-y-3">
                {[
                  {
                    value: "all-products",
                    label: t("sections.appliesTo.allProducts"),
                  },
                  {
                    value: "specific-collections",
                    label: t("sections.appliesTo.specificCollections"),
                  },
                  {
                    value: "specific-products",
                    label: t("sections.appliesTo.specificProducts"),
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <input
                      type="radio"
                      name="appliesTo"
                      value={option.value}
                      checked={formData.appliesTo === option.value}
                      onChange={(e) =>
                        handleInputChange("appliesTo", e.target.value)
                      }
                      className="w-5 h-5 text-black border-gray-300"
                    />
                    <span className="font-medium">{option.label}</span>
                  </label>
                ))}
              </div>

              {(formData.appliesTo === "specific-collections" ||
                formData.appliesTo === "specific-products") && (
                <button className="px-4 md:px-6 py-2 md:py-3 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  {t("sections.appliesTo.browse")}{" "}
                  {formData.appliesTo === "specific-collections"
                    ? t("sections.appliesTo.specificCollections").toLowerCase()
                    : t("sections.appliesTo.specificProducts").toLowerCase()}
                </button>
              )}
            </div>
          </div>

          {/* Minimum Purchase Requirements */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
            <h3 className="text-md md:text-lg font-semibold text-gray-900 flex items-center mb-4 md:mb-6">
              <Tag className="w-5 h-5 mr-3" />
              {t("sections.requirements.title")}
            </h3>

            <div className="space-y-3 md:space-y-4">
              {[
                { value: "none", label: t("sections.requirements.none") },
                { value: "amount", label: t("sections.requirements.amount") },
                {
                  value: "quantity",
                  label: t("sections.requirements.quantity"),
                },
              ].map((requirement) => (
                <div key={requirement.value} className="space-y-2 md:space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <input
                      type="radio"
                      name="minimumRequirement"
                      value={requirement.value}
                      checked={
                        formData.minimumRequirement === requirement.value
                      }
                      onChange={(e) =>
                        handleInputChange("minimumRequirement", e.target.value)
                      }
                      className="w-5 h-5 text-black border-gray-300"
                    />
                    <span className="font-medium">{requirement.label}</span>
                  </label>

                  {formData.minimumRequirement === requirement.value &&
                    requirement.value !== "none" && (
                      <div className="ml-7 md:ml-9">
                        {requirement.value === "amount" ? (
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <DollarSign className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="number"
                              placeholder={t(
                                "sections.requirements.placeholder.amount"
                              )}
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
                            placeholder={t(
                              "sections.requirements.placeholder.quantity"
                            )}
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
              {t("sections.combinations.title")}
            </h3>
            <p className="text-sm text-gray-600 mb-4 md:mb-6">
              {t("sections.combinations.description")}
            </p>

            <div className="space-y-3 md:space-y-4">
              {[
                {
                  key: "productDiscounts",
                  label: t("sections.combinations.productDiscounts"),
                },
                {
                  key: "orderDiscounts",
                  label: t("sections.combinations.orderDiscounts"),
                },
                {
                  key: "shippingDiscounts",
                  label: t("sections.combinations.shippingDiscounts"),
                },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={
                      formData.combinations[
                        key as keyof typeof formData.combinations
                      ]
                    }
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
              {t("sections.dates.title")}
            </h3>

            <div className="space-y-4 md:space-y-6">
              {/* Start date (required) */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 md:mb-4">
                  {t("sections.dates.start")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("sections.dates.startDate")}
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
                      {t("sections.dates.startTime")}
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
                    {t("sections.dates.end")}
                  </span>
                </label>

                {formData.hasEndDate && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("sections.dates.endDate")}
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
                        {t("sections.dates.endTime")}
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
          <button className="px-4 md:px-6 py-2 md:py-3 text-sm cursor-pointer font-medium text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition-colors">
            {t("actions.cancel")}
          </button>
          <button className="px-4 md:px-6 py-2 md:py-3 text-sm cursor-pointer font-medium text-white bg-black border-2 border-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
            {t("actions.save")}
          </button>
        </div>
      </section>
    </>
  );
}

export default Page;
