import Link from 'next/link'
import { useEffect,useState } from 'react'

import { useRouter } from 'next/router'
import { app,database } from '../../../../firebaseConfig'


import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  where,
  query,
  updateDoc,
} from "firebase/firestore";


const Newmeet = () => {

  const router = useRouter()
  const clientRef = collection(database, "client_user");
  const [client, setClient] = useState(null);
  const [isActiveFilter, setIsActiveFilter] = useState('all');
  const [meeting, setMeeting] = useState([]);
  const meetingRef = collection(database, "meeting");
  

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')
console.log('abc');


    if(!token){
        router.push('/coach/login')
    }else{
      getClients();
      console.log(client);
    }
}, [])

// get all meeting data
const getMeeting = async () => {
  console.log('calling');
  const userId = sessionStorage.getItem("coachId");
// Get the current date
const currentDate = new Date();
console.log(currentDate);
  const queryDoc = query(meetingRef, where("coachId", "==", userId),where("isNotified", "==", 0));

  await getDocs(queryDoc).then((response) => {
    setMeeting(
      response.docs.map((data) => {
        return { ...data.data(), meeting_id: data.id };
      })
    );
  });


};

useEffect(() => {

    console.log(client);
    getMeeting();

}, [client])




const getClients = async () => {
  const queryDoc = query(clientRef, where("assign_coach_id", "==",  sessionStorage.getItem('coachId')));

    await getDocs(queryDoc).then((response) => {
      setClient(
        response.docs.map((data) => {
          return { ...data.data(), client_id: data.id };
        })
      );
    });
}


const findClientById = (clientId) => {
  return client.find((c) => c.client_id === clientId);
};



 // Event handler for the checkboxes
 const handleCheckboxChange = (event) => {
  const value = event.target.value;
  
  console.log(value);
  if (value === 'all') {
    // Handle 'all' checkbox if needed
    setIsActiveFilter('all');
  } else if (value === 'active') {
    setIsActiveFilter('active'); // Set the filter state based on the 'active' checkbox
  } else if (value === 'inactive') {
    // Handle 'inactive' checkbox if needed
    setIsActiveFilter('inactive');
  }
};


const cancelMeet = (meet_iddd) => {
  console.log(meet_iddd);
 
  const fieldToEdit2 = doc(database, 'meeting', meet_iddd);

  updateDoc(fieldToEdit2, {
    isCoachCancel:1,
    isCancelNotified:0,
   
  })
  .then(() => {
  
   

   
  })
  .catch((err) => {
    console.log(err);
  })

  getMeeting();
 }


 const removeNotification = (meet_iddd) => {
  console.log(meet_iddd);
 
  const fieldToEdit2 = doc(database, 'meeting', meet_iddd);

  updateDoc(fieldToEdit2, {
    isNotified:1,
   
   
  })
  .then(() => {
  
   

   
  })
  .catch((err) => {
    console.log(err);
  })

  getMeeting();
 }

  return (
    <>
    <section className='clients-listing  lower-letter'>
      <div className='container'>
        <div className='row'>
        
          <div className='col-sm-12 filter-coll'>
          <div className='coach-block-sec mrb-30'>
                <h2>new meeting notification</h2>
              </div>
            <div className='client-filter'>
              
            </div>
          </div>
          </div>
          <div className='row'>
          {meeting.length === 0 ? (
  <div className="no-meeting-notification">
    No new meeting data available
  </div>
) : (
  meeting.map((meeting, index) => (
    <div className='col-sm-6 cl-coll'>
      <div className='info' key={index}>
        {/* <h3>Abhinav</h3> */}

        <p className='new-meet-p'>
          <span><b>#{index + 1}</b></span> 
        </p>
        <p className='new-meet-p'>
          <span><b>client name:</b></span> 
          
          <span> <figure>
                    <img src="https://firebasestorage.googleapis.com/v0/b/wabya-45dba.appspot.com/o/coach%2Fprofile%2Fabhhi.jpg?alt=media&token=5e579895-b432-46ed-b03f-1b3596c05995" alt='' />
                  </figure></span>
          <span>{findClientById(meeting.clientId)?.client_name}</span>
        </p>

        <p className='new-meet-p'>
          <span><b>meeting date:</b></span> <span>{meeting.meetingDate}</span>
        </p>
        <p className='new-meet-p'>
          <span><b>meeting time:</b></span> <span>{meeting.meetingTime}  - {meeting.meetingEndTime}</span>
        </p>
        {/* Add additional meeting information as needed */}

        {meeting.isCoachCancel != undefined && meeting.isCoachCancel !== 1 ? (
          <p className=''>
            <u  style={{'cursor':'pointer', 'color': 'red', 'fontSize': '17px'}} onClick={() => cancelMeet(meeting.meeting_id)}>Cancel</u>
          </p>
        ) : null}

        {meeting.isCoachCancel !== undefined && meeting.isCoachCancel == 1 ? (
          <p className='' style={{'color': 'red', 'fontSize': '17px'}}>
            cancelled
          </p>
        ) : null}

        <p className=''>
          <u  style={{'cursor':'pointer', 'color': 'red', 'fontSize': '17px'}} onClick={() => removeNotification(meeting.meeting_id)}>remove from notification</u>
        </p>
      </div>
    </div>
  ))
)}



           </div>
          {/* <!--/ cl-coll --> */}

        </div>
        {/* <!--/ row --> */}

    </section> 



{/*/ clients-listing */}
</>

  )
}

export default Newmeet
