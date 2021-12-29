import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head title='LinkSecure.io' />
        <body className='antialiased text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900'>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument