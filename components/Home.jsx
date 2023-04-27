import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import NewTweet from 'components/NewTweet'
import Tweets from 'components/Tweets'

//...

export default function Home() {
    //...
  
    return (
      <>
        <NewTweet />
        <Tweets tweets={[{ content: 'test' }, { content: 'another' }]} />
      </>
    )
  }