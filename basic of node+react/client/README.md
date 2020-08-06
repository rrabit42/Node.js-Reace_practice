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







