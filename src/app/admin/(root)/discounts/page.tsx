"use client";
import {
  Filter,
  RefreshCcw,
  Search,
  X,
  Calendar,
  Tag,
  Percent,
  DollarSign,
  Package,
  Gift,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function Discount() {
  const t = useTranslations("Discount");
  const locale = useLocale();
  const tabs = [
    { key: "all", label: t("tabs.all") },
    { key: "active", label: t("tabs.active") },
    { key: "scheduled", label: t("tabs.scheduled") },
    { key: "expired", label: t("tabs.expired") },
  ];

  const [currentView, setCurrentView] = useState("closed");
  const [selectedDiscountType, setSelectedDiscountType] = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      title: "SHIPFREE",
      description: "Free shipping on all products",
      location: "For all countries",
      status: "expired",
      type: "Free shipping",
      used: 3,
    },
    {
      id: 2,
      title: "SUMMER20",
      description: "20% off summer collection",
      location: "For all countries",
      status: "active",
      type: "Percentage",
      used: 12,
    },
    {
      id: 3,
      title: "WELCOME10",
      description: "$10 off first order",
      location: "For new customers",
      status: "active",
      type: "Fixed amount",
      used: 8,
    },
    {
      id: 4,
      title: "B2G1",
      description: "Buy 2 get 1 free",
      location: "Selected products",
      status: "scheduled",
      type: "Buy X get Y",
      used: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    method: "discount-code",
    discountCode: "",
    discountTitle: "",
    valueType: "percentage",
    value: "",
    appliesTo: "all-products",
    selectedCollections: [],
    selectedProducts: [],
    minimumRequirement: "none",
    minimumAmount: "",
    minimumQuantity: "",
    combinations: {
      productDiscounts: false,
      orderDiscounts: false,
      shippingDiscounts: false,
    },
    hasStartDate: true,
    startDate: "",
    startTime: "",
    hasEndDate: false,
    endDate: "",
    endTime: "",
    status: "active",
  });

  const discountTypes = [
    {
      title: t("modal.productDiscount"),
      subtitle: t("modal.subtitle.product"),
      type: "Fixed amount",
    },
    {
      title: t("modal.orderDiscount"),
      subtitle: t("modal.subtitle.order"),
      type: "Fixed amount",
    },
    {
      title: t("modal.buyXGetY"),
      subtitle: t("modal.subtitle.product"),
      type: "Buy X get Y",
    },
    {
      title: t("modal.freeShipping"),
      subtitle: t("modal.subtitle.shipping"),
      type: "Free shipping",
    },
  ];

  const handleDiscountModalOpen = () => {
    setIsDiscountModalOpen(!isDiscountModalOpen);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedDiscounts([...Array(discounts.length).keys()]);
    } else {
      setSelectedDiscounts([]);
    }
  };

  const handleSelectDiscount = (index) => {
    if (selectedDiscounts.includes(index)) {
      setSelectedDiscounts(selectedDiscounts.filter((i) => i !== index));
    } else {
      setSelectedDiscounts([...selectedDiscounts, index]);
    }
  };

  const handleDiscountSelect = (discountType) => {
    setSelectedDiscountType(discountType);
    setCurrentView("create");
    setIsDiscountModalOpen(false);
  };

  const handleClose = () => {
    setCurrentView("closed");
    setSelectedDiscountType(null);
    // Reset form data when closing
    setFormData({
      method: "discount-code",
      discountCode: "",
      discountTitle: "",
      valueType: "percentage",
      value: "",
      appliesTo: "all-products",
      selectedCollections: [],
      selectedProducts: [],
      minimumRequirement: "none",
      minimumAmount: "",
      minimumQuantity: "",
      combinations: {
        productDiscounts: false,
        orderDiscounts: false,
        shippingDiscounts: false,
      },
      hasStartDate: true,
      startDate: "",
      startTime: "",
      hasEndDate: false,
      endDate: "",
      endTime: "",
      status: "Active",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCombinationChange = (type, checked) => {
    setFormData((prev) => ({
      ...prev,
      combinations: {
        ...prev.combinations,
        [type]: checked,
      },
    }));
  };

  const handleBack = () => {
    setCurrentView("select");
  };

  const handleSave = () => {
    // Generate a new discount object from form data
    const newDiscount = {
      id: discounts.length + 1,
      title:
        formData.method === "discount-code"
          ? formData.discountCode
          : formData.discountTitle,
      description: `${
        formData.valueType === "percentage"
          ? `${formData.value}% off`
          : `$${formData.value} off`
      } ${
        formData.appliesTo === "all-products"
          ? "all products"
          : formData.appliesTo === "specific-collections"
          ? "selected collections"
          : "selected products"
      }`,
      location: "For all countries", // Default for simplicity
      status: formData.status,
      type: selectedDiscountType?.type || "Discount",
      used: 0,
    };

    // Add the new discount to the list
    setDiscounts([newDiscount, ...discounts]);

    // Close the form
    handleClose();
  };

  // Filter discounts based on selected tab
  const filteredDiscounts = discounts.filter((discount) => {
    if (selectedTab === "all") return true;
    return discount.status === selectedTab;
  });

  return (
    <>
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className={`hidden lg:block absolute ${locale == 'ar' ? '-right-13 rotate-180' : '-left-13'} top-5`}
        />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal">
          {t("title")}
        </h1>
      </div>

      {/* Discount Modal */}
      {isDiscountModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <div className="bg-gray-200 rounded-3xl space-y-6 sm:space-y-8 p-4 sm:p-6 text-center relative max-w-md w-full mx-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-xl sm:text-2xl font-medium">
                {t("modal.selectTitle")}
              </h2>
              <button
                onClick={handleDiscountModalOpen}
                className="p-1 rounded-full cursor-pointer bg-white hover:text-gray-600 transition-colors flex-shrink-0"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              {discountTypes.map((discount, index) => (
                <Link
                  key={index}
                  href={`/admin/discounts/create?discountType=${discount.type
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="w-full flex items-center justify-between p-3 sm:p-4 rounded-lg cursor-pointer text-left group hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                      <div className="text-lg sm:text-xl font-medium text-gray-900 group-hover:text-gray-700 truncate">
                        {discount.title}
                      </div>
                      <div className="text-sm sm:text-base text-gray-500 line-clamp-2">
                        {discount.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 flex-shrink-0 ml-2">
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentView === "create" && (
        <CreateDiscountForm
          handleBack={handleBack}
          handleClose={handleClose}
          handleSave={handleSave}
          handleInputChange={handleInputChange}
          handleCombinationChange={handleCombinationChange}
          formData={formData}
          selectedDiscountType={selectedDiscountType}
        />
      )}

      <section className="px-2 sm:px-4 mt-5 w-full max-w-full">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl pb-6 sm:pb-10 overflow-hidden">
          {/* Header with tabs */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 space-y-4 sm:space-y-0">
            {/* Tabs - Scrollable on mobile */}
            <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                    selectedTab === tab.key ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleTabClick(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end space-x-2 flex-shrink-0">
              <button className="hidden sm:flex p-2 px-2.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">{t("actions.filter")}</span>
              </button>
              <button className="hidden sm:flex p-2 px-2.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <RefreshCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">{t("actions.refresh")}</span>
              </button>
              <button className="p-2 px-2.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">{t("actions.search")}</span>
              </button>
              <button
                onClick={handleDiscountModalOpen}
                className="px-3 sm:px-4 py-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                <span className="hidden sm:inline">{t("actions.create")}</span>
                <span className="sm:hidden">{t("actions.createShort")}</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-center text-gray-500 bg-gray-100">
                      <th className="py-3 pl-4 pr-2 font-normal w-12">
                        <input
                          type="checkbox"
                          className="rounded text-black focus:ring-black accent-black h-4 w-4"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th className={`py-3 px-4 font-normal text-${locale == "ar" ? "right" : "left"} text-base min-w-0`}>
                        {t("table.title")}
                      </th>
                      <th className="py-3 px-4 font-normal text-base w-24">
                        {t("table.status")}
                      </th>
                      <th className="py-3 px-4 font-normal text-base w-24">
                        {t("table.type")}
                      </th>
                      <th className="py-3 px-4 font-normal text-base min-w-fit">
                        {t("table.uses")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiscounts.map((discount, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 border-b border-gray-100"
                      >
                        <td className="py-3 pl-4 pr-2 text-center">
                          <input
                            type="checkbox"
                            className="rounded text-black focus:ring-black accent-black h-4 w-4"
                            checked={selectedDiscounts.includes(index)}
                            onChange={() => handleSelectDiscount(index)}
                          />
                        </td>
                        <td className={`py-3 px-4 text-${locale == "ar" ? "right" : "left"} min-w-0`}>
                          <div className="flex flex-col">
                            <div className="text-base font-medium text-gray-900 truncate">
                              {discount.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {discount.description}
                            </div>
                            <div className="text-sm text-gray-400 truncate">
                              • {discount.location}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs sm:text-sm inline-flex items-center ${
                              discount.status === "active"
                                ? "bg-green-500 text-white"
                                : discount.status === "scheduled"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-400 text-white"
                            }`}
                          >
                            {t(`tabs.${discount.status}`)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          {discount.type}
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          {discount.used}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3 p-4">
                {filteredDiscounts.map((discount, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          className="rounded text-black focus:ring-black accent-black h-4 w-4 mt-1 flex-shrink-0"
                          checked={selectedDiscounts.includes(index)}
                          onChange={() => handleSelectDiscount(index)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-base font-medium text-gray-900 truncate">
                            {discount.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {discount.description}
                          </div>
                          <div className="text-sm text-gray-400 truncate mt-1">
                            • {discount.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                            discount.status === "active"
                              ? "bg-green-500 text-white"
                              : discount.status === "scheduled"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                        >
                          {t(`tabs.${discount.status}`)}
                        </span>
                        <span className="text-gray-600">{discount.type}</span>
                      </div>
                      <span className="text-gray-600 font-medium">
                        {discount.used} {t("table.uses")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CreateDiscountForm({
  handleClose,
  handleBack,
  handleSave,
  handleInputChange,
  handleCombinationChange,
  formData,
  selectedDiscountType,
}) {
  const t = useTranslations("DiscountPage.form");
  const locale = useLocale();

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center max-h-screen max-w-screen">
        <div className="bg-gray-100 rounded-xl shadow-2xl w-full max-w-4xl mx-4 md:mx-auto max-h-[95vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-2 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBack}
                className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {t("title", {
                  type: selectedDiscountType?.title.toLowerCase(),
                })}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(95vh-140px)] p-4 md:p-6 space-y-4 md:space-y-6">
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
                          placeholder={t("fields.discountCode")}
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
                          {t("actions.generate")}
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
                        placeholder={t("fields.discountTitle")}
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
                    placeholder={t("fields.value")}
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
                    {t("actions.browse")}{" "}
                    {formData.appliesTo === "specific-collections"
                      ? t(
                          "sections.appliesTo.specificCollections"
                        ).toLowerCase()
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
                  <div
                    key={requirement.value}
                    className="space-y-2 md:space-y-3"
                  >
                    <label className="flex items-center space-x-3 cursor-pointer p-3 md:p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
                      <input
                        type="radio"
                        name="minimumRequirement"
                        value={requirement.value}
                        checked={
                          formData.minimumRequirement === requirement.value
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "minimumRequirement",
                            e.target.value
                          )
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
                                placeholder={t("fields.minimumAmount")}
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
                              placeholder={t("fields.minimumQuantity")}
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
                        {t("fields.startDate")}
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
                        {t("fields.startTime")}
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
                          {t("fields.endDate")}
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
                          {t("fields.endTime")}
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
          <div className="border-t border-gray-200 px-4 md:px-6 py-3 md:py-4 flex flex-col-reverse sm:flex-row justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 bg-gray-100">
            <button
              onClick={handleBack}
              className="px-4 md:px-6 py-2 md:py-3 text-sm cursor-pointer font-medium text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
            >
              {t("actions.cancel")}
            </button>
            <button
              onClick={handleSave}
              className="px-4 md:px-6 py-2 md:py-3 text-sm cursor-pointer font-medium text-white bg-black border-2 border-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              {t("actions.save")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
