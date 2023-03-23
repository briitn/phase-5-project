import { useState } from "react"



function Tags(){
    const [tags,setTags]=useState([])
    const [tagValue, setTagValue]=useState('')
    function createTags(e){
e.preventDefault()
fetch("/tags",
{method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify(
    {
    tags,
     views: true
    }
)


})
.then(res=>res.json())
.then(res=>{

 console.log(res)
})}

    
const maptags=tags.map(item=>{
    console.log(item)
    return (<div key={Math.random()}>
        <p>{item}</p>
    </div>)
})
    return (
        <div>
            {tags.length===0?<div></div>:<div>{maptags}</div>}
            <input type='text'
            placeholder='add tag'
            value={tagValue}
            onChange={(e)=>{setTagValue(e.target.value)}} />
            <button onClick={()=>{
                console.log('l')
               setTags([...tags, tagValue])
                console.log(tags)}}>Submit</button>
        </div>
    )

}

export default Tags