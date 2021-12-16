import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import { useUser } from '../context/UserContext'
import MyHeader from '../components/MyHeader'
import { HelperClass } from '../utils/GlobalFunct'

export default function Login()
{
    //gets the logged in user from Auth.UserContextProvider (the parent object in the _app.js file)
	//if no user is logged in, user will be Null
	const { supaUser } = Auth.useUser();
	
	const { user, setUser } = useUser();

  

	return (
		<div className='container'>
      <Head>
        <title>PortGen Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MyHeader/>

      <main>
      
        {/* if(user != null) display GratitudeApp; else display auth; */}
        { HelperClass.IsLoggedIn() ? ( <div>
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
            // where the actual login stuff is
            <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" redirectTo='/'/>
            
          )}

        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel" className="logo" />
          </a>
      </footer>
		</div>
	)


}