import React, { ReactNode } from 'react'
import Link from 'next/link'

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <main>
    <header>
      <Link href="/" as="/">
        <a className="color-inherit text-decoration-none">
          <h1>civdocs.us</h1>
        </a>
      </Link>
      <hr className="hr-thick" />
    </header>
    {children}
    <footer>
      <a href="https://jaredgorski.org" target="_blank" rel="noreferrer">Jared Gorski</a>
      &nbsp;/&nbsp;
      <span>{new Date().getFullYear()}</span>
    </footer>
  </main>
)

export default Layout
