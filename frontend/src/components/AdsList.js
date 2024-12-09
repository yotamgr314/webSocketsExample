import React from "react";

const AdsList = ({ ads }) => {
  return (
    <ul>
      {ads.map((ad) => (
        <li key={ad._id}>
          <h3>{ad.title}</h3>
          <p>{ad.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default AdsList;
