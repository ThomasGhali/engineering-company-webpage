'use client';

export default function AnimatedLogo() {
  return (
    <div className="w-[300px] h-[300px]">
      {/* The object tag allows the internal script to run */}
      <object
        type="image/svg+xml"
        data="/animated-logo.svg"
        className="w-full h-full"
        aria-label="Qualtec Animated Logo"
      >
        {/* Fallback if SVGs fail */}
        <img src="/latest-logo2.png" alt="Qualtec Logo" />
      </object>
    </div>
  );
}