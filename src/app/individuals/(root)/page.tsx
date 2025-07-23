"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Plus,
  Share,
  Trash2,
  BarChart3,
  X,
  Search,
  ExternalLink,
  GripVertical,
  ImageIcon,
  CalendarClock,
  LockKeyhole,
  Upload,
  QrCode,
  Minus,
} from "lucide-react";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [links, setLinks] = useState([
    {
      id: 1,
      name: "My Desinl",
      url: "https://iScan.sa",
      isActive: true,
      icon: "📱",
    },
    {
      id: 2,
      name: "My Desinl",
      url: "https://iScan.sa",
      isActive: true,
      icon: "📱",
    },
    {
      id: 3,
      name: "My Desinl",
      url: "https://iScan.sa",
      isActive: true,
      icon: "📱",
    },
    {
      id: 4,
      name: "My Desinl",
      url: "https://iScan.sa",
      isActive: true,
      icon: "📱",
    },
    {
      id: 5,
      name: "My Desinl",
      url: "https://iScan.sa",
      isActive: true,
      icon: "📱",
    },
    {
      id: 6,
      name: "My Desinl",
      url: "https://iScan.sa",
      isActive: true,
      icon: "📱",
    },
    {
      id: 7,
      name: "My Desinl",
      url: "https://iScan.sa",
      isActive: true,
      icon: "📱",
    },
    {
      id: 8,
      name: "My Desinl",
      url: "https://iScan.sa",
      isActive: true,
      icon: "📱",
    },
  ]);

  const services = ["Contact+", "BioBank", "CvLink", "WorkPro", "FlexBook"];

  const handleAddService = (serviceName) => {
    const newLink = {
      id: Date.now(),
      name: serviceName,
      url: "https://iScan.sa",
      isActive: true,
      // icon: services.find((s) => s.name === serviceName)?.icon || "🔗",
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">Home</h1>
      </div>
      <section className="bg-gray-200 p-3 md:p-5 rounded-2xl md:rounded-4xl mt-5 w-full max-w-full overflow-hidden">
        <div className="flex gap-10">
          {/* Left section */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
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
                  className={`bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 ${
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

                      {/* <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm">{link.icon}</span>
                      </div> */}
                      <div>
                        <div className="pl-2">
                          <h3 className="font-medium text-gray-900">
                            {link.name}
                          </h3>
                          <p className="text-sm text-gray-500">{link.url}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ImageIcon size={16} className="text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <CalendarClock
                              size={16}
                              className="text-gray-600"
                            />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <LockKeyhole size={16} className="text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <BarChart3 size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share size={18} className="text-gray-600" />
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

                      <button
                        onClick={() => deleteLink(link.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} className="text-gray-600" />
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

                    {/* Scrollable content */}
                    <div className="p-4 space-y-4">
                      {/* Profile section */}
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">iScan</span>
                        </div>
                        <h3 className="font-semibold">Omar Bahattab</h3>
                        <div className="flex justify-center gap-2 mt-2">
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <ExternalLink size={16} />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <Share size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="space-y-2">
                        <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                          Add to Contact
                        </button>
                        <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                          Diploma Collection
                        </button>
                      </div>

                      {/* Bank info */}
                      <div className="mt-4 p-3 bg-gray-200 rounded-lg">
                        <div className="text-center">
                          <div className="text-blue-600 font-bold mb-1">
                            anb
                          </div>
                          <div className="text-sm text-gray-600">
                            Omar Bahattab
                          </div>
                          <div className="text-xs text-gray-500">
                            SA 613010342000095337522
                          </div>
                          <div className="text-xs text-gray-500">ARINBSARI</div>
                        </div>
                      </div>

                      {/* Sample links to demonstrate scrolling */}
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="bg-white p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <span>🔗</span>
                              </div>
                              <div>
                                <h4 className="font-medium">Link {i + 1}</h4>
                                <p className="text-xs text-gray-500">
                                  https://example.com/{i + 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-gray-100 border border-black rounded-2xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl flex-1 text-center">Add to iScan</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-1 bg-white hover:bg-gray-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Enter URL or Browse Extensions"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-20 py-3 bg-white rounded-full focus:outline-none"
                />
              </div>
              <button className=" bg-white hover:bg-gray-50 px-6 py-2 rounded-full text-lg font-medium transition-colors">
                Add
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service) => (
                <div key={service} className="text-center bg-white rounded-4xl p-5">
                  <div className="flex justify-center items-center">
                    <Image
                      src={
                        "https://primary.jwwb.nl/public/y/y/h/temp-spmntgnbnohsannikjun/image-high-m3qrgg.png?enable-io=true&amp;enable=upscale&amp;width=160"
                      }
                      width={80}
                      height={80}
                      alt="sign"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 my-3">{service}</h3>
                  <button
                    onClick={() => handleAddService(service)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-4 rounded-full transition-colors"
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
