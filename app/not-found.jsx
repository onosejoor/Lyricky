import Button from "./_components/Button";
import Img from "./_components/Img";

export const metadata = {
  title: "404 Page Not Found",
  description: "Oops, looks like the lyrics got lost in translation, go back home to see your lyrics."
}

export default async function NotFound() {

  
    
  return(<>
  <div className="page404Container">
  <div className="page404">
  <h1>Oops!</h1>
  <h3>404 Page Not Found</h3>
  <p>Oops, looks like the lyrics got lost in translation, go back home to see your lyrics.</p>
  <Button className={"page404Btn CTAbutton"} link={"/"} text={"Go To Homepage"} /> 

  </div>    

  <Img src={"/images/404 Error.png"} alt={"404 image"}/>
  </div>


  </>) 
}