import React from "react";
import "./bioCardComponent.css";
import { Star } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const BioCardComponent = ({ data, onFavoriteClick}) => {
    const handleClick = () => {
        onFavoriteClick(data);
    };

    return (
        <div className="bioCard">
            <img src={data.image} alt={data.title} />
            <h2>{data.name}</h2>
            <h3>Age: {data.age}</h3>
            <h3>Gender: {data.gender}</h3>
            <h3>
                Occupation: {data.occupation}
                <IconButton className={data.isFavorite ? "favButtonClicked" : "favButton"} onClick={handleClick}>
                    <Star />
                </IconButton>
            </h3>
        </div>
    );
}

export default BioCardComponent;
