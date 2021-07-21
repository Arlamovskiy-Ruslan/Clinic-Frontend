import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:8080`
});

class CommentService {

    addComment(id, comment){
        return instance.post(`/patient/${id}/comment/create`,{
            text: comment.text,
        })
    }

    deleteComment(id){
        return instance.delete(`/patient/comment/${id}/delete`)
    }

    updateComment(p_id, c_id, comment){
        return instance.put(`/patient/${p_id}/comment/${c_id}/update`, {
            text: comment.text
        })
    }
}

export default new CommentService();