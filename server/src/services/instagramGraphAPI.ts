import axios from "axios";

const getPageId = async (ACCESS_TOKEN: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/me/accounts?access_token=${ACCESS_TOKEN}`
    );

    const pageId = response.data.data[0].id;

    return pageId;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getBusinessId = async (PAGE_ID: string, ACCESS_TOKEN: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${PAGE_ID}?fields=instagram_business_account&access_token=${ACCESS_TOKEN}`
    );

    const businessId = response.data.instagram_business_account.id;

    return businessId;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getBasicUserInfo = async (BUSINESS_ID: string, ACCESS_TOKEN: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}?fields=name,username,profile_picture_url,followers_count&access_token=${ACCESS_TOKEN}`
    );

    const name = response.data.name;
    const userName = response.data.username;
    const profilePicURL = response.data.profile_picture_url;
    const followers_count = response.data.followers_count;

    return { name, userName, profilePicURL, followers_count };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getLongLivedAccessToken = async (ACCESS_TOKEN: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&fb_exchange_token=${ACCESS_TOKEN}`
    );
    const longLivedAccessToken = response.data.access_token;

    return longLivedAccessToken;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getMonthlyUserImpressionsAndReach = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string
) => {
  try {
    // Get monhtly impressions & reach
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=impressions,reach&period=days_28&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`
    );

    const impressions = response.data.data[0].values;
    const reach = response.data.data[1].values;

    return { impressions, reach };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getFollowerDemographics_Gender = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string
) => {
  try {
    // Get last 90 days follower demographics - gender
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=gender&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`
    );

    const followersGender = response.data.data[0].total_value.breakdowns[0].results;

    return followersGender;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getFollowerDemographics_Age = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string
) => {
  try {
    // Get last 90 days follower demographics - age
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=age&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`
    );

    const followersAge = response.data.data[0].total_value.breakdowns[0].results;

    return followersAge;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getFollowerDemographics_TopCities = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string
) => {
  try {
    // Get last 90 days follower demographics - city
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=city&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`
    );

    let followersTopCities = response.data.data[0].total_value.breakdowns[0].results;

    // Sort cities by value in descending order and get top 5
    followersTopCities = followersTopCities.sort((a, b) => b.value - a.value).slice(0, 5);

    return followersTopCities;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getOnlineFollowers = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string,
  TIMESTAMP: string
) => {
  try {
    // Get online followers per hour per day
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=online_followers&period=lifetime&since=${TIMESTAMP}&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`
    );

    const onlineFollowers = response.data.data[0].values;

    return onlineFollowers;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getReachedDemographic_Gender = async (
    BUSINESS_ID: string,
    ACCESS_TOKEN: string,
  ) => {
    try {
      // Get reached audience demographics last 90 days - gender
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=reached_audience_demographics&period=lifetime&timeframe=last_90_days&breakdown=gender&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`
      );
  
      const reachedGender = response.data.data[0].total_value.breakdowns[0].results;
  
      return reachedGender;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getReachedDemographic_Age = async (
    BUSINESS_ID: string,
    ACCESS_TOKEN: string,
  ) => {
    try {
      // Get reached audience demographics last 90 days - age
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=reached_audience_demographics&period=lifetime&timeframe=last_90_days&breakdown=age&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`
      );
  
      const reachedAge = response.data.data[0].total_value.breakdowns[0].results;
  
      return reachedAge;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getReachedDemographic_TopCities = async (
    BUSINESS_ID: string,
    ACCESS_TOKEN: string,
  ) => {
    try {
      // Get reached audience demographics last 90 days - age
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=reached_audience_demographics&period=lifetime&timeframe=last_90_days&breakdown=city&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`
      );
  
      let reachedTopCities = response.data.data[0].total_value.breakdowns[0].results;

    // Sort cities by value in descending order and get top 5
    reachedTopCities = reachedTopCities.sort((a, b) => b.value - a.value).slice(0, 5);

    return reachedTopCities;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export {
  getPageId,
  getBusinessId,
  getBasicUserInfo,
  getLongLivedAccessToken,
  getMonthlyUserImpressionsAndReach,
  getFollowerDemographics_Gender,
  getFollowerDemographics_Age,
  getFollowerDemographics_TopCities,
  getOnlineFollowers,
  getReachedDemographic_Gender,
  getReachedDemographic_Age,
  getReachedDemographic_TopCities,
};
