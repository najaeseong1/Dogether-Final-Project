
# REST API 관례
### 게시물 목록 조회: /posts            - GET, param: (page, size)
### 게시물 개별 조회: /posts/{id}       - GET
### 게시물 등록:     /posts            - POST, payload: (writer, title, content, hashTags)
### 게시물 수정:     /posts/{id}       - PATCH
### 게시물 삭제:     /posts/{id}       - DELETE


---
# spring boot devtools 설정

1. 파일 -> 설정
2. 빌드, 실행, 배포 탭 클릭 -> 컴파일러 탭 클릭
3. 자동으로 프로젝트 빌드 체크
4. 왼쪽 탭에 고급 설정 클릭
5. 컴파일러 메뉴 -> 프로젝트가 실행중인 ~~~ auto-make 클릭