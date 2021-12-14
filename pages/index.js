import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'


import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import Input from '../components/Input' 
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	const [gitName, setGitName] = useState("");
  const supaUser = Auth.useUser();

	
	const EnteredUserName = (entry) => {
		setGitName(entry);
		console.log("Received Github Username: " + gitName);
		ViewProfile(entry);
	}

	const ViewProfile = (username) => {
		let pathName = '/port_viewer';
		let searchQuery = 'gitName=' + username;
		router.push({pathname: pathName, search: searchQuery});
	}

  // supabase stuff

  const IsLoggedIn = () => {
    console.log(supaUser);
    return supaUser;
  }
  


  return (
    <div className="container">
      <Head>
        <title>PortGen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <hr className='header-stripe'/>
      <header>
        
      </header>

      <main>

        { IsLoggedIn() ? (<p>user is logged in</p>) : (<p>User is not logged in</p>)}

        <h1 className="title">
          Welcome to <a>PortGen</a>
        </h1>

        <h2>Either Input a Github Username below, or log into your account</h2>
        <Input handleSubmit={EnteredUserName} buttonText="Find User"></Input>

		{/* this will be a section for the button to view the profile of the user */}
		<div>
			{ (gitName != "") ? (
				
				<div>
					{/* in here will be a link */}
					{/* <button onClick={ViewProfile}>Click to View Profile</button> */}
					<Link href={'/port_viewer?gitName=' + gitName}>Click to View Profile</Link>
				</div>
			) :
			(<div> </div>)

				
			}
		</div>
        
        
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
