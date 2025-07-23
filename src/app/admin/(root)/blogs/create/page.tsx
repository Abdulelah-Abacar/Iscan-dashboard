"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ChevronDown, X, ArrowRight, ChevronDownIcon } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CreatePostPage() {
  const t = useTranslations("CreatePost");
  const locale = useLocale();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    searchEngineDescription: "",
    visibility: "visible",
    publishDate: "",
    featuredImage: null,
    author: "Ariella Schroer",
    tags: "",
    pageTitle: "",
    metaDescription: "",
    urlHandle: "",
  });

  const [selectedParagraphStyle, setSelectedParagraphStyle] =
    useState("Paragraph");
  const [isActive, setIsActive] = useState(true);
  const [isOnlineStore, setIsOnlineStore] = useState(true);
  const [isSEOFormVisible, setIsSEOFormVisible] = useState(false);
  const [hasCategories, setHasCategories] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
      }));
    }
  };

  const addNewCategory = () => {
    const newCategory = {
      id: Date.now(),
      name: "",
      isEditing: true,
    };
    setCategoryList([...categoryList, newCategory]);
  };

  const deleteCategory = (id) => {
    setCategoryList(categoryList.filter((cat) => cat.id !== id));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 pt-8 md:pt-20">
        <div className={`flex items-center gap-4`}>
          <Link
            href="/admin/blogs"
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
      </div>
      <BlogPostForm />
    </>
  );
}

export function BlogPostForm() {
  const t = useTranslations("CreatePost.form");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    searchEngineDescription: "",
    visibility: "visible",
    publishDate: "",
    featuredImage: null,
    author: "Ariella Schroer",
    tags: "",
  });

  const [showAdvancedSEO, setShowAdvancedSEO] = useState(false);
  const [selectedParagraphStyle, setSelectedParagraphStyle] =
    useState("Paragraph");
  const [description, setDescription] = useState("");
  const [addExcerpt, setAddExcerpt] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Auto-save function
  const autoSave = useCallback(() => {
    if (hasChanges) {
      // Simulate API call
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            console.log("Auto-saving data:", formData);
            setHasChanges(false);
            resolve();
          }, 1000);
        }),
        {
          loading: "Saving changes...",
          success: "Changes saved successfully!",
          error: "Failed to save changes",
        }
      );
    }
  }, [formData, hasChanges]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        featuredImage: file,
      }));
      setHasChanges(true);
    }
  };

  const handleTagInput = (e) => {
    const { value } = e.target;

    if (e.key === " " && value.trim() !== "") {
      e.preventDefault();
      const newTag = value.trim();
      if (!tagList.includes(newTag)) {
        setTagList((prev) => [...prev, newTag]);
        setHasChanges(true);
      }
      setFormData((prev) => ({
        ...prev,
        tags: "",
      }));
    } else if (e.key === "Backspace" && value === "" && tagList.length > 0) {
      setTagList((prev) => prev.slice(0, -1));
      setHasChanges(true);
    }
  };

  const removeTag = (tagToRemove) => {
    setTagList((prev) => prev.filter((tag) => tag !== tagToRemove));
    setHasChanges(true);
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
    setHasChanges(true);
  };

  const handleExcerptChange = (excerpt) => {
    setFormData((prev) => ({
      ...prev,
      excerpt,
    }));
    setHasChanges(true);
  };

  return (
    <section className="bg-gray-200 rounded-3xl px-4 md:px-6 lg:px-8 py-4 max-w-[95vw] md:max-w-[auto]">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Main Content Area */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="bg-white rounded-4xl">
            {/* Form Content */}
            <div className="p-4 md:p-6 space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  {t("title.label")}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={t("title.placeholder")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("content.label")}
                </label>
                <RichTextEditor />
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            {/* Excerpt */}
            <div className="bg-white rounded-4xl p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <label className="block font-bold">{t("excerpt.label")}</label>
                {!addExcerpt && (
                  <button
                    type="button"
                    onClick={() => setAddExcerpt(true)}
                    className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 self-start sm:self-auto"
                  >
                    {t("excerpt.addButton")}
                  </button>
                )}
              </div>
              <p className="text-sm">{t("excerpt.description")}</p>
              {addExcerpt && (
                <div className="mt-4">
                  <RichTextEditor />
                </div>
              )}
            </div>

            {/* Search Engine Listing Preview */}
            <div className="bg-white rounded-4xl p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <label className="block font-bold">{t("seo.label")}</label>
                <button
                  type="button"
                  className="text-sm cursor-pointer text-blue-600 hover:text-blue-700 self-start sm:self-auto"
                  onClick={() => setShowAdvancedSEO(!showAdvancedSEO)}
                >
                  {t("seo.editButton")}
                </button>
              </div>
              <p className="text-sm mb-4">{t("seo.description")}</p>

              {showAdvancedSEO && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      {t("seo.pageTitle")}
                    </label>
                    <input
                      type="text"
                      name="pageTitle"
                      value={formData.pageTitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      placeholder={t("seo.pageTitle")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      {t("seo.metaDescription")}
                    </label>
                    <textarea
                      rows={3}
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      placeholder={t("seo.metaDescription")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      {t("seo.urlHandle")}
                    </label>
                    <input
                      type="text"
                      name="urlHandle"
                      value={formData.urlHandle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      placeholder={t("seo.urlHandle")}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6 order-1 lg:order-2">
          {/* Visibility */}
          <div className="bg-white rounded-4xl p-4 md:p-6">
            <h3 className="font-medium mb-3">{t("visibility.label")}</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="visible"
                  checked={formData.visibility === "visible"}
                  onChange={handleInputChange}
                  className="mx-2"
                />
                <span className="text-sm">{t("visibility.visible")}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="hidden"
                  checked={formData.visibility === "hidden"}
                  onChange={handleInputChange}
                  className="mx-2"
                />
                <span className="text-sm">{t("visibility.hidden")}</span>
              </label>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("visibility.publishDate")}
              </label>
              {/* <input
                type="datetime-local"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              /> */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-3">
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
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="10:30:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-4xl p-4 md:p-6">
            <h3 className="font-medium text-gray-900 mb-3">
              {t("featuredImage.label")}
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center aspect-square flex items-center justify-center">
              <input
                type="file"
                id="featured-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="featured-image"
                className="cursor-pointer bg-gray-50 rounded-sm p-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {t("featuredImage.addButton")}
              </label>
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white rounded-4xl p-4 md:p-6 space-y-4">
            <h3 className="font-medium text-gray-900">
              {t("organization.label")}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("organization.author")}
              </label>
              <div className="relative">
                <select
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm md:text-base"
                >
                  <option value="Ariella Schroer">Ariella Schroer</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("organization.blog")}
              </label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm md:text-base">
                  <option value="news">News</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("organization.tags")}
              </label>

              {/* Tag chips display */}
              {tagList.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {tagList.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                onKeyDown={handleTagInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder={t("organization.tagsPlaceholder")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
        <button
          type="button"
          className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 order-2 sm:order-1"
        >
          {t("actions.saveDraft")}
        </button>
        <button
          type="submit"
          className="px-6 py-2 cursor-pointer text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 order-1 sm:order-2"
        >
          {t("actions.next")}
        </button>
      </div>
    </section>
  );
}
