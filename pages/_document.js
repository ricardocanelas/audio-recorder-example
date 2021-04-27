import Document, { Html, Head, Main, NextScript } from "next/document";
import "../components/AudioRecordPolyFill";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <AudioRecordPolyFill />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
