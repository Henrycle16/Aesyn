import axios from 'axios';

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

export { getPageId };