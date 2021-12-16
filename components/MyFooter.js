import Link from "next/link";


export default function MyFooter()
{


    return (
        <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>

        <div className="contact-area">
            <h4>Contact me: </h4> 
            <Link className="pl-2" href="https://www.linkedin.com/in/stephenwhite-softwareengineer/" target="_blank">via LinkedIn</Link>
        </div>
        

        <style jsx> {`

            footer {
                display: flex;
                flex-direction: column;
                align-content: center;
                width: 60%;
            }

            .contact-area {
                display: flex;
                flex-direction: row;
            }
        `}</style>
      </footer>
    );
}