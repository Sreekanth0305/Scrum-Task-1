import React, { useState } from "react";

function UserProfileCard(props) {
  const { image, name, role, bio } = props;

  const [isFollowing, setIsFollowing] = useState(false);

  const handleToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="card">
      <img src={image} alt={name} className="profile-image" />

      <h2>{name}</h2>

      <h3>{role}</h3>

      <p>{bio}</p>

      <button onClick={handleToggle} className="follow-button">
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default UserProfileCard;