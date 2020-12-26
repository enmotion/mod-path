# mod-path #

url地址操作工具。<br>

#### 功能说明：
1.可将JSON对象,作为参数拼接进地址,支持安全编码</br>
2.地址检查,比对地址的合法性</br>

#### install ####
npm安装命令
```
npm install --save mod-path
```

#### Usage ####

引入包
```
import P from "mod-path"
```

范例

```
import ModPath from "../src/index.js";
//拼装Data
let data={
    name:"MOD",
    age:12,
    gender:"male",
    hobby:["videogame","tree",{new:"keep"}],
}
var strData = ModPath.encodeData("")

console.log(strData);
console.log(ModPath.encodeData(data))

var URL = ModPath.encodeURL("www.baidu.com",data,{encode:true})
var URL2 = ModPath.encodeURL("www.baidu.com#wechat",data,{encode:false})

console.log(URL,"\n",URL2);
console.log(ModPath.decodeURL(URL,{encode:true}).query)
console.log(ModPath.decodeURL(URL2,{encode:false}))

console.log(ModPath.validURL('http://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=mod"));
console.log(ModPath.validURL('http://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=ssse"));
console.log(ModPath.validURL('https://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=mod"));

```
### PROP ###
[instance].encode 是否自动在生成地址时采用安全编码
默认 true ，启用安全编码 false 则取消安全编码
```
import ModPath from "../src/index.js";

console.log(ModPath.encode) // true
ModPath.encode = false
console.log(ModPath.encode) // false
```

### API ###

#### encodeURL(baseURL,data,config)<br> #### 
将地址拼接参数
baseURL:String,//需要拼接参数的地址
data:JSON Object,//参数JSON格式
config:Object,//同全局配置属性，可每次调用该方法时，灵活设置，如空则默认全局配置。

```
import P from "../src/index.js";

P.encodeURL('www.baiduc.com',{name:"MOD",age:12,gender:"male",hobby:["videogame","tree",{new:"keep"}]});
//www.baidu.com%3Fname%3DMOD%26age%3D12%26gender%3Dmale%26hobby%3D%5B%22videogame%22%2C%22tree%22%2C%7B%22new%22%3A%22keep%22%7D%5D

P.encodeURL('www.baiduc.com#wechat',{name:"MOD",age:12,gender:"male",hobby:["videogame","tree",{new:"keep"}]},{encode:false});
//www.baidu.com?name=MOD&age=12&gender=male&hobby=["videogame","tree",{"new":"keep"}]#wechat
```

#### decodeURL(locationURL,config)<br> #### 
可将携参地址的参数解析成对象
locationURL:String,//携参地址
config:Object,//同全局配置属性，可每次调用该方法时，灵活设置，如空则默认全局配置方式进行解析。

```
P.decodeURL('www.baidu.com%3Fname%3DMOD%26age%3D12%26gender%3Dmale%26hobby%3D%5B%22videogame%22%2C%22tree%22%2C%7B%22new%22%3A%22keep%22%7D%5D').query;
//{name:"MOD",age:12,gender:"male",hobby:["videogame","tree",{new:"keep"}]}
```

#### config
配置对象结构说明
```
{
    encode:true,//Boolean是否在本次调用时启用安全编码，如缺省 则依照全局配置
    hash:"wechat",//可添入哈希值
}
```