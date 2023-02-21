import { TasksProvider } from "@/context/TaskContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <TasksProvider>
      <Component {...pageProps} />
    </TasksProvider>
  );
}
