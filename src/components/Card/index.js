import React, { useEffect, useRef } from 'react'
import styles from './Card.module.css';

function Card({
    id,
    name,
    lastName,
    prefix,
    title,
    img,
    isLast,
    nextPage
}) {

    const observerRef = useRef(false);



    useEffect(() => {
        const options = {
            threshold: 1.0,
        };
        if (!observerRef?.current) return;

        setTimeout(() => {
            const observer = new IntersectionObserver(([entry]) => {
                if (
                    isLast &&
                    entry &&
                    entry.isIntersecting &&
                    entry.intersectionRatio >= options.threshold
                ) {
                    nextPage();
                    observer.unobserve(entry.target);
                }
            }, options);
            observer.observe(observerRef?.current);
        }, 500)
    }, [isLast]);

    return (
        <div className={styles.card} ref={observerRef}>
            <img src={`${img}?${id}`} alt="userimage" className={styles.userImage} />
            <div className={styles.userInfo}>
                <div className={styles.userIdentity}>
                    <span>{prefix}</span>
                    <span>{name}</span>
                    <span>{lastName}</span>
                </div>
                <div>
                    <p>{title}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
