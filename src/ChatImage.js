import React, { useEffect, useState } from "react";


export default function ChatImage(props) {
    
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    //group_id
    useEffect(() => {

        const fetchData = () => {
            try {
                console.log("Chat idL: "+props.group_id);
              const result = `${process.env.REACT_APP_CHATIMGURL}/${props.group_id}/${props.file_url}`;
              if (result) {
                setData(result);
                setIsLoading(false);
              } else {
                setTimeout(fetchData, 1000); // Retry after 1 second
              }
            } catch (error) {
              console.error(error);
            }
          };

        fetchData();
        
    },[]);

    if (isLoading) {
        return <p>Loading...</p>;
      }

    return(
        <img src={data} />

    );
}