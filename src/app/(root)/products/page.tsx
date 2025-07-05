"use client";
import { Filter, RefreshCcw, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Products() {
  const tabs = ["All", "Active", "Draft", "Archived"];
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Sample products data with varied statuses for filtering
  const allProducts = [
    {
      id: 1,
      name: "iScan Basic Card",
      image: "/api/placeholder/80/80",
      status: "Active",
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
  ];

  // Filter products based on selected tab
  const filteredProducts = selectedTab === "All" 
    ? allProducts 
    : allProducts.filter(product => product.status === selectedTab);

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

  // Get status styling based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center w-fit";
      case "Draft":
        return "px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center w-fit";
      case "Archived":
        return "px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center w-fit";
      default:
        return "px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm flex items-center w-fit";
    }
  };

  const getStatusStyleMobile = (status) => {
    switch (status) {
      case "Active":
        return "px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs";
      case "Draft":
        return "px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs";
      case "Archived":
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
          className="hidden lg:block absolute -left-13 top-5"
        />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal">Products</h1>
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
              {/* Hide some buttons on mobile, show on larger screens */}
              <button className="hidden sm:block p-2 px-2.5 rounded-full bg-gray-200">
                <Filter className="h-5 w-5" />
              </button>
              <button className="hidden sm:block p-2 px-2.5 rounded-full bg-gray-200">
                <RefreshCcw className="h-5 w-5" />
              </button>
              <button className="p-2 px-2.5 rounded-full bg-gray-200">
                <Search className="h-5 w-5" />
              </button>
              <Link href={"/products/create"}>
                <button className="px-3 sm:px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-sm">
                  <span className="hidden sm:inline">Add Product</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <div className="hidden lg:block">
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
                    <th className="py-3 px-4 font-normal text-base">Product</th>
                    <th className="py-3 px-4 font-normal text-base">Status</th>
                    <th className="py-3 px-4 font-normal text-base">Inventory</th>
                    <th className="py-3 px-4 font-normal text-base">Type</th>
                    <th className="py-3 px-4 font-normal text-base">Vendor</th>
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
                    <th className="py-3 px-4 font-normal text-base">Product</th>
                    <th className="py-3 px-4 font-normal text-base">Status</th>
                    <th className="py-3 px-4 font-normal text-base">Inventory</th>
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
                          <div className="h-12 w-12 flex-shrink-0 mr-3 bg-gray-100 rounded-sm overflow-hidden">
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
                            <span className="font-medium">Type:</span> {product.type}
                          </div>
                          <div>
                            <span className="font-medium">Inventory:</span> {product.inventory}
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">Vendor:</span> {product.vendor}
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