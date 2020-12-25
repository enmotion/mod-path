# mod-path #

为便利浏览器传参转换而设立。<br>

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
import P from "mod-path";

console.log(P.encode) // true
//全局设置
P.encode=false
//获取全局设置
console.log(P.encode) // false

//拼装Data
let data={
    name:"MOD",
    age:12,
    gender:"male",
    hobby:["videogame","tree",{new:"keep"}],
}
var strData = P.encodeData(data)
console.log(strData);
console.log(P.decodeData(strData))
var URL = P.encodeURL("www.baidu.com",data,{encode:true})
var URL2 = P.encodeURL("www.baidu.com",data,{encode:false})
console.log(URL,URL2);
console.log(P.decodeURL(URL,{encode:true}))
var sss = P.decodeURL(URL,{encode:true});
console.log(sss);

//通过以上输出测试，可看到具体的使用方式与结果

```

### API ###
#### setConfig(config)<br> ####
设置全局配置参数
config:{
    break:String,// 地址与参数分割符号，默认为"?";
    join:String,// 参数拼接符 默认"&"
    encode:Boolean,//是否将拼接后的地址进行 encodeURIComponent 编码 ，默认true
}
#### getConfig()<br> ####
获取全局配置参数 return config

#### encodeURL(baseURL,data,config)<br> #### 
将地址拼接参数
baseURL:String,//需要拼接参数的地址
data:JSON Object,//参数JSON格式
config:Object,//同全局配置属性，可每次调用该方法时，灵活设置，如空则默认全局配置。

```
P.encodeURL('www.baiduc.com',{name:"foo",age:"22"},{break:"?",join:"!",encode:false});
```

#### decodeURL(locationURL,config)<br> #### 
可将携参地址的参数解析成对象
locationURL:String,//携参地址
config:Object,//同全局配置属性，可每次调用该方法时，灵活设置，如空则默认全局配置方式进行解析。

```
P.decodeURL('www.baiduc.com',{break:"?",join:"!",encode:false});
```