import express from 'express'
import { CardController } from '*/controllers/card.controller'
import { CardValidation } from '*/validations/card.validation'

const router = express.Router()

// create Card
router.route('/')
    .post(CardValidation.createNew, CardController.createNew)

router.route('/:id')
    .put(CardValidation.update, CardController.update)
export const cardRoutes = router