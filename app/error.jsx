"use client";
export default  function Error({ error, reset }) {
    // console.log(error, reset);
    
  return(<>
  <h1>{JSON.stringify(error.error)}</h1>;
  <button onClick={reset}>Try again...</button>
  </>) 
}
