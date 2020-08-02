# Node.js-React_practice
node.js, express, react, mongodb를 이용해 웹사이트 만들기  

## basic of node+react  
[강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/dashboard)  

### model과 schema  
* **model** : schema를 감싸주는 역할, provides an interface to the database for creating, querying, updating, deleting records, etc.  
* **schema** : structure of the document, default values, validators, etc...  

### 에러 해결 방법  
* mongoose.connect()시 아래와 같은 에러가 발생했다.  
```MongoParseError: URI does not have hostname, domain name and tld```  
이 오류는 비밀번호에 특수문자가 들어가서 발생하는 오류이므로, 해당 특수문자를 인코딩변환해서 넣어주면 된다!! ex) # -> %23  
