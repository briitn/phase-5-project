import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"


function Topnav(){
    const theme=useContext(ThemeContext)
    const history=useHistory()

    const mapUserStuff=theme.userStuff.map(item=>{
        return(
            <span key={item.id} id='profile' onClick={
                (e)=>{
                    fetch(`/users/${item.id}`)
    .then(res=>res.json())
    .then(res=>{
    
        console.log(res)
        theme.setAUser([res])
    
    
                    theme.setAUser([item]) 
                    history.push('/author')
                 })
            }}>
                <img src={item.image_url} 
                alt='user profile'
                className='profilePic'/>
               </span>
    )
    })
    const showSearch= theme.allTags.filter(item=>{
        return item.name.includes(theme.findBlog)
      })
      const showSearch2= theme.allUsers.filter(item=>{
        return item.username.includes(theme.findBlog)
      })
   return( <div className="topnav">
    <span id="channel"><strong onClick={()=>{history.push('/')}} >Channel🌐 </strong></span>
<span className='dropdown'>  
<form onSubmit={(e)=>{
e.preventDefault()
    if(theme.findBlog){
fetch('/posts/search',
{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify(
{
title: theme.findBlog
}
)

})
.then((res)=>{
if (res.ok){
res.json().then((res)=>{
theme.setFilteredBlogs(res)
theme.setUserSearched(theme.findBlog)
theme.setFindblog()

history.push('/search')
})
}
else {
res.json().then((err) => {
   console.log(err)
alert(err.errors)})
}
})


}}}>
<input type="text" placeholder="Search.."
value={theme.findBlog}
id='search'
onChange={(e)=>{

theme.setFindblog(e.target.value)
}} 
/>
</form>
{theme.findBlog? <span className='dropdown-content'>

<b>Topics</b>
<div>
{showSearch.map(item=>
{

return(<div key={item.id} > 

<p onClick={(e)=>{  fetch('/filtered',
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
        .then(res=>{
            theme.setUserSearched(item.name)
           theme.setFilteredBlogs(res)  
           theme.setFindblog()
          history.push('/search') 
             })}}>
🏷{item.name}
</p>

</div>)
}) } 
</div>
<b>People</b>
{showSearch2.map(item=>{
return(

   <div key={item.id} onClick={(e)=>{
          fetch(`/users/${item.id}`)
          .then(res=>res.json())
          .then(res=>{
          
              console.log(res)
              theme.setFindblog('')
              theme.setAUser([res])
                  
                          history.push('/author')
                       })
   }}>
   <img src={item.image_url} className='profilePic' alt="user profile"/>
     <em>{item.username}</em>  

   </div>

)
})}</span>
:<div></div>}
</span>


{theme.isLoggedIn? <div>  <span><a href="/createBlogs" id='write'>✍️</a> </span>
<button id='logout' onClick={(e)=>{

if (window.confirm("Are you sure you want to logout?")){
fetch("/logout",
{
method: "DELETE"
})
theme.setIsLoggedIn(false)}
history.push('/')
}}>Logout</button> 
{mapUserStuff}
</div>:<div><span id='signIn'><b onClick={(e)=>history.push('/login')}>Sign in</b></span> 
 <span id='signUp'><b onClick={(e)=>history.push('/signup')}>Sign up</b></span></div>}



</div>)
}




export default Topnav