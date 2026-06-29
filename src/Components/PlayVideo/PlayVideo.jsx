import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY } from "../../data";

const fallbackVideo = {
  id: "dQw4w9WgXcQ",
  snippet: {
    title: "Sample video title",
    channelTitle: "GreatStack",
    description: "Channel that makes learning easy",
    publishedAt: "2024-01-01T00:00:00Z",
  },
  statistics: {
    viewCount: "1525",
  },
};

export const PlayVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(fallbackVideo);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(videoUrl);
        const result = await response.json();
        if (result.items?.[0]) {
          setVideo(result.items[0]);
        } else {
          setVideo(fallbackVideo);
        }
      } catch {
        setVideo(fallbackVideo);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  const title = video?.snippet?.title || fallbackVideo.snippet.title;
  const channelTitle =
    video?.snippet?.channelTitle || fallbackVideo.snippet.channelTitle;
  const description =
    video?.snippet?.description || fallbackVideo.snippet.description;
  const views =
    video?.statistics?.viewCount || fallbackVideo.statistics.viewCount;
  const publishedAt =
    video?.snippet?.publishedAt || fallbackVideo.snippet.publishedAt;

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId || fallbackVideo.id}?autoplay=1&mute=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h3>{title}</h3>
      <div className="play-video-info">
        <p>
          {Number(views).toLocaleString()} views &bull;{" "}
          {new Date(publishedAt).toLocaleDateString()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            125
          </span>
          <span>
            <img src={dislike} alt="" />2
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="" />
        <div>
          <p>{channelTitle}</p>
          <span>1M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{description}</p>
        <hr />
        <h4>130 Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Jack Nicholson <span>1 day ago</span>
            </h3>
            <p>Komentar je ovdje napisan</p>
            <div className="comment-action">
              <img src={like} alt="" /> <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
