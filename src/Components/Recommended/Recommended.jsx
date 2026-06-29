import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Recommended.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { API_BASE, API_KEY } from "../../data";
import { value_converter } from "../../data";

export const Recommended = ({ categoryId, currentVideoId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        let url = `${API_BASE}/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=8&regionCode=US&key=${API_KEY}`;

        if (categoryId) {
          url += `&videoCategoryId=${categoryId}`;
        }

        const response = await fetch(url);
        const result = await response.json();
        const items = (result.items || []).filter(
          (item) => item.id !== currentVideoId,
        );
        setVideos(items.slice(0, 8));
      } catch {
        setVideos([]);
      }
    };

    fetchRecommended();
  }, [categoryId, currentVideoId]);

  return (
    <div className="recommended">
      {videos.map((video) => {
        const videoId = video.id;
        const thumb =
          video.snippet?.thumbnails?.high?.url ||
          video.snippet?.thumbnails?.medium?.url ||
          video.snippet?.thumbnails?.default?.url ||
          thumbnail1;
        const title = video.snippet?.title || "Recommended video";
        const channelTitle = video.snippet?.channelTitle || "YouTube";

        return (
          <Link
            key={videoId}
            to={`/video/${video.snippet?.categoryId || categoryId || "0"}/${videoId}`}
            className="side-video-list"
          >
            <img
              src={thumb}
              alt={title}
              onError={(event) => {
                event.target.onerror = null;
                event.target.src = thumbnail1;
              }}
              loading="lazy"
            />
            <div className="vid-info">
              <h4>{title}</h4>
              <p>{channelTitle}</p>
              <p>
                {value_converter(Number(video.statistics?.viewCount || 0))}{" "}
                views
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
