import ModPath from "../src/index.js";
//拼装Data
let data={
    name:"MOD",
    age:12,
    gender:"male",
    hobby:["videogame","tree",{new:"keep"}],
}
var strData = ModPath.encodeData("")
window.P = ModPath
console.log(strData);
console.log(ModPath.encodeData(data))

var URL = ModPath.encodeURL("www.baidu.com",data,{encode:true})
var URL2 = ModPath.encodeURL("www.baidu.com#wechat",data,{encode:false})

console.log(URL,"\n",URL2);
console.log(ModPath.decodeURL(URL,{encode:true}).query)
console.log(ModPath.decodeURL(URL2,{encode:false}))

console.log(ModPath.validURL('http://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=mod"));
console.log(ModPath.validURL('http://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=ssse"));
console.log(ModPath.validURL('https://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=mod"),123);