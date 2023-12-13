import React, { useState, useEffect } from "react";

import thum1 from "../assets/images/thumbai_1.png";
import thum2 from "../assets/images/thumbai_2.png";
import thum3 from "../assets/images/thumbai_3.png";

const slides = [
  {
    image: thum1,
    title: "Thu cũ đổi mới",
    text: "Trợ giá đến 5 triệu.",
  },
  {
    image: thum2,
    title: "Máy tính chơi game",
    text: "Máy tính chơi game thế hệ mới, trang bị vi xử lý thế hệ 12.",
  },
  {
    image: thum3,
    title: "Đổi điểm lấy quà",
    text: "Thi bao nhiêu điểm giảm liền bấy nhiêu.",
  },
];

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const changeSlide = () => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const slideInterval = setInterval(changeSlide, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div
      style={{
        width: "60%",
        display: "flex",
        borderRadius: "10px",
        marginTop: 10,
        marginBottom: "5px",
        color: "#eee",
        zIndex: 1,
      }}
    >
      <div style={{ width: "70%", marginRight: "8px" }}>
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          style={{ background: "#12486B", borderRadius: 20 }}
        >
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === activeSlide ? "active" : ""
                }`}
                style={{ height: "310px" }}
              >
                <img
                  src={slide.image}
                  className="d-block w-100 object-fit-cover border rounded"
                  alt={`Slide ${index + 1}`}
                />
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "30px",
                  }}
                >
                  <h5 style={{ color: "#fff" }}>{slide.title}</h5>
                  <p style={{ color: "#eee" }}>{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: "15px" }}></div>
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={index}
                className={index === activeSlide ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div style={{ width: "30%" }}>
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            style={{
              marginBottom: "5px",
              borderRadius: "10px",
              height: "105px",
            }}
            className="d-block w-100"
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
