# code-with-quarkus

This project uses Quarkus, the Supersonic Subatomic Java Framework.

# 9~13주차 마무리 과제 적용

- 검색 결과 챔피언 카드에 Bootstrap 모달 연결
- 다크/라이트 모드 버튼을 인라인 이벤트에서 addEventListener 방식으로 변경하고 localStorage로 유지
- 로그인 입력값 검증 및 로그인 실패 메시지 표시
- 프로필 이미지 업로드 오류 메시지 표시
- alert 알림을 Toast 방식으로 교체
- 주요 페이지 검색창, 네비게이션 링크, 다운로드 페이지 테마 적용 정리

# 엔드포인트
<img src="src\main\resources\META-INF\resources\image\endpoint.png">

# 9주차 수업
다크모드/라이트모드 변경 추가 (javascript)
MYSQL 데이터베이스 연동

# 9주차 과제
<img src="src\main\resources\META-INF\resources\image\9주차3.png">

---

# 10주차 수업
엔드포인트 등록 (AuthResource.java, User.java...)
메인 페이지 로그인 활성화
메인 페이지 로그아웃 활성화
<img src="src\main\resources\META-INF\resources\image\login1.png">
<img src="src\main\resources\META-INF\resources\image\login2.png">

# 10주차 과제
<img src="src\main\resources\META-INF\resources\image\스크린샷 2026-06-09 184024.png">
<img src="src\main\resources\META-INF\resources\image\닼라.png">

---

# 11주차 수업
10주차 이어서 작업
회원가입 활성화
해시 암호화를 통한 회원가입 시 비밀번호 암호화
<img src="src\main\resources\META-INF\resources\image\11-1.png">


# 11주차 과제
<img src="src\main\resources\META-INF\resources\image\회원가입.png">

---

# 12주차 수업
로그인 암호화 체크 작업
프로필 페이지 추가 및 작업
<img src="src\main\resources\META-INF\resources\image\스크린샷 2026-06-09 184024.png">
<img src="src\main\resources\META-INF\resources\image\12-2.png">

# 12주차 과제
<img src="src\main\resources\META-INF\resources\image\12-3.png">
<img src="src\main\resources\META-INF\resources\image\12-1.png">


---

# 13주차 수업
alert을 통한 알림 창 제거 및 알림 창 부트스트랩으로 작업
네비바 동적 작업
회원정보 수정 작업
회원정보 이미지 업로드 가능
<img src="src\main\resources\META-INF\resources\image\to.png">
<img src="src\main\resources\META-INF\resources\image\13.png">

# 13주차 과제
<img src="src\main\resources\META-INF\resources\image\131.png">
<img src="src\main\resources\META-INF\resources\image\132.png">
<img src="src\main\resources\META-INF\resources\image\to.png">

# 최종 마무리 작업

- Toast 알림을 공통 함수로 통일하고 기존 alert 방식 제거
- 프로필 네비게이션에 사용자명 tooltip 표시
- 프로필 페이지에 개인정보 수정 Collapse 폼 추가
- 이메일 중복 확인 후 개인정보 수정 엔드포인트 처리
- 현재 비밀번호 확인 후 SHA-256 해시 기반 비밀번호 변경 처리
- 비밀번호 변경 성공 시 Toast 출력 후 로그인 페이지로 이동
- 주요 네비게이션 링크와 공식 유튜브 외부 링크 정리
- 실험용 test.js/test2.js 참조 제거 및 불필요한 로그/중복 주석 정리


---

# 과제를 하면서 든 생각
이번에 처음으로 Codex를 결제해서 사용해 봤는데 토큰을 생각보다 많이 먹는걸 제외하면 왜 AI 에이전트를 사용하는지 깨달았음.
확실히 이제는 AI에 익숙해지면 혼자서는 개발하지 못할 것 같음.

# 시험준비
9~13주차 수업 자료 및 실습 코드 훑어보기


If you want to learn more about Quarkus, please visit its website: <https://quarkus.io/>.

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```shell script
./mvnw quarkus:dev
```

> **_NOTE:_** Quarkus now ships with a Dev UI, which is available in dev mode only at <http://localhost:8080/q/dev/>.

## Packaging and running the application

The application can be packaged using:

```shell script
./mvnw package
```

It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:

```shell script
./mvnw package -Dquarkus.package.jar.type=uber-jar
```

The application, packaged as an _über-jar_, is now runnable using `java -jar target/*-runner.jar`.

## Creating a native executable

You can create a native executable using:

```shell script
./mvnw package -Dnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using:

```shell script
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/code-with-quarkus-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult <https://quarkus.io/guides/maven-tooling>.

## Related Guides

- REST ([guide](https://quarkus.io/guides/rest)): A Jakarta REST implementation utilizing build time processing and Vert.x. This extension is not compatible with the quarkus-resteasy extension, or any of the extensions that depend on it.
- Qute Web ([guide](https://quarkiverse.github.io/quarkiverse-docs/quarkus-qute-web/dev/index.html)): Serves Qute templates directly over HTTP.
- Qute ([guide](https://quarkus.io/guides/qute)): Offer templating support for web, email, etc in a build time, type-safe way
- OpenID Connect ([guide](https://quarkus.io/guides/security-openid-connect)): Verify Bearer access tokens and authenticate users with Authorization Code Flow
- WebSockets ([guide](https://quarkus.io/guides/websockets)): WebSocket communication channel support

## Provided Code

### Qute Web

Qute templates like `some-page.html` served via HTTP automatically by Quarkus from the `src/main/resource/templates/pub` directory. No controllers needed. Once the quarkus app is started visit the generated page at http://localhost:8080/some-page?name=World

[Related guide section...](https://docs.quarkiverse.io/quarkus-qute-web/dev/index.html)

### REST

Easily start your REST Web Services

[Related guide section...](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)

### WebSockets

WebSocket communication channel starter code

[Related guide section...](https://quarkus.io/guides/websockets)

# 4주차 수업 마무리 단계 (마무리 X)

# 5주차 수업 내용

download.html / css 추가
Modal html 추가

# 6주차 수업

부트스트랩 / js
서치 시 구글 검색으로 옮기기

# 7주차 수업

챔피언 검색 기능 추가(js)

---

네비바 로고 추가 + .ui 위치 변경
챔피언 모달 추가
멜 추가

---

2026.04.20
유나라 추가
자헨 추가

추가한 3개 챔피언 모달 및 데이터 정의 추가
검색창에 아무것도 입력하지 않고 검색 시 메인화면으로 돌아가기 기능 추가

- location을 통해 index.html로 이동

---
중간고사 전 수업 과제는 사진이 없습니다. 기말고사 전 수정 내용엔 사진 포함.
