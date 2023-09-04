import React from "react";

export default function ConvertTimeStamp(props) {
    const date = new Date(props.timestamp);
        const userTime = date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            }
        );
    return userTime;
}