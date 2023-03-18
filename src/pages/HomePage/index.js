import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './HomePage.module.css';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataFetchedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  
  const loadUsers = async () => {
    try{
      setIsLoading(true)
      const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${currentPage}/20`);
      const data = await response.json();
      setIsLoading(false)
      setUsers((prev) => [...prev, ...data.list]);
    }catch(err){
      console.log(err)
    }
  };


  useEffect(() => {
    if (dataFetchedRef.current && currentPage === 1) return
    dataFetchedRef.current = true;
    loadUsers();
  }, [currentPage])



  return (
    <div className={styles.usersList}>
      {users && users.map((user, index) => {
        return (
          <Link to={`user/${user.id}`} className={styles.cardWrapper} key={user.id}>
            <Card
              key={user.id}
              id={user.id}
              name={user.name}
              lastName={user.lastName}
              prefix={user.prefix}
              title={user.title}
              img={user.imageUrl}
              isLast={index === users.length - 1}
              nextPage={() => setCurrentPage(currentPage + 1)}
            />
          </Link>
        )
      })}
      {isLoading && <p>Loading...</p>}
    </div>
  )
}

export default HomePage;
