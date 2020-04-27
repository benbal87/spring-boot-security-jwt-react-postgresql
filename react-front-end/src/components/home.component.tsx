import * as React from 'react'
import { PublicContent } from '../models/public-content.model'
import { AuthenticationService } from '../services/authentication.service'
import '../styles/home-component.style.css'

export interface HomeComponentProps {
}

export interface HomeComponentStates {
  contentHeader: string
  description: string
}

export class HomeComponent
  extends React.Component<HomeComponentProps, HomeComponentStates> {

  authenticationService

  constructor(props: HomeComponentProps) {
    super(props)
    this.authenticationService = new AuthenticationService()

    this.state = {
      contentHeader: '',
      description: ''
    }
  }

  componentDidMount(): void {
    this.authenticationService.getPublicContent()
      .then(response => {
        const publicContent: PublicContent = response.data
        this.setState({
          contentHeader: publicContent.header,
          description: publicContent.description
        })
      })
  }

  render(): React.ReactNode {
    return (
      <div className="home-container">
        <span className="content-header">{this.state.contentHeader}</span>
        <span className="description">{this.state.description}</span>
      </div>
    )
  }

}
