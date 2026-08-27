import type { Request, Response, NextFunction } from 'express';

interface HostScopedModel<T> {
  list(hostId: string): Promise<T[]>;
  get(hostId: string, id: string): Promise<T | null>;
  create(hostId: string, data: Partial<T>): Promise<T>;
  update(hostId: string, id: string, data: Partial<T>): Promise<void>;
  remove(hostId: string, id: string): Promise<void>;
}

/**
 * Builds standard list/get/create/update/delete controllers for a host-scoped
 * Firestore model. `sanitizeCreate`/`sanitizeUpdate` let each resource shape
 * its own request body into the fields it wants to persist.
 */
export function createCrudController<T extends { id: string; hostId: string }>(
  model: HostScopedModel<T>,
  options: {
    notFoundMessage: string;
    sanitizeCreate: (body: Record<string, unknown>) => Partial<T>;
    sanitizeUpdate: (body: Record<string, unknown>) => Partial<T>;
  }
) {
  const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostId = req.user!.uid;
      const items = await model.list(hostId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  };

  const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostId = req.user!.uid;
      const item = await model.get(hostId, req.params.id);
      if (!item) return res.status(404).json({ error: options.notFoundMessage });
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostId = req.user!.uid;
      const data = options.sanitizeCreate(req.body || {});
      const item = await model.create(hostId, data);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  };

  const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostId = req.user!.uid;
      const { id } = req.params;
      const existing = await model.get(hostId, id);
      if (!existing) return res.status(404).json({ error: options.notFoundMessage });
      const data = options.sanitizeUpdate(req.body || {});
      await model.update(hostId, id, data);
      const updated = await model.get(hostId, id);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  };

  const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostId = req.user!.uid;
      const { id } = req.params;
      const existing = await model.get(hostId, id);
      if (!existing) return res.status(404).json({ error: options.notFoundMessage });
      await model.remove(hostId, id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  return { list, get, create, update, remove };
}
