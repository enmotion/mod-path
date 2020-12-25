"use strict";
var url = require('url');
const R = require("ramda");
console.log(url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string&name={mod:12}#hash'),123)
console.log(url.format(
    "erer",
    {
        href:"http://www.baidu.com",
        protocol :"https",
        hostname  :"www.baidu.com",
        query :{name:'mod'},
        hash:"der",
        port:'8080'
    }
))
function easyCodeURL(){
    // 编码全局配置，地址与参数的分割符，键值对连接符，是否安全编码
    let config_ = {break:'?',join:"&",encode:true}
    // 设置全局配置，获取全局配置
    function setConfig(config){ config_ = R.merge(config_,config)}
    function getConfig(){return config_}
    //对地址进行编码，(编码地址，编码数据，动态配置) 动态配置如果不设置则采用全局配置
    function encodeURL(baseURL,data,config){        
        let conf = R.merge(config_,config||{});              
        let appendData = encodeData(data,conf.join);//调用封装data方法
        let URL = baseURL+conf.break+appendData;
        if(conf.encode){
            return encodeURIComponent(URL);
        }else{
            return URL
        }
    }
    //对地址进行解码，(需解码的地址，动态配置) 动态配置如果不设置则采用全局配置
    function decodeURL(locationURL,config){
        let conf = R.merge(config_,config||{});
        if(conf.encode){
            locationURL = decodeURIComponent(locationURL);
        }
        let params = locationURL.split(config.break)[1];
        let paramsData={};
        try {
            paramsData = decodeData(params);      
        }catch(e){
            console.error("MOD-PATH:ERROR! URL ["+locationURL+"] params can not parse!")
        }            
        return paramsData
    }
    //对数据进行字符串编码处理，该方法不会对字符串进行任何安全编码操作，数据对象，键值对连接符
    function encodeData(data,join){
        if( R.isNil(data) || data.constructor != Object){
            console.error("MOD-PATH:ERROR! data params is missing or not typeof Object")
            return;
        }
        var join = join || config_.join
        var paramsKeys = R.keys(data);
        let appendData=[];
        paramsKeys.forEach(item=>{
            var value = data[item].constructor == String ? data[item] : JSON.stringify(data[item]);
            appendData.push(item+"="+value)
        })
        appendData = appendData.join(join);
        return appendData;
    }
    //对数据进行字符串编码处理，该方法不会对字符串进行任何安全编码操作，数据对象，键值对连接符
    function decodeData(paramsStr,join){
        var join = join || config_.join
        let params = paramsStr;        
        let paramsData = {};
        if(!R.isNil(params)){
            params = params.split(join);
            params.forEach(item=>{
                let info = item.split("=");
                let value = parseValue(info[1]);
                paramsData[info[0]] = value;
            })
            return paramsData
        }
        return{}
    }
    //数据解析为对象方法
    function parseValue(value){
        try{
            var v = JSON.parse(value);
            return v;
        }catch(e){
            return value
        }
    }
    return{
        setConfig,
        getConfig,
        encodeURL,
        decodeURL,
        encodeData,
        decodeData,
    }
}
export default easyCodeURL();