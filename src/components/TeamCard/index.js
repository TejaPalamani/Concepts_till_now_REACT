import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {classCheck, cardDetails} = props
  const {id, name, teamImageUrl} = cardDetails
  return (
    <Link to={`/team-matches/${id}`} className="under_line">
      <li className={classCheck}>
        <img src={teamImageUrl} alt={name} className="teams_image_logo" />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
