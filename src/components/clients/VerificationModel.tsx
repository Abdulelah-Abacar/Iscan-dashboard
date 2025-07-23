import { X } from "lucide-react"
import { VerifiedIcon } from "./VerifiedIcon"
import { useTranslations } from "next-intl"

function VerificationModel({ 
  handleOpenVerificationModel, 
  selectedVerification, 
  handleVerificationSelect, 
  verificationLevels, 
  handleSaveVerification 
}) {
  const t = useTranslations("VerificationModel")

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center">
      <div className="bg-gray-200 rounded-3xl space-y-8 py-4 px-2 md:px-8 text-center relative max-w-md w-11/12 md:w-full">
        <button
          onClick={handleOpenVerificationModel}
          className="absolute cursor-pointer p-1 bg-white rounded-full top-4 right-4"
        >
          <X size={12} />
        </button>
        <h1 className="text-2xl font-medium">{t("accountVerification")}</h1>
        <div className="flex justify-center items-center gap-5 py-2 px-8 bg-white rounded-lg">
          <button
            className={`cursor-pointer p-1 rounded-full ${
              selectedVerification === "none"
                ? "bg-blue-200"
                : "bg-gray-300"
            }`}
            onClick={() => handleVerificationSelect("none")}
          >
            <X size={26} />
          </button>

          {verificationLevels.slice(1).map((level) => (
            <VerifiedIcon
              key={level.id}
              fill={level.fill}
              size={46}
              stroke="white"
              className="rounded-full"
              onClick={() => handleVerificationSelect(level.id)}
              isSelected={selectedVerification === level.id}
            />
          ))}
        </div>

        {selectedVerification && (
          <p className="text-gray-700">
            {t("selected")}:{" "}
            {
              verificationLevels.find((v) => v.id === selectedVerification)
                ?.label
            }
          </p>
        )}

        <div className="flex gap-8 justify-center items-center">
          <button
            onClick={handleOpenVerificationModel}
            className="rounded-full py-2 px-5 text-white bg-gray-400 cursor-pointer"
          >
            {t("cancel")}
          </button>
          <button
            onClick={handleSaveVerification}
            className="rounded-full py-2 px-5 text-white bg-cyan-500 cursor-pointer"
            disabled={!selectedVerification}
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerificationModel