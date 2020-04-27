import * as React from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { AdminInformation } from '../models/admin-information.model'
import { Role } from '../models/role.model'
import { UserService } from '../services/user.service'
import '../styles/admin-component.style.css'
import { Util } from '../utils/Util'

export interface AdminComponentProps {
  history: any
  setUsername: (username: string) => void
  setRoles: (roles: Role[]) => void
}

export interface AdminComponentStates {
  adminInformation: AdminInformation
}

export class AdminComponent
  extends React.Component<AdminComponentProps, AdminComponentStates> {

  userService

  constructor(props: AdminComponentProps) {
    super(props)
    this.userService = new UserService()

    this.state = {
      adminInformation: {
        numberOfUsers: -1,
        userStatisticsList: []

      }
    }
  }

  componentDidMount(): void {
    console.log('Admin Component Get Admin Information')
    this.userService.getAdminInformation().then(response => {
      const adminInformation: AdminInformation = response.data
      if (adminInformation) {
        console.log('AdminInformation: ', adminInformation)
        this.setState(
          {adminInformation: adminInformation},
          () => {
            Util.refreshData(this.userService, this.handleSetUserName, this.handleSetRoles)
          }
        )
      }
    })
  }

  handleSetUserName = (username: string): void => {
    this.props.setUsername(username)
  }

  handleSetRoles = (roles: Role[]) => {
    this.props.setRoles(roles)
  }

  doChart = () => {
    const data = this.state.adminInformation.userStatisticsList
    let size = {
      width: 730,
      height: 300
    }

    if (window.innerWidth <= 760) {
      size.width = 400
      size.height = 300
    }

    return (
      <AreaChart
        className="chart"
        width={size.width}
        height={size.height}
        data={data}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}
      >
        <defs>
          <linearGradient
            id="colorUv"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#8884d8"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="#8884d8"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="statDate" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="numberOfLogins"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    )
  }

  render(): React.ReactNode {
    const {
      numberOfUsers,
      userStatisticsList
    } = this.state.adminInformation
    console.log('userStatisticList', userStatisticsList)

    return (
      <React.Fragment>
        {
          numberOfUsers > 0 &&

          <div className="admin-container">
            <span className="user-admin-component-header">Admin Information</span>
            <span>Number of users: {numberOfUsers}</span>

            {
              this.doChart()
            }

            <span>This chart represents the number of logins per day by users.</span>
          </div>
        }
      </React.Fragment>
    )
  }

}
