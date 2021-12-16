import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'


import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
// import Input from '../components/Input' 
import { useRouter } from "next/router";
import MyHeader from '../components/MyHeader'
// import { HelperClass } from '../utils/GlobalFunct'
import { useUser } from '../context/UserContext'
import React, { useEffect } from 'react';
import MyFooter from '../components/MyFooter'

export default function Home() {
	const router = useRouter();

	
	// const EnteredUserName = (entry) => {
	// 	setGitName(entry);
	// 	console.log("Received Github Username: " + gitName);
	// 	ViewProfile(entry);
	// }

	const ViewProfile = () => {
		let pathName = '/port_viewer';
		let searchQuery = 'gitName=' + "mamba72";
		router.push({pathname: pathName, search: searchQuery});
	}

  



  return (
    <div className="container">
      <Head>
        <title>PortGen About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MyHeader/>

      <main>
        <h1 className="title">
          Welcome to <a>PortGen</a>!
        </h1>
        <br/>
        <section className='about-section'>

          <div className='left-column'>
            <img src="/images/MeAndMom.jpg"/>
			<img src='/images/MyFamily.jpg'/>
          </div>
          <div className='right-column'>
            <h2 className='text-xl'>My Name is Stephen White. Let me tell you about myself!</h2>
			<ul style={{listStyleType:"circle"}}>
				<li><h3 className='font-semibold'>My Education</h3></li>
				<ul style={{listStyleType:"circle"}} className='ml-8'>
					<li>I am a Computer Science major at Chapman University</li>
					<li>I am minoring in Business Administration</li>
					<li>I graduated from Oaks Christian High School in 2018</li>
					<li><a href='/port_viewer?gitName=mamba72' target="_blank">My GitHub Username is mamba72 (click me)</a></li>
				</ul>
				<li><h3 className='font-semibold'>My Home and Family</h3></li>
				<ul style={{listStyleType:"circle"}} className='ml-8'>
					<li>I grew up and live in the Thousand Oaks area</li>
					<li>To the left in the first photo, you will see my mom and me</li>
					<li>In the second photo, you will see my family and me</li>
				</ul>
				<li><h3 className='font-semibold'>Goal of this website</h3></li>
				<ul style={{listStyleType:"circle"}} className='ml-8'>
					<li>Create a place where non-techinical users can easily view GitHub Repositories</li>
					<li>This site is an Automatic Portfolio Generator, hence the name PortGen</li>
					<li>After recieving a GitHub username, it gathers their public repos and displays them in a readable format</li>
					<li>Have a place I can use as my "Portfolio"</li>
					<li>Have some fun and challenge myself</li>
					<li>This was also the final project for my Web Engineering class</li>
				</ul>
				
				<li><h3 className='font-semibold'>
					<Link href="https://www.linkedin.com/in/stephenwhite-softwareengineer/">Contact me via LinkedIn to learn more!</Link>
				</h3></li>
			</ul>
          </div>
          


        </section>

        
        <br/>
        {/* <Input handleSubmit={EnteredUserName} buttonText="Find User"></Input> */}

		
        
        
      </main>

      <MyFooter/>

      
    </div>
  )
}
