import { PostType } from "../model/Post"

export type GetPostResponse = {
    id: string
    description: string
    image: string
    created_at: Date
    type: PostType
    user_id: string
    total_likes: number
}