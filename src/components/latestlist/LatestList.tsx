import {FC, memo, useState} from "react";
import "./latest.scss";
import {useAppDispatch, useAppSelector, useAuth} from "../../hooks";
import { formatTime } from "../../helpers";
import {Link, useNavigate} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "../common/button/Button";
import ModalWindow from "../modalWindow/ModalWindow";
import {IPost} from "../../types/post-type";

const LatestList: FC<{todayPosts: IPost[]}> = memo(({todayPosts}) => {
    const {role} = useAuth()
  const {isAuth} = useAppSelector((state) => state.auth)
    const {tags} = useAppSelector(state => state.tags)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const handleCreate = (path: string) => {
        if(!isAuth){
            setShowModal(true)
        }else{
            navigate(path)
        }
    }


  return (
      <div className={'latestWrapper'}>
          <ModalWindow
              showModal={showModal}
              setShowModal={setShowModal}
          />
          <div className={'createItemButtons'}>
          {role === 'admin' && <div className={'createNewPostBtn'}>
                  <Button
                      text={'Create post'}
                      type={'button'}
                      handleClick={() => handleCreate('/create')}
                  />
              </div>}
          </div>
          <div className={"latestList"}>
              <div className={"latestTitle"}>
                  <h3>Latest</h3>
              </div>
              <div className={"latestItems"}>
                  <ul>
                      {todayPosts.length > 0 &&
                          todayPosts.map((post) => (
                              <li key={post.idA}>
                                  <span>{formatTime(post.created_at)}</span>
                                  <Link to={`/posts/${post.idA}`} className={"latestLink"}>
                                      <h5>{post.title}</h5>
                                  </Link>
                                  <div className="latestPostReactions">
                                      <div className="latestPostReactionItem">
                                          <FavoriteBorderIcon className="latestPostReactionIconLike" />
                                          <span>{post.reactions.length}</span>
                                      </div>
                                  </div>
                              </li>
                          ))}
                  </ul>
              </div>
          </div>
      </div>
  );
});

export default LatestList
