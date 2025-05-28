"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import {
  AlignLeft,
  ArrowLeft,
  Bold,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  Grid2X2,
  ImageIcon,
  Italic,
  Link2Icon,
  MoreHorizontal,
  Palette,
  PlayCircle,
  SaudiRiyal,
  Underline,
  X,
  GripVertical,
  Trash2,
  Plus,
  List,
} from "lucide-react";
import Link from "next/link";

export default function CreatePostPage() {
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
      <div className="flex justify-between items-center mb-4">
        <div className={`flex items-center gap-4`}>
          <Link
            href="/blogs"
            className="p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
          >
            <ArrowLeft
              size={30}
              className="text-gray-600 group-hover:text-black"
            />
          </Link>
          <h1 className="text-3xl">Add blog post</h1>
        </div>
      </div>
      <BlogPostForm />
    </>
  );
}

export function BlogPostForm() {
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

  return (
    <section className="bg-gray-200 rounded-3xl px-8 py-4">
      <div className="flex gap-8">
        {/* Main Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-4xl">
            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Blog about your latest products or news"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Content
                </label>
                {/* Custom editor */}
                <div className="rounded-4xl min-h-[150px]">
                  {/* Custom editor toolbar */}
                  <div className="flex items-center bg-gray-300 rounded-full py-1.5 px-5 mb-0.5">
                    {/* Paragraph dropdown */}
                    <div className="relative mr-2">
                      <button className="flex items-center px-3 py-1 text-sm text-gray-700 hover:bg-gray-400 rounded">
                        <span>{selectedParagraphStyle}</span>
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-400 mx-1"></div>

                    {/* Text formatting */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Underline className="w-4 h-4" />
                    </button>

                    {/* Color selector */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Palette className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-400 mx-1"></div>

                    {/* Line height */}
                    <div className="relative mr-2">
                      <button className="flex items-center p-1 text-sm text-gray-700 hover:bg-gray-400 rounded">
                        <span>
                          <AlignLeft className="w-4 h-4" />
                        </span>
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-400 mx-1"></div>

                    {/* Alignment */}
                    <div className="flex items-center">
                      <button className="p-1 hover:bg-gray-400 rounded">
                        <Link2Icon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Media */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <PlayCircle className="w-4 h-4" />
                    </button>

                    {/* Grid */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Grid2X2 className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-400 mx-1"></div>

                    {/* More options */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* More options */}
                    <button className="p-1 hover:bg-gray-400 rounded ml-auto">
                      <Code2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Editor content area */}
                  <textarea
                    className="p-4 pt-9 -mt-9 w-full min-h-[120px] border border-gray-300 rounded-md focus:outline-none focus:border-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            {/* Excerpt */}
            <div className="bg-white rounded-4xl p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block font-bold">Excerpt</label>
                {!addExcerpt && (
                  <button
                    type="button"
                    onClick={() => setAddExcerpt(true)}
                    className="text-sm text-blue-600 cursor-pointer hover:text-blue-700"
                  >
                    Add excerpt
                  </button>
                )}
              </div>
              <p className="text-sm">
                Add a summary of the post to appear on your home page or blog.
              </p>
              {/* Custom editor */}
              {addExcerpt && (
                <div className="rounded-4xl mt-6 min-h-[150px]">
                  {/* Custom editor toolbar */}
                  <div className="flex items-center bg-gray-300 rounded-full py-1.5 px-5 mb-0.5">
                    {/* Paragraph dropdown */}
                    <div className="relative mr-2">
                      <button className="flex items-center px-3 py-1 text-sm text-gray-700 hover:bg-gray-400 rounded">
                        <span>{selectedParagraphStyle}</span>
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-400 mx-1"></div>

                    {/* Text formatting */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Underline className="w-4 h-4" />
                    </button>

                    {/* Color selector */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Palette className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-400 mx-1"></div>

                    {/* Line height */}
                    <div className="relative mr-2">
                      <button className="flex items-center p-1 text-sm text-gray-700 hover:bg-gray-400 rounded">
                        <span>
                          <AlignLeft className="w-4 h-4" />
                        </span>
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-400 mx-1"></div>

                    {/* Alignment */}
                    <div className="flex items-center">
                      <button className="p-1 hover:bg-gray-400 rounded">
                        <Link2Icon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Media */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <PlayCircle className="w-4 h-4" />
                    </button>

                    {/* Grid */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <Grid2X2 className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="h-6 w-px bg-gray-400 mx-1"></div>

                    {/* More options */}
                    <button className="p-1 hover:bg-gray-400 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* More options */}
                    <button className="p-1 hover:bg-gray-400 rounded ml-auto">
                      <Code2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Editor content area */}
                  <textarea
                    className="p-4 pt-9 -mt-9 w-full min-h-[120px] border border-gray-300 rounded-md focus:outline-none focus:border-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Search Engine Listing Preview */}
            <div className="bg-white rounded-4xl p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block font-bold">
                  Search engine listing preview
                </label>
                <button
                  type="button"
                  className="text-sm cursor-pointer text-blue-600 hover:text-blue-700"
                  onClick={() => setShowAdvancedSEO(!showAdvancedSEO)}
                >
                  Edit website SEO
                </button>
              </div>
              <p className="text-sm mb-4">
                Add a title and description to see how this Blog post might
                appear in a search engine listing
              </p>

              {showAdvancedSEO && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Page title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Page title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      Meta description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Meta description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      URL handle
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="URL handle"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-6">
          {/* Visibility */}
          <div className="bg-white rounded-4xl p-6">
            <h3 className="font-medium mb-3">Visibility</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="visible"
                  checked={formData.visibility === "visible"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">Visible</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="hidden"
                  checked={formData.visibility === "hidden"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">Hidden</span>
              </label>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publish date
              </label>
              <input
                type="datetime-local"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-4xl p-6">
            <h3 className="font-medium text-gray-900 mb-3">Featured image</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center aspect-square flex items-center justify-center">
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
                Add image
              </label>
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white rounded-4xl p-6 space-y-4">
            <h3 className="font-medium text-gray-900">Organization</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <div className="relative">
                <select
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="Ariella Schroer">Ariella Schroer</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog
              </label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                  <option value="news">News</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add tags..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save as draft
        </button>
        <button
          type="submit"
          className="px-6 py-2 cursor-pointer text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Next
        </button>
      </div>
    </section>
  );
}
