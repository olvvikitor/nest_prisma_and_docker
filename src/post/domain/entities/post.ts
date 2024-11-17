import { User } from 'src/user/domain/entities/user'

export class Post{
  id : number 
  title : string
  content: string
  publicado: boolean 
  author?: User
  authorId: any
}