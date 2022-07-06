import UserData from "../data/UserData";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LoginInputDTO } from "../types/loginInputDTO";
import { SignupInputDTO } from "../types/signupInputDTO";

export default class UserBusiness {

    constructor(
        private userData: UserData
    ) { }

    signup = async (input: SignupInputDTO) => {
        const { name, email, password } = input
        if (!name || !email || !password) {
            throw new Error("Invalid 'name', 'email' or 'password' field.")
        }

        const registeredUser = await this.userData.getUserByEmail(email)
        if (registeredUser) {
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

        const token = Authenticator.generateToken({ id })
        return token
    }

    login = async (input: LoginInputDTO) => {
        const { email, password } = input

        if (!email || !password) {
            throw new Error("Invalid 'email' or 'password' field.")
        }

        const registeredUser = await this.userData.getUserByEmail(email)
        if (!registeredUser) {
            throw new Error("User with this email does not exist.");
        }

        const correctPassword: boolean = await HashManager.compare(password, registeredUser.password)
        if (!correctPassword){
            throw new Error("Email or password incorrect.");
        }

        const token = Authenticator.generateToken({ id: registeredUser.id })
        return token
    }
}