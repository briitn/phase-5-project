import { Fragment, useContext, useState } from "react"
import FormField from "./styles/FormField"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
function Signup(){
  document.title= 'Channel/signup'
    const theme=useContext(ThemeContext)
 const[newUsername, setNewUsername]=useState('')
  const fromBlog= localStorage.getItem('fromBlog')
      const [imageUrl, setImageUrl]=useState('')
      const [password, setPassword]
      =useState('')
     const [bio, setBio]=useState('')
     const [loading, setLoading]=useState(false)
  
     const history=useHistory()

      function changeSubmit(e){
          e.preventDefault()
       
          fetch ("/users/", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                  username:newUsername,
                  password,
                   bio,
                  image_url: imageUrl
  
              })
          }).then(r=>{if (r.ok) {
         
              setLoading(true)
              setTimeout(() => {
                theme.setIsLoggedIn(true)
                fromBlog?history.push('/blog'):history.push('/')
            localStorage.clear()
              }, 1000); 
              r.json();
            } else {
              r.json().then((err) => 
              alert(err.errors));
            }})
      }
      
      function changePass(e){

          setPassword(e.target.value)
  
      }
  
      function changeUser(e){

          setNewUsername(e.target.value)
        
      }
  
      function changeProfilePic(e){
     
          setImageUrl(e.target.value)
      }

      function changeBio(e){
        setBio(e.target.value)
      
      }
      return (
        <Fragment>
            <header><h1 onClick={()=>{
                      localStorage.clear()
            history.push('/')
              }}>Channel🌐</h1></header>
          <div className='fox'>
        
        { fromBlog? <div> <h2>{fromBlog}</h2></div>:null}
  
          <form onSubmit={changeSubmit} className="form">
              <FormField>
           
              <input type='text'
              name="username"
               className="username"
               placeholder="username*"
              value={newUsername}
              onChange={changeUser}
              />
              </FormField>
              <FormField>
         
              <input type='password'
              name="password"
               className="username"
               placeholder="password*"
              value={password}
              onChange={changePass}/>
       </FormField>
       
       <FormField>
         
              <input type='url'
              name="imageUrl"
              className="username"
              placeholder="profile picture "
              value={imageUrl}
              onChange={changeProfilePic}/>
       </FormField>
       <FormField>
         
              <input name="bio"
  className="username"
  placeholder="bio"
  value={bio}
  onChange={changeBio}/>
              
              
       </FormField>
      
             <button type="submit" className="submit" >Submit</button>
           
             </form> 
             <span className="bottom"><p>Already have an account?<a href="/login">Sign in</a></p>
         {loading?<div>'Account succesfully created. Redirecting to home page...' </div>:<div></div>}</span> 
          </div>
       
          </Fragment>
      )
  }
  export default Signup