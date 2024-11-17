import { Post } from 'src/post/domain/entities/post'

export class User{
  id : any
  email : string 
  name : string
  posts?: Post[]
}