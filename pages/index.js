import Image from "next/image";
import { MainComponent } from "@/styles/StyledComponent";
import { font } from "../components/font";

export default function Page() {
  return (
    <>
    <MainComponent>

      <div className="under-c">
        <center>
          <img src="/assets/img/gear.svg" alt="En construccion" />
          <h1 className={font.className}>Sitio en Construccion</h1>
        </center>
      </div>
    </MainComponent>
    </>
  );
}
