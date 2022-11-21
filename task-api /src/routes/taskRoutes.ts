import { Router } from 'express';
import { addTask, getAllTask, getOneTask, editTask, deleteTask   } from '../controllers/taskController';

const router = Router();

router.get('/', getAllTask);
router.get('/:id', getOneTask);
router.post('/', addTask);
router.put('/:id', editTask);
router.delete('/:id', deleteTask);

export default router;