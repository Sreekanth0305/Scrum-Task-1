import React from "react";
import UserProfileCard from "./UserProfileCard";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <UserProfileCard
        image="https://media.licdn.com/dms/image/v2/D5612AQFfhTEictqBHA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721174916441?e=2147483647&v=beta&t=IqnGNJxS4J-yaL4rgLBlx-cbNAbFwpEMCRvkkLXsR48"
        name="Sreekanth"
        role="Frontend Developer"
        bio="Passionate React developer who loves building modern UI applications."
      />
    </div>
  );
}
