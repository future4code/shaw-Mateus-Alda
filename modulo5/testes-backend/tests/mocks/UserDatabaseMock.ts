import { User } from "../../src/model/User";
import { userMocks, userMocks2 } from "./userMock";

export class UserDatabaseMock {
    public async getUserById(id: string): Promise<User | undefined> {
        switch(id){
            case 'id_mock1':
                return userMocks
            case 'id_mock2':
                return userMocks2
            default:
                return undefined
        }
    }
}