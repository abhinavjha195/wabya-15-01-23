import { useEffect, useState } from 'react';

const MeetingTimer = ({ startTime, meetingDate }) => {
  const [timeUntilMeeting, setTimeUntilMeeting] = useState('');

  useEffect(() => {
    const calculateTimeUntilMeeting = () => {
      const meetingDateTime = new Date(`${meetingDate}T${startTime}`);
      const currentTime = new Date();

      // Check if meeting date is in the past
      if (meetingDateTime < currentTime) {
        setTimeUntilMeeting('Meeting has already started');
      } else {
        let timeDifference = meetingDateTime.getTime() - currentTime.getTime();
        
        // Calculate hours, minutes, and seconds
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeUntilMeeting(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    };

    const interval = setInterval(calculateTimeUntilMeeting, 1000);
    
    calculateTimeUntilMeeting(); // Call it immediately to avoid initial delay

    return () => clearInterval(interval);
  }, [startTime, meetingDate]);

  return (
    <div>
      <p>Your meeting will start in: {timeUntilMeeting}</p>
    </div>
  );
};

export default MeetingTimer;
