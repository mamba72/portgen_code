import { useState } from 'react'
import { Auth } from '@supabase/ui'
import Link from 'next/link';
import { HelperClass } from '../utils/GlobalFunct';

export default function LoginButton({LogOutFunction}) {
    const supaUser = Auth.useUser();



    const GetButton = () => {
        if(!HelperClass.IsLoggedIn())
        {
            return (
            <Link href='/login' passHref>
                <button component='a'>Log In</button>
            </Link>);
        }else
        {
            return (
                <button onClick={LogOutFunction}>Log Out</button>
            );
        }
    }

    return (
        
        GetButton()
    )
}