import { useEffect, useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
const CreatePostPopup = ({ user }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  console.log(showPrev);
  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerBackground text={text} user={user} setText={setText} />
          </>
        ) : (
          <ImagePreview
            setShowPrev={setShowPrev}
            text={text}
            user={user}
            setText={setText}
            images={images}
            setImages={setImages}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button type="submit" className="post_submit">
          Post
        </button>
      </div>
    </div>
  );
};
export default CreatePostPopup;
