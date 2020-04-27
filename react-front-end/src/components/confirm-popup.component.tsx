import * as React from 'react'
import { PopupText } from '../models/popup-text.model'
import '../styles/confirm-popup-component.style.css'

export interface ConfirmPopupProps {
  confirmAction?: VoidFunction
  closePopup: VoidFunction
  popupText: PopupText
  isPopupVisible: boolean
}

export interface ConfirmPopupStates {
}

export class ConfirmPopupComponent
  extends React.Component<ConfirmPopupProps, ConfirmPopupStates> {

  handleClosePopup = () => {
    this.props.closePopup()
  }

  handleConfirmAction = () => {
    if (this.props.confirmAction) {
      this.props.confirmAction()
    }
  }

  render() {
    const {
      popupText,
      isPopupVisible
    } = this.props

    return (
      <React.Fragment>
        {
          isPopupVisible &&

          <div className="confirm-popup">
            <div className="popup-title">
              {popupText.header}
            </div>
            <p className="popup-message">
              {popupText.body}
            </p>
            <div className="popup-button-container">
              {
                this.props.confirmAction !== undefined &&

                <button
                  className="poupup-confirm-action-button"
                  onClick={this.handleConfirmAction}
                >
                  {popupText.confirmButton}
                </button>
              }
              {
                popupText.cancelButton &&

                <button
                  className="popup-footer-cancel-button"
                  onClick={this.handleClosePopup}
                >
                  {popupText.cancelButton}
                </button>
              }
            </div>
          </div>
        }
      </React.Fragment>
    )
  }

}
