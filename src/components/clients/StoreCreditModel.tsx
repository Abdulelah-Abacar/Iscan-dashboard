import { X } from "lucide-react";

function StoreCreditModel({ handleOpenStoreCreditModel, handleOpenStoreCreditSummeryModel, adjustment, setAdjustment, hasExpiration, setHasExpiration, amount, setAmount, customerCredit, expirationDate, setExpirationDate }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-40">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Edit balance</h3>
              <button
                onClick={handleOpenStoreCreditModel}
                className="text-gray-400 hover:text-gray-500 cursor-pointer"
              >
                <X size={24}/>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Adjustment</p>
                <div className="flex">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-blue-600"
                      checked={adjustment === "credit"}
                      onChange={() => setAdjustment("credit")}
                    />
                    <span className="ml-2">Credit</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-blue-600"
                      checked={adjustment === "debit"}
                      onChange={() => {
                        setAdjustment("debit");
                        setHasExpiration(false); // Reset expiration when switching to debit
                      }}
                    />
                    <span className="ml-2">Debit</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <div className="w-1/2 pr-2">
                    <p className="text-gray-700 mb-2">Currency</p>
                    <div className="relative">
                      <input
                        type="text"
                        value="Saudi Riyal (SAR)"
                        className="border border-gray-300 rounded-md px-4 py-2 pl-10 w-full"
                        readOnly
                        disabled
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2 pl-2">
                    <p className="text-gray-700 mb-2">Amount</p>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-l-md px-4 py-2 pl-16 w-full"
                          placeholder="0.00 SAR"
                          value={amount}
                          onChange={(e) => {
                            // Only allow numbers and decimal point
                            const value = e.target.value;
                            if (/^[0-9]*\.?[0-9]*$/.test(value)) {
                              setAmount(value);
                            }
                          }}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">+ SAR</span>
                        </div>
                      </div>
                      <div className="bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-3 py-2 text-gray-700">
                        SAR
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  Current balance is SAR {customerCredit.toFixed(2)}
                </div>
              </div>

              {/* Expiration date section - only show for credit */}
              {adjustment === "credit" && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">Expiration date</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Countries have different laws for store credit expiration
                    dates. Check the laws for your country before changing this
                    date.
                  </p>

                  <div className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        checked={!hasExpiration}
                        onChange={() => setHasExpiration(false)}
                      />
                      <span className="ml-2">No expiration date</span>
                    </label>
                  </div>

                  <div className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        checked={hasExpiration}
                        onChange={() => setHasExpiration(true)}
                      />
                      <span className="ml-2">Set expiration date</span>
                    </label>
                  </div>

                  {/* Date picker that appears when "Set expiration date" is selected */}
                  {hasExpiration && (
                    <div className="mt-3 ml-6">
                      <div className="flex flex-col space-y-2">
                        <label
                          htmlFor="expiration-date"
                          className="text-sm text-gray-600"
                        >
                          Select expiration date
                        </label>
                        <div className="relative w-full">
                          <input
                            id="expiration-date"
                            type="date"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]} // Set min date to today
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Credit will expire at 11:59 PM on the selected date
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md mr-2 hover:bg-gray-200"
                onClick={handleOpenStoreCreditModel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                onClick={() => {
                  handleOpenStoreCreditSummeryModel();
                  handleOpenStoreCreditModel();
                }}
              >
                Review changes
              </button>
            </div>
          </div>
        </div>
  )
}

export default StoreCreditModel