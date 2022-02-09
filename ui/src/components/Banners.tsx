import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";

function Banners() {
  const [banners, setBanners] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { fetchData, loading, error } = useHttp();

  const bannersHandler = (data: any) => {
    setBanners(data);
  };

  useEffect(() => {
    const reqConfig = {
      keyword: "banners",
    };
    fetchData(reqConfig, bannersHandler);
    return () => {
      setBanners([]);
    };
  }, [fetchData]);

  const CarouselButton = banners.map((item: any, index: number) => {
    return (
      <button
        type="button"
        data-bs-target="#carouselBanners"
        key={index}
        data-bs-slide-to={index}
        className={activeIndex === index ? "active" : ""}
        aria-current={activeIndex === index ? "true" : "false"}
        aria-label={`Banner ${index + 1}`}
        onClick={() => setActiveIndex(index)}
      ></button>
    );
  });

  const CarouselItem = banners.map((item: any, index: number) => {
    return (
      <div
        className={`carousel-item ${activeIndex === index ? "active" : ""}`}
        key={item.id}
      >
        <img
          src={item.bannerImageUrl}
          className="d-block w-100"
          alt={item.bannerImageAlt}
        />
      </div>
    );
  });

  return (
    <>
      {!loading && !error && (
        <div
          id="corouselBanners"
          className="carousel slide carousel-dark"
          data-bs-ride="carousel"
          data-bs-touch="true"
        >
          <div className="carousel-indicators">{CarouselButton}</div>
          <div className="carousel-inner">{CarouselItem}</div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselBanners"
            data-bs-slide="prev"
            onClick={() =>
              setActiveIndex((curInd: number) => {
                if (curInd === 0) return banners.length - 1;
                else return curInd - 1;
              })
            }
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselBanners"
            data-bs-slide="next"
            onClick={() =>
              setActiveIndex((curInd: number) => {
                if (curInd < banners.length - 1) return curInd + 1;
                else return 0;
              })
            }
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      )}
    </>
  );
}

export default Banners;
