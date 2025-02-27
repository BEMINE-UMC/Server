# 📝 포트폴리오 정보 공유 서비스 BeMine

![Image](https://github.com/user-attachments/assets/d7ab853d-8831-4b5f-9a0a-5fcc66f82e81)

## 🦹‍ Team

| <img src="https://avatars.githubusercontent.com/u/164743344?v=4" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/73399251?v=4" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/143832968?v=4" width="100" height="100"> |                     <img src="https://avatars.githubusercontent.com/u/73830722?v=4" width="100" height="100">                      | <img src="https://avatars.githubusercontent.com/u/99378706?v=4" width="100" height="100"> |
|:--:|:--:|:--:|:----------------------------------------------------------------------------------------------------------------------------------:|:--:|
| **버디/이병웅** <br> [@bulee5328](https://github.com/bulee5328) | **김매트/김규식** <br> [@kuchic0918](https://github.com/kuchic0918) | **옌찌/장예은** <br> [@jangyeeunee](https://github.com/jangyeeunee) |                                   **깡태/<br/>강태훈** <br> [@skdl1936](https://github.com/skdl1936)                                    | **차차/차가민** <br> [@gmcha](https://github.com/gmcha) |
| 회원가입 및 로그인, 인증 기능(이메일 인증, 이메일 찾기, 비밀번호 재설정, 중복 검사), 게시물 조회(좋아요, 다른 게시물) | 템플릿 좋아요 순 조회 , 연혁수정 , 게시글 작성/수정 , 게시글 삭제 , 게시글 이미지 삽입 , 게시글 상세조회 ,   | 기능3 |  연혁 조회 , 최근 본 게시물 조회 , 북마크한 게시물 조회, 프로필 수정, 템플릿 수정, 템플릿 생성, 연혁 생성, 사용자 정보 조회, 자기소개 수정 | 게시물 목록 조회, 템플릿 목록 조회, 템플릿 단일 조회(업로드 화면, 파일 조회 창), 템플릿 삭제 |

## Stack

---

NODE+EXPRESS
- 크롬 V8엔진을 사용하여 만든 웹 서버 호스팅 런타임이다.

JavaScript
- 브라우저에서 실행되는 스크립트 언어로, 동적인 웹 페이지를 작성하는 데 사용됩니다. 현재는 Node.js를 통해 서버 측 프로그래밍까지 가능하며, 풀스택 개발에 널리 쓰이고 있습니다.

Prisma
- TypeScript 및 JavaScript 애플리케이션에서 사용하는 ORM(Object-Relational Mapping) 도구로, 데이터베이스와 상호작용을 간소화합니다.
- 스키마를 기반으로 SQL 쿼리를 자동 생성하며, 직관적인 데이터 모델링이 가능합니다.

AWS S3
- 객체 스토리지 서비스로, 데이터를 안전하게 저장하고 관리할 수 있습니다. 이미지, 비디오, 문서와 같은 파일을 저장하고 HTTP를 통해 접근 가능합니다. 서버리스 애플리케이션에서 자주 사용됩니다.

AWS RDS(MYSQL)
- 관계형 데이터베이스를 클라우드 환경에서 관리할 수 있는 서비스입니다. MySQL, PostgreSQL, MariaDB, Oracle 등의 엔진을 지원하며, 자동 백업, 복구, 스케일링을 제공합니다.

AWS EC2
- 클라우드 환경에서 가상 서버를 제공하는 서비스입니다. 사용자는 필요한 용량에 따라 서버를 생성하고, 직접 운영 체제를 관리할 수 있습니다. 높은 유연성과 확장성을 제공합니다.

Git Actions
-CI/CD(Continuous Integration/Continuous Deployment) 자동화 도구로, 소프트웨어 개발 워크플로우를 간소화합니다. 코드 변경 시 테스트, 빌드, 배포와 같은 작업을 자동화할 수 있습니다.

Swagger
- RESTful API를 문서화하고 테스트하기 위한 도구입니다. API 명세를 OpenAPI Specification(OAS) 형식으로 작성하여, 클라이언트 및 개발자와의 협업을 효율적으로 만듭니다.



# Convention
## Branch

---

### Main

<aside>

❗프로덕션 배포 가능한 상태 유지  
❗직접 작업 금지  
❗develop 브랜치에서 merge를 통해 업데이트
</aside>

### Develop

<aside>

❗개발의 기본 브랜치, 모든 기능이 merge 되는 브랜치  
❗직접 배포 금지  
❗다음 릴리즈를 준비하는 작업은 모두 develop에서

</aside>

### Feature

<aside>

❗새로운 기능이나 변경 사항을 개발  
❗이름 형식: feature/#이슈번호-기능명    
❗브랜치 상태 공유를 위해 주기적으로 develop rebase 하거나 병합

</aside>

---

## Flow

<aside>
💡

### 새 기능 개발

1. repo에서 이슈 생성
2. develop 브랜치에서 feature 브랜치 생성

```bash
git checkout develop
git checkout -b feature/#이슈번호-기능명...
```

1. 작업 완료 후, develop 브랜치로 merge
2. 작업 완료 후 feature 브랜치 삭제

### 긴급 버그 수정

1. repo에서 이슈 생성
2. main 브랜치에서 hotfix 브랜치 생성

```bash
git checkout main
git checkout -b hotfix/#이슈번호-버그명..
```

1. 버그 수정 후, main과 develop 브랜치 병합
2. hotfix 브랜치 삭제

</aside>

## Code

---

eslint + prettier 컨벤션 사용

## Issue

```markdown
name: 이슈 템플릿  
about: "\b해당 이슈 생성 템플릿을 사용하여 이슈 생성"  
title: ''  
labels: ''  
assignees: ''

---

## ✅ Description

설명을 작성하세요.

## ✔️ TODO

- [ ]
- [ ]

## ETC

### Pull Request
---

```

## Pull Request

---

## #️⃣ Issue Number

<!--- ex) #이슈번호, #이슈번호 -->

## 📝 요약(Summary)

<!--- 변경 사항 및 관련 이슈에 대해 간단하게 작성해주세요. 어떻게보다 무엇을 왜 수정했는지 설명해주세요. -->

## 🛠️ PR 유형

어떤 변경 사항이 있나요?

- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
- [ ] 코드 리팩토링
- [ ] 주석 추가 및 수정
- [ ] 문서 수정
- [ ] 테스트 추가, 테스트 리팩토링
- [ ] 빌드 부분 혹은 패키지 매니저 수정
- [ ] 파일 혹은 폴더명 수정
- [ ] 파일 혹은 폴더 삭제

## 💬 공유사항 to 리뷰어

<!--- 리뷰어가 중점적으로 봐줬으면 좋겠는 부분이 있으면 적어주세요. -->
<!--- 논의해야할 부분이 있다면 적어주세요.-->
<!--- ex) 메서드 XXX의 이름을 더 잘 짓고 싶은데 혹시 좋은 명칭이 있을까요? -->

## ✅ PR Checklist

PR이 다음 요구 사항을 충족하는지 확인하세요.

- [ ] 커밋 메시지 컨벤션에 맞게 작성했습니다.
- [ ] 변경 사항에 대한 테스트를 했습니다.(버그 수정/기능에 대한 테스트).


## Commit

---

```
## Git Convention

### commit message structure
제목 본문 꼬릿말로 구성

:gitmoji: <type> : <Subject>
body
footer
```

```markdown
### Type, gitmoji

깃모지, 태그 : 제목의 형태

- :sparkles: feat: 새로운 기능 추가, 새로운 디자인 관련 기능 추가 등
- :bug: fix: 버그 수정, 디자인 버그 수정 등
- :memo: docs: 문서 추가, 삭제, 수정
- :white_check_mark: test: 테스트 코드 추가
- :recycle: refactor: 코드 리팩토링
- :wrench: chore: 빌드 부분 혹은 패키지 매니저 수정사항
- :truck: rename: 파일, 경로, route를 옮기거나 이름 변경
- :fire: remove: 삭제(파일, 코드)

### Body

- 본문은 한 줄 당 72자 내로 작성한다.
- 본문 내용은 양에 구애받지 않고 최대한 상세히 작성한다.
- 본문 내용은 어떻게 변경했는지 보다 무엇을 변경했는지 또는 왜 변경했는지를 설명한다.

### footer

꼬리말은 optional이고 이슈 트래커 ID를 작성한다.
꼬리말은 "유형: #이슈 번호" 형식으로 사용한다.
여러 개의 이슈 번호를 적을 때는 쉼표(,)로 구분한다.
이슈 트래커 유형은 다음 중 하나를 사용한다.

- Fixes: 이슈 수정중 (아직 해결되지 않은 경우)
- Resolves: 이슈를 해결했을 때 사용
- Ref: 참고할 이슈가 있을 때 사용
- Related to: 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)

  ex) Fixes: #45 Related to: #34, #23

### commit 예시

feat: "게시판 글쓰기 기능 구현"

사진 첨부, 글쓰기 API 개발

Resolves: #123
Ref: #456
Related to: #48, #45
```

