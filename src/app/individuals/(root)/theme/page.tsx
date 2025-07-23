"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Edit3,
  ExternalLink,
  Share,
  Camera,
  Video,
  ImageIcon,
  ChevronDown,
  Info,
  Circle,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("profile");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [selectedWallpaper, setSelectedWallpaper] = useState("flat-color");
  const [activeStyleTab, setActiveStyleTab] = useState("text");
  const [selectedFont, setSelectedFont] = useState("Font_name");
  const [selectedFont2, setSelectedFont2] = useState("IBM Plex Sans");
  const [pageTextColor, setPageTextColor] = useState("#e3dfdb");
  const [buttonTextColor, setButtonTextColor] = useState("#e3dfdb");
  const [pageTextColor2, setPageTextColor2] = useState("#75C767");
  const [buttonTextColor2, setButtonTextColor2] = useState("#A30707");
  const [selectedFill, setSelectedFill] = useState("solid");
  const [selectedCorner, setSelectedCorner] = useState("sharp");
  const [selectedBg, setSelectedBg] = useState("#4F3F21");
  const [customColor, setCustomColor] = useState("#4F3F21");
  const [hideIscanLogo, setHideIscanLogo] = useState(false);

  const backgroundOptions = [
    "#4F3F21", // olive/brown
    "#FFFFFF", // white
    "#000000", // black
  ];

  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      preview: "bg-white border-2 border-gray-300",
    },
    { id: "discord", name: "Discord", preview: "bg-gray-800 text-white" },
    {
      id: "web-site",
      name: "Web Site",
      preview: "bg-gray-100 border border-gray-300",
    },
  ];

  const wallpapers = [
    {
      id: "flat-color",
      name: "Flat Color",
      preview: "bg-gray-200",
      type: "solid",
    },
    {
      id: "gradient",
      name: "Gradient",
      preview: "bg-gradient-to-br from-gray-300 to-gray-500",
      type: "gradient",
    },
    {
      id: "image",
      name: "Image",
      preview: "bg-gray-200 border-2 border-dashed border-gray-400",
      type: "image",
    },
    {
      id: "video",
      name: "Video",
      preview: "bg-gray-200 border-2 border-dashed border-gray-400",
      type: "video",
    },
    { id: "stripes", name: "Stripes", preview: "bg-white", type: "pattern" },
    {
      id: "waves",
      name: "Waves",
      preview: "bg-gradient-to-b from-gray-300 to-gray-600",
      type: "pattern",
    },
  ];

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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">Theme</h1>
      </div>
      <section className="bg-gray-200 p-3 md:p-5 rounded-2xl md:rounded-4xl mt-5 w-full max-w-full overflow-hidden">
        <div className="flex gap-10">
          {/* Left section */}
          <div className="flex-1">
            {/* Profile Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Profile
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div>
                  <div className="flex bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeTab === "profile"
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Profile Image
                    </button>
                    <button
                      onClick={() => setActiveTab("unithem")}
                      className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeTab === "unithem"
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      UniThem
                    </button>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6 pt-8">
                  {activeTab === "profile" ? (
                    <div className="text-center">
                      {/* Profile Image */}
                      <div className="w-24 h-24 mx-auto mb-6 relative">
                        <div className="w-full h-full rounded-full bg-gradient-to-b from-sky-200 via-sky-300 to-green-400 flex items-center justify-center overflow-hidden">
                          {/* Sky with cloud */}
                          <div className="relative w-full h-full">
                            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-white rounded-full opacity-80"></div>
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-white rounded-full opacity-60"></div>
                            {/* Hills */}
                            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-green-500 to-green-400 rounded-b-full"></div>
                            <div className="absolute bottom-0 right-2 w-8 h-4 bg-gradient-to-t from-green-600 to-green-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Edit Button */}
                      <button className="w-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 text-gray-700">
                        <Edit3 size={20} />
                        <span className="font-medium">Edit Image</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-80 h-34 mx-auto mb-6 bg-gradient-to-br from-red-400 to-purple-600 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          UT
                        </span>
                      </div>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-2xl py-4 px-6 flex items-center justify-center space-x-2 text-gray-700">
                        <Edit3 size={20} />
                        <span className="font-medium">Edit Image</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Profile Info Section */}
            <div className="bg-white rounded-lg p-4 my-4 shadow-sm">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter display name"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="text-right text-xs text-gray-500">
                {bio.length}/120
              </div>
            </div>

            {/* Template Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Template
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-3 gap-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? "ring-2 ring-blue-500"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div
                        className={`aspect-[3/4] rounded-lg p-3 ${template.preview} flex flex-col justify-between`}
                      >
                        {template.id === "minimal" && (
                          <div>
                            <div className="w-8 h-8 bg-gray-800 rounded mb-2"></div>
                            <div className="space-y-1">
                              <div className="h-1 bg-gray-400 rounded w-full"></div>
                              <div className="h-1 bg-gray-400 rounded w-3/4"></div>
                            </div>
                          </div>
                        )}
                        {template.id === "discord" && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-gray-400 rounded w-full"></div>
                              <div className="h-1 bg-gray-400 rounded w-2/3"></div>
                              <div className="h-1 bg-gray-400 rounded w-1/2"></div>
                            </div>
                          </div>
                        )}
                        {template.id === "web-site" && (
                          <div className="text-center">
                            <div className="w-6 h-6 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1 bg-gray-400 rounded w-full"></div>
                              <div className="h-1 bg-gray-400 rounded w-2/3 mx-auto"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">
                        {template.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wallpaper Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Wallpaper
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-4 gap-3">
                  {wallpapers.map((wallpaper) => (
                    <div
                      key={wallpaper.id}
                      className={`cursor-pointer transition-all ${
                        selectedWallpaper === wallpaper.id
                          ? "ring-2 ring-blue-500"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                      onClick={() => setSelectedWallpaper(wallpaper.id)}
                    >
                      <div
                        className={`aspect-[9/16] rounded-lg ${wallpaper.preview} flex items-center justify-center`}
                      >
                        {wallpaper.type === "image" && (
                          <ImageIcon className="w-6 h-6 text-gray-500" />
                        )}
                        {wallpaper.type === "video" && (
                          <Video className="w-6 h-6 text-gray-500" />
                        )}
                        {wallpaper.id === "stripes" && (
                          <div className="w-full h-full bg-white relative overflow-hidden rounded-lg">
                            <div className="absolute inset-0 opacity-60">
                              {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute bg-black transform rotate-45"
                                  style={{
                                    width: "2px",
                                    height: "200%",
                                    left: `${i * 12}px`,
                                    top: "-50%",
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-600">
                        {wallpaper.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Custom Color Section */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded border border-gray-300"></div>
                    <span className="text-sm font-mono text-gray-600">
                      #e3dfdb
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Style Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Style
              </h3>

              {/* First Style Card */}
              <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                {/* Font Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font
                  </label>
                  <div className="relative">
                    <select
                      value={selectedFont}
                      onChange={(e) => setSelectedFont(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="Font_name">Font_name</option>
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Page Text Color */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page text color
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded border border-gray-300"></div>
                    <span className="text-sm font-mono text-gray-600">
                      #e3dfdb
                    </span>
                  </div>
                </div>

                {/* Button Text Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button text color
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded border border-gray-300"></div>
                    <span className="text-sm font-mono text-gray-600">
                      #e3dfdb
                    </span>
                  </div>
                </div>
              </div>

              {/* Second Style Card with Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-4">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveStyleTab("text")}
                    className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                      activeStyleTab === "text"
                        ? "text-gray-900 border-b-2 border-black"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Text
                  </button>
                  <button
                    onClick={() => setActiveStyleTab("buttons")}
                    className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                      activeStyleTab === "buttons"
                        ? "text-gray-900 border-b-2 border-black"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Buttons
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeStyleTab === "text" && (
                    <div>
                      {/* Font Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Font
                        </label>
                        <div className="relative">
                          <select
                            value={selectedFont2}
                            onChange={(e) => setSelectedFont2(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          >
                            <option value="IBM Plex Sans">IBM Plex Sans</option>
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Page Text Color */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page text color
                        </label>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded border border-gray-300"></div>
                          <span className="text-sm font-mono text-gray-600">
                            #75C767
                          </span>
                        </div>
                      </div>

                      {/* Button Text Color */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button text color
                        </label>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-red-600 rounded border border-gray-300"></div>
                          <span className="text-sm font-mono text-gray-600">
                            #A30707
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStyleTab === "buttons" && (
                    <div>
                      {/* Fill Options */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Fill
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "solid", icon: "solid", label: "Solid" },
                            {
                              id: "glass",
                              icon: "glass",
                              label: "Glass",
                            },
                            {
                              id: "outline",
                              icon: "outline",
                              label: "Outline",
                            },
                          ].map((fill) => (
                            <div
                              key={fill.id}
                              onClick={() => setSelectedFill(fill.id)}
                              className={`cursor-pointer p-3 rounded-lg border text-center ${
                                selectedFill === fill.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                                {fill.id === "solid" && (
                                  <div className="w-4 h-4 bg-gray-600 rounded"></div>
                                )}
                                {fill.id === "outline" && (
                                  <Info className="w-4 h-4 text-gray-600" />
                                )}
                                {fill.id === "soft-shadow" && (
                                  <div className="w-4 h-4 bg-gray-600 rounded shadow-sm"></div>
                                )}
                                {fill.id === "hard-shadow" && (
                                  <Circle className="w-4 h-4 text-gray-600" />
                                )}
                              </div>
                              <span className="text-xs text-gray-600">
                                {fill.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Corners */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Corners
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "sharp", label: "Sharp" },
                            { id: "curved", label: "Curved" },
                            { id: "round", label: "Round" },
                          ].map((corner) => (
                            <div
                              key={corner.id}
                              onClick={() => setSelectedCorner(corner.id)}
                              className={`cursor-pointer p-3 rounded-lg border text-center ${
                                selectedCorner === corner.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div
                                className="w-8 h-8 bg-gray-200 mx-auto mb-2 flex items-center justify-center"
                                style={{
                                  borderRadius:
                                    corner.id === "sharp"
                                      ? "0px"
                                      : corner.id === "curved"
                                      ? "4px"
                                      : "16px",
                                }}
                              >
                                <div
                                  className="w-4 h-4 bg-gray-600"
                                  style={{
                                    borderRadius:
                                      corner.id === "sharp"
                                        ? "0px"
                                        : corner.id === "curved"
                                        ? "2px"
                                        : "8px",
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600">
                                {corner.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sharing preview Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Sharing preview
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div
                  className="w-full aspect-video rounded-lg flex flex-col items-center justify-center mb-6 relative"
                  style={{ backgroundColor: selectedBg }}
                >
                  {/* Profile Image */}
                  <div className="w-16 h-16 rounded-full mb-3 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-green-400 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Name and Handle */}
                  <div className="text-center">
                    <h3 className="text-white text-xl font-semibold mb-1">
                      Omar
                    </h3>
                    <p className="text-white text-sm opacity-80">★ /037h</p>
                  </div>
                </div>

                {/* Background Color Options */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Custom background color
                  </h3>
                  <div className="flex gap-3 items-center">
                    {backgroundOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedBg(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedBg === color
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom Color Input */}
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-sm border border-gray-300"
                      style={{ backgroundColor: customColor }}
                    />
                    <span className="text-sm text-gray-600 font-mono">
                      {customColor}
                    </span>
                  </div>
                </div>

                {/* Color Picker */}
                {/* <div className="mb-6">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setSelectedBg(e.target.value);
                    }}
                    className="w-full h-8 rounded border border-gray-300 cursor-pointer"
                  />
                </div> */}

                {/* Customize SEO metadata link */}
                <div>
                  <button className="text-blue-600 text-sm underline hover:text-blue-800 transition-colors">
                    Customize SEO metadata
                  </button>
                </div>
              </div>
            </div>

            {/* Logo Apperance Status */}
            <div className="">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="pl-2">
                        <p className="text-lg">Hide the iScan logo</p>
                      <div className="flex gap-2">Iscan</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setHideIscanLogo(!hideIscanLogo)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        hideIscanLogo ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          hideIscanLogo ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
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
    </>
  );
}
