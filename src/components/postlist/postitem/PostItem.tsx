import {FC, useState} from "react";
import "./postitem.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import {useNavigate} from "react-router-dom";
import { IPost } from "../../../types/post-type";
import {useAppSelector} from "../../../hooks";
import EditPostButtons from "../../editPostButtonGroup/EditPostButtons";

interface PostItemProps {
  post: IPost;
  displayImage?: boolean;
}

const PostItem: FC<PostItemProps> = ({ post, displayImage }) => {
  const {user} = useAppSelector(state => state.auth)
  const [loadingImage, setLoadingImage] = useState(true)
  const navigate = useNavigate()
  
  return (
    <div onClick={() => navigate(`/posts/${post.idA}`)} className={"postItem"}>
      {displayImage && (
        <img
            style={{
              display: loadingImage ? 'none' : 'unset'
            }}
          width={700}
          height={270}
          className={"postImg"}
          src={`${post.medias[0].url}`}
          alt="postPicture"
          onLoad={() => setLoadingImage(false)}
        />
      )}
      {loadingImage && displayImage && <div className={'imgSkeleton'}/>}
      <div className={"previewInfo"}>
        <div className={'previewInfoTop'}>
          {user?.role === "admin" && <EditPostButtons post={post}/>}
        </div>

        <div className={"postInfoTitle"}>
          <h2>{post.title}</h2>
        </div>
      </div>
      <div className={'postBottom'}>
        <div className={"postReactions"}>
          <div className={"postReactionsInfo"}>
            <RemoveRedEye className={"postReactionsIcon"} />
            <span>{post.reactions.length} Views</span>
          </div>
          <div className={"postReactionsInfo"}>
            <FavoriteBorderIcon className={"postReactionsIcon"} />
            <span>{post.reactions.length} Likes</span>
          </div>
          <div className={"postReactionsInfo"}>
            <ChatBubbleOutlineIcon className={"postReactionsIcon"} />
            <span>{post.comments.length} Comments</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PostItem;

