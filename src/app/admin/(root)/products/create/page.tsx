"use client";

import { useState, useEffect, useCallback } from "react";
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
  ArrowRight,
  ChevronDownIcon,
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.png";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CreateProductPage() {
  const t = useTranslations("CreateProductPage");
  const locale = useLocale();
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
  const [description, setDescription] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);
  
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Auto-save function
  const autoSave = useCallback(() => {
    if (hasChanges) {
      // Simulate API call
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            console.log("Auto-saving product data:", {
              title,
              description,
              isActive,
              isOnlineStore,
              chargeTax,
              continueSellingWhenOutOfStock,
              isDigitalProduct,
              hasOptions,
              optionsList,
              seoPageTitle,
              seoMetaDescription,
              scheduledDate,
              tags,
            });
            setHasChanges(false);
            resolve();
          }, 1000);
        }),
        {
          loading: "Saving product changes...",
          success: "Product changes saved successfully!",
          error: "Failed to save product changes",
        }
      );
    }
  }, [
    hasChanges,
    title,
    description,
    isActive,
    isOnlineStore,
    chargeTax,
    continueSellingWhenOutOfStock,
    isDigitalProduct,
    hasOptions,
    optionsList,
    seoPageTitle,
    seoMetaDescription,
    scheduledDate,
    tags,
  ]);

  // Set up auto-save effect
  useEffect(() => {
    if (hasChanges) {
      // Clear previous timeout
      if (saveTimeout) clearTimeout(saveTimeout);

      // Set new timeout
      const timeout = setTimeout(() => {
        autoSave();
      }, 1000);

      setSaveTimeout(timeout);

      // Cleanup
      return () => clearTimeout(timeout);
    }
  }, [hasChanges, autoSave]);

  const handleTagInput = (e) => {
    const value = e.target.value;
    setTagInput(value);
    setHasChanges(true);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setHasChanges(true);
      }
      setTagInput("");
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
      setHasChanges(true);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setHasChanges(true);
  };

  const toggleActive = () => {
    setIsActive(!isActive);
    setHasChanges(true);
    if (!isActive) {
      setShowCalendar(false);
      setScheduledDate("");
    }
  };

  const handleScheduleClick = () => {
    setShowCalendar(!showCalendar);
    setHasChanges(true);
  };

  const handleDateChange = (e) => {
    setScheduledDate(e.target.value);
    setHasChanges(true);
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
    setHasChanges(true);
  };

  const handleOptionNameChange = (optionId, name) => {
    setOptionsList(
      optionsList.map((option) => {
        if (option.id === optionId) {
          const updatedValues =
            option.values.length === 0 && name ? [""] : option.values;
          return { ...option, name, values: updatedValues };
        }
        return option;
      })
    );
    setHasChanges(true);
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
    setHasChanges(true);
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
    setHasChanges(true);
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
    setHasChanges(true);
  };

  const deleteOption = (optionId) => {
    const updatedOptions = optionsList.filter(
      (option) => option.id !== optionId
    );
    setOptionsList(updatedOptions);
    setHasChanges(true);

    if (currentEditingOption === optionId) {
      setCurrentEditingOption(null);
    }

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
    setHasChanges(true);
  };

  const editOption = (optionId) => {
    setOptionsList(
      optionsList.map((option) =>
        option.id === optionId ? { ...option, isEditing: true } : option
      )
    );
    setCurrentEditingOption(optionId);
    setHasChanges(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleAddImage = () => {
    console.log("Add image clicked");
    setHasChanges(true);
  };

  const handleDescriptionChange = (content) => {
    setDescription(content);
    setHasChanges(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-4 gap-4">
        <div className={`flex items-center gap-4`}>
          <Link
            href="/admin/products"
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
          <h1 className="text-2xl md:text-3xl">{t("title")}</h1>
        </div>
        <div className="flex items-center flex-wrap gap-2 md:gap-4 w-full md:w-auto justify-end">
          <button className="px-3 md:px-4 py-1 text-xs md:text-sm rounded-full bg-white">
            {t("actions.duplicate")}
          </button>
          <button className="px-3 md:px-4 py-1 text-xs md:text-sm rounded-full bg-white">
            {t("actions.preview")}
          </button>
          <button className="px-3 md:px-4 py-1 text-xs md:text-sm rounded-full bg-white">
            {t("actions.share")}
          </button>
          <div className={`flex gap-2 ${locale == "ar" && "flex-row-reverse"}`}>
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
                placeholder={t("placeholder.title")}
                className="w-full p-2 md:p-3 bg-gray-200 rounded-full"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setHasChanges(true);
                }}
              />

              <div className="mt-4">
                <label className="block text-gray-600 mb-2">
                  {t("description")}
                </label>
                <RichTextEditor onChange={handleDescriptionChange} />
              </div>
            </div>

            {/* Media section */}
            <div className="bg-white px-4 md:px-6 py-3 rounded-3xl md:rounded-4xl shadow-sm flex-1 flex flex-col">
              <h2 className="text-lg md:text-xl font-medium mb-4">
                {t("media.title")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-9 gap-2 md:gap-4 flex-1">
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

                <div className="col-span-2 md:col-span-3 flex flex-col gap-2 md:gap-4">
                  <div className="h-1/2 rounded-lg relative overflow-hidden bg-gray-200">
                    <Image
                      src="https://github.com/shadcn.png"
                      alt="Small placeholder 1"
                      fill={true}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="h-1/2 rounded-lg overflow-hidden flex items-center justify-center aspect-square border-2 border-black">
                    <button
                      onClick={handleAddImage}
                      className="py-1 px-2 md:py-2 md:px-4 bg-gray-100 rounded-full text-xs md:text-base"
                    >
                      {t("media.addImage")}
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
                {t("productStatus.title")}
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
                    <span>
                      {isActive
                        ? t("productStatus.active")
                        : t("productStatus.inactive")}
                    </span>
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
                    <span>{t("productStatus.onlineStore")}</span>
                  </div>
                </div>

                {!isActive && (
                  <div className="ml-6">
                    <button
                      onClick={handleScheduleClick}
                      className="text-blue-500 underline text-sm flex items-center space-x-1"
                    >
                      <span>{t("productStatus.scheduleAvailability")}</span>
                    </button>
                  </div>
                )}

                {showCalendar && !isActive && (
                  <div className="ml-6 mt-2">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="date-picker" className="px-1">
                          Date
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date-picker"
                              className="w-32 justify-between font-normal"
                            >
                              {date ? date.toLocaleDateString() : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={date}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setDate(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="time-picker" className="px-1">
                          Time
                        </Label>
                        <Input
                          type="time"
                          id="time-picker"
                          step="1"
                          defaultValue="10:30:00"
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </div>
                    </div>
                    {/* <input
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
                    )} */}
                  </div>
                )}

                <div>
                  <div className="relative">
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

                    <div className="p-2 bg-gray-200 rounded-full min-h-[40px] flex items-center">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInput}
                        onKeyDown={handleTagKeyDown}
                        className="flex-1 min-w-[100px] bg-transparent border-none outline-none placeholder:text-black placeholder:text-sm md:placeholder:text-base"
                        placeholder={t("productStatus.tagsPlaceholder")}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {t("productStatus.tagsHelp")}
                  </p>
                </div>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl shadow-sm">
              <h2 className="text-lg md:text-xl font-medium mb-4">
                {t("price.title")}
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
                    placeholder={t("placeholder.price")}
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm md:text-base">
                    {t("price.compareAtPrice")}
                  </label>
                  <div className="relative">
                    <SaudiRiyal
                      className="absolute top-1/2 left-2 -translate-y-1/2"
                      size={20}
                    />
                    <input
                      type="text"
                      className="w-full p-2 pl-8 bg-gray-200 rounded-full"
                      placeholder={t("placeholder.price")}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="chargeTax"
                    checked={chargeTax}
                    onChange={() => {
                      setChargeTax(!chargeTax);
                      setHasChanges(true);
                    }}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                  />
                  <label
                    htmlFor="chargeTax"
                    className="mx-2 text-xs md:text-sm"
                  >
                    {t("price.chargeTax")}
                  </label>
                </div>
              </div>
            </div>

            {/* Cost per item */}
            <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl shadow-sm">
              <h2 className="text-lg md:text-xl font-medium mb-4">
                {t("costPerItem.title")}
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
                    placeholder={t("placeholder.price")}
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div>
                  <p className="text-xs md:text-sm">{t("costPerItem.note")}</p>
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
                  {t("inventory.title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div>
                    <label className="block text-base md:text-lg font-medium mb-1">
                      {t("inventory.sku")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div>
                    <label className="block text-base md:text-lg font-medium mb-1">
                      {t("inventory.barcode")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="continueSellingOutOfStock"
                      checked={continueSellingWhenOutOfStock}
                      onChange={() => {
                        setContinueSellingWhenOutOfStock(
                          !continueSellingWhenOutOfStock
                        );
                        setHasChanges(true);
                      }}
                      className="w-4 h-4 md:w-5 md:h-5 rounded-xl"
                    />
                  </div>
                  <label
                    htmlFor="continueSellingOutOfStock"
                    className="mx-2 text-xs md:text-sm cursor-pointer"
                  >
                    {t("inventory.continueSelling")}
                  </label>
                </div>
              </div>

              {/* Shipping and options section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping section */}
                <div className="bg-white rounded-3xl md:rounded-4xl p-4 md:p-6 shadow-sm">
                  <h2 className="text-xl md:text-2xl font-medium mb-6">
                    {t("shipping.title")}
                  </h2>

                  <div className="mb-6">
                    <div className="flex items-center">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id="digitalProduct"
                          checked={isDigitalProduct}
                          onChange={() => {
                            setIsDigitalProduct(!isDigitalProduct);
                            setHasChanges(true);
                          }}
                          className="w-4 h-4 md:w-5 md:h-5 rounded-xl"
                        />
                      </div>
                      <label
                        htmlFor="digitalProduct"
                        className="mx-2 text-xs md:text-sm cursor-pointer"
                      >
                        {t("shipping.digitalProduct")}
                      </label>
                    </div>
                  </div>

                  <div
                    className={`mb-4 ${isDigitalProduct ? "opacity-50" : ""}`}
                  >
                    <label className="block text-base md:text-lg font-medium mb-1">
                      {t("shipping.weight")}
                    </label>
                    <div className="flex relative" dir="ltr">
                      <input
                        type="text"
                        disabled={isDigitalProduct}
                        className={`flex-1 px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDigitalProduct ? "cursor-not-allowed" : ""
                        }`}
                        onChange={() => setHasChanges(true)}
                      />
                      <span className="absolute top-1/2 -translate-y-1/2 right-2 text-base md:text-lg">
                        KG
                      </span>
                    </div>
                  </div>

                  <div className={`${isDigitalProduct ? "opacity-50" : ""}`}>
                    <label className="block text-base md:text-lg font-medium mb-1">
                      {t("shipping.countryOfOrigin")}
                    </label>
                    <input
                      type="text"
                      disabled={isDigitalProduct}
                      className={`w-full px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDigitalProduct ? "cursor-not-allowed" : ""
                      }`}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>

                {/* Quantity section */}
                <div className="bg-white rounded-3xl md:rounded-4xl py-4 md:py-6 shadow-sm">
                  <h2 className="text-lg md:text-xl font-medium px-4 md:px-6 mb-6">
                    {t("quantity.title")}
                  </h2>

                  <div className="mb-6">
                    <label className="block text-base md:text-lg bg-gray-100 py-2 md:py-3 px-4 md:px-6 font-medium mb-1">
                      {t("quantity.location")}
                    </label>
                    <div className="relative pt-3 px-4 md:px-7">
                      <select
                        className="w-full px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={() => setHasChanges(true)}
                      >
                        <option>Main branch - Jeddah</option>
                      </select>
                      <div className="absolute right-5 md:right-9 top-3 md:top-5.5 pointer-events-none">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-base md:text-lg bg-gray-100 py-2 md:py-3 px-4 md:px-6 font-medium mb-1">
                      {t("quantity.available")}
                    </label>
                    <div className="pt-3 px-4 md:px-7">
                      <div className="flex items-center relative" dir="ltr">
                        <input
                          type="text"
                          className="flex-1 px-3 py-1 md:px-4 md:py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          placeholder={t("placeholder.quantity")}
                          onChange={() => setHasChanges(true)}
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
                  {t("options.title")}
                </h2>
                <div className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="hasOptions"
                      checked={hasOptions}
                      onChange={() => {
                        setHasOptions(!hasOptions);
                        setHasChanges(true);
                        if (!hasOptions && optionsList.length === 0) {
                          addNewOption();
                        }
                      }}
                      className="w-4 h-4 md:w-5 md:h-5 rounded-xl cursor-pointer"
                    />
                  </div>
                  <label
                    htmlFor="hasOptions"
                    className="mx-2 text-xs md:text-sm cursor-pointer"
                  >
                    {t("options.hasOptions")}
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
                                {t("options.optionName")}
                              </label>
                            </div>
                            <div className="flex items-center mb-4">
                              <select
                                value={option.name}
                                onChange={(e) => {
                                  if (e.target.value === "CREATE_NEW") {
                                    const customName = prompt(
                                      "Enter custom option name:"
                                    );
                                    if (customName && customName.trim()) {
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
                                  {t("options.selectOption")}
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
                                  {t("options.createNew")}
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
                                  {t("options.optionValues")}
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
                                  placeholder={`${t("options.optionValues")} ${
                                    index + 1
                                  }`}
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
                              {t("options.addValue")}
                            </button>

                            <div>
                              <button
                                onClick={() => handleDone(option.id)}
                                className="px-3 py-1 md:px-4 md:py-2 cursor-pointer hover:bg-gray-100/70 border border-gray-300 rounded-lg text-xs md:text-sm"
                              >
                                {t("options.done")}
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
                        {t("options.addOption")}
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
                  {t("seo.title")}
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
                        {t("seo.editSeo")}
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
                        {t("seo.pageTitle")}
                      </label>
                      <input
                        type="text"
                        value={seoPageTitle}
                        onChange={(e) => {
                          setSeoPageTitle(e.target.value);
                          setHasChanges(true);
                        }}
                        className="w-full px-3 py-1 md:px-4 md:py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoPageTitle.length}{" "}
                        {t("seo.charactersUsed", { max: 70 })}
                      </p>
                    </div>

                    <div>
                      <label className="block text-base md:text-lg mb-1">
                        {t("seo.metaDescription")}
                      </label>
                      <input
                        type="text"
                        value={seoMetaDescription}
                        onChange={(e) => {
                          setSeoMetaDescription(e.target.value);
                          setHasChanges(true);
                        }}
                        className="w-full px-3 py-1 md:px-4 md:py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {seoMetaDescription.length}{" "}
                        {t("seo.charactersUsed", { max: 320 })}
                      </p>
                    </div>

                    <div>
                      <label className="block text-base md:text-lg mb-1">
                        {t("seo.urlHandle")}
                      </label>
                      <div
                        className="flex items-center bg-white rounded-full focus-within:ring-2 focus-within:ring-blue-500"
                        dir="ltr"
                      >
                        <span className="pl-3 py-1 md:py-2 text-sm md:text-base text-gray-600">
                          https://iScan.sa/products/
                        </span>
                        <input
                          type="text"
                          className="flex-1 py-1 md:py-2 bg-transparent rounded-r-full focus:outline-none text-sm md:text-base"
                          placeholder="iscan-card"
                          onChange={() => setHasChanges(true)}
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
