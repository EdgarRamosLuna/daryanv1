import Layout from '@/components/admin/Layout';
import React from 'react'

const Employees = () => {
  return (
    <div>Employees</div>
  )
}

export default Employees
Employees.getLayout = (page) => <Layout>{page}</Layout>;