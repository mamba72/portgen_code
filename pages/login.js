import { useState } from 'react'

import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import { useUser } from '../context/UserContext'

export default function Login()
{
    //gets the logged in user from Auth.UserContextProvider (the parent object in the _app.js file)
	//if no user is logged in, user will be Null
	const { supaUser } = Auth.useUser();
	
	const { user, setUser } = useUser();




	return (
		<div>
			 {/* if(user != null) display GratitudeApp; else display auth; */}
			 { user ? ( <div>
            <p>Hello, you are on the login page</p>

            <button className="text-pink-300" onClick={ async () => { 
              let { error } = await supabase.auth.signOut()
              if(error) { console.log(error)}
              }
            }>
              Logout
            </button>
          </div>
        ) : (
          
            <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" />
          
        )}
		</div>
	)


}