"use client";
import { Filter, RefreshCcw, Search, X, Edit, Trash2, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function BlogPosts() {
  const t = useTranslations("BlogPosts");
  const locale = useLocale();
  const tabs = [t("tabs.all"), t("tabs.published"), t("tabs.draft"), t("tabs.archived")];
  const [selectedTab, setSelectedTab] = useState(t("tabs.all"));
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dropdownRef = useRef(null);
  const [filters, setFilters] = useState({
    category: "",
    author: "",
    sortBy: "title",
    sortOrder: "asc"
  });

  // Sample blog posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with Next.js",
      image: "/api/placeholder/80/80",
      status: t("status.published"),
      views: "1,024 views",
      category: "Development",
      author: "Jane Doe",
    },
    {
      id: 2,
      title: "React Hooks Explained",
      image: "/api/placeholder/80/80",
      status: t("status.published"),
      views: "2,560 views",
      category: "Tutorial",
      author: "John Smith",
    },
    {
      id: 3,
      title: "CSS Grid Layouts",
      image: "/api/placeholder/80/80",
      status: t("status.draft"),
      views: "Not published",
      category: "Design",
      author: "Alex Johnson",
    },
    {
      id: 4,
      title: "State Management in 2023",
      image: "/api/placeholder/80/80",
      status: t("status.archived"),
      views: "3,450 views",
      category: "Development",
      author: "Sarah Williams",
    },
    {
      id: 5,
      title: "Advanced TypeScript Patterns",
      image: "/api/placeholder/80/80",
      status: t("status.published"),
      views: "1,892 views",
      category: "Development",
      author: "Jane Doe",
    },
    {
      id: 6,
      title: "UI/UX Best Practices",
      image: "/api/placeholder/80/80",
      status: t("status.draft"),
      views: "Not published",
      category: "Design",
      author: "Sarah Williams",
    },
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActionsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get unique categories and authors for filter options
  const uniqueCategories = [...new Set(posts.map(post => post.category))];
  const uniqueAuthors = [...new Set(posts.map(post => post.author))];

  // Filter and sort posts based on current filters
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by tab (status)
    if (selectedTab !== t("tabs.all")) {
      filtered = filtered.filter(post => post.status === selectedTab);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Filter by author
    if (filters.author) {
      filtered = filtered.filter(post => post.author === filters.author);
    }

    // Sort posts
    filtered.sort((a, b) => {
      let aValue = a[filters.sortBy];
      let bValue = b[filters.sortBy];

      // Handle view counts for sorting
      if (filters.sortBy === 'views') {
        aValue = aValue === "Not published" ? 0 : parseInt(aValue.replace(/,/g, ''));
        bValue = bValue === "Not published" ? 0 : parseInt(bValue.replace(/,/g, ''));
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [selectedTab, searchTerm, filters, posts, t]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setSelectedPosts([]);
    setSelectAll(false);
    setShowActionsDropdown(false);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedPosts([...Array(filteredPosts.length).keys()]);
    } else {
      setSelectedPosts([]);
    }
    setShowActionsDropdown(false);
  };

  const handleSelectPost = (index) => {
    let newSelectedPosts;
    if (selectedPosts.includes(index)) {
      newSelectedPosts = selectedPosts.filter((i) => i !== index);
    } else {
      newSelectedPosts = [...selectedPosts, index];
    }
    setSelectedPosts(newSelectedPosts);
    setShowActionsDropdown(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      author: "",
      sortBy: "title",
      sortOrder: "asc"
    });
    setSearchTerm("");
    setSelectedTab(t("tabs.all"));
    setShowSearch(false);
    setShowFilters(false);
  };

  const refreshPosts = () => {
    // In a real app, this would refetch data from an API
    console.log("Refreshing posts...");
    setSelectedPosts([]);
    setSelectAll(false);
    setShowActionsDropdown(false);
  };

  // Action handlers
  const handleEditPost = () => {
    if (selectedPosts.length === 1) {
      const postIndex = selectedPosts[0];
      const post = filteredPosts[postIndex];
      console.log("Editing post:", post);
      // In a real app, navigate to edit page or open edit modal
      // For example: router.push(`/blogs/edit/${post.id}`);
      alert(`Editing post: ${post.title}`);
      setSelectedPosts([]);
      setShowActionsDropdown(false);
    }
  };

  const handleDeletePosts = async () => {
    if (selectedPosts.length === 0) return;
    
    setIsDeleting(true);
    const postsToDelete = selectedPosts.map(index => filteredPosts[index]);
    const postTitles = postsToDelete.map(post => post.title).join(', ');
    
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedPosts.length} post${selectedPosts.length > 1 ? 's' : ''}?\n\n${postTitles}`
    );
    
    if (confirmed) {
      try {
        // In a real app, make API calls to delete posts
        const idsToDelete = postsToDelete.map(post => post.id);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Remove deleted posts from state
        setPosts(prevPosts => prevPosts.filter(post => !idsToDelete.includes(post.id)));
        
        // Clear selections
        setSelectedPosts([]);
        setSelectAll(false);
        setShowActionsDropdown(false);
        
        console.log("Deleted posts:", postsToDelete);
        alert(`Successfully deleted ${selectedPosts.length} post${selectedPosts.length > 1 ? 's' : ''}`);
      } catch (error) {
        console.error("Error deleting posts:", error);
        alert("Error deleting posts. Please try again.");
      }
    }
    
    setIsDeleting(false);
  };

  const hasActiveFilters = searchTerm || filters.category || filters.author || selectedTab !== t("tabs.all");
  const hasSelectedPosts = selectedPosts.length > 0;
  const isSingleSelection = selectedPosts.length === 1;

  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6 md:mb-8 px-4 md:px-0">{t("title")}</h1>
      <section className="bg-gray-200 rounded-2xl p-3 md:p-5">
        <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-sm pb-6 md:pb-10">
          {/* Header with tabs and actions */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center p-3 md:p-4 space-y-3 lg:space-y-0">
            {/* Tabs - Scrollable on mobile */}
            <div className="flex space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <div className="flex space-x-2 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      selectedTab === tab ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end space-x-2">
              {/* Actions dropdown for selected posts */}
              {hasSelectedPosts && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-full"
                  >
                    <span className="text-sm font-medium">
                      {selectedPosts.length} selected
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showActionsDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showActionsDropdown && (
                    <div className="absolute overflow-hidden right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="py-1">
                        {isSingleSelection && (
                          <button
                            onClick={handleEditPost}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit Post</span>
                          </button>
                        )}
                        <button
                          onClick={handleDeletePosts}
                          disabled={isDeleting}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>{isDeleting ? 'Deleting...' : `Delete ${selectedPosts.length > 1 ? 'Posts' : 'Post'}`}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Filter button */}
              <button 
                className={`hidden sm:flex p-2 px-2.5 rounded-full cursor-pointer ${showFilters ? 'bg-blue-200' : 'bg-gray-200'}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5" />
                <span className="sr-only">{t("actions.filter")}</span>
              </button>
              {/* Refresh button */}
              <button 
                className="hidden sm:flex p-2 px-2.5 rounded-full bg-gray-200 cursor-pointer"
                onClick={refreshPosts}
              >
                <RefreshCcw className="h-5 w-5" />
                <span className="sr-only">{t("actions.refresh")}</span>
              </button>
              {/* Search button - toggles search input */}
              <button 
                className={`p-2 px-2.5 rounded-full cursor-pointer ${showSearch ? 'bg-blue-200' : 'bg-gray-200'}`}
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">{t("actions.search")}</span>
              </button>
              <Link href={"/admin/blogs/create"}>
                <button className="px-3 md:px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-sm md:text-base">
                  <span className="hidden sm:inline">{t("actions.create")}</span>
                  <span className="sm:hidden">{t("actions.createShort")}</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="px-3 md:px-4 space-y-3">
            {/* Search Bar */}
            {showSearch && (
              <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t("search.placeholder")}
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            )}

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">{t("actions.filter")}</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t("filters.category")}</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t("filters.allCategories")}</option>
                      {uniqueCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Author Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t("filters.author")}</label>
                    <select
                      value={filters.author}
                      onChange={(e) => handleFilterChange('author', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t("filters.allAuthors")}</option>
                      {uniqueAuthors.map(author => (
                        <option key={author} value={author}>{author}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t("filters.sortBy")}</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="title">{t("filters.sortOptions.title")}</option>
                      <option value="views">{t("filters.sortOptions.views")}</option>
                      <option value="category">{t("filters.sortOptions.category")}</option>
                      <option value="author">{t("filters.sortOptions.author")}</option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t("filters.order")}</label>
                    <select
                      value={filters.sortOrder}
                      onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="asc">{t("filters.orderOptions.asc")}</option>
                      <option value="desc">{t("filters.orderOptions.desc")}</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    >
                      {t("actions.clearFilters")}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="px-3 md:px-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-600">{t("filters.activeFilters")}</span>
                  {selectedTab !== t("tabs.all") && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Status: {selectedTab}
                    </span>
                  )}
                  {filters.category && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {t("filters.category")}: {filters.category}
                    </span>
                  )}
                  {filters.author && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {t("filters.author")}: {filters.author}
                    </span>
                  )}
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Search: "{searchTerm}"
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="px-3 md:px-4 py-2">
            <p className="text-sm text-gray-600">
              {t("results.showing", { filtered: filteredPosts.length, total: posts.length })}
            </p>
          </div>

          {/* Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`text-${ locale == "ar" ? "right" : "left" } text-gray-500 bg-gray-100`}>
                  <th className="py-3 pl-4 pr-2 font-normal">
                    <input
                      type="checkbox"
                      className="rounded text-black focus:ring-black accent-black h-4 w-4"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-4 font-normal text-base">{t("table.post")}</th>
                  <th className="py-3 px-4 font-normal text-base">{t("table.status")}</th>
                  <th className="py-3 px-4 font-normal text-base">{t("table.views")}</th>
                  <th className="py-3 px-4 font-normal text-base">{t("table.category")}</th>
                  <th className="py-3 px-4 font-normal text-base">{t("table.author")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post, index) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="py-2 pl-4 pr-2">
                      <input
                        type="checkbox"
                        className="rounded text-black focus:ring-black accent-black h-4 w-4"
                        checked={selectedPosts.includes(index)}
                        onChange={() => handleSelectPost(index)}
                      />
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <div className="h-14 w-14 flex-shrink-0 mr-4 bg-gray-100 rounded-sm overflow-hidden">
                          <Image
                            width={56}
                            height={56}
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-base font-medium text-gray-900">
                            {post.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm flex items-center w-fit ${
                          post.status === t("status.published")
                            ? "bg-green-100 text-green-800"
                            : post.status === t("status.draft")
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{post.views}</td>
                    <td className="py-2 px-4">{post.category}</td>
                    <td className="py-2 px-4">{post.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Layout - Mobile & Tablet */}
          <div className="lg:hidden px-3 md:px-4">
            {/* Select All - Mobile */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="rounded text-black focus:ring-black accent-black h-4 w-4"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <span>{t("table.selectAll")}</span>
              </label>
              <span className="text-xs text-gray-500">
                {t("table.selectedCount", { count: selectedPosts.length })}
              </span>
            </div>

            {/* Posts Grid */}
            <div className="space-y-3 md:space-y-4">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-4 hover:shadow-sm transition-shadow">
                  {/* Card Header */}
                  <div className="flex items-start space-x-3 mb-3">
                    <input
                      type="checkbox"
                      className="rounded text-black focus:ring-black accent-black h-4 w-4 mt-1"
                      checked={selectedPosts.includes(index)}
                      onChange={() => handleSelectPost(index)}
                    />
                    <div className="h-12 w-12 md:h-16 md:w-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        width={64}
                        height={64}
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === t("status.published")
                              ? "bg-green-100 text-green-800"
                              : post.status === t("status.draft")
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{t("table.views")}</div>
                      <div className="font-medium">{post.views}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{t("table.category")}</div>
                      <div className="font-medium">{post.category}</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{t("table.author")}</div>
                      <div className="font-medium">{post.author}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No results message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-8 px-4">
              <p className="text-gray-500 text-lg">{t("results.none")}</p>
              <button
                onClick={clearFilters}
                className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
              >
                {t("actions.clearFilters")}
              </button>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}