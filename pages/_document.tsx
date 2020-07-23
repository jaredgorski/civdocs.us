import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    const description = '';
    const ogTitle = 'civdocs.us';

    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={description} />
          <meta name="og:title" property="og:title" content={ogTitle} />
          <meta name="og:description" property="og:description" content={description} />
          <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap" rel="stylesheet"></link>
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
