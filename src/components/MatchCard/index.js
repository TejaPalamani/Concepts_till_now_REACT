import './index.css'

const MatchCard = props => {
  const {recentMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    id,
    matchStatus,
    result,
    secondInnings,
    umpires,
    venue,
  } = recentMatchDetails
  return (
    <li className="listItem">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="logoCheck"
      />
      <h1>{competingTeam}</h1>
      <p>{result}</p>
      {matchStatus === 'Lost' ? (
        <p className="lost">Lost</p>
      ) : (
        <p className="win">Win</p>
      )}
    </li>
  )
}

export default MatchCard
