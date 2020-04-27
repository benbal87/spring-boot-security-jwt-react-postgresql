import { Role } from './role.model'

export interface UserData {

  id: number

  username: string

  email: string

  password: string

  roles: Role[]

}
