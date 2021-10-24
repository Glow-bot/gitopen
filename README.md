# gitopen
githubのリンクをかんたんに展開できます  
[試験版](https://ghopen.glow-bot.com/?q=https://github.com/Glow-bot/gitopen/blob/main/README.md)  
使用方法(nodejs,axiosの例)
```js
const link = "https://github.com/Glow-bot/gitopen/blob/main/README.md"
axios.get(`https://ghopen.glow-bot.com/?q=${encodeURIComponent(link)}`)
  .then(a=>a.data)
```
