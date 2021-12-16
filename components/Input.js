import { useState } from 'react'
export default function Input({ handleSubmit, placeholder, type, buttonText, valueIn, disabledSubmit }) {

    const [value,setValue] = useState(valueIn);

    const inputWidth = () => {
        if(disabledSubmit)
            return "100%";
        else 
            return "75%";
    }

    //create an onsubmit function
    let submitForm = e => {
        if(disabledSubmit)
            return;
        e.preventDefault()
        handleSubmit(value)
        setValue("")
    }

    return (
        <form onSubmit={submitForm}>
            <input placeholder={placeholder} type={type} value={value} 
                //e.target.value is the value given to the onChange event and it is the text the user changed in the textbox
                onChange={e => setValue(e.target.value)}
                className="border-black rounded px-3 py-2 bg-gray-100 drop-shadow">

            </input>

            {!disabledSubmit ? (
                <button type="submit" className="input-button">{buttonText}</button>
            ): (
                <div></div>
            )}
            

            <style jsx> {`
                .input-button {
                    background-color: #0070f3;
                    border-radius: 12px;
                    padding: 0.5rem;
                    --tw-drop-shadow: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
                    min-width: 70px;
                    color: white;
                    // width: 25%
                }
                // form {
                //     width: 100%;
                // }
                input {
                    width: ${inputWidth};
                }

                `}</style>

        </form>
        
        
    )
}

Input.defaultProps = {
    placeholder: "Enter User Name",
    type: "text",
    buttonText: "Save",
    disabledSubmit: false
}