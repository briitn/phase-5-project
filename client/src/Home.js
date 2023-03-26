import { Fragment, useContext } from "react"

import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"

function Home(){

    const theme=useContext(ThemeContext)
    theme.recommendedStuff?.sort((a, b) =>b.views- a.views);
theme.allTags.sort((a, b) =>b.posts.length- a.posts.length);

const history=useHistory()
localStorage.removeItem("editingBlog");
localStorage.removeItem("id");
localStorage.removeItem("editingTitle");
const eArray=[]


const mapRecommendedStuff=theme.recommendedStuff?.slice(0,2).map(item=>{
    eArray.push(item.user)
    return(<div key={item.id} >
      <div className="cont">
       <span>  <img src={item.user.image_url} 
            alt='authours proifile'
            className='profilePic'/>
        <em>{item.user.username}</em>
      
       </span>
       <h3>{item.title}</h3>
            <p>{`${item.blog.slice(0,item.blog.length*0.05)}...`}</p>

<p  onClick={()=>{theme.setReadBlog([item])


item.tags.length!==0?theme.setTagName(item.tags[0].name): theme.setTagName()
localStorage.clear()
fetch('/views',{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(
        {
           id: item.id,
         views: true,
         tag: theme.tagName
        }
    )

})
.then((res)=>{
    if (res.ok){
        res.json().then((res)=>{

      
            history.push('/blog')
        })
    }
    else {
        res.json().then((err) => {

       alert(err.errors)})
}
}) 

}}>read more</p></div>

    </div>)
})

const mapBlogs=theme.allBlogs?.slice(0,30).map(item=>{

    return (
        <div key={item.id} className='container'>
            <img src={item.user?.image_url}
            alt='userImage' className="profilePic"/>
           <em onClick={(e)=>{
     
fetch(`/users/${item.user.id}`)
.then(res=>res.json())
.then(res=>{


    theme.setAUser([res])
history.push('/author')
})
           }}
           >{item.user.username}</em>
            <div><b>{item.title}</b>
            { item.tags.length!==0?<div> {item.tags.map(item=>{
    return(<div className="blogBadge" id={item.id}><p className="tag"><i className="fas fa-tag"></i>{item.name}</p></div>)})}</div>:<div></div>}
            </div>
<p>{`${item.blog.slice(0,item.blog.length*0.10)}...`}</p>
<p>👁{item.views}</p>
<p  onClick={()=>{theme.setReadBlog([item])

item.tags.length!==0?theme.setTagName(item.tags[0].name):theme.setTagName()

fetch('/views',{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(
        {
           id: item.id,
         views: true,
     
         tag: theme.tagName
        }
    )

})
.then((res)=>{
    if (res.ok){
        res.json().then((res)=>{
            
        

      history.push('/blog')
        })
    }
    else {
        res.json().then((err) => {

       alert(err.errors)})
}
}) 
}}>read more</p>

        </div>
    )
})


const filteredAuthor=eArray.filter(item=>{return item.username!==theme.currentUser})
const authors=[...new Set(filteredAuthor)]


return (
    <Fragment>
         
<Topnav/>
<div className="globe" ><img src='http://www.clker.com/cliparts/w/A/B/P/M/r/enlarged-thick-blue-wire-globe.svg' alt='blue globe'/></div>

    <div className="sidenav">
    <div className="cont">
        <b>Popular Topics</b>
        {theme.allTags.slice(0,3).map(item=>{
         
            return(
                <div key={item.id} className='badge'>
                    <p className='tag'
                  onClick={(e)=>{
                    fetch('/filtered',
                    {
                       method:"POST",
                       headers:{"Content-Type":"application/json"},
                       body: JSON.stringify(
                           {
                           name:item.name
                           }
                       )
                    
                    })
                 .then(res=>res.json())
                 .then(res=>{theme.setFilteredBlogs(res)  
                    theme.setUserSearched(item.name)
                   history.push('/search') 
                      })
             
                  }}> <i className="fas fa-tag"></i>{item.name}</p></div>
            )
        })} </div> 
        <b>Recommended Blogs</b>
        {mapRecommendedStuff}
        <div> <b>Recommended Author</b>
       {authors.slice(-1).map(item=>{
  
        return(<div key={item.id} className='authors' onClick={(e)=>{
            fetch(`/users/${item.id}`)
            .then(res=>res.json())
            .then(res=>{
            
        
                theme.setAUser([res])
                    
                            history.push('/author')
                         })
     }}> 
   <img src={item.image_url} className='profilePic'
   alt='author profile'/> 
       <em >{item.username}</em>
            <p>{item.bio}</p>
        </div>)
       })}
       </div>
      </div>
  
 <span>  <div className="box" >
        <h1>Picked For You</h1>
    {mapBlogs}
        </div></span> 

       
  
 
   
    </Fragment>
)

}






export default Home