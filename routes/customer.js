import express from 'express';
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from '../controllers/customers.js';
import { verifyToken } from '../utils/checkToken.js';

const router = express.Router();
const customerRouter = router;

// CREATE
customerRouter.post('/', verifyToken, createCustomer);

// UPDATE
customerRouter.put('/:id', verifyToken, updateCustomer);

// DELETE
customerRouter.delete('/:id', verifyToken, deleteCustomer);

// GET ONE
customerRouter.get('/:id', getCustomer);

// GET ALL
customerRouter.get('/', getCustomers);

export default customerRouter;
