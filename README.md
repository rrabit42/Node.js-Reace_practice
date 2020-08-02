# Node.js-React_practice
node.js, express, react, mongodb를 이용해 웹사이트 만들기  

## basic of node+react  
[강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)  

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

## 그 외 자잘한 정보들  
* git은 소스코드를 관리할 수 있는 'tool', github은 클라우드 'service'  
* nodemon 설치  
```npm install nodemon --save-dev``` : develop 모드 즉, 로컬에서 작업할 때만 사용하는 모듈이라는 뜻, 프로덕션 시에는 포함 X  
따라서 *nodemon*은 dependencies가 아닌 devdependencies에 들어감.  
scripts에 ```"backend": "nodemon index.js"``` 추가    
앞으로는 node run start가 아니라 node run backend로 해서 nodemon 실행!  


