import * as React from 'react'
import { isEmail } from 'validator'
import { Constants } from '../constants/constants'
import data from '../data/data.json'
import { LoginResponse } from '../models/login-response.model'
import { UserData } from '../models/userdata.model'

export class Util {

  static getParsedDataFromLocalStorage = (localStorageKey: string): any => {
    let data = localStorage.getItem(localStorageKey)
    console.log('data', data)
    return data == null ? undefined : JSON.parse(data)
  }

  static getUrls = () => {
    return data[0].apiEndpoints
  }

  static validateIfFieldIsFilled = (value) => {
    if (!value) {
      return (
        <div
          className="form-validator-error-text"
          role="alert"
        >
          This field is required!
        </div>
      )
    }
  }

  static validateEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div
          className="form-validator-error-text"
          role="alert"
        >
          This is not a valid email.
        </div>
      )
    }
  }

  static validateUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div
          className="form-validator-error-text"
          role="alert"
        >
          The username must be between 3 and 20 characters.
        </div>
      )
    }
  }

  static validatePassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div
          className="form-validator-error-text"
          role="alert"
        >
          The password must be between 6 and 40 characters.
        </div>
      )
    }
  }

  static refreshData = (
    userService,
    handleSetUserName,
    handleSetRoles
  ) => {
    let loginResponse: LoginResponse = Util.getParsedDataFromLocalStorage(Constants.LOCAL_STORAGE_USER_DATA)
    if (loginResponse) {
      userService.getUserDetails(loginResponse.id).then(response => {
        if (response) {
          const userData: UserData = response.data
          handleSetUserName(userData.username)
          handleSetRoles(userData.roles)
        }
      })
    }
  }

}
