import React from 'react';
import { Link } from 'react-router-dom';

import '../../pages/society/society.scss';

function NewSociety () {


    return (

      <div>
        <Link to="/societies/create" className="buttonnewsociety">New society</Link>
      </div>
    )
  
}

export default NewSociety;