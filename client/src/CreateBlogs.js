import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"

function CreateBlogs(){
    document.title= 'Channel/view-write'
    const theme=useContext(ThemeContext)
    const [loading, setLoading]=useState(false)

const getEdit=localStorage.getItem('editingBlog')
const getTitle=localStorage.getItem('editingTitle')
const getId=localStorage.getItem('id')
const [title, setTiltle]=useState('')
const [aiTags, setAiTags]=useState([])
    const [blog, setBlog]=useState('')
  
console.log(getTitle)


const [id, setId]=useState()
 const[uTag, setUTag]=useState('')



useEffect(()=>{if (getEdit){
   

    setId(getId)
setTiltle(getTitle)
setBlog(getEdit)
}},[])

const history=useHistory()

    const [tags,setTags]=useState([])


const [showAiTags, setShowAiTags]=useState(false)


function submitBlog(e){
    setLoading(true)
if (getEdit){
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
           
      
           theme.setAllBlogs([...theme.allBlogs,res])
           theme.setAUser([res])
           history.push('/author')
        })
    }
    else {
        res.json().then((err) => {
      setLoading(false)
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
                        setAiTags(res.response)
                   
                        setShowAiTags(true)
                       theme.setAUser([res])
                
                    })
                }
                else {
                    res.json().then((err) => {
                        setLoading(false)
                   alert(err.errors)})
    }
}) } 


}


const mapAiTags=aiTags?.slice(0,3).map(item=>{
    return(<div key={Math.random()} >
      
        <small onClick={(e)=>{setTags([...tags, item]); e.target.className='hTag'}}><i className="fas fa-tag"></i>{item}</small>
      </div>
       
    )
})
    return (
        <div>
<header id="channel3"><b onClick={()=>{history.push('/')}}>Channel🌐</b>
<img src={theme.userStuff[0]?.image_url} className='profilePic2' alt='user profile'
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
         
               <span><input
                placeholder="title"
               
                value={title} onChange={(e)=>{
                 setTiltle(e.target.value)
                }}className="title"/>
                </span>
                <div><textarea
                  value={blog} onChange={(e)=>{setBlog(e.target.value)
                   localStorage.setItem('editingBlog', e.target.value)
                
                  }} placeholder='Write' className='article'></textarea>
               <span className="pubBtn">{!loading?<button className="button" onClick={(e)=>{submitBlog()}}>Publish</button>:<button className="button">Publishing</button>}</span> 
               </div> 
         {showAiTags?<div className="popup"> 
         <form onSubmit={(e)=>{e.preventDefault()
            setTags([...tags,uTag])}}><input type='text' placeholder="add tag" 
         value={uTag}
         onChange={(e)=>{setUTag(e.target.value)}}/></form> 
          <i> select tags</i>{mapAiTags}
        
          <div className="container">
          {tags?.map(item=>{return (<small key={Math.random()}><i className="fas fa-tag"></i>{item}</small>)})}
          </div>{ tags.length!==0?<button onClick={(e)=>{fetch("/tags",
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