import * as React from 'react'
import { createRef } from 'react'
import CheckButton from 'react-validation/build/button'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import { Constants } from '../constants/constants'
import { Routes } from '../constants/routes.enum'
import { LoginResponse } from '../models/login-response.model'
import { AuthenticationService } from '../services/authentication.service'
import '../styles/login-component.style.css'
import { Util } from '../utils/Util'

export interface LoginComponentProps {
  history: string[]
}

export interface LoginComponentStates {
  username: string
  password: string
  loading: boolean
  message: string
}

export class LoginComponent
  extends React.Component<LoginComponentProps, LoginComponentStates> {

  authenticationService
  checkButtonRef: React.ElementRef<CheckButton>
  formRef: React.ElementRef<Form>

  constructor(props: LoginComponentProps) {
    super(props)

    this.authenticationService = new AuthenticationService()
    this.checkButtonRef = createRef<HTMLInputElement>()
    this.formRef = createRef<HTMLInputElement>()

    this.state = {
      username: '',
      password: '',
      loading: false,
      message: ''
    }
  }

  onChangeUsername = (event): void => {
    this.setState({username: event.target.value})
  }

  onChangePassword = (event): void => {
    this.setState({password: event.target.value})
  }

  handleLogin = (event): void => {
    event.preventDefault()

    this.setState(
      {
        message: '',
        loading: true
      },
      () => {
        this.formRef.validateAll()

        if (this.checkButtonRef.context._errors.length === 0) {
          this.authenticationService.loginUser(this.state.username, this.state.password).then(
            response => {
              const loginResponse: LoginResponse = response.data
              if (loginResponse.jwtToken) {
                localStorage.setItem(Constants.LOCAL_STORAGE_USER_DATA, JSON.stringify(loginResponse))
              }
              this.props.history.push(Routes.USER)
            },
            error => {
              const errorMessage =
                (error.response && error.response.data && error.response.data.message) || error.message
                || error.toString()

              this.setState({
                loading: false,
                message: errorMessage
              })
            }
          )
        } else {
          this.setState({
            loading: false
          })
        }
      }
    )
  }

  render() {
    return (
      <div className="log-reg-container">
        <Form
          onSubmit={this.handleLogin}
          ref={c => this.formRef = c}
        >

          <div className="log-reg-input-container">
            <label
              className="log-reg-input-container-label"
              htmlFor="username"
            >
              Username
            </label>
            <Input
              type="text"
              className="log-reg-input"
              name="username"
              value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[Util.validateIfFieldIsFilled]}
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
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[Util.validateIfFieldIsFilled]}
            />
          </div>

          <button
            className="log-reg-button"
            disabled={this.state.loading}
          >
            Login
          </button>

          <CheckButton
            style={{display: 'none'}}
            ref={c => this.checkButtonRef = c}
          />

        </Form>
      </div>
    )
  }

}
