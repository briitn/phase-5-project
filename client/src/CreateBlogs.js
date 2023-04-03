import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import Tags from "./Tags"
function CreateBlogs(){
    document.title= 'Channel/view-write'
    const theme=useContext(ThemeContext)
    const [loading, setLoading]=useState(false)

const getEdit=localStorage.getItem('editingBlog')
const getTitle=localStorage.getItem('editingTitle')
const getId=localStorage.getItem('id')
const [title, setTiltle]=useState('')

    const [blog, setBlog]=useState('')
  
const [id, setId]=useState()
useEffect(()=>{
    if (getEdit)
    {
   setTiltle(getTitle)
setBlog(getEdit)

};
if (getId)
{setId(getId)}},
[])

const history=useHistory()

 function submitBlog(e){
    setLoading(true)
    //since getId is only set when a user goes to edit blog, we use that to check whether a blog is being edited or being uploaded for the first time
if (getId){
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
                       theme.setAiTags(res.response)
                   
                        theme.setShowAiTags(true)
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
               <span><input
                placeholder="title"
               
                value={title} onChange={(e)=>{
                 setTiltle(e.target.value)
                 localStorage.setItem('editingTitle', e.target.value)
                }}className="title"/>
                </span>
                <div><textarea
                  value={blog} onChange={(e)=>{setBlog(e.target.value)
                  localStorage.setItem('editingBlog',e.target.value)

                
                  }} placeholder='Write' className='article'></textarea>
               <span className="pubBtn">{!loading?<button className="button" onClick={(e)=>{submitBlog()}}>Publish</button>:<button className="button">Publishing</button>}</span> 
               </div> 
      <Tags/>
          </div>
    )
    
}



export default CreateBlogs