import { CustomError } from "../../src/errors/CustomError";
import { UserDatabaseMock } from "./UserDatabaseMock";

export class UserBusinessMock {
    constructor (
        private userDatabaseMock: UserDatabaseMock
    ){}
    public async getUserById(id: string) {
        try {   
            const user = await this.userDatabaseMock.getUserById(id);
   
            if (!user) {
               throw new CustomError(404, "User not found");
            }
   
            return {
               id: user.getId(),
               name: user.getName(),
               email: user.getEmail(),
               role: user.getRole(),
             }
         } catch (error) {
            throw new CustomError(error.statusCode, error.message)
         }
    }
}