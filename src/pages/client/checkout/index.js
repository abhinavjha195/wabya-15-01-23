import { useState, ReactNode, useEffect } from 'react'
import { useRouter } from "next/router";
import CheckoutButton from "../../../../src/components/CheckoutButton";		
import { app, database,storage } from "../../../../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { event } from 'jquery';
export default function Home() {
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [plan_detail, setplan_detail] = useState(null);
  const [new_plan_id, setNewPlanId] = useState('');
  const [journey_type, setjourney_type] = useState('bundle');
  const planRef = collection(database, "admin_plans");
  
  const getPlanDetail = async () => {
           
          
    const queryDoc = query(planRef, where("__name__", "==", new_plan_id));
  
    try {
      const querySnapshot = await getDocs(queryDoc);
  
      const plans = querySnapshot.docs.map((data) => {
        return { ...data.data(), plan_id: data.id };
      });
      setplan_detail(plans);

  
      // Now you can access the length of the meetings array
    //   const numberOfMeetings = meetings.length;
  
    //   return numberOfMeetings;
    } catch (error) {
      console.error("Error getting plans: ", error);
   //   return 0; // Return 0 if there was an error
    }
  };
  // useEffect(() => {
  //   // Try to get the value from localStorage
  //   try {
  //     const storedValue = localStorage.getItem('price');
     
  //     // Update state with the value if it exists
  //     if (storedValue) {
  //       setPrice(storedValue);
  //     }

    
  //   } catch (error) {
  //     // Handle potential errors accessing localStorage here
  //     console.error('Error accessing localStorage:', error);
  //   }
  // }, []);

 

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if (!userId) {
     // router.push("/client/login");
    }

    // if (userId) {

    //   const fetchClient = async () => {
    //     let userId = sessionStorage.getItem("userId");
    //     const clientRef = doc(collection(database, "client_user"), userId);
    //     const clientDoc = await getDoc(clientRef);
    //     if (clientDoc.exists()) {
    //       setClient(clientDoc.data());
    
    //       // ////console.log('here');
    //       ////console.log(clientDoc.data);
    //     } else {
    //       ////console.log("No client found");
    //     }
    //   };
      
    //   fetchClient();
      
    // }
    // Try to get the value from localStorage
    try {
      
      const storedValue2 = localStorage.getItem('buy_plan_id');
     
      // Update state with the value if it exists
      if (storedValue2) {
       
        setNewPlanId(storedValue2);
      }

    
    } catch (error) { 
      // Handle potential errors accessing localStorage here
      console.error('Error accessing localStorage:', error);
    }
  }, []);


  useEffect(() => {
    // Try to get the value from localStorage
    
if(new_plan_id != ""){
  getPlanDetail();
}

  
  }, [new_plan_id]);


  useEffect(() => {
    // Try to get the value from localStorage
    
if(plan_detail != null){
  
  console.log('plan_detail',plan_detail);
  if(plan_detail.length > 0){
    if(journey_type == 'bundle'){
    setPrice(plan_detail[0].bundle_price);
    }

    if(journey_type == 'payg'){
      setPrice(plan_detail[0].payg_price);
      }
      
  }
}

  
  }, [plan_detail,journey_type]);

  
  const handleJourneyType = (event) => {
    setjourney_type(event.target.value);
  };
  return (
    <section className="client-password payment-now">		
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>payment now</h3>  
            <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>

                <div className="row">
                    <div className="col-sm-6">	
                      <label>journey type</label>
                    </div>
                    <div className="col-sm-3">
                        <input type='radio' className='' onClick={handleJourneyType} name='journey_type' value="bundle" checked={journey_type === "bundle"}></input> bundle                        
                    </div> 
                    <div className="col-sm-3">
                        <input type='radio' className='' onClick={handleJourneyType} name='journey_type' value="payg" checked={journey_type === "payg"}></input> pay as you go                    
                    </div>                     
                  </div>
                
                  <div className="row"  style={{ marginTop: '20px' }}>
                    <div className="col-sm-6">	
                      <label>price: £{price}.00</label>
                    </div>

                    <div className="col-sm-3">	
                     
                    </div>
                    <div className="col-sm-3">
                        <CheckoutButton  price={5.00} journey_type={journey_type} />                          
                    </div>                     
                  </div>
                  
                
                </div>
              </div>

              <div className="col-sm-5">
              <figure className="desktop-hidden"><img src="../../images/banner-bg.png" alt=""/></figure>
            <figure className="mobile-hidden"><img src="../../images/homepage-banner-mobile.png" alt=""/></figure>
            </div>
         
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}   