import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>Header Client El Bicho

        <Link href="/app/client/">
                Inicio
        </Link>
        <Link href="/app/client/reports">
                Reportes
        </Link>
    </div>
  )
}

export default Header