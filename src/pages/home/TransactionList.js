import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useFirestore } from '../../hooks/useFirestore'


const TransactionList = ({transactions}) => {
  const [total, setTotal] = useState(0)
  const {deleteDocument, response} = useFirestore('transactions')
  
  useEffect( () => {
    if(transactions.length){
      let totalNum = transactions.map( data => data.amount )
      setTotal( totalNum.reduce((acc, item) => Number(acc) + Number(item)) )
    }
  }, [transactions])
  
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={()=>deleteDocument(transaction.id)}>X</button>
        </li>
      ))}
      {total > 0 && (
        <li>
          <p className={styles.name}>Total</p>
          <p className={styles.amount}>${total}</p>
        </li>
      )
      }
    </ul>
  )
}


export default TransactionList