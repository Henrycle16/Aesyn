import instagram_data from '../../models/InstagramData';
import { getLongLivedAccessToken } from '../../services/instagramGraphAPI';
import axios from 'axios';

//TODO: Create a way to obtain all objectID and loop through them to refresh the token every x days
const tokenRefresh = async (objectID: Object) => {
    try {
        const user = await instagram_data.findById(objectID);
        const oldLongToken = user.longLivedAccessToken;

        const newLongtoken = await getLongLivedAccessToken(oldLongToken);

        const testObject2 = await instagram_data.findOneAndUpdate(
            { _id: objectID }, // filter
            { $set: { longLivedAccessToken: newLongtoken } }, // update
            { new: true } // options to return new user object
        );

        return testObject2;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export { tokenRefresh };