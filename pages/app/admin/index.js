import Layout from "@/components/admin/Layout";
import Reports from "@/components/admin/Reports";
import TableActions from "@/components/admin/TableActions";
import { TaskContext } from "@/context/TaskContext";
import { useContext, useState } from "react";

export default function Admin({ data }) {
  const { first, setFirst } = useContext(TaskContext);
  
  return (
    <>
      <Reports data={data} />
    </>
  );
}

export async function getServerSideProps() {
  
  const res = await fetch(
    "http://phpstack-921351-3198370.cloudwaysapps.com/server/api/get_sales"
  );

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } }
}
Admin.getLayout = (page) => <Layout>{page}</Layout>;
