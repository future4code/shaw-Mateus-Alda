import PostData from "../data/PostData";
import UserData from "../data/UserData";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { GetPostResponse } from "../types/GetPostResponse";
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
        if (!correctPassword) {
            throw new Error("Incorrect password.");
        }

        const token = Authenticator.generateToken({ id: registeredUser.id })
        return token
    }

    addFriend = async (token: string, id: string) => {
        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!id) {
            throw new Error("ID is missing.")
        }
        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)
        const friend = await this.userData.getById(id)        

        if (!user) {
            throw new Error("User with this token does not exist.");
        }
        if (!friend) {
            throw new Error("User with this id does not exist.");
        }

        const areFriends = JSON.parse(user.friends)?.includes(friend.id)
        if (areFriends) {
            throw new Error("Users already are friends.");
        }

        const newUserFriendsList = JSON.parse(user.friends) as string[]
        newUserFriendsList.push(friend.id)

        const userAffectedRows = await this.userData.updateFriends(user.id, JSON.stringify(newUserFriendsList))
        if (userAffectedRows === 0) {
            throw new Error("Failed to add friend to user.")
        }

        const newFriendFriendsList = JSON.parse(friend.friends) as string[]
        newFriendFriendsList.push(user.id)

        const friendAffectedRows = await this.userData.updateFriends(friend.id, JSON.stringify(newFriendFriendsList))
        if (friendAffectedRows === 0) {
            throw new Error("Failed to add user as friend.")
        }

        return friend.name
    }

    removeFriend = async (token: string, id: string) => {
        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!id) {
            throw new Error("ID is missing.")
        }
        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)
        const friend = await this.userData.getById(id)        

        if (!user) {
            throw new Error("User with this token does not exist.");
        }
        if (!friend) {
            throw new Error("User with this id does not exist.");
        }

        const areFriends = JSON.parse(user.friends)?.includes(friend.id)
        if (!areFriends) {
            throw new Error("Users aren't friends.");
        }

        const newUserFriendsList = JSON.parse(user.friends) as string[]
        const friendIndex = newUserFriendsList.indexOf(friend.id)
        newUserFriendsList.splice(friendIndex, 1)

        const userAffectedRows = await this.userData.updateFriends(user.id, JSON.stringify(newUserFriendsList))
        if (userAffectedRows === 0) {
            throw new Error("Failed to remove user's friend.")
        }

        const newFriendFriendsList = JSON.parse(friend.friends) as string[]
        const userIndex = newFriendFriendsList.indexOf(user.id)
        newFriendFriendsList.splice(userIndex, 1)
        
        const friendAffectedRows = await this.userData.updateFriends(friend.id, JSON.stringify(newFriendFriendsList))
        if (friendAffectedRows === 0) {
            throw new Error("Failed to remove user from friend's list.")
        }

        return friend.name
    }

    getFeed = async (token: string, page: number, size: number) => {

        const authenticationData = Authenticator.getTokenData(token)
        const user = await this.userData.getById(authenticationData.id)

        if (!user) {
            throw new Error("User with this token does not exist.");
        }

        if (!token) {
            throw new Error("Authentication token is missing.")
        }
        if (!page || page < 1 || isNaN(page)) {
            page = 1
        }
        if (!size || size < 5 || isNaN(size)) {
            size = 5
        }

        const offset = (page - 1) * size
        const order = 'DESC'

        const postData = new PostData()
        const userFriends = JSON.parse(user.friends) as string[]

        const feed: GetPostResponse[] = await postData.getFeed(userFriends, size, offset, order)

        return feed
    }
}