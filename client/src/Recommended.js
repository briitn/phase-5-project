import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import { useContext, useEffect } from "react"
function Recommended(){
    const theme=useContext(ThemeContext)
const history=useHistory()
const eArray=[]
const getLocTag=localStorage.getItem('tag')
console.log(theme.tagName)
useEffect(async () => {
    theme.setTagName(getLocTag);
  
    try {
      const response = await fetch("/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: theme.tagName,
        }),
      });
  
      const res = await response.json();
  
      theme.setRecommendedStuff(res);
    } catch (error) {
      console.log(error);
    }
  }, []);
  
const mapRecommendedStuff=theme?.recommendedStuff?.slice(0,2).map(item=>{
    eArray.push(item.user)
    return(<div key={item.id}  >
        <hr></hr>
      <div >
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

const filteredAuthor=eArray.filter(item=>{return item.username!==theme.currentUser})
const authors=[...new Set(filteredAuthor)]
return(
  <div className="container">
    {mapRecommendedStuff}
    <hr></hr>
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
)
}




export default Recommended