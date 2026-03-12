"use client";

import { useState } from "react";
import Image from "next/image";

function ImageWithSkeleton({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  wrapperClassName = "w-full h-full",
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${wrapperClassName}`}>
      {/* Skeleton Loader */}
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${skeletonClassName}`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`${className} object-contain ${!isLoaded ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}

export default ImageWithSkeleton;