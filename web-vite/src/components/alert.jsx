import styles from './alert.module.css';

export default function Alert({message, onClose }) {
  if (!message) return null;

  return (
    <div className={`${styles.alert}`}>
      <span>{message}</span>
      <button onClick={onClose} className={styles.closeBtn}>❌</button>
    </div>
  );
}