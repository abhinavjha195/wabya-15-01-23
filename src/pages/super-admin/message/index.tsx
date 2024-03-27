import Link from 'next/link'
import { useEffect, useState } from 'react'
import { app, database } from '../../../../firebaseConfig';
import { collection, getDocs, doc, deleteDoc,updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { sendMail } from "../../../services/sendMail";  

const MsgList = ()  => {

  const router = useRouter()
  const databaseRef = collection(database, 'client_user');
  const [fireData, setFireData] = useState([]);

  const msgRef = collection(database, 'message');
  const [msgData, setMsgData] = useState([]);

  const [clientMsg, setClientMsg] = useState([]);
  const [count, setCount] = useState(1);
  const [reply, setReply] = useState('');
  const [msg_id, setID] = useState(null);
  const [msg, setmsg] = useState('');
  const [client_name, setclient_name] = useState('');
  const [client_email, setclient_email] = useState('');

  async function sendMailFunc (email,content,$subject){   
    let response = await sendMail(email,$subject,content);   
  
    //console.log('response',response);
  } 

  // Function to increment count by 1
  const incrementCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('Token')
    getData();
    getMsg();

    // if (token) {
    //   getData()
    // }
    // if (!token) {
    //   router.push('/super-admin/login')
    // }
  }, [])


  useEffect(() => {
   if(msgData.length>0){
    //console.log(msgData);

    const messeges=[];
    for (let index = 0; index < msgData.length; index++) {


      ////console.log(data.data[index].room);
      
        for (let index2 = 0; index2 < fireData.length; index2++) {
      
          ////console.log(meeting[index].meetingName);
      
          if(msgData[index].senderId == fireData[index2].client_id){

            //console.log('working');
            messeges.push({client_name:fireData[index2].client_name,msg:msgData[index].message,msg_idd:msgData[index].msg_idd,reply_status:msgData[index].reply_status,client_email:fireData[index2].client_email})
          
          }

        }

      }


      setClientMsg(messeges);
   }
   //console.log(fireData);
  }, [msgData])

  // fetch all client records
  const getData = async () => {
    await getDocs(databaseRef)
      .then((response) => {
        setFireData(response.docs.map((data) =>{
          return {...data.data(), client_id: data.id}
        }))
      })
  }



  // fetch all client records
  const getMsg = async () => {
    await getDocs(msgRef)
      .then((response) => {
        console.log("Response from Firestore:", response.docs);
        setMsgData(response.docs.map((data) => {
          console.log("Document ID:", data.id);
          return {...data.data(), msg_idd: data.id};
        }));
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };
  
  

  // view single client record


    // update record
    const updateFields = () => {
      let fieldToEdit = doc(database, 'message', msg_id);
      updateDoc(fieldToEdit, {
        reply: reply,
        reply_status: 1,
        
      })
      .then(() => {
       // toast.success('Data updated successfully!')
       


        const logoUrl = 'https://wabya.com/images/logo-new.png';
        const msg_ = `
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
            
        <p style="font-size: 18px; text-align: center; color: #864985;">admin replied to your query!</p>

        <p style="font-size: 18px; text-align: center; color: #864985;">your query: ${reply}</p>

        <p style="font-size: 18px; text-align: center; color: #864985;">admin reply: ${msg}</p>
      
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
      sendMailFunc(client_email,msg_,'reply to your query'); 

      getData()
      setID(null)
      setclient_name('')
      setclient_email('')
      setmsg('')
      setReply('');
      })
      .catch((err) => {
        //console.log(err);
      })
    }
  

  // delete client
  const deleteDocument = (client_id) => {
    const fieldToEdit = doc(database, 'client_user', client_id);
    deleteDoc(fieldToEdit)
    .then(() => {
      // alert('Client deleted successfully!!')
      toast.success('Client deleted successfully!!');
      getData()
    })
    .catch((err) => {
      // alert('Client not deleted, due to some technical reasons!')
      toast.error('Client is not deleted!');
    })
  }


  const getID = (msg_idd, client_name, msg, client_email) => {
    console.log("msg_id:", msg_idd);
    console.log("client_name:", client_name);
    console.log("msg:", msg);
  
    if (msg_idd) {
      setID(msg_idd);
      setclient_name(client_name);
      setclient_email(client_email);
      setmsg(msg);
    } else {
      console.error("msg_id is undefined");
    }
  };

  return (
    <section className='coaches-list'>
      <div className='container'>
        <div className='row'> 
          <div className='col-sm-12 mrb-30'>
            <h2>message list</h2>
          </div>

          <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>
                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='form-plans'>


                <div className="row">
                    <div className="col-sm-12">
                      <label>Client Name:</label>
                    </div>
                    <div className="col-sm-12">
                    <input name="question" id="question" className='form-control'  value={client_name} />
                     </div>
                  </div>

                <div className="row">
                    <div className="col-sm-12">
                      <label>Message:</label>
                    </div>
                    <div className="col-sm-12">
                    <textarea name="question" id="question" cols="30" rows="4" className='form-control'  value={msg}></textarea>
                     </div>
                  </div>

                  
                  <div className="row">
                    <div className="col-sm-12">
                      <label>Reply:</label>
                    </div>
                    <div className="col-sm-12">
                    <textarea name="question" id="question" cols="30" rows="4" className='form-control' onChange={(event) => setReply(event.target.value)} value={reply}></textarea>
                     </div>
                  </div>
                
                  

                  


                 




                          <>
                            <div className="row">
                              <div className="col-sm-12">
                               
                                <input type="submit" value="update" className='btn btn-save'
                                onClick={updateFields} />
                              </div>
                            </div>
                          </>
                        
                       

                </form>
                </div>
              </div>
              <div className="col-sm-5">
                  <figure>
                    <img src="../../images/banner-bg.png" alt="Images Logo" />
                  </figure>
              </div>
            </div>


            <div className='col-sm-12'>
          <div className='coach-table'>

            <div className='table-responsive'>
                <table className='table table-coaches-list'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Client Name</th>
                      <th>Message</th>
                      <th></th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {clientMsg.map((data) => {
                      return (
                      <>
                      <tr>
                        <td>{count++} </td>
                        <td>{data.client_name}</td>
                        <td>{data.msg}</td>
                        <td>
                          
                        {data.reply_status == 1 ? (
  <span>already replied</span>
) : (
  // <a onClick={() => getID(data.msg_idd, data.client_name, data.msg)} style={{cursor:'pointer'}}>reply</a>


  <button className='btn btn-edit'  onClick={() => getID(data.msg_idd, data.client_name, data.msg,data.client_email)}>
  <i className='fa fa-pencil'></i>
</button>
)}

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

export default MsgList
