// _app.js
import 'tailwindcss/tailwind.css'
// import { supabase } from './utils/supabaseClient'
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import '../styles/globals.css'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'


function MyApp({ Component, pageProps }) {

	const [user, setUser] = useState({
		name:"Stephen",
		supaUser: Auth.useUser()
	})

	const userValue = {
		user, setUser
	}

  return (
	  <UserContext.Provider value={userValue}>
		{/* I'm the new part! I send a user object to all components */}
		<Auth.UserContextProvider supabaseClient={supabase}>
			<Component {...pageProps} />
		</Auth.UserContextProvider>
	  </UserContext.Provider>
		
  )
}

export default MyApp