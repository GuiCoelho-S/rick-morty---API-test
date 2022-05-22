import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient} >
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider >
  )
}

export default MyApp
