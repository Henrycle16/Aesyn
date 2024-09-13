"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInsights = exports.instagramUserCheck = void 0;
const instagramGraphAPI_1 = require("../../services/instagramGraphAPI");
//import instagram_data from '../../models/InstagramData';
const InstagramData_1 = __importDefault(require("../../models/InstagramData"));
const instagramUserCheck = async (accessToken, creatorId) => {
    try {
        // Get pageID of user
        const pageID = await (0, instagramGraphAPI_1.getPageId)(accessToken);
        // Get business id
        const businessID = await (0, instagramGraphAPI_1.getBusinessId)(pageID, accessToken);
        // Check if user exists with businessID
        const existingUser = await InstagramData_1.default.findOne({ businessID: businessID });
        if (!existingUser) {
            // Get basic user info
            const basicUserInfo = await (0, instagramGraphAPI_1.getBasicUserInfo)(businessID, accessToken);
            const { name, userName, profilePicURL, followers_count } = basicUserInfo;
            // const testCreatorID = '667cd4f6436c83a8503fec68';
            const longtoken = await (0, instagramGraphAPI_1.getLongLivedAccessToken)(accessToken);
            const userPayload = {
                creatorID: creatorId,
                pageID: pageID,
                businessID: businessID,
                longLivedAccessToken: longtoken,
                name: name,
                userName: userName,
                profilePicURL: profilePicURL,
                followers_count: followers_count
            };
            console.log('User created successfully');
            return userPayload;
        }
        else {
            await getInsights(businessID);
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.instagramUserCheck = instagramUserCheck;
const instagramInsights = async (businessID, accessToken) => {
    try {
        const monthylyImpressionsAndReach = await (0, instagramGraphAPI_1.getMonthlyUserImpressionsAndReach)(businessID, accessToken);
        const followersGender = await (0, instagramGraphAPI_1.getFollowerDemographics_Gender)(businessID, accessToken);
        const followersAge = await (0, instagramGraphAPI_1.getFollowerDemographics_Age)(businessID, accessToken);
        const followersTopCities = await (0, instagramGraphAPI_1.getFollowerDemographics_TopCities)(businessID, accessToken);
        return { monthylyImpressionsAndReach, followersGender, followersAge, followersTopCities };
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
const getInsights = async (businessID) => {
    // Find the user with the given businessId
    const user = await InstagramData_1.default.findOne({ businessID: businessID });
    if (!user) {
        throw new Error('User not found');
    }
    // Get the accessToken from the user
    const { longLivedAccessToken: accessToken } = user;
    // Update basic user info
    const basicUserInfo = await (0, instagramGraphAPI_1.getBasicUserInfo)(businessID, accessToken);
    const { name, userName, profilePicURL, followers_count } = basicUserInfo;
    // Update the user with the basicUserInfo
    user.name = name;
    user.userName = userName;
    user.profilePicURL = profilePicURL;
    user.followers_count = followers_count;
    const userInsights = await instagramInsights(businessID, accessToken);
    if (userInsights) {
        // Update the user with the insights
        user.insights = userInsights;
        const updatedUser = await user.save();
        console.log('User updated with insights and basic user info');
        return updatedUser;
    }
    else {
        throw new Error('No insights available');
    }
};
exports.getInsights = getInsights;
//# sourceMappingURL=instagramCheck.js.map