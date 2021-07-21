import React, {useState} from "react";
import CommentService from "../../services/CommentService";
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";


function AddComment() {

    const {id} = useParams()

    const [comment, setComment] = useState([])

    let history = useHistory();

    const addComment = (e) => {
        e.preventDefault(comment)
        CommentService.addComment(id, comment)
            .then(() => {
                history.goBack()
            })
    };

    const handleChange = (e) => {
        const newData = {...comment}
        newData[e.target.name] = e.target.value
        setComment(newData)
        console.log(newData)
    };

    return (
        <div className="AddComments">
            <form onSubmit={addComment}>
                <textarea onChange={(e) => handleChange(e)} name="text" value={comment.text} type="text"
                          maxLength={200}/>
                <button color="aliceblue" type='submit'>
                    <FontAwesomeIcon className="Plus-icon" icon={faPlusSquare}/>
                </button>
            </form>
        </div>


    )
}

export default AddComment