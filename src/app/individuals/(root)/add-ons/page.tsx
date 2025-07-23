"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AddOns() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Contact+",
      price: 49,
      rating: 4.9,
      reviews: 1264,
      description:
        "The quiet river danced under the silver moonlight, while forgotten whispers echoed through the timeless valley.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Contact+",
      price: 59,
      rating: 4.8,
      reviews: 892,
      description:
        "The quiet river danced under the silver moonlight, while forgotten whispers echoed through the timeless valley.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Contact+",
      price: 39,
      rating: 4.9,
      reviews: 1567,
      description:
        "The quiet river danced under the silver moonlight, while forgotten whispers echoed through the timeless valley.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Contact+",
      price: 69,
      rating: 4.9,
      reviews: 743,
      description:
        "The quiet river danced under the silver moonlight, while forgotten whispers echoed through the timeless valley.",
      image:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 5,
      name: "Contact+",
      price: 45,
      rating: 4.8,
      reviews: 1123,
      description:
        "The quiet river danced under the silver moonlight, while forgotten whispers echoed through the timeless valley.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 6,
      name: "Contact+",
      price: 55,
      rating: 4.9,
      reviews: 2341,
      description:
        "The quiet river danced under the silver moonlight, while forgotten whispers echoed through the timeless valley.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center",
    },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <div className="flex items-center relative px-4 md:px-0">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className={`hidden lg:block absolute -left-13 top-5`}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">
          Add Ons
        </h1>
      </div>
      <section className="bg-gray-200 p-3 md:p-5 rounded-2xl md:rounded-4xl mt-5 w-full max-w-full overflow-hidden space-y-6">
        {/* Header */}
        <div className="flex justify-end items-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white rounded-full p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Eye-catching Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 py-16 rounded-4xl">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-16 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-75"></div>
            <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-150"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles
                className="text-yellow-300 mr-2 animate-spin"
                size={32}
              />
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Premium Products
              </h2>
              <Sparkles
                className="text-yellow-300 ml-2 animate-spin"
                size={32}
              />
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              Discover our carefully curated collection of exceptional items
            </p>
            <div className="flex items-center justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Explore Collection
                <ArrowRight className="inline ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group p-4"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 rounded-xl object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.name}
                  </h3>
                  {/* <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span> */}
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {product.description}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="w-3/5 flex mx-auto items-center justify-center bg-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-0 z-50 ${isCartOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isCartOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setIsCartOpen(false)}
        ></div>

        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">
                Shopping Cart
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingCart size={64} className="mb-4 opacity-50" />
                  <p className="text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-blue-600 font-bold">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-200 rounded-full"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold text-gray-800 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-200 rounded-full"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-800">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${getTotalPrice()}
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
