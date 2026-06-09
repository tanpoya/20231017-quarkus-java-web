# code-with-quarkus

This project uses Quarkus, the Supersonic Subatomic Java Framework.

# 9~13주차 마무리 과제 적용

- 검색 결과 챔피언 카드에 Bootstrap 모달 연결
- 다크/라이트 모드 버튼을 인라인 이벤트에서 addEventListener 방식으로 변경하고 localStorage로 유지
- 로그인 입력값 검증 및 로그인 실패 메시지 표시
- 프로필 이미지 업로드 오류 메시지 표시
- alert 알림을 Toast 방식으로 교체
- 주요 페이지 검색창, 네비게이션 링크, 다운로드 페이지 테마 적용 정리

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

# 9주차 수업
다크모드/라이트모드 변경 추가 (javascript)
MYSQL 데이터베이스 연동

# 10주차 수업
엔드포인트 등록 (AuthResource.java, User.java...)
메인 페이지 로그인 활성화
메인 페이지 로그아웃 활성화

# 11주차 수업
10주차 이어서 작업
회원가입 활성화
해시 암호화를 통한 회원가입 시 비밀번호 암호화

# 12주차 수업
로그인 암호화 체크 작업
프로필 페이지 추가 및 작업

# 13주차 수업
alert을 통한 알림 창 제거 및 알림 창 부트스트랩으로 작업
네비바 동적 작업
회원정보 수정 작업
회원정보 이미지 업로드 가능

---

# 시험준비
univai를 활용하여 수업자료의 요약 및 퀴즈 풀기
