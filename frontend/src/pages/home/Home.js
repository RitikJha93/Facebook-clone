import { useSelector } from "react-redux"
import CreatePost from "../../components/CreatePost"
import Header from "../../components/Header"
import HomeLeft from "../../components/Home/Left"
import RightHome from "../../components/Home/Right"
import SendVerification from "../../components/Home/sendVerification"
import Stories from "../../components/Home/stories/"
import './Home.css'
const Home = () => {
  const {user}  = useSelector((state)=>({...state}))
  return (
    <div className="home">
      <Header/>
      <HomeLeft user={user}/>
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification user={user} />}

        <CreatePost user={user}/>
      </div>
      <RightHome user={user}/>
    </div>
  )
}
export default Home