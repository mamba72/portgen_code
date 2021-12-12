import { useState } from 'react'
import Link from 'next/link';

export default function ProjectCard({ repo }) {

    const repoName = repo.full_name.substring(repo.full_name.indexOf('/') + 1);
    const lang = repo.language;
    const description = repo.description;
    const creationDate = repo.created_at;
    const link = repo.html_url;
    const lastUpdateDate = repo.updated_at;
    const imgDestination = () => {
        var path = "/images/languages/" + lang + ".png";
        return path;
    }

    return (
        <div className="proj-card">
            <a href={link} target="_blank" rel="noreferrer noopener"
                className="proj-title">{repoName}</a>
            <div className="proj-description-box">
                <p>{description}</p>
            </div>
            

            <img src={imgDestination()} className='proj-attrib1' />
            
        </div>
    )

}