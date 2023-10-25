import { useEffect, useState } from "react";

export default function Dots({ isLoading }) {
  const [loadingDots, setLoadingDots] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    setInterval(() => {
      setLoadingDots((prevDots) => (prevDots % 3) + 1);
    }, 1000);
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <span style={{ fontWeight: 600, color: "black" }} className="dots">
          {".".repeat(loadingDots)}
        </span>
      ) : (
        <></>
      )}
    </>
  );
}
