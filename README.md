# 함께하개, Dogether

# 커밋 메세지 규약
커밋 메세지 첫 시작은 아래 5단어
```
FIX   : 버그 수정, 에러 해결 등
ADD   : 파일 추가 / 기능 및 함수 추가
DELETE : 파일 삭제
REFACTOR : 기존 파일 개선/보완
MOVE  : 파일 위치 변경 / 이름 변경 등 실제 코드 내용 변경 없을 시

예시) ADD Frontend, Backend, ReadMe 기본 세팅 완료

```

# Branch
```
master : 최종적으로 들어갈 곳
develop : 정상적인 기능이 추가될 곳, 개발 과정을 하나씩 쌓을 곳
hotfix : 오류 수정이 이루어질 곳
practice : develop에 작성 하기 전 사용할 곳

```

1. 로컬 Branch를 만들어서 코드 작업
2. 합치려는 Branch 최신화 (Pull)
3. 작업하던 Branch 위의 Branch들 중 하나에 합치기
4. Pull Request 생성

# Git Hub 
### 1. Fork
타겟 프로젝트의 저장소를 자신의 저장소로 Fork 합니다.
### 2. Clone, remote
Fork로 생성한 본인 계정의 저장소에서 주소를 복사해서 자신의 로컬 저장소에 clone합니다.

git clone [복사url]
#### 예시) git clone https://github.com/najaeseong1/Dogether-Final-Project.git
clone한 디렉터리로 들어가서 원격 저장소를 확인합니다.

git remote -v

#### origin	https://github.com/najaeseong1/Dogether-Final-Project.git (fetch)
#### origin	https://github.com/najaeseong1/Dogether-Final-Project.git (push)
fork한 로컬 프로젝트는 orgin으로 기본적으로 추가되어 있는 것을 확인할 수 있습니다.

원본 프로젝트를 원격 저장소로 등록해줍니다.
보통 위에서 흐른다고 하여 원본 저장소를 upstream 별칭으로 지정합니다.
git remote add [별칭] [원본url]
#### 예시) git remote add upstream https://github.com/najaeseong1/Dogether-Final-Project.git

branch 본격적으로 로컬에서 코드 작업을 수행하기 전에 로컬에서 작업하는 브랜치를 만들어서 진행합니다.

### 3. 브랜치 생성 및 이동 git switch -c 작업할 로컬 브랜치이름

#### 브랜치 확인 git branch -v

### 작업이 모두 완료 된 후에 GitHub에서 Sync fork로 branch를 업데이트 합니다.
이후에 작업한 브랜치와 복사했던 브랜치를 Merge하고 작업했던 브랜치를 삭제합니다.

Merge된 브랜치를 본인 Github에 push하고 PR을 작성합니다
### add, commit, push 
git push [remote 별칭] [브랜치명]

### 예시) git push origin develop

## pull request 생성
![image](https://github.com/najaeseong1/Dogether-Final-Project/assets/118699329/e371bde4-572f-4c7e-b756-f69e3f49fd3c)
github의 fork한 프로젝트로 이동하여 develop 브랜치의 contribute를 클릭하여 pull request를 생성합니다.
![image](https://github.com/najaeseong1/Dogether-Final-Project/assets/118699329/f4e03f7a-c18a-4d7e-b5a1-3acb620f4a9f)
upstream 리포지토리, 브랜치 <- 나의 fork 리포지토리, 브랜치를 선택하여 pull request 방향을 정해주고 comment를 적은 뒤 create pull request를 클릭합니다.

![image](https://github.com/najaeseong1/Dogether-Final-Project/assets/118699329/e3b19d02-2890-42d1-b9e3-6507c57ef7a9)

squash merge를 선택하게 되면 그림의 가장 상단처럼 하나의 커밋으로 들어가게 되고 create a merge commit을 선택하게 되면 origin 리포지토리에 커밋된 기록과 하나의 merge 커밋을 추가로 만들어 모든 기록이 들어가는 merge가 됩니다.

## Merge 이후 동기화 및 branch 삭제

git checkout master // 마스터로 이동

git pull [원본 저장소] [브랜치명] // upstream 동기화
git pull upstream master

git push origin master // origin에 반영

git branch -d develop   // 로컬 브랜치 삭제

git push origin --delete [브랜치명] // 원격 브랜치 저장소도 삭제하고 싶은 경우
다음 작업을 수행할 경우 이 상태에서 다시 브랜치를 만들어서 작업하고 반복하면 됩니다.
