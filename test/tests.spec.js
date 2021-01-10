import { encode } from "querystring";
import ModPath from "../src"
var assert = require ('assert');

describe('mod-path 测试',function(){    
    describe("设置测试 encode",function(){
        it("测试 encode 默认值",function(){         
            assert.equal(ModPath.encode,true)
        }) 
        it("测试 encode 是否可以修改为false",function(){
            ModPath.encode=false;
            assert.equal(ModPath.encode,false)
        })
        it("测试 encode 只能只能在Boolean值之间切换",function(){
            ModPath.encode="jh"    
            assert.equal(ModPath.encode,false)
        })
        it("测试 encode 默认值是否可以修改回来",function(){
            ModPath.encode=true;     
            assert.equal(ModPath.encode,true)
        })     
    })
    describe("数据编码测试 encodeData",function(){
        it("encodeData 对象编码测试 成功返回正确字符串",function(){
            var encodeData =  ModPath.encodeData({name:'mod',age:18,ismale:false,hoppy:["is",123]});
            assert.equal(encodeData,'name=mod&age=18&ismale=false&hoppy=["is",123]')
        }) 
        it("encodeData 字符编码测试 返回 undefined",function(){
            var encodeData = ModPath.encodeData("hadhaae");
            assert.equal(encodeData,undefined)
        })
        it("encodeData 数组编码测试 返回 undefined",function(){
            var encodeData = ModPath.encodeData(["hadhaae"]);
            assert.equal(encodeData,undefined)
        })
        it("encodeData 布尔编码测试 返回 undefined",function(){
            var encodeData = ModPath.encodeData(false);
            assert.equal(encodeData,undefined)
        })
        it("encodeData 数值编码测试 返回 undefined",function(){
            var encodeData = ModPath.encodeData(12);
            assert.equal(encodeData,undefined)
        })  
    })
    describe("数据解码测试 decodeData",function(){
        it("字符数据解码测试，返回正确对象",function(){
            var decodeData =  ModPath.decodeData('name=mod&age=18&ismale=false&hoppy=["is",123]');
            assert.deepEqual(decodeData,{name:'mod',age:18,ismale:false,hoppy:["is",123]})
        })
        it("非格式正确字符解码测试，返回 {}",function(){
            var decodeData =  ModPath.decodeData("");
            assert.deepEqual(decodeData,{})
        })
        it("非字符解码测试，返回 {}",function(){
            var decodeData =  ModPath.decodeData([1,3,3]);
            assert.deepEqual(decodeData,{})
        })
    })
    describe("地址数据编码测试 encodeURL",function(){
        it("测试正常编码地址,非安全编码",function(){
            var encodeURL =  ModPath.encodeURL('http://user:pass@host.com:8080/p/a/t/h',{name:'mod'},{encode:false});
            assert.deepEqual(encodeURL,"http://user:pass@host.com:8080/p/a/t/h?name=mod")
        })
        it("测试正常编码地址,带安全编码",function(){
            var encodeURL =  ModPath.encodeURL('http://user:pass@host.com:8080/p/a/t/h',{name:'哈哈'});
            console.log(encodeURL)
            assert.deepEqual(encodeURL,"http://user:pass@host.com:8080/p/a/t/h?name=%E5%93%88%E5%93%88")
        })
        it("测试正常编码地址,非安全编码，修改配置auth属性,hash属性",function(){
            var encodeURL =  ModPath.encodeURL('http://user:pass@host.com:8080/p/a/t/h',{name:'mod'},{encode:false,auth:"admin:enmotion",hash:"hashTest"});
            assert.deepEqual(encodeURL,"http://admin:enmotion@host.com:8080/p/a/t/h?name=mod#hashTest")
        })
    })
    describe("地址数据解码测试 decodeURL",function(){
        it("测试正常解码地址,非安全编码",function(){
            var decodeURL =  ModPath.decodeURL('http://user:pass@host.com:8080/p/a/t/h?name=mod',{encode:false});
            console.log(decodeURL)
            assert.deepEqual(decodeURL.query,{name:'mod'})
        })
        it("测试正常解码地址,带安全编码",function(){
            var decodeURL =  ModPath.decodeURL('http://user:pass@host.com:8080/p/a/t/h?name=%E5%93%88%E5%93%88');
            console.log(decodeURL,123)
            assert.deepEqual(decodeURL.query,{name:'哈哈'})
        })        
    })
    describe("地址校验检测 validURL",function(){
        it("地址校验比对测试,地址完全相同,返回 true",function(){
            var isValidURL =  ModPath.validURL('http://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=mod");
            assert.deepEqual(isValidURL,true)
        })
        it("地址校验比对测试,仅参数不同,返回 true",function(){
            var isValidURL =  ModPath.validURL('http://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=ssse");
            assert.deepEqual(isValidURL,true)
        })
        it("地址校验比对测试,protocal不同,返回 false",function(){
            var isValidURL =  ModPath.validURL('https://user:pass@host.com:8080/p/a/t/h?name=mod',"http://user:pass@host.com:8080/p/a/t/h?name=mod");
            assert.deepEqual(isValidURL,false)
        })
        it("地址校验比对测试,auth 不同,返回 false",function(){
            var isValidURL =  ModPath.validURL('http://user:pass1@host.com:8080/p/a/t/h?name=mod',"http://user:pass2@host.com:8080/p/a/t/h?name=mod");
            assert.deepEqual(isValidURL,false)
        })        
        it("地址校验比对测试,auth 规则地址中未做校验但是验证地址中携带,返回 true",function(){
            var isValidURL =  ModPath.validURL('http://user:pass1@host.com:8080/p/a/t/h?name=mod',"http://host.com:8080/p/a/t/h?name=mod");
            assert.deepEqual(isValidURL,true)
        })
        it("地址校验比对测试,path 规则地址为*,返回 true",function(){
            var isValidURL =  ModPath.validURL('http://user:pass1@host.com:8080/p/a/t/h?name=mod',"http://host.com:8080/*");
            assert.deepEqual(isValidURL,true)
        })
        it("地址校验比对测试,path 规则地址为/c/*/a 测试地址为 /c/p/a/t/h ,返回 true",function(){
            var isValidURL =  ModPath.validURL('http://user:pass1@host.com:8080/c/p/a/t/h?name=mod',"http://host.com:8080/c/*/a");
            assert.deepEqual(isValidURL,true)
        })
        it("地址校验比对测试,path 规则地址为/*/a 测试地址为 /p/b/t/h,返回 false",function(){
            var isValidURL =  ModPath.validURL('http://user:pass1@host.com:8080/p/b/t/h?name=mod',"http://host.com:8080/*/a");
            assert.deepEqual(isValidURL,false)
        }) 
    })
})