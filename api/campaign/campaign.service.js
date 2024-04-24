import fs from 'fs'

import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'


export const campaignService = {
    getById,
    remove,
    add,
    update,
}

async function getById(campaignId) {
    try {
        const collection = await dbService.getCollection('campaign')
        const campaign = await collection.findOne({ _id: new ObjectId(campaignId) })
        return campaign
    } catch (err) {
        logger.error(`while finding campaign ${campaignId}`, err)
        throw err
    }
}

async function remove(campaignId) {
    try {
        const collection = await dbService.getCollection('campaign')
        await collection.deleteOne({ _id: new ObjectId(campaignId) })
    } catch (err) {
        logger.error(`cannot remove car ${campaignId}`, err)
        throw err
    }
}

async function update(campaign) {
    try {
        console.log('campaign to remove', campaign)
        const campaignToSave = {
            name: campaign.name,
            price: campaign.price,
        }
        const collection = await dbService.getCollection('campaign')
        await collection.updateOne(
            { _id: new ObjectId(campaign._id) },
            { $set: campaignToSave })
        return campaign
    } catch (err) {
        logger.error(`cannot update campaign ${campaign._id}`, err)
        throw err
    }
}

async function add(campaign) {
    try {
        const collection = await dbService.getCollection('campaign')
        await collection.insertOne(campaign)
        return campaign
    } catch (err) {
        logger.error('cannot insert car', err)
        throw err
    }
}
