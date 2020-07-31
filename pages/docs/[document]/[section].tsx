import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../../components/layout'
import Doc from '../../../components/doc'
import axios from 'axios'

const DocSection = props => (
  <>
    <Head>
      <title>civdocs.us - {(props.doc && props.doc.title) || ''}</title>
      <meta name="description" content={(props.doc && props.doc.subtitle) || ''}></meta>
    </Head>
    <Layout>
      <Doc {...props} />
    </Layout>
  </>
)

export async function getStaticPaths() {
  const getPaths = async () => {
    const req = await axios.get(`${process.env.apiEndpoint}/docs`);
    const docs = req.data;
    const results = [];

    for (const doc of docs) {
      const docTitle = doc.title.toLowerCase().replace(' ', '-');
      const docReq = await axios.get(`${process.env.apiEndpoint}/docs/${docTitle}?verbose=true`);
      const sections = docReq.data && docReq.data.sections;

      for (const section of sections) {
        results.push({
          params: {
            document: docTitle,
            section: section.section_index.toString(),
          },
        });
      }
    }

    return results;
  };

  const paths = await getPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const {params: {document, section}} = ctx;
  const req = await axios.get(`${process.env.apiEndpoint}/docs/${document}/${section}?verbose=true`);
  const doc = req.data;
  return {
    props: {
      doc,
      documentParam: document,
    },
  };
}

export default DocSection
