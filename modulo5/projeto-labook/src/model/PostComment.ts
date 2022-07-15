export class PostComment{
    constructor(
        private id: string,
        private comment: string,
        private post_id: string,
        private user_id: string,
    ){}
}