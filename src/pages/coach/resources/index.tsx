// ** MUI Imports
import { useEffect,useState } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../firebaseConfig'


// ** Demo Components Imports
import Resources from 'src/views/clientDetail/Resources'


const ResourceBasic = () => {

  const router = useRouter()
  const [showpage, setshowpage] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')

    if(!token){
        router.push('/coach/login')
    }
}, [])


  
useEffect(() => {
  // Check if the last URL was '/coch/login'

      // Check if the last URL was '/coch/login'
let lastUrl2='';
if(localStorage.getItem("p_url2")){
lastUrl2 = localStorage.getItem("p_url2");
}else{
setshowpage(true);
}
console.log('lastUrl',lastUrl2);
if (lastUrl2 == '/joinvideo2') {
// Reload the current page
console.log('yes');
localStorage.removeItem("p_url2");
router.reload();
}




}, [router.path]); // Empty dependency array means this effect runs once after the initial render



  return (
<>

{showpage ?
      (
        <>
        <Resources/>
        </>): null}
      </>

  )
}

export default ResourceBasic
