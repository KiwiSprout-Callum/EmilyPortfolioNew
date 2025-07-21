import React from "react";

interface Props {
  text?: string;
  href?: string | null;
  color?: string;
  bg?: string;
  clickColor?: string;
  isFullWidth?: boolean;
  noIcon?: boolean;
  isHref?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  text = "Click Me",
  href = null,
  color = "#141414",
  bg = "#E4FF35",
  clickColor = "#CAE423",
  isFullWidth = false,
  noIcon = false,
  isHref = false,
  className = "",
  onClick = () => {},
}: Props) {
  const content = (
    <>
      {text}
      {!noIcon && (
        <div className="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_57_2452)">
              <path
                d="M15.8402 1.39878V12.125C15.8402 13.0778 14.8088 13.6732 13.9837 13.1969C13.6008 12.9758 13.3649 12.5672 13.3649 12.125V4.38975L2.27664 15.4759C1.60178 16.1508 0.449447 15.842 0.202428 14.9202C0.0877906 14.4923 0.210109 14.0358 0.523309 13.7226L11.6116 2.63642H3.8763C2.92355 2.63642 2.3281 1.60505 2.80447 0.779952C3.02555 0.397027 3.43413 0.161133 3.8763 0.161133H14.6025C15.2861 0.161133 15.8402 0.715245 15.8402 1.39878Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_57_2452">
                <rect width="16" height="16" fill="currentColor" />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
    </>
  );

  const classes = `btn rounded-[32px] btn-text leading-none w-full flex gap-2.5 items-center ${className}`;

  const style: React.CSSProperties = {
    ["--color" as any]: color,
    ["--bg" as any]: bg,
    ["--clickColor" as any]: clickColor,
    width: isFullWidth ? "100%" : "fit-content",
  };

  return isHref && href ? (
    <a href={href} className={classes} style={style}>
      {content}
    </a>
  ) : (
    <div
      className={classes}
      style={style}
      onClick={() => {
        onClick();
      }}
    >
      {content}
    </div>
  );
}
