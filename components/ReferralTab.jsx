import { useEffect, useState } from 'react';

const User = ({ userId }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch(`app/api/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setPoints(data.points);
      });
  }, [userId]);

  return (
    <div>
      <h1>Your XP: {points}</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { userId } = context.query;
  return {
    props: {
      userId,
    },
  };
}

export default User;
