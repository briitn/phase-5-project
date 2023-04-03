import { useState, useEffect, useContext, Fragment } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"
import Comments from "./Comments"
function Blog(){
    document.title= 'Channel/view-blog'
const theme=useContext(ThemeContext)

const history=useHistory()
//only want this to run on refresh
useEffect(()=>{ if (theme.readBlog.length===0){
    fetch('/aBlog')
    .then(res=>res.json())
.then(res=>{theme.setReadBlog([res])
})}
},[])

   
let id;
const mapBlog=theme.readBlog?.map(item=>{
id=item.id
// if post has tags put them in local storage. If not clear previous tag set to local storage
// we want tags in local storage to fetch new recommende post based on tag name
item.tags.length!==0?localStorage.setItem('tag',item.tags[0].name): localStorage.removeItem('tag')

    return (
        <span key={item.id} >
      
          <span onClick={(e)=>{
                   fetch(`/users/${item.user.id}`)
                   .then(res=>res.json())
                   .then(res=>{
                   theme.setAUser([res])
                   history.push('/author')
                                })
                         }} >
         <img src={item.user.image_url}  alt='userImage' className="profilePic3"/>
            <b >{item.user.username}</b>
        </span>
        { item.tags.length!==0?<div> {item.tags.map(item=>{
        
    return(<div className="blogBadge" id={item.id}><p className="tag"><i className="fas fa-tag"></i>{item.name}</p></div>)})}</div>:<div></div>}  
          <span id='blogTitle'> <h1>{item.title}  </h1>    </span>   
          
<p className='dox2'> {item.blog}</p>
<div className="pubBtn" ><span  >
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
theme.setFromAblog(true)
localStorage.setItem('fromBlog', "Create an account to like post" )
history.push('/signup')
}}>❤️{item.likes}</em>}</em>


</span>
    </div>   
        </span>
    )
})

console.log(theme.tagName)
return (<Fragment>
     <Topnav/>
  {mapBlog}
<footer id="blog-foot"><Comments /></footer>
</Fragment>)
}
export default Blog