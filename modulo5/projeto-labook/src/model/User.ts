export default class User{
    private friends: string
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
    ){
        this.friends = JSON.stringify([])
    }
}