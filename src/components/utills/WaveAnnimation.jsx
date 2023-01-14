import React from "react";

const WaveAnnimation = (props) => {
  return (
    <div className={"w-full " + props.AnnimationHeight}>
      {/* Layer One */}

      {/* Second Layer */}
      <svg className="waveTwo absolute z-0 w-full" viewBox="0 0 390 285.224">
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#3170B5" />
          </linearGradient>
        </defs>
        <path
          id="LayerTwo"
          data-name="Path 5286"
          d="M0-6.6s114.041-37.205,207.458,0S390-6.6,390-6.6V262.086H0Z"
          transform="translate(0 23.137)"
          opacity="0.2"
          fill="url(#linear-gradient)"
        />
      </svg>

      {/* Third Layer */}
      <svg className="waveThree absolute z-0 w-full" viewBox="0 0 390 285.224">
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#3170B5" />
          </linearGradient>
        </defs>
        <path
          id="LayerThree"
          data-name="Path 5286"
          d="M0-6.6s114.041-37.205,207.458,0S390-6.6,390-6.6V262.086H0Z"
          transform="translate(0 23.137)"
          opacity="0.2"
          fill="url(#linear-gradient)"
        />
      </svg>
    </div>
  );
};

export default WaveAnnimation;
