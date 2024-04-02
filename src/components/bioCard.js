import React from "react";
import BioCardComponent from "./bioCardComponent";
import "./bioCard.css";

const buildBioCards = (data, onFavoriteClick) => {
    const list = data.map((bio) => (
        <BioCardComponent key={bio.id} data={bio} onFavoriteClick={onFavoriteClick} isFavorite={bio.isFavorite} />
    ));
    return (
        <div className="container">
            {list}
        </div> 
    )
}

export default buildBioCards;