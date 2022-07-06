export enum PostType {
    Normal = 'Normal',
    Event = 'Event'
}

export class Post{
    constructor(
        private id: string,
        private description: string,
        private image: string,
        private creation_date: string,
        private postType: PostType,
        private user_id: string
    ){}

    getPost(){
        return ({
            id: this.id,
            description: this.description,
            image: this.image,
            creation_date: this.creation_date,
            postType: this.postType,
            user_id: this.user_id
        })
    }
}