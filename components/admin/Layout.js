import Header from "./Header";
import style from "./styles.module.css";
import SubHeader from "./SubHeader";
export default function Layout({ children }) {
    return (
      <>
        <Header />
        <div className={style.childrenContainer}>
        <SubHeader />
        <div className={style.children}>
          {children}
          
        </div>
      </div>
      </>
    )
  }