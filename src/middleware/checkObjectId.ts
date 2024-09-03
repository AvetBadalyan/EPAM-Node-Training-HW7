import { Request, Response, NextFunction } from 'express';
import { validate as isUuid } from 'uuid';

const checkValidId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    res.status(400).json({ message: 'Invalid ID format' });
    return;
  }
  next();
};

export default checkValidId;
