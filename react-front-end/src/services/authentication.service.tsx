import axios from 'axios'
import { Constants } from '../constants/constants'
import { Roles } from '../constants/roles.enum'
import { LoginRequest } from '../models/login-request.model'
import { RegistrationRequest } from '../models/registration-request.model'
import { UserData } from '../models/userdata.model'
import { Util } from '../utils/Util'

export class AuthenticationService {

  urls

  constructor() {
    this.urls = Util.getUrls()
  }

  getPublicContent() {
    const url: string = `${this.getUrlStart()}${this.urls.getPublicContent}`
    return axios.get(url)
  }

  registerUser(username: string, email: string, password: string): Promise<any> {
    const url: string = `${this.getUrlStart()}${this.urls.registration}`
    const requestData: RegistrationRequest = {
      username: username,
      email: email,
      password: password,
      roles: [Roles.ROLE_USER.toString()]
    }

    return axios.post(url, requestData)
  }

  loginUser(username: string, password: string): Promise<any> {
    const url: string = `${this.getUrlStart()}${this.urls.login}`
    const requestData: LoginRequest = {
      username: username,
      password: password
    }

    return axios.post(url, requestData)
  }

  logout(): void {
    localStorage.removeItem(Constants.LOCAL_STORAGE_USER_DATA)
  }

  getCurrentUser(): UserData {
    return Util.getParsedDataFromLocalStorage(Constants.LOCAL_STORAGE_USER_DATA)
  }

  getUrlStart(): string {
    return this.urls.host + this.urls.apiRoot
  }

}
