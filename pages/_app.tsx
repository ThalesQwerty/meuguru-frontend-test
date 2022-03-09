import '../styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
