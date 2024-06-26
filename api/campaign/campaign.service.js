import { ObjectId } from 'mongodb';
import { dbService } from '../../services/db.service.js';
import { logger } from '../../services/logger.service.js';


export const campaignService = {
    getById,
    remove,
    add,
    update,
    query,
};

async function query(filterBy) {
    try {
        const criteria = {}
        if (filterBy?.txt) {
            criteria.name = { $regex: filterBy.txt, $options: 'i' }
        }

        if (filterBy?.platform?.length > 0) {
            criteria.advertisingPlatform = { $in: filterBy.platform }
        }
        const collection = await dbService.getCollection('campaign');
        const campaigns = await collection.find(criteria).toArray();
        return campaigns;

    } catch (err) {
        logger.error('cannot find campaigns', err);
        throw err;
    }
}

async function getById(campaignId) {
    try {
        const collection = await dbService.getCollection('campaign');
        const campaign = await collection.findOne({ _id: new ObjectId(campaignId) });
        return campaign;
    } catch (err) {
        logger.error(`while finding campaign ${campaignId}`, err);
        throw err;
    }
}

async function remove(campaignId) {
    try {
        const collection = await dbService.getCollection('campaign');
        await collection.deleteOne({ _id: new ObjectId(campaignId) });
    } catch (err) {
        logger.error(`cannot remove campaign ${campaignId}`, err);
        throw err;
    }
}

async function update(campaign) {
    try {
        const campaignToSave = {
            name: campaign.name,
            advertisingPlatform: campaign.advertisingPlatform,
            advertiserLandingPage: campaign.advertiserLandingPage,
            bannerImageURL: campaign.bannerImageURL,
        };
        const collection = await dbService.getCollection('campaign');
        await collection.updateOne(
            { _id: new ObjectId(campaign._id) },
            { $set: campaignToSave });
        return campaign;
    } catch (err) {
        logger.error(`cannot update campaign ${campaign._id}`, err);
        throw err;
    }
}

async function add(campaign) {
    try {
        // Validate campaign object
        if (!campaign || !campaign.name || !campaign.advertisingPlatform || !campaign.advertiserLandingPage) {
            throw new Error('Campaign fields are required');
        }
        const collection = await dbService.getCollection('campaign');
        await collection.insertOne(campaign);
        return campaign;
    } catch (err) {
        logger.error('cannot insert campaign', err);
        throw err;
    }
}
