import express from 'express';
import { log } from '../../middlewares/logger.middleware.js';
import { getCampaigns, getById, removeCampaign, updateCampaign, addCampaign } from './campaign.controller.js';

export const campaignRoutes = express.Router();

campaignRoutes.get('/', log, getCampaigns);
campaignRoutes.post('/', addCampaign);
campaignRoutes.get('/:id', getById);

campaignRoutes.put('/', updateCampaign);
campaignRoutes.delete('/:campaignId', removeCampaign);
