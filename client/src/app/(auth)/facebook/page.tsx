"use client";

import { useState, useEffect } from 'react';
import Script from "next/script";
import { getPageId, getBusinessId, getBasicUserInfo } from '../../../services/instagramGraphAPI';
import axios from 'axios';

interface BasicUserInfo {
  name: string;
  userName: string;
  profilePicURL: string;
}

const FacebookLogin = () => {
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    // Check if FB object is defined before using it
    if (typeof window.FB !== 'undefined') {
      // Use FB object here
      window.FB.getLoginStatus(async (response: any) => {
        if (response.status === "connected") {
          // console.log(response);
          setFacebookUserAccessToken((prev) => response.authResponse.accessToken);

          console.log("Access token: " + response.authResponse.accessToken);

          // TODO: Convert short-lived access token to long-lived and insert into database
          // TODO: Remove logic from here and put it into utils folder to periodically refresh token and user data
          // TODO: Add logic to check if user is already in database before adding

          // Get page id
          const pageId = await getPageId(response.authResponse.accessToken);

          // Get business id
          const businessId = await getBusinessId(pageId, response.authResponse.accessToken);

          // Get basic user info
          const basicUserInfo = await getBasicUserInfo(businessId, response.authResponse.accessToken) as BasicUserInfo;;
          const { name, userName, profilePicURL } = basicUserInfo;

          const testCreatorID = '65de95dc2c98cba944efb3ab';

          const userPayload = {
            creatorID: testCreatorID,
            pageID: pageId,
            businessID: businessId,
            name: name,
            userName: userName,
            profilePicURL: profilePicURL
          };
          
          // Add the basic user info to the database
          const instagramUser = await axios.post('http://localhost:5000/api/instagram', userPayload);

          console.log(instagramUser);

          return;
        }

        console.log(response);

      });
    }
  }, [loginStatus]);


  // Facebook Login Handler
  const logInToFB = () => {
    if (typeof window.FB !== 'undefined') {
      window.FB.login((response: any) => {
          if (response.status === 'connected') {
            setLoginStatus(response.status);
            console.log(response);
          }
        },
        {
          // Scopes that allow us to publish content to Instagram
          scope: "public_profile,instagram_basic,business_management,instagram_manage_insights,pages_read_engagement,pages_show_list"
        }
      );
    }
  };

  // FB logout handler
  const logOutOfFB = () => {
    if (typeof window.FB !== 'undefined') {
      window.FB.logout(() => {
        console.log("You are logged out")
        setFacebookUserAccessToken("");
        setLoginStatus("");
      });
    }
  };

  return (
    <div>
      <h3>1. Log in with Facebook</h3>

      {facebookUserAccessToken ? (
        <button onClick={logOutOfFB} className="btn action-btn">
          Log out of Facebook
        </button>
      ) : (
        <button onClick={logInToFB} className="btn action-btn">
          Login with Facebook
        </button>
      )} 

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
    </div>
  );
};

export default FacebookLogin;