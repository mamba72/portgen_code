import { useState } from "react";

export default function ProfileInputForm({handleSubmit, curVals}) {
    const [name, setName] = useState(curVals.Name);
	const [schoolName, setSchoolName] = useState(curVals.SchoolName);
	const [major, setMajor] = useState(curVals.Major);
	const [minor, setMinor] = useState(curVals.Minor);
	const [gradYear, setGradYear] = useState(curVals.GradYear);
	const [gitName, setGitName] = useState(curVals.GitName);



    let submitForm = e => {
        e.preventDefault();
        handleSubmit({name, schoolName, major, minor, gradYear, gitName});
    }

    const PrintInput = (placeholder, type, value, setValue) => {
        return (
            <input placeholder={placeholder} type={type} value={value}
                onChange={e => setValue(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">
            </input>
        )
    }


    return (
        <form onSubmit={submitForm}>
            {/* {PrintInput("Name", "text",curVals.Name,setName)} */}
            <input placeholder="Name" type="text" value={name}
                onChange={e => setName}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">
            </input>
            <br></br>
            {/* {PrintInput("School Name", "text",curVals.SchoolName,setSchoolName)} */}
            <input placeholder="School Name" type="text" value={curVals.SchoolName}
                onChange={e => setSchoolName(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">
            </input>
            <br></br>
            {/* {PrintInput("Major", "text",curVals.Major,setMajor)} */}
            <input placeholder="Major" type="text" value={curVals.Major}
                onChange={e => setMajor(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">
            </input>
            <br></br>
            {/* {PrintInput("Minor", "text",curVals.Minor,setMinor)} */}
            <input placeholder="Minor" type="text" value={curVals.Minor}
                onChange={e => setMinor(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">
            </input>
            <br></br>
            {/* {PrintInput("Graduation Year", "number",curVals.GradYear,setGradYear)} */}
            <input placeholder="Graduation Year" type="number" value={curVals.GradYear}
                onChange={e => setGradYear(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">
            </input>
            <br></br>
            {/* {PrintInput("GitHub User Name", "text",curVals.GitName,setGitName)} */}
            <input placeholder="GitHub User Name" type="text" value={curVals.GitName}
                onChange={e => setGitName(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">
            </input>

            <button className='submit-info-button' type="submit">Done</button>
        </form>
    )
    


}