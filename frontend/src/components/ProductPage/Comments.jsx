import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Comments({productid}){
    const {isLoggedIn } = useContext(AuthContext);
    const [comment, setComment] = useState([]);
    const [selfComment, setSelfComment] = useState("");
    const navigate = useNavigate();
    function handleCommentChange(e) {
        setSelfComment(e.target.value);
    }

    useEffect(()=>{
        fetch(`http://localhost:3000/comment`,{
            method : 'POST',
            headers :{
                'Content-Type' :'application/json'
            },
            body : JSON.stringify({productid})
        })
        .then((res) => res.json())
        .then((data)=> {setComment(data.comment);console.log(data)})
        .catch((err)=> console.log(err))
    },[productid]);

    function sumbitComment(){
        if(!isLoggedIn){
            navigate('/login');
        }
        console.log(selfComment);
        fetch(`http://localhost:3000/submitcomment`,{
            method : 'POST',
            headers : {
                'Content-Type' :'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify({selfComment, productid})
        })
        .then((res) => res.json())
        .then((data) => {console.log(data);
            if(data.comment){setComment(prev => [...prev,data.comment])}
            ;console.log(comment);
        })
        .catch((err)=> console.log(err))
    }

    return (
        <>
                <div className="flex flex-col mt-6 w-full max-w-4xl mx-auto px-4">
                    <p className="pt-2 pr-8 text-2xl text-indigo-400">Comments</p>
                    <textarea className="border-1 rounded-2xl px-4 py-2 focus:outline-none focus:ring-blue-400 resize-none" id="comment" onChange={handleCommentChange}>
                
                    </textarea>
                    <button onClick={sumbitComment} >Submit</button>
                    <div className="">
                        {comment.length} comments found
                        {comment.map(item => (
                            <div key={item.id} className="flex flex-col border-s-fuchsia-10 p-3 mt-3 rounded-2xl shadow-md">
                                <div className="flex m-1 p-1 items-center justify-between">
                                    <p className=" m-0 text-1xl font-medium">{ item.User.name}</p>
                                    <p className=" p-1 pl-4 m-0 text-sm"> {item.createdAt.slice(2,10)}</p>
                                </div>
                                <p className="text-sm m-0 pl-8 p"> {item.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
        </>
    )
}