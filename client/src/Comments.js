import { useState, useEffect, useContext, Fragment } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"

function Comments(){

const theme=useContext(ThemeContext)
const [comments,setComments]=useState()
const [comment, setComment]=useState('')
const history=useHistory()
const [showComments, setShowComments]=useState(false)

useEffect(()=>{
    fetch("/comments")
    .then(res=>res.json())
    .then(res=>{

     setComments(res)
    })},[]);

    const mapComments=comments?.map(item=>{
        return(<div key={item.id}>
            <hr></hr>
            <img src={item.user.image_url}
            alt='userImage' className="profilePic"/>
           <p>{item.comment}</p> 
        </div>)
    })






return (<div className="holdComments">
    {!showComments?<span >
 
<em onClick={()=>{setShowComments(true)}}>💬{comments?.length}</em></span>  :  <div  className="forCs">
 <button id='x' onClick={()=>{setShowComments(false)}}>x</button>
 
  <textarea value={comment} 
  className='iComment'
     placeholder='comment'
     onChange={(e)=>{setComment(e.target.value)}} 
     onClick={(e)=>{ 
         if (theme.isLoggedIn===false){
 theme.setFromAblog(true)
 localStorage.setItem('fromBlog', "Create an account to comment" )
 history.push('/signup')
     }}}></textarea>
    {comment.trim().length!==0?<button onClick={()=>{ fetch('/comments',{
     method: "POST",
     headers:{"Content-Type":"application/json"},
     body: JSON.stringify(
         {
          post_id: theme.readBlog[0]?.id,
         user_id: theme.userId,
         comment
         }
     )
 }).then((res)=>{
     if (res.ok){
         res.json().then((res)=>{
            
             setComments([res,...comments])
         })
     }
     else {
         res.json().then((err) => {
   
        alert(err.errors)})
 }
 
     })
   }}>Sumbit</button>:<p></p>}
    {mapComments}
    
     </div> }
</div>)
}
export default Comments