import React, {useState, useEffect} from "react";
import propTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { useMutation, useQuery } from "react-apollo-hooks";
import { toast } from "react-toastify";
import { ME } from "../../SharedQueries";


const PostContainer = ({
    id, 
    user, 
    files, 
    likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location
}) => {
    const [isLiked_state, setIsLiked] = useState(isLiked);
    const [likeCount_state, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");
    const { data : meQuery } = useQuery(ME);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE,{
        variables: { postId:id }
    })
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value}
    })
    const slide = () => {
        const totalFiles = files.length;
        if(currentItem === totalFiles - 1){
            setTimeout(() => setCurrentItem(0), 2000);
        }
        else {
            setTimeout(() => setCurrentItem(currentItem + 1), 2000);
        }
    };
    
    useEffect(() => {
        slide();
    }, [currentItem]);

    const toggleLike = async() =>{
        if(isLiked_state === true){
            setIsLiked(false);
            setLikeCount(likeCount_state -1);
        }
        else {
            setIsLiked(true);
            setLikeCount(likeCount_state +1);
        }
        try{
            await toggleLikeMutation();
        }
        catch{
            setIsLiked(!isLiked_state)
            toast.error("Cant register like");
        }
    }

    const onKeyPress = async(e) =>{
        const { which }=e;
        if(which === 13){
            e.preventDefault();
            try{
                const {data : {addComment}} = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                comment.setValue("");
            }
            catch{
                toast.error("Can't send comment")
            }
        }
        return;
    }

    return <PostPresenter 
    user={user} 
    files={files}
    likeCount={likeCount_state}
    isLiked={isLiked_state}
    comments={comments}
    createdAt = {createdAt}
    newComment = {comment}
    setIsLiked = {setIsLiked}
    setLikeCount = {setLikeCount}
    cation = {caption}
    location = {location}
    currentItem = {currentItem}
    toggleLike = {toggleLike}
    onKeyPress = {onKeyPress}
    selfComments = {selfComments}
    />;
};

PostContainer.propTypes = {
    id:propTypes.string.isRequired,
    user:propTypes.objectOf(propTypes.shape({
        id : propTypes.string.isRequired,
        avatar : propTypes.string,
        userName: propTypes.string.isRequired
    })).isRequired,
    files:propTypes.arrayOf(propTypes.shape({
        id:propTypes.string.isRequired,
        url: propTypes.string.isRequired
        })
    ).isRequired,
    likeCount:propTypes.number.isRequired,
    isLiked:propTypes.bool.isRequired,
    comments:propTypes.arrayOf(propTypes.shape({
        id:propTypes.string.isRequired,
        text:propTypes.string.isRequired,
        user:propTypes.objectOf(propTypes.shape({
                id:propTypes.string,
                userName:propTypes.string
        })
        ).isRequired
    })).isRequired,
    createdAt:propTypes.string.isRequired,
    caption : propTypes.string.isRequired,
    location : propTypes.string.isRequired
};

export default PostContainer;