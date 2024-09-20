import axios from "axios";

const getPageId = async (ACCESS_TOKEN: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/me/accounts?access_token=${ACCESS_TOKEN}`,
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
      `${process.env.NEXT_PUBLIC_HEADER}/${PAGE_ID}?fields=instagram_business_account&access_token=${ACCESS_TOKEN}`,
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
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}?fields=name,username,profile_picture_url,followers_count&access_token=${ACCESS_TOKEN}`,
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
      `${process.env.NEXT_PUBLIC_HEADER}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&fb_exchange_token=${ACCESS_TOKEN}`,
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
  ACCESS_TOKEN: string,
) => {
  try {
    // Get monhtly impressions & reach
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=impressions,reach&period=days_28&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`,
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
  ACCESS_TOKEN: string,
) => {
  try {
    // Get last 90 days follower demographics - gender
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=gender&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`,
    );

    const followersGender =
      response.data.data[0].total_value.breakdowns[0].results;

    return followersGender;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getFollowerDemographics_Age = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string,
) => {
  try {
    // Get last 90 days follower demographics - age
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=age&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`,
    );

    const followersAge =
      response.data.data[0].total_value.breakdowns[0].results;

    const followersAgeFormated = followersAge.map((ageGroup) => {
      return {
        ageGroup: ageGroup.dimension_values[0],
        value: ageGroup.value,
      };
    });

    return followersAgeFormated;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getFollowerDemographics_TopCities = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string,
) => {
  try {
    // Get last 90 days follower demographics - city
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=city&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`,
    );

    let followersTopCities =
      response.data.data[0].total_value.breakdowns[0].results;

    // Sort cities by value in descending order and get top 5
    followersTopCities = followersTopCities
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Refactor data to fit into database
    const formatedTopCities = followersTopCities.map((city) => {
      return {
        location: city.dimension_values[0],
        value: city.value,
      };
    });

    return formatedTopCities;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getOnlineFollowers = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string,
  TIMESTAMP: string,
) => {
  try {
    // Get online followers per hour per day
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=online_followers&period=lifetime&since=${TIMESTAMP}&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`,
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
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=reached_audience_demographics&period=lifetime&timeframe=last_90_days&breakdown=gender&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`,
    );

    const reachedGender =
      response.data.data[0].total_value.breakdowns[0].results;

    return reachedGender;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Ran when data is first grabbed. Retrieves the daily data for a month ago
const getLastMonthData = async (BUSINESS_ID: string, ACCESS_TOKEN: string) => {
  try {
    const currentDate = new Date();

    // Get yesterday date value since complete day
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    // Get date one month ago
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Convert to unix time frame
    const yesterdayUnix = Math.floor(yesterday.getTime() / 1000);
    const lastMonthUnix = Math.floor(lastMonth.getTime() / 1000);

    // Get monhtly impressions & reach
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=impressions,reach&period=day&since=${lastMonthUnix}&until=${yesterdayUnix}&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`,
    );

    // Extract only the response data
    const impressionResponse = response.data.data[0].values;
    const reachResponse = response.data.data[1].values;

    // Combine impressions and reach into a consolidated object object {date, impression, reach}
    const dailyMetrics = impressionResponse.map((impression, index) => {
      const reach = reachResponse[index];
      return {
        date: impression.end_time,
        impression: impression.value,
        reach: reach.value,
      };
    });

    return dailyMetrics;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Return a object with the followers account for genders male, female, and other
const getFollowerDemographics_GenderFormatted = async (
  BUSINESS_ID: string,
  ACCESS_TOKEN: string,
) => {
  try {
    // Get last 90 days follower demographics - gender
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=gender&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`,
    );

    const followersGenderResponse =
      response.data.data[0].total_value.breakdowns[0].results;

    // Map into array of { gender : followersCount } lengh for each gender
    const followerCountByGender = followersGenderResponse.reduce(
      (acc, item) => {
        const gender = item.dimension_values[0];

        if (gender === "F") {
          acc["female"] = item.value;
        } else if (gender === "M") {
          acc["male"] = item.value;
        } else {
          acc["other"] = item.value;
        }
        return acc;
      },
      {},
    );

    return followerCountByGender;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getUserMedia = async (BUSINESS_ID: string,ACCESS_TOKEN: string, USERNAME: string) => {

  const params = "followers_count,media_count,media{media_url,caption,comments_count,like_count,timestamp}"

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}?fields=business_discovery.username(${USERNAME}){${params}}&access_token=${ACCESS_TOKEN}`
    )
    console.log("getUserMedia log: ", response.data.business_discovery.media.data)

    let likeSum = 0;
    let commentSum = 0;

    response.data.business_discovery.media.data.map((item) => {
      likeSum += Number(item.like_count);
      commentSum += Number(item.comments_count);
    })

    const media = {
      media_count: response.data.business_discovery.media_count,
      mediaData: response.data.business_discovery.media.data,
      total_like_count: likeSum,
      total_comment_count: commentSum,
    }
    return media
  } catch (error) {
    console.log(error);
  }
}

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
  getLastMonthData,
  getFollowerDemographics_GenderFormatted,
  getUserMedia
};
