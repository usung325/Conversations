import React, { useRef, useEffect, useState } from "react";

export default function VideoContent({ vidRef }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      setIsMute(!isMute);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  console.log(vidRef);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }

    // containerRef.current
    // containerRef.current.scrollIntoView({
    //     top: 0,
    //     behavior: 'instant',
    // });
  }, [vidRef]);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh)] flex items-center justify-center pointer-events-none"
    >
      <div className="w-[100%] video-wrapper">
        <video
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          // onClick={togglePlayPause}
          ref={videoRef}
          width="300"
          height="auto"
          autoPlay
          muted
          className="pointer-events-auto"
        >
          <source src={`/images/${vidRef}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* <div className="flex justify-between w-full pt-2">
        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex pointer-events-auto"
        >
          {isPlaying ? "pause" : "play"}
        </button>
        <button
          onClick={toggleMute}
          aria-label={isMute ? "Pause" : "Play"}
          className="flex pointer-events-auto"
        >
          {isMute ? "mute" : "unmute"}
        </button>
      </div> */}
    </div>
  );
}
