import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import Cookies from 'js-cookie'

import {societyAtom } from '../../atom/societyAtom.jsx'

const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get("token");


const ShowSociety = () => {

  


  return (
    <div>
      <h1>Ceci est la page show des sociétés</h1>

      {societyData ?  (
        <>
          Identifiant: {societyData.id}<br/>
          Name: {societyData.name}<br/>
          Address:{societyData.adress}<br/>
          Zip Code: {societyData.zip}<br/>
          City: {societyData.city}<br/>
          Country: {societyData.country}<br/>
          Siret n°: {societyData.siret}<br/>
          Status: {societyData.status}<br/>
          Email: {societyData.email}<br/>
          Capital: {societyData.capital}
        </>
      ) : (
        <p>No societies available</p>
      )}


    </div>
  )
}

export default ShowSociety;


