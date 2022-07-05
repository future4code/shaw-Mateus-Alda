import UserData from "../data/UserData";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserInputDTO } from "../types/userInputDTO";

export default class UserBusiness{

    constructor(
        private userData: UserData
    ){}

    signup = async(input: UserInputDTO) => {
        const {name, email, password} = input
        if (!name || !email || !password){
            throw new Error("Invalid 'name', 'email' or 'password' field.")
        }

        const registeredUser = await this.userData.getUserByEmail(email)
        if (registeredUser){
            throw new Error("User with this email already exists.");            
        }

        const id = IdGenerator.generateId()

        const hashPassword = await HashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashPassword
        )
        await this.userData.insert(user)

        const token = Authenticator.generateToken({id})
        return token
    }
}