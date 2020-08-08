# Node + React 기초  
## 강의 출처  
[따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8#)  

## 강의 내용 메모  
* [Node.js](https://github.com/rrabit42/Node.js-React_practice/blob/master/basic%20of%20node%2Breact/server/README.md)  
* [React](https://github.com/rrabit42/Node.js-React_practice/blob/master/basic%20of%20node%2Breact/client/README.md)  

## What I've learned - connect Front & Back  

### (1) AXIOS  
```npm install axios --save```  
> 우리가 서버에 request를 보낼 때 지금까지는 Client 부분이 없었기에 Postman을 이용해서 함!  
하지만 이제는 있으니까 React.js 부분에서 Request를 보내면 되는데 그 때 사용할 것이 AXIOS  
jQuery를 사용할 때 AJAX라고 보면 된다.  

AXIOS는 HTTP 클라이언트 라이브러리로써, 비동기 방식으로 HTTP 데이터 요청을 실행한다.  
AXIOS는 Promise를 기반으로 하여 async/await 문법을 사용해 직접적으로 XMLHttpRequest를 다루지 않고 **AJAX 호출**을 할 수 있다.  
> **Ajax**: Asynchronous Javascript And Xml(비동기식 자바스크립트와 xml)의 약자로 XMLHttpRequest 객체를 이용해서 데이터를 로드하는 기법이며, Javascript를 사용한 비동기 통신, 클라이언트와 서버간의 XML 데이터를 주고받는 기술이다.  

> **XMLHttpRequest**: xml은 html과 매우 비슷한 문자 기반의 마크업 언어이다. XMLHttpRequest는 웹 브라우저와 서버 사이에 메소드가 존재해서 데이터를 전송하는 객체 폼의 API이다!  

1. axios를 통해 HTTP 요청으로 데이터를 가져올 수 있다.  
2. success이면 get함수와 연결돼 then 함수로, fail 할 경우 catch() 함수로 이동한다.  
3. Axios를 통해 가져오는 결과값은 response이다. (response는 다른 명칭으로 변경 가능하다.)  
4. API구조를 알고 있으면 JSON 형식으로 불러올 수 있다.  

### (2) CORS 이슈  
> Server는 포트가 5000, Client는 포트가 3000  
> 이렇게 두개의 다른 포트를 가지고 있는 서버는 아무 설정 없이 Request를 보낼 수 없다!  
**WHY?**  
CORS 정책 때문에! Cross-Origin Resource Sharing(CORS) 보안을 위해서!  

### CORS에 대해서 알아보자!  
[출처](https://evan-moon.github.io/2020/05/21/about-cors/)  

* **CORS** : 다른 출처간의 리소스 공유  
같은 출처란? 두 URL의 구성 요소 중 Scheme, Host, Port 이 3가지만 동일하면 된다.  
ex) http://naver.com:80 에서 ```http://```라는 스킴에 ```naver.com``` 호스트를 가지고 ```80```번 포트를 사용하고 있다는 것만 같다면 나머지는 전부 다르더라도 같은 출처로 인정이 되는 것이다!  
> 만약 출처에 https://naver.com:80처럼 포트 번호가 명시되어 있다면 명백하게 다른 출처로 인정되는 부분이지만, https://naver.com:8000 출처의 경우 포트 번호가 포함되지 않았기 때문에 판단하기가 애매하다. RFC 6454의 Comparing Origins 섹션에는 “만약 출처가 스킴/호스트/포트의 삼중 체계라면…” 이라는 전제가 붙어있기 때문에 어떻게 해석하냐에 따라 구현이 달라질 수 있기 때문이다.  
> 그래서 이런 경우에는 각 브라우저들의 독자적인 출처 비교 로직을 따라가게 된다.  
>> 출처 비교 시 포트 번호를 완전 무시하는 브라우저는 Internet Explorer 밖에 없다. ~~그러니 이제 그만 관짝으로 보내주도록 하자~~  

여기서 중요한 사실 한가지는 이렇게 출처를 비교하는 로직이 서버에 구현된 스펙이 아니라 브라우저에 구현되어 있는 스펙이라는 것이다.  
> 만약 우리가 CORS 정책을 위반하는 리소스 요청을 하더라도 해당 서버가 같은 출처에서 보낸 요청만 받겠다는 로직을 가지고 있는 경우가 아니라면 서버는 정상적으로 응답을 하고, 이후 브라우저가 이 응답을 분석해서 CORS 정책 위반이라고 판단되면 그 응답을 사용하지 않고 그냥 버리는 순서인 것이다.  

즉, 서버는 CORS를 위반하더라도 정상적으로 응답을 해주고, 응답의 파기 여부는 브라우저가 결정한다.  
> 때문에 CORS는 브라우저의 구현 스펙에 포함되는 정책이기 때문에, 브라우저를 통하지 않고 서버 간 통신을 할 때는 이 정책이 적용되지 않는다. 또한 CORS 정책을 위반하는 리소스 요청 때문에 에러가 발생했다고 해도 서버 쪽 로그에는 정상적으로 응답을 했다는 로그만 남기 때문에, CORS가 돌아가는 방식을 정확히 모르면 에러 트레이싱에 난항을 겪을 수도 있다.  


**HOW TO SOLVE?**  
여러가지 방법이 있다.  
* Access-Control Allow-Origin 세팅하기  
가장 정석적인 방법. 서버에서 Access-Control-Allow-Origin 헤더에 알맞는 값을 세팅해주는 것!  
> 이때 와일드카드인 *을 사용하여 이 헤더를 세팅하게 되면 모든 출처에서 오는 요청을 받아먹겠다는 의미이므로 당장은 편할 수 있겠지만, 바꿔서 생각하면 정체도 모르는 이상한 출처에서 오는 요청까지 모두 받아먹겠다는 오픈 마인드와 다를 것 없으므로 보안적으로 심각한 이슈가 발생할 수도 있다.  
> 그러니 가급적이면 귀찮더라도 Access-Control-Allow-Origin: https://evan.github.io와 같이 출처를 명시해주도록 하자.  
> 이 헤더는 Nginx나 Apache와 같은 서버 엔진의 설정에서 추가할 수도 있지만, 아무래도 복잡한 세팅을 하기는 불편하기 때문에 소스 코드 내에서 응답 미들웨어 등을 사용하여 세팅하는 것을 추천한다. Spring, Express, Django와 같이 이름있는 백엔드 프레임워크의 경우에는 모두 CORS 관련 설정을 위한 세팅이나 미들웨어 라이브러리를 제공하고 있으니 세팅 자체가 어렵지는 않을 것이다.  

* Chrome cors extension -> 개발자 도구 사용하기  
* Proxy 사용하기  

> **프록시서버**  
> 1. 아이피를 Proxy Server에서 임의로 바꿔버릴 수 있다. 그래서 인터넷에서는 접근하는 사람의 IP를 모르게 된다.  
> 2. 보내는 데이터도 임의로 바꿀 수 있다.  
>> 프록시서버의 용도  
>> * 방화벽 기능   
>> * 웹 필터 기능  
>> * 캐쉬 데이터, 공유 데이터 제공 기능: 유저가 인터넷까지 접속하지 않아도 프록시 서버에서 데이터를 제공받을 수 있다.  
>> ex. 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어, 캐쉬를 이용해 더 빠른 인터넷 이용 제공, 더 나은 보안 제공, 이용 제한된 사이트 접근 가능  



## What I've learned - Javascript  

### (1) ES module  
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
- 사이드 이펙트: 단순하게 해석하면 부작용이지만 부수 효과라고 보면 된다. 함수형 프로그래밍에서는 외부의 상태를 변경하는 것 또는 함수로 들어온 인자의 상태를 직접 변경하는 것  
(이 부분은 [순수함수](https://jeong-pro.tistory.com/23)에 관해서 찾아보면 이해가 빠르다, 순수함수는 파라미터만 이용하여 외부에 영향을 미치지 않은 함수, 그 이외의 함수들은 모두 사이드이펙트가 있는 것!!ex. 전역 변수를 건들인다던지)  

헷갈리는 부분이 있어 아래 링크를 첨부합니다. [LINK](https://stackoverflow.com/questions/41127479/es6-import-for-side-effects-meaning)  
- 아무것도 export하지 않고, import만 해야할 경우(이런 경우가 언제일까??? import한 모듈을 한 번 실행하는 용도일때??  
=> ESM(Entire Security Management) 패키지 사용 시 이런 import문 사용! -> 변수들만 sanitize 시켜주니까!!)  
> If your project uses packages that export ESM, you can also import them for side effects only. This will run the code in the package entry point file (and any files it imports) only.  

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

### (2) var, let, const  
var은 function-scoped이고, let, const는 block-scoped이다!  
let, const를 사용하면 var를 사용할때보다 상당히 이점이 많다.  
let과 const는 var와 다르게 변수 재선언 불가능이다.  
let과 const의 차이점은 변수의 immutable여부이다.  
let은 변수에 재할당이 가능하지만, const는 변수 재선언, 재할당 모두 불가능하다.  


## 그 외 자잘한 정보들
* git은 소스코드를 관리할 수 있는 'tool', github은 클라우드 'service'  




