import { getPageId, getBusinessId, getBasicUserInfo, getLongLivedAccessToken, getMonthlyUserImpressions, getFollowerDemographics_Gender, getFollowerDemographics_Age, getFollowerDemographics_TopCities } from '../../services/instagramGraphAPI';
import instagram_data from '../../models/InstagramData';
import axios from 'axios';

interface BasicUserInfo {
    name: string;
    userName: string;
    profilePicURL: string;
    followers_count: string;
}

const instagramUserCheck = async (accessToken: String) => {
    try {

        // Get pageID of user
        const pageID = await getPageId(accessToken);

        // Check if user exists with pageID
        const existingUser = await instagram_data.findOne({ pageID: pageID })
        
        if(!existingUser){
            // Get business id
            const businessId = await getBusinessId(pageID, accessToken);

            // Get basic user info
            const basicUserInfo = await getBasicUserInfo(businessId, accessToken) as BasicUserInfo;
            const { name, userName, profilePicURL, followers_count } = basicUserInfo;

            const testCreatorID = '65de95dc2c98cba944efb3ab';

            const longtoken = await getLongLivedAccessToken(accessToken);

            const userPayload = {
                creatorID: testCreatorID,
                pageID: pageID,
                businessID: businessId,
                longLivedAccessToken: longtoken,
                name: name,
                userName: userName,
                profilePicURL: profilePicURL,
                followers_count: followers_count
            };
            console.log("Payload: " + JSON.stringify(userPayload))

            return userPayload;
        }

    } catch (error) {
        console.log(error);
        return error;
    }
    
}

const instagramInsights = async (businessID: String, accessToken: String) => {
    try {
        const monthylyImpressions = await getMonthlyUserImpressions(businessID, accessToken)
        const followersGender = await getFollowerDemographics_Gender(businessID, accessToken)
        const followersAge = await getFollowerDemographics_Age(businessID, accessToken)
        const followersTopCities = await getFollowerDemographics_TopCities(businessID, accessToken)
        
        return {monthylyImpressions, followersGender, followersAge, followersTopCities};
    } catch (error) {
        console.log(error);
        return error;
    }
    
}


export { instagramUserCheck, instagramInsights };