import * as React from 'react'
import { Constants } from '../constants/constants'
import { LoginResponse } from '../models/login-response.model'
import { Role } from '../models/role.model'
import { UserData } from '../models/userdata.model'
import { AuthenticationService } from '../services/authentication.service'
import { UserService } from '../services/user.service'
import '../styles/user-component.style.css'
import { Util } from '../utils/Util'

export interface UserComponentProps {
  history: any
  setUsername: (username: string) => void
  setRoles: (roles: Role[]) => void
}

export interface UserComponentStates {
  userData: UserData
}

export class UserComponent
  extends React.Component<UserComponentProps, UserComponentStates> {

  authenticationService
  userService

  constructor(props: UserComponentProps) {
    super(props)

    this.authenticationService = new AuthenticationService()
    this.userService = new UserService()

    this.state = {
      userData: {
        id: 0,
        username: '',
        email: '',
        password: '',
        roles: []
      }
    }
  }

  componentDidMount(): void {
    let loginResponse: LoginResponse = Util.getParsedDataFromLocalStorage(Constants.LOCAL_STORAGE_USER_DATA)
    if (loginResponse) {
      this.userService.getUserDetails(loginResponse.id).then(response => {
        const userData: UserData = response.data
        if (userData) {
          this.setState(
            {userData: userData},
            () => {
              this.handleSetUserName(userData.username)
              this.handleSetRoles(userData.roles)
            }
          )
        }
      })
    }
  }

  handleSetUserName = (username: string): void => {
    this.props.setUsername(username)
  }

  handleSetRoles = (roles: Role[]) => {
    this.props.setRoles(roles)
  }

  render(): React.ReactNode {
    const {userData} = this.state
    const isUserExists: boolean = userData.id !== 0

    return (
      <div className="user-component-container">
        <span className="user-admin-component-header">User Data</span>
        {
          isUserExists &&

          <React.Fragment>
            <span>
            <span className="property">User id: </span>{userData.id}
            </span>
            <span>
            <span className="property">Username: </span>{userData.username}
            </span>
            <span>
            <span className="property">Email: </span>{userData.email}
            </span>
            <span className="property">Roles:</span>
            {
              userData.roles.map((value: Role, index: number) => {
                return <li key={index}>{value.name}</li>
              })
            }
          </React.Fragment>
        }
      </div>
    )
  }

}
