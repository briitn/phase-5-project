import { useHistory } from "react-router-dom"
import { Fragment, useContext, useEffect} from "react"
import { ThemeContext } from "styled-components"
import Topnav from "./Topnav"
function Search(){
    const theme=useContext(ThemeContext)


useEffect(()=>
{if (theme.filteredBlogs.length===0){
    
    fetch('/search')
    .then(res=>res.json())
    .then((res)=>{theme.setFilteredBlogs(res)
(res)})
 }},[theme])

const history=useHistory()
const mapBlogs=theme.filteredBlogs?.map(item=>{
  
    return (
        <div key={item.id} className='container'>
            <img src={item.user.image_url}
            alt='userImage' className="profilePic"/>
           <div><b>{item.user.username}</b></div> 
            <span><i>{item.title}</i></span>
<p>{`${item.blog.slice(0,item.blog.length*0.10)}...`}</p>
<p>👁{item.views}</p>
<p  onClick={()=>{theme.setReadBlog([item])
history.push('/blog')
fetch('/views',{
    method:"PATCH",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(
        {
           id: item.id,
         views: true
        }
    )

})

}}>read more</p>

        </div>
    )
})
return (
    <Fragment>
        <Topnav/>
         <div className="cont">
        <h1>{theme.userSearched}</h1>
        {mapBlogs}
    </div>
    </Fragment>
   
)
}




export default Search