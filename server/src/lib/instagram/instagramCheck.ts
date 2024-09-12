import {
  getPageId,
  getBusinessId,
  getBasicUserInfo,
  getLongLivedAccessToken,
  getFollowerDemographics_Age,
  getFollowerDemographics_TopCities,
  getLastMonthData,
  getFollowerDemographics_GenderFormatted,
  getUserMedia,
} from "../../services/instagramGraphAPI";
import InstagramData from "../../models/InstagramDatav2";

interface BasicUserInfo {
  name: string;
  userName: string;
  profilePicURL: string;
  followers_count: string;
}

const instagramUserCheck = async (accessToken: string, creatorId: string) => {
  try {
    // Get pageID of user
    const pageID = await getPageId(accessToken);

    // Get business id
    const businessID = await getBusinessId(pageID, accessToken);

    // Check if user exists with businessID
    const existingUser = await InstagramData.findOne({
      businessID: businessID,
    });

    if (!existingUser) {
      // Get basic user info
      const basicUserInfo = (await getBasicUserInfo(
        businessID,
        accessToken,
      )) as BasicUserInfo;
      const { name, userName, profilePicURL, followers_count } = basicUserInfo;

      // const testCreatorID = '667cd4f6436c83a8503fec68';

      const longtoken = await getLongLivedAccessToken(accessToken);

      const userPayload = {
        creatorID: creatorId,
        pageID: pageID,
        businessID: businessID,
        longLivedAccessToken: longtoken,
        name: name,
        userName: userName,
        profilePicURL: profilePicURL,
        followers_count: followers_count,
      };

      console.log("User created successfully");

      return userPayload;
    } else {
      await getInsights(businessID);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const instagramInsights = async (businessID: string, accessToken: string) => {
  try {
    const followersAge = await getFollowerDemographics_Age(
      businessID,
      accessToken,
    );
    const followersTopCities = await getFollowerDemographics_TopCities(
      businessID,
      accessToken,
    );

    const followersGender = await getFollowerDemographics_GenderFormatted(
      businessID,
      accessToken,
    );

    const dailyMetrics = await getLastMonthData(businessID, accessToken);

    return {
      followersGender,
      followersAge,
      followersTopCities,
      dailyMetrics,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getInsights = async (businessID: string) => {
  // Find the user with the given businessId
  const user = await InstagramData.findOne({ businessID: businessID });

  if (!user) {
    throw new Error("User not found");
  }

  // Get the accessToken from the user
  const { longLivedAccessToken: accessToken } = user;

  // Update basic user info
  const basicUserInfo = (await getBasicUserInfo(
    businessID,
    accessToken,
  )) as BasicUserInfo;
  const { name, userName, profilePicURL, followers_count } = basicUserInfo;

  // Update the user with the basicUserInfo
  user.name = name;
  user.userName = userName;
  user.profilePicURL = profilePicURL;

  const userInsights = await instagramInsights(businessID, accessToken);

  const userMedia = await getUserMedia(businessID, accessToken, userName);

  if (userInsights) {
    // Update the user with the insights
    user.insights = userInsights;
    user.insights.followersCount = Number(followers_count);

    user.media.media_count = Number(userMedia.media_count);
    user.media.data = userMedia.mediaData

    const updatedUser = await user.save();

    console.log("User updated with insights and basic user info");

    return updatedUser;
  } else {
    throw new Error("No insights available");
  }
};

export { instagramUserCheck, getInsights };
