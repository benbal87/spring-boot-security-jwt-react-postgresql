import { Constants } from '../constants/constants'
import { AuthorizationHeader } from '../models/authorization-header.model'
import { LoginResponse } from '../models/login-response.model'
import { Util } from '../utils/Util'

export class AuthorizationService {

  static getAuthorizationHeader(): AuthorizationHeader {
    let loginResponse: LoginResponse = Util.getParsedDataFromLocalStorage(Constants.LOCAL_STORAGE_USER_DATA)

    if (loginResponse && loginResponse.jwtToken) {
      return {Authorization: loginResponse.type + ' ' + loginResponse.jwtToken}
    } else {
      return {Authorization: ''}
    }
  }

}
