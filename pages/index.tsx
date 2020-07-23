import Link from 'next/link'
import Layout from '../components/layout'
import axios from 'axios'

const IndexPage = ({data}) => (
  <Layout>
    <div className="doc-page">
      <p>
        <strong>civdocs.us</strong> makes it easy to read the founding documents of the United States of America. This site consumes data from <a href={process.env.apiEndpoint} target="_blank"><strong>api.civdocs.us</strong></a>, an open API meant to make these documents more widely available online.
      </p>
      <p>
        If you think a document should be added to the database, please open an issue on <a href="https://github.com/jaredgorski/api.civdocs.us" target="_blank">Github</a>.
      </p>
      <ul className="index-list">
        {data.map((doc, index) => {
          const {author, title} = doc;
          const url = `/docs/${title.toLowerCase().replace(' ', '-')}`;
          return (
            <li className="flex justify-space-between truncate" key={index}>
              <Link href={url}><a>{title}</a></Link>
              <span className="margin-left-24 truncate" title={author}>
                <address className="author truncate"><i>{author}</i></address>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  </Layout>
)

export async function getStaticProps(ctx) {
  const req = await axios.get(`${process.env.apiEndpoint}/docs/`);
  const data = req.data;
  return {
    props: {
      data,
    },
  };
}

export default IndexPage
