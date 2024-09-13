"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReachedDemographic_TopCities = exports.getReachedDemographic_Age = exports.getReachedDemographic_Gender = exports.getOnlineFollowers = exports.getFollowerDemographics_TopCities = exports.getFollowerDemographics_Age = exports.getFollowerDemographics_Gender = exports.getMonthlyUserImpressionsAndReach = exports.getLongLivedAccessToken = exports.getBasicUserInfo = exports.getBusinessId = exports.getPageId = void 0;
const axios_1 = __importDefault(require("axios"));
const getPageId = async (ACCESS_TOKEN) => {
    try {
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/me/accounts?access_token=${ACCESS_TOKEN}`);
        const pageId = response.data.data[0].id;
        return pageId;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getPageId = getPageId;
const getBusinessId = async (PAGE_ID, ACCESS_TOKEN) => {
    try {
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${PAGE_ID}?fields=instagram_business_account&access_token=${ACCESS_TOKEN}`);
        const businessId = response.data.instagram_business_account.id;
        return businessId;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getBusinessId = getBusinessId;
const getBasicUserInfo = async (BUSINESS_ID, ACCESS_TOKEN) => {
    try {
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}?fields=name,username,profile_picture_url,followers_count&access_token=${ACCESS_TOKEN}`);
        const name = response.data.name;
        const userName = response.data.username;
        const profilePicURL = response.data.profile_picture_url;
        const followers_count = response.data.followers_count;
        return { name, userName, profilePicURL, followers_count };
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getBasicUserInfo = getBasicUserInfo;
const getLongLivedAccessToken = async (ACCESS_TOKEN) => {
    try {
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&fb_exchange_token=${ACCESS_TOKEN}`);
        const longLivedAccessToken = response.data.access_token;
        return longLivedAccessToken;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getLongLivedAccessToken = getLongLivedAccessToken;
const getMonthlyUserImpressionsAndReach = async (BUSINESS_ID, ACCESS_TOKEN) => {
    try {
        // Get monhtly impressions & reach
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=impressions,reach&period=days_28&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`);
        const impressions = response.data.data[0].values;
        const reach = response.data.data[1].values;
        return { impressions, reach };
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getMonthlyUserImpressionsAndReach = getMonthlyUserImpressionsAndReach;
const getFollowerDemographics_Gender = async (BUSINESS_ID, ACCESS_TOKEN) => {
    try {
        // Get last 90 days follower demographics - gender
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=gender&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`);
        const followersGender = response.data.data[0].total_value.breakdowns[0].results;
        return followersGender;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getFollowerDemographics_Gender = getFollowerDemographics_Gender;
const getFollowerDemographics_Age = async (BUSINESS_ID, ACCESS_TOKEN) => {
    try {
        // Get last 90 days follower demographics - age
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=age&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`);
        const followersAge = response.data.data[0].total_value.breakdowns[0].results;
        return followersAge;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getFollowerDemographics_Age = getFollowerDemographics_Age;
const getFollowerDemographics_TopCities = async (BUSINESS_ID, ACCESS_TOKEN) => {
    try {
        // Get last 90 days follower demographics - city
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=follower_demographics&period=lifetime&timeframe=last_90_days&breakdown=city&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`);
        let followersTopCities = response.data.data[0].total_value.breakdowns[0].results;
        // Sort cities by value in descending order and get top 5
        followersTopCities = followersTopCities.sort((a, b) => b.value - a.value).slice(0, 5);
        return followersTopCities;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getFollowerDemographics_TopCities = getFollowerDemographics_TopCities;
const getOnlineFollowers = async (BUSINESS_ID, ACCESS_TOKEN, TIMESTAMP) => {
    try {
        // Get online followers per hour per day
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=online_followers&period=lifetime&since=${TIMESTAMP}&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`);
        const onlineFollowers = response.data.data[0].values;
        return onlineFollowers;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getOnlineFollowers = getOnlineFollowers;
const getReachedDemographic_Gender = async (BUSINESS_ID, ACCESS_TOKEN) => {
    try {
        // Get reached audience demographics last 90 days - gender
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=reached_audience_demographics&period=lifetime&timeframe=last_90_days&breakdown=gender&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`);
        const reachedGender = response.data.data[0].total_value.breakdowns[0].results;
        return reachedGender;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getReachedDemographic_Gender = getReachedDemographic_Gender;
const getReachedDemographic_Age = async (BUSINESS_ID, ACCESS_TOKEN) => {
    try {
        // Get reached audience demographics last 90 days - age
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=reached_audience_demographics&period=lifetime&timeframe=last_90_days&breakdown=age&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`);
        const reachedAge = response.data.data[0].total_value.breakdowns[0].results;
        return reachedAge;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getReachedDemographic_Age = getReachedDemographic_Age;
const getReachedDemographic_TopCities = async (BUSINESS_ID, ACCESS_TOKEN) => {
    try {
        // Get reached audience demographics last 90 days - age
        const response = await axios_1.default.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}/insights?metric=reached_audience_demographics&period=lifetime&timeframe=last_90_days&breakdown=city&metric_type=total_value&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&access_token=${ACCESS_TOKEN}`);
        let reachedTopCities = response.data.data[0].total_value.breakdowns[0].results;
        // Sort cities by value in descending order and get top 5
        reachedTopCities = reachedTopCities.sort((a, b) => b.value - a.value).slice(0, 5);
        return reachedTopCities;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getReachedDemographic_TopCities = getReachedDemographic_TopCities;
//# sourceMappingURL=instagramGraphAPI.js.map