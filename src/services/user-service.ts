import { User } from "../database/User";
import ApiError from "../exception/api-errors";
import { IUser } from "../interfaces";
import * as bcrypt from "bcryptjs";
import tokenService from "./token-service";
import { UserDto } from "../dto";

class UserService {
  async registration(body: IUser) {
    const candidate = await User.findOne({ where: { email: body.email } });
    if (candidate) {
      throw ApiError.BadRequest("User with this email already exist");
    }
    return await User.create({
      ...body,
      password: await bcrypt.hash(body.password!, 12),
    });
  }

  async login({ email, password }: IUser) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw ApiError.BadRequest("User is not found");
    const isMatch = await bcrypt.compare(password!, user.password);
    if (!isMatch) throw ApiError.BadRequest("Invalid password");
    return await this.checkUser(user.id);
  }

  async updateUsers(users: IUser[]) {
    return await Promise.allSettled([
      ...users.map((user: IUser) => this.updateUser(user)),
    ]);
  }

  async updateUser(body: any) {
    const user: any = await User.findOne({ where: { id: body.id } });
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key) && user) {
        user[key] = body[key];
      }
    }
    await user.save();
    return user;
  }

  async deleteUsers(id: number[]) {
    const users: any = await User.findAll({ where: { id: id } });
    users.forEach((user: any) => {
      user?.destroy();
    });
    return id;
  }

  async checkUser(id: number) {
    const user = await User.findOne({ where: { id } });
    if (user) {
      if (user.blocked) throw ApiError.Blocked();
      return user;
    }
    throw ApiError.UnauthorizedError();
  }

  async getUsers() {
    return await User.findAll();
  }
}

export default new UserService();
