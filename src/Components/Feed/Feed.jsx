import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { API_KEY, value_converter } from "../../data";

export const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoListUrl);
      const result = await response.json();
      setData(result.items || []);
    };

    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item) => (
        <Link
          key={item.id}
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="card"
        >
          <img
            src={item.snippet.thumbnails?.medium?.url || thumbnail1}
            alt={item.snippet.title}
          />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics.viewCount)} views &bull;{" "}
            {item.snippet.publishedAt}
          </p>
        </Link>
      ))}
    </div>
  );
};
