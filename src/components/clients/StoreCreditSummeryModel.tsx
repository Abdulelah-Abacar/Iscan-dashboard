import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

function StoreCreditSummeryModel({ 
  setIsStoreCreditSummeryModelOpen, 
  handleReviewChanges, 
  customerCredit, 
  adjustment, 
  amount, 
  hasExpiration, 
  expirationDate 
}) {
  const t = useTranslations("StoreCreditSummeryModel");
  const locale = useLocale();

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-30">
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center">
              { locale == "ar" ? (<ChevronRight size={22} className="text-gray-500" />) : (<ChevronLeft size={22} className="text-gray-500" />) }
            </div>
            <span className="text-sm font-medium">{t("reviewChanges")}</span>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setIsStoreCreditSummeryModelOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            {t("summary")}
          </h3>

          {/* Balance */}
          <div className="flex justify-between items-center py-2 text-sm">
            <span className="text-gray-600">{t("balance")}</span>
            <span className="font-medium">
              SAR {customerCredit.toFixed(2)}
            </span>
          </div>

          {/* Amount to credit/debit */}
          <div className="flex justify-between items-center py-2 text-sm border-b pb-4">
            <span className="text-gray-600">
              {t("amountTo", { adjustment: adjustment === "credit" ? t("credit") : t("debit") })}
            </span>
            <span
              className={`font-medium ${
                adjustment === "credit" ? "text-green-600" : "text-red-600"
              }`}
            >
              {adjustment === "credit" ? "+" : "-"}SAR{" "}
              {parseFloat(amount || 0).toFixed(2)}
            </span>
          </div>

          {/* New balance */}
          <div className="flex justify-between items-center py-4 text-sm">
            <span className="text-gray-600">{t("newBalance")}</span>
            <span className="font-medium">
              SAR{" "}
              {(adjustment === "credit"
                ? customerCredit + parseFloat(amount || 0)
                : customerCredit - parseFloat(amount || 0)
              ).toFixed(2)}
            </span>
          </div>

          {/* Expiration info */}
          {adjustment === "credit" && hasExpiration && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{t("expirationDate")}</span>
                <span className="font-medium">
                  {new Date(expirationDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 space-x-2 border-t">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            onClick={() => setIsStoreCreditSummeryModelOpen(false)}
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleReviewChanges}
            className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm ${
              adjustment === "credit"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {adjustment === "credit" ? t("credit") : t("debit")} SAR{" "}
            {parseFloat(amount || 0).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoreCreditSummeryModel