import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import { Component } from 'react';
import { UserContext, useUser } from '../context/UserContext';

export class HelperClass extends Component {
    static supaID = -1;
    // constructor(doc) {
    //     this.document = doc;
    // }
    // static cssRoot = document.querySelector(':root');

    //changing colors!!
    static ChangeTitleColor({cssRoot, newColor}) {
        this.cssRoot.style.setProperty('--color-cool-blue',newColor);
    }


    //SUPABASE STUFF
    static async CreateUserBio({Name, SchoolName, Major, Minor, GradYear, githubName}){
        console.log("Creating User");
        let year = new Date(GradYear);
    
        let { data, error } = await supabase
            .from('BasicInfo')
            .insert([
            { id: this.supaID, Name: {Name}, SchoolName: {SchoolName}, Major: {Major}, Minor: {Minor},GradYear: year, GitName: githubName},
        ]);

        if(error)
            console.log(error);
    
    }

    static async UserHasProfile()
    {
        
        let { data: BasicInfo, error } = await supabase
            .from('BasicInfo')
            .select('*')

        console.log("Does User Have Profile?", BasicInfo.length > 0);
        if(BasicInfo.length > 0)
            return true;

        return false;

    }

    static async GetUserBio()
    {
        let { data: BasicInfo, error } = await supabase
            .from('BasicInfo')
            .select('*')

        if(error)
            console.log(error);
        
        console.log(BasicInfo);
        return BasicInfo;

    }

    static async SetSupaGitName({gitName}) {
    
        const { data, error } = await supabase
            .from('BasicInfo')
            .update({ GitName: {gitName} })
            .eq('id', supaUser.user.id)
    
        if(error)
            console.log(error);
    
    }

    //gets the logged in user from Auth.UserContextProvider (the parent object in the _app.js file)
	//if no user is logged in, user will be Null
    static IsLoggedIn = () => {
        let supaUser = Auth.useUser();
        this.supaID = supaUser.id;
        // useUser().setUser(supaUser);
        console.log(supaUser);
        if(typeof supaUser != 'undefined' && supaUser.user != null)
          return true;
        else
          return false;
      }

      static GetSupaUser = () => {
          return Auth.useUser();
      }
}










// export async function  CreateUserBio({Name, SchoolName, Major, Minor, GradYear}){
    
//     let year = new Date(GradYear);

//     let { data, error } = await supabase
//         .from('BasicInfo')
//         .insert([
//         { Name: {Name}, SchoolName: {SchoolName}, Major: {Major}, Minor: {Minor},GradYear: year},
//     ]);

// }

// export async function SetSupaGitName({gitName}) {
    
//     const { data, error } = await supabase
//         .from('BasicInfo')
//         .update({ GitName: {gitName} })
//         .eq('id', supaUser.user.id)

//     if(error)
//         console.log(error);

// }

// export async function GetSupaGitName() {
    
//     let { data: BasicInfo, error } = await supabase
//         .from('BasicInfo')
//         .select('GitName')

    
//     return BasicInfo;
// }