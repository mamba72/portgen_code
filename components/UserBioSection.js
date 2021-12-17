import React, { useEffect } from 'react';
import { useState } from 'react'
import { HelperClass } from '../utils/GlobalFunct'
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'

export default function UserBioSection({repos, GitName}) {

    const [supaBio, setSupaBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [gitName, setGitName] = useState(GitName);

    const UpdateSupaBio = async () => {

        let userName = await GetGitNameFromQuery();

        console.log("gitName: ", userName);
		let newBio = await HelperClass.GetGitUserBio(userName);
		if(newBio)
		{
			console.log("New Bio: ", newBio);
			console.log("New Bio Name: ", newBio.Name);
			setSupaBio(newBio);
			// setName(newBio.name);
		}else {
            console.log("BasicInfo was Null");
        }
		
	}

    const GetGitNameFromQuery = async () =>
    {
		var query = new URLSearchParams(window.location.search);
		console.log(window.location.search);
		var userName = query.get('gitName');
		if(userName == undefined || userName == "")
		{
			console.log("No query. Returning");
			return;
		}

        setAvatarUrl(await HelperClass.GetGitAvatarUrl(userName));
		
        // setGitName(query.get('gitName'));
        console.log("GitName: ", userName);
		// await GetGitHubRepos(userName);
        return userName;
    }
    

    const PrintUserInfo = () => {
        // UpdateSupaBio();

        try 
        {
            if(supaBio)
            {
                return (
                    <section className='user-bio-section'>
                        <div className='left-section'>
                            
                            <img src={avatarUrl}/>
                            
                            
                        </div>
                        <div className='right-section'>
                            <h3>Name: {supaBio.Name}</h3>
                            <h3>School Name: {supaBio.SchoolName}</h3>
                            <h3>Major: {supaBio.Major}</h3>
                            <h3>Minor: {supaBio.Minor}</h3>
                            <h3>Graduation Year: {supaBio.GradYear}</h3>
            
                        </div>

                    </section>)
            }
        }catch(e)
        {
            console.log("Couldn't print supa bio");
            console.log(e);
            return (<p></p>)
        }
        
        return (<p></p>)
        
    }


    useEffect(() => { 

        // setGitName(GitName);
		UpdateSupaBio();
        try
        {
            if(repos.length > 0)
            {
                setAvatarUrl(repos[0].owner.avatar_url);
            }
        }catch{

        }
        
  }, []);

    return (
        
        PrintUserInfo()
    );

}