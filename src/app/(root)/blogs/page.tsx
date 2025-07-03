"use client";
import { Filter, RefreshCcw, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BlogPosts() {
  const tabs = ["All", "Published", "Draft", "Archived"];
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);

  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      image: "/api/placeholder/80/80",
      status: "Published",
      views: "1,024 views",
      category: "Development",
      author: "Jane Doe",
    },
    {
      id: 2,
      title: "React Hooks Explained",
      image: "/api/placeholder/80/80",
      status: "Published",
      views: "2,560 views",
      category: "Tutorial",
      author: "John Smith",
    },
    {
      id: 3,
      title: "CSS Grid Layouts",
      image: "/api/placeholder/80/80",
      status: "Draft",
      views: "Not published",
      category: "Design",
      author: "Alex Johnson",
    },
    {
      id: 4,
      title: "State Management in 2023",
      image: "/api/placeholder/80/80",
      status: "Archived",
      views: "3,450 views",
      category: "Development",
      author: "Sarah Williams",
    },
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedPosts([...Array(posts.length).keys()]);
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (index) => {
    if (selectedPosts.includes(index)) {
      setSelectedPosts(selectedPosts.filter((i) => i !== index));
    } else {
      setSelectedPosts([...selectedPosts, index]);
    }
  };

  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6 md:mb-8 px-4 md:px-0">Blogs</h1>
      <section className="bg-gray-200 rounded-2xl p-3 md:p-5">
        <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-sm pb-6 md:pb-10">
          {/* Header with tabs */}
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
              {/* Hide some buttons on mobile */}
              <button className="hidden sm:flex p-2 px-2.5 rounded-full bg-gray-200">
                <Filter className="h-5 w-5" />
              </button>
              <button className="hidden sm:flex p-2 px-2.5 rounded-full bg-gray-200">
                <RefreshCcw className="h-5 w-5" />
              </button>
              <button className="p-2 px-2.5 rounded-full bg-gray-200">
                <Search className="h-5 w-5" />
              </button>
              <Link href={"/blogs/create"}>
                <button className="px-3 md:px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-sm md:text-base">
                  <span className="hidden sm:inline">Create Post</span>
                  <span className="sm:hidden">Create</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
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
                  <th className="py-3 px-4 font-normal text-base">Post</th>
                  <th className="py-3 px-4 font-normal text-base">Status</th>
                  <th className="py-3 px-4 font-normal text-base">Views</th>
                  <th className="py-3 px-4 font-normal text-base">Category</th>
                  <th className="py-3 px-4 font-normal text-base">Author</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index} className="hover:bg-gray-50">
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
                          post.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : post.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.status}
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
                <span>Select All</span>
              </label>
              <span className="text-xs text-gray-500">
                {selectedPosts.length} selected
              </span>
            </div>

            {/* Posts Grid */}
            <div className="space-y-3 md:space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-4 hover:shadow-sm transition-shadow">
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
                            post.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : post.status === "Draft"
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
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Views</div>
                      <div className="font-medium">{post.views}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Category</div>
                      <div className="font-medium">{post.category}</div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Author</div>
                      <div className="font-medium">{post.author}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
