import { X } from "lucide-react"
import { useTranslations } from "next-intl"

function StoreCreditBalanceModel({ 
  handleOpenStoreCreditBalanceModel, 
  activeTab, 
  setActiveTab, 
  transactions, 
  handleOpenStoreCreditModel 
}) {
  const t = useTranslations("StoreCreditBalanceModel")
  const customerName = "OAM SDD" // This would typically come from props or context

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium">
              {t("storeCreditFor", { customerName })}
            </span>
          </div>
          <button
            onClick={handleOpenStoreCreditBalanceModel}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Balance Summary */}
        <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50">
          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">{t("balance")}</div>
            <div className="font-medium text-lg">SAR 0.00</div>
          </div>
          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-1">
              {t("expirableAmounts")}
            </div>
            <div className="font-medium text-lg">SAR 0.00</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-6">
          <button
            className={`py-3 px-4 text-sm font-medium ${
              activeTab === "allTransactions"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("allTransactions")}
          >
            {t("allTransactions")}
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium ${
              activeTab === "expirableAmounts"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("expirableAmounts")}
          >
            {t("expirableAmounts")}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <span>{t("date")}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  {t("event")}
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  {t("source")}
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  {t("expired")}
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  {t("debit")}
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  {t("credit")}
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                  {t("balanceCol")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.event}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.source}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900"></td>
                  <td className="py-3 px-4 text-sm text-red-600">
                    {transaction.debit}
                  </td>
                  <td className="py-3 px-4 text-sm text-green-600">
                    {transaction.credit}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {transaction.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-center text-sm text-gray-500">
          <span>{t("learnMore")} </span>
          <a href="#" className="text-blue-600 hover:underline">
            {t("storeCreditLink")}
          </a>
        </div>

        {/* Action Button */}
        <div className="p-4 border-t flex justify-end">
          <button
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium"
            onClick={handleOpenStoreCreditModel}
          >
            {t("editBalance")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoreCreditBalanceModel