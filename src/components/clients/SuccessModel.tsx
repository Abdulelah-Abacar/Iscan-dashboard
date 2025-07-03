import { CheckCircle2Icon } from "lucide-react"

function SuccessModel({handleCloseSuccessModel}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-gray-200 rounded-3xl space-y-8 py-4 px-2 md:px-8 text-center relative max-w-md w-11/12 md:w-full">
            <div>
              <CheckCircle2Icon
                fill="green"
                stroke="#e5e7eb"
                size={150}
                className="mx-auto"
              />
            </div>
            <h1 className="text-2xl">Authentication status updated</h1>

            <div className="flex gap-8 justify-center items-center">
              <button
                onClick={handleCloseSuccessModel}
                className="rounded-md w-32 py-2 px-5 text-white bg-blue-500 cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
  )
}

export default SuccessModel