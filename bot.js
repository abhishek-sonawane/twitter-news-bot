import { TwitterApi } from 'twitter-api-v2'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
dotenv.config()

const client  = new TwitterApi({
    appKey :process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken:process.env.ACCESS_TOKEN,
    accessSecret:process.env.ACCESS_SECRET,
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET
    })

const  rwTwitter = client.readWrite

// get news from r/news subbreddit reddit api
const getNews = async ()=>{
    const response = await fetch('https://www.reddit.com/r/news.json');
    const data = await response.json();
     const random = Math.floor(Math.random()*data.data.children.length)
     return (`${data.data.children[random].data.title} \n \n ${data.data.children[random].data.url_overridden_by_dest&&data.data.children[random].data.url_overridden_by_dest}`)
    
}


const tweet = async()=>{
    try {
        console.log(await rwTwitter.v2.tweet(await getNews()))
    } catch (error) {
        console.log(error)
    }
}

tweet()