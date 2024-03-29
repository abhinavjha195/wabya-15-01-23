// ** React Imports
import { ReactNode, useState,useRef } from 'react'

// ** Next Imports
// import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import emailjs from '@emailjs/browser';
import { Alert } from '@mui/material'
import { collection, addDoc ,where, query,startAt,limit,orderBy,getDocs} from 'firebase/firestore'

import { app, database } from '../../../../firebaseConfig'
import country_data from '../../../@core/utils/all-countries'

import { sendMail } from "../../../services/sendMail"
import { Router } from 'mdi-material-ui';
import { useRouter } from 'next/router';

function generateOTP() {
  // Generate a random 4-digit number
  return Math.floor(1000 + Math.random() * 9000);
}


const ApplyWabyaBasic = () => {
  const form1 = useRef();
  const router = useRouter()
  const [isThankModal, setIsThankModal] = useState(false)

  const [name, setName] = useState('');

  const [surname, setSurname] = useState('');

  const [email, setEmail] = useState('');
  const [reemail, setReEmail] = useState('');
  const [msg, setmsg] = useState('');
  const [mobile, setmobile] = useState('');
  const [remobile, setReMobile] = useState('');
  const [terms, setterms] = useState(false);

  const [enqMsg, setenqMsg] = useState(false);

  const [pass, setpass] = useState('');
  const [otp, setotp] = useState('');
  const [otp_gen, setotp_gen] = useState('');
  const [showOtp, setshowOtp] = useState(false);

  const [coachGender, setcoachGender] = useState('female');

  const [coachCertificate, setcoachCertificate] = useState('no');

  const [nameErr, setnameErr] = useState('');
  const [surnameErr, setsurnameErr] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [mobileErr, setemobileErr] = useState('');


  const [reemailErr, setReEmailErr] = useState('');
  const [remobileErr, setReMobileErr] = useState('');


  const [msgErr, setmsgErr] = useState('');
  const [passErr, setpassErr] = useState('');

  const [otpErr, setotpErr] = useState('');

  const [countryErr, setcountryErr] = useState('');
  const [timezoneErr, settimezoneErr] = useState('');
  const [genderErr, setgenderErr] = useState('');

  const [msgLenErr, setmsgLenErr] = useState('');
  const [validEmailErr, setvalidEmailErr] = useState('');
  const [message, setErrorMsg] = useState(false);
  const [isAccept, setisAccept] = useState(false);
  const [TermMsg, setTermlMsg] = useState('');
  const [success, setsuccess] = useState('');
  const coachesRef = collection(database, 'coaches_user');

  const [country_sel, setcountry_sel] = useState('');

  async function sendMailFunc (email,content,$subject){   
    let response = await sendMail(email,$subject,content);   
  
    //console.log('response',response);
  }   
  const [emailExist, setEmailExist] = useState(false);

     // coach data fetch
     const countData = async (client_em:string) => {
      //console.log('test');
          const queryDoc = query(coachesRef, where('coach_email', '==', client_em));
      let count_data=0
          await getDocs(queryDoc).then(response => {
            //console.log(response.docs.length); 
            count_data=response.docs.length;
          })
          return count_data;
        }


  const getLanguagesOfSelectedCountry = () => {
    const selectedCountry = country_data.find(country => country.country === country_sel);
    if (selectedCountry) {
      return selectedCountry.languages;
    }
    return [];
  };

  const getTimeZoneOfSelectedCountry = () => {
   const selectedCountry = country_data.find(country => country.country === country_sel);
   if (selectedCountry) {
     return selectedCountry.timezone;
   }
   return '';
 };

  const selectedCountryLanguages = getLanguagesOfSelectedCountry();
  const selectedCountryTimezone = getTimeZoneOfSelectedCountry();

  const handleChangeCountry = (event) => {
    setcountry_sel(event.target.value);
    
}


const handleGender = (event) => {

  setcoachGender(event.target.value);
}

const handleCertificate = (event) => {

  setcoachCertificate(event.target.value);
}


  const thankModal = () => {
    setIsThankModal(true)
  }

  const cancelModal = () => {
    setIsThankModal(false)
  }
  
  const onSubmit = async (event) => {
    event.preventDefault();
    let err=0;
    setnameErr('');
    setsurnameErr('');
    setemailErr('');
    setmsgErr('');
    setemobileErr('');

    setReMobileErr('');
    setReEmailErr('');

    setTermlMsg('');
    setmsgLenErr('');
    setvalidEmailErr('');
    setcountryErr('');
    settimezoneErr('');
    setgenderErr('');
    setotpErr('');
    setEmailExist(false);


   
    if(name == ""){
setnameErr('Name Field is Required');
err=err+1;
    }


    if(surname == ""){
      setsurnameErr('SurName Field is Required');
      err=err+1;
          }
          if(mobile == ""){
            setemobileErr('Mobile Field is Required');
            err=err+1;
                }

                if(remobile != mobile){
                  setReMobileErr('Verify Mobile Field should matched with Mobile Field');
                  err=err+1;
                      }

                      if(reemail != email){
                        setReEmailErr('Verify Email Field should matched with Email Field');
                        err=err+1;
                            }


                if(country_sel == ""){
                  setcountryErr('Country Field is Required');
                  err=err+1;
                      }

                      if(selectedCountryTimezone == ""){
                        settimezoneErr('Timezone Field is Required');
                        err=err+1;
                            }

                            if(coachGender == ""){
                              setgenderErr('Gender Field is Required');
                              err=err+1;
                                  }

                if(pass == ""){
                  setpassErr('Password Field is Required');
                  err=err+1;
                      }

          if(email == ""){
            setemailErr('Email Field is Required');
            err=err+1;
                }else{
                   // Check if the entered value is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if(!isValid){
      setvalidEmailErr('Please Enter Valid Email');
      err=err+1;
    }
                }


                if(msg == ""){
                  setmsgErr('Message Field is Required');
                  err=err+1;
                      }else{

                      // if(msg.length <= 250){
                      //   setmsgLenErr('Minimum of 250 words Required');
                      //   err=err+1;
                      //       }
                          }

                      if(isAccept == false){
                        setTermlMsg('Please Accept This');
                        err=err+1;
              
                       }

    if(err == 0){
    //  emailjs.sendForm('service_mwla9qu', 'template_4uf3noc', form1.current, 'kSYqPWVMFZAxQB2yI')
      // .then((result) => {
      //     //console.log(result.text);
      //     setIsThankModal(true);
      //   //  action.resetForm();
      //   if (typeof window !== 'undefined') {
      //     window.scrollTo(0, 0);
      //   }
          
      // }, (error) => {
      //     //console.log(error.text);
      // });




      if(await countData(email.toLowerCase()) == 0){

         // setshowOtp(true);
 

      //     if(otp_gen == ''){
      //       const otp = generateOTP();
      //       //console.log("Generated OTP:", otp);
      //       setotp_gen(otp);
      //     const logoUrl_ = 'https://wabya.com/images/logo-new.png';
      //     const otpmsg = `
      //     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      //     <html xmlns="http://www.w3.org/1999/xhtml">
      //        <head>
      //           <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      //           <meta name="viewport" content="width=device-width, initial-scale=1">
      //           <title>Wabya</title>
      //           <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
      //           <style type="text/css">
      //              body{padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size:14px; line-height:22px; font-family: 'Lato', sans-serif; font-weight:400;}
      //           </style>
      //        </head>
      //        <body paddingwidth="0" paddingheight="0"  style="" offset="0" toppadding="0" leftpadding="0">
      //        <div style="display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;">
      //           <table width="600" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='width: 600px; display: block;'>
      //              <tbody>
      //                 <tr>
      //                    <table class="MainContainer" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ece6d5" align="center" style='width: 600px; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px;'>
      //                       <tbody style=''>
      //     <tr>
      //                             <td colspan="2"><div style="text-align: center; margin:35px 0 0" class="contentLogo"><a href="https://www.#.com"><img src="${logoUrl_}" width="200px" alt="" border="0" style=""></a></div></td>
      //                          </tr>
      //                          <tr>
      //                             <td>
      //                                <div style="padding:0 30px;  position: relative; z-index: 2;line-height: 22px;font-family: 'Lato', sans-serif;font-weight: 600;text-align: center;">
                                   
      //                                <p style="font-size: 18px; text-align: center; color: #864985;">Hello ${name},</p>
      //                                <p style="font-size: 18px; text-align: center; color: #864985;">OTP for your registration is ${otp}.</p>
                                   
      //     <hr style="border: 1px solid #1c686b;">
      //     <p style="font-size: 14px; color: #242424; text-align: center;">Thank you,<br>Wabya Team</p>
      //      </div>  
      //                             </td>
      //                          </tr>
      //                       </tbody>
      //                    </table>
      //                 </tr>
      //              </tbody>
      //           </table>
      //      </div>
      //        </body>
      //     </html>
      // `;
      //  // sendMailFunc('kaylae@tdmc.co.za',adminmsg,'Coach Registration'); 
      //   sendMailFunc(email,otpmsg,'OTP for Coach Registration'); 
      //     }
          // if(otp == ''){
          //  // setotpErr('otp Field is Required');
          //  // err=err+1;
          //       }
          // else if(otp != otp_gen){
          //   //console.log(otp);
          //   //console.log(otp_gen);
          //   setotpErr('otp is incorrect');
          //  // err=err+1;
          //       }
     // else{

      addDoc(coachesRef, {
        coach_name:  name,
        coach_country : country_sel,
        coach_email : email.toLowerCase(),
        coach_password : pass,
        coach_phone : Number(mobile),
        coach_timezone : selectedCountryTimezone,
        coach_gender : coachGender,
        coach_certificate : coachCertificate,
        coach_api : String(),
        coach_uname : String(),
        coach_language: String(),
        coach_about: msg,
        coach_bio: String(),
        coach_profile: 'https://firebasestorage.googleapis.com/v0/b/wabya-45dba.appspot.com/o/coach%2Fprofile%2Fdefault-pic.png?alt=media&token=e8f166da-9d52-4c00-a978-60669f3a0929&_gl=1*3mksep*_ga*MTIzMzY1Njg1LjE2OTA4MDU4Nzg.*_ga_CW55HF8NVT*MTY5NzEwMzk4Ni45Mi4xLjE2OTcxMDcyNTIuMjkuMC4w',
        coach_uid : Number(),
      }) 
        .then(() => {
        setsuccess('Registered Successfully');
        //  router.push('/pages/login')

        const logoUrl = 'https://wabya.com/images/logo-new.png';
        const msg = `
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
            <p style="color: #3498db;text-align: center;font-size: 36px;">Registration Successfull!</p>
        <p style="font-size: 18px; text-align: center; color: #864985;">Thank You For Joining Us!</p>
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
      sendMailFunc(email,msg,'Registration Confirmation');  


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
                             
                               <p style="font-size: 18px; text-align: center; color: #864985;">Hello Admin,</p>
                               <p style="font-size: 18px; text-align: center; color: #864985;">A new coach has registered on your platform.</p>
                               <p style="font-size: 18px; text-align: center; color: #864985;">Here are the user's details:</p>
     
   
                               <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Name: ${name} </p>
    <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Email: ${email} </p>
  
    <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Gender: ${coachGender} </p>
    
    <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Associate Certified Coach: ${coachCertificate} </p>
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
 // sendMailFunc('kaylae@tdmc.co.za',adminmsg,'Coach Registration'); 
  sendMailFunc('youare@wabya.com',adminmsg,'Coach Registration'); 
  router.push('/coach/login');
  
        })
        .catch((err) => {
          //console.error(err);
        })

    //  }
      }else{
        setEmailExist(true);
      }
    }
    else{
      //console.log('error');
    }
  }

  const handleCheckboxChange = () => {
    setisAccept(!isAccept);
  };
  return (
    <>

    <section className="work-together">
      <div className="container">
        <div className="row align-items-center">

        <div className="col-sm-12">
          <div className="wt-title mrb-30">
            <h2>let’s work together</h2>

            {
            isThankModal ?
              (
                <>
                <div className="thank-modal">
                  <div className="front-pricing thank-note apply-thank">
                    <div className="pr-modal">
                      <div><i className="fa fa-angle-left" onClick={cancelModal}></i></div>
                      <div><span>thank you</span></div>
                    </div>
                    <div className="divider"></div>
                    <div className="para-modal">
                      <p>well done on taking the first step in your coaching journey with wabya! <br /> someone from the team will be in touch with you shortly</p>
                    </div>
                  </div>
                </div>
                </>
              ) : null
            } 

            <p><strong>please note, we only work with coaches who have graduated from an ICF, EMCC or AC-accredited coaching programme.</strong></p>
        </div>

          <div className="inner">
          <form ref={form1}>


            {/* { !showOtp ? (
              <> */}
            <div className="col-sm-6 form-group"><input className="form-control" name="name" value={name}  placeholder="name" onChange={(event) => setName(event.target.value)}/> {nameErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{nameErr}</Alert>}</div>

          <div className="col-sm-6 form-group"><input className="form-control" name="name" value={surname} placeholder="surname" onChange={(event) => setSurname(event.target.value)}/></div>


          <div className="col-sm-6 form-group"><input className="form-control" name="email" value={email} placeholder="email" onChange={(event) => setEmail(event.target.value)}/> 
          
          {emailErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{emailErr}</Alert>}
          {validEmailErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{validEmailErr}</Alert>}
          
          {emailExist  && <Alert severity='error' style={{ margin :'10 0 20px 0'}}>*Email Already Exist</Alert>}
          </div>


          <div className="col-sm-6 form-group"><input className="form-control" name="reemail" value={reemail} placeholder="verify email" onChange={(event) => setReEmail(event.target.value)}/> 
          
          {reemailErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{reemailErr}</Alert>}
          </div>
          <div className="col-sm-6 form-group"><input className="form-control" name="mobile" placeholder="mobile number" value={mobile} onChange={(event) => setmobile(event.target.value)}/> {mobileErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{mobileErr}</Alert>}</div>


          <div className="col-sm-6 form-group"><input className="form-control" name="mobile" placeholder="verify mobile number" value={remobile} onChange={(event) => setReMobile(event.target.value)}/> {remobileErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{remobileErr}</Alert>}</div>
         
         
          <div className="col-sm-6 form-group">   <select className="form-control select"  name='clientCountry'
  id='clientCountry'
  
  
  value={country_sel}
  onChange={handleChangeCountry}>
    <option>select country</option>
                  {country_data.map((country, index) => (
<option value= {country.country}> {country.country}</option>
))}
                  </select>
                  {countryErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{countryErr}</Alert>}    
          </div>



          <div className="col-sm-6 form-group">

          <input className="form-control" name='clientTimeZone'
              id='clientZone'
              
             placeholder='timezone'
              value={selectedCountryTimezone}
               readOnly /> 

{timezoneErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{timezoneErr}</Alert>}     
          </div>

          <div className="col-sm-6 form-group">   <select className="form-control select"  name='clientGender'
  id='clientGender'
onChange={handleGender}
  
  
  >
  
                  

<option value="female" selected={coachGender === 'female'}> female</option>
<option value="male" selected={coachGender === 'male'}> male</option>
<option value="other" selected={coachGender === 'other'}> other</option>

                  </select>
                  {genderErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{genderErr}</Alert>}      
          </div>
         
         
       











                              <div className="col-sm-6 form-group"><input type="password" className="form-control" name="pass" placeholder="password" value={pass} onChange={(event) => setpass(event.target.value)}/> {passErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{passErr}</Alert>}</div>     


                              <div className="col-sm-6 form-group"><textarea className="form-control" placeholder="a bit about me" value={msg} onChange={(event) => setmsg(event.target.value)}></textarea>  {msgErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{msgErr}</Alert>}
          {msgLenErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{msgLenErr}</Alert>}</div>




          <div className="col-sm-6 form-group">  
          
         <h6>i hold an associate certified coach (acc) credential - or its equivalent</h6>
           <select className="form-control select"  name='clientCertificate'
  id='clientCertificate'
onChange={handleCertificate}
  
  
  >
  
                  

<option value="yes" selected={coachCertificate === 'yes'}> yes</option>
<option value="no" selected={coachCertificate === 'no'}> no</option>
<option value="applying" selected={coachCertificate === 'applying'}> currently applying</option>

                  </select>
                        
          </div>
         










          <div className="col-sm-6 form-group"></div>
          <div className="col-sm-12 form-group">
              <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="accept" onClick={handleCheckboxChange}/>
              <small><strong>I have graduated from an ICF, EMCC or AC-accredited coaching programme</strong></small>

              <div className="col-sm-6 form-group">
              {TermMsg && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{TermMsg}</Alert>}
              </div>
            </div>
            </div>

            {success && <Alert severity='success' style={{ margin :'10px 0 20px 0'}}>{success}</Alert>}
         
          <div className="col-sm-12 form-group"><input className="btn" value="submit" type="button"  onClick={onSubmit}/></div>


          


           
          {/* <div className="col-sm-6 form-group"><input type="text" className="form-control" name="otp" placeholder="enter email otp" value={otp} onChange={(event) => setotp(event.target.value)}/> {otpErr && <Alert severity='error' style={{ margin :'10px 0 20px 0'}}>{otpErr}</Alert>}</div> */}
          
         
         
          </form>
          </div>
        </div> {/* <!--/ col-sm --> */}

        </div> {/* <!--/ row --> */}
      </div>
    </section> {/* <!--/ work-together --> */}

    </>
  )
}

ApplyWabyaBasic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ApplyWabyaBasic
