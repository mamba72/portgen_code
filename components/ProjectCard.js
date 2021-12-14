import { useState } from 'react'
import Link from 'next/link';

export default function ProjectCard({ repo, starred }) {

    const repoName = repo.full_name.substring(repo.full_name.indexOf('/') + 1);
    const lang = repo.language;
    const description = repo.description;
    const creationDate = repo.created_at;
    const link = repo.html_url;
    const lastUpdateDate = repo.updated_at;
    const imgDestination = (language) => {

        if(language != null)
            language = language.replace("#","Sharp");
        var path = "/images/languages/" + language + ".png";
        return path;
    }

    const starPath = () => {
        if(starred)
            return "/images/FilledInStar.png";
        else
            return "/images/EmptyStar.png";
    }

    return (
        <div className="proj-card">
            <img src={starPath(repo.id)} className='proj-star' />
            <a href={link} target="_blank" rel="noreferrer noopener"
                className="proj-title">{repoName}</a>
            <div className="proj-description-box">
                <p>{description}</p>
            </div>
            

            <img src={imgDestination(lang)} className='proj-attrib1' alt={lang} />
            
        </div>
    )

}