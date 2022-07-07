import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { LoginInputDTO } from "../types/loginInputDTO";
import { SignupInputDTO } from "../types/signupInputDTO";

export default class UserController{

    constructor(
        private userBusiness: UserBusiness
    ){}

    signup = async(req: Request, res: Response) => {
        const {name, email, password} = req.body

        const input: SignupInputDTO = {
            name,
            email,
            password
        }

        try {
            const token = await this.userBusiness.signup(input)

            res.status(201).send({ message: "User created successfully.", token})
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Signup error.")
        }
    }

    login = async(req: Request, res: Response) => {
        const {email, password} = req.body

        const input: LoginInputDTO = {
            email,
            password
        }

        try {
            const token = await this.userBusiness.login(input)

            res.send({ message: 'Welcome!', token})
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Login error.")
        }
    }

    addFriend = async(req: Request, res: Response) => {
        const token = req.headers.authorization
        const id = req.params.id
        
        try {
            const friendName = await this.userBusiness.addFriend(token, id)

            res.send({ message: `You and ${friendName} are now friends!` })
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Login error.")
        }
    }

    removeFriend = async(req: Request, res: Response) => {
        const token = req.headers.authorization
        const id = req.params.id
        
        try {
            const friendName = await this.userBusiness.removeFriend(token, id)

            res.send({ message: `You and ${friendName} are no longer friends!` })
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Login error.")
        }
    }

    getFeed = async (req: Request, res: Response) => {
        const token = req.headers.authorization
        
        try {
            const feed = await this.userBusiness.getFeed(token)

            res.send({ feed })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Post error.")
        }
    }
}