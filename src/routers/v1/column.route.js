import express from 'express'
import { ColumnController } from '*/controllers/column.controller'
import { ColumnValidation } from '*/validations/column.validation'

const router = express.Router()

// create column
router.route('/')
    .post(ColumnValidation.createNew, ColumnController.createNew)

// update column
router.route('/:id')
    .put(ColumnValidation.update, ColumnController.update)

export const columnRoutes = router