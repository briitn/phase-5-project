import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"
import Tags from "./Tags"
function CreateBlogs(){
    const theme=useContext(ThemeContext)
    console.log(theme.userStuff[0]?.id)
const [title, setTiltle]=useState('')
const [aiTags, setAiTags]=useState([])
    const [blog, setBlog]=useState('')
const [id, setId]=useState()
 const[uTag, setUTag]=useState('')
useEffect(()=>{if (theme.editBlog){
    setId(theme.editBlog.id)
setTiltle(theme.editBlog.title)
setBlog(theme.editBlog.blog)
}},[])
const history=useHistory()
    const [canCreate, setCanCreate]=useState(false)
    const [tags,setTags]=useState([])
    const [tagValue, setTagValue]=useState('')

const [showAiTags, setShowAiTags]=useState(false)
    console.log(tags.length)

    function submitBlog(e){


console.log(id)
if (theme.editBlog){
    fetch(`/posts/${id}`,{  method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(
        {
          
            id,

            blog,
        
            title,
        
           
        }
    )

})
.then((res)=>{
    if (res.ok){
        res.json().then((res)=>{
           
            console.log(res + 'ppp')
           theme.setAllBlogs([res, ...theme.allBlogs])
           theme.setAUser([res])
           setShowAiTags(true)
        })
    }
    else {
        res.json().then((err) => {
            console.log(err)
       alert(err.errors)})
}

    })
}else{
fetch(`/posts`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(
                    {
                        user_id: theme.userId ,
                        id,

                        blog,
                        likes: 0,
                        title,
                        views: 0,
                       
                    }
                )
        
            })
            .then((res)=>{
                if (res.ok){
                    res.json().then((res)=>{
                        setAiTags(res.response[0])
                        console.log(res)
                        setShowAiTags(true)
                       theme.setAUser([res])
                  console.log(theme.aUser)
                    })
                }
                else {
                    res.json().then((err) => {
                        console.log(err)
                   alert(err.errors)})
    }
}) } 


}

console.log(tags)
const mapAiTags=aiTags?.slice(0,3).map(item=>{
    return(<div key={Math.random()} >
      
        <small onClick={(e)=>{setTags([...tags, item]); e.target.className='hTag'}}>🏷{item}</small>
      </div>
       
    )
})
    return (
        <div>
<header id="channel3"><b onClick={()=>{history.push('/')}}>Channel🌐</b>
<img src={theme.userStuff[0]?.image_url} className='profilePic2' 
onClick={(e)=>{
                   fetch(`/users/${theme.userStuff[0].id}`)
                   .then(res=>res.json())
                   .then(res=>{
                   
               
                       theme.setAUser([res])
                           
                                   history.push('/author')
                                })
            }}/>
</header>
            <div>
          
        </div>
         
               <span><textarea
                placeholder="title"
               
                value={title} onChange={(e)=>{
                 setTiltle(e.target.value)
                }}className="title"></textarea>
                </span>
                <div><textarea
                  value={blog} onChange={(e)=>{setBlog(e.target.value)}} placeholder='Write' className='article'></textarea>
               <span className="pubBtn"><button className="button" onClick={submitBlog}>Publish</button></span> 
               </div> 
         {showAiTags?<div className="popup"> 
         <form onSubmit={(e)=>{e.preventDefault()
            setTags([...tags,uTag])}}><input type='text' placeholder="add tag" 
         value={uTag}
         onChange={(e)=>{setUTag(e.target.value)}}/></form> 
          <i> select tags</i>{mapAiTags}
        
          <div className="container">
          {tags?.map(item=>{return (<small key={Math.random()}>🏷{item}</small>)})}
          </div>{ tags.length!=0?<button onClick={(e)=>{fetch("/tags",
{method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify(
    {
    tags,
   id: theme.userStuff[0].id
    }
)


})
.then(res=>res.json())
.then(res=>{
console.log(res)
theme.setAUser([res])
    history.push('/author')
})
}}>Sumbit</button>:<button disabled={true}>Submit</button>}<button onClick={(e)=>{
    fetch(`/users/${theme.userStuff[0].id}`)
    .then(res=>res.json())
    .then(res=>{
    

     theme.setAUser([res])
            
                    history.push('/author')
                 })
}} >No Tags</button></div>
    :<p></p>}
          </div>
    )
    
}



export default CreateBlogs