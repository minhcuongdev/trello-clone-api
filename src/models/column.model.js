import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly:false })
}

const findOneById = async (id) => {
    try {
        const result = getDB().collection(columnCollectionName).findOne({
            _id: ObjectId(id)
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(columnId) },
            { $push: { cardOrder: cardId } },
            { returnDocument: 'after' }
        )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const insertedValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId)
        }
        const result = await getDB().collection(columnCollectionName).insertOne(insertedValue)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' }
        )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = { columnCollectionName, createNew, update, findOneById, pushCardOrder }