import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
        <script
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDYZGMCmjQygcBOSbWpcZy07UkRDTDkSOk&libraries=places`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
