"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Plus,
  Share,
  X,
  Search,
  ExternalLink,
  GripVertical,
  Pen,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Linkedin,
} from "lucide-react";

export default function SocialMedia() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [links, setLinks] = useState([
    {
      id: 1,
      name: "Instagram",
      url: "https://instagram.com/username",
      isActive: true,
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      id: 2,
      name: "Twitter",
      url: "https://twitter.com/username",
      isActive: true,
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      id: 3,
      name: "Facebook",
      url: "https://facebook.com/username",
      isActive: true,
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      id: 4,
      name: "LinkedIn",
      url: "https://linkedin.com/in/username",
      isActive: true,
      icon: <Linkedin className="w-5 h-5" />,
    },
  ]);

  const socialMediaPlatforms = [
    { name: "Instagram", icon: <Instagram className="w-10 h-10" /> },
    { name: "Twitter", icon: <Twitter className="w-10 h-10" /> },
    { name: "Facebook", icon: <Facebook className="w-10 h-10" /> },
    { name: "LinkedIn", icon: <Linkedin className="w-10 h-10" /> },
    { name: "YouTube", icon: <Youtube className="w-10 h-10" /> },
    { name: "Twitch", icon: <Twitch className="w-10 h-10" /> },
  ];

  const handleAddService = (platformName) => {
    const platform = socialMediaPlatforms.find((p) => p.name === platformName);
    const newLink = {
      id: Date.now(),
      name: platformName,
      url: `https://${platformName.toLowerCase()}.com/username`,
      isActive: true,
      icon: platform.icon,
    };
    setLinks([...links, newLink]);
    setIsDialogOpen(false);
  };

  const toggleLinkStatus = (id) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, isActive: !link.isActive } : link
      )
    );
  };

  const deleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  // Drag and drop handlers
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e, item) => {
    e.preventDefault();
    setDragOverItem(item);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverItem(null);
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = links.findIndex((link) => link.id === draggedItem.id);
    const targetIndex = links.findIndex((link) => link.id === targetItem.id);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newLinks = [...links];
      const [removed] = newLinks.splice(draggedIndex, 1);
      newLinks.splice(targetIndex, 0, removed);
      setLinks(newLinks);
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <>
      <div className="flex items-center relative px-4 md:px-0">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className={`hidden lg:block absolute -left-13 top-5`}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">
          Social Media
        </h1>
      </div>
      <section className="bg-gray-200 p-3 md:p-5 rounded-2xl md:rounded-4xl mt-5 w-full max-w-full overflow-hidden">
        <div className="flex gap-10">
          {/* Left section */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Plus size={20} />
                <span className="font-medium">Add</span>
              </button>
            </div>

            {/* Links List */}
            <div className="space-y-3">
              {links.map((link) => (
                <div
                  key={link.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, link)}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, link)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, link)}
                  onDragEnd={handleDragEnd}
                  className={`bg-gray-100 rounded-lg border border-gray-200 p-2 transition-all duration-200 ${
                    draggedItem?.id === link.id
                      ? "opacity-50 transform scale-95"
                      : ""
                  } ${
                    dragOverItem?.id === link.id && draggedItem?.id !== link.id
                      ? "border-blue-400 bg-blue-50 transform scale-105"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Drag Handle */}
                      <div className="drag-handle cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors">
                        <GripVertical size={32} />
                      </div>

                      <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        {link.icon}
                      </div>
                      <div>
                        <div className="pl-2">
                          <h3 className="font-medium text-gray-900">
                            {link.name}
                          </h3>
                          {/* <p className="text-sm text-gray-500">{link.url}</p> */}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Pen size={18} className="text-gray-600" />
                      </button>

                      <button
                        onClick={() => toggleLinkStatus(link.id)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          link.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                            link.isActive ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - iPhone X Frame */}
          <div className="relative hidden lg:block w-[300px] h-[500px]">
            <div className="fixed w-[300px] h-[500px]">
              {/* iPhone X Frame */}
              <div className="relative w-full h-full">
                {/* Phone frame */}
                <div className="absolute inset-0 rounded-[40px] border-[12px] border-black overflow-hidden shadow-2xl">
                  {/* Screen notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-6 bg-black rounded-b-xl z-10"></div>

                  {/* Screen content */}
                  <div className="absolute inset-0 bg-gray-100 overflow-y-auto no-scrollbar">
                    {/* Status bar */}
                    <div className="h-8 bg-gray-100 flex items-center justify-between px-4 pt-1">
                      <span className="text-xs font-bold">9:41</span>
                      <div className="flex gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 16 16">
                          <path
                            d="M2 8a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z"
                            fill="currentColor"
                          />
                        </svg>
                        <svg className="w-4 h-4" viewBox="0 0 16 16">
                          <path
                            d="M8 2a6 6 0 016 6v1a1 1 0 01-1 1H3a1 1 0 01-1-1V8a6 6 0 016-6z"
                            fill="currentColor"
                          />
                        </svg>
                        <svg className="w-4 h-4" viewBox="0 0 16 16">
                          <path
                            d="M8 12a4 4 0 100-8 4 4 0 000 8z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Profile section */}
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white font-bold">iScan</span>
                      </div>
                      <h3 className="font-semibold">Omar Bahattab</h3>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-1 px-4">
                      {links
                        .filter((link) => link.isActive)
                        .map((link) => (
                            <div key={link.id} className="flex items-center justify-center">
                              {link.icon}
                            </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Social Media Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Add Social Media</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search social media platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Social Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialMediaPlatforms
                .filter((platform) =>
                  platform.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((platform) => (
                  <div key={platform.name} className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center">
                        {platform.icon}
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {platform.name}
                    </h3>
                    <button
                      onClick={() => handleAddService(platform.name)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
