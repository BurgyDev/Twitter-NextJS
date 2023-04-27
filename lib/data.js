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

export const getTweet = async (id, prisma) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  })

  return tweet
}

export const getTweets = async (prisma, take) => {
  const tweets = await prisma.tweet.findMany({
    where: {},
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
    take,
  })
  return tweets
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

