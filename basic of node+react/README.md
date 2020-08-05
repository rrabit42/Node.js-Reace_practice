# Node + React 기초  
## 강의 출처  
[따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8#)  

## 강의 내용 메모  
### Node 와 Express  
* Node.js : js를 server side에서 쓸 수 있게 함  
* Express.js : node.js를 좀 더 쉽게 사용할 수 있게 해주는 프레임워크  
* 더 자세한 내용은 [이전 node 레포 참고](https://github.com/rrabit42/Node.js_practice/tree/master/Node.js)  

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

### Auth 과정  
서버와 클라이언트가 토큰이 맞는지 서로 계속 체크한다.  
클라이언트는 토큰을 쿠키, 세션 등에 저장하고, 서버는 DB에 저장한다.  
1. Cookie에 저장된 Token을 Server에서 가져와서 복호화 한다.  
2. 복호화를 하면 User ID가 나오는데 그 User ID를 이용해서 데이터베이스 User Colleciton에서 유저를 찾은 후 쿠키에서 받아온 token을 유저도 가지고 있는지 확인한다.  
* 쿠키가 일치하지 않으면 Authentication False  
* 쿠키가 일치하면 Authentication True. 그리고 해당하는 유저의 정보들을 리턴해준다.  





