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
