import Head from 'next/head'
import Link from 'next/Link'
import { useState } from 'react'
import { useRouter } from "next/router"; //importing for getting search queries

import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'

export default function port_viewer() {
    const { query } = useRouter(); //used to get the search query

    let GitName = "";

    const GetGitNameFromQuery = () =>
    {
        GitName = query.gitName;
    }

    const GetGitHubRepos = async () => {
        let request = require('request');
    
        let options =  {
            url: "https://api.github.com/users/:user",
            headers: {
                "User-Agent": "PortGen"  // Your Github ID or application name
            }
        }
    
        request.get(options)
            .on('response', function (response) {
                console.log(response.statusCode);
                console.log(JSON.stringify(response));
            });v
      }


    return (
        <div>
            <p>Hello, this is the portfolio viewer</p>
        </div>
    )
}