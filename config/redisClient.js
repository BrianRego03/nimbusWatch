const redis=require("redis");
const client= redis.createClient({url: process.env.REDIS_URL || 'redis://redis:6379/0'});

client.on('error',(err)=>console.error('Redis error:',err));
client.connect();

module.exports=client;