import Link from 'next/link'
import { useEffect, useState } from 'react'
import { app, database } from '../../../../firebaseConfig';
import { collection, getDocs,doc, deleteDoc,updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { sendMail } from "../../../services/sendMail"


function maskString(str) {
  // Split the string into parts
  const parts = str.split(' ');
  
  // Check if the first part contains more than one character
  if (parts[0].length > 1) {
      // Replace all characters in the first part except the first one with '*'
      parts[0] = parts[0][0] + '*'.repeat(parts[0].length - 1);
  }

 

  // Join the parts back together with a space
  return parts.join(' ');
}

const CoachesList = ()  => {

  const router = useRouter()
  const databaseRef = collection(database, 'coaches_user');
  const [fireData, setFireData] = useState([]);
  const [count, setCount] = useState(1);

  // Function to increment count by 1
  const incrementCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('Token')
    getData()

    // if (token) {
    //   getData()
    // }
    // if (!token) {
    //   router.push('/super-admin/login')
    // }
  }, [])

  
  async function sendMailFunc (email,content,$subject){   
    let response = await sendMail(email,$subject,content);   
  
    //console.log('response',response);
  } 

  // fetch all coaches records
  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        const sortedData = response.docs.map((data) => {
          return { ...data.data(), coach_id: data.id };
        }).sort((a, b) => a.coach_name.localeCompare(b.coach_name)); // Sort the data by coach_name property
  
        setFireData(sortedData);
      });
  };
  // view single coach record

  // delete coach

  const deleteDocument = (coach_id) => {
    let fieldToEdit = doc(database, 'coaches_user', coach_id);

      deleteDoc(fieldToEdit)
      .then(() => {
        toast.success('Coach deleted successfully!!')
        getData()
      })
      .catch((err) => {
        toast.error('Coach record is not deleted!')
      })
  }

  
  // useEffect(() => {
  //   // Fetch your data from an API or elsewhere
    
  //   // Sort the data by name in ascending order
  //   for (let i = 0; i < fireData.length - 1; i++) {
  //     for (let j = i + 1; j < fireData.length; j++) {
  //       if (fireData[i].coach_name > fireData[j].coach_name) {
  //         // Swap elements if they are in the wrong order
  //         const temp = fireData[i];
  //         fireData[i] = fireData[j];
  //         fireData[j] = temp;
  //       }
  //     }
  //   }
    
  // }, [fireData]);



  // update record
  const updateApproved = (value,coach_id) => {
    let fieldToEdit = doc(database, 'coaches_user', coach_id);
    updateDoc(fieldToEdit, {
      isApproved: value,
     
    })
    .then(() => {
      toast.success('Data updated successfully!')
      getData()
   
    })
    .catch((err) => {
      //console.log(err);
    })
  }





    // update record
    const updateAccC = (value,coach_id,coach_em) => {
      let fieldToEdit = doc(database, 'coaches_user', coach_id);
      let is_certificate_apply='no';
      let coach_certificate='';
      let accc_action='';
    
      if(value == 'yes'){
        coach_certificate='yes';
        accc_action='confirmed';
      }else{
        coach_certificate='no';
        accc_action='declined';
      }
      updateDoc(fieldToEdit, {
        coach_certificate: coach_certificate,
        is_certificate_apply:is_certificate_apply,
       
      })
      .then(() => {
        toast.success('Data updated successfully!')

        getData()







        const logoUrl = 'https://wabya.com/images/logo-new.png';
     


        const adminmsg = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
         <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Wabya</title>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
            <style type="text/css">
               body{padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size:14px; line-height:22px; font-family: 'Lato', sans-serif; font-weight:400;}
            </style>
         </head>
         <body paddingwidth="0" paddingheight="0"  style="" offset="0" toppadding="0" leftpadding="0">
         <div style="display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;">
            <table width="600" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='width: 600px; display: block;'>
               <tbody>
                  <tr>
                     <table class="MainContainer" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ece6d5" align="center" style='width: 600px; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px;'>
                        <tbody style=''>
      <tr>
                              <td colspan="2"><div style="text-align: center; margin:35px 0 0" class="contentLogo"><a href="https://www.#.com"><img src="${logoUrl}" width="200px" alt="" border="0" style=""></a></div></td>
                           </tr>
                           <tr>
                              <td>
                                 <div style="padding:0 30px;  position: relative; z-index: 2;line-height: 22px;font-family: 'Lato', sans-serif;font-weight: 600;text-align: center;">
                               
                                 <p style="font-size: 18px; text-align: center; color: #864985;">Hello coach,</p>
                                 <p style="font-size: 18px; text-align: center; color: #864985;">admin ${accc_action}  your request to update your profile to hold an Associate Certified Coach (ACC) credential or its equivalent.</p>
                                
                                 
      
      
      <hr style="border: 1px solid #1c686b;">
      <p style="font-size: 14px; color: #242424; text-align: center;">Thank you,<br>Wabya Team</p>
       </div>  
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </tr>
               </tbody>
            </table>
       </div>
         </body>
      </html>
    `;
    sendMailFunc(coach_em,adminmsg,'Notification: Associate Certified Coach Credential'); 
    
    
     
      })
      .catch((err) => {
        //console.log(err);
      })
    }






  return (
    <section className='coaches-list'>
   
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 mrb-30'>
            <h2>coaches list</h2>
          </div>
          <div className='col-sm-12'>
          <div className='coach-table'>
            <div className='table-responsive'>

                <table className='table table-coaches-list'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>coach name</th>
                      <th>email</th>
                      <th>approve/decline</th>
                      <th>acc credential</th>
                      <th>actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fireData.map((data) => {
                      return (
                      <>
                      <tr>
                        <td>{count++} </td>
                        <td>{maskString(data.coach_name)}</td>
                        <td>{data.coach_email}</td>
                        <td>

                        {data.isApproved === 1
    ? <>approved
    </>
    : data.isApproved === 0
      ? <>declined   <button className='btn btn-desktop btn-darkgreen' onClick={() => updateApproved(1, data.coach_id)}>approve</button>
      </>
      : <div>
          <button className='btn btn-desktop btn-darkgreen' onClick={() => updateApproved(1, data.coach_id)}>approve</button>
          <button className='btn btn-desktop btn-chestnutred'onClick={() => updateApproved(0, data.coach_id)}>decline</button>
        </div>
  }
                        </td>









                        <td>

{data.is_certificate_apply === 'yes'
? 
<div>
<button className='btn btn-desktop btn-darkgreen' onClick={() => updateAccC('yes', data.coach_id, data.coach_email)}>approve</button>
<button className='btn btn-desktop btn-chestnutred'onClick={() => updateAccC('no', data.coach_id,data.coach_email)}>decline</button>
</div>
: null
}
</td>
                        <td>

                            <Link href={`/super-admin/view-client/${data.coach_id}`} passHref>
                              <a className='btn btn-edit'>
                                <i className='fa fa-eye'></i>
                              </a>
                            </Link>

                            <Link href={`/super-admin/view-pay-detail/${data.coach_id}`} passHref>
                              <a className='btn btn-edit'>
                               view pay details
                              </a>
                            </Link>

                            <ToastContainer />
                            {/* <button className='btn btn-delete' onClick={() => deleteDocument(data.coach_id)}>
                              <i className='fa fa-trash'></i>
                            </button> */}

                        </td>
                      </tr>
                      </>
                      )
                    })}


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

export default CoachesList
