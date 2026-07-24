import styles from './alertconfirm.module.css';

export default function ConfirmAlert({ message, onConfirm, onCancel }) {
  if (!message) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.confirmBox}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.confirmBtn}>Sim</button>
          <button onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
