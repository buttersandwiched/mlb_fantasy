import React from "react";

export const PlayerStatsCard = ({player}) => {
    return (
            <div className="info-content">
                <div className="info-item">
                    <span className="label"> {player.position === 'P' ? 'Wins' : 'Batting Avg'} </span>
                    <span className="value"> {player.position === 'P' ? 'W' : 'L'} </span>
                </div>
                <div className="info-item">
                    <span className="label">HR:</span>
                    <span className="value">{}</span>
                </div>
                <div className="info-item">
                    <span className="label">RBI:</span>
                    <span className="value">{}</span>
                </div>
                <div className="info-item">
                    <span className="label">Hits:</span>
                    <span className="value">{}</span>
                </div>
                <div className="info-item">
                    <span className="label">Walks:</span>
                    <span className="value">{}</span>
                </div>
                <div className="info-item">
                    <span className="label">K's:</span>
                    <span className="value">{}</span>
                </div>
            </div>
    )
}