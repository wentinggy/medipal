import React, { useEffect, useState } from "react";

interface DotsProps {
  isLoading: boolean;
}

const Dots: React.FC<DotsProps> = ({ isLoading }) => {
  const [loadingDots, setLoadingDots] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isLoading) {
      return () => clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      setLoadingDots((prevDots) => (prevDots % 3) + 1);
    }, 500);

    return () => clearInterval(intervalId);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <span style={{ fontWeight: 600 }} className="dots">
          {".".repeat(loadingDots)}
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dots;
