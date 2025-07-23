"use client";
import Image from "next/image";
import { Search, Filter, RefreshCw, X, Star } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function Rating() {
  const t = useTranslations("Rating");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRating, setSelectedRating] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [ratingsData, setRatingsData] = useState([
    {
      id: 1,
      user: "Claire C.",
      stars: 4,
      comment: "Wow Good stuf Wow Good stuf Wow Good stuf Wow Good stuf",
      hasReply: false,
      reply: "",
      isPending: false,
      image: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      user: "John D.",
      stars: 5,
      comment: "Excellent product, highly recommend!",
      hasReply: true,
      reply:
        "Thank you for your positive feedback! We're glad you loved our product.",
      isPending: false,
      image: null,
    },
    {
      id: 3,
      user: "Alice B.",
      stars: 3,
      comment:
        "It's okay, could be better. The quality was decent but not exceptional. I might consider buying again if improvements are made.",
      hasReply: false,
      reply: "",
      isPending: true,
      image: "https://github.com/shadcn.png",
    },
    {
      id: 4,
      user: "Bob S.",
      stars: 2,
      comment: "Not what I expected",
      hasReply: false,
      reply: "",
      isPending: true,
      image: "https://github.com/shadcn.png",
    },
    {
      id: 5,
      user: "Eve W.",
      stars: 4,
      comment: "Pretty good overall. Satisfied with my purchase.",
      hasReply: true,
      reply: "We appreciate your satisfaction! Your feedback helps us improve.",
      isPending: false,
      image: null,
    },
    {
      id: 6,
      user: "Charlie K.",
      stars: 1,
      comment: "Terrible experience. Would not recommend to anyone.",
      hasReply: false,
      reply: "",
      isPending: false,
      image: "https://github.com/shadcn.png",
    },
  ]);

  // Filter ratings based on active tab 
  const filteredRatings = ratingsData.filter((rating) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return rating.isPending;
    if (activeTab === "reply") return !rating.hasReply && !rating.isPending;
    return true;
  });

  const handleReplyClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleReplySubmit = () => {
    if (replyText.trim() && selectedRating) {
      setRatingsData((prev) =>
        prev.map((rating) =>
          rating.id === selectedRating.id
            ? { ...rating, hasReply: true, reply: replyText.trim() }
            : rating
        )
      );

      setSelectedRating((prev) => ({
        ...prev,
        hasReply: true,
        reply: replyText.trim(),
      }));

      setShowReplyForm(false);
      setReplyText("");
    }
  };

  const handleReplyCancel = () => {
    setShowReplyForm(false);
    setReplyText("");
  };

  const closeModal = () => {
    setSelectedRating(null);
    setShowReplyForm(false);
    setReplyText("");
  };

  const handleAction = (id, action) => {
    if (action === "accept") {
      setRatingsData((prev) =>
        prev.map((rating) =>
          rating.id === id ? { ...rating, isPending: false } : rating
        )
      );
    } else if (action === "decline") {
      setRatingsData((prev) => prev.filter((rating) => rating.id !== id));
    }
  };

  return (
    <>
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className={`hidden lg:block absolute ${locale == 'ar' ? '-right-13 rotate-180' : '-left-13'} top-5`}
        />
        <h1 className="text-5xl font-normal">{t("title")}</h1>
      </div>
      <section className="bg-gray-200 rounded-3xl md:rounded-4xl p-4 md:p-5 mt-5 mb-28 md:mb-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl">{t("latestRating")}</h2>
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-full text-xs md:text-sm ${
                  activeTab === "all" ? "bg-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("all")}
              >
                {t("tabs.all")}
              </button>
              <button
                className={`px-3 py-1 rounded-full text-xs md:text-sm ${
                  activeTab === "pending" ? "bg-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                {t("tabs.pending")}
              </button>
              <button
                className={`px-3 py-1 rounded-full text-xs md:text-sm ${
                  activeTab === "reply" ? "bg-white" : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("reply")}
              >
                {t("tabs.reply")}
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 md:p-2 cursor-pointer bg-white rounded-full">
                <Filter className="w-4 h-4 md:w-5 md:h-5" />
                <span className="sr-only">{t("actions.filter")}</span>
              </button>
              <button className="p-1.5 md:p-2 cursor-pointer bg-white rounded-full">
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
                <span className="sr-only">{t("actions.refresh")}</span>
              </button>
              <button className="p-1.5 md:p-2 cursor-pointer bg-white rounded-full">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                <span className="sr-only">{t("actions.search")}</span>
              </button>
            </div>
          </div>
        </div>

        {filteredRatings.length > 0 ? (
          <MasonryLayout
            ratings={filteredRatings}
            onReplyClick={handleReplyClick}
            onAction={handleAction}
          />
        ) : (
          <div className="w-full text-center py-10 text-gray-500 col-span-full">
            {t("noRatings")}
          </div>
        )}
      </section>

      {/* Review Modal */}
      {selectedRating && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <div className="bg-gray-200 rounded-2xl w-full max-w-3xl max-h-screen overflow-y-auto relative">
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={closeModal}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="p-4 md:p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                {/* Product Image */}
                {selectedRating.image && (
                  <div className="flex-shrink-0 w-full lg:w-80">
                    <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-orange-200 via-orange-300 to-blue-900 rounded-lg overflow-hidden">
                      <Image
                        width={320}
                        height={320}
                        src={selectedRating.image}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={`${
                          star <= selectedRating.stars
                            ? "fill-black text-black"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {selectedRating.user}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedRating.comment}
                    </p>
                  </div>

                  <div className="mt-6">
                    {!selectedRating.hasReply && !showReplyForm && (
                      <button
                        onClick={() => setShowReplyForm(true)}
                        className="px-5 py-1 mx-auto block font-medium bg-white hover:bg-white/70 rounded-full cursor-pointer transition-colors"
                      >
                        {t("modal.reply")}
                      </button>
                    )}

                    {showReplyForm && (
                      <div className="mt-4">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={t("modal.writeReply")}
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          rows={4}
                        />
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={handleReplySubmit}
                            disabled={!replyText.trim()}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                          >
                            {t("modal.submitReply")}
                          </button>
                          <button
                            onClick={handleReplyCancel}
                            className="px-4 py-2 text-sm font-medium border border-black cursor-pointer hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            {t("modal.cancel")}
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedRating.hasReply && selectedRating.reply && (
                      <div className="mt-4 p-4 bg-white rounded-4xl">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <strong className="text-base font-bold">
                              {t("modal.yourReply")}
                            </strong>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {selectedRating.reply}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Stars = ({ count }) => {
  return (
    <div className="flex">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <span key={i} className="text-lg">
            {i < count ? "★" : "☆"}
          </span>
        ))}
    </div>
  );
};

const RatingCard = ({ rating, onReplyClick, onAction }) => {
  const t = useTranslations("Rating");

  return (
    <div
      className={`bg-white rounded-3xl md:rounded-4xl h-min overflow-hidden shadow-sm p-4 mb-3`}
    >
      <div className="flex flex-col h-full">
        {rating.image && (
          <div className="w-full h-40 md:h-48 relative rounded-lg overflow-hidden mb-3">
            <Image
              src={rating.image}
              alt="Product"
              fill
              className="object-cover h-full w-full"
            />
          </div>
        )}
        <div className="flex-grow flex flex-col">
          <Stars count={rating.stars} />
          <p className="font-medium text-gray-700">{rating.user}</p>
          <p className="text-sm text-gray-600 mt-1 flex-grow">
            {rating.comment}
          </p>
          <div className="mt-4 flex justify-center">
            {rating.isPending ? (
              <div className="flex space-x-4">
                <button
                  className="bg-red-500 text-white text-xs cursor-pointer px-3 py-1 md:px-4 md:py-1 rounded-full flex items-center"
                  onClick={() => onAction(rating.id, "decline")}
                >
                  {t("ratingActions.decline")}
                </button>
                <button
                  className="bg-green-500 text-white text-xs cursor-pointer px-3 py-1 md:px-4 md:py-1 rounded-full flex items-center"
                  onClick={() => onAction(rating.id, "accept")}
                >
                  {t("ratingActions.accept")}
                </button>
              </div>
            ) : rating.hasReply ? (
              <button
                className="bg-gray-100 text-gray-600 text-xs cursor-pointer px-3 py-1 md:px-4 md:py-1 rounded-full flex items-center"
                onClick={() => onReplyClick(rating)}
              >
                {t("modal.seeReply")}
              </button>
            ) : (
              <button
                className="bg-gray-100 text-gray-600 text-xs cursor-pointer px-3 py-1 md:px-4 md:py-1 rounded-full flex items-center"
                onClick={() => onReplyClick(rating)}
              >
                {t("modal.reply")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MasonryLayout = ({ ratings, onReplyClick, onAction }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
      {ratings.map((rating, index) => (
        <RatingCard
          rating={rating}
          key={index}
          onReplyClick={onReplyClick}
          onAction={onAction}
        />
      ))}
    </div>
  );
};