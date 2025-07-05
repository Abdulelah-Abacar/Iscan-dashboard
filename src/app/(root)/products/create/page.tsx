"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SaudiRiyal,
  X,
  GripVertical,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.png";

export default function CreateProductPage() {
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isOnlineStore, setIsOnlineStore] = useState(true);
  const [chargeTax, setChargeTax] = useState(false);
  const [isSEOFormVisible, setIsSEOFormVisible] = useState(false);
  const [continueSellingWhenOutOfStock, setContinueSellingWhenOutOfStock] =
    useState(false);
  const [isDigitalProduct, setIsDigitalProduct] = useState(false);
  const [hasOptions, setHasOptions] = useState(false);
  const [optionsList, setOptionsList] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([
    "Color",
    "Size",
    "Material",
    "Style",
  ]);
  const [currentEditingOption, setCurrentEditingOption] = useState(null);
  const [seoPageTitle, setSeoPageTitle] = useState("");
  const [seoMetaDescription, setSeoMetaDescription] = useState("");
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagInput = (e) => {
    const value = e.target.value;

    if (value.endsWith(" ") && value.trim() !== "") {
      const newTag = value.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    } else {
      setTagInput(value);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const toggleActive = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setShowCalendar(false);
      setScheduledDate("");
    }
  };

  const handleScheduleClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (e) => {
    setScheduledDate(e.target.value);
  };

  const addNewOption = () => {
    const newOption = {
      id: Date.now(),
      name: "",
      values: [],
      isEditing: true,
    };
    setOptionsList([...optionsList, newOption]);
    setCurrentEditingOption(newOption.id);
  };

  const handleOptionNameChange = (optionId, name) => {
    setOptionsList(
      optionsList.map((option) => {
        if (option.id === optionId) {
          // If name is being set and values array is empty, add first empty value
          const updatedValues =
            option.values.length === 0 && name ? [""] : option.values;
          return { ...option, name, values: updatedValues };
        }
        return option;
      })
    );
  };

  const handleValueChange = (optionId, index, value) => {
    setOptionsList(
      optionsList.map((option) => {
        if (option.id === optionId) {
          const newValues = [...option.values];
          newValues[index] = value;
          return { ...option, values: newValues };
        }
        return option;
      })
    );
  };

  const addValueToOption = (optionId) => {
    setOptionsList(
      optionsList.map((option) => {
        if (option.id === optionId) {
          return { ...option, values: [...option.values, ""] };
        }
        return option;
      })
    );
  };

  const removeValue = (optionId, valueIndex) => {
    setOptionsList(
      optionsList.map((option) => {
        if (option.id === optionId) {
          const newValues = option.values.filter(
            (_, index) => index !== valueIndex
          );
          return { ...option, values: newValues };
        }
        return option;
      })
    );
  };

  const deleteOption = (optionId) => {
    const updatedOptions = optionsList.filter(
      (option) => option.id !== optionId
    );
    setOptionsList(updatedOptions);

    if (currentEditingOption === optionId) {
      setCurrentEditingOption(null);
    }

    // Set hasOptions to false when no options remain
    if (updatedOptions.length === 0) {
      setHasOptions(false);
    }
  };

  const handleDone = (optionId) => {
    setOptionsList(
      optionsList.map((option) =>
        option.id === optionId ? { ...option, isEditing: false } : option
      )
    );
    setCurrentEditingOption(null);
  };

  const editOption = (optionId) => {
    setOptionsList(
      optionsList.map((option) =>
        option.id === optionId ? { ...option, isEditing: true } : option
      )
    );
    setCurrentEditingOption(optionId);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleAddImage = () => {
    // This would open a file picker in a real implementation
    console.log("Add image clicked");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-4 gap-4">
        <div className={`flex items-center gap-4`}>
          <Link
            href="/products"
            className="p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
          >
            <ArrowLeft
              size={30}
              className="text-gray-600 group-hover:text-black"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl">Iscan card</h1>
        </div>
        <div className="flex items-center flex-wrap gap-2 md:gap-4 w-full md:w-auto justify-end">
          <button className="px-3 md:px-4 py-1 text-xs md:text-sm rounded-full bg-white">
            Duplicate
          </button>
          <button className="px-3 md:px-4 py-1 text-xs md:text-sm rounded-full bg-white">
            Preview
          </button>
          <button className="px-3 md:px-4 py-1 text-xs md:text-sm rounded-full bg-white">
            Share
          </button>
          <div className="flex gap-2">
            <button className="p-1 md:p-2 text-xs md:text-sm rounded-full bg-white">
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-1 md:p-2 text-xs md:text-sm rounded-full bg-white">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={handleGoBack}
          >
            <Image
              src={Logo}
              alt="logo"
              className="h-8 w-auto md:h-12"
              height={48}
              width={48}
              priority
            />
          </div>
        </div>
      </div>
      <section className="bg-gray-200 rounded-3xl px-4 md:px-8 py-4 mb-24 md:mb-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Product details */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            {/* Title section */}
            <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl shadow-sm">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 md:p-3 bg-gray-200 rounded-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="mt-4">
                <label className="block text-gray-600 mb-2">Description</label>
                <RichTextEditor />
              </div>
            </div>

            {/* Media section */}
            <div className="bg-white px-4 md:px-6 py-3 rounded-3xl md:rounded-4xl shadow-sm flex-1 flex flex-col">
              <h2 className="text-lg md:text-xl font-medium mb-4">Media</h2>
              <div className="grid grid-cols-2 md:grid-cols-9 gap-2 md:gap-4 flex-1">
                {/* Left big image - spans 5 columns */}
                <div className="col-span-1 md:col-span-3 ">
                  <div className="h-full rounded-lg relative overflow-hidden bg-gray-200">
                    <Image
                      src="https://github.com/shadcn.png"
                      alt="Large placeholder 1"
                      fill={true}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>

                {/* Right big image - spans 5 columns */}
                <div className="col-span-1 md:col-span-3 ">
                  <div className="h-full rounded-lg relative overflow-hidden bg-gray-200">
                    <Image
                      src="https://github.com/shadcn.png"
                      alt="Large placeholder 2"
                      fill={true}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>

                {/* Two small images stacked - span 2 columns */}
                <div className="col-span-2 md:col-span-3 flex flex-col gap-2 md:gap-4">
                  {/* Top small image */}
                  <div className="h-1/2 rounded-lg relative overflow-hidden bg-gray-200">
                    <Image
                      src="https://github.com/shadcn.png"
                      alt="Small placeholder 1"
                      fill={true}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Bottom small image */}
                  <div className="h-1/2 rounded-lg overflow-hidden flex items-center justify-center aspect-square border-2 border-black">
                    <button
                      onClick={handleAddImage}
                      className="py-1 px-2 md:py-2 md:px-4 bg-gray-100 rounded-full text-xs md:text-base"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Product settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Product status */}
            <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl shadow-sm">
              <h2 className="text-lg md:text-xl font-medium mb-4">
                Product status
              </h2>

              <div className="space-y-4">
                <div
                  className="flex items-center justify-between bg-gray-200 rounded-full py-2 px-4 cursor-pointer"
                  onClick={toggleActive}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        isActive ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>
                    <span>{isActive ? "Active" : "Inactive"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">v</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        isOnlineStore ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span>Online Store</span>
                  </div>
                </div>

                {!isActive && (
                  <div className="ml-6">
                    <button
                      onClick={handleScheduleClick}
                      className="text-blue-500 underline text-sm flex items-center space-x-1"
                    >
                      <span>Schedule availability</span>
                    </button>
                  </div>
                )}

                {showCalendar && !isActive && (
                  <div className="ml-6 mt-2">
                    <input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={handleDateChange}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {scheduledDate && (
                      <p className="text-sm text-gray-600 mt-1">
                        Product will be available on:{" "}
                        {new Date(scheduledDate).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <div className="relative">
                    {/* Tags display above input */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Input field */}
                    <div className="p-2 bg-gray-200 rounded-full min-h-[40px] flex items-center">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInput}
                        onKeyDown={handleTagKeyDown}
                        className="flex-1 min-w-[100px] bg-transparent border-none outline-none placeholder:text-black placeholder:text-sm md:placeholder:text-base"
                        placeholder="Tags"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Type a tag and press space or enter to add it
                  </p>
                </div>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl shadow-sm">
              <h2 className="text-lg md:text-xl font-medium mb-4">Price</h2>

              <div className="space-y-4">
                <div className="relative">
                  <SaudiRiyal
                    className="absolute top-1/2 left-2 -translate-y-1/2"
                    size={20}
                  />
                  <input
                    type="text"
                    className="w-full p-2 pl-8 bg-gray-200 rounded-full"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm md:text-base">
                    Compare at price
                  </label>
                  <div className="relative">
                    <SaudiRiyal
                      className="absolute top-1/2 left-2 -translate-y-1/2"
                      size={20}
                    />
                    <input
                      type="text"
                      className="w-full p-2 pl-8 bg-gray-200 rounded-full"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="chargeTax"
                    checked={chargeTax}
                    onChange={() => setChargeTax(!chargeTax)}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                  />
                  <label
                    htmlFor="chargeTax"
                    className="ml-2 text-xs md:text-sm"
                  >
                    Charge tax on this product
                  </label>
                </div>
              </div>
            </div>

            {/* Cost per item */}
            <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl shadow-sm">
              <h2 className="text-lg md:text-xl font-medium mb-4">
                Cost per item
              </h2>

              <div className="space-y-4">
                <div className="relative">
                  <SaudiRiyal
                    className="absolute top-1/2 left-2 -translate-y-1/2"
                    size={20}
                  />
                  <input
                    type="text"
                    className="w-full p-2 pl-8 bg-gray-200 rounded-full"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <p className="text-xs md:text-sm">
                    Customers won&apos;t see this
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content area */}
        <div className="flex mt-5">
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
            {/* Left column - includes Inventory and Shipping */}
            <div className="lg:col-span-3">
              {/* Inventory section */}
              <div className="bg-white rounded-3xl md:rounded-4xl p-4 md:p-6 mb-6 shadow-sm">
                <h2 className="text-xl md:text-2xl font-medium mb-6">
                  Inventory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div>
                    <label className="block text-base md:text-lg font-medium mb-1">
                      SKU (Stock Keeping Unit)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-base md:text-lg font-medium mb-1">
                      Barcode (ISBN, UPC, GTIN, etc.)
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="continueSellingOutOfStock"
                      checked={continueSellingWhenOutOfStock}
                      onChange={() =>
                        setContinueSellingWhenOutOfStock(
                          !continueSellingWhenOutOfStock
                        )
                      }
                      className="w-4 h-4 md:w-5 md:h-5 rounded-xl"
                    />
                  </div>
                  <label
                    htmlFor="continueSellingOutOfStock"
                    className="ml-2 text-xs md:text-sm cursor-pointer"
                  >
                    Continue selling when out of stock
                  </label>
                </div>
              </div>

              {/* Shipping and options section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping section */}
                <div className="bg-white rounded-3xl md:rounded-4xl p-4 md:p-6 shadow-sm">
                  <h2 className="text-xl md:text-2xl font-medium mb-6">
                    Shipping
                  </h2>

                  <div className="mb-6">
                    <div className="flex items-center">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id="digitalProduct"
                          checked={isDigitalProduct}
                          onChange={() =>
                            setIsDigitalProduct(!isDigitalProduct)
                          }
                          className="w-4 h-4 md:w-5 md:h-5 rounded-xl"
                        />
                      </div>
                      <label
                        htmlFor="digitalProduct"
                        className="ml-2 text-xs md:text-sm cursor-pointer"
                      >
                        This is a Digital product
                      </label>
                    </div>
                  </div>

                  <div
                    className={`mb-4 ${isDigitalProduct ? "opacity-50" : ""}`}
                  >
                    <label className="block text-base md:text-lg font-medium mb-1">
                      WEIGHT
                    </label>
                    <div className="flex relative">
                      <input
                        type="text"
                        disabled={isDigitalProduct}
                        className={`flex-1 px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDigitalProduct ? "cursor-not-allowed" : ""
                        }`}
                      />
                      <span className="absolute top-1/2 -translate-y-1/2 right-2 text-base md:text-lg">
                        KG
                      </span>
                    </div>
                  </div>

                  <div className={`${isDigitalProduct ? "opacity-50" : ""}`}>
                    <label className="block text-base md:text-lg font-medium mb-1">
                      Country of origin
                    </label>
                    <input
                      type="text"
                      disabled={isDigitalProduct}
                      className={`w-full px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDigitalProduct ? "cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Quantity section */}
                <div className="bg-white rounded-3xl md:rounded-4xl py-4 md:py-6 shadow-sm">
                  <h2 className="text-lg md:text-xl font-medium px-4 md:px-6 mb-6">
                    QUANTITY
                  </h2>

                  <div className="mb-6">
                    <label className="block text-base md:text-lg bg-gray-100 py-2 md:py-3 px-4 md:px-6 font-medium mb-1">
                      Location name
                    </label>
                    <div className="relative pt-3 px-4 md:px-7">
                      <select className="w-full px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Main branch - Jeddah</option>
                      </select>
                      <div className="absolute right-5 md:right-9 top-3 md:top-5.5 pointer-events-none">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-base md:text-lg bg-gray-100 py-2 md:py-3 px-4 md:px-6 font-medium mb-1">
                      Available quantity
                    </label>
                    <div className="pt-3 px-4 md:px-7">
                      <div className="flex items-center relative">
                        <input
                          type="text"
                          className="flex-1 px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          placeholder="1000"
                        />
                        <span
                          className={
                            "absolute top-1/2 -translate-y-1/2 right-3 md:right-0"
                          }
                        >
                          Pieces
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Options section */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 mt-6 shadow-sm">
                <h2 className="text-xl md:text-2xl font-medium mb-6">
                  Options
                </h2>
                <div className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="hasOptions"
                      checked={hasOptions}
                      onChange={() => {
                        setHasOptions(!hasOptions);
                        if (!hasOptions && optionsList.length === 0) {
                          addNewOption();
                        }
                      }}
                      className="w-4 h-4 md:w-5 md:h-5 rounded-xl cursor-pointer"
                    />
                  </div>
                  <label
                    htmlFor="hasOptions"
                    className="ml-2 text-xs md:text-sm cursor-pointer"
                  >
                    This product has options, like size or color
                  </label>
                </div>

                {hasOptions && (
                  <div className="mt-4 space-y-4">
                    {optionsList.map((option) => (
                      <div
                        key={option.id}
                        className="border-b border-gray-200 pb-4 mb-4 last:border-b-0"
                      >
                        {option.isEditing ? (
                          <div>
                            <div className="flex items-center mb-2">
                              <label className="block text-xs md:text-sm text-gray-500 mr-2">
                                Option name
                              </label>
                            </div>
                            <div className="flex items-center mb-4">
                              <select
                                value={option.name}
                                onChange={(e) => {
                                  if (e.target.value === "CREATE_NEW") {
                                    // Trigger custom option creation
                                    const customName = prompt(
                                      "Enter custom option name:"
                                    );
                                    if (customName && customName.trim()) {
                                      // Add to available options for future use
                                      if (
                                        !availableOptions.includes(
                                          customName.trim()
                                        )
                                      ) {
                                        setAvailableOptions((prev) => [
                                          ...prev,
                                          customName.trim(),
                                        ]);
                                      }
                                      handleOptionNameChange(
                                        option.id,
                                        customName.trim()
                                      );
                                    }
                                  } else {
                                    handleOptionNameChange(
                                      option.id,
                                      e.target.value
                                    );
                                  }
                                }}
                                className="w-full p-2 border text-gray-400 border-gray-300 rounded-lg text-sm md:text-base"
                              >
                                <option value="" disabled>
                                  Select an option
                                </option>
                                {availableOptions.map((optionName) => (
                                  <option key={optionName} value={optionName}>
                                    {optionName}
                                  </option>
                                ))}
                                <option
                                  value="CREATE_NEW"
                                  className="text-blue-500 font-medium"
                                >
                                  + Create new option
                                </option>
                              </select>
                              <button
                                onClick={() => deleteOption(option.id)}
                                className="ml-2 text-gray-400 cursor-pointer hover:text-red-500"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                            {option.values.length > 0 && (
                              <div className="mb-2">
                                <label className="block text-xs md:text-sm text-gray-500">
                                  Option values
                                </label>
                              </div>
                            )}

                            {option.values.map((value, index) => (
                              <div
                                key={index}
                                className="flex items-center mb-2"
                              >
                                <GripVertical
                                  size={14}
                                  className="text-gray-400 mr-2"
                                />
                                <input
                                  type="text"
                                  placeholder={`Value ${index + 1}`}
                                  value={value}
                                  onChange={(e) =>
                                    handleValueChange(
                                      option.id,
                                      index,
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base"
                                />
                                <button
                                  onClick={() => removeValue(option.id, index)}
                                  className="ml-2 text-gray-400 cursor-pointer hover:text-red-500"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            ))}

                            <button
                              onClick={() => addValueToOption(option.id)}
                              className="text-blue-500 cursor-pointer hover:text-blue-500/70 text-xs md:text-sm mt-2 mb-4"
                            >
                              Add another value
                            </button>

                            <div>
                              <button
                                onClick={() => handleDone(option.id)}
                                className="px-3 py-1 md:px-4 md:py-2 cursor-pointer hover:bg-gray-100/70 border border-gray-300 rounded-lg text-xs md:text-sm"
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-sm md:text-base">
                                {option.name}
                              </span>
                              <span className="text-gray-500 ml-2 text-xs md:text-sm">
                                {option.values
                                  .filter((v) => v.trim())
                                  .join(", ")}
                              </span>
                            </div>
                            <button
                              onClick={() => editOption(option.id)}
                              className="text-blue-500 cursor-pointer hover:text-blue-500/70 text-xs md:text-sm"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {currentEditingOption === null && (
                      <button
                        onClick={addNewOption}
                        className="text-blue-500 cursor-pointer hover:text-blue-500/70 text-xs md:text-sm flex items-center py-2"
                      >
                        <Plus size={14} className="mr-1" />
                        Add another option
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right column - Search Engine Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl md:rounded-4xl p-4 md:p-6 shadow-sm">
                <h2 className="text-xl md:text-2xl font-medium mb-6">
                  Search engine listing preview
                </h2>

                {/* Preview card */}
                <div className="bg-gray-100 rounded-3xl md:rounded-4xl p-3 md:p-4 mb-6 relative">
                  <div className="flex justify-between">
                    <h3 className="text-purple-700 text-base md:text-lg font-medium">
                      iScan card
                    </h3>
                    {isSEOFormVisible ? (
                      <button
                        onClick={() => setIsSEOFormVisible(false)}
                        className="bg-white rounded-full p-1 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsSEOFormVisible(true)}
                        className="text-white bg-black rounded-full py-1 px-2 text-xs cursor-pointer"
                      >
                        Edit Website SEO
                      </button>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">
                    https://iScan.sa/products/iScan-card
                  </p>
                  <p className="text-xs md:text-sm text-gray-700">
                    iScan offers you smart digital business cards powered by NFC
                    technology as an innovative alternative to traditional paper
                    cards, reducing costs by up to 92% and improving
                    communication efficiency and meeting management.
                  </p>
                </div>

                {/* Form fields - Conditionally rendered */}
                {isSEOFormVisible && (
                  <div className="space-y-4 bg-gray-100 rounded-3xl md:rounded-4xl p-3 md:p-4">
                    <div>
                      <label className="block text-base md:text-lg mb-1">
                        Page title
                      </label>
                      <input
                        type="text"
                        value={seoPageTitle}
                        onChange={(e) => setSeoPageTitle(e.target.value)}
                        className="w-full px-3 py-1 md:px-4 md:py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoPageTitle.length} of 70 characters used
                      </p>
                    </div>

                    <div>
                      <label className="block text-base md:text-lg mb-1">
                        Meta description
                      </label>
                      <input
                        type="text"
                        value={seoMetaDescription}
                        onChange={(e) => setSeoMetaDescription(e.target.value)}
                        className="w-full px-3 py-1 md:px-4 md:py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoMetaDescription.length} of 320 characters used
                      </p>
                    </div>

                    <div>
                      <label className="block text-base md:text-lg mb-1">
                        URL handle
                      </label>
                      <div className="flex items-center bg-white rounded-full focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="pl-3 py-1 md:py-2 text-sm md:text-base text-gray-600">
                          https://iScan.sa/products/
                        </span>
                        <input
                          type="text"
                          className="flex-1 py-1 md:py-2 bg-transparent rounded-r-full focus:outline-none text-sm md:text-base"
                          placeholder="iscan-card"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
