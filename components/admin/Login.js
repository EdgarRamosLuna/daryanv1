import { font } from "@/components/font";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from "../../styles/login.module.css";

export default function LoginAdmin() {
  const [user, setUser] = useState(" ");
  const [password, setPassword] = useState("");
  const cleanField = (e) => {
    setUser("");
    e.target.value = "";
  };

  const handleClick = (e) => {
    // console.log('Se ha clickeao');
    localStorage.setItem("sesType", "admin");
    //router.push('/user/reports');
    window.location.replace("/app/admin/");
    //useRouter
  };
  const [sesion, setSession] = useState(null);

  useEffect(() => {
    setSession(localStorage.getItem("sesType"));
    if (localStorage.getItem("sesType") === "admin") {
      window.location.replace("/app/admin/reports");
    }
  }, []);
  return (
    <main className={font.variable}>
      <div className={style.login}>
        <div className={style.login_cont}>
          <div className={style.login_form}>
            <div className={style.logo}>
              <Image
                src="/assets/img/logo.png"
                alt="Daryan"
                width={100}
                height={50}
              />
            </div>
            <div className={style.input_container}>
              <label htmlFor="user">Usuario:</label>
              <input
                type="text"
                id="user"
                name=""
                value={user}
                onChange={(e) => setUser(e.target.value.replace(" ", ""))}
              />
            </div>
            <div className={style.input_container}>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={style.forget_container}>
                <div className="">
                    <span>
                      Olvidtaste tu contraseña?
                    </span>
                </div>
            </div>
            <div className={style.button_container}>
              <button onClick={(e) => handleClick(e)}>Entrar</button>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
