import * as React from 'react'

const Layout = ({ pageTitle, children }) => {

  return (
    <div className="px-8 bg-[#eaf4f7] min-h-screen">
        <title>{pageTitle}</title>
      <main className='p-8'>
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
            {children}
      </main>
    </div>
  )
}
export default Layout