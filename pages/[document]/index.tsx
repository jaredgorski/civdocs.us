import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import Doc from '../../components/doc'
import axios from 'axios'

const DocSectionIndex = (urlPrefix, sections) => {
  return (
    <ul className="index-list">
      {sections.map((section, index) => {
        const {section_index, subtitle, title} = section;
        const url = `${urlPrefix}/${section_index}`;

        return (
          <li className="truncate" key={index}>
            <Link href={url}><a>{title}</a></Link>
            <span className="truncate margin-left-24" title={subtitle}>{subtitle}</span>
          </li>
        );
      })}
    </ul>
  );
}

const DocPage = ({data, documentParam}) => (
  <>
    <Head>
      <title>civdocs.us - {data.title}</title>
      <meta name="description" content={data.description}></meta>
    </Head>
    <Layout>
      <div className="doc-page">
        <nav className="doc-page__nav">
          <ul className="list-inline text-align-right margin-0">
            <li><Link href="/"><a className="color-link">index</a></Link></li>
          </ul>
        </nav>
        <h1>{data.title}</h1>
        <address className="author"><i>{data.author}</i></address>
        <p>{data.description}</p>
        {DocSectionIndex(`/${documentParam}`, data.sections)}
      </div>
    </Layout>
  </>
)

export async function getStaticPaths() {
  const req = await axios.get(`${process.env.apiEndpoint}/docs`);
  const paths = req.data && req.data.length && req.data.map(doc => {
    return {
      params: {
        document: doc.title.toLowerCase().replace(' ', '-'),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const {params: {document}} = ctx;
  const req = await axios.get(`${process.env.apiEndpoint}/docs/${document}?verbose=true`);
  const data = req.data;
  delete data.content;
  return {
    props: {
      data,
      documentParam: document,
    },
  };
}

export default DocPage
