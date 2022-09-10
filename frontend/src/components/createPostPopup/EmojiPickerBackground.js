import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const EmojiPickerBackground = ({type2, text, setText, user }) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={`${type2 && 'images_input'}`}>
      <div className={`${!type2 && 'flex_center'}`}>
        <textarea
          ref={textRef}
          className={`post_input ${type2 && 'input2'}`}
          maxLength="100"
          value={text}
          placeholder={`what's on your mind, ${user.first_name}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={`${!type2 && 'post_emojis_wrap'}`}>
        {picker && (
          <div className={`comment_emoji_picker ${type2 ? "movepicker2" : "rlmove"}`}>
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src="../../../icons/colorful.png" alt="" />}
        <i className={`emoji_icon_large ${type2 && 'moveleft'}`} onClick={() => setPicker(!picker)}></i>
      </div>
    </div>
  );
};
export default EmojiPickerBackground;
