import { useState, useEffect, useContext, Fragment } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"
function Blog(){


const theme=useContext(ThemeContext)
console.log(theme.readBlog)
const [comments,setComments]=useState()
const [comment, setComment]=useState('')
const history=useHistory()
const [showComments, setShowComments]=useState(false)
useEffect(()=>{ if (theme.readBlog.length===0){
    fetch('/aBlog')
    .then(res=>res.json())
.then(res=>{theme.setReadBlog([res])
})}
},[])
useEffect(()=>{
    fetch("/comments")
    .then(res=>res.json())
    .then(res=>{

     setComments(res)
    })},[])
    const mapComments=comments?.map(item=>{
        return(<div key={item.id}>
            <img src={item.user.image_url}
            alt='userImage' className="profilePic"/>
           <p>{item.comment}</p> 
        </div>)
    })
let id
const mapBlog=theme.readBlog?.map(item=>{
id=item.id
item.tags.length!==0?theme.setTagName(item.tags[0].name): console.log('lol')

    return (
        <div key={item.id} >
      
          <span onClick={(e)=>{
                   fetch(`/users/${item.user.id}`)
                   .then(res=>res.json())
                   .then(res=>{
                   
               
                       theme.setAUser([res])
                           
                                   history.push('/author')
                                })
            }}><img src={item.user.image_url}
            alt='userImage' className="profilePic3"/>
            <b >{item.user.username}</b>
        </span>  
          <span id='blogTitle'> <h1>{item.title}  </h1>    </span>   
<p className='dox2'> {item.blog}</p>
<div className="pubBtn" >{!showComments?<span  >
 <em> 
{theme.isLoggedIn?<p onClick={(e)=>fetch('/views',{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(
        {
           id: item.id,
         likes: true
        }
    )

})
.then((res)=>{
    if (res.ok){
        res.json().then((res)=>{theme.setReadBlog([res])
      
        })
    }
    else {
        res.json().then((err) => {

       alert(err.errors)})
}
}) }>❤️{item.likes}</p>:<em onClick={(e)=>{ 
    if (theme.isLoggedIn===false){
theme.setFromAblog(true)
localStorage.setItem('fromBlog', "Create an account to like post" )
history.push('/signup')
}}}>❤️{item.likes}</em>}</em>
<em onClick={()=>{setShowComments(true)}}>💬{comments?.length}</em></span>:
<div  className="forCs">
<button id='x' onClick={()=>{setShowComments(false)}}>x</button>

    <textarea value={comment} className='iComment'
    placeholder='comment' onChange={(e)=>{setComment(e.target.value)}} onClick={(e)=>{ 
        if (theme.isLoggedIn===false){
theme.setFromAblog(true)
localStorage.setItem('fromBlog', "Create an account to comment" )
history.push('/signup')
    }}}></textarea>
   {comment?<button onClick={()=>{ fetch('/comments',{
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(
        {
         post_id: id,
        user_id: theme.userId,
        comment
        }
    )



  }).then(res=>res.json())
  .then(res=>{
  setComments([res,...comments])
  })}}>Sumbit</button>:<p></p>}
   {mapComments}
   
    </div>}

    </div>   
        </div>
    )
})


return (<Fragment>
     <Topnav/>
  <div>{mapBlog}</div>

 
  
</Fragment>)

}



export default Blog