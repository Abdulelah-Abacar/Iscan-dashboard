"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  CalculatorIcon,
  CheckCircle,
  Plus,
  X,
  Share2,
  Mail,
  MessageCircle,
  ChevronDown,
  SaudiRiyal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Calculator() {
  const t = useTranslations("Calculator");
  const locale = useLocale();

  // Refs for share dropdowns
  const shareDropdownRef = useRef(null);
  const shareMethodRef = useRef(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [showQuantityDialog, setShowQuantityDialog] = useState(false);
  const [showAddOnsDialog, setShowAddOnsDialog] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [showOffersDialog, setShowOffersDialog] = useState(false);
  const [selectedOfferTab, setSelectedOfferTab] = useState("Discount");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [allowMultipleDesigns, setAllowMultipleDesigns] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [shareMethodOpen, setShareMethodOpen] = useState(false);
  const [selectedShareFormat, setSelectedShareFormat] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState([]);

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
      price: 8.2,
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
      price: 6.5,
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
      price: 5.8,
    },
  ];

  const tabs = ["All", "Accessories", "Watch"];

  const addOns = [
    {
      id: "wallet-1",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
    {
      id: "wallet-2",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
    {
      id: "wallet-3",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
    {
      id: "wallet-4",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
    {
      id: "wallet-5",
      name: t("addOns.wallet.name"),
      description: t("addOns.wallet.description"),
      price: 19.99,
    },
  ];

  const shareOptions = [
    { id: "gmail", name: t("shareOptions.gmail"), icon: Mail },
    { id: "whatsapp", name: t("shareOptions.whatsapp"), icon: MessageCircle },
    { id: "outlook", name: t("shareOptions.outlook"), icon: Mail },
    { id: "telegram", name: t("shareOptions.telegram"), icon: MessageCircle },
  ];

  const availableOffers = {
    Discount: [
      {
        id: "discount-10",
        name: t("offers.discount.10"),
        type: "percentage",
        value: 10,
      },
      {
        id: "discount-15",
        name: t("offers.discount.15"),
        type: "percentage",
        value: 15,
      },
      {
        id: "discount-20",
        name: t("offers.discount.20"),
        type: "percentage",
        value: 20,
      },
      {
        id: "discount-25",
        name: t("offers.discount.25"),
        type: "percentage",
        value: 25,
      },
      {
        id: "discount-30",
        name: t("offers.discount.30"),
        type: "percentage",
        value: 30,
      },
    ],
    Subscription: [
      {
        id: "sub-monthly",
        name: t("offers.subscription.monthly"),
        type: "subscription",
        value: 9.99,
      },
      {
        id: "sub-yearly",
        name: t("offers.subscription.yearly"),
        type: "subscription",
        value: 99.99,
      },
      {
        id: "sub-premium",
        name: t("offers.subscription.premium"),
        type: "subscription",
        value: 19.99,
      },
    ],
  };

  const handleRequestCard = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setQuantity(product.minQuantity);
    setIsDialogOpen(false);
    setShowQuantityDialog(true);
  };

  const handleQuantityChange = (newQuantity) => {
    if (selectedProduct && newQuantity >= selectedProduct.minQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleBackToProducts = () => {
    setShowQuantityDialog(false);
    setIsDialogOpen(true);
    setSelectedProduct(null);
    setQuantity(1);
    setAllowMultipleDesigns(false);
  };

  const handleContinueWithQuantity = () => {
    setShowQuantityDialog(false);
    setShowAddOnsDialog(true);
  };

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBackToQuantity = () => {
    setShowAddOnsDialog(false);
    setShowQuantityDialog(true);
  };

  const handleContinueWithAddOns = () => {
    setShowAddOnsDialog(false);
    setShowSummaryDialog(true);
  };

  const handleBackToAddOns = () => {
    setShowSummaryDialog(false);
    setShowAddOnsDialog(true);
  };

  const handleSelectOffer = () => {
    setShowOffersDialog(true);
  };

  const handleUseOffer = (offer) => {
    setAppliedOffers((prev) => {
      // Remove existing offer of the same type
      const filtered = prev.filter((o) => o.type !== offer.type);
      return [...filtered, offer];
    });
    setShowOffersDialog(false);
  };

  const handleRemoveOffer = (offerId) => {
    setAppliedOffers((prev) => prev.filter((o) => o.id !== offerId));
  };

  const calculateSummary = () => {
    if (!selectedProduct) return null;

    const selectedAddOnItems = addOns.filter((addon) =>
      selectedAddOns.includes(addon.id)
    );
    const productTotal = selectedProduct.price * quantity;
    const addOnsTotal = selectedAddOnItems.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    const shipping = 19;

    // Calculate discount
    let discount = 0;
    const discountOffer = appliedOffers.find(
      (offer) => offer.type === "percentage"
    );
    if (discountOffer) {
      discount = (productTotal + addOnsTotal) * (discountOffer.value / 100);
    }

    // Calculate subscription cost
    let subscriptionCost = 0;
    const subscriptionOffer = appliedOffers.find(
      (offer) => offer.type === "subscription"
    );
    if (subscriptionOffer) {
      subscriptionCost = subscriptionOffer.value;
    }

    const total =
      productTotal + addOnsTotal + shipping + subscriptionCost - discount;

    return {
      product: selectedProduct,
      quantity,
      allowMultipleDesigns,
      addOns: selectedAddOnItems,
      productTotal,
      addOnsTotal,
      shipping,
      discount,
      subscriptionCost,
      total,
    };
  };

  const handleShareFormat = (format) => {
    setSelectedShareFormat(format);
    setShareDropdownOpen(false);
    setShareMethodOpen(true);
  };

  const handleShareMethod = (method) => {
    const summary = calculateSummary();
    const shareText = `Quote Summary:
Product: ${summary.product.name}
Quantity: ${summary.quantity}
${summary.allowMultipleDesigns ? "Multiple Designs: Yes" : ""}
Add-ons: ${summary.addOns.map((a) => a.name).join(", ") || "None"}
Applied Offers: ${appliedOffers.map((o) => o.name).join(", ") || "None"}
Total: $${summary.total.toFixed(2)}`;

    console.log(
      `Sharing via ${method.name} as ${selectedShareFormat}:`,
      shareText
    );

    // Reset states
    setShareMethodOpen(false);
    setSelectedShareFormat(null);
    setShowSummaryDialog(false);
    setSelectedProduct(null);
    setQuantity(1);
    setAllowMultipleDesigns(false);
    setSelectedAddOns([]);
    setAppliedOffers([]);
  };

  const summary = calculateSummary();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareDropdownRef.current &&
        !shareDropdownRef.current.contains(event.target)
      ) {
        setShareDropdownOpen(false);
      }
      if (
        shareMethodRef.current &&
        !shareMethodRef.current.contains(event.target)
      ) {
        setShareMethodOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt={t("arrowAlt")}
          width={70}
          height={75}
          className={`hidden lg:block absolute ${
            locale == "ar" ? "-right-13 rotate-180" : "-left-13"
          } top-5`}
        />
        <h1 className="text-3xl md:text-5xl font-normal">{t("title")}</h1>
      </div>

      <section className="bg-gray-200 p-3 md:p-5 rounded-4xl mt-5 mb-24 md:mb-0">
        <div className="w-full max-w-md space-y-6 mx-auto mt-10">
          <div className="w-[200px] aspect-square bg-white p-5 rounded-full flex items-center justify-center mx-auto">
            <CalculatorIcon size={150} strokeWidth={1} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl">{t("subtitle")}</h2>
            <p className="text-gray-600 text-xl">{t("description")}</p>
          </div>
          <div className="mx-auto w-fit my-10">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <Plus size={20} />
              <span className="text-lg font-medium">{t("newQuote")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Product Selection Dialog */}
      {isDialogOpen && (
        <div
          onClick={() => setIsDialogOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-100 rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar"
          >
            {/* Products Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-6 space-y-4"
                >
                  {/* Product Image */}
                  <div className="bg-white rounded-lg p-4 h-48 flex items-center justify-center">
                    <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        iScan
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-200 flex items-center justify-center rounded-full">
                          <CheckCircle size={14} />
                        </div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Request Button */}
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleRequestCard(product.id)}
                      className="bg-gray-200 rounded-full py-1 px-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium"
                    >
                      <Plus size={16} className="inline mr-2" />
                      {t("requestCard")}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div className="pb-6">
              <div className="flex justify-center">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-white w-[150px] rounded-full py-1 px-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  {t("continue")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quantity Selection Dialog */}
      {showQuantityDialog && selectedProduct && (
        <div
          onClick={() => setShowQuantityDialog(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-100 rounded-2xl max-w-2xl w-full max-h-[95vh] p-6 overflow-y-auto border-2 border-black no-scrollbar"
          >
            {/* Dialog Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{t("quoteManager")}</h2>
              <button
                onClick={() => setShowQuantityDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-8 space-y-8">
              {/* Product Name */}
              <div className="text-center">
                <h3 className="text-5xl font-normal">{selectedProduct.name}</h3>
              </div>

              {/* Quantity Section */}
              <div className="space-y-4 max-w-md mx-auto">
                <h4 className="text-3xl font-medium">{t("quantity")}</h4>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between space-x-6 bg-white py-1 px-4 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= selectedProduct.minQuantity}
                    className="w-8 h-8 flex items-center justify-center text-4xl font-light hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    −
                  </button>

                  <div className="text-2xl font-medium min-w-[60px] text-center">
                    {quantity}
                  </div>

                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-4xl font-light hover:bg-gray-100 rounded-full transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleBackToProducts}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                {t("back")}
              </button>
              <button
                onClick={handleContinueWithQuantity}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                {t("continue")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add-Ons Selection Dialog */}
      {showAddOnsDialog && selectedProduct && (
        <div
          onClick={() => setShowAddOnsDialog(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-100 rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar p-6 space-y-5"
          >
            {/* Dialog Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h2 className="text-4xl">{t("addOnsTitle")}</h2>
              </div>
              <button
                onClick={() => setShowAddOnsDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Add-Ons List */}
            <div className="space-y-4">
              {addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id={addOn.id}
                      checked={selectedAddOns.includes(addOn.id)}
                      onChange={() => handleAddOnToggle(addOn.id)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{addOn.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {addOn.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-medium text-gray-900">
                    +{addOn.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleBackToQuantity}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                {t("back")}
              </button>
              <button
                onClick={handleContinueWithAddOns}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                {t("continue")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Dialog */}
      {showSummaryDialog && summary && (
        <div
          onClick={() => setShowSummaryDialog(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-100 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar p-6 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{t("summary")}</h2>
              <button
                onClick={() => setShowSummaryDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">iScan</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    {summary.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t("quantityLabel")}: {summary.quantity} •{" "}
                    {summary.allowMultipleDesigns
                      ? t("multipleDesigns")
                      : t("singleDesign")}
                  </p>
                </div>
              </div>

              {/* Offers */}
              <div className="space-y-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-full py-1 px-4">
                    <h4 className="text-lg font-medium">{t("selectOffer")}</h4>
                    <button
                      onClick={handleSelectOffer}
                      className="py-1 px-3 rounded-full bg-gray-200 text-sm font-medium"
                    >
                      {t("select")}
                    </button>
                  </div>

                  {/* Applied Offers */}
                  {appliedOffers.length > 0 && (
                    <div className="space-y-2">
                      {appliedOffers.map((offer) => (
                        <div
                          key={offer.id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-700">
                            {offer.name}
                          </span>
                          <button
                            onClick={() => handleRemoveOffer(offer.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            {t("remove")}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="freeShipping"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="freeShipping"
                      className="text-lg text-gray-600"
                    >
                      {t("freeShipping")}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="firstYearFree"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="firstYearFree"
                      className="text-lg text-gray-600"
                    >
                      {t("firstYearFree")}
                    </label>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="space-y-3 bg-white rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl">{t("profit")}</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">(% 233)</span>
                      <span className="ml-2 font-medium">
                        <SaudiRiyal size={24} className="inline" />{" "}
                        {summary.total.toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl">{t("discount")}</span>
                    <span className="font-medium">
                      <SaudiRiyal size={24} className="inline" />{" "}
                      {summary.discount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl">{t("perPcs")}</span>
                    <span className="font-medium">
                      <SaudiRiyal size={24} className="inline" />{" "}
                      {summary.product.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl">{t("shipping")}</span>
                    <span className="font-medium">
                      <SaudiRiyal size={24} className="inline" />{" "}
                      {summary.shipping}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-white rounded-2xl py-2 px-4">
                  <span className="text-xl font-medium">{t("total")}</span>
                  <span className="text-lg font-bold">
                    <SaudiRiyal size={24} className="inline" />{" "}
                    {summary.total.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-5 justify-end">
              <button
                onClick={handleBackToAddOns}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                {t("back")}
              </button>

              <div className="relative" ref={shareDropdownRef}>
                <button
                  onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  <Share2 size={18} />
                  <span>{t("checkShare")}</span>
                  <ChevronDown size={18} />
                </button>

                {/* Share Format Dropdown */}
                {shareDropdownOpen && (
                  <div className="absolute bottom-full mb-5 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-2">
                      <button
                        onClick={() => handleShareFormat("text")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        {t("shareAsText")}
                      </button>
                      <button
                        onClick={() => handleShareFormat("pdf")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        {t("shareAsPdf")}
                      </button>
                    </div>
                  </div>
                )}

                {/* Share Method Dropdown */}
                {shareMethodOpen && (
                  <div
                    ref={shareMethodRef}
                    className="absolute bottom-full mb-5 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">
                        {t("shareAs")} {selectedShareFormat}
                      </div>
                      {shareOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleShareMethod(option)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2"
                        >
                          <option.icon size={16} />
                          <span>{option.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offers Dialog */}
      {showOffersDialog && (
        <div
          onClick={() => setShowOffersDialog(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-300 p-5 rounded-2xl max-w-md w-full max-h-[95vh] overflow-y-auto no-scrollbar space-y-4"
          >
            <div className="bg-white rounded-full w-fit flex gap-2 py-1 px-4 mx-auto">
              {Object.keys(availableOffers).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedOfferTab(tab)}
                  className={`px-4 rounded-full ${
                    selectedOfferTab === tab
                      ? "bg-blue-600 text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {availableOffers[selectedOfferTab]?.map((offer) => (
                <div
                  key={offer.id}
                  className="flex items-center justify-between py-2 px-4 rounded-lg bg-white transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-medium">{offer.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {offer.type === "percentage"
                        ? ""
                        : `$${offer.value.toFixed(2)} ${t("per")} ${
                            offer.name.includes(t("yearly"))
                              ? t("year")
                              : t("month")
                          }`}
                    </p>
                  </div>
                  <button
                    onClick={() => handleUseOffer(offer)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                  >
                    {t("use")}
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
