import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FriendsList from '../../components/FriendsList';
import styles from './UserPage.module.css';

function UserPage() {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const loadUserInfo = async () => {
    const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`);
    const data = await response.json();
    setUser(data);
  };
  
  
  useEffect(() => {
    loadUserInfo();
  }, [id])


  return (
    <div className={styles.userPage}>
      <div className={styles.userInfo}>
        <img src={`${user.imageUrl}?${user.id}`} alt="userimage" className={styles.userImage} />
        <fieldset className={styles.userIdentity}>
          <legend>Info</legend>
          <div>
            <strong>{user?.prefix} {user?.name} {user?.lastName}</strong>
          </div>
          <div>
            <span>{user?.title}</span>
          </div>
          <br />
          <div>
            <div>
              <label>Email:</label>
              <span> {user?.email}</span>
            </div>

            <div>
              <label>Ip Address:</label>
              <span> {user?.ip}</span>
            </div>

            <div>
              <label>Job Area:</label>
              <span> {user?.jobArea}</span>
            </div>

            <div>
              <label>Job Type:</label>
              <span> {user?.jobType}</span>
            </div>
          </div>
        </fieldset>
        <fieldset className={styles.userAddress}>
          <legend>Address</legend>
          <h4>{user?.company?.name} {user?.company?.suffix}</h4>
          <div>
            <label>City:</label>
            <span> {user?.address?.city}</span>
          </div>

          <div>
            <label>Country:</label>
            <span> {user?.address?.country}</span>
          </div>

          <div>
            <label>State:</label>
            <span> {user?.address?.state}</span>
          </div>

          <div>
            <label>Street Address:</label>
            <span> {user?.address?.streetAddress}</span>
          </div>

          <div>
            <label>ZIP:</label>
            <span> {user?.address?.zipCode}</span>
          </div>
        </fieldset>
      </div>
      <FriendsList />
    </div>
  )
}

export default UserPage;
