// ** Files Imports
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { app, database } from '../../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter()
  const databaseRef = collection(database, 'admin_user');
  const [fireData, setFireData] = useState([]);

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


  useEffect(() => {
    // Check if the last URL was '/coch/login'



let lastUrl='';
    if(localStorage.getItem("last_admin_login_page")){
     lastUrl = localStorage.getItem("last_admin_login_page");
  }
    //console.log('lastUrl',lastUrl);
    if (lastUrl == '/admin/login') {
      // Reload the current page
      //console.log('yes');
      localStorage.removeItem("last_admin_login_page");
      router.reload();
    }
  }, [router.path]); // Empty dependency array means this effect runs once after the initial render


  // const getData = async () => {
  //   await getDocs(databaseRef)
  //     .then((response) => {
  //       setFireData(response.docs.map((data) =>{
  //         return {...data.data(), admin_id: data.id}
  //       }))
  //     })
  // }


  

  const getData = async () => {
    try {
      const response = await getDocs(databaseRef);
      const processedData = response.docs.map((doc) => {
        const data = doc.data();
        const languages = data.languages.map(language => language.language); // Assuming 'name' is the field in each language object you want to display
        return { ...data, admin_id: doc.id, languages: languages.join(', ') };
      });
      setFireData(processedData);
    } catch (error) {
      // Handle error
      console.error("Error getting documents: ", error);
    }
  }
  

 

return (
  <section className='superadmin-information'>
    <section className="user-profile desktop-hidden">
      <div className="container">
        <div className="row">

        {fireData.map((data) => {
          return(
            <>
              <div className="col-sm-12 top">
                <div className="inner-info">
                  <figure><img src={ data.profile } alt={ data.name } /></figure>
                  <h2>{ data.name.toLowerCase() } </h2>
                  <div className="right-area">
                    <div className="dropdown">
                        <div className="inner">
                          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">edit my profile</button>
                          <ul className="dropdown-menu">
                            <li><Link href='/super-admin/edit-profile' passHref><a className="dropdown-item">edit profile</a></Link></li>
                          <li><Link href='/super-admin/change-password' passHref><a className="dropdown-item">change password</a></Link></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> {/* <!--/ top --> */}

              <div className="col-sm-4 left mrb-30">
                <div className="info-grid">
                <p>Information</p>
                <p>Contact Details: <span><a href={`mailto:${data.email}`}>{data.email}</a></span></p>
                <p>Time Zone: <span>{data.timezone}</span></p>
                <p>Languages: <span> {data.languages} </span></p>
                </div>
              </div> {/* <!--/ left --> */}

              <div className="col-sm-8 right mrb-30">
                <div className="info-grid">
                <h3>Bio</h3>
                <p>{ data.bio } </p>
                <h3>About</h3>
                <p>{ data.about }</p>
                </div>
              </div> {/* <!--/ right --> */}
            </>

          )
        })}

        </div> {/* <!--/ row --> */}
      </div>
    </section> 
    <section className="user-detail mobile-hidden">
    <div className="container">
      <div className="row">
        <div className="col-12">
        {fireData.map((data) => {
          return(
            <>
          <div className="user-profile  mrb-20">
            <figure>
              <img src={ data.profile } alt={ data.name }   />
            </figure>
            <h3>{ data.name.toLowerCase() }</h3>
        
            <div className="user-bio">
              <ul className="row">
                <li className="col-12">
                  <span className="bold">information</span>
                </li>
               
                <li className="col-6">
                  <span className="bold">Contact Details::</span>{" "}
                  <span>
                    <a  href={`mailto:${data.email}`}>{data.email}</a>
                  </span>
                </li>
                <li className="col-6">
                  <span className="bold">time zone</span>{" "}
                  <span>{data.timezone}</span>
                </li>
                <li className="col-12">
                  <span className="bold">languages</span>{" "}
                  <span>{data.languages}</span>
                </li>
                <li className="col-12">
                  <span className="bold">bio </span> { data.bio }
                </li>
                <li className="col-12">
                  <span className="bold">about </span> { data.about }
                </li>
              </ul>
            </div>
          </div>
          </>
        )
      })}
          <p className="btn-p">
          <div className="btn btn-thulian-pink">
  <Link href="/super-admin/edit-profile">
    <a className='edit-profile-mob'>edit my details</a>
  </Link>
</div>
          </p>
          <p className="btn-p">
            <a href="/super-admin/change-password" className="btn btn-orange">
              change password
            </a>
          </p>
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
    </section>

  )
}

export default Dashboard
