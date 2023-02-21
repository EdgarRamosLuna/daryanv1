import style from './styles.module.css';

import Link from 'next/link';

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}
export default function SubHeader() {
//    const pathname = useLocation().pathname;
  
    //console.log(pathname);
    const path = '';
 //   const name = path.replace('user', '');
    //console.log(path.replace('user', ''));

  return (
    <div className={style.subHeader}>
        {path === 'userreports' && <Link href="/user/reports/create">Nuevo Reporte</Link>}
        {path === 'userreportscreate' && <button >Enviar Reporte</button>}
        
    </div>
  )
}

