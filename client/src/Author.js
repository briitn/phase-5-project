import { Fragment,  useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"
function Author(){
    document.title= 'Channel/view-user'
    const theme=useContext(ThemeContext)

    
 useEffect(()=> {
        fetch('/authors')
        .then(res=>res.json())
    .then(res=>{theme.setAUser([res])
        console.log(res)
})
    },[])
const holdPost=[]
let id
let username
const history=useHistory()
    const mapUserStuff=theme.aUser?.map(item=>{
        holdPost.unshift(item.posts)
      console.log(item.posts)
        id=item.id
        username=item.username
      
        return(
            <div key={item.id}>
                <img src={item.image_url} 
                alt='user profile'
                className='profilePic3'/>
                <h2>{item.username}</h2>
        
            <p>{item.bio}</p> 

                </div>
    )
    })
    holdPost[0]?.sort((a, b) =>b.id- a.id
    )

    console.log(username)
return (
<Fragment>
 
<header><Topnav/></header>
<div className="dox">
<h1>{username}</h1>
<h2>All Posts ({holdPost[0]?.length}) </h2>
    {holdPost[0]?.map(item=>{

        return(<div key={item.id} >
            <hr></hr>
             <div className="container">
                 <b>{item.title}</b>
                 <p>{`${item.blog.slice(0,item.blog.length*0.10)}...`}</p>
<p>👁{item.views}</p>
<p  onClick={()=>{

fetch('/views',{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(
        {
           id: item.id,
         views: true,
         title: item.title
        }
    )

}) .then(res=>res.json())
.then(res=>{

console.log([res])
    theme.setReadBlog([res])
  
    history.push('/blog')      
             })


}}>read more</p>
{id===theme.userId?<span><p onClick={(e)=>{
localStorage.setItem('editingBlog', JSON.stringify(item.blog) )
localStorage.setItem('editingTitle', JSON.stringify(item.title) )
localStorage.setItem('id', JSON.stringify(item.id) )
history.push('/createBlogs')}}>edit</p>
<p onClick={(e)=>{
   if( window.confirm("Are you sure you want to delete your post?")){
    fetch(`posts/${item.id}`,
    {
        method: "DELETE"
    }).then(res=>res.json())
    .then(res=>{theme.setAUser([res])
    console.log(res)})
 }
}}>Delete</p></span>:null}
 </div>
        </div>)
    })}
</div>
<div  className='sidenav2'>
{mapUserStuff}
</div>
</Fragment>)
}

export default Author