"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { History, LaptopMinimal, Plus, Smartphone, Copy, RefreshCw, Trash2, Eye, Search, X, NfcIcon } from "lucide-react";
import { useState } from "react";

export default function Activator() {
  const t = useTranslations("Activator");
  const locale = useLocale();
  
  const [activeState, setActiveState] = useState('des');
  const [showInput, setShowInput] = useState(false);
  const [username, setUsername] = useState("");
  const [historyItems, setHistoryItems] = useState([]);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({ show: false, type: '', item: null });

  const handleIssueNow = () => {
    setShowInput(true);
  };

  const handleCopy = () => {
    const fullUrl = `iscan.sa/${username}`;
    navigator.clipboard.writeText(fullUrl);
    
    // Add to history
    const newItem = {
      id: Date.now(),
      url: fullUrl,
      status: t('active'),
      timestamp: new Date().toISOString()
    };
    setHistoryItems(prev => [newItem, ...prev]);
    
    // Hide input and show button again
    setShowInput(false);
    setUsername("");
  };

  const handleRefresh = (id) => {
    const item = historyItems.find(item => item.id === id);
    setConfirmDialog({ show: true, type: 'refresh', item });
  };

  const handleDelete = (id) => {
    const item = historyItems.find(item => item.id === id);
    setConfirmDialog({ show: true, type: 'delete', item });
  };

  const confirmAction = () => {
    if (confirmDialog.type === 'refresh') {
      setHistoryItems(prev => prev.map(item => 
        item.id === confirmDialog.item.id 
          ? { ...item, status: item.status === t('active') ? t('inactive') : t('active') }
          : item
      ));
    } else if (confirmDialog.type === 'delete') {
      setHistoryItems(prev => prev.filter(item => item.id !== confirmDialog.item.id));
    }
    setConfirmDialog({ show: false, type: '', item: null });
  };

  const cancelAction = () => {
    setConfirmDialog({ show: false, type: '', item: null });
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9._-]/g, '');
    setUsername(value);
  };

  const filteredHistory = historyItems.filter(item => 
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedHistory = historyItems.slice(0, 1);

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
        <div>
          <div className="bg-white rounded-full w-fit flex gap-2 p-1.5 ml-auto">
            <button 
              onClick={() => {setActiveState("des"); setShowInput(false);}} 
              className={`p-2 cursor-pointer rounded-full ${activeState == "des" ? "bg-blue-800 text-white" : "bg-gray-200"} transition duration-300`}
              aria-label={t("desktopMode")}
            >
              <LaptopMinimal />
            </button>
            <button 
              onClick={() => {setActiveState("mobile"); setShowInput(false);}} 
              className={`p-2 cursor-pointer rounded-full ${activeState == "mobile" ? "bg-blue-800 text-white" : "bg-gray-200"} transition duration-300`}
              aria-label={t("mobileMode")}
            >
              <Smartphone />
            </button>
          </div>
        </div>
        <div className="w-full max-w-md space-y-12 mx-auto">
          {(activeState === 'des' || (activeState === 'mobile' && !showInput)) && (
            <div className="relative">
              <div className="flex justify-center items-center mb-8">
                <div className="absolute transform rotate-12 translate-x-28 translate-y-7">
                  <div className="w-72 h-44 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl shadow-lg">
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div className="flex justify-end">
                        <div className="text-orange-800 font-bold text-lg">
                          iScan
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-orange-800 text-sm">
                          <div>•••• •••• •••• 4567</div>
                          <div className="mt-1">12/26</div>
                        </div>
                        <div className="w-8 h-8 bg-orange-800 rounded opacity-20"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="w-72 h-44 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl">
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div className="flex justify-end">
                        <div className="text-white font-bold text-lg">iScan</div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-white text-sm">
                          <div>•••• •••• •••• 1234</div>
                          <div className="mt-1">12/26</div>
                        </div>
                        <div className="w-8 h-8 bg-white rounded opacity-20"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute transform -rotate-12 -translate-x-28 translate-y-7">
                  <div className="w-72 h-44 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl shadow-lg">
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div className="flex justify-end">
                        <div className="text-orange-800 font-bold text-lg">
                          iScan
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-orange-800 text-sm">
                          <div>•••• •••• •••• 4567</div>
                          <div className="mt-1">12/26</div>
                        </div>
                        <div className="w-8 h-8 bg-orange-800 rounded opacity-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center space-y-6">
            {activeState === 'des' && <h2 className="text-3xl font-light text-gray-800">{t("cardIssuance")}</h2>}

            {activeState === 'des' && (
              <>
                {!showInput ? (
                  <button 
                    onClick={handleIssueNow}
                    className="inline-flex items-center gap-2 px-8 py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                  >
                    <Plus size={20} />
                    <span className="text-lg font-medium">{t("issueNow")}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 max-w-xs mx-auto">
                    <div className="flex-1 relative">
                      <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                        <span className="text-gray-600 text-sm">iscan.sa/</span>
                        <input
                          type="text"
                          value={username}
                          onChange={handleUsernameChange}
                          className="flex-1 outline-none text-sm font-medium ml-1"
                          placeholder={t("usernamePlaceholder")}
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 shadow-sm"
                      aria-label={t("copy")}
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                )}
              </>
            )}

            {activeState === 'mobile' && (
              <>
                {!showInput ? (
                  <button 
                    onClick={handleIssueNow}
                    className="inline-flex items-center gap-2 px-8 py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                  >
                    <Plus size={20} />
                    <span className="text-lg font-medium">{t("issueNow")}</span>
                  </button>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center">
                      <NfcIcon className="-rotate-90 -mb-5" size={100} />
                      <Smartphone size={150} />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-3xl font-light">{t("tapPhone")}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 justify-center flex-1">
                <History size={20} />
                <h3 className="text-xl font-light">{t("history")}</h3>
              </div>
              {historyItems.length > 1 && (
                <button
                  onClick={() => setShowHistoryDialog(true)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <span>{t("seeAll")}</span>
                </button>
              )}
            </div>

            {historyItems.length === 0 ? (
              <div className="text-center text-gray-400">
                <p className="text-sm">{t("emptyHistory")}</p>
              </div>
            ) : (
              <div className="w-full space-y-3">
                {displayedHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">{item.url}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRefresh(item.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                        aria-label={t("refresh")}
                      >
                        <RefreshCw size={14} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                        aria-label={t("delete")}
                      >
                        <Trash2 size={14} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {showHistoryDialog && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{t("history")}</h2>
              <button
                onClick={() => setShowHistoryDialog(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                aria-label={t("close")}
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative mb-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search size={16} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredHistory.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p className="text-sm">{t("noHistoryFound")}</p>
                </div>
              ) : (
                filteredHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm font-medium text-gray-700">{item.url}</span>
                      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ml-auto mr-5 ${
                        item.status === t('active') 
                          ? 'bg-gray-100 text-green-800' 
                          : 'bg-gray-100 text-orange-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === t('active') ? 'bg-green-500' : 'bg-orange-500'
                        }`}></div>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRefresh(item.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                        aria-label={t("refresh")}
                      >
                        <RefreshCw size={14} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                        aria-label={t("delete")}
                      >
                        <Trash2 size={14} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {confirmDialog.show && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{t("confirm")}</h2>
              <button
                onClick={cancelAction}
                className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                aria-label={t("close")}
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                {confirmDialog.type === 'delete' ? (
                  t('deleteConfirmation', { username: confirmDialog.item?.url.replace('iscan.sa/', '') })
                ) : (
                  t('statusConfirmation', { 
                    action: confirmDialog.item?.status === t('active') ? t('deactivate') : t('activate'),
                    username: confirmDialog.item?.url.replace('iscan.sa/', '')
                  })
                )}
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={cancelAction}
                className="px-6 py-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                {t("cancel")}
              </button>
              <button
                onClick={confirmAction}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  confirmDialog.type === 'delete' 
                    ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                    : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                {confirmDialog.type === 'delete' ? t("delete") : t("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}