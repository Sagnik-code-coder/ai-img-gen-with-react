import React,{useRef, useState} from 'react'
import './Imagegen.css'
import image from '../Assests/default_image.svg'

const Imagegen = () => {
  const [ChngImageUrl,setImageUrl] = useState("/");
  let inputRef = useRef(null);
  const ImageGenerator = async () =>
  {
    if(inputRef.current.value==="")
    {
      return 0;
    }
    const response = await fetch (
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "your open-ai key",
          "User-Agent":"Chrome"
        },
        body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "1024x1024",
        })
      }
    );
    let data = await response.json();
    //console.log(data);
    let data_array = data.data;
    setImageUrl(data_array[0].url);
  }
  return (
    
    <div className='Head'>
      <h1>AI Image Generator</h1>
      <div className='ImageLoading'></div>
      <div className='Image'><img src={ChngImageUrl==="/"?image:ChngImageUrl}/></div>

      <div className='Searchbbox'>
        <input type="text" ref={inputRef} placeholder="Enter Image URL" />
        <button onClick={()=>{ImageGenerator()}}>Generate</button>
      </div>

    </div>
  )
}

export default Imagegen;
