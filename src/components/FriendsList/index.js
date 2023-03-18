import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Card';
import styles from './FriendsList.module.css';

function FriendsList() {
    const [friends, setFriends] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const dataFetchedRef = useRef(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isReplaceIdClicked, setIsReplaceIdClicked] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);


    const loadUsers = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${currentPage}/20`);
            const data = await response.json();
            setIsLoading(false)
            isReplaceIdClicked ? setFriends(data.list) : setFriends((prev) => [...prev, ...data.list]);
        } catch (err) {
            console.log(err)
        }
    };


    function handleReplaceId(friend, replaceId) {
        navigate(`/user/${replaceId}`, { replace: true });
        setSelectedUsers((prev) => {
            const newSet = new Set([...prev, friend]);
            return [...newSet];
        });
        setIsReplaceIdClicked(true);
        setCurrentPage(1);
        window.scrollTo(0, 0);
    }


    useEffect(() => {
        if (dataFetchedRef.current && currentPage === 1 && !isReplaceIdClicked) return;
        dataFetchedRef.current = true;
        loadUsers();
        setIsReplaceIdClicked(false);
    }, [currentPage, id, isReplaceIdClicked]);


    return (
        <div>
            {selectedUsers && selectedUsers.map((user, index) => {
                return <span className={styles.selectedUser} onClick={() => handleReplaceId(user, user.id)} key={index}>{user?.prefix} {user?.name} {user?.lastName}</span>
            })}
            <h2 className={styles.friendsTitle}>Friends:</h2>
            <div className={styles.usersList}>
                {friends && friends.map((friend, index) => {
                    return (
                        <div onClick={() => handleReplaceId(friend, friend.id)} className={styles.cardWrapper} key={friend.id}>
                            <Card
                                key={friend.id}
                                id={friend.id}
                                name={friend.name}
                                lastName={friend.lastName}
                                prefix={friend.prefix}
                                title={friend.title}
                                img={friend.imageUrl}
                                isLast={index === friends.length - 1}
                                nextPage={() => setCurrentPage(currentPage + 1)}
                            />
                        </div>
                    )
                })}
                {isLoading && <p>Loading...</p>}
            </div>

        </div>
    )
}

export default FriendsList;
