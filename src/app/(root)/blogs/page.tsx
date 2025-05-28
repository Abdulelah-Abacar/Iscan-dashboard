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
      <h1 className="text-5xl font-normal mb-8">Blogs</h1>
      <section className="bg-gray-200 rounded-2xl p-5">
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
              <Link href={"/create-post"}>
                <button className="px-4 py-2 bg-gray-200 rounded-full">
                  Create Post
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
        </div>
      </section>
    </>
  );
}
