import '../App.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';



function EditPost() {

  const [title, settitle] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [post, setPost] = useState('');
  const [loding, setLoding] = useState(false);

  let { id } = useParams();


  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });


  useEffect(() => {
        
        axios.all([
            axios.get(`https://mazad-website.herokuapp.com/posts/${id}`)
          ])
          .then(r => {
            setPost(r[0].data);
             });
          
    
            },[]);



            const uploadImg = async (e) =>{
              const files = e.target.files;
              const data = new FormData();
              data.append('file', files[0]);
              data.append('upload_preset', 'jeykewbu');
              setLoding(true);
            
              const res = await fetch("https://api.cloudinary.com/v1_1/dtqxphvwc/image/upload",
              {
                method:'POST',
                body:data
              })
            
              const file = await res.json();
              setImg(file.url);
              setLoding(false)
            
            }



  return (<>


<div className="container-addPost add-post-text">
	<div>
	    
	    <div>
	        
    		<h1 className='display-6 fw-bolder text-center mb-2 add-post-text'>Edit post</h1>
    		
    		    
    		    <div className="form-group has-error">
    		        <label htmlFor="slug">Title</label>
    		        <input type="text" className="form-control" name="slug" placeholder={post.title} onChange={(e)=>{
                  settitle(e.target.value);
                }}/>
    		    </div>
    		    
    		    <div className="form-group">
    		        <label htmlFor="title">City</label>
                <select defaultValue="" id="inputState" className="form-control" onChange={(e)=>{
                  setCity(e.target.value);
                }}>
         <option value="" disabled >Choose Mazad City</option>
         <option value='Al Bukayriyah'>Al Bukayriyah</option>
         <option value='Riyadh'>Riyadh</option>
         <option value='Abha'>Abha</option>
         <option value='Buraydah'>Buraydah</option>
         <option value='Dammam'>Dammam </option>
         <option value='Jeddah'>Jeddah</option>
         <option value='Al Majma’ah'>Al Majma’ah</option>
         <option value='Mecca'>Mecca</option>
         <option value='Medina'>Medina</option>
         <option value='Qadeimah'>Qadeimah</option>
      </select>
    		    </div>

            <div className="form-group">
    		        <label htmlFor="title">Mazad Type</label>
                <select defaultValue=""  id="inputState" className="form-control" onChange={(e)=>{
                  setType(e.target.value);
                }}>
         <option value="" disabled>Choose Mazad Type</option>
         <option value='Cars'>Cars</option>
         <option value='Estate'>Estate</option>
         <option value='Houses'>Houses</option>
      </select>
    		    </div>
    		    
    		 

    		    <div className="form-group">
    		        <label htmlFor="description">Description</label>
    		        <textarea rows="5" className="form-control" placeholder={post.content} name="description" onChange={(e)=>{
                  setDescription(e.target.value);
                }}></textarea>
    		    </div>
            <label htmlFor="formFileSm" className="form-label">Picture</label>
           
            {img === '' ? '' :<div className='wrapper-add-post'> <img src={img} height="50%"/><br></br> </div>}



            {loding ?  <>     <br></br> <p className='text-center'>    <div className="spinner-border text-secondary" role="status">
              <span className="sr-only text-center">Loading...</span>
            </div></p> <br></br>  </>  :<>
            <input className="form-control mb-4" type="file" id="formFileMultiple" accept="image/png, image/gif, image/jpeg" multiple onChange={(e)=>{
                  uploadImg(e);
                }} />  
                
                
              


    		    
    		    <div className="form-group text-center">
    		        <button type="button" className="btn btn-primary" onClick={()=>{
                
                                post.title = title
                                post.city = city
                                post.content =description
                                post.images = img
                                post.type = type
                            
                            
                        axios.put(`https://mazad-website.herokuapp.com/posts/${id}`, post)
                          .then(response => {});
                          window.location = '/auctions'
                             
                            }}>
    		            Create
    		        </button>

    		    </div></>}
    		    
		</div>
		
	</div>
</div>
  </>);
}

export default EditPost;
