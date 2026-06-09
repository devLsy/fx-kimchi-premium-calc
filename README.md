# FX-KIMCHI ENGINE

실시간 자산 프리미엄(김치 프리미엄) 트래킹을 위한 트레이딩 보조 엔진입니다.
국내(Upbit)와 해외(Binance) 거래소의 시세 차이를 실시간으로 계산하여, 아비트리지(차익거래) 타점을 확인하는 데 최적화되어 있습니다.
<img src="https://github.com/user-attachments/assets/795b5032-4cbd-4e89-8f70-7d9a13f537e7" width="400" alt="FX-KIMCHI ENGINE UI">

## 🚀 Key Features

* **실시간 데이터 동기화**: 3초 간격으로 시세 데이터를 병렬 호출하여 최신 프리미엄 수치 산출.
* **최적화된 아키텍처**: 
    * 데이터 통신 로직(`useMarketData` 훅)과 UI 분리.
    * 환율 갱신 주기(30분)와 시세 갱신 주기(3초) 분리로 API 호출 효율 최적화.
* **트레이딩 환경 특화 UI**: 다크 테마 기반의 대시보드 레이아웃으로 시각적 피로도 최소화 및 핵심 데이터 직관성 극대화.

## 🛠 Tech Stack

* **Frontend**: React, Tailwind CSS
* **API**: 
    * Upbit Ticker API
    * Binance Price API
    * ExchangeRate-API (LIVE FX)

## ⚙️ How to Run

이 프로젝트는 로컬 환경에 최적화되어 있습니다.

1. **클론 및 설치**:
   ```bash
   git clone [레포지토리 주소]
   cd [프로젝트 폴더명]
   npm install
   ```
   
## 📦 Deployment
**배포**
```bash
npm install -g firebase-tools
firebase login
firebase init
y
Hosting: Set up deployments for static web apps
Use an existing project(firebase 프로젝트가 존재할 경우)
존재하는 프로젝트 선택
What do you want to use as your public directory? 나오면 dist 입력
Configure as a single-page app (rewrite all urls to /index.html)? Y 입력
Set up automatic builds and deploys with GitHub? (Y/n) 깃허브 CI/CD 할거면 Y 아니면 N
File dist\index.html already exists. Overwrite? N 입력
Would you like to install agent skills for Firebase? 불 필요하니까 N 입력
npm run build && firebase deploy
```
