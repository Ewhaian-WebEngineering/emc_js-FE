# 종합손물세트

**핸드메이드 페어 안내 플랫폼 종합손물세트**

셀러와 방문객을 잇는 핸드메이드 페어 안내 플랫폼으로,
셀러들이 정성껏 만든 수제 작품의 정보와 판매 부스를 한곳에 모아, 방문 전 미리 구경하고 당일 바로 찾아갈 수 있도록 도와줍니다.
손으로 만든 물건들의 종합선물세트, 지금 둘러보세요!

<p align="center">
  <img width="100%" alt="readme_banner" src="https://github.com/user-attachments/assets/120ef755-7af3-4d42-b60b-72ae6f02d083" />
</p>
<p align="center">
  📅 2026.10.13. 제12회 종합손물세트 당일 운영 (현재 서비스 종료)
</p>

<br />

## ❤️ Contributors
 
| 🧶조예슬 (LEAD)<br/>[@joyrii](https://github.com/joyrii) | 🧶김지유<br/>[@jiyu1103](https://github.com/jiyu1103) | 🧶강주혜<br/>[@juhye0635](https://github.com/juhye0635) | 🧶노가령<br/>[@yonggarichiki](https://github.com/yonggarichiki) |
|:---:|:---:|:---:|:---:|
| <img alt="조예슬 avatar" src="https://github.com/joyrii.png?size=400" height="200" /> | <img alt="김지유 avatar" src="https://github.com/jiyu1103.png?size=400" height="200" /> | <img alt="강주혜 avatar" src="https://github.com/juhye0635.png?size=400" height="200" /> | <img alt="노가령 avatar" src="https://github.com/yonggarichiki.png?size=400" height="200" /> |
| `디자인 시스템`, `API 인프라 세팅`,<br/> `홈`, `검색`, `부스`, `배치도`,<br/> `스크랩`, `제품 관리` | `마이페이지`, `대시보드`,<br/>`관리자 페이지` | `협찬사`,<br/> `안내사항` | `이벤트`,<br/> `부스 공지사항` |

<br/>

## 📸 ScreenShot
 
| 홈 > 부스, 이벤트, 협찬사 |
|:---:|
| <video src="https://github.com/user-attachments/assets/9d9521ac-2a97-4f18-a053-3494f44591ec" /> |

<br/>

## 🛠️ Tech Stacks
 
| 항목 | 기술 스택 |
|:---|:---|
| Framework | React |
| Language | JavaScript |
| Build Tool | Vite |
| Server State | TanStack React Query |
| Network | Axios |
| Styling | Emotion |
| UI Interaction | Framer Motion, react-zoom-pan-pinch |
| UI Docs | Storybook |
| Routing | React Router |
| Deploy | Vercel |

<br/>

## 🗂️ Project Structure
 
```text
🗃️ emc_js-FE
│
└── 📂 src
    ├── 📂 api
    │   ├── 📁 core            # axios 인스턴스, 인터셉터, Query Client
    │   └── 📁 feature         # 도메인별 API 함수 및 Query 훅
    │
    ├── 📂 designsystem
    │   ├── 📁 components      # 공용 UI 컴포넌트
    │   └── 📁 tokens          # color, semantic, typography, measurement, shadow
    │
    ├── 📁 assets              # 이미지, 아이콘, 폰트
    ├── 📁 components          # 서비스 전용 컴포넌트
    ├── 📁 constants           # 상수 정의
    ├── 📁 hooks               # 커스텀 훅
    ├── 📁 layouts             # 페이지 레이아웃
    ├── 📁 pages               # 라우트 단위 페이지
    ├── 📁 routes              # 라우팅 설정
    ├── 📁 styles              # 전역 스타일
    ├── 📁 utils               # 공통 유틸 함수
    │
    ├── 📄 App.jsx
    └── 📄 main.jsx
```
 
<br/>

## 📚 Convention

- [Git Convention](https://app.notion.com/p/Git-Convention-38e97dd9da6b807f84d2ef55dfe57ab5)
- [Code Convention](https://app.notion.com/p/Code-Convention-38e97dd9da6b8047bf7bdcbc92b28fba)
- [Packaging Convention](https://app.notion.com/p/Packing-Convention-38e97dd9da6b80c486d2eb70dd904d97)
