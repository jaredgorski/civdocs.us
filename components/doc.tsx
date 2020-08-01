import React, { ReactNode } from 'react'
import Link from 'next/link'

const Content = (content = []) => content.map((paragraph, index) => <p key={index}>{paragraph}</p>)

const DocBody = ({doc: {author, date, title, content, subtitle, prev_section_hyphen_case_title, next_section_hyphen_case_title}, documentParam}) => (
  <>
    <nav className="doc__nav">
      <ul className="list-inline text-align-right margin-0">
        {prev_section_hyphen_case_title ? <li><Link href="/[document]/[section]" as={`/${documentParam}/${prev_section_hyphen_case_title}`}><a className="color-link">prev</a></Link></li> : null}
        <li><Link href="/[document]" as={`/${documentParam}`}><a className="color-link">index</a></Link></li>
        {next_section_hyphen_case_title ? <li><Link href="/[document]/[section]" as={`/${documentParam}/${next_section_hyphen_case_title}`}><a className="color-link">next</a></Link></li> : null}
      </ul>
    </nav>
    <div className="doc__metadata">
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <address className="author"><i>{author}</i></address>
      {date
        ? <p><time dateTime={new Date(date).toLocaleString()}>{date}</time></p>
        : null
      }
    </div>
    <hr />
    <article className="doc__content">
      {Content(content)}
    </article>
    <nav className="doc__nav doc__nav-bottom">
      <ul className="list-inline text-align-right margin-0">
        {prev_section_hyphen_case_title ? <li><Link href="/[document]/[section]" as={`/${documentParam}/${prev_section_hyphen_case_title}`}><a className="color-link">prev</a></Link></li> : null}
        <li><Link href="/[document]" as={`/${documentParam}`}><a className="color-link">index</a></Link></li>
        {next_section_hyphen_case_title ? <li><Link href="/[document]/[section]" as={`/${documentParam}/${next_section_hyphen_case_title}`}><a className="color-link">next</a></Link></li> : null}
      </ul>
    </nav>
  </>
);

const Doc = ({doc, documentParam}) => {
  if (doc.content && doc.content.length) {
    return (
      <div className="doc">
        {DocBody({doc, documentParam})}
      </div>
    );
  } else {
    return (
      <p>Requested document section does not exist.</p>
    );
  }
}

export default Doc
