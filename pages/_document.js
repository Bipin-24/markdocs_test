import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;500&display=swap"
            rel="stylesheet"
          />
          {/* MiniChat Chatbot CSS */}
          <link rel="stylesheet" href="/minichat.css" />
          {/* Marked.js for markdown parsing in chatbot */}
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* MiniChat Chatbot JavaScript */}
          <script src="/MiniChatJavaScript.js"></script>
        </body>
      </Html>
    );
  }
}
