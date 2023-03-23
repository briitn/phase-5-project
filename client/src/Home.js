import { Fragment, useContext } from "react"

import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"

function Home(){
  
    const theme=useContext(ThemeContext)
    theme.recommendedStuff?.sort((a, b) =>b.views- a.views);
theme.allTags.sort((a, b) =>b.posts.length- a.posts.length);


const history=useHistory()

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

            theme.setAllBlogs(res)
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
           <div><b onClick={(e)=>{
     
fetch(`/users/${item.user.id}`)
.then(res=>res.json())
.then(res=>{


    theme.setAUser([res])
history.push('/author')
})
           }}
           >{item.user.username}</b></div> 
            <span><i>{item.title}</i></span>
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
            
            theme.setAllBlogs(res)

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

console.log(authors)
return (
    <Fragment>
         
 <header><Topnav/></header>

<img src='https://img.freepik.com/premium-vector/globe-silhouette-america-continent-map-earth-latitude-longitude-line-grid-vector_8589-692.jpg' className="globe" alt='white and black globe'/>
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
             
                  }}> 🏷{item.name}</p></div>
            )
        })} </div> 
        <b>Recommended Blogs</b>
        {mapRecommendedStuff}
        <div> <b>Recommended Author</b>
       {authors.slice(0,1).map(item=>{
  
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