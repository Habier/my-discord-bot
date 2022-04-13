# Just a random discord bot
This is a Work in Progress  
Everything can change drastically from one day to another.


## Installation
Remember to **npm install**  
Inside "private" folder there are example files, delete the .example extension and fill it with your info

This project uses **better-sqlite3** for some funcionalities. You better look at this ;)
https://github.com/JoshuaWise/better-sqlite3/wiki/Troubleshooting-installation

And if it stills fails, install it with:
> LZZ_COMPAT=1 npm install better-sqlite3

## Running
I recommend running it in production with pm2 https://www.npmjs.com/package/pm2
``` SSH
#Choose one the of the following
#Option 1
node bot

#Option 2
pm2 start bot.js
```