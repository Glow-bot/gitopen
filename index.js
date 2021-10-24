const fu=new RegExp("https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+");
const {get} = require("axios").default
async function o(c){
	if(!fu.exec(c))return null;
	const l=new URL(fu.exec(c)[0]);
	if(l.origin!=="https://github.com")return null;
	return get("https://raw.githubusercontent.com"+l.pathname.split("/blob").join(""))
		.then(a=>{
			const h=l.hash.split("-#L").join("#L").split("#L").filter(s=>s);
			if(!h[0])return a.data;
			if(h.length>2||isNaN(h[0])||(h[1]&&isNaN(h[1])))return null;
			if(!h[0])return a.data;
			if(h[0]&&!h[1])return a.data.split("\n")[Number(h[0]-1)];
			return a.data.split("\n").slice(Number(h[0]-1),Number(h[1])).join("\n")
		})
		.catch(e=>{
			return null
		})
};
require("express")()
	.use("/",(q,v)=>{
		o(decodeURIComponent(q.query.q))
			.then(a=>v.json(a))}
	)
	.listen(8080)