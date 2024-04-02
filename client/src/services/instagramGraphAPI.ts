import axios from 'axios';

// TODO:

const getPageId = async (ACCESS_TOKEN: String) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HEADER}/me/accounts?access_token=${ACCESS_TOKEN}`);

        const pageId = response.data.data[0].id;

        return pageId;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}

const getBusinessId = async (PAGE_ID: String, ACCESS_TOKEN: String) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HEADER}/${PAGE_ID}?fields=instagram_business_account&access_token=${ACCESS_TOKEN}`);

        const businessId = response.data.instagram_business_account.id;

        return businessId;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}

const getBasicUserInfo = async (BUSINESS_ID: String, ACCESS_TOKEN: String) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HEADER}/${BUSINESS_ID}?fields=name,username,profile_picture_url&access_token=${ACCESS_TOKEN}`);

        const name = response.data.name;
        const userName = response.data.username;
        const profilePicURL = response.data.profile_picture_url;

        return { name, userName, profilePicURL };
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getLongLivedAccessToken = async (ACCESS_TOKEN: String) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HEADER}/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_APP_ID}&client_secret=${process.env.NEXT_PUBLIC_APP_SECRET}&fb_exchange_token=${ACCESS_TOKEN}`);
        const longLivedAccessToken = response.data.access_token;

        return longLivedAccessToken;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export { getPageId, getBusinessId, getBasicUserInfo, getLongLivedAccessToken };