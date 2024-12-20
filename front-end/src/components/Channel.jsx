import { useEffect, useState } from "react";
import useFetch from "../sidebar/useFetch"
import { Link } from "react-router-dom";

function Channel() {

    const [details, setDetails] = useState([]);

    const { data, error, loading } = useFetch("http://localhost:5000/channels", {
        method: "GET"
    });

    useEffect(() => {
        if (data) {
            setDetails(data)
        }
    }, [data]);

    //Api for delete channel
    async function handleChannelDelete(id) {
        try {
            const response = await fetch(`http://localhost:5000/deletechannel/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            alert("Channel Deleted");
            setDetails(prevDetails => prevDetails.filter(channel => channel._id !== id));
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    if (error) {
        return <p>{error.message}</p>
    }

    if (loading) {
        return <p>Loading ...</p>
    }

    return (
        <>
            <h1 className="text-center text-3xl font-bold mt-16">Your Channel</h1>
            {details.length < 1 ? <p className="text-2xl mt-20">No channel created yet</p> :
                <div className="grid grid-cols-1 sm:grid-cols-3 place-items-center m-5">
                    {
                        details.map(item => (

                            <div key={item._id} className="mb-5">
                                <Link to={`/viewchannel/${item._id}`} key={item._id}>
                                    <img src={item.image} className="w-44 h-44 m-5 rounded-full" />
                                    <p>{item.name}</p>
                                    <p>{item.handle}</p>
                                </Link>
                                <button onClick={() => handleChannelDelete(item._id)}><img src="../../picture/delete.png" width="20px" height="20px" /></button>
                            </div>

                        ))
                    }
                </div>
            }
        </>
    )
}

export default Channel;