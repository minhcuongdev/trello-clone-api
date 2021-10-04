import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'

const createNew = async (data) => {
    try {
        const createdColumn = await ColumnModel.createNew(data)
        const getNewColumn = await ColumnModel.findOneById(createdColumn.insertedId.toString())

        await BoardModel.pushColumnOrder(getNewColumn.boardId.toString(), getNewColumn._id.toString())
        getNewColumn.cards = []

        return getNewColumn
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        if (updateData._id) delete updateData._id
        if (updateData.cards) delete updateData.cards

        const updateColumn = await ColumnModel.update(id, updateData)

        if ( updateColumn._destroy) {
            CardModel.deleteMany(updateColumn.cardOrder)
        }

        return updateColumn
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnService = { createNew, update }