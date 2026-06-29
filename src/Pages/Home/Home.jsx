import React, { useState } from "react";
import "./Home.css";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { Feed } from "../../Components/Feed/Feed";

export const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);
  return (
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <div className="feed">
          <Feed category={category} />
        </div>
      </div>
    </>
  );
};
