import React from 'react';

const MeetingReminder = ({ meeting, newClient, scheduleMeeting, updateNewClientNotified, updateNotified }) => {
  return (
    <>


    
      {meeting.length > 0 &&
        meeting.map((meet, index) =>
          index === 0 ? (
            <div className="meeting-reminder" key={meet.meeting_id}>
              <div className="info">
                <div className="title">meeting started.</div>
              </div>
              <div className="meeting-link">
                <a href={`/coach/coach-video-call/${meet.meeting_id}`}>join</a>
              </div>
            </div>
          ) : null
        )}

      {newClient.length > 0 &&
        newClient.map((new_c) => (
          <div className="meeting-reminder" key={new_c.c_id}>
            <div className="info">
              <div className="title">New Client Joined.</div>
              <p>client name: {new_c.client_name}</p>
            </div>
            <div className="meeting-link">
              <a href="#" onClick={() => updateNewClientNotified(new_c.c_id)}>
                Dismiss
              </a>
            </div>
          </div>
        ))}

      {/* {scheduleMeeting.length > 0 &&
        scheduleMeeting.map((meet) => (
          <div className="meeting-reminder" key={meet.meet_id}>
            <div className="info">
              <div className="title">new meeting scheduled </div>
              <p>10 minutes: client name</p>
            </div>
            <div className="meeting-link">
              <a href="#">join</a>
              <a href="#" onClick={() => updateNotified(meet.meet_id)}>
                dismiss
              </a>
            </div>
          </div>
        ))} */}


{scheduleMeeting.length > 0 ? scheduleMeeting.map((meet, index) => (
  index === 0 ? (
          <div className="meeting-reminder" key={meet.meet_id}>
            <div className="info">
              <div className="title"> ({scheduleMeeting.length})new meeting schedule </div>
             
            </div>
            <div className="meeting-link">
              <a href="/coach/new-meeting">detail</a>
              <a href="#" onClick={() => updateNotified()}>
                dismiss
              </a>
            </div>
          </div>
       ) : null
       )) : null}
    </>
  );
};

export default MeetingReminder;
