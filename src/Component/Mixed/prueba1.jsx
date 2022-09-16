import React from 'react'
import Prueba2 from './prueba2'
import Prueba3 from './prueba3'

import firebaseApp from '../../Credential/index'
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(firebaseApp)

function prueba1({user}) {
  return (
    <div>
      <button onClick ={() => signOut(auth)}>Cerrar session</button> <br/>

      {user.rol === "user" ? <Prueba2 /> : <Prueba3 /> }
    </div>
  )
}

export default prueba1
