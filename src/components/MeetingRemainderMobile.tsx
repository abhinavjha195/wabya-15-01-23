import React from 'react';
import Link from 'next/link'
const MeetingReminderMobile = ({ meeting, newClient, scheduleMeeting, updateNewClientNotified, updateNotified }) => {
  return (
    <>


    
{meeting.length > 0 ? meeting.map((meet, index) => (

index == 0 ?(
  <div class="container notification-container">
<div className='row coach-dash-desktop' key={index}>
<div className='col-sm-12'>
<div className='client-reminder notification-desktop'>
<p>
  meeting started 
  {/* <span>45 minutes : Coach Name</span> */}
</p>
<p><Link href={`/coach/coach-video-call/${meet.meeting_id}`}>join</Link></p>
{/* <div className='dismiss'>

  

  <i className="fa-solid fa fa-remove"></i>
</div> */}
</div>
</div>
</div> 
</div>
) :null 
)) : null}




{newClient.length > 0 ? newClient.map((new_c, index) => (

<div class="container notification-container">
<div className='row coach-dash-desktop' key={index}>
<div className='col-sm-12'>
<div className='client-reminder notification-desktop'>
<p>
new client ({new_c.client_name}) joined.
{/* <span>45 minutes : Coach Name</span> */}
</p>
<div className='dismiss' onClick={() => updateNewClientNotified(new_c.c_id)}>


{/* <h5><Link href={`/coach/coach-video-call/${meet.meeting_id}`}>Join</Link></h5> */}

<i className="fa-solid fa fa-remove"></i>
</div>
</div>
</div>
</div> 
</div>

)) : null}





{scheduleMeeting.length > 0 ? scheduleMeeting.map((meet, index) => (
  index === 0 ? (
    <div class="container notification-container">
    <div className='row coach-dash-desktop' key={index}>
      <div className='col-sm-12'>
        <div className='client-reminder notification-desktop'>
          <p>
         ({scheduleMeeting.length})new meeting schedule 
            {/* <span>45 minutes : Coach Name</span> */}
          </p>
          <p><a href="/coach/new-meeting">detail</a></p>
          <div className='dismiss' onClick={() => updateNotified()}>
            {/* <h5><Link href={`/coach/coach-video-call/${meet.meeting_id}`}>Join</Link></h5> */}
            <i className="fa-solid fa fa-remove"></i>
          </div>
        </div>
      </div>
    </div></div>
  ) : null
)) : null}

    </>
  );
};

export default MeetingReminderMobile;
