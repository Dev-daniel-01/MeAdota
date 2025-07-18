import style from "./modalProfile.module.css"
export default function ModalProfile({ onClose }) {
  return (
    <>
    <div className={style.container}>
        <h1>OLA</h1>
        <button onClick={onClose}>❌</button> 
    </div>
    </>
  );
}