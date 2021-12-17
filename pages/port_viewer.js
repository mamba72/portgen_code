import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from "next/router"; //importing for getting search queries


import { supabase } from '../utils/supabaseClient'
import { Auth, Button } from '@supabase/ui'
import ProjectCard from '../components/ProjectCard'
import React, { useEffect } from 'react';
import MyHeader from '../components/MyHeader';
import {HelperClass} from '../utils/GlobalFunct';
import { useUser } from '../context/UserContext';
import MyFooter from '../components/MyFooter';
import UserBioSection from '../components/UserBioSection';

export default function port_viewer() {
    const router = useRouter();//used to get the search query
    let [GitName, setGitName] = useState("");
    let [GitRepos, setGitRepos] = useState("");
	let [foundUser, setFoundUser] = useState(false);
    let [loading, setLoading] = useState(true);
	let [starred, setStarred] = useState([]);

    const {user, setUser} = useUser();
	

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
		
        setGitName(query.get('gitName'));
        console.log("GitName: ", userName);
		await GetGitHubRepos(userName);
        return userName;
    }

    const GetGitHubRepos = async (userName) => {

        let fetchReponse = await fetch(`https://api.github.com/users/${userName}/repos`);
        let jsonResponse = await fetchReponse.json();

        jsonResponse.sort(function(a,b) { return ConvertStringToDate(b.updated_at) - ConvertStringToDate(a.updated_at)});

		setGitRepos(jsonResponse);

		console.log(jsonResponse);

		setLoading(false);

		//tell the system that the user was found
        if(jsonResponse.message != 'Not Found')
        {
            setFoundUser(true);
			//if they have more than one repo, get the starred repos
			if(jsonResponse.length > 0)
				GetStarredRepos(userName);
        }

	}

    // const GetCssRoot = () => { return document.querySelector(':root');}


	const GetStarredRepos = async (userName) => {
		let fetchReponse = await fetch(`https://api.github.com/users/${userName}/starred`);
        let jsonResponse = await fetchReponse.json();
		setStarred(jsonResponse);
	}

	const IsStarred = (repoID) => {

		for(let i = 0; i < starred.length; ++i)
		{
			if(starred[i].id == repoID)
			{
				return true;
			}
				
		}
		
		return false;
	}

      const ConvertStringToDate = (input) => {
          return new Date(input);
      }

      const TitleToDisplay = () => {
        // ChangeTitleColor('white');

          if(loading) //loading
          {
              return (<h1 className='title'>Searching For {GitName}'s Profile</h1>);
          }else if(!foundUser) // did not find user and not loading
          {
              return (<h1 className='title'>{GitName}'s Profile Doesn't Exist</h1>);
          }else //this is for if found user
          {
              return (
				<h1 className="title">
					Welcome to <a href={`https://github.com/${GitName}`} target="_blank">
						{GitName}'s Profile!</a>
				</h1>
			  )
          }
      }


	  useEffect(() => { 
		  GetGitNameFromQuery();
          console.log("User: ", user);
	  }, []);


    return (
        <div className="container">

            <Head>
                <title>PortGen</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MyHeader/>

            <main>

				{TitleToDisplay()}

				<UserBioSection GitName={GitName} repos={GitRepos}/>
                
                {(GitRepos.length != 0) && (
                    <h4>Total Number of Public Repositories: {GitRepos.length}</h4>
                )}
                
                {(GitRepos.length != 0) ? (
                    <section className="proj-section">
                        {GitRepos.map(repo => (
                            <ProjectCard repo={repo} starred={IsStarred(repo.id)}/>
                        ))}
                    </section>
                ): (
                        <section>
                            <h3>The webpage is searching for the user... please wait</h3>
                        </section>
                )}

            </main>

            
            
            

            <MyFooter/>
            
            
        </div>
    )
}