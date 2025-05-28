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

  // Sample products data based on the screenshot
  const products = [
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
      name: "iScan Basic Card",
      image: "/api/placeholder/80/80",
      status: "Active",
      inventory: "400 in stock",
      type: "NTAG215",
      vendor: "iScan",
    },
    {
      id: 3,
      name: "iScan Basic Card",
      image: "/api/placeholder/80/80",
      status: "Active",
      inventory: "400 in stock",
      type: "NTAG215",
      vendor: "iScan",
    },
    {
      id: 4,
      name: "iScan Basic Card",
      image: "/api/placeholder/80/80",
      status: "Active",
      inventory: "400 in stock",
      type: "NTAG215",
      vendor: "iScan",
    },
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProducts([...Array(products.length).keys()]);
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
        <h1 className="text-5xl font-normal">Products</h1>
      </div>
      <section className="bg-gray-200 rounded-4xl p-5 mt-5 min-w-5xl">
        <div className="relative bg-white rounded-3xl shadow-sm pb-10">
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
              <Link href={"/products/create"}>
                <button className="px-4 py-2 bg-gray-200 rounded-full">
                  Add Product
                </button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
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
                {products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
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
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center w-fit">
                        {product.status}
                        <svg
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
        </div>
      </section>
    </>
  );
}
