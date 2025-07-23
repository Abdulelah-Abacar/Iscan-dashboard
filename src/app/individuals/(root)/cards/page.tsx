"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  CreditCard,
  Plus,
  Smartphone,
  ShoppingBag,
  X,
  LockKeyholeOpen,
  ScanLine,
  MoreVertical,
  CheckCircle,
  Check,
  ChevronDown,
  Search,
  ShoppingCart,
  SaudiRiyal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CustomizeEliteCardDialog } from "@/components/individuals/CustomizeEliteCardDialog";
import { ProductDetailDialog } from "@/components/individuals/ProductDetailDialog";
import { AddOnsDialog } from "@/components/individuals/AddOnsDialog";
import RequestCardDialog from "@/components/individuals/RequestCardDialog";
import { CheckoutFlow } from "@/components/individuals/CheckoutFlow";

export default function Card() {
  const t = useTranslations("Calculator");
  const locale = useLocale();
  const [isActive, setIsActive] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [isRequestCardDialogOpen, setIsRequestCardDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customizeEliteCardDialog, setShowCustomizeEliteCardDialog] =
    useState(false);
  const [addOnsDialog, setShowAddOnsDialog] = useState(false);
  const [cardSetting, setShowCardSetting] = useState(false);
  const [productDetailDialog, setProductDetailDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [checkoutDialog, setShowCheckoutDialog] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    accessType: "Access Pass",
    safeKey: "",
    scanKey: "iScanKey",
  });
  const [userCards, setUserCards] = useState([
    {
      id: 1,
      name: "Omar Card",
      activationDate: "11/11/2023",
      linkedAccount: "Username",
      type: "Elite Card",
      vendor: "iScan",
      status: "Active",
    },
    {
      id: 2,
      name: "Omar Card",
      activationDate: "11/11/2023",
      linkedAccount: "Username",
      type: "Elite Card",
      vendor: "iScan",
      status: "Active",
    },
    {
      id: 3,
      name: "Omar Card",
      activationDate: "",
      linkedAccount: "",
      type: "",
      vendor: "",
      status: "Inactive",
    },
  ]);

  const products = [
    {
      id: "elite-card",
      name: t("products.eliteCard.name"),
      description: t("products.eliteCard.description"),
      image: "/elite-card.png",
      features: [
        t("products.eliteCard.features.0"),
        t("products.eliteCard.features.1"),
        t("products.eliteCard.features.2"),
        t("products.eliteCard.features.3"),
      ],
      minQuantity: 1,
      price: 82.99,
      rating: 4.9,
      reviews: 1000,
      colors: ["black", "beige", "blue"],
      types: ["NFC", "NFC + RFID"],
    },
    {
      id: "elite-pass",
      name: t("products.elitePass.name"),
      description: t("products.elitePass.description"),
      image: "/elite-pass.png",
      features: [
        t("products.elitePass.features.0"),
        t("products.elitePass.features.1"),
        t("products.elitePass.features.2"),
        t("products.elitePass.features.3"),
      ],
      minQuantity: 5,
      price: 65.99,
      rating: 4.7,
      reviews: 850,
      colors: ["black", "beige", "blue"],
      types: ["NFC", "NFC + RFID"],
    },
    {
      id: "elite-print",
      name: t("products.elitePrint.name"),
      description: t("products.elitePrint.description"),
      image: "/elite-print.png",
      features: [
        t("products.elitePrint.features.0"),
        t("products.elitePrint.features.1"),
        t("products.elitePrint.features.2"),
        t("products.elitePrint.features.3"),
      ],
      minQuantity: 10,
      price: 58.99,
      rating: 4.8,
      reviews: 920,
      colors: ["black", "beige", "blue"],
      types: ["NFC", "NFC + RFID"],
    },
  ];

  const handleRequestCard = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setQuantity(product.minQuantity);
    setIsRequestCardDialogOpen(false);
    setShowCustomizeEliteCardDialog(true);
  };

  // Handle Continue
  const handleContinueFromCustomizeEliteCardDialog = () => {
    setShowCustomizeEliteCardDialog(false);
    setProductDetailDialog(true);
  };

  const handleContinueFromProductDetail = () => {
    setProductDetailDialog(false);
    setShowAddOnsDialog(true);
  };

  const handleContinueFromAddOns = () => {
    setShowAddOnsDialog(false);
    setShowCheckoutDialog(true);
  };

  // Handle back
  const handleBackFromCustomizeEliteCardDialog = () => {
    setShowCustomizeEliteCardDialog(false);
    setIsRequestCardDialogOpen(true);
  };

  const handleBackFromProductDetail = () => {
    setProductDetailDialog(false);
    setShowCustomizeEliteCardDialog(true);
  };

  const handleBackFromAddOns = () => {
    setShowAddOnsDialog(false);
    setProductDetailDialog(true);
  };

  const handleBackFromCheckout = () => {
    setShowCheckoutDialog(false);
    setShowAddOnsDialog(true);
  };

  const closeAllDialogs = () => {
    setIsDialogOpen(false);
    setIsActivateDialogOpen(false);
    setIsRequestCardDialogOpen(false);
    setProductDetailDialog(false);
    setShowCustomizeEliteCardDialog(false);
    setShowAddOnsDialog(false);
  };

  return (
    <>
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt={"arrow icon"}
          width={70}
          height={75}
          className={`hidden lg:block absolute ${
            locale == "ar" ? "-right-13 rotate-180" : "-left-13"
          } top-5`}
        />
        <h1 className="text-3xl md:text-5xl font-normal">Card</h1>
      </div>

      <section className="bg-gray-200 p-3 md:p-5 rounded-4xl mt-5 mb-24 md:mb-0">
        {userCards.length === 0 ? (
          // Empty State
          <div className="w-full max-w-md space-y-6 mx-auto mt-10">
            <div className="w-[200px] aspect-square bg-white p-5 rounded-full flex items-center justify-center mx-auto">
              <CreditCard size={150} strokeWidth={1} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl">Manage and Access Your Digital Cards</h2>
              <p className="text-gray-600 text-xl">
                Create, manage, and share digital cards with ease — all from one
                place.
              </p>
            </div>
            <div className="mx-auto w-fit my-10">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                <Plus size={20} />
                <span className="text-lg font-medium">New Card</span>
              </button>
            </div>
          </div>
        ) : (
          // Cards Grid
          <div className="">
            {/* New Card Button - Top Right */}
            <div className="mb-28">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="ml-auto flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm text-sm"
              >
                <Plus size={16} />
                <span className="font-medium">New Card</span>
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {userCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-gray-100 rounded-[50px] p-6 shadow-sm flex flex-col items-center justify-center gap-4"
                >
                  {/* Card Visual */}
                  <div className="flex justify-center">
                    <Image
                      alt="card"
                      src={"/IscanCard.png"}
                      width={270}
                      height={150}
                      className="rounded-md shadow-md -mt-24"
                    />
                  </div>

                  {/* Card Name */}
                  <h3 className="text-2xl font-medium text-center">
                    {card.name}
                  </h3>

                  {/* Card Details */}
                  {card.status === "Active" ? (
                    <div className="space-y-2 text-sm grid grid-cols-2 gap-2 place-content-between w-full flex-1">
                      <div className="flex justify-center flex-col items-center">
                        <span className="">Activation Date:</span>
                        <span className="bg-white rounded-full py-0.5 px-4">
                          {card.activationDate}
                        </span>
                      </div>
                      <div className="flex justify-center flex-col items-center">
                        <span className="">Linked Account:</span>
                        <span className="bg-white rounded-full py-0.5 px-4">
                          {card.linkedAccount}
                        </span>
                      </div>
                      <div className="flex justify-center flex-col items-center">
                        <span className="">Type:</span>
                        <span className="bg-white rounded-full py-0.5 px-4">
                          {card.type}
                        </span>
                      </div>
                      <div className="flex justify-center flex-col items-center">
                        <span className="">Vendor:</span>
                        <span className="bg-white rounded-full py-0.5 px-4">
                          {card.vendor}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full flex-1">
                      <button
                        onClick={() => {
                          setIsActivateDialogOpen(true);
                        }}
                        className="bg-white rounded-full py-2 px-5 flex items-center justify-center gap-2"
                      >
                        <LockKeyholeOpen size={34} />
                        <span>Activate Card</span>
                      </button>
                    </div>
                  )}

                  {/* Status and Actions */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 bg-white py-1 px-4 rounded-full">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          card.status === "Active"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      ></div>
                      <span className={`text-lg font-medium`}>
                        {card.status}
                      </span>
                    </div>

                    {card.status !== "Inactive" && (
                      <button
                        onClick={() => setShowCardSetting(true)}
                        className="p-2 bg-white rounded-full"
                      >
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Card Setting */}
      {cardSetting && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar p-6 space-y-5 ">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl flex-1 text-center">Card Setting</h2>
              <button
                onClick={() => setShowCardSetting(false)}
                className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-3">
              {/* Card Name Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  Card name
                </h3>
                <div className="bg-white rounded-md py-2.5 px-4 font-medium">Omar's Card</div>
              </div>

              {/* Exclusive Features Section */}
              <div>
                <h3 className="text-lg font-medium mb-1">
                  Exclusive Features
                </h3>
                <div className="bg-white rounded-md py-2.5 px-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-700">Wallet+</span>
                  <span className="text-gray-400">,</span>
                  <span className="text-sm text-gray-700">Contact+</span>
                  <span className="text-gray-400">,</span>
                  <span className="text-sm text-gray-700">Biobank</span>
                </div>
              </div>

              {/* Card Status Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  Card Status
                </h3>
                <div className="bg-white rounded-md py-2.5 px-4 flex items-center justify-between">
                  <span className="text-base text-gray-700">Active</span>
                  <button
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                      isActive ? "bg-green-500" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                        isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setShowCardSetting(false)}
                className="mx-auto w-[200px] flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Overlay */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar p-6 space-y-5 ">
            {/* Close Button */}
            <div className="">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="block ml-auto text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="flex items-center justify-center gap-5">
              {/* Launch Your Card Section */}
              <div className="text-center aspect-[9/12] bg-white rounded-md p-4 flex flex-col justify-between items-center">
                <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone size={54} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-medium">Launch Your Card</h3>
                <button
                  onClick={() => {
                    setIsDialogOpen(false);
                    setIsActivateDialogOpen(true);
                  }}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <LockKeyholeOpen size={24} className="text-gray-600" />
                  <span>Activate Card</span>
                </button>
              </div>

              {/* Order a New Card Section */}
              <div className="text-center  aspect-[9/12] bg-white rounded-md p-4 flex flex-col justify-between items-center">
                <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag size={54} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-medium">Order a New Card</h3>
                <button
                  onClick={() => {
                    setIsDialogOpen(false);
                    setIsRequestCardDialogOpen(true);
                  }}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  <span>Request Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Launch Your Card Dialog */}
      {isActivateDialogOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-200 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar p-6 space-y-5">
            {/* Close Button */}
            <div>
              <button
                onClick={() => setIsActivateDialogOpen(false)}
                className="block ml-auto p-1 bg-white rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="space-y-6">
              {/* Card Visual */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Black Card */}
                  <div className="w-32 h-20 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm transform rotate-12 z-10 relative">
                    iScan))
                  </div>
                  {/* Beige Card Behind */}
                  <div className="w-32 h-20 bg-yellow-100 rounded-lg absolute top-2 left-4 transform rotate-6"></div>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-medium text-center text-gray-800 mb-8">
                Launch Your Card
              </h2>

              {/* Form Fields */}
              <div className="space-y-4 w-4/5 mx-auto">
                {/* Card Name */}
                <div>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) =>
                      setFormData({ ...formData, cardName: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 rounded-full border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter card name"
                  />
                </div>

                {/* Access Type Row */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-full">
                      <span className="text-gray-700">
                        {formData.accessType}
                      </span>
                      <ScanLine
                        size={34}
                        className="text-gray-600 rounded-full p-1 bg-gray-200 absolute right-4 top-1/2 -translate-y-1/2"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.safeKey}
                      onChange={(e) =>
                        setFormData({ ...formData, safeKey: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-full border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Enter safe key"
                    />
                  </div>
                </div>

                {/* iScanKey */}
                <div>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-full">
                    <span className="font-medium">{formData.scanKey}</span>
                    <span className="text-[10px] rounded-full">(Optional)</span>
                  </div>
                </div>
              </div>

              {/* Activate Button */}
              <button className="w-fit bg-white text-gray-700 py-2 px-6 rounded-full mx-auto transition-colors flex items-center justify-center gap-2 mt-8">
                <LockKeyholeOpen size={24} />
                <span className="font-medium">Activate Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Card Dialog */}
      {isRequestCardDialogOpen && (
        <RequestCardDialog 
          onClose={() => setIsRequestCardDialogOpen(false)}
          onContinue={() => setIsRequestCardDialogOpen(false)}
          onRequest={handleRequestCard}
          onActive={() => setIsActivateDialogOpen(false)}
          products={products}
        />
      )}

      {/* Customize Elite Card Dialog */}
      {customizeEliteCardDialog && selectedProduct && (
        <CustomizeEliteCardDialog
          product={selectedProduct}
          onClose={() => setShowCustomizeEliteCardDialog(false)}
          onBack={handleBackFromCustomizeEliteCardDialog}
          onContinue={handleContinueFromCustomizeEliteCardDialog}
        />
      )}

      {/* Product Detail Dialog */}
      {productDetailDialog && selectedProduct && (
        <ProductDetailDialog
          product={selectedProduct}
          onClose={() => setProductDetailDialog(false)}
          onBack={handleBackFromProductDetail}
          onContinue={handleContinueFromProductDetail}
        />
      )}

      {/* Add Ons Dialog */}
      {addOnsDialog && (
        <AddOnsDialog
          onClose={() => setShowAddOnsDialog(false)}
          onBack={handleBackFromAddOns}
          onContinue={handleContinueFromAddOns}
        />
      )}

      {checkoutDialog && (
        <CheckoutFlow
          onClose={() => setShowCheckoutDialog(false)}
          onBack={handleBackFromCheckout}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
}
