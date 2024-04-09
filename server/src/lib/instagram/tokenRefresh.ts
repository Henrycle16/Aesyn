import InstagramData from '../../models/InstagramData';
import { getLongLivedAccessToken } from '../../services/instagramGraphAPI';

const tokenRefresh = async () => {
    try {
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        const users = await InstagramData.find({ tokenCreationDate: { $lt: tenDaysAgo } });

        console.log(`Number of users being updated: ${users.length}`);

        for (let user of users) {
            const oldLongToken = user.longLivedAccessToken;
            const newLongtoken = await getLongLivedAccessToken(oldLongToken);

            await InstagramData.findOneAndUpdate(
                { _id: user._id },
                { $set: { longLivedAccessToken: newLongtoken, tokenCreationDate: new Date() } }, // Update token and tokenCreationDate
                { new: true }
            );
        }

        return "Tokens refreshed successfully";
    } catch (error) {
        console.log(error);
        return error;
    }
}

export { tokenRefresh };