import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import AdsList from "../components/AdsList";

const HomePage = () => {
  const [ads, setAds] = useState([]); // NOTE empty array means that the state - aka ads is an array.

  useEffect(() => {
    // WILL GET EXECUTED ONCE AFTER THE PAGE REFRESH (AKA AFTER HomePage components mounts.)
    const fetchAds = async () => {
      const response = await fetch("http://localhost:5000/api/ads"); // NOTE : fetches all the ads in the system.
      const data = await response.json();
      setAds(data); // NOTE: update the state of ads (which is an array of ads, react behind the sences will replace the entire ads array with this newly fetched array.)
    };

    fetchAds(); /// NOTE: calling the function defined above.

    const socket = io("http://localhost:5000"); // NOTE: connects the backend websocket server.

    /* NOTE: socket.on(event Name To Listen To, callback func to execute once the event emitted in the backend)
             01) it listens to backend event, name adCreated, and will commit a callback function each time the adCreated event is being emitted in the back end.
             02) our callback function also accept parameter from the server - called newAd.
                 01) each time ad is being created the backend is gonna fire an emitt called AdCreated, and pass a parameter along with it which contains the newly created ad.
             03) the callback function will execute and call setAds() to update the state of our ads with the newly created ad. 
    */

    socket.on("adCreated", (newAd) => {
      console.log("New ad received:", newAd);
      setAds((prevAds) => [newAd, ...prevAds]); // NOTE: defined a callback arrow function inside setAds. which accepts as parameter the currect state of Ads (when i pass a callback function to setAds react automatically provides the current value of the state (ads) as an argument to the callback function) amd it returns an array of the new state, its just js syntax of .. called array spreading.
    });

    return () => socket.disconnect(); // return statement means Cleanup function - this function will runs when the component is unmounted, here will disconnect from the socket which listens to events.
  }, []);

  return (
    <div>
      <h1>All Ads</h1>
      <AdsList ads={ads} />
    </div>
  );
};

export default HomePage;
