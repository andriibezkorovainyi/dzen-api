import ws from 'ws';
import { validateUserData } from '../validators/validateUserData';
import userService from '../services/userService';
import userSessionService from '../services/userSessionService';
import bcrypt from 'bcrypt';
import { CreateUserInput, GetUserInput } from '../types/userTypes';

class UserController {
  async getUser(ws: ws, userData: GetUserInput) {
    const user = await userService.getUserByEmail(userData.email);

    if (!user) {
      ws.send(
        JSON.stringify({
          error: 'User with such email is not found, please, sign up',
        })
      );
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isPasswordCorrect) {
      ws.send(JSON.stringify({ error: 'Password is incorrect' }));
      return;
    }

    const { id } = user;
    const { ip, userAgent } = userData;
    await userSessionService.createUserSession(id, ip, userAgent);

    ws.send(JSON.stringify(user));
  }

  async createUser(ws: ws, userData: CreateUserInput) {
    const isUserExist = await userService.getUserByEmail(userData.email);

    if (isUserExist) {
      ws.send(
        JSON.stringify({
          error: 'User with such email already exists, please, sign in',
        })
      );
      return;
    }

    const errors = validateUserData(userData);
    const errorsCount = Object.keys(errors).length;

    if (errorsCount) {
      if (errorsCount === 1 && errors.homePage) {
        ws.send(JSON.stringify({ error: errors.homePage }));
      } else {
        ws.send(JSON.stringify(errors));
        return;
      }
    }

    try {
      const user = await userService.createUser(userData);
      const { id } = user;
      const { ip, userAgent } = userData;

      await userSessionService.createUserSession(id, ip, userAgent);

      ws.send(JSON.stringify(user));
    } catch (err) {
      console.log(err);
      ws.send(JSON.stringify({ error: err }));
    }
  }
}

export default new UserController();
