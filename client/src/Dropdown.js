import { Fragment } from "react"
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
function Dropdown(){
    const theme=useContext(ThemeContext)
    const history=useHistory()
    async function searchBlog(name) {
      try {
        const response = await fetch('/filtered', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
          }),
        });
    
        if (response.ok) {
          const res = await response.json();
          theme.setFilteredBlogs(res);
          console.log(res)
          theme.setFindblog('');
          history.push('/search');
        } else {
          const err = await response.json();
          console.log(err);
          alert(err.errors);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    const showSearch= theme.allTags?.filter(item=>{
        return item.name.includes(theme.findBlog)
      })
      const showSearch2= theme.allUsers?.filter(item=>{
        return item.username.includes(theme.findBlog)
      })
const mapShowSearch1=showSearch.map(item=>
    { return(<div key={item.id} > 
    
    <small onClick={(e)=>{ 
      console.log(e.target.value)
      localStorage.setItem('search', JSON.stringify(item.name))
      searchBlog(item.name)
      }}>
    <i className="fas fa-tag"></i>{item.name}
    </small>
    
    </div>)
    })
   return( 
   <Fragment>
    {theme.findBlog?
   <div className='dropdown-content'> <span >
  
<p>Topics</p>
<hr></hr>
<div>
{mapShowSearch1} 
</div>
<div><p>People</p>
<hr></hr>
</div>
{showSearch2.map(item=>{
return(

   <div key={item.id} onClick={(e)=>{
          fetch(`/users/${item.id}`)
          .then(res=>res.json())
          .then(res=>{
          
              console.log(res)
              theme.setFindblog('')
              theme.setAUser([item])
                  
                          history.push('/author')
                       })
   }}>
   <img src={item.image_url} className='profilePic' alt="user profile"/>
     <small>{item.username}</small>  

   </div>

)
})}</span></div>
:<div></div>}</Fragment> 
   )


}




export default Dropdown