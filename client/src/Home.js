import { Fragment, useContext } from "react"
import Recommended from "./Recommended"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"

function Home(){

    const theme=useContext(ThemeContext)
  
theme.allTags.sort((a, b) =>b.posts.length- a.posts.length);

const history=useHistory()
localStorage.removeItem("editingBlog");
localStorage.removeItem("id");
localStorage.removeItem("editingTitle");


const mapBlogs=theme.allBlogs?.map(item=>{

    return (
        <div key={item.id} className='container'>
            <hr></hr>
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
});
console.log(theme.allTags)
const mapThemeTags=theme.allTags.slice(0,3).map(item=>{
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
   })



return (
    <Fragment> <Topnav/>
<div className="globe" ><img src='http://www.clker.com/cliparts/w/A/B/P/M/r/enlarged-thick-blue-wire-globe.svg' alt='blue globe'/></div>

    <div className="sidenav">
    <div className="cont">
        <b>Popular Topics</b>
        {mapThemeTags} </div> 
        <b>Recommended Blogs</b>
<Recommended/>
        
      </div>
  
 <span>  <div className="box" >
        <h1>Picked For You</h1>
    {mapBlogs}
        </div></span> 

       
  
 
   
    </Fragment>
)

}






export default Home