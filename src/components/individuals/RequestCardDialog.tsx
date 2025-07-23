import { CheckCircle, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import React from "react";

function RequestCardDialog({
  products,
  onClose,
  onActive,
  onContinue,
  onRequest,
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-100 rounded-2xl p-6 space-y-6 max-w-5xl w-full max-h-[95vh] overflow-y-auto border-2 border-black no-scrollbar"
      >
        <div>
          <button
            onClick={onClose}
            className="bg-white p-1 block ml-auto rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={22} />
          </button>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-4xl p-6 space-y-4"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center">
                <Image
                  alt="card"
                  src={"/IscanCard.png"}
                  width={270}
                  height={150}
                  className="rounded shadow-md"
                />
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
                    <div className="w-5 h-5 bg-gray-100 flex items-center justify-center rounded-full">
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Request Button */}
              <div className="flex justify-center items-center">
                <button
                  onClick={() => onRequest(product.id)}
                  className="bg-gray-100 rounded-full py-1 px-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  <Plus size={16} className="inline mr-2" />
                  Request Card
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div>
          <div className="flex justify-center">
            <button
              onClick={onContinue}
              className="bg-white w-[150px] rounded-full py-1 px-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium"
            >
              Continue
            </button>
          </div>
        </div>
        <button
          onClick={onActive}
          className="absolute bottom-6 right-6 bg-white p-3 rounded-full text-black hover:text-gray-600 transition-colors"
        >
          <ShoppingCart size={28} />
          <span className="inline-block w-5 h-5 rounded-full bg-red-500 text-white text-sm absolute -top-1.5 -right-1">
            6
          </span>
        </button>
      </div>
    </div>
  );
}

export default RequestCardDialog;
