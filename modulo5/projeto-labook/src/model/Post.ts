export enum PostType {
    Normal = 'normal',
    Event = 'event'
}

export class Post{
    private created_at: Date
    private total_likes: number

    constructor(
        private id: string,
        private description: string,
        private image: string,
        private type: PostType,
        private user_id: string
    ){
        this.created_at = new Date()
        this.total_likes = 0
    }
}