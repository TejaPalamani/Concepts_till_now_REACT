import Loader from 'react-loader-spinner'

import {Component} from 'react'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {loader: true, fetchedData: []}

  componentDidMount() {
    this.fetchingDataFromServer()
  }

  fetchingDataFromServer = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/ipl')
      const data = await response.json()
      console.log(data)
      const filteredData = data.teams.map(each => ({
        id: each.id,
        name: each.name,
        teamImageUrl: each.team_image_url,
      }))
      this.setState({fetchedData: filteredData, loader: false})
    } catch (error) {
      console.log(error.message)
      this.setState({loader: false})
    }
  }

  renderingElements = fetchedData => (
    <div className="bg-card">
      <div className="main_logo_card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
          alt="ipl logo"
          className="iplLogo"
        />
        <h1>IPL DashBoard</h1>
      </div>
      <ul className="teamCardHolder">
        {fetchedData.map(each => (
          <TeamCard classCheck="teamCard" cardDetails={each} key={each.id} />
        ))}
      </ul>
    </div>
  )

  render() {
    const {loader, fetchedData} = this.state
    console.log(fetchedData)

    return loader ? (
      <div className="bg-card1" testid="loader">
        <Loader type="TailSpin" width={50} height={50} />
      </div>
    ) : (
      this.renderingElements(fetchedData)
    )
  }
}

export default Home
