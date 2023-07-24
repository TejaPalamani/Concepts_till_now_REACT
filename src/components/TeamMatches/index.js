import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {loader: true, latestMatches: {}, recentMatches: [], colorClass: ''}

  componentDidMount() {
    this.mountingData()
  }

  mountingData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const data = await response.json()
      const backgroundColor = {}
      this.teamBanner = data.team_banner_url
      const l = data.latest_match_details
      const latest = {
        competingTeam: l.competing_team,
        competingTeamLogo: l.competing_team_logo,
        date: l.date,
        firstInnings: l.first_innings,
        manOfTheMatch: l.man_of_the_match,
        id: l.id,
        matchStatus: l.match_status,
        result: l.result,
        secondInnings: l.second_innings,
        umpires: l.umpires,
        venue: l.venue,
      }

      const recent = data.recent_matches.map(each => ({
        id: each.id,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      }))
      this.setState({
        loader: false,
        latestMatches: latest,
        recentMatches: recent,
        colorClass: id,
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  render() {
    const {loader, latestMatches, recentMatches, colorClass} = this.state
    console.log(latestMatches)
    return loader ? (
      <div className="bg-card1" testid="loader">
        <Loader height={50} width={50} />
      </div>
    ) : (
      <div className={`${colorClass} t`}>
        <img src={this.teamBanner} alt="team banner" />
        <LatestMatch
          latestMatchDetails={latestMatches}
          key={latestMatches.id}
        />
        <ul className="check">
          {recentMatches.map(each => (
            <MatchCard recentMatchDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
