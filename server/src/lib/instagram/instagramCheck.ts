import { getPageId, getBusinessId, getBasicUserInfo, getLongLivedAccessToken, getMonthlyUserImpressionsAndReach, getFollowerDemographics_Gender, getFollowerDemographics_Age, getFollowerDemographics_TopCities } from '../../services/instagramGraphAPI';
//import instagram_data from '../../models/InstagramData';
import InstagramData from '../../models/InstagramData';

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
        const existingUser = await InstagramData.findOne({ businessID: businessID })
        
        if(!existingUser){

            // Get basic user info
            const basicUserInfo = await getBasicUserInfo(businessID, accessToken) as BasicUserInfo;
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
                followers_count: followers_count
            };

            console.log('User created successfully')

            return userPayload;
        }else{
            await getInsights(businessID);
        }

    } catch (error) {
        console.log(error);
        return error;
    }
    
}

const instagramInsights = async (businessID: string, accessToken: string) => {
    try {

        const monthylyImpressionsAndReach = await getMonthlyUserImpressionsAndReach(businessID, accessToken)
        const followersGender = await getFollowerDemographics_Gender(businessID, accessToken)
        const followersAge = await getFollowerDemographics_Age(businessID, accessToken)
        const followersTopCities = await getFollowerDemographics_TopCities(businessID, accessToken)
        
        return {monthylyImpressionsAndReach, followersGender, followersAge, followersTopCities};
    } catch (error) {
        console.log(error);
        return error;
    }
    
}

const getInsights = async (businessID: string) => {
    // Find the user with the given businessId
    const user = await InstagramData.findOne({ businessID: businessID });

    if (!user) {
        throw new Error('User not found');
    }

    // Get the accessToken from the user
    const { longLivedAccessToken: accessToken } = user;

    // Update basic user info
    const basicUserInfo = await getBasicUserInfo(businessID, accessToken) as BasicUserInfo;
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
    } else {
        throw new Error('No insights available');
    }
}


export { instagramUserCheck, getInsights };