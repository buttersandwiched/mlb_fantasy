import React, {useEffect} from "react";

export const PlayerBioCard = ({player}) => {
    if (!player)
        return <div>Unknown PlayerId...</div>
    return (
            <div className="info-group">
                <h2>Player Bio</h2>
                    <div className="info-content">
                        <div className="info-item">
                            <span className="label">Age:</span>
                            <span className="value">{player.age}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">MLB Debut:</span>
                            <span className="value">{player.mlbDebutDate}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Position:</span>
                            <span className="value">{player.position}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Bat Side:</span>
                            <span className="value">{player.batSide}</span>
                        </div>
                    </div>
            </div>
    )

}