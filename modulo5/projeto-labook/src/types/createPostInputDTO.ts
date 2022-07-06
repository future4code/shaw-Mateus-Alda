import { PostType } from "../model/Post"

export interface CreatePostInputDTO {
    description: string
    image: string
    postType: PostType
}