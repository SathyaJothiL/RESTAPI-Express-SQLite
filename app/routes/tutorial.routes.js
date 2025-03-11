import express from 'express'
import { create,findall,findAllPublished,findOne,update,deleteOne,deleteAll } from '../controllers/controller.js'
const router = express.Router()

//create New tutorial

router.post('/',create)

//get all tutorials

router.get('/',findall)

//get all publishes tutorial

router.get('/published',findAllPublished)

//get single tutorial with id

router.get('/:id',findOne)

export default router

//update a tutorial with id

router.put('/:id',update)

//delete a tutorial with id

router.delete('/:id',deleteOne)

//delete all tutorials

router.delete('/',deleteAll)