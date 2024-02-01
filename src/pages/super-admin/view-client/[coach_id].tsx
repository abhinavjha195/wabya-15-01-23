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
  query
} from "firebase/firestore";


const ViewBasic = () => {

  const router = useRouter()
  const [meeting,setMeeting] = useState([]);
  const [coachData, setCoachData] = useState(null);

  // next meeting scheduled
  const [nextMeeting, setNextMeeting] = useState(null);

  // useEffect(() => {
  //   const today = new Date();
  //   db.collection("meeting")
  //     .where("user_id", "==", userId)
  //     .where("meeting_date", ">=", today)
  //     .orderBy("meeting_date")
  //     .limit(1)
  //     .get()
  //     .then((querySnapshot) => {
  //       if (!querySnapshot.empty) {
  //         const doc = querySnapshot.docs[0];
  //         const meetingDate = doc.data().meetingDate.toDate();
  //         const meetingTime = doc.data().meetingTime.toDate();
  //         setNextMeeting(new Date(
  //           meetingDate.getFullYear(),
  //           meetingDate.getMonth(),
  //           meetingDate.getDate(),
  //           meetingTime.getHours(),
  //           meetingTime.getMinutes(),
  //           meetingTime.getSeconds(),
  //           meetingTime.getMilliseconds()
  //         ));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error getting next meeting date:", error);
  //     });
  // }, [userId]);


  useEffect(() => {
    const fetchCoaches = async () => { 
      try {
        if (router.query.coach_id !== undefined) { // check if coach_id is defined
          const coachesCollection = collection(database, 'client_user');
          const coachesQuery = query(coachesCollection, where('assign_coach_id', '==', router.query.coach_id));
          const coachesSnapshot = await getDocs(coachesQuery);
          // const coachesData = coachesSnapshot.docs.map((doc) => ({
          //   id: doc.id,
          //   ...doc.data(),
          // }));

          const coachesData = coachesSnapshot.docs.map((doc) => {
            const anonymizedName = doc.data().client_name.charAt(0) + "*".repeat(doc.data().client_name.length - 1);
            return {
              id: doc.id,
              ...doc.data(),
              anonymized_name: anonymizedName
            };
          }).sort((a, b) => a.client_name.localeCompare(b.client_name));
          setMeeting(coachesData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getCoachData = async () => {
      try{
        if (router.query.coach_id !== undefined) {

        

            const coachRef = doc(collection(database,'coaches_user'),router.query.coach_id);
            const coachDoc = await getDoc(coachRef);

            if (coachDoc.exists()) {
              const coachData = coachDoc.data();
              setCoachData(coachData);
            }



           
          
        }
      }catch (error) {
        console.log(error); 
      }
    };
    getCoachData();


    fetchCoaches();
  }, [router.query.coach_id]);

  useEffect(() => {
    const token = sessionStorage.getItem('adminId')

    if(!token){
        router.push('/super-admin/login')
    }

}, []);



  return (
    <section className='clients-listing'>
       
      <div className='container'>
        <div className='row'>
        
          {/* <div className='col-sm-12 filter-coll'>
            <div className='client-filter'>
              <div className='dropdown'>
                <div className='inner'>
                  <button
                    className='btn btn-secondary dropdown-toggle'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Filter Clients
                  </button>
                  <ul className='dropdown-menu'>
                    <div className='form-check'>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          All
                        </label>
                      </div>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          Active
                        </label>
                      </div>
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' value='' />
                          Inactive
                        </label>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}



<div className="col-sm-4  client-profile" style={{'padding':'inherit'}}>
<h4 className='text-center' style={{'margin-bottom':'80px'}}>all detail</h4>
        <div className="info-grid" style={{'height':'fit-content'}}>
        <p>Contact Details</p>
        <p>name: <span>{!coachData ? null : coachData.coach_name}</span></p>
        <p>email: <span><a href="mailto:name@gmail.com">{!coachData ? null : coachData.coach_email}</a></span></p>
        <p>gender: <span>{!coachData ? null : coachData.coach_gender}</span></p>
        <p>phone: <span>{!coachData ? null : coachData.coach_phone}</span></p>
        <p>country: <span>{!coachData ? null : coachData.coach_country}</span></p>
        <p>about: <span>{!coachData ? null : coachData.coach_about}</span></p>
       
        <p>bio: <span>{!coachData ? null : coachData.coach_bio}</span></p>
        </div>
      </div>
      <div className="col-sm-8  client-profile" style={{'padding':'inherit'}}>
{meeting.length === 0 ? (
  <h4 className='text-center'>no client present</h4>
) : (
  <>
    <h4 className='text-center' style={{'margin-bottom':'80px'}}>client list</h4>
    {meeting.map((data) => (
      <div className='cl-coll' key={data.id}>
        <div className='info'>
          <figure> <img src='../../../images/clients-01.png' alt='' /> </figure>
          <h3>{data.anonymized_name}</h3>
          <p>client id: <br/> {data.id} </p>
          {/* Other details */}
        </div>
      </div>
    
    ))}
  </>
)}

</div>

        </div>
        {/* <!--/ row --> */}
      </div>
    </section> // view-client-listing via coach
  )
}

export default ViewBasic
