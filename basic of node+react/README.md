# Node + React 기초  
## 강의 출처  
[따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8#)  

## 강의 내용 메모  

### Node 와 Express  
* Node.js : js를 server side에서 쓸 수 있게 함  
* Express.js : node.js를 좀 더 쉽게 사용할 수 있게 해주는 프레임워크  
* 더 자세한 내용은 [이전 node 레포 참고](https://github.com/rrabit42/Node.js_practice/tree/master/Node.js)  

### model과 schema  
* **model** : schema를 감싸주는 역할, provides an interface to the database for creating, querying, updating, deleting records, etc.  
* **schema** : structure of the document, default values, validators, etc...  

### body-parser dependency  
클라이언트에서 보내주는 데이터를 받기 위해서 서버에 필요한 모듈이다.  
body 데이터를 분석(parse)해서 req.body로 출력해준다.  
```npm install body-parser --save```  

### 에러 해결 방법  
* mongoose.connect()시 아래와 같은 에러가 발생했다.  
```MongoParseError: URI does not have hostname, domain name and tld```  
이 오류는 비밀번호에 특수문자가 들어가서 발생하는 오류이므로, 해당 특수문자를 인코딩변환해서 넣어주면 된다!! ex) # -> %23  

### Callback 함수  
Node.js는 비동기 Non-blocking I/O가 기본 설계 원칙(Design Principle)로 제작된 javascript run time  
콜백함수는 특정 함수에 매개변수로 전달된 함수를 의미한다. 그리고 그 콜백함수를 인자로 전달 받은 함수 안에서 호출된다.  

```
const testCallback = function (callback) {
  console.log("inside of testCallback func");
  callback()
};
 
testCallback(function(){console.log("this is callback")});
cs
```
testCallback 함수를 정의 할 때 함수의 인자로 callback 이라는 매개변수를 정의했다.  
이 callback 은 함수로, testCallback 이 실행되면 함수안에서 다시 실행된다.(3번째 줄에서 실행)  
그리고 6번째 줄에서 testCallback 함수를 실행할 때 그 인자로 익명함수를 주면,    
해당 함수는 testCallback 안에서 실행되어 "this is callback" 이라는 문자를 콘솔에 출력한다.  

* Call back 함수를 사용하는 이유  
만약 콜백인 함수에서 콜백을 사용하지 않게 되면, 콜백 함수의 과정이 끝나기 전에 다음 프로세스를 진행하게 되는 경우가 있다. 예를 들어 db에 값을 읽어들일 때 값을 읽기 전에 출력을 해버려 undefined가 뜬다.  
즉, 콜백함수를 사용하기 이전의 코드는 데이터가 준비되지 않은 상태에서 함수가 끝나기 때문에 원하는 대로 동작하지 못하지만, 콜백함수를 사용하면 필요한 데이터가 다 준비된 시점에서만 원하는 동작을 수행하도록 할 수 있다.  
> 객체에게 일을 시키면, 그 일이 끝나는 것을 기다리는게 아니라 그 객체가 다시 나를 부를 때 까지 다른 일을 하고 있는 것  
따라서 Non-Block이며, 비동기(Asynchronous) 방식의 함수로 사용된다.  

간단히 정리하자면, 비동기적 처리를 통해 코드의 실행을 멈추지 않고 계속 실행하게 하며, 비동기적 처리를 통해 어떤 동작을 수행할 때, 콜백함수는 동작에 필요한 준비물이 준비된 상태에서만 동작을 수행하도록 할 수 있는 함수이며, 이를 통해 비동기 함수의 결과를 반환한다.  

### model method  
* .statics  
```this```가 모델 자체를 가리킴  
```
bookSchema.statics.findByTitle = function(title) {
  return this.findOne({title}).exec();
}

// 사용예제:
Book.findByTitle('React Tutorials');
```  

* .methods  
```this```가 데이터 인스턴스를 가리킴  
```
bookSchema.methods.printTitle = function() {
    console.log(this.title);
}

// 사용예제:
book = await Book.findById(id).exec();
book.printTitle(); 
// React Tutorials
```  

메소드를 만들 땐, 스키마를 모델화 하기 전에, ```.statics``` 혹은 ```.methods```를 사용하여 정의를 해주어야 한다!  

### Auth 과정  
서버와 클라이언트가 토큰이 맞는지 서로 계속 체크한다.  
클라이언트는 토큰을 쿠키, 세션 등에 저장하고, 서버는 DB에 저장한다.  
1. Cookie에 저장된 Token을 Server에서 가져와서 복호화 한다.  
2. 복호화를 하면 User ID가 나오는데 그 User ID를 이용해서 데이터베이스 User Colleciton에서 유저를 찾은 후 쿠키에서 받아온 token을 유저도 가지고 있는지 확인한다.  
* 쿠키가 일치하지 않으면 Authentication False  
* 쿠키가 일치하면 Authentication True. 그리고 해당하는 유저의 정보들을 리턴해준다.  

### ES module  
[출처](https://medium.com/@enro2414_40667/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-export-import%EC%A0%95%EB%A6%AC-137ac9e327d9)

**export(내보내기)**  
- export에는 named와 default가 있습니다.
- 두 가지 방식으로 모듈을 export할 수 있습니다.
- export 하는 모듈은 “use strict” 입니다.

1. export — named  
모듈을 특정 이름으로 export합니다.  
```
// 먼저 선언한 함수 내보내기
export { myFunction };

// 상수 내보내기
export const foo = Math.sqrt(2);
```  

2. export — default  
모듈을 이름없이 export합니다.  
```
// 기본 내보내기
export default function() {}

// 기본 클래스 내보내기
export default class {}
```  

**차이점**  
- 하나의 모듈(파일)에서는 하나의 default export만 가능합니다.  
- named export는 동일한 이름으로 가져올수 있고, 이름을 바꾸려면 as를 사용해야합니다.  
```
//a 모듈을 b이름으로 사용합니다.
import {a as b} from "module.js";
```  
- {} 구문으로는 default export를 사용할 수 없습니다.  

**import(가져오기)**  
[출처](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import)  
```
// name 파라미터는 export 되는 멤버를 받을 오브젝트의 이름입니다.
// member 파라미터는 각각의 멤버를 지정하지만, name 파라미터는 모두를 가져옵니다.
// 모듈에서 name 은 멤버 대신 하나의 default 파라미터를 통해 export 하는 경우에도 동작할 수 있습니다. 

import name from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as alias from "module-name";
import defaultMember from "module-name";
import "module-name";
```
*import defaultMember, * as alias from “module-name”;*  
- alias는 네임스페이스로 사용됩니다. defaultMember는 export default된 모듈로 바인딩됩니다.
- alias에서 “module-name”에서 구현된 모듈들을 접근할 수 있습니다.
*import “module-name”*  
- 바인딩하지 않고, 모듈의 전체의 사이드 이펙트만 가져옵니다.  
- 사이드 이펙트: 단순하게 해석하면 부작용 정도인데, 헷갈리는 부분이 있어 아래 링크를 첨부합니다. [LINK](https://stackoverflow.com/questions/41127479/es6-import-for-side-effects-meaning)  
- 아무것도 export하지 않고, import만 해야할 경우(이런 경우가 언제일까???)  

**우리 프로젝트에서**  
import 시 {} 이 안으로 넣는 것은 그 안에 있는 함수나 변수들이 default로 가져오는게 아니어서 그렇다!  
ex.
```
const { User } = require("../models/User") 
```  
만약 auth라는 함수가 default로 export된 값이라면 {} 없이 아래와 같이 쓸 수 있다.  
```
const auth = require("../middleware/auth")
```

## 그 외 자잘한 정보들  
* git은 소스코드를 관리할 수 있는 'tool', github은 클라우드 'service'  
* nodemon 설치  
```npm install nodemon --save-dev``` : develop 모드 즉, 로컬에서 작업할 때만 사용하는 모듈이라는 뜻, 프로덕션 시에는 포함 X  
따라서 *nodemon*은 dependencies가 아닌 devdependencies에 들어감.  
scripts에 ```"backend": "nodemon index.js"``` 추가    
앞으로는 node run start가 아니라 node run backend로 해서 nodemon 실행!  

* var, let, const  
var은 function-scoped이고, let, const는 block-scoped이다!  
let, const를 사용하면 var를 사용할때보다 상당히 이점이 많다.  
let과 const는 var와 다르게 변수 재선언 불가능이다.  
let과 const의 차이점은 변수의 immutable여부이다.  
let은 변수에 재할당이 가능하지만, const는 변수 재선언, 재할당 모두 불가능하다.  





