"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Copy, Edit2 } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";

const Settings = () => {
  const locale = useLocale();
  const [signupMethod, setSignupMethod] = useState("email"); // 'email' or 'google'
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState("settings"); // 'settings' or 'reset-password'
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userInfo = {
    firstName: "Omar",
    lastName: "Bahattab",
    phone: "+966 50 990 3532",
    email: "Email@email.sa",
    username: "@UserName",
    clientNumber: "000000768641",
  };

  const EmailSignupSection = () => (
    <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={userInfo.firstName}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={userInfo.lastName}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            readOnly
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-white text-gray-500 text-sm rounded-l-md">
            +966 Saudi Arabia
          </span>
          <input
            type="text"
            value="50 990 3532"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            readOnly
          />
          <div className="ml-2 flex items-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Verified
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <div className="flex items-center">
          <input
            type="email"
            value={userInfo.email}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            readOnly
          />
          <div className="ml-2 flex items-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const GoogleSignupSection = () => (
    <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={userInfo.firstName}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={userInfo.lastName}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            readOnly
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-white text-gray-500 text-sm rounded-l-md">
            +966 Saudi Arabia
          </span>
          <input
            type="text"
            value="50 990 3532"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            readOnly
          />
          <div className="ml-2 flex items-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              Verified
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fast Log-in Service
        </label>
        <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-sm text-gray-700">
              You can log in using Google
            </span>
          </div>
          <button className="bg-gray-100 rounded-lg py-1 px-2 text-sm transition-colors">
            Disconnect
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Connected to...
        </label>
        <input
          type="email"
          value={userInfo.email}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          readOnly
        />
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="">
      {/* Toggle for demonstration */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setSignupMethod("email")}
            className={`px-4 py-2 rounded-md font-medium ${
              signupMethod === "email"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Email Signup
          </button>
          <button
            onClick={() => setSignupMethod("google")}
            className={`px-4 py-2 rounded-md font-medium ${
              signupMethod === "google"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Google Signup
          </button>
        </div>
      </div>

      {/* My Information Section */}
      {signupMethod === "email" ? (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            My Information
          </h2>
          <EmailSignupSection />
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            My Information
          </h2>
          <GoogleSignupSection />
        </div>
      )}

      {/* Account Management Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Account management
        </h2>
        <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-start mb-4">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mr-4">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User Name
                  </label>
                  <div className="flex items-center bg-white rounded-md px-3 py-2">
                    <input
                      type="text"
                      value={userInfo.username}
                      className="flex-1 focus:outline-none"
                      readOnly
                    />
                    <button className="ml-2 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-700">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="ml-1 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-700">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    iScan Search
                  </label>
                  <div className="flex items-center bg-white rounded-md px-3 py-2">
                    <input
                      type="text"
                      value={userInfo.username}
                      className="flex-1 focus:outline-none"
                      readOnly
                    />
                    <button className="ml-2 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-700">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="ml-1 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-700">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Number
                  </label>
                  <div className="flex items-center bg-white rounded-md px-3 py-2">
                    <input
                      type="text"
                      value={userInfo.clientNumber}
                      className="flex-1 focus:outline-none"
                      readOnly
                    />
                    <button className="ml-1 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-700">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan
                  </label>
                  <div className="flex items-center bg-white rounded-md px-3 py-2">
                    <input
                      type="text"
                      value={"Basic"}
                      className="flex-1 focus:outline-none"
                      readOnly
                    />
                    <button className="py-1 px-3 text-sm bg-gray-100 rounded-full text-gray-500 hover:text-gray-700">
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Payment method
        </h2>
        <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <div className="space-y-3 mb-10">
          <div className="flex items-center justify-start gap-2">
            <div className="rounded w-20 h-20 flex items-center justify-center bg-white">
              <span className="font-bold text-3xl">Visa</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-3xl">Visa</p>
              <span className="text-2xl">....12345</span>
            </div>
          </div>
          <p className="text-lg">Expire July 2026</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button className="flex-1 w-full bg-white py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Change
            </button>
            <button className="flex-1 w-full bg-white py-2 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium">
              remove
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Change Password
        </h2>
        <div className="bg-gray-100 rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <button
            onClick={() => setCurrentPage("reset-password")}
            className="w-full bg-white py-2 px-4 rounded-full hover:bg-gray-50 transition-colors font-medium"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Delete Forever Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Delete forever
        </h2>
        <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Delete your account and every connected Sooq profile permanently.
          </p>
          <button className="w-full bg-white border-2 border-red-600 text-red-600 py-2 px-4 rounded-full hover:bg-gray-50 transition-colors font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const ResetPasswordPage = () => (
    <div className="p-6 bg-gray-200 min-h-screen flex flex-col justify-center">
      <div className="w-full md:w-xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">iScan))</h1>
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Reset password
          </h2>
          <p className="text-gray-600">Enter your new password.</p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mb-8">
          <div>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 bg-white"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-black/90 transition-colors font-medium mt-6"
            onClick={() => {
              // Handle password reset logic here
              alert("Password reset successfully!");
              setCurrentPage("settings");
              setNewPassword("");
              setConfirmPassword("");
            }}
          >
            Reset Password
          </button>
        </form>

        {/* Password Requiermaint */}
        <div className="bg-gray-300 p-4 rounded-lg">
          <h4>Your password moust includs:</h4>
          <ul className="font-semibold mt-1">
            <li>At least 6 characters</li>
          </ul>
        </div>

        {/* Back to settings link */}
        <div className="text-center mt-6">
          <button
            onClick={() => setCurrentPage("settings")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Back to Settings
          </button>
        </div>
      </div>
    </div>
  );

  // Render the appropriate page based on currentPage state
  if (currentPage === "reset-password") {
    return <ResetPasswordPage />;
  }

  return (
    <>
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className={`hidden lg:block absolute ${
            locale == "ar" ? "-right-13 rotate-180" : "-left-13"
          } top-5`}
        />
        <h1 className="text-3xl md:text-5xl font-normal">Settings</h1>
      </div>

      <section className="bg-gray-200 p-3 md:p-5 rounded-4xl mt-5 mb-24 md:mb-0">
        <SettingsPage />
      </section>
    </>
  );
};

export default Settings;
