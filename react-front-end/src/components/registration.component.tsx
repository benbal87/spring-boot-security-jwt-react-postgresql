import * as React from 'react'
import { createRef } from 'react'
import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { Routes } from '../constants/routes.enum'
import { PopupText } from '../models/popup-text.model'
import { PopupType } from '../models/popup-type.enum'
import { AuthenticationService } from '../services/authentication.service'
import { Util } from '../utils/Util'
import { ConfirmPopupComponent } from './confirm-popup.component'

export interface RegistrationComponentProps {
  history: any
}

export interface RegistrationComponentStates {
  username: string
  email: string
  password: string
  isPopupVisible: boolean
  popupType: PopupType
}

export class RegistrationComponent
  extends React.Component<RegistrationComponentProps, RegistrationComponentStates> {

  authenticationService
  checkButtonRef: React.ElementRef<CheckButton>
  formRef: React.ElementRef<Form>

  constructor(props: RegistrationComponentProps) {
    super(props)

    this.authenticationService = new AuthenticationService()
    this.checkButtonRef = createRef<HTMLInputElement>()
    this.formRef = createRef<HTMLInputElement>()

    this.state = {
      username: '',
      email: '',
      password: '',
      isPopupVisible: false,
      popupType: PopupType.REGISTRATION_CONFIRMATION
    }
  }

  onUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  navigateToLogin = () => {
    this.toggleRegistrationConfirmPopup(this.props.history.push(Routes.LOGIN))
  }

  toggleRegistrationConfirmPopup = (callback?: VoidFunction) => {
    this.setState(
      prevState => (
        {isPopupVisible: !prevState.isPopupVisible}
      ),
      () => {
        if (callback !== undefined) {
          callback()
        }
      }
    )
  }

  handleRegistration = (event) => {
    event.preventDefault()

    this.setState({
      isPopupVisible: false
    })

    this.formRef.validateAll()

    const {username, email, password} = this.state
    if (this.checkButtonRef.context._errors.length === 0) {
      this.authenticationService.registerUser(username, email, password)
        .then(
          response => {
            if (response.data.id !== undefined) {
              this.setState({
                popupType: PopupType.REGISTRATION_CONFIRMATION,
                isPopupVisible: true
              })
            }
          },
          error => {
            const errorMessage =
              (error.response && error.response.data && error.response.data.message) || error.message
              || error.toString()
            console.error(errorMessage)

            this.setState({
              popupType: PopupType.REGISTRATION_ERROR,
              isPopupVisible: true
            })
          }
        )
    }
  }

  createPopup = () => {
    const {
      popupType,
      isPopupVisible
    } = this.state

    const popupTextHelper = {
      [PopupType.REGISTRATION_CONFIRMATION]: this.getRegistrationConfirmPopupText,
      [PopupType.REGISTRATION_ERROR]: this.getRegistrationErrorConfirmPopupText
    }

    const popupActionConfirmedHelper = {
      [PopupType.REGISTRATION_CONFIRMATION]: this.navigateToLogin,
      [PopupType.REGISTRATION_ERROR]: undefined
    }

    const popupCloseHelper = {
      [PopupType.REGISTRATION_CONFIRMATION]: this.toggleRegistrationConfirmPopup,
      [PopupType.REGISTRATION_ERROR]: this.toggleRegistrationConfirmPopup
    }

    const popupText = popupTextHelper[popupType]()
    const confirmAction = popupActionConfirmedHelper[popupType]
    const closePopup = popupCloseHelper[popupType]

    return (
      <ConfirmPopupComponent
        confirmAction={confirmAction}
        closePopup={closePopup}
        popupText={popupText}
        isPopupVisible={isPopupVisible}
      />
    )
  }

  getRegistrationConfirmPopupText = (): PopupText => {
    return {
      header: 'Success!',
      body: 'Congratulations! You have registered successfully!',
      cancelButton: 'Cancel',
      confirmButton: 'Login'
    }
  }

  getRegistrationErrorConfirmPopupText = (): PopupText => {
    return {
      header: 'Error!',
      body: 'Something went wrong during the registration!',
      cancelButton: 'Cancel',
      confirmButton: undefined
    }
  }

  render() {
    const {
      username,
      email,
      password
    } = this.state

    return (
      <div className="log-reg-container">
        <Form
          onSubmit={this.handleRegistration}
          ref={c => this.formRef = c}
        >
          <div>
            <div className="log-reg-input-container">
              <label
                className="log-reg-input-label"
                htmlFor="username"
              >
                Username
              </label>
              <Input
                type="text"
                className="log-reg-input"
                name="username"
                value={username}
                onChange={this.onUsernameChange}
                validations={[Util.validateIfFieldIsFilled, Util.validateUsername]}
              />
            </div>

            <div className="log-reg-input-container">
              <label
                className="log-reg-input-label"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                type="text"
                className="log-reg-input"
                name="email"
                value={email}
                onChange={this.onEmailChange}
                validations={[Util.validateIfFieldIsFilled, Util.validateEmail]}
              />
            </div>

            <div className="log-reg-input-container">
              <label
                className="log-reg-input-label"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                type="password"
                className="log-reg-input"
                name="password"
                value={password}
                onChange={this.onPasswordChange}
                validations={[Util.validateIfFieldIsFilled, Util.validatePassword]}
              />
            </div>

            <button className="log-reg-button">
              Sign Up
            </button>
          </div>

          <CheckButton
            style={{display: 'none'}}
            ref={c => this.checkButtonRef = c}
          />

          {
            this.createPopup()
          }
        </Form>
      </div>
    )
  }
}
