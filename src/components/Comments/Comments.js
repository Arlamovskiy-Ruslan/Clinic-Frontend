import React, {useEffect, useState} from "react";
import AddComment from "./AddComment";
import {useHistory, useParams} from "react-router-dom";
import CommentService from "../../services/CommentService";
import EasyEdit from 'react-easy-edit';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment';
import PatientService from "../../services/PatientService";

export function Comments({comments}) {

    const [comment, setComment] = useState([])
    let history = useHistory();
    const {id} = useParams();

    const deleteCommentById = (id) => {
        CommentService.deleteComment(id)
            .then(history.goBack)
    };

    const handleSave = (c_id) => {
        CommentService.updateComment(id, c_id, comment)
            .then(({data: patient}) => {
                history.push(`/patient/${patient.id}`)
            })
    }

    const cancel = () => {
        alert("Cancelled")
    }

    const setData = (e) => {
        const newData = {...comment}
        newData[e.target.name] = e.target.value
        setComment(newData)
        console.log(newData)
    };

    return (
        <div className="Comments">
            <h6>Comments:</h6>
            <div className="overflow-scroll-comments">
                {comments?.map(c =>
                    <div key={c.id} className="patient-comments">

                        <p>
                            <Moment format="D MMM, YYYY" withTitle>
                                {c.date}
                            </Moment>
                        </p>

                        <button className="Trash-icon-comments" onClick={() => deleteCommentById(c.id)}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>

                        <div className="EasyEdit" name="text" onChange={setData}>
                            <EasyEdit
                                value={c.text}
                                type="textarea"
                                onSave={() => handleSave}
                                onCancel={cancel}
                                saveButtonLabel={<FontAwesomeIcon className="Edit-comment-submit" icon={faCheck}/>}
                                cancelButtonLabel={<FontAwesomeIcon className="Edit-comment-cancel" icon={faTimes}/>}
                                attributes={{name: "text"}}

                            />
                        </div>
                    </div>
                )}
            </div>
            <div>
                <AddComment/>
            </div>
        </div>
    )
}

export default Comments