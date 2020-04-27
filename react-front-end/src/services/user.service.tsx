import axios from 'axios'
import { Util } from '../utils/Util'
import { AuthorizationService } from './authorization.service'

export class UserService {

  urls

  constructor() {
    this.urls = Util.getUrls()
  }

  getPublicContent(): Promise<any> {
    const url: string = `${this.getUrlStart()}${this.urls.getPublicContent}`
    return axios.get(url)
  }

  getUserDetails(userId: number): Promise<any> {
    const url: string = `${this.getUrlStart()}${this.urls.getUserDetails}/${userId}`
    return axios.get(url, {headers: AuthorizationService.getAuthorizationHeader()})
  }

  getAdminInformation(): Promise<any> {
    const url: string = `${this.getUrlStart()}${this.urls.getAdminData}`
    return axios.get(url, {headers: AuthorizationService.getAuthorizationHeader()})
  }

  getUrlStart(): string {
    return this.urls.host + this.urls.apiRoot
  }

}
