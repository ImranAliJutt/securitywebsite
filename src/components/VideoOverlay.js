import React, { useState, useEffect } from "react";
import "./VideoOverlay.css";
import video1 from "../video/service1.mp4";
import video2 from "../video/service2.mp4";
import video3 from "../video/service3.mp4";
import video4 from "../video/service4.mp4";

const videos = [
  {
    src: video1,
    text: "Swift. Mobile. Ready to <span>Respond</span>",
    icon: <i className="fa-solid fa-person-shelter"></i>,
  },
  {
    src: video2,
    text: "Eyes on What Matters, <span>24/7</span>",
  },
  {
    src: video3,
    text: "Trained. Reliable. Always on <span>Guard</span>",
  },
  {
    src: video4,
    text: "Event Safety, Handled with <span>Precision</span>",
  },
];

const VideoOverlay = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Automatically move to the next video
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearTimeout(timer); // Clear timer on cleanup
  }, [currentVideoIndex]);

  const handleCircleClick = (index) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div className="video-carousel-container">
      <div className="video-wrapper">
        <video
          className="video"
          src={videos[currentVideoIndex].src}
          autoPlay
          muted
          loop
        ></video>
        <div className="video-overlay"></div>
        <div className="video-text">
          <p
            className="main-text"
            dangerouslySetInnerHTML={{
              __html: videos[currentVideoIndex].text,
            }}
          ></p>
          <p className="sub-text">https://britguarding.co.uk/</p>
        </div>
        <div className="carousel-S">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`carousel-circle ${
                index === currentVideoIndex ? "active" : ""
              }`}
              onClick={() => handleCircleClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;
