import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Auctions from './Components/Auctions';
import Login from './Components/Login';
import Sign_Up from './Components/Sign_Up';
import Post from './Components/Post'
import Profile from './Components/Profile';
import UserPosts from './Components/UserPosts';
import Home from './Components/Home';
import Payment from './Components/Payment';
import AddPost from './Components/AddPost';
import EditPost from './Components/EditPost';
import AdminPage from './Components/AdminPage';
import UsersPageForAdmin from './Components/UsersPageForAdmin';
import EditUserPageForAdmin from './Components/EditUserPageForAdmin';
import PostsPageForAdmin from './Components/PostsPageForAdmin';
import CommentsPageForAdmin from './Components/CommentsPageForAdmin';
import Favorite from './Components/Favorite';


function App() {

  return (
    <div className="App">
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/auctions"  element={<Auctions />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/sign_up"  element={<Sign_Up />} />
        <Route path="/post/:id"  element={<Post />} />
        <Route path="/profile"  element={<Profile />} />
        <Route path="/user_post"  element={<UserPosts />} />
        <Route path="/add_post"  element={<AddPost />} />
        <Route path="/payment"  element={<Payment />} />
        <Route path="/edit_post/:id"  element={<EditPost />} />
        <Route path="/admin"  element={<AdminPage />} />
        <Route path="/admin/users"  element={<UsersPageForAdmin />} />
        <Route path="/admin/posts"  element={<PostsPageForAdmin />} />
        <Route path="/admin/comments"  element={<CommentsPageForAdmin />} />
        <Route path="/admin/edit_user/:id"  element={<EditUserPageForAdmin />} />
        <Route path="/favorite"  element={<Favorite />} />

        <Route path="/"  element={<Home />} />

      </Routes>
    </BrowserRouter>

     <Footer/>

     </div>
);
}

export default App;
