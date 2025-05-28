"use client";
import Image from "next/image";
import { useState } from "react";

export default function Settings() {
  const [profileImage, setProfileImage] = useState("/placeholder-profile.jpg");
  const [formData, setFormData] = useState({
    firstName: "Omar",
    lastName: "Bahattab",
    email: "iScanSol@gmail.com",
    tax: "15",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <h1 className="text-5xl font-normal mb-8">Settings</h1>
      <section className="bg-gray-200 rounded-4xl p-5 md:py-10 md:px-16 mb-24 md:mb-0">
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <div className="relative">
            <div className="h-28 w-28 rounded-full overflow-hidden bg-gray-300">
              <Image
                src={profileImage}
                alt="Profile"
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
          </div>
          <div className="ml-4">
            <button
              className="bg-white text-gray-800 px-3 md:px-6 py-2 rounded-md text-lg md:text-xl shadow-sm hover:bg-gray-50"
              onClick={() => document.getElementById("upload-photo").click()}
            >
              Upload Photo
            </button>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <section className="md:w-96 md:ml-28">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-base text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-white border-0 focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-base text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-white border-0 focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6 flex gap-3 items-center">
            <div className="relative">
              <label className="block text-base text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-white border-0 focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div className="flex items-center bg-white mt-5 p-2 rounded-full">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
              <span className="text-xs text-gray-500">verified</span>
            </div>
          </div>

          {/* Tax */}
          <div className="mb-6">
            <label className="block text-base text-gray-700 mb-1">Tax</label>
            <div className="flex items-center bg-white rounded-sm w-24 px-3 py-2">
              <span className="text-gray-400 mr-2">%</span>
              <input
                type="text"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                className="w-full bg-transparent border-0 focus:ring-0 p-0"
              />
            </div>
          </div>

          {/* Fast Log-in Service */}
          <div className="mb-6">
            <label className="block text-base text-gray-700 mb-4">
              Fast Log-in Service
            </label>
            <div className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Image
                  src="/api/placeholder/24/24"
                  alt="Google"
                  width={24}
                  height={24}
                  className="mr-3"
                />
                <span className="text-sm">You can log in using Google</span>
              </div>
              <button className="text-xs bg-gray-100 px-3 py-1 rounded-sm">
                Disconnect
              </button>
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 flex items-center">
              <span className="text-sm">Connected to </span>
              <span className="text-sm text-gray-700 ml-1">
                iScanSol@gmail.com
              </span>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
