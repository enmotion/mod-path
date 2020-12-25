"use strict";
var url = require('url');
const R = require("ramda");

function easyCodeURL(){
    //是否启用安全编码全局变量
    let encode_ = true;
    let toolObj = {};
    //对地址进行编码，(编码地址，编码数据，动态配置) 动态配置如果不设置则采用全局配置    
    function encodeURL(baseURL,data,config){        
        let encode = !R.isNil(config) && !R.isNil(config.encode) && config.encode.constructor == Boolean ? config.encode:encode_;
        let urlObj = url.parse(baseURL);
        let appendData = encodeData(data);//调用封装data方法
        let URL = url.format(R.merge(urlObj,R.merge(config && config.constructor == Object ?config:{},{search:"?"+appendData})));//拼装成传参地址
        if(encode){
            return encodeURIComponent(URL);
        }else{
            return URL
        }
    }
    //对地址进行解码，(需解码的地址，动态配置) 动态配置如果不设置则采用全局配置
    function decodeURL(locationURL,config){
        let encode = !R.isNil(config) && !R.isNil(config.encode) && config.encode.constructor == Boolean ? config.encode:encode_;
        if(encode){
            locationURL = decodeURIComponent(locationURL);
        }
        return url.parse(locationURL,true)
    }
    function validURL(vstr,rstr){
        let vparse = url.parse(vstr) ; let rparse = url.parse(rstr) ;
        let needEqualValue = ['auth','host','protocol'];
        for(let i in needEqualValue){
            if(rparse[needEqualValue[i]] && rparse[needEqualValue[i]] != vparse[needEqualValue[i]]){
                return false
            }
        }
        let vpath = vparse.pathname.split('/');
        let rpath = rparse.pathname.split('/');
        for(let p in rpath){
            if(!R.isEmpty(rpath[p]) && rpath[p]!="*" && rpath[p] != vpath[p]){
                return false
            }
        }
        console.log(vparse,rparse,vpath,rpath)
        return true
    }
    //对数据进行字符串编码处理，该方法不会对字符串进行任何安全编码操作，数据对象，键值对连接符
    function encodeData(data){
        if( R.isNil(data) || data.constructor != Object){
            console.error("MOD-PATH:ERROR! encodeData data params is missing or not typeof Object")
            return;
        }
        var paramsKeys = R.keys(data);
        let appendData=[];
        paramsKeys.forEach(item=>{
            var value = data[item].constructor == String ? data[item] : JSON.stringify(data[item]);
            appendData.push(item+"="+value)
        })
        appendData = appendData.join("&");
        return appendData;
    }
    //对数据进行字符串编码处理，该方法不会对字符串进行任何安全编码操作，数据对象，键值对连接符
    function decodeData(paramsStr){
        let params = paramsStr;      
        let paramsData = {};
        if(!R.isNil(params) && paramsStr.constructor == String){
            params = params.split("&");
            params.forEach(item=>{
                let info = item.split("=");
                let value = parseValue(info[1]);
                if(!R.isNil(value)){paramsData[info[0]] = value}                
            });
        }else{
            console.error("MOD-PATH:ERROR! decodeData dataStr params is missing or not typeof String")
        }
        return paramsData
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
    Object.defineProperties(toolObj,{
        encode:{
            enumerable:false,
            configurable:false,
            set:function(value) {
                encode_ = value.constructor == Boolean ? value:encode_
            },
            get:function() {return encode_},
        },
        encodeURL:{writable:false,configurable:false,enumerable:false,value:encodeURL},
        decodeURL:{writable:false,configurable:false,enumerable:false,value:decodeURL},
        validURL:{writable:false,configurable:false,enumerable:false,value:validURL},
        encodeData:{writable:false,configurable:false,enumerable:false,value:encodeData},
        decodeData:{writable:false,configurable:false,enumerable:false,value:decodeData},        
    })
    Object.preventExtensions(toolObj);
    return toolObj
}
export default easyCodeURL();