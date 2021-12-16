import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import LoginButton from './LoginButton';
import { HelperClass } from '../utils/GlobalFunct';

export default function MyHeader() {

    const LogOutFunction = async () => {

        console.log("Logout Function was called.");
        let {error} = await supabase.auth.signOut();
        if(error) 
        {
            console.log("Following error occured during logout:");
            console.log(error);
        }
    }

    const ViewProfileButton = () => {
        if(HelperClass.IsLoggedIn())
        {
            return (
                <Link href='/my_profile' passHref>
                    <button component='a'>My Profile</button>
                </Link>
            );
        }else
        {
            return;
        }
    }

    const GetProfileOrLoginButton = () => {
        if(HelperClass.IsLoggedIn())
            return ViewProfileButton();
        else
            return LoginButton(LogOutFunction);
    }

    return (
        <section className='my-header'>
            <hr className='header-stripe'/>
            <header className="viewer-header">
                
				{/* <h3>Home</h3>
				<h3>Log Out</h3> */}
                <Link href='/' passHref>
                    <button compontent='a' className='header-button'>Home</button>
                </Link>

                {GetProfileOrLoginButton()}
                
                {/* {LoginButton(LogOutFunction)} */}
            </header>
        </section>
        
    )
    
}