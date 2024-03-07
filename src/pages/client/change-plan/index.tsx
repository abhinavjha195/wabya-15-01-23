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
import { Alert } from 'antd'
export default function changeplan() {
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [plan_detail, setplan_detail] = useState(null);
  const [new_plan_id, setNewPlanId] = useState('');
  const [journey_type, setjourney_type] = useState('bundle');
  const planRef = collection(database, "admin_plans");
  const [client, setClient] = useState(null);

  const [new_plan_request, set_new_plan_request] = useState('');

  const [clientPlanId, setclientPlanId] = useState("");

  const [myplan, setMyPlan] = useState(null);
  const [myplanName, setMyPlanName] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [sucMsg, setSucMsg] = useState("");
  const requestRef = collection(database, "newPlanRequest");


    // coach data fetch
    const countMyRequest = async () => {
        ////console.log('test');
        ////console.log(sessionStorage.getItem("userId"));
        const collectionRef = collection(database, "newPlanRequest");
        const queryDoc = query(collectionRef, where("client_id", "==", sessionStorage.getItem("userId")),where("status", "==", 1));
      
        const snapshot = await getDocs(queryDoc);
        const count_data = snapshot.size;
      
        ////console.log(`Number of documents in collection: ${count_data}`);
            ////console.log(count_data);
            return count_data;
          }
    


  const addNewRequest = async (event :  any) =>{
    event.preventDefault();
    const addButton = event.target;
      addButton.setAttribute("disabled", true);
      addButton.textContent = "Loading...";

      if(new_plan_request != clientPlanId){
      if(await countMyRequest() == 0){
        var new_plan_id=new_plan_request;
     
        addDoc(requestRef, {
          plan_id: clientPlanId,
          new_plan_id:new_plan_id,
         client_id:sessionStorage.getItem("userId"),
         status:1,
        })
          .then(() => {
           
           // Re-enable the button and remove loading state
           setSucMsg('your request is submitted');
          })
          .catch((err) => {
            //console.error(err);
             // Re-enable the button and remove loading state
            
          })
    
    
      }
      else{
   
       


    setErrMsg('your request is already in process');
       
      }

    }
else{
    setErrMsg('you have already selected plan');

}


      addButton.removeAttribute("disabled");
      addButton.textContent = "request"; 
      
      }
  
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
      //console.error("Error getting plans: ", error);
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
  //     //console.error('Error accessing localStorage:', error);
  //   }
  // }, []);

 


  const fetchMyPlan = async () => {
    // const myplanRef = doc(collection(database, "admin_plans"), coachesFirebaseId);
     // const coachDoc = await getDoc(coachRef);
 
     
     const queryDoc = query(planRef, where("__name__", "==", clientPlanId));
    
 
     await getDocs(queryDoc).then((response) => {
       setMyPlan(
         response.docs.map((data) => {
           ////console.log(data);
           return { ...data.data(), plan_id: data.id };
         })
       );
     });
 
 
 
 
 
 
 
     
    
   };

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if (!userId) {
     router.push("/client/login");
    }

    if (userId) {

      const fetchClient = async () => {
        let userId = sessionStorage.getItem("userId");
        const clientRef = doc(collection(database, "client_user"), userId);
        const clientDoc = await getDoc(clientRef);
        if (clientDoc.exists()) {
          setClient(clientDoc.data());
    
          // //////console.log('here');
          //////console.log(clientDoc.data);
        } else {
          //////console.log("No client found");
        }
      };
      
      fetchClient();
      
    }
    // Try to get the value from localStorage
    try {
      
      const storedValue2 = localStorage.getItem('buy_plan_id');
     
      // Update state with the value if it exists
      if (storedValue2) {
       
        setNewPlanId(storedValue2);
      }

    
    } catch (error) { 
      // Handle potential errors accessing localStorage here
      //console.error('Error accessing localStorage:', error);
    }
  }, []);


  useEffect(() => {
    if (client != null) {
  
      //setcoachesCalUsername(client.assign_coach_uname);
      setclientPlanId(client.plan_id);
      set_new_plan_request(client.plan_id);
   
    }

   

    //     if(!token){
    //         router.push('/pages/login')
    //     }
  }, [client]);

  useEffect(() => {
    if (clientPlanId !='') {
      ////console.log('ne wplan ');
      //console.log('clientPlanId',clientPlanId)

fetchMyPlan();
    }

   

  }, [clientPlanId]);


  useEffect(() => {
    // Try to get the value from localStorage
    
if(new_plan_id != ""){
  getPlanDetail();
}

  
  }, [new_plan_id]);



  useEffect(() => {
    if (myplan !=null) {
      ////console.log('ne wplan ');
      //console.log('myplan',myplan)

setMyPlanName(myplan[0].plan_name);
 //getData();
    }

   

  }, [myplan]);


  useEffect(() => {
    // Try to get the value from localStorage
    
if(plan_detail != null){
  
  //console.log('plan_detail',plan_detail);
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

  
  const handleNewPlan = (event) => {
    set_new_plan_request(event.target.value);
  };
  return (
    <section className="client-password payment-now">		
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>change plan</h3>  
            <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>


                <div className="row"  style={{ marginTop: '20px' }}>
                    <div className="col-sm-6">	
                      <label>current plan :</label>
                    </div>

                    <div className="col-sm-3">	
                    <label>{myplanName ? myplanName : ""}</label>
                    </div>
                    <div className="col-sm-3">
                                               
                    </div>                     
                  </div>




                <div className="row"  style={{ marginTop: '20px' }}>
                    <div className="col-sm-6">	
                      <label>select new plan</label>
                    </div>
                    <div className="col-sm-3">
                        <input type='radio' className='' onClick={handleNewPlan} name='new_plan' value="6ZpZd4IrzORGQfyu0IqT" checked={new_plan_request === "6ZpZd4IrzORGQfyu0IqT"}></input> novice                        
                    </div> 
                    <div className="col-sm-3">
                        <input type='radio' className='' onClick={handleNewPlan} name='new_plan' value="sH2iLHtr5PWg3gdSjIIn" checked={new_plan_request === "sH2iLHtr5PWg3gdSjIIn"} ></input> experienced                    
                    </div>                     
                  </div>
                
                  <div className="row"  style={{ marginTop: '20px' }}>
                    <div className="col-sm-6">	
                    
                    </div>

                    <div className="col-sm-3">	
                     
                    </div>
                    <div className="col-sm-3">
                        <button data-plan-id={clientPlanId ? clientPlanId : ''}  onClick={addNewRequest} className='btn buyagain-btn'> request</button>               

                           
                    </div>                     
                  </div>

                  <div className='row'>
                  <div className="col-sm-3"></div>

                  <div className="col-sm-9">

                  {sucMsg && <Alert message={sucMsg} className='mt-4' type="success"/> }   

{errMsg && <Alert message={errMsg} className='mt-4' type="error"/> }     
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