// components/TaskTab.jsx
'use-client'
import { useState } from 'react';

export default function TaskTab() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [socialTasksCompleted, setSocialTasksCompleted] = useState({
    liked: false,
    followed: false,
    shared: false,
  });

  const handleLogin = () => {
    setLoggedIn(true);
    // Logic for rewarding daily login
    // Example: Reward points, increase streak, etc.
  };

  const handleSocialTask = (task) => {
    switch (task) {
      case 'like':
        setSocialTasksCompleted({ ...socialTasksCompleted, liked: true });
        // Logic for rewarding like task
        break;
      case 'follow':
        setSocialTasksCompleted({ ...socialTasksCompleted, followed: true });
        // Logic for rewarding follow task
        break;
      case 'share':
        setSocialTasksCompleted({ ...socialTasksCompleted, shared: true });
        // Logic for rewarding share task
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        {!loggedIn ? (
          <button onClick={handleLogin}>Log In for Daily Reward</button>
        ) : (
          <p>Daily login reward claimed!</p>
        )}
      </div>
      <div>
        <h3>Social Media Tasks</h3>
        <ul>
          <li>
            Like $TSBot content:
            {!socialTasksCompleted.liked ? (
              <button onClick={() => handleSocialTask('like')}>Like</button>
            ) : (
              <span>Completed!</span>
            )}
          </li>
          <li>
            Follow $TSBot on social media:
            {!socialTasksCompleted.followed ? (
              <button onClick={() => handleSocialTask('follow')}>Follow</button>
            ) : (
              <span>Completed!</span>
            )}
          </li>
          <li>
            Share $TSBot content:
            {!socialTasksCompleted.shared ? (
              <button onClick={() => handleSocialTask('share')}>Share</button>
            ) : (
              <span>Completed!</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
