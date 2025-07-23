"use client";

import { useState } from "react";
import {
  MoreVertical,
  Plus,
  RotateCcw,
  Search,
  Phone,
  MessageCircle,
  Mail,
  Link,
  X,
} from "lucide-react";
import Image from "next/image";

export default function Contact() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [contacts] = useState(
    Array(8)
      .fill()
      .map((_, index) => ({
        id: index + 1,
        firstName: "Omar",
        lastName: "Bahattab",
        name: "Omar Bahattab",
        company: "iScan",
        position: "Sales Director at iScan",
        phone: "+966 50 000 5555",
        email: "iScanSol@gmail.com",
        profileLink: "iScan.sa/Username",
        date: "Thursday, 23/3/2022",
        location: "Saudi Arabia, Jeddah",
        avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format`,
      }))
  );

  const handleAddContact = () => {
    console.log("Add contact clicked");
  };

  const handleRefresh = () => {
    console.log("Refresh clicked");
  };

  const handleSearch = () => {
    console.log("Search clicked");
  };

  const handleContactAction = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleSave = () => {
    console.log("Saving contact:", selectedContact);
    closeModal();
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
          Contact
        </h1>
      </div>
      <section className="bg-gray-200 p-3 md:p-5 rounded-2xl md:rounded-4xl mt-5 w-full max-w-full overflow-hidden">
        <div className="">
          {/* Header Section */}
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-3xl tracking-tight">Latest Contact</h1>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddContact}
                className="flex items-center gap-2 px-4 py-1 rounded-full bg-gray-100 hover:bg-gray-50 transition-all duration-200"
              >
                <Plus size={18} />
                <span className="text-lg">Add</span>
              </button>

              <button
                onClick={handleRefresh}
                className="p-2 bg-gray-100 hover:bg-gray-50 rounded-full transition-all duration-200"
              >
                <RotateCcw size={20} />
              </button>

              <button
                onClick={handleSearch}
                className="p-2 bg-gray-100 hover:bg-gray-50 rounded-full transition-all duration-200"
              >
                <Search size={20} />
              </button>
            </div>
          </header>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-20 mt-20">
            {contacts.map((contact) => (
              <article
                key={contact.id}
                className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100/50 hover:shadow-lg hover:border-gray-200 transition-all duration-300 relative group cursor-pointer"
              >
                {/* More Options Button */}
                <button
                  onClick={() => handleContactAction(contact)}
                  className="absolute top-4 right-4 p-2 bg-gray-200 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                  aria-label="Contact options"
                >
                  <MoreVertical size={16} />
                </button>

                {/* Avatar Section */}
                <div className="flex justify-center mb-5">
                  <Image
                    src={"https://github.com/shadcn.png"}
                    alt="avatar"
                    width={100}
                    height={100}
                    className="rounded-full -mt-20"
                  />
                </div>

                {/* Contact Information */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl">{contact.name}</h2>

                  <p className="text-sm">{contact.position}</p>

                  <div className="pt-2 space-y-1">
                    <p className="text-xs font-medium">{contact.date}</p>
                    <p className="text-xs">{contact.location}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Details Modal */}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative bg-gray-200 p-8 rounded-3xl max-w-3xl w-full max-h-[95vh] overflow-y-auto no-scrollbar border border-black">
            {/* Content */}
            <div className="max-w-md w-full mx-auto">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-50 hover:bg-opacity-50 rounded-full transition-all"
              >
                <X size={20} />
              </button>

              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <Image
                  src={"https://github.com/shadcn.png"}
                  alt="avatar"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>

              {/* Contact Form */}
              <div className="space-y-2">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <div className="bg-white bg-opacity-70 rounded-lg px-4 py-3 border border-gray-200">
                      <span className="text-gray-900">
                        {selectedContact.firstName}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <div className="bg-white bg-opacity-70 rounded-lg px-4 py-3 border border-gray-200">
                      <span className="text-gray-900">
                        {selectedContact.lastName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Company and Position */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <div className="bg-white bg-opacity-70 rounded-lg px-4 py-3 border border-gray-200">
                      <span className="text-gray-900">
                        {selectedContact.company}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Position
                    </label>
                    <div className="bg-white bg-opacity-70 rounded-lg px-4 py-3 border border-gray-200">
                      <span className="text-gray-900">
                        {selectedContact.position}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="bg-white bg-opacity-70 rounded-lg px-4 py-3 border border-gray-200 flex items-center justify-between">
                    <span className="text-gray-900">
                      {selectedContact.phone}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Phone size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="bg-white bg-opacity-70 rounded-lg px-4 py-3 border border-gray-200 flex items-center justify-between">
                    <span className="text-gray-900">
                      {selectedContact.email}
                    </span>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>

                {/* Profile Link */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    iScan Profile Link
                  </label>
                  <div className="bg-white bg-opacity-70 rounded-lg px-4 py-3 border border-gray-200 flex items-center justify-between">
                    <span className="text-blue-600">
                      {selectedContact.profileLink}
                    </span>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Link size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
