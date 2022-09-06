const Story = ({story}) => {
  return (
    <div className="story">
        <img src={story.image} className="story_img" alt="" />
        <div className="story_profile_pic">
            <img src={story.profile_picture} alt="" />
        </div>
        <div className="story_profile_name">{story.profile_name}</div>
    </div>
  )
}
export default Story