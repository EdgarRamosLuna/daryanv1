
import Layout from "@/components/admin/Layout";
import Users from "@/components/admin/Users";
import TableActions from "@/components/admin/TableActions";
import { TaskContext } from "@/context/TaskContext";

import { useContext, useState } from "react";
import Clients from "@/components/admin/Clients";

export default function ClientsDashboard({ data }) {
  const { first, setFirst } = useContext(TaskContext);
  
  return (
    <>
      <Clients data={data} />
    </>
  );
}

export async function getServerSideProps() {
  
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } }
}
ClientsDashboard.getLayout = (page) => <Layout>{page}</Layout>;
