---
name: QA Report
about: QA 테스트를 위한 템플릿
title: ''
labels: ''
assignees: ''

---

# Ⅰ. User Story 단계
1. 하나의 유저 플로우는 상태[View] → 행동[Action]→ 결과[Result] 단계로 나눌 수 있어요. 
   각각의 단계에 대하여 GWT로 한 번 더 나누어 User Story와 Acceptance Criteria를 작성하세요.
2. 이슈의 제목은 User Story의 So that 부분을 적으세요.
3. 오른쪽 Assignees 속성에 요청자 본인을 추가하세요.
4. Create 버튼을 클릭하면 Projects 속성에 뭐가 생길텐데, Status 속성은 User Story, Domain 속성은 해당 도메인을 선택하세요.
5. 이 단계를 완료하면 Status 속성을 QA Notes로 변경하세요.

## 📖 User Story
### As a _사용자 유형
<!-- 예: 로그인한 개인사업자 -->
<!-- 이 밑에 작성하세요. -->

### I want to _구체적 행동
<!-- 예: 한도 조회 버튼 클릭 -->
<!-- 이 밑에 작성하세요. -->

### So that _핵심 가치
<!-- 예: 가능 대출액 즉시 확인 -->
<!-- 이 밑에 작성하세요. -->

## ✅ Acceptance Criteria
### Given _사전 조건
<!-- 예: 로그인 상태에서 -->
<!-- 이 밑에 작성하세요. -->

### When _액션
<!-- 예: 버튼을 클릭하면 -->
<!-- 이 밑에 작성하세요. -->

### Then _기대 결과
<!-- 예: 3초 내 화면이 노출된다 -->
<!-- 이 밑에 작성하세요. -->

### 엣지 케이스 (선택)
<!-- 예: 소득 0원 입력 시 예외 처리 확인 -->
<!-- 이 밑에 작성하세요. -->

# Ⅱ. QA Notes 단계
1. 개발자는 이슈를 읽고 오른쪽 Assignees 속성에 관련 프론트엔드, 백엔드 개발자를 모두 추가하세요. 읽은 사람은 본인 아니어도 담당자 알면 추가하기!
2. 담당 개발자는 필요 시 아래 QA Notes 양식을 복사하여 이 이슈에 코멘트를 남기세요. (선택)
   ```
   ## 🔍 QA Notes
   개발자 → 요청자(QA)에게 전달하는 검수 가이드
   ### 중점 확인 포인트
   <!-- 예: API 타임아웃 시 재시도 로직 -->
   ### 반드시 확인할 엣지 케이스
   <!-- 예: 잔액 0원 상태에서 투자 시도 -->
   ### 영향 범위
   <!-- 예: 마이페이지 대출 이력 영역도 확인 필요 -->
   ### 테스트 환경
   <!-- 예: staging, 계정: test@squad.io -->
   ```
3. 이 단계를 완료하면 Status 속성을 Test로 변경하세요.

# Ⅲ. Test 단계
1. 요청자는 AC와 QA Notes를 기반으로 검수하세요.
2. 검수 Pass 시, Status 속성을 Done으로 변경하세요. 끝!
3. 검수 Fail 시
   1. https://github.com/Ewhaian-WebEngineering/waiting-site/issues 에서 버그 리포트를 생성하세요.
   2. 버그 리포트 작성 중 모르겠는 항목은 모른다고 작성하세요.
   3. 이 이슈에 버그 리포트를 서브 이슈로 연결하세요. "Add existing issue"
      <p><img width="272" src="https://github.com/user-attachments/assets/c9d90ef7-1568-41dd-8808-502d962e2bae" /></p>
   6. Status 속성을 Fix로 변경하세요.

# Ⅳ. Fix 단계
1. 프론트엔드 개발자는 버그 리포트를 읽고, 해당 버그가 프론트/백 중 어디 문제인지 파악하세요.
2. 프론트엔드 개발자는 프론트 문제일 경우 수정하시고, 백 문제일 경우 https://github.com/Ewhaian-WebEngineering/waiting-site/issues 에서 버그 리포트를 생성하세요.
3. 백엔드 개발자는 버그 리포트를 읽고 수정하세요.

# AC를 수정할 경우
원본은 그대로 놔두고, 이 이슈에 코멘트를 추가하세요.
수정 사유와 함께 수정본을 코멘트로 남기세요.
