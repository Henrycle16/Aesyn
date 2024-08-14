"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Instagram from "../svgs/Instagram";
import { getInstagramDataById } from "@/actions/InstagramApi";

const InstagramTile = () => {
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isSocialLinked, setIsSocialLinked] = useState(false);
  

  const creatorId = useAppSelector(
    (state) => state.profileDataReducer.value.creatorId
  );

  const getIGData = async (creatorId: string) => {
    try {
      const response = await getInstagramDataById(creatorId);
      if (response.data) setIsSocialLinked(true);

    } catch (error) {
      console.error(error);
    }
  }

  const sendAccessTokenToBackend = async (accessToken: String) => {
    try {
      if (!creatorId) {
        return;
      }
      const response = await axios.post(
        `http://localhost:5000/api/instagram/check/${creatorId}`,
        { accessToken }
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Facebook Login Handler
  const logInToFB = () => {
    if (typeof window.FB !== "undefined") {
      window.FB.login(
        (response: any) => {
          if (response.status === "connected") {
            setLoginStatus(response.status);
            console.log(response);
          }
        },
        {
          // Scopes that allow us to publish content to Instagram
          scope:
            "public_profile,instagram_basic,business_management,instagram_manage_insights,pages_read_engagement,pages_show_list",
        }
      );
    }
  };
  // FB logout handler
  const logOutOfFB = () => {
    if (typeof window.FB !== "undefined") {
      window.FB.logout(() => {
        console.log("You are logged out");
        setFacebookUserAccessToken("");
        setLoginStatus("");
      });
    }
  };

  useEffect(() => { 
    if (isSocialLinked || !creatorId) return;
    getIGData(creatorId);
  }, [creatorId, isSocialLinked])

  useEffect(() => {
    // Check if FB object is defined before using it
    if (typeof window.FB !== "undefined") {
      // Use FB object here
      window.FB.getLoginStatus(async (response: any) => {
        if (response.status === "connected") {
          // console.log(response);
          setFacebookUserAccessToken(response.authResponse.accessToken);
          console.log("Access token: " + response.authResponse.accessToken);
          // Send accessToken to backend
          sendAccessTokenToBackend(response.authResponse.accessToken);
          setIsSocialLinked(true);
          return;
        }
        console.log(response);
      });
    }
    
  }, [loginStatus]);

  return (
    <>
      <button
        type="button" 
        className={"rounded-[15px] py-4 px-7" + (isSocialLinked ? " border-2 border-[#1D8133]" : " border border-gray-300")}
        onClick={logInToFB}
        disabled={isSocialLinked}
      >
        <div className={"flex items-center text-[#184465] font-semibold " + (isSocialLinked ? "gap-7" : "gap-4")}>
          <Instagram />
          <p>Instagram</p>
          {isSocialLinked && (<CheckCircleOutlinedIcon sx={{color: "#1D8133", fontSize: "30px"}}/>)}
        </div>
      </button>

      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          window.fbAsyncInit = function () {
            window.FB.init({
              appId: "819261616750385",
              cookies: true,
              xfbml: true,
              version: "v19.0",
            });
          };
        }}
      />
    </>
  );
};

export default InstagramTile;
