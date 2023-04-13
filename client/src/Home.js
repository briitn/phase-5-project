import { Fragment, useContext } from "react"
import Recommended from "./Recommended"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"

function Home(){
    document.title= 'Channel'
    const theme=useContext(ThemeContext)
  
theme.allTags.sort((a, b) =>b.posts.length- a.posts.length);

const history=useHistory()
localStorage.removeItem("editingBlog");
localStorage.removeItem("id");
localStorage.removeItem("editingTitle");
localStorage.removeItem("search");

const mapBlogs=theme.allBlogs?.map(item=>{

    return (
        <div key={item.id} >
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
           >{item.user?.username}</em>
            <div><b>{item.title}</b>
            { item.tags?.length!==0?<div> {item.tags.map(item=>{
        
    return(<div className="blogBadge" id={item.id}><p className="tag"><i className="fas fa-tag"></i>{item.name}</p></div>)})}</div>:<div></div>}
            </div>
<p>{`${item.blog.slice(0,item.blog.length*0.10)}...`}</p>
<p>👁{item.views}</p>
<p  onClick={()=>{theme.setReadBlog([item])


fetch('/views',{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(
        {
           id: item.id,
         views: true,
     
    
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
const observer= new IntersectionObserver((entries)=>{
    entries?.forEach((entry)=>{

        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }
        else {entry.target.classList.remove('show')}
    })
})

const hiddenElements=document.querySelectorAll('.container')
hiddenElements.forEach((el)=>{observer.observe(el)})
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
    <div className="container">
        <b>Popular Topics</b>
        {mapThemeTags}
        <b>Recommended Blogs</b>
<Recommended/>
</div> 
      </div>
  
 <span>  <div className="box" >
        <h1>Picked For You</h1>
        <div className="container">    {mapBlogs}</div>

        </div></span> 

       
  
 
   
    </Fragment>
)

}






export default Home