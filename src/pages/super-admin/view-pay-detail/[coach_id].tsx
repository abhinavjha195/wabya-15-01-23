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

function isSameMonth(date, targetMonth, targetYear) {
    const meetingDate = new Date(date.seconds * 1000); // Assuming 'seconds' is a Unix timestamp
    //console.log('date', meetingDate.getMonth()); // Adding 1 to get the correct month
    //console.log('target month', targetMonth); // Adding 1 to get the correct month
    return (
      meetingDate.getMonth() == targetMonth 
    );
  }
const ViewBasic = () => {

  const router = useRouter()
  const [meeting,setMeeting] = useState([]);
  const [coachData, setCoachData] = useState(null);
  const [meetingSession, setMeetingSession] = useState([]);

  // next meeting scheduled
  const [nextMeeting, setNextMeeting] = useState(null);

  const [datesArray, setdatesArray] = useState([]);



  

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
  //       //console.error("Error getting next meeting date:", error);
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
        //console.log(error);
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
        //console.log(error); 
      }
    };


    const getMeetingSession = async () => {

        console.log('testtt');
        try {
            if (router.query.coach_id !== undefined) { 
                console.log('jehh'); 
        const coachId = router.query.coach_id;

        console.log(coachId); 
        const meetingSessionCollection = collection(database, 'meetingSession');
        const queryDoc = query(
          meetingSessionCollection,
          where('coach_id', '==', coachId),
          where('meeting_end', '==', 'yes')
        );
      
        try {
          const response = await getDocs(queryDoc);
          const sessionsData = response.docs.map((data) => {
            console.log(data.data());
            return { ...data.data(), meet_id: data.id };
          });
          setMeetingSession(sessionsData);
        } catch (error) {
          //console.error(error);
        }
    }
}catch (error) {
    //console.error(error);
  }
       
       }
    getCoachData();


    fetchCoaches();
    getMeetingSession();
  }, [router.query.coach_id]);

  useEffect(() => {
    const token = sessionStorage.getItem('adminId')

    if(!token){
        router.push('/super-admin/login')
    }

}, []);


const currentMonth = new Date().getMonth();
const [currentMonthState, setcurrentMonth] = useState(currentMonth);
const [probonoCount, setProbonoCount] = useState(-1);
const [noviceCount, setNoviceCount] =useState(-1);
const [experiencedCount, setExperiencedCount] = useState(-1);


//console.log('add', currentMonth);
const currentYear = new Date().getFullYear();
const [currentYearState, setcurrentYear] = useState(currentYear);

const handleMonth = (event) => {
    const selectedOption = event.target.selectedOptions[0];
    const selectedMonth = parseInt(selectedOption.getAttribute('data-month'), 10);
    const selectedYear = parseInt(selectedOption.getAttribute('data-year'), 10);
    setcurrentMonth(selectedMonth);
    setcurrentYear(selectedYear);


};




useEffect(() => {
    // Define a function to calculate the counts based on the current month and year
    const calculateCounts = () => {
      const probonoCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'probono' && isSameMonth(meet.meeting_start_time, currentMonthState, currentYearState)).length : 0;
      const noviceCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'novice' && isSameMonth(meet.meeting_start_time, currentMonthState, currentYearState)).length : 0;
      const experiencedCount = meetingSession != null ? meetingSession.filter(meet => meet.client_plan === 'experienced' && isSameMonth(meet.meeting_start_time, currentMonthState, currentYearState)).length : 0;
      
      // Update the counts in your component state
      setProbonoCount(probonoCount);
      setNoviceCount(noviceCount);
      setExperiencedCount(experiencedCount);
    };

    // Call the calculateCounts function whenever currentMonthState or currentYear changes
    calculateCounts();
  }, [currentMonthState, currentYearState, meetingSession]);


  return (
    <section className='coaches-list'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 mrb-30'>
            <h2>coach pay details</h2>
          </div>

          <div className='col-sm-6 mrb-30'>

          <select className='form-control' onChange={handleMonth}>

          <option data-month="6" data-year="2024">July 2023</option>
          <option data-month="7" data-year="2024">August 2023</option>
          <option data-month="8" data-year="2024">September 2023</option>
          <option data-month="9" data-year="2024">October 2023</option>
          <option data-month="10" data-year="2024">November 2023</option>
          <option data-month="11" data-year="2024">December 2023</option>
<option data-month="0" data-year="2024">January 2024</option>
<option data-month="1" data-year="2024">February 2024</option>
<option data-month="2" data-year="2024" selected>March 2024</option>
</select>

          </div>
         
          <div className='col-sm-12'>
       
          <div className='coach-table'>

            

            <div className='table-responsive'>
                <table className='table table-coaches-list'>
                <tbody>
                  <tr>
                    <th>package</th>
                    <th>hours</th>
                    <th>earning</th>
                  </tr>



          <tr>
              <td className='bundle aqua'>probono </td>
              <td>{probonoCount} hours  </td>
              <td>£00.00</td>
          </tr>
          <tr>
              <td className='pay aqua orange'>novice</td>
              <td>{noviceCount * 0.5} hours</td>
              <td>£{noviceCount * 20}.00</td>
          </tr>
          <tr>
              <td className='probono aqua pink'>experienced</td>
              <td>{experiencedCount * 0.5} hours</td>
              <td>£{experiencedCount * 50}.00</td>
          </tr>
          <tr>
              <td></td>
              <td><strong>Total</strong></td>
              <td> £{(probonoCount * 0) + (noviceCount * 20)  + (experiencedCount * 50)}.00</td>
          </tr>
     

                </tbody>
              
                </table>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewBasic
