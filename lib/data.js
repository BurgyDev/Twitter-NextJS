import Tweet from 'components/Tweet'
import { getTweet } from 'lib/data.js'
import prisma from 'lib/prisma'

export default function SingleTweet({ tweet }) {
  return <Tweet tweet={tweet} />
}

export async function getServerSideProps({ params }) {
	let tweet = await getTweet(params.id, prisma)
  tweet = JSON.parse(JSON.stringify(tweet))

  return {
    props: {
      tweet,
    },
  }
}



export const getTweets = async (prisma) => {
  return await prisma.tweet.findMany({
    where: {},
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  })
}

export const getUserTweets = async (name, prisma) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      author: {
        name: name,
      },
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  })

  return tweets
}


