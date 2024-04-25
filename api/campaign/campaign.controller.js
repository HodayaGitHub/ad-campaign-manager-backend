import { campaignService } from './campaign.service.js';
import { logger } from '../../services/logger.service.js';


export async function getCampaigns(req, res) {
    try {
        const { filterBy } = req.query
        const campaigns = await campaignService.query(filterBy);
        res.json(campaigns);

    } catch (err) {
        logger.error('Cannot get campaigns', err);
        res.status(500).send({ err: 'Failed to get campaign' });
    }
}

export async function getById(req, res) {
    try {
        const campaignId = req.params.id;
        const campaign = await campaignService.getById(campaignId);
        res.json(campaign);
    } catch (err) {
        logger.error('Failed to get campaign', err);
        res.status(500).send({ err: 'Failed to get campaign' });
    };
}

export async function removeCampaign(req, res) {
    try {
        const { campaignId } = req.params;
        await campaignService.remove(campaignId);
        logger.info(`Campaign ${campaignId} removed`);
        res.send();
    } catch (err) {
        logger.error('Cannot remove item', err);
        res.status(500).send({ err: 'Failed to remove campaign' });
    }
}

export async function updateCampaign(req, res) {
    try {
        const campaign = req.body;
        let updatedCampaign;
        if (campaign._id) {
            // Update existing campaign
            updatedCampaign = await campaignService.update(campaign);
        } else {
            // Add new campaign
            updatedCampaign = await campaignService.add(campaign);
        }

        res.json(updatedCampaign);
    } catch (err) {
        logger.error('Failed to update campaign', err);
        res.status(500).send({ err: 'Failed to update campaign' });
    }
}

export async function addCampaign(req, res) {

    try {
        const campaign = req.body;
        const addedCampaign = await campaignService.add(campaign);
        res.json(addedCampaign);
    } catch (err) {
        logger.error('Failed to add campaign', err);
        res.status(500).send({ err: 'Failed to add campaign' });
    }
}