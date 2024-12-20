import { SideBarContext } from "../sidebar/Sidebar";
import { useContext,useEffect,useState } from "react";
import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {fetchVideos} from "../sidebar/videoSlice"

function ViewVideo() {

    const { isSidebarOpen } = useContext(SideBarContext);

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editComment, setEditComment] = useState("")
    const [editIndex, setEditIndex] = useState(null);

    //Taking firstName and token from localStorage
    const firstName = localStorage.getItem("firstName");
    const Token = JSON.parse(localStorage.getItem("accessToken"));

    const dispatch = useDispatch();
    const params = useParams();

    const { videos, loading, error } = useSelector(state => state.video);

    // Fetch videos when component mounts
    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch]);


    // Find video by id after fetching the videos
    const findVideo = videos.find(data => data._id === params.id);
    const filteredVideo = videos.filter(data => data._id !== params.id);


    // Handle setting the likes and dislikes after video is found
    useEffect(() => {
        if (findVideo) {
            setLikes(findVideo.likes);
            setDislikes(findVideo.dislikes);
        }
    }, [findVideo]);


    //call api for handleLikes on a video
    async function handleLikes(findVideo) {
        if (!Token) {
            return alert("First login to like a video");
        }

        const id = findVideo._id;
        const token = Token.token;
        try {
            const updatedlike = !isLiked ? likes + 1 : likes - 1;
            setLikes(updatedlike)
            const response = await fetch(`http://localhost:5000/video/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                },
                body: JSON.stringify({ id, likes: updatedlike })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            setIsLiked(!isLiked)

        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }


    //call api for handleDislikes on a video
    async function handleDislikes(id) {
        if (!Token) {
            return alert("First login to dislike a video");
        }

        const token = Token.token;
        try {
            const updatedislike = !isDislike ? dislikes + 1 : dislikes - 1;
            setDislikes(updatedislike)
            const response = await fetch(`http://localhost:5000/video/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                },
                body: JSON.stringify({ id, dislikes: updatedislike })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            setIsDislike(!isDislike)

        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }


    //call api to add comment on a video
    async function handleAddComment(id) {
        if (!Token) {
            return alert("First login to comment on a video");
        }

        const token = Token.token;

        try {
            const response = await fetch(`http://localhost:5000/video/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                },
                body: JSON.stringify({ comment, firstName })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            setComment("")
            window.location.reload()
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //call api for Edit an comment
    async function handleEditComment(id, index) {
        if (!Token) {
            return alert("First login to comment on a video");
        }

        const token = Token.token;
        const comment = editComment;

        try {

            const response = await fetch(`http://localhost:5000/editcomment/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                },
                body: JSON.stringify({
                    comment,
                    index
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message, "here");
            }

            const data = await response.json();
            setEditComment("")
            setIsEdit(!isEdit)
            window.location.reload()
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }


    //call api for delete an comment
    async function handledeleteComment(id, index) {
        const token = Token?.token;
        if (!token) {
            return alert("First login to delete a comment");
        }

        try {
            const response = await fetch(`http://localhost:5000/deletecomment/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `JWT ${token}`
                },
                body: JSON.stringify({ index }) // Send the index of the comment to be deleted
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Error deleting comment");
            }

            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading videos: {error}</p>;
    }

    if (!findVideo) {
        return <p>Video not found</p>;
    }

    return (
        <div className={isSidebarOpen ? "flex" : undefined}>
            <div>{isSidebarOpen && <Sidebar />}</div>
            <div className="md2:flex md2:flex-row md2:justify-evenly md2:ml-5 md:ml-28 sm:ml-16 lsm:ml-8 m-1 lg+:ml-10 mt-16">
                {/* Div for a single video which we open */}
                <div className="mt-10">
                    <iframe src={findVideo.url} className="sm:w-104 w-full" height="400px" />
                    <h1 className="text-2xl font-semibold mb-5 ">{findVideo.title}</h1>
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-xl font-medium">{findVideo.category}</h2>
                            <p>{findVideo.views} Views</p>
                        </div>
                        <div className="flex">
                            <button className="h-8 p-1 m-1 bg-slate-300 text-center flex">
                                <img src={isLiked ? "../../picture/after-like.png" : "../../picture/before-like.png"} width="15px" height="15px" className="mt-1" onClick={() => handleLikes(findVideo)} />
                                {likes}
                            </button>
                            <button className="h-8 p-1 m-1 bg-slate-300 text-center flex">
                                <img src={isDislike ? "../../picture/after-dislike.png" : "../../picture/before-dislike.png"} width="15px" height="15px" className="mt-1" onClick={() => handleDislikes(findVideo._id)} />
                                {dislikes}
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-medium mb-1 mt-5 ">Description</h2>
                        <p>{findVideo.description}</p>
                    </div>
                    <div>
                        <input type="text" placeholder="Add a comment" className="w-9/12 h-11 p-2 rounded-md bg-slate-200 mt-10 text-black" value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button onClick={() => handleAddComment(findVideo._id)} className="font-semibold ml-2 bg-slate-200 rounded-2xl ">Post</button>
                        <div className="mt-5  p-2 w-9/12">
                            {/* Map on the comments */}
                            {findVideo.comments.map((data, index) => (
                                <div key={index} className="border border-black shadow-sm p-1 shadow-black w-11/12 mt-5">
                                    <h3 className="text-sm "><i>~{data.firstName}</i></h3>

                                    <div className="flex justify-between">
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                value={editComment}
                                                onChange={(e) => setEditComment(e.target.value)}
                                                className="border border-black"
                                            />
                                        ) : (
                                            <p>{data.comment}</p>
                                        )}
                                        <div>
                                            {/* Toggle between 'edit' and 'save' button */}
                                            {editIndex === index ? (
                                                <button onClick={() => {
                                                    handleEditComment(findVideo._id, index);
                                                    setEditIndex(null);
                                                }}>
                                                    Save
                                                </button>
                                            ) : (
                                                <button onClick={() => {
                                                    setEditIndex(index);
                                                    setEditComment(data.comment);
                                                }}>
                                                    <img src="../../picture/edit-button.png" alt="Edit" width="20px" height="20px" />
                                                </button>
                                            )}
                                            <button onClick={() => handledeleteComment(findVideo._id, index)}><img src="../../picture/delete.png" alt="delete" width="20px" height="20px" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Div for rest all the video */}
                <div className="md2:ml-5 ml-2 mt-10">
                    {filteredVideo.map(data => (
                        <Link to={`/viewvideo/${data._id}`} key={data._id}>
                            <div className="flex mb-5 border shadow-black shadow-sm p-2 w-full sm:w-auto">
                                <iframe src={data.url} className="md2:w-20 md2:h-20 w-28 h-28" />
                                <div>
                                    <h1 className="font-semibold mt-2 ml-2">{data.title}</h1>
                                    <p className="ml-2">{data.views} Views</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ViewVideo;