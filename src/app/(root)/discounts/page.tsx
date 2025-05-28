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
import { useState } from "react";

export default function Discount() {
  const tabs = ["All", "Active", "Scheduled", "Expired"];
  const [currentView, setCurrentView] = useState("closed"); // 'closed', 'select' or 'create'
  const [selectedDiscountType, setSelectedDiscountType] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      title: "SHIPFREE",
      description: "Free shipping on all products",
      location: "For all countries",
      status: "Expired",
      type: "Free shipping",
      used: 3,
    },
    {
      id: 2,
      title: "SUMMER20",
      description: "20% off summer collection",
      location: "For all countries",
      status: "Active",
      type: "Percentage",
      used: 12,
    },
    {
      id: 3,
      title: "WELCOME10",
      description: "$10 off first order",
      location: "For new customers",
      status: "Active",
      type: "Fixed amount",
      used: 8,
    },
    {
      id: 4,
      title: "B2G1",
      description: "Buy 2 get 1 free",
      location: "Selected products",
      status: "Scheduled",
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
    status: "Active", // Default status for new discounts
  });

  const discountTypes = [
    {
      title: "Amount off products",
      subtitle: "Product discount",
      type: "Fixed amount",
    },
    {
      title: "Amount off order",
      subtitle: "Order discount",
      type: "Fixed amount",
    },
    {
      title: "Buy X get Y",
      subtitle: "Product discount",
      type: "Buy X get Y",
    },
    {
      title: "Free shipping",
      subtitle: "Shipping discount",
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
    if (selectedTab === "All") return true;
    return discount.status.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <>
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className="hidden md:block absolute -left-13 top-5"
        />
        <h1 className="text-5xl font-normal">Discount</h1>
      </div>
      {/* Discount Modal */}
      {isDiscountModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center max-w-screen">
          <div className="bg-gray-200 rounded-3xl space-y-8 p-4 text-center relative max-w-md w-full">
            <div className="flex items-center justify-between border-b border-gray-200">
              <h2 className="text-2xl">Select discount type</h2>
              <button
                onClick={handleDiscountModalOpen}
                className="p-1 rounded-full cursor-pointer bg-white hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            {/* Content */}
            <div className="">
              <div className="space-y-3">
                {discountTypes.map((discount, index) => (
                  <button
                    key={index}
                    onClick={() => handleDiscountSelect(discount)}
                    className="w-full flex items-center justify-between rounded-lg cursor-pointer text-left group"
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-xl font-medium text-gray-900 group-hover:text-gray-700">
                          {discount.title}
                        </div>
                        <div className="text-base text-gray-500">
                          {discount.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-600">
                      <ChevronRight size={24} />
                    </div>
                  </button>
                ))}
              </div>
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
      <section className="md:px-4 mt-5 min-w-5xl">
        <div className="relative bg-white rounded-4xl pb-10">
          {/* Header with tabs */}
          <div className="flex justify-between items-center p-4">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 rounded-full text-sm font-medium ${
                    selectedTab === tab ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <button className="p-2 px-2.5 rounded-full bg-gray-200">
                <Filter className="h-5 w-5" />
              </button>
              <button className="p-2 px-2.5 rounded-full bg-gray-200">
                <RefreshCcw className="h-5 w-5" />
              </button>
              <button className="p-2 px-2.5 rounded-full bg-gray-200">
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={handleDiscountModalOpen}
                className="px-4 py-2 cursor-pointer bg-gray-200 rounded-full"
              >
                Create Discount
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-center text-gray-500 bg-gray-100">
                  <th className="py-3 pl-4 pr-2 font-normal">
                    <input
                      type="checkbox"
                      className="rounded text-black focus:ring-black accent-black h-4 w-4"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-4 font-normal text-left text-base">
                    Title
                  </th>
                  <th className="py-3 px-4 font-normal text-base">Status</th>
                  <th className="py-3 px-4 font-normal text-base">Type</th>
                  <th className="py-3 px-4 font-normal text-base">Uses</th>
                </tr>
              </thead>
              <tbody>
                {filteredDiscounts.map((discount, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 pl-4 pr-2 text-center">
                      <input
                        type="checkbox"
                        className="rounded text-black focus:ring-black accent-black h-4 w-4"
                        checked={selectedDiscounts.includes(index)}
                        onChange={() => handleSelectDiscount(index)}
                      />
                    </td>
                    <td className="py-2 px-4 text-left">
                      <div className="flex flex-col">
                        <div>
                          <div className="text-base font-medium text-gray-900">
                            {discount.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {discount.description}
                          </div>
                          <div className="text-sm text-gray-400">
                            • {discount.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm inline-flex items-center ${
                          discount.status === "Active"
                            ? "bg-green-500 text-white"
                            : discount.status === "Scheduled"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-400 text-white"
                        }`}
                      >
                        {discount.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center">{discount.type}</td>
                    <td className="py-2 px-4 text-center">{discount.used}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                Create {selectedDiscountType?.title.toLowerCase()} discount
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
          <div className="border-t border-gray-200 px-4 md:px-6 py-3 md:py-4 flex flex-col-reverse sm:flex-row justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 bg-gray-100">
            <button
              onClick={handleBack}
              className="px-4 md:px-6 py-2 md:py-3 text-sm cursor-pointer font-medium text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 md:px-6 py-2 md:py-3 text-sm cursor-pointer font-medium text-white bg-black border-2 border-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Save discount
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
