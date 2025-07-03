"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnalyticsLink } from "./AnalyticsLink";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";
import { BarChart } from "./BarChart";

// Define multiple datasets with their titles
const dataCategories = [
  {
    title: "Monthly Orders",
    data: [
      { name: "Jan", value: 30 },
      { name: "Feb", value: 40 },
      { name: "Mar", value: 35 },
      { name: "Apr", value: 50 },
      { name: "May", value: 38 },
      { name: "Jun", value: 65 },
      { name: "Jul", value: 45 },
      { name: "Aug", value: 70 },
      { name: "Sep", value: 60 },
      { name: "Oct", value: 50 },
      { name: "Nov", value: 55 },
      { name: "Dec", value: 45 },
    ],
  },
  {
    title: "Monthly Profit ($K)",
    data: [
      { name: "Jan", value: 25 },
      { name: "Feb", value: 32 },
      { name: "Mar", value: 28 },
      { name: "Apr", value: 45 },
      { name: "May", value: 42 },
      { name: "Jun", value: 58 },
      { name: "Jul", value: 52 },
      { name: "Aug", value: 65 },
      { name: "Sep", value: 55 },
      { name: "Oct", value: 48 },
      { name: "Nov", value: 50 },
      { name: "Dec", value: 62 },
    ],
  },
  {
    title: "New Customers",
    data: [
      { name: "Jan", value: 45 },
      { name: "Feb", value: 38 },
      { name: "Mar", value: 42 },
      { name: "Apr", value: 36 },
      { name: "May", value: 48 },
      { name: "Jun", value: 52 },
      { name: "Jul", value: 45 },
      { name: "Aug", value: 60 },
      { name: "Sep", value: 65 },
      { name: "Oct", value: 55 },
      { name: "Nov", value: 50 },
      { name: "Dec", value: 48 },
    ],
  },
  {
    title: "Website Traffic (K)",
    data: [
      { name: "Jan", value: 68 },
      { name: "Feb", value: 72 },
      { name: "Mar", value: 65 },
      { name: "Apr", value: 70 },
      { name: "May", value: 75 },
      { name: "Jun", value: 82 },
      { name: "Jul", value: 78 },
      { name: "Aug", value: 85 },
      { name: "Sep", value: 90 },
      { name: "Oct", value: 88 },
      { name: "Nov", value: 85 },
      { name: "Dec", value: 92 },
    ],
  },
  {
    title: "Conversion Rate (%)",
    data: [
      { name: "Jan", value: 35 },
      { name: "Feb", value: 40 },
      { name: "Mar", value: 38 },
      { name: "Apr", value: 42 },
      { name: "May", value: 45 },
      { name: "Jun", value: 50 },
      { name: "Jul", value: 48 },
      { name: "Aug", value: 52 },
      { name: "Sep", value: 55 },
      { name: "Oct", value: 53 },
      { name: "Nov", value: 58 },
      { name: "Dec", value: 60 },
    ],
  },
];

export const GraphicsCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [mouseStart, setMouseStart] = useState(null);
  const [mouseEnd, setMouseEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef(null);

  // Minimum swipe distance to trigger slide change
  const minSwipeDistance = 50;

  // Function to change slide with transition
  const changeSlide = (newIndex) => {
    if (newIndex === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 250);
  };

  // Function to go to next slide
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % dataCategories.length;
    changeSlide(newIndex);
  };

  // Function to go to previous slide
  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? dataCategories.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  };

  // Reset and start timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 10000);
  };

  // Function to handle automatic rotation
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isDragging]);

  // Touch event handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse event handlers for desktop drag
  const onMouseDown = (e) => {
    setMouseEnd(null);
    setMouseStart(e.clientX);
    setIsDragging(true);
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!mouseStart || !mouseEnd || !isDragging) {
      setIsDragging(false);
      return;
    }
    
    const distance = mouseStart - mouseEnd;
    const isLeftDrag = distance > minSwipeDistance;
    const isRightDrag = distance < -minSwipeDistance;

    if (isLeftDrag) {
      nextSlide();
    } else if (isRightDrag) {
      prevSlide();
    }
    
    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  // Indicator dots to show which chart is active
  const renderIndicators = () => {
    return (
      <div className="flex justify-center mt-4 gap-2">
        {dataCategories.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              changeSlide(index);
              resetTimer();
            }}
            className={`h-2 w-2 cursor-pointer rounded-full transition-all ${
              index === currentIndex ? "bg-green-600 w-4" : "bg-gray-300"
            }`}
            aria-label={`View ${dataCategories[index].title}`}
          />
        ))}
      </div>
    );
  };

  const currentData = dataCategories[currentIndex];

  return (
    <Card className="col-span-12 lg:col-span-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title={currentData.title} />
        <AnalyticsLink />
      </div>
      <div
        className={`relative transition-opacity h-[130px] duration-250 select-none ${
          isTransitioning ? "opacity-0" : "opacity-100"
        } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute inset-0 z-30" />
        <BarChart data={currentData.data} />
      </div>
      {renderIndicators()}
    </Card>
  );
};