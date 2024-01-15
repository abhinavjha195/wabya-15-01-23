import Link from "next/link"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { database } from '../../../../firebaseConfig'
import { collection, getDoc, doc } from 'firebase/firestore'

const Header = () => {
  const router = useRouter();
  const { pathname } = useRouter(); 
  console.log(pathname);

//  const router = useRouter()
  const { asPath, pathname2 } = useRouter();

  const [coach, setCoach] = useState(null);
  const [coachId,setCoachId]=useState();

  const [showpage, setshowpage] = useState(false);
  useEffect(() => {
    // Check if the last URL was '/coch/login'
let lastUrl='';
    if(localStorage.getItem("p_url")){
     lastUrl = localStorage.getItem("p_url");
  }else{
    setshowpage(true);
  }
    console.log('lastUrl',lastUrl);
    if (lastUrl == '/joinvideo') {
      // Reload the current page
      console.log('yes');
     // localStorage.removeItem("p_url");

	 
     // router.reload();
    }
  }, [router.path]); // Empty dependency array means this effect runs once after the initial render


  const logout = () => {
	sessionStorage.removeItem('coachId');
	router.push('/client/login')
  }

  const clientLogout = () => {
	sessionStorage.removeItem('userId');
	router.push('/client/login')
  }

  useEffect(() => {

	const coachId = sessionStorage.getItem('coachId')
	const userId = sessionStorage.getItem('userId')

	setCoachId(coachId);

	if (coachId) {
	  const fetchCoach = async () => {
		const coachRef = doc(collection(database, "coaches_user"), coachId);
		const coachDoc = await getDoc(coachRef);

		if (coachDoc.exists()) {
		  setCoach(coachDoc.data());
		} else {
		  console.log("No coach found");
		}
	  };
	  fetchCoach();
	}

}, [coachId])

  const [logindropdown, setlogindropdown] = useState(false);
  const [signupdropdown, setsignupdropdown] = useState(false);
  const [menuCollapse, setmenuCollapse] = useState(false);
  const [menuCollapse2, setmenuCollapse2] = useState(false);
  const setlogin = () => {
    setlogindropdown(logindropdown => !logindropdown);
	setsignupdropdown(false);
  };
  const setsignups = () => {
	console.log('test');
    setsignupdropdown(signupdropdown => !signupdropdown);
	setlogindropdown(false);
  };

  const Setmenu = (event) => {
	event.preventDefault();
	console.log('test');
	setTimeout(() => {

		
		if(menuCollapse){
		$(".navbar-nav").slideUp("slow", function() {
			setmenuCollapse(menuCollapse => !menuCollapse);
		});
	}

	if(!menuCollapse){
		$(".navbar-nav").slideDown("slow", function() {
			setmenuCollapse(menuCollapse => !menuCollapse);
		});
	}

		
	  }, 200); // 1 second delay
  };


  const Setmenu2 = (event) => {
	event.preventDefault();
	console.log('test2');
	setTimeout(() => {

		
		if(menuCollapse2){
		
			setmenuCollapse2(menuCollapse2 => !menuCollapse2);
		
	}

	if(!menuCollapse2){
		
			setmenuCollapse2(menuCollapse2 => !menuCollapse2);
	
	}

		
	  }, 10); // 1 second delay
  };
  useEffect(() => {
	

	setmenuCollapse(false);
	setlogindropdown(false);
	setsignupdropdown(false);
	console.log('route changed');
 // 1 second delay
  }, [router.pathname])
  return(
<>
	{showpage ?
		(
		  <>
  <header className={`header ${coach ? 'header-login' : ''}`}>
  <div className="menu-head">
    <div className="container">

	  <nav className="navbar navbar-expand-lg">
	    <div className="container-fluid">
		  <Link href="/"><a className="navbar-brand"><img src={`${router.basePath}/images/logo.png`}  alt="Wabya"/></a></Link>
		  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" onClick={Setmenu}></span></button>

		  <div className={`collapse navbar-collapse ${menuCollapse ? 'show' : ''}`} id="navbarSupportedContent">
		    <ul className="navbar-nav">
			  <li className={router.pathname == "/" ? "active" : ""}><Link href="/"><a>home</a></Link></li>
			  <li className={router.pathname == "/frontend/about" ? "about-active" : ""}><Link href="/frontend/about">about us</Link></li>
			  <li className={router.pathname == "/frontend/coaching-journey" ? "coaching-active" : ""}><Link href="/frontend/coaching-journey">about coaching</Link></li>
			  <li className={router.pathname == "/frontend/pricing" ? "pricing-active" : ""}><Link href="/frontend/pricing">pricing</Link></li>
			  <li className={router.pathname == "/frontend/faq" ? "pricing-active" : ""}><Link href="/frontend/faq">FAQ</Link></li>
			  <li className={router.pathname == "/frontend/contact" ? "contact-active" : ""}><Link className="scroll" href="/frontend/contact">contact</Link></li>

			  
		    </ul>
		  </div>

         
		  <div className="login-info frontend-change">
		  {/* <div className="login-info">
		  <div className='dropdown'>
                      
					  <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        > 
						Abc
						</button>
						<ul className='dropdown-menu'>
						<li>
						  <Link href='/dashboard' passHref>
							<a className='dropdown-item'>Profile</a>
						  </Link>
						</li>
						<li>
						  <Link href='/timesheet' passHref>
							<a className='dropdown-item'>Timesheet</a>
						  </Link>
						</li>
						<li>
						  <Link href='/resources' passHref>
							<a className='dropdown-item'>Resources</a>
						  </Link>
						</li>
						<li>
							<a className='dropdown-item' >Log Out</a>
						</li>
					  </ul>
					
					</div>
        <Link href="/pages/login"><a className="btn">Log In
		
		
		<ul className='dropdown-menu'>
						<li>
						  <Link href='/dashboard' passHref>
							<a className='dropdown-item'>Profile</a>
						  </Link>
						</li>
						<li>
						  <Link href='/timesheet' passHref>
							<a className='dropdown-item'>Timesheet</a>
						  </Link>
						</li>
						<li>
						  <Link href='/resources' passHref>
							<a className='dropdown-item'>Resources</a>
						  </Link>
						</li>
						<li>
							<a className='dropdown-item' >Log Out</a>
						</li>
					  </ul>
					
		</a>
		
		</Link> */}

<div className='profile-button' >
	
                  { coach ? (
                  <>
                    <figure   onClick={Setmenu2}>
                      <img src={coach.coach_profile} alt={coach.coach_name}  />
                    </figure>
                  </>
                  ) : null
                  }

{ coach ? (
	<>
                    <div className='dropdown'>
                      <div className='inner'>
                        <button
                          className={`btn btn-secondary dropdown-toggle ${menuCollapse2 ? 'show' : ''}`}
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
						  onClick={Setmenu2}
                        >
                        {
                          coach ?
                          (
                              <>{coach.coach_name}</>
                          ) : null
                        }
                        </button>
                        <ul className={`dropdown-menu ${menuCollapse2 ? 'show' : ''}`}>
                          <li>
                            <Link href='/coach/dashboard' passHref>
                              <a className='dropdown-item'>profile</a>
                            </Link>
                          </li>
                          
                          <li>
                            <Link href='/coach/timesheet' passHref>
                              <a className='dropdown-item'>timesheet</a>
                            </Link>
                          </li> 
                     
                          <li>
                            <Link href='/coach/resources' passHref>
                              <a className='dropdown-item'>resources</a>
                            </Link>
                          </li>

                          {/* <li>
                            <Link href='/coach/availability' passHref>
                              <a className='dropdown-item'>unavailability</a>
                            </Link>
                          </li> */}
                          <li>
                              <a className='dropdown-item' onClick={logout}>logout</a>
                          </li>
                        </ul>




                      </div>
                    </div>
					</>)
                : 
		
                  


                    <div className='dropdown'>
                      <div className='inner'>
                        <button
                          className='btn btn-secondary'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
						  onClick={setlogin}
                        >
                       Log in
                        </button>
                        <ul className="dropdown-menu" style={{ display: logindropdown ? 'block' : 'none' }}>
  

						<li>
                            <Link href='/client/login' passHref >
                              <a className='dropdown-item' onClick={setlogin}>Client</a>
                            </Link>
                          </li>
                          <li>
                            <Link href='/coach/login' passHref >
                              <a className='dropdown-item' onClick={setlogin}>Coaches</a>
                            </Link>
                          </li>

						 
                         
                        </ul>
                      </div>
                    </div>

					}
                  </div>

				  { !coach ? (
	<>
				  <div className='profile-button pb-signup'>
                  


				  <div className='dropdown'>
					<div className='inner'>
					  <button
						className='btn btn-secondary'
						type='button'
						data-bs-toggle='dropdown'
						aria-expanded='false'
						onClick={setsignups}
					  >
					 sign up
					  </button>
					  <ul className="dropdown-menu" style={{ display: signupdropdown ? 'block' : 'none' }}>

						<li>
						  <Link href='/frontend/pricing' passHref>
							<a className='dropdown-item' onClick={setsignups}>Client</a>
						  </Link>
						</li>

						<li>
						  <Link href='/frontend/apply' passHref>
							<a className='dropdown-item' onClick={setsignups}>Coaches</a>
						  </Link>
						</li>
					   
					  </ul>
					</div>
				  </div>
				</div>
				</>) : null }
          {/* <Link href="/pages/register"><a className="btn">Sign Up</a></Link>  */}

		  
      </div>
	    </div>
	  </nav> 

    </div> {/* <!--/ menu-head --> */}
  </div> {/* <!--/ container --> */}

  
</header>


</>): null}
</>
  )
}
export default Header
