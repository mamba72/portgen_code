// _app.js
import 'tailwindcss/tailwind.css'
// import { supabase } from './utils/supabaseClient'
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
		// {/* I'm the new part! I send a user object to all components */}
	  <Auth.UserContextProvider supabaseClient={supabase}>
	    <Component {...pageProps} />
	  </Auth.UserContextProvider>
  )
}

export default MyApp