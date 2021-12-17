import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import { useUser } from '../context/UserContext'
import MyHeader from '../components/MyHeader'
import { HelperClass } from '../utils/GlobalFunct'
import { useRouter } from "next/router";
import Input from '../components/Input'
import React, { useEffect } from 'react';
import ProfileInputForm from '../components/ProfileInputForm'

export default function my_profile()
{
	const [supaBio, setSupaBio] = useState("");

    // const [name, setName] = useState();
	// const [schoolName, setSchoolName] = useState();
	// const [major, setMajor] = useState();
	// const [minor, setMinor] = useState();
	// const [gradYear, setGradYear] = useState(2022);
	// const [gitName, setGitName] = useState("mamba72");

	const { supaUser } = Auth.useUser();
	
	const { user, setUser } = useUser();

  	const router = useRouter();

	const UpdateSupaBio = async () => {
		let newBio = await HelperClass.GetUserBio(supabase.auth.currentUser.id);
		if(newBio)
		{
			console.log("New Bio: ", newBio);
			console.log("New Bio Name: ", newBio.Name);
			setSupaBio(newBio);
			// setName(newBio.name);
		}
		
	}

  

  const SubmitInfo = async ({name,schoolName,major,minor,gradYear,gitName}) => {

	  console.log("Submit Info was called");
	  //if they already have a profile, just update their info,
	  console.log("Val of User Has Profile: ", HelperClass.UserHasProfile());
	if(await HelperClass.UserHasProfile())
	{
		console.log("User already has profile, updating");

		await HelperClass.UpdateUserProfile(supabase.auth.currentUser.id, name, schoolName,major,minor,gradYear,gitName);


	}//else, create a new row
	else {
		console.log("User Supa: ", user["supaUser"]);
		await HelperClass.CreateUserBio(supabase.auth.currentUser.id,name, schoolName,major,minor,gradYear,gitName);
	}
  }

  	const DisableGitChange = () => {
		  if(supaBio.GitName)
			return true;
		  else return false;
	  }

	//   const InsertSupaUser = () => {
	// 	if(typeof user["supaUser"] == 'undefined')
	// 	{
	// 		setUser({
	// 			name: user["name"],
	// 			supaUser: supaUser
	// 		});
	// 	}

	// 	console.log("User: ", user);
	//   }

	  useEffect(() => { 

		UpdateSupaBio();
		
		if(typeof user["supaUser"] == 'undefined')
		{
			setUser({
				name: user["name"],
				supaUser: supaUser
			});
		}

  }, []);


	return (
		<div className='container'>
      <Head>
        <title>PortGen Profile</title>
        <link rel="icon" href="/favicon.ico" />

		{/* {InsertSupaUser()} */}

      </Head>

      <MyHeader/>

      <main>
      
        {/* if(user != null) display GratitudeApp; else display auth; */}
        { HelperClass.IsLoggedIn() ? ( 
          <div className='profile-viewer'>

            <h2 className='title'>Your Profile</h2>

			<ProfileInputForm handleSubmit={SubmitInfo} curVals={supaBio}/>

            {/* Name */}
            {/* <Input value={supaBio.Name} type="text" handleSubmit={setName} placeholder="Name" className="prof-input"/> */}
            {/* SchoolName */}
            {/* <Input value={supaBio.SchoolName} type="text" handleSubmit={setSchoolName} placeholder="School Name" className="prof-input"/> */}
            {/* Name */}
            {/* <Input value={supaBio.Major} type="text" handleSubmit={setMajor} placeholder="Major" className="prof-input"/> */}
            {/* Name */}
            {/* <Input value={supaBio.Minor} type="text" handleSubmit={setMinor} placeholder="Minor" className="prof-input"/> */}
            {/* Name */}
            {/* <Input value={supaBio.GradYear} type="number" handleSubmit={setGradYear} placeholder="Graduation Year" className="prof-input"/> */}
			{/* Name */}
            {/* <Input value={supaBio.GitName} type="text" handleSubmit={setGitName} placeholder="GitHub UserName" 
				className="prof-input" disabledSubmit={DisableGitChange()}/>
			
			<button className='submit-info-button' onClick={SubmitInfo}>Done</button> */}
			<br/>
              <button className="text-pink-300" onClick={ async () => { 
                let { error } = await supabase.auth.signOut()
                if(error) { console.log(error)}
                }
              }>
                Logout
              </button>
            </div>
          ) : (

            <h1>You are not logged in, please go to the login page.</h1>
            // where the actual login stuff is
            // <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge" redirectTo='/'/>
            
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