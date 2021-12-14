import { useState } from 'react'
import { Auth } from '@supabase/ui'
import Link from 'next/link';

export default function LoginButton() {
    const supaUser = Auth.useUser();

    const IsLoggedIn = () => {
        console.log(supaUser);
        return supaUser;
      }

    const Text = () => {
        if(IsLoggedIn())
            return "Log Out";
        else
            return "Log In";
    }

    const GetLink = () => {
        if(IsLoggedIn())
        {

        }
        else 
        {
            
        }
    }

    return (
        <Link href={GetLink()} passHref>
            <button component='a'>{Text()}</button>
        </Link>
    )
}