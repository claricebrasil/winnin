import React from "react";
import logoReddit from '../../assets/reddit-logo-16.png'
import './style.css';

function Card({ author, title, hour, image, domain }) {
    const todayTimestamp = new Date();
    const postMilliseconds = new Date(hour * 1000);

    const calcHours = Math.abs(todayTimestamp.getTime() - postMilliseconds.getTime());
    const hours = Math.ceil(calcHours / (1000 * 60 * 60));

    return (
        <>
            <hr />
            <div className="flex-row my-lg">
                <img src={logoReddit} alt="teste" />
                <div className="card-container flex-column mx-md">
                    <h3>{title}</h3>
                    <p className="mb-md">enviado há {hours} {hours > 1 ? "horas" : "hora"} por <span className="author">{author}</span></p>
                    <span className="domain">{domain}</span>
                </div>
            </div>
        </>
    );
}

export default Card;