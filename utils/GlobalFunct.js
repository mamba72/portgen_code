import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import { Component } from 'react';
import { UserContext, useUser } from '../context/UserContext';

export class HelperClass extends Component {
    // constructor(doc) {
    //     this.document = doc;
    // }
    // static cssRoot = document.querySelector(':root');

    //changing colors!!
    static ChangeTitleColor({cssRoot, newColor}) {
        this.cssRoot.style.setProperty('--color-cool-blue',newColor);
    }


    //SUPABASE STUFF
    static async CreateUserBio(supaID,Name, SchoolName, Major, Minor, GradYear, githubName){
        console.log("Creating User: id -> ", supaID);
        let year = new Date(GradYear);
    
        let { data, error } = await supabase
            .from('BasicInfo')
            .insert([
            { id: supaID, Name: Name, SchoolName: SchoolName, Major: Major, Minor: Minor, GradYear: year, GitName: githubName},
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

    static async GetUserBio(supaID)
    {
        let { data: BasicInfo, error } = await supabase
            .from('BasicInfo')
            .select('*')
            .eq("id", supaID);

        if(error)
            console.log(error);

        if(BasicInfo.length == 0)
        {
            return null;
        }
        
        try{
            console.log("BasicInfo: ", BasicInfo[0]);
            BasicInfo[0].GradYear = new Date(BasicInfo[0].GradYear);
            return BasicInfo[0];
        }
        catch
        {
            console.log("Basic Info was NULL");
            return null;
        }
    }

    static async GetGitUserBio(userName) {
        console.log("Getting info for user: ", userName);
        let { data: BasicInfo, error } = await supabase
            .from('BasicInfo')
            .select('*')
            .like("GitName", userName);

        if(error)
            console.log(error);

        if(BasicInfo.length == 0)
        {
            return null;
        }
        
        try{
            console.log("BasicInfo: ", BasicInfo[0]);
            
            BasicInfo[0].GradYear = BasicInfo[0].GradYear.substring(0,4);
            return BasicInfo[0];
        }
        catch
        {
            console.log("Basic Info was NULL");
            return null;
        }
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
        // console.log(supaUser);
        if(typeof supaUser != 'undefined' && supaUser.user != null)
          return true;
        else
          return false;
      }

      static GetSupaUser = () => {
          return Auth.useUser();
      }


      static async GetGitAvatarUrl(userName) {
        let fetchReponse = await fetch(`https://api.github.com/users/${userName}/repos`);
        let jsonResponse = await fetchReponse.json();
        if(jsonResponse.length > 0)
            return jsonResponse[0].owner.avatar_url;
        else
            return "";
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