import React, { useEffect, useState } from "react";
import moment from "moment";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";

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

export const PlayVideo = ({ videoId }) => {
  const [video, setVideo] = useState(fallbackVideo);
  const [subscribers, setSubscribers] = useState(0);
  const [channelImage, setChannelImage] = useState(jack);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // Fetch video + channel data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(videoUrl);
        const result = await response.json();

        if (result.items?.[0]) {
          const videoData = result.items[0];
          setVideo(videoData);

          const channelId = videoData?.snippet?.channelId;
          if (channelId) {
            const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelId}&key=${API_KEY}`;
            const channelResponse = await fetch(channelUrl);
            const channelResult = await channelResponse.json();

            const channelItem = channelResult.items?.[0];
            const subscriberCount = channelItem?.statistics?.subscriberCount;
            const channelThumb =
              channelItem?.snippet?.thumbnails?.high?.url ||
              channelItem?.snippet?.thumbnails?.medium?.url ||
              channelItem?.snippet?.thumbnails?.default?.url ||
              jack;

            setSubscribers(Number(subscriberCount || 0));
            setChannelImage(channelThumb);
          } else {
            setSubscribers(0);
            setChannelImage(jack);
          }
        } else {
          setVideo(fallbackVideo);
          setSubscribers(0);
          setChannelImage(jack);
        }
      } catch {
        setVideo(fallbackVideo);
        setSubscribers(0);
        setChannelImage(jack);
      }
    };

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  // Fetch comments (do 50)
  useEffect(() => {
    const fetchComments = async () => {
      if (!videoId) return;
      setLoadingComments(true);
      try {
        const commentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=50&order=relevance&key=${API_KEY}`;
        const response = await fetch(commentsUrl);
        const result = await response.json();

        if (result.items) {
          setComments(result.items);
        } else {
          setComments([]);
        }
      } catch {
        setComments([]);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const title = video?.snippet?.title || fallbackVideo.snippet.title;
  const channelTitle =
    video?.snippet?.channelTitle || fallbackVideo.snippet.channelTitle;
  const description =
    video?.snippet?.description || fallbackVideo.snippet.description;
  const views =
    video?.statistics?.viewCount || fallbackVideo.statistics.viewCount;
  const likes =
    video?.statistics?.likeCount || fallbackVideo.statistics.likeCount || 0;
  const dislikes = video?.statistics?.dislikeCount || 0;
  const commentCount = video?.statistics?.commentCount || 0;
  const publishedAt =
    video?.snippet?.publishedAt || fallbackVideo.snippet.publishedAt;
  const shortDescription =
    description && description.length > 140
      ? `${description.slice(0, 140)}...`
      : description;

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId || fallbackVideo.id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h3>{title}</h3>
      <div className="play-video-info">
        <p>
          {value_converter(Number(views))} views &bull;{" "}
          {moment(publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {value_converter(Number(likes))}
          </span>
          <span>
            <img src={dislike} alt="" />
            {value_converter(Number(dislikes))}
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
        <img
          src={channelImage}
          alt={channelTitle}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.src = jack; // ← fallback na lokalnu sliku
          }}
        />
        <div>
          <p>{channelTitle}</p>
          <span>{value_converter(subscribers)} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{shortDescription}</p>
        <hr />
        <h4>{value_converter(Number(commentCount))} Comments</h4>

        {loadingComments ? (
          <p style={{ color: "#aaa" }}>Učitavanje komentara...</p>
        ) : comments.length > 0 ? (
          comments.map((item) => {
            const topComment = item.snippet.topLevelComment.snippet;
            const authorName = topComment.authorDisplayName;
            const authorPfp = topComment.authorProfileImageUrl || user_profile;
            const text = topComment.textDisplay;
            const likeCount = topComment.likeCount || 0;
            const publishedAtComment = topComment.publishedAt;

            return (
              <div className="comment" key={item.id}>
                <img
                  src={authorPfp}
                  alt={authorName}
                  onError={(e) => {
                    e.target.src = user_profile;
                  }}
                />
                <div>
                  <h3>
                    {authorName}{" "}
                    <span>{moment(publishedAtComment).fromNow()}</span>
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: text }} />
                  <div className="comment-action">
                    <img src={like} alt="like" />
                    <span>{value_converter(likeCount)}</span>
                    <img src={dislike} alt="dislike" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ color: "#aaa" }}>Nema dostupnih komentara.</p>
        )}
      </div>
    </div>
  );
};
