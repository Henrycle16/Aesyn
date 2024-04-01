import { getBusinessId, getBasicUserInfo, getLongLivedAccessToken } from '../../services/instagramGraphAPI';
import instagram_data from '../../models/InstagramData';
import axios from 'axios';

interface BasicUserInfo {
    name: string;
    userName: string;
    profilePicURL: string;
}

const instagramCheck = async (pageID: String, accessToken: String) => {
    try {

        const existingUser = await instagram_data.findOne({ pageID: pageID })
        
        // Check if MongoDB has PageID
        if(!existingUser){
            // Get business id
            const businessId = await getBusinessId(pageID, accessToken);

            // Get basic user info
            const basicUserInfo = await getBasicUserInfo(businessId, accessToken) as BasicUserInfo;
            const { name, userName, profilePicURL } = basicUserInfo;

            const testCreatorID = '65de95dc2c98cba944efb3ab';

            const longtoken = await getLongLivedAccessToken(accessToken);

            const userPayload = {
                creatorID: testCreatorID,
                pageID: pageID,
                businessID: businessId,
                longLivedAccessToken: longtoken,
                name: name,
                userName: userName,
                profilePicURL: profilePicURL
            };
            console.log("Payload: " + userPayload)

            // Create object in MongoDB
            const instagramUser = await axios.post('http://localhost:5000/api/instagram', userPayload);

            console.log(instagramUser);

            return;
        }

    } catch (error) {
        console.log(error);
        return error;
    }
    
}


export { instagramCheck };