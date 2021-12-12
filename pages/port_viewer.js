import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from "next/router"; //importing for getting search queries


import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import ProjectCard from '../components/ProjectCard'
import React, { useEffect } from 'react';

export default function port_viewer() {
    const router = useRouter();//used to get the search query
    let [GitName, setGitName] = useState("");
    let [GitRepos, setGitRepos] = useState("");
	let foundUser = false;
	// const location = window.location;
    // const query = new URLSearchParams(location.search);
	

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
        
    }

    const GetGitHubRepos = async (userName) => {

        let fetchReponse = await fetch(`https://api.github.com/users/${userName}/repos`);
        let jsonResponse = await fetchReponse.json();

        jsonResponse.sort(function(a,b) { return ConvertStringToDate(b.updated_at) - ConvertStringToDate(a.updated_at)});

		setGitRepos(jsonResponse);

		console.log(jsonResponse);
      }

      const ConvertStringToDate = (input) => {
          return new Date(input);
      }


	  useEffect(() => { 
		  GetGitNameFromQuery();
	  }, []);




    return (
        <div className="container">

            <Head>
                <title>PortGen</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="viewer-header">
				<h3>Home</h3>
				<h3>Log Out</h3>
            </header>

            <main>
                <h1 className="title">
                    Welcome to <a>{GitName}'s Profile!</a>
                </h1>

                
                {(GitRepos.length != 0) ? (
                    <section className="proj-section">
                        {GitRepos.map(repo => (
                            <ProjectCard repo={repo}/>
                        ))}
                    </section>
                ): (
                        <section>
                            {/* tell the user that the page is loading the repos */}
                        </section>
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