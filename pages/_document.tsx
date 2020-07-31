import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    const title = 'civdocs.us';
    const description = 'civdocs.us makes it easy to read the founding documents of the United States of America. This site consumes data from api.civdocs.us, an open API meant to make these documents more widely available online.';

    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={description} />
          <meta name="og:title" property="og:title" content={title} />
          <meta name="og:description" property="og:description" content={description} />
          <link rel="icon" href="/assets/favicon.png"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
