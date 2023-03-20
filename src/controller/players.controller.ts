import { Response, Request, NextFunction } from 'express';
import { Repo } from '../repository/repo.interface.js';
import { Players } from '../entities/players.js';
import createDebug from 'debug';
import { RequestPlus } from '../interceptors/interceptors.js';
import { Users } from '../entities/users.js';
const debug = createDebug('RM:controller:players');

export class PlayersController {
  constructor(public repo: Repo<Players>, public repoUsers: Repo<Users>) {
    debug('Instantiate');
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll');
      const data = await this.repo.query();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('get');
      const data = await this.repo.queryId(req.params.id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async post(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('post');
      const newPlayer = await this.post(req, resp, next);
      resp.json({
        results: [newPlayer],
      });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('patch');
      const data = await this.repo.update(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('delete');
      await this.repo.delete(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
