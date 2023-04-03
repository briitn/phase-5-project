import { Fragment } from "react"

import { useContext,  useState } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"

function Tags(){

    const[uTag, setUTag]=useState('')
const theme=useContext(ThemeContext)
const history=useHistory()
const [tags,setTags]=useState([])
const mapAiTags=theme.aiTags?.slice(0,3).map(item=>{
    return(<div key={Math.random()} >
      
        <small onClick={(e)=>{setTags([...tags, item]); e.target.className='hTag'}}><i className="fas fa-tag"></i>{item}</small>
      </div>
       
    )
})

return (
    <Fragment>
      {theme.showAiTags?<div className="popup"> 
         <form onSubmit={(e)=>{e.preventDefault()
            setTags([...tags,uTag])}}><input type='text' placeholder="add tag" 
         value={uTag}
         onChange={(e)=>{setUTag(e.target.value)}}/></form> 
          <i> select tags</i>{mapAiTags}
        
          <div className="container">
          {tags?.map(item=>{return (<small key={Math.random()}><i className="fas fa-tag"></i>{item}</small>)})}
          </div>{ tags.length!==0?<button onClick={(e)=>{
      theme.setShowAiTags(false)     
fetch("/tags",
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
    theme.setShowAiTags(false)
    fetch(`/users/${theme.userStuff[0].id}`)
    .then(res=>res.json())
    .then(res=>{
    

     theme.setAUser([res])
            
                    history.push('/author')
                 })
}} >No Tags</button></div>
    :<p></p>}</Fragment>
)

}



export default Tags