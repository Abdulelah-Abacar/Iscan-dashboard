import { QrCode, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ElitePassDialog = ({onBack, onContinue}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titles, setTitles] = useState({
    title1: "",
    title2: "",
    title3: "",
    title4: "",
    title5: "",
  });
  const [subjects, setSubjects] = useState({
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
  });

  const slides = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      ),
      title: "Contact+",
      content:
        "The quiet river danced under the silver moonlight, while forgotten whispers echoed through the timeless valley. Shadows of ancient tree",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
          />
        </svg>
      ),
      title: "Information",
      content:
        "Discover advanced features and premium capabilities that will enhance your experience. Access exclusive content and unlock powerful tools designed for professionals.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
          />
        </svg>
      ),
      title: "Global Access",
      content:
        "Connect with users worldwide and access global features. Experience seamless integration across different platforms and regions with our international support.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleTitleChange = (key, value) => {
    setTitles((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubjectChange = (key, value) => {
    setSubjects((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-2xl border-2 border-black p-8 max-w-6xl w-full max-h-[95vh] overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Customize Your Elite Pass
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-8">
          {/* Left Side - Preview */}
          <div className="flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg w-80">
              {/* Header with iScan logo */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-gray-800">iScan))</div>
              </div>

              {/* Image placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-200 rounded border px-4 py-2 text-sm text-gray-600">
                    IMAGE
                  </div>
                </div>
              </div>

              {/* Input fields */}
              <div className="space-y-3 mb-6">
                <div className="flex gap-2">
                  <div className="border-2 border-dashed border-gray-300 rounded px-3 py-2 flex-1 text-xs text-gray-500">
                    Field 1
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded px-3 py-2 flex-1 text-xs text-gray-500">
                    Field 2
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="border-2 border-dashed border-gray-300 rounded px-3 py-2 flex-1 text-xs text-gray-500">
                    Field 3
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded px-3 py-2 flex-1 text-xs text-gray-500">
                    Field 4
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-4">
                {/* <div className="w-20 h-20 bg-black rounded">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    <rect x="10" y="10" width="15" height="15" fill="white"/>
                    <rect x="30" y="10" width="5" height="5" fill="white"/>
                    <rect x="40" y="10" width="5" height="5" fill="white"/>
                    <rect x="50" y="10" width="5" height="5" fill="white"/>
                    <rect x="65" y="10" width="15" height="15" fill="white"/>
                    <rect x="10" y="30" width="5" height="5" fill="white"/>
                    <rect x="20" y="30" width="5" height="5" fill="white"/>
                    <rect x="35" y="30" width="10" height="5" fill="white"/>
                    <rect x="50" y="30" width="5" height="5" fill="white"/>
                    <rect x="65" y="30" width="5" height="5" fill="white"/>
                    <rect x="75" y="30" width="5" height="5" fill="white"/>
                    <rect x="10" y="40" width="5" height="5" fill="white"/>
                    <rect x="20" y="40" width="5" height="5" fill="white"/>
                    <rect x="30" y="40" width="5" height="5" fill="white"/>
                    <rect x="45" y="40" width="10" height="5" fill="white"/>
                    <rect x="65" y="40" width="5" height="5" fill="white"/>
                    <rect x="75" y="40" width="5" height="5" fill="white"/>
                    <rect x="10" y="50" width="5" height="5" fill="white"/>
                    <rect x="25" y="50" width="15" height="5" fill="white"/>
                    <rect x="50" y="50" width="5" height="5" fill="white"/>
                    <rect x="65" y="50" width="5" height="5" fill="white"/>
                    <rect x="75" y="50" width="5" height="5" fill="white"/>
                    <rect x="10" y="65" width="15" height="15" fill="white"/>
                    <rect x="30" y="65" width="5" height="5" fill="white"/>
                    <rect x="40" y="65" width="5" height="5" fill="white"/>
                    <rect x="50" y="65" width="5" height="5" fill="white"/>
                    <rect x="65" y="65" width="15" height="15" fill="white"/>
                  </svg>
                </div> */}
                <QrCode size={50} />
              </div>
            </div>
          </div>

          {/* Middle - Form Fields */}
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Titles Column */}
            <div className="space-y-4">
              {Object.entries(titles).map(([key, value], index) => (
                <div key={key}>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title #{index + 1}
                  </label> */}
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleTitleChange(key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder={`Title #${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Subjects Column */}
            <div className="space-y-4">
              {Object.entries(subjects).map(([key, value], index) => (
                <div key={key}>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject #{index + 1}
                  </label> */}
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleSubjectChange(key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder={`Subject #${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Image Upload Section */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                {/* <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" /> */}
                <p className="text-sm text-gray-600 mb-2">Upload an image</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Upload
                </label>
              </div>
            </div>
          </div>

          {/* Right Side - Slideshow */}
          <div className="flex-shrink-0 w-80">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                {/* <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-500">
                  {slides[currentSlide].icon}
                </div> */}
                <Image
                  src={
                    "https://primary.jwwb.nl/public/y/y/h/temp-spmntgnbnohsannikjun/image-high-m3qrgg.png?enable-io=true&amp;enable=upscale&amp;width=160"
                  }
                  width={100}
                  height={100}
                  alt="sign"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {slides[currentSlide].title}
              </h3>

              <div className="text-sm text-gray-600 leading-relaxed mb-4 text-center min-h-[80px] transition-all duration-500">
                <p>{slides[currentSlide].content}</p>
              </div>

              <div className="flex justify-center space-x-2 mb-6">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end items-center gap-5 mt-8">
          <button onClick={onBack} className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-500 rounded-lg">
            Back
          </button>
          <button onClick={onContinue} className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};