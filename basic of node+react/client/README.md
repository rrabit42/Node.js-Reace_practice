# Node + React 기초  
## 강의 출처  
[따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8#)  

## React 강의 내용 메모  
### React  
1. Library, Made by Facebook, Released in 2013  
2. Components : 모듈과 비슷하게 컴포넌트로 이뤄져 있어서 reusable이 뛰어남  
3. Virtual DOM : Real DOM과 같은 properties를 가지고 있음. Real DOM을 가볍게 copy한 것.  

Real DOM | Virtual DOM
|:---:|:---:|
|1. 만약 10개의 리스트가 있다. | 1. 만약 10개의 리스트가 있다. |
|2. 그 중 한가지의 리스트만 Update 된다. | 2. 그 중 한가지의 리스트만 Update 된다.|
|3. 전체 리스트를 다시 Reload 해야됨! | 3. 그 바뀐 한가지 아이템만 DOM에서 바꿔준다.|
|4. Super Expensive한 작업 | 4. HOW???!!!|  

4. Virtual DOM - HOW?!
- JSX(우선 HTML로 알아두기)을 렌더링한다. 그럼 Virtual DOM이 Update가 됨  
- Virtual DOM이 이전 Virtual DOM에서 찍어둔 Smapshot과 비교를 해서 바뀐 부분을 찾는다. 이 과정을 "diffing"이라고 부른다.  
- 그 바뀐 부분만 Real DOM에서 바꿔준다!  

### start react project  
원래 리액트 앱을 처음 실행하기 위해선 webpack이나 babel 같은 것을 설정하기 위해서 엄청나게 많은 시간이 걸렸다.  
하지만 이제는 ```create-react-app``` Command로 바로 시작할 수 있다.  
* Babel  
최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해서 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수 있게 변환시켜줌.  

* Webpack  
At its core, webpack is a static module bundler for modern JavaScript applications. When web pack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.  
bundle : 묶어준다. 일단 지금은 복잡하게 된 모듈들을 묶어준다! 라고 생각하자.  

1. ```npx create-react-app .``` : .은 현재디렉토리에 해준다는 뜻  
2. 원래는 ```npm install -g create-react-app``` 이렇게 했었다. global 디렉토리에 다운받음.  
> 이제는 npx를 이용하여 다운 받지 않고 사용 가능하다!  

* npm과 npx  

**NPM**은 레지스트리 같은 저장소 역할을 한다. 라이브러리들을 담고 있다.  
배포를 할 때 build하고 배포해야하는데, 그때도 npm 사용  
> it is an online repository for the publishing of open-source Node.js projects  
> it is a command-line utility for interacting with the said repository that aids in package installation, version management, and dependency management.  

npm에 관련된 것은 package.json에 담겨있다!  

**npm install locally** : links created at the ```./node_modules/.bin``` directory. 해당 프로젝트 안에만.  
**npm install globally** : links created from the global **bin/** directory.  
ex. ```/usr/local/bin``` on Linux, ```%AppData%/npm``` on Window  
즉 컴퓨터 안에 다운받아 지는 것! ```-g``` 옵션을 사용한다.  

**NPX**를 사용하면 레지스트리에 있는 npm 앱을 사용할 수 있다.  
즉, npx가 npm registry에서 create-react-app을 찾아서(look up) 다운로드 없이 실행시켜 준다!!  
1. Disk Space를 낭비하지 않을 수 있다.  
2. 항상 최신 버전을 사용할 수 있다.  

### react 구조 설명 - 화면 렌더링  
* **App.js**에서 페이지가 렌더링 되고 있다.  
* **index.js**에 app의 컴포넌트를 담고 있다.  
> ReactDOM.render(<App /> , document.getElementById('root'));  
이 DOM에 보여주고 싶은 컴포넌트를 담으면 됨!  
어떻게 보여지게 되냐? 그 뒤에 있는 ```document.getElementById('root')``` 때문인데,  
public/index.html을 보면  
```<div id="root"></div>```  
이 element의 아이디를 잡고 이 부분에 App 컴포넌트를 보여주는 거임!!  

* webpack이 관리하는 부분은 src 폴더 inside 부분이다. public 폴더 안 부분은 웹팩이 관리를 안함. 따라서 이미지 등을 src 부분 안에 넣어줘야함.  

* **/public/** : 여기에 쓰인 파일들은 오직 public/index.html를 위해 쓰일 수 있다.  
* **/src/** : 이곳에 JS파일과 CSS 파일들을 넣으면 된다. 그리고 Webpack은 여기에 있는 파일만 본다. 그래서 이 폴더 이외에 넣는 것은 webpack에 의해서 처리되지 않음.  
> You may create subdirectories inside src. For faster rebuilds, only files inside src are processed by Webpack. You need to put any JS and CSS files inside src, otherwise Webpack won't see them.  

### react 구조 설명 - boiler plate에 특성화된 구조 설명(현재 강의에서 쓰는 구조)  
* **_actions, _reducer** : Redux를 위한 폴더들  
* **components/views** : 이 안에는 Page들을 넣는다.  
* **compoenets/views/Sections** : 이 안에는 페이지에 관련된 css 파일이나, component들을 넣는다.  
* **App.js** : Routing 관련 일을 처리한다.  
* **Config.js** : 환경 변수같은 것들을 정하는 곳이다.  
* **hoc & utils** : Higher Order Component의 약자로 여러 군데에서 쓰일 수 있는 것들을 이곳에 넣어둬서 어디서든 쓸 수 있게 해준다.  
> hoc(higher-order compoenet) is a functino that takes a component and returns a new component.  
즉, 다른 컴포넌트를 갖는 function!  
```const EnhancedComponent = higherOrderComponent(WrappedComponent)```  
ex) Auth라는 HOC가 있다고 가정하면, 여기서 해당 유저가 해당 페이지에 들어갈 자격이 되는지를 알아낸 후에 자격이 된다면 Admin component에 가게 해주고 아니라면 다른 페이지로 보내버린다.  
auth 안에 여러가지 component를 넣어놓고 다음 액션을 취할 수 있게! 이렇게 여러 기능을 넣어놓고 다른 컴포넌트들이 쓸 수 있게!  

### React Router dom  
라우팅을 할 때 리액트에서는 이 패키지을 사용한다!  
> react-router - 웹&앱  
> react-router-dom - 웹  
> react-router-native -앱  

### useEffect란  
useEffect 훅은 함수형 컴포넌트에서 쓰이며 기존 클래스 컴포넌트의 라이프사이클 메서드들을 대체한다. 이를 정리하기 위해 간단히 라이프사이클 메서드를 설명하고, useEffect 훅의 효용을 적는다. [블로그](https://developer-alle.tistory.com/304)  
~~React 기초를 더 공부해야할 것 같다.~~

## 에러 해결 방법  
* [출처](https://aeei.io/template-not-provided-using-create-react-app/)  

```npx create-react app .``` 명령어로 리액트 프로젝트를 구축할 때 아래와 같은 메세지가 표시된다면, 생성된 프로젝트에 기본 템플릿이 없을 것이다. ~~네ㅠㅠ접니다~~  
그 이유는...  
> A template was not provided. This is likely because you’re using an outdated version of create-react-app. Please note that global installs of create-react-app are no longer supported.  

이미 global로 CRA *(create-react-app node module의 약자로 리액트 프로젝트를 쉽게 만들 수 있게 필요한 모듈 혹은 설정을 포함하는 보일러 플레이트이다.)* 가 설치된 상태이기 때문에 이를 삭제해야 한다.  

> npm uninstall -g create-react-app  

삭제를 했는데도 동일한 메시시가 계속 표시되고 있다면 아래와 같이 작업을 해준다.  

which create-react-app 를 실행했을 때,  
```/usr/local/bin/create-react-app``` 와 같은 결과가 나오면 직접 삭제한다.  

> rm -rf /usr/local/bin/create-react-app  



