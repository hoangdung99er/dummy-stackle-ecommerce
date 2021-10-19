import React from "react";

export default function useReponsiveFontSize() {
  const getFontSize = () => {
    window.innerWidth < 450 ? "16px" : "18px";
  };
  const [fontSize, setFontSize] = React.useState(getFontSize);

  React.useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });
  return fontSize;
}
