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

export async function getStaticProps() {
  
  const res = await fetch(
    "http://phpstack-921351-3198370.cloudwaysapps.com/server/api/get_sales"
  );

  const data = await res.json();
//  console.log(data.pizza);
  return {
    props: {
      data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
Admin.getLayout = (page) => <Layout>{page}</Layout>;
