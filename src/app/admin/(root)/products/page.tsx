"use client";
import { Filter, RefreshCcw, Search, X, Edit, Trash2, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLocale, useTranslations } from 'next-intl';

export default function Products() {
  const t = useTranslations('Products');
  const locale = useLocale();
  const dropdownRef = useRef(null);
  
  const tabs = [
    t('tabs.all'),
    t('tabs.active'),
    t('tabs.draft'),
    t('tabs.archived')
  ];
  
  const [selectedTab, setSelectedTab] = useState(t('tabs.all'));
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    vendor: '',
    inventory: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Move allProducts to component state so we can modify it
  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      name: "iScan Basic Card",
      image: "/api/placeholder/80/80",
      status: "Active", // Using hardcoded status for demo
      inventory: "400 in stock",
      type: "NTAG215",
      vendor: "iScan",
    },
    {
      id: 2,
      name: "iScan Pro Card",
      image: "/api/placeholder/80/80",
      status: "Draft",
      inventory: "0 in stock",
      type: "NTAG216",
      vendor: "iScan",
    },
    {
      id: 3,
      name: "iScan Premium Card",
      image: "/api/placeholder/80/80",
      status: "Active",
      inventory: "200 in stock",
      type: "NTAG215",
      vendor: "iScan",
    },
    {
      id: 4,
      name: "iScan Legacy Card",
      image: "/api/placeholder/80/80",
      status: "Archived",
      inventory: "50 in stock",
      type: "NTAG213",
      vendor: "iScan",
    },
    {
      id: 5,
      name: "iScan Test Card",
      image: "/api/placeholder/80/80",
      status: "Draft",
      inventory: "0 in stock",
      type: "NTAG215",
      vendor: "iScan",
    },
  ]);

  // Get unique values for filters - also memoized
  const uniqueTypes = useMemo(() => [...new Set(allProducts.map(product => product.type))], [allProducts]);
  const uniqueVendors = useMemo(() => [...new Set(allProducts.map(product => product.vendor))], [allProducts]);

  // Filter and sort products
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActionDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when selections change
  useEffect(() => {
    if (selectedProducts.length === 0) {
      setShowActionDropdown(false);
    }
  }, [selectedProducts]);

  useEffect(() => {
    let result = [...allProducts];
    
    // Apply tab filter
    if (selectedTab !== t('tabs.all')) {
      result = result.filter(product => product.status === selectedTab);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.type.toLowerCase().includes(term) ||
        product.vendor.toLowerCase().includes(term)
      );
    }
    
    // Apply other filters
    if (filters.type) {
      result = result.filter(product => product.type === filters.type);
    }
    if (filters.vendor) {
      result = result.filter(product => product.vendor === filters.vendor);
    }
    if (filters.inventory) {
      if (filters.inventory === 'in_stock') {
        result = result.filter(product => !product.inventory.includes('0 in stock'));
      } else if (filters.inventory === 'out_of_stock') {
        result = result.filter(product => product.inventory.includes('0 in stock'));
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'vendor':
          comparison = a.vendor.localeCompare(b.vendor);
          break;
        case 'inventory':
          const aInventory = parseInt(a.inventory.split(' ')[0]);
          const bInventory = parseInt(b.inventory.split(' ')[0]);
          comparison = aInventory - bInventory;
          break;
        default:
          comparison = a.name.localeCompare(b.name);
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredProducts(result);
  }, [selectedTab, searchTerm, filters, allProducts, t]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    // Reset selections when switching tabs
    setSelectAll(false);
    setSelectedProducts([]);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProducts([...Array(filteredProducts.length).keys()]);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (index) => {
    if (selectedProducts.includes(index)) {
      setSelectedProducts(selectedProducts.filter((i) => i !== index));
    } else {
      setSelectedProducts([...selectedProducts, index]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      vendor: '',
      inventory: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setSearchTerm('');
    setSelectedTab(t('tabs.all'));
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showFilters) setShowFilters(false);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (showSearch) setShowSearch(false);
  };

  const hasActiveFilters = 
    selectedTab !== t('tabs.all') || 
    searchTerm || 
    filters.type || 
    filters.vendor || 
    filters.inventory;

  // Action handlers
  const handleEditProduct = () => {
    if (selectedProducts.length === 1) {
      const productIndex = selectedProducts[0];
      const product = filteredProducts[productIndex];
      
      // Show alert for edit
      alert(`Edit functionality for "${product.name}" would be implemented here.`);
      
      setShowActionDropdown(false);
      setSelectedProducts([]);
    }
  };

  const handleDeleteProducts = () => {
    const selectedProductsData = selectedProducts.map(index => filteredProducts[index]);
    const productNames = selectedProductsData.map(product => product.name);
    
    // Show confirmation alert
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedProductsData.length === 1 ? 'this product' : 'these products'}?\n\n${productNames.join('\n')}\n\nThis action cannot be undone.`
    );
    
    if (confirmDelete) {
      // Get the IDs of products to delete
      const productIdsToDelete = selectedProductsData.map(product => product.id);
      
      // Remove products from allProducts state
      setAllProducts(prevProducts => 
        prevProducts.filter(product => !productIdsToDelete.includes(product.id))
      );
      
      // Reset selections
      setSelectedProducts([]);
      setSelectAll(false);
      setShowActionDropdown(false);
      
      // Show success message
      alert(`Successfully deleted ${selectedProductsData.length === 1 ? 'product' : `${selectedProductsData.length} products`}.`);
    }
  };

  const toggleActionDropdown = () => {
    setShowActionDropdown(!showActionDropdown);
  };

  // Get status styling based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return "px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center w-fit";
      case 'Draft':
        return "px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center w-fit";
      case 'Archived':
        return "px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center w-fit";
      default:
        return "px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center w-fit";
    }
  };

  const getStatusStyleMobile = (status) => {
    switch (status) {
      case 'Active':
        return "px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs";
      case 'Draft':
        return "px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs";
      case 'Archived':
        return "px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs";
      default:
        return "px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs";
    }
  };

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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal">{t('title')}</h1>
      </div>
      <section className="bg-gray-200 rounded-2xl sm:rounded-3xl lg:rounded-4xl p-3 sm:p-4 lg:p-5 mt-5 w-full max-w-full overflow-hidden">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-sm pb-6 sm:pb-8 lg:pb-10">
          {/* Header with tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 space-y-3 sm:space-y-0">
            {/* Tabs - Scrollable on mobile */}
            <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              <div className="flex space-x-2 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
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
            <div className="flex space-x-2 w-full sm:w-auto justify-end">
              {/* Actions Dropdown - Show when products are selected */}
              {selectedProducts.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleActionDropdown}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    <span>
                      {selectedProducts.length === 1 ? 'Actions' : `${selectedProducts.length} Selected`}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {showActionDropdown && (
                    <div className="absolute right-0 mt-2 w-48 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        {selectedProducts.length === 1 && (
                          <button
                            onClick={handleEditProduct}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit Product</span>
                          </button>
                        )}
                        <button
                          onClick={handleDeleteProducts}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>
                            {selectedProducts.length === 1 ? 'Delete Product' : `Delete ${selectedProducts.length} Products`}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <button 
                className={`p-2 px-2.5 rounded-full ${showFilters ? 'bg-blue-200' : 'bg-gray-200'}`} 
                aria-label={t('actions.filter')}
                onClick={toggleFilters}
              >
                <Filter className="h-5 w-5" />
              </button>
              <button className="hidden sm:block p-2 px-2.5 rounded-full bg-gray-200" aria-label={t('actions.refresh')}>
                <RefreshCcw className="h-5 w-5" />
              </button>
              <button 
                className={`p-2 px-2.5 rounded-full ${showSearch ? 'bg-blue-200' : 'bg-gray-200'}`} 
                aria-label={t('actions.search')}
                onClick={toggleSearch}
              >
                <Search className="h-5 w-5" />
              </button>
              <Link href={"/admin/products/create"}>
                <button className="px-3 sm:px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-sm">
                  <span className="hidden sm:inline">{t('actions.addProduct')}</span>
                  <span className="sm:hidden">{t('actions.add')}</span>
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
                  {/* Type Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t("filters.type")}</label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t("filters.allTypes")}</option>
                      {uniqueTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Vendor Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t("filters.vendor")}</label>
                    <select
                      value={filters.vendor}
                      onChange={(e) => handleFilterChange('vendor', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t("filters.allVendors")}</option>
                      {uniqueVendors.map(vendor => (
                        <option key={vendor} value={vendor}>{vendor}</option>
                      ))}
                    </select>
                  </div>

                  {/* Inventory Filter */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{t("filters.inventory")}</label>
                    <select
                      value={filters.inventory}
                      onChange={(e) => handleFilterChange('inventory', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t("filters.anyInventory")}</option>
                      <option value="in_stock">{t("filters.inStock")}</option>
                      <option value="out_of_stock">{t("filters.outOfStock")}</option>
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
                      {selectedTab}
                    </span>
                  )}
                  {filters.type && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {t("filters.type")}: {filters.type}
                    </span>
                  )}
                  {filters.vendor && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {t("filters.vendor")}: {filters.vendor}
                    </span>
                  )}
                  {filters.inventory && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {t("filters.inventory")}: {filters.inventory === 'in_stock' ? t("filters.inStock") : t("filters.outOfStock")}
                    </span>
                  )}
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {t("search.searchTerm")}: "{searchTerm}"
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="px-3 md:px-4 py-2">
            <p className="text-sm text-gray-600">
              {t("results.showing", { count: filteredProducts.length, total: allProducts.length })}
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="min-w-full">
                <thead>
                  <tr className={`text-${locale == "ar" ? "right" : "left"} text-gray-500 bg-gray-100`} >
                    <th className={`py-3 pl-4 pr-2  font-normal`} >
                      <input
                        type="checkbox"
                        className="rounded text-black focus:ring-black accent-black h-4 w-4"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="py-3 px-4 font-normal text-base">{t('table.headers.product')}</th>
                    <th className="py-3 px-4 font-normal text-base">{t('table.headers.status')}</th>
                    <th className="py-3 px-4 font-normal text-base">{t('table.headers.inventory')}</th>
                    <th className="py-3 px-4 font-normal text-base">{t('table.headers.type')}</th>
                    <th className="py-3 px-4 font-normal text-base">{t('table.headers.vendor')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-2 pl-4 pr-2">
                        <input
                          type="checkbox"
                          className="rounded text-black focus:ring-black accent-black h-4 w-4"
                          checked={selectedProducts.includes(index)}
                          onChange={() => handleSelectProduct(index)}
                        />
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center">
                          <div className="h-14 w-14 flex-shrink-0 mr-4 bg-gray-100 rounded-sm overflow-hidden">
                            <Image
                              width={56}
                              height={56}
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-base font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <span className={getStatusStyle(product.status)}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-2 px-4">{product.inventory}</td>
                      <td className="py-2 px-4">{product.type}</td>
                      <td className="py-2 px-4">{product.vendor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tablet Table - Simplified columns */}
            <div className="hidden sm:block lg:hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-500 bg-gray-100">
                    <th className="py-3 pl-4 pr-2 font-normal">
                      <input
                        type="checkbox"
                        className="rounded text-black focus:ring-black accent-black h-4 w-4"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="py-3 px-4 font-normal text-base">{t('table.headers.product')}</th>
                    <th className="py-3 px-4 font-normal text-base">{t('table.headers.status')}</th>
                    <th className="py-3 px-4 font-normal text-base">{t('table.headers.inventory')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-2 pl-4 pr-2">
                        <input
                          type="checkbox"
                          className="rounded text-black focus:ring-black accent-black h-4 w-4"
                          checked={selectedProducts.includes(index)}
                          onChange={() => handleSelectProduct(index)}
                        />
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 mx-3 bg-gray-100 rounded-sm overflow-hidden">
                            <Image
                              width={48}
                              height={48}
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.type} • {product.vendor}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <span className={getStatusStyleMobile(product.status)}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-sm">{product.inventory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="block sm:hidden">
              <div className="space-y-3">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        className="rounded text-black focus:ring-black accent-black h-4 w-4 mt-1"
                        checked={selectedProducts.includes(index)}
                        onChange={() => handleSelectProduct(index)}
                      />
                      <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                        <Image
                          width={64}
                          height={64}
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </h3>
                            <div className="mt-1 flex items-center space-x-2">
                              <span className={getStatusStyleMobile(product.status)}>
                                {product.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">{t('mobile.type')}:</span> {product.type}
                          </div>
                          <div>
                            <span className="font-medium">{t('mobile.inventory')}:</span> {product.inventory}
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">{t('mobile.vendor')}:</span> {product.vendor}
                          </div>
                        </div>
                      </div>
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