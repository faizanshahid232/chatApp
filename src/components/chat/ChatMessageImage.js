import React, { useEffect, useState } from "react";

export default function ChatMessageImage(props) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //props.bottomRef.current.scrollTop = props.bottomRef.current.scrollHeight;
    },[loaded]);

    return (
        <>
            {props.file_url && (
                <div className="max-w-[200px] max-h-[300px]">
                    {loaded ? null : (
                        <p>Loading..</p>
                    )}
                    <div
                    className={`cursor-pointer ${
                        props.isFullScreen
                        ? "fixed inset-0 w-full h-full object-contain z-[9999]"
                        : "object-cover"
                    }`}
                    onClick={props.toggleFullScreen}
                    >
                    <img
                        src={props.isFullScreen ? '' : props.fileUrl ? props.fileUrl : props.file_url}
                        alt="Media"
                        onLoad={() => setLoaded(true)}
                        className={`${loaded ? {} : 'hidden'} media w-[120px] m-auto object-cover ${
                            props.isFullScreen ? "w-full rounder-[7px]" : ""
                        }`}
                    />
                    {props.isFullScreen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                        <img
                            src={props.fileUrl ? props.fileUrl : props.file_url}
                            alt="Media"
                            className="max-h-full max-w-full"
                        />
                        </div>
                    )}
                    </div>
                </div>
            )}
        </>
    );
}