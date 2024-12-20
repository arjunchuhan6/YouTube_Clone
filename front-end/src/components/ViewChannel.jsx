import { SideBarContext } from "../sidebar/Sidebar";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router";
import useFetch from "../sidebar/useFetch"

function ViewChannel() {
    const { isSidebarOpen } = useContext(SideBarContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("");
    const [uploadDate, setUploadDate] = useState("");
    const [showVideo, setShowVideo] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("")
    const [editCategory, setEditCategory] = useState("")
    const [editUrl, setEditUrl] = useState("")
    const likes = 0;
    const dislikes = 0;
    const comments = [];
    const Token = JSON.parse(localStorage.getItem("accessToken"));

    const param = useParams();

    //Fetch channels
    const { data, error, loading } = useFetch("http://localhost:5000/channels", {
        method: "GET"
    });

    //Filtered out the selected channel
    const filteredData = data?.find(data => data._id == param.id);

    useEffect(() => {
        if (filteredData) {
            setShowVideo(filteredData.video)
        }
    }, [filteredData])


    //Api to add video in a selected channel
    async function handleAddVideo(e, id) {
        e.preventDefault();
        if (!Token) {
            return alert("First login to Add video");
        }

        const token = Token.token;
        try {
            const response = await fetch(`http://localhost:5000/addVideo/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                },
                body: JSON.stringify({ title, description, url, category, uploadDate, likes, dislikes, comments })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            alert("video added")
            window.location.reload();
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //Api for edit video
    async function handleEditVideo(id, index) {
        const token = Token.token;
        try {
            const response = await fetch(`http://localhost:5000/editvideo/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                },
                body: JSON.stringify({
                    index,
                    title: editTitle,
                    description: editDescription,
                    category: editCategory,
                    url: editUrl
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            alert("video edited");
            setTitle("");
            window.location.reload();
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //Api for deleting video
    async function handleDeleteVideo(id, index) {
        const token = Token.token
        try {
            const response = await fetch(`http://localhost:5000/deleteVideo/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                },
                body: JSON.stringify({ index })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            alert("video deleted");
            window.location.reload();
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
            <div className={isSidebarOpen ? "flex" : undefined}>
                <div>
                    {isSidebarOpen && <Sidebar />}
                </div>
                {Token ?
                    <div>
                        <div className="sm:flex mt-16 justify-evenly m-10">
                            <div className="flex flex-col items-center align-middle mt-10">
                                <img src={filteredData.image} width="200px" height="200px" className="rounded-full" />
                                <h1 className="text-2xl font-semibold">{filteredData.name}</h1>
                            </div>
                            <div className="sm:mr-16 mt-16 sm:mt-0 text-center">
                                <h1 className="text-2xl font-semibold text-center mb-10">Add Video</h1>
                                <form>
                                    <input type="text" placeholder="Title" className="border border-black rounded-md lsm:w-96 h-10 text-xl p-1 m-2" onChange={(e) => setTitle(e.target.value)} /><br />
                                    <input type="text" placeholder="Description of video" className="border border-black rounded-md lsm:w-96 h-10 text-xl p-1 m-2" onChange={(e) => setDescription(e.target.value)} /><br />
                                    <input type="text" placeholder="video Url" className="border border-black rounded-md lsm:w-96 h-10 text-xl p-1 m-2" onChange={(e) => setUrl(e.target.value)} /><br />
                                    <input type="text" placeholder="Category, eg: Technology, fiction" className="border border-black rounded-md lsm:w-96 h-10 text-xl p-1 m-2" onChange={(e) => setCategory(e.target.value)} /><br />
                                    <input type="Date" className="border border-black rounded-md lsm:w-96 h-10 text-xl p-1 m-2" onChange={(e) => setUploadDate(e.target.value)} /><br />
                                    <button className="text-xl border border-black bg-slate-100 p-1 rounded-md mt-5" onClick={(e) => handleAddVideo(e, filteredData._id)}>Upload Video</button>
                                </form>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-center text-2xl mt-10 font-semibold">Your Videos</h1>
                            {showVideo.length > 0 ?
                                <div className="grid grid-cols-1 sm:grid-cols-2 md2:grid-cols-3 place-items-center sm:m-5 mt-10">
                                    {
                                        showVideo.map(data => (
                                            <div key={data._id} className="m-5">
                                                <iframe src={data.url} width="300px" height="200px" />
                                                <div>
                                                    <div>
                                                        {editIndex === data._id ? (
                                                            <div>
                                                                {/* Show input fields for editing */}
                                                                <input
                                                                    type="text"
                                                                    value={editTitle}
                                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                                    placeholder={data.title}
                                                                    className="border border-black rounded-md w-52 h-8 text-xl p-1 m-2"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={editDescription}
                                                                    onChange={(e) => setEditDescription(e.target.value)}
                                                                    placeholder={data.description}
                                                                    className="border border-black rounded-md w-52 h-8 text-xl p-1 m-2"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={editCategory}
                                                                    onChange={(e) => setEditCategory(e.target.value)}
                                                                    placeholder={data.category}
                                                                    className="border border-black rounded-md w-52 h-8 text-xl p-1 m-2"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={editUrl}
                                                                    onChange={(e) => setEditUrl(e.target.value)}
                                                                    placeholder={data.url}
                                                                    className="border border-black rounded-md w-52 h-8 text-xl p-1 m-2"
                                                                /><br />
                                                                <button
                                                                    onClick={() => handleEditVideo(filteredData._id, data._id)}
                                                                    className="border border-black bg-slate-100 px-2 py-1 rounded-md m-2 mt-5"
                                                                >
                                                                    Save
                                                                </button>
                                                                <button onClick={() => setEditIndex(null)} className="border border-black bg-slate-100 p-1 rounded-md mt-5">Cancel</button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {/* Display video details */}
                                                                <h1 className="text-xl font-semibold">{data.title}</h1>
                                                                <p className="text-xl">{data.description}</p>
                                                                <p className="text-xl">{data.category}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {editIndex == data._id ?
                                                            <></>
                                                            :
                                                            <button className="border border-black bg-slate-100 px-2 py-1 rounded-md m-1 mt-2" onClick={() => setEditIndex(data._id)} >Edit </button>
                                                        }
                                                        <button className="border border-black bg-slate-100 px-2 py-1 rounded-md m-1 mt-2" onClick={() => handleDeleteVideo(filteredData._id, data._id)}>delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div> :
                                <p className="text-center text-xl mt-10 mb-10">No video created yet </p>
                            }
                        </div>
                    </div> :
                    <div className="text-center mt-40 font-semibold text-2xl">
                        <h1>Access Denide !</h1>
                        <p>Login to access channel video</p>
                    </div>
                }
            </div>
        </>
    )
}

export default ViewChannel;