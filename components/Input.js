import { useState } from 'react'
export default function Input({ handleSubmit }) {

    const [value,setValue] = useState("")

    //create an onsubmit function
    let submitForm = e => {
        e.preventDefault()
        handleSubmit(value)
        setValue("")
    }

    return (
        <form onSubmit={submitForm}>
            <input placeholder="Enter User Name" type="text" value={value} 
                //e.target.value is the value given to the onChange event and it is the text the user changed in the textbox
                onChange={e => setValue(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">

                </input>
            <button type="submit" className="input-button">Save</button>

            <style jsx> {`
                .input-button {
                    background-color: #0070f3;
                    border-radius: 12px;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    --tw-drop-shadow: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
                    min-width: 50px;
                    color: white;
                }
                


                `}</style>

        </form>
        
        
    )
}