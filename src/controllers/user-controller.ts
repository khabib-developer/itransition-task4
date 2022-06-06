import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserDto } from "../dto";
import ApiError from "../exception/api-errors";
import tokenService from "../services/token-service";
import userService from "../services/user-service";

class Auth {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      if (!validationResult(req).isEmpty()) {
        next(ApiError.BadRequest("Incorrect login details"));
      }
      res.json(
        tokenService.generateToken({
          ...new UserDto(await userService.registration(req.body)),
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!validationResult(req).isEmpty()) {
        next(ApiError.BadRequest("Incorrect login details")); //
      }
      res.json(
        tokenService.generateToken({
          ...new UserDto(await userService.login(req.body)),
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteUsers(req: any, res: Response, next: NextFunction) {
    try {
      if (await userService.checkUser(req.user.id)) {
        res.json(await userService.deleteUsers(req.body));
      }
    } catch (error) {
      next(error);
    }
  }

  async updateUsers(req: any, res: Response, next: NextFunction) {
    try {
      if (await userService.checkUser(req.user.id)) {
        res.json(await userService.updateUsers(req.body));
      }
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: any, res: Response, next: NextFunction) {
    try {
      if (await userService.checkUser(req.user.id)) {
        res.json(await userService.getUsers());
      }
    } catch (error) {
      next(error);
    }
  }

  async check(req: any, res: Response, next: NextFunction) {
    try {
      res.json(await userService.checkUser(req.user.id));
    } catch (error) {
      next(error);
    }
  }
}

export default new Auth();
