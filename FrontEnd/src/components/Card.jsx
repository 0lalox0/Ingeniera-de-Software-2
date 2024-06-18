import React from 'react';

const CardComponent = ({ title, paragraph, imageSrc, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <img src={imageSrc} alt={title} />
            <div className="card-content">
                <h3>{title}</h3>
                <p>{paragraph}</p>
            </div>
        </div>
    );
};

export default CardComponent;
