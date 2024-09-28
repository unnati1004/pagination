import { useEffect, useState } from "react";

const data = [
  "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  "https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg",
  "https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true",
  "https://st3.depositphotos.com/18630962/31856/i/450/depositphotos_318568256-stock-photo-huai-mae-kamin-waterfall-srinakarin.jpg",
];

const ImageSlider = () => {
  const [image, setImage] = useState(0);

   useEffect(()=>{
    const timer= setInterval(()=>{
      handleNextButton()
     },5000) 
     return(()=>{
      clearInterval(timer)
     })
   },[image])

  const handleNextButton = () => {
    setImage((image + 1) % data.length);
  };
  const handlePrevButton = () => {
    setImage(!image ? data.length - 1 : image - 1);
  };

  return (
    <>
      <div className="flex justify-center">
        <button onClick={handlePrevButton} className="font-bold p-2">
          Prev
        </button>
        {data.map((url, i) => (
          <img
            src={url}
            alt="wallpaper"
            className={
              "w-[700px] h-[500px] object-contain " +
              (image == i ? "block" : "hidden")
            }
          />
        ))}
        <button onClick={handleNextButton} className="font-bold p-2">
          Next
        </button>
      </div>
    </>
  );
};

export default ImageSlider;
