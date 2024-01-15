import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { database } from '../../../../../firebaseConfig'
import { collection, getDoc, doc } from 'firebase/firestore'

const Header = () => {

    const router = useRouter()
    const { asPath, pathname } = useRouter();

    const [coach, setCoach] = useState(null);
    const [coachId,setCoachId]=useState();


    const logout = () => {
      sessionStorage.removeItem('coachId');
      router.push('/coach/login')
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


  return (

    <>
    {
         router.pathname === '/client/failed' || router.pathname === '/client/checkout' || router.pathname === '/client/success' || router.pathname === '/client/dashboard' || router.pathname === '/client/change-password' || router.pathname.startsWith('/client/joinvideo/') ?
      (
        <>
        <header className='admin-header client-header custom-class header-desktop'>
          <div className='menu-head'>
            <div className='container'>
              <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                  <a href='/client/dashboard' >
                    <a className='navbar-brand' href="/client/dashboard/">

                    {router.pathname.startsWith('/client/joinvideo/') ? (
          <img src='../../../images/admin.png' alt='Wabya Logo' />
        ) : (
          <img src='/images/admin.png' alt='Default Logo' />
        )}
                     
                    </a>
                  </a>

                  <div className='profile-button'>
                    <div className='dropdown'>
                      <div className='inner'>
                        <button
                          className='btn btn-secondary'
                          type='button'
                          aria-expanded='false'
                          onClick={clientLogout}
                        >
                        log out
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <span className='navbar-toggler-icon'></span>
                  </button> */}


                </div>
              </nav>
            </div>
          </div>
        </header>
        <header className="header-mobile"> 
        <div className="container">	  
          <div className="row align-items-center">
          
          <div className="col-12 logo"><a href="/client/dashboard"><img src="/images/admin.png" alt="" /></a></div>
          
          <div className="col-12 client-login-info"><figure><a href="/client/dashboard"><img src="/images/dummy-user.png" alt=""/></a></figure><a href="#" className="btn"  onClick={clientLogout}>Log out</a></div>
          </div>
            
          </div>         
       
      </header>
      </>
      )
      :
      (
        <>
        <header className='admin-header coach-header header'>
          <div className='menu-head'>
            <div className='container'>
              <nav className='navbar navbar-expand-lg'>
                <div className='container-fluid'>
                  <a href='/' passHref>
                    <a className='navbar-brand'>

                    {router.pathname.startsWith('/coach/clientDetail/') ? (
          <img src="../../../images/admin.png"alt='Wabya Logo' />
        ) : (
          <img src="../../images/admin.png" alt='Wabya Logo' />
        )}
                      {/* <img src='../../images/admin.png' alt='Wabya Logo' /> */}
                    </a>
                  </a>

                  <div className='profile-button'>
                  { coach ? (
                  <>
                    <figure>
                      <img src={coach.coach_profile} alt={coach.coach_name} />
                    </figure>
                  </>
                  ) : null
                  }


                    <div className='dropdown'>
                      <div className='inner'>
                        <button
                          className='btn btn-secondary dropdown-toggle'
                          type='button'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                        {
                          coach ?
                          (
                              <>{coach.coach_name}</>
                          ) : null
                        }
                        </button>
                        <ul className='dropdown-menu'>
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
                  </div>

                  <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                  >
                    <span className='navbar-toggler-icon'></span>
                  </button>

                  <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav'>
                      <li className={router.pathname == "/calendar" ? "active" : ""}>
                        <a href='/coach/calendar' passHref>
                          <a>calendar</a>
                        </a>
                      </li>
                      <li className={router.pathname == "/clients" ? "active" : ""}>
                        <a href='/coach/clients' passHref>
                          <a>clients</a>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            {/* <!--/ menu-head --> */}
          </div>
        </header>
        {/* <header className="header-mobile header-mobile-coach">
  <div className="menu-head">
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/coach/dashboard">
          {router.pathname.startsWith('/coach/clientDetail/') ? (
          <img src="../../../images/admin.png" alt="" />
        ) : (
          <img src="../../images/admin.png" alt="" />
        )}
           
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li>
                <a href='/coach/dashboard'>Profile</a>
              </li>
              <li>
                <a href='/coach/clients'>Clients</a>
              </li>

             
              <li>
                <a href='/coach/timesheet'>Timesheet</a>
              </li>
              <li>
                <a href='/coach/calendar'>Calendar</a>
              </li>
              <li>
                <a href='/coach/resources'>Resources</a>
              </li>
              <li>
                <a href='/coach/availability'>Unavailablity</a>
              </li>
              <li>
                <a href="#" onClick={logout}>Log Out</a>
              </li>
            </ul>
          </div> 
        </div>
      </nav>
    </div>
     
  </div>

</header> */}











<>
  <header className="header-mobile header-mobile-coach">
    <div className="menu-head">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href={`${router.basePath}`}>
            {router.pathname.startsWith('/coach/clientDetail/') ? (
          <img src="../../../images/admin.png"alt='Wabya Logo' />
        ) : (
          <img src="../../images/admin.png" alt='Wabya Logo' />
        )}
            </a>
            {/*button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button*/}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
              <li>
                  <a href="/coach/calendar">calendar</a>
                </li>
                <li>
                  <a href="/coach/clients">clients</a>
                </li>
                <li>
                  <a href="/coach/dashboard">profile</a>
                </li>
                <li>
                  <a href="/coach/dashboard">timesheet</a>
                </li>
                
                <li>
                  <a href="/coach/dashboard">resources</a>
                </li>
                <li>
                  <a href="#" onClick={clientLogout}>logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {/*/ menu-head */}
    </div>
    {/*/ container */}
  </header>
  <div
    className="offcanvas offcanvas-start"
    tabIndex={-1}
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasExampleLabel" />
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
    <div className="offcanvas-body">
      <ul className="navbar-nav">
      <li>
                  <a href="/coach/calendar">calendar</a>
                </li>
                <li>
                  <a href="/coach/clients">clients</a>
                </li>
      <li>
                  <a href="/coach/dashboard">profile</a>
                </li>
                <li>
                  <a href="/coach/timesheet">timesheet</a>
                </li>
              
                <li>
                  <a href="/coach/resources">resources</a>
                </li>
                <li>
                  <a href="#" onClick={clientLogout}>logout</a>
                </li>
      </ul>
    </div>
    {/*/ offcanvas-body */}
  </div>
</>


        </>
      )
    }

    </>
  )
}

export default Header
