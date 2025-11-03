# 研途有我 (YanTuYo)

面向准备研究生推荐免试（保研）的学生，提供夏令营/预推免资讯、导师与学校情报、政策解读及 AI 辅导工具的一站式平台。

## 技术栈

- **前端**：HTML、CSS、JavaScript
- **后端**：Python (Flask)
- **AI 服务**：通过 API 调用大语言模型

## 项目结构

`.
├── backend/                # 后端 Flask 应用及爬虫脚本
│   ├── app.py              # 主应用入口
│   ├── crawl/              # 夏令营信息爬虫
│   ├── run_crawler.py      # 爬虫调度脚本
│   └── requirements.txt    # 后端依赖
├── frontend/               # 前端静态资源
│   ├── campInfo/           # 供前端读取的夏令营数据
│   ├── css/                # 样式文件
│   ├── js/                 # 脚本文件
│   ├── images/             # 静态图片
│   └── *.html              # 各功能页面
├── tests/                  # 接口调试脚本与测试页面
└── todo.md`

## 快速开始

### 后端

`Bash
cd backend
pip install -r requirements.txt
python app.py
`
后端默认监听 http://localhost:5000/。

### 前端

`ash
cd frontend
python -m http.server 8000
`
前端以静态资源方式提供，可直接访问 http://localhost:8000/index.html（或使用任意静态服务器部署）。

## 其他说明

- ackend/crawl/pku_enhanced_crawler.py 会将爬取的数据写入 rontend/campInfo/ 供前端读取。
-     ests/ 目录下保存接口测试脚本和临时调试页面，便于开发与验证。
- 若需启用 AI 能力，请在后端配置 .env 文件并填入对应的 API Key。

## 身份认证与账户使用指南

1. **启动前配置**
   - 后端默认使用 `backend/users.db` 的 SQLite 数据库，程序启动时会自动检查并补齐所需的 `role` 字段。
   - 管理员注册已默认启用授权口令 **`nzcnb`**，且任何管理员账号都必须提供该口令。若需更换，可在 `backend/.env`（或系统环境变量）中覆盖 `ADMIN_REGISTRATION_CODE=<新的口令>`。
   - 如需重新开放免口令的首位管理员注册，可显式设置 `ALLOW_INITIAL_ADMIN_WITHOUT_CODE=true`；默认值为 `false`。
   - 建议同时设置 `SECRET_KEY` 以自定义 Flask 会话密钥。
2. **启动服务**
   - 在 `backend/` 运行 `python app.py`（或 `flask run` 等方式），启动日志中若出现 “DB INIT” 相关信息即表示数据库结构已就绪。
   - 在 `frontend/` 运行 `python -m http.server 8000` 启动静态资源服务。
3. **注册与登录**
   - 打开 `http://127.0.0.1:8000/index.html`，点击首页右上角的 “注册/登录”。
   - 普通用户直接填写用户名、邮箱、密码即可注册；管理员需额外输入授权口令。
   - 注册成功后系统会切换到登录面板，登录后页眉会展示当前账号名与对应的角色徽章。
4. **切换账号 / 退出登录**
   - 点击页眉右侧的用户菜单，选择 “退出登录” 即可清除当前会话，界面立即恢复为未登录状态。
5. **常见问题**
   - 若仍看到 “no column named role” 等提示，请确认后端已重新启动并加载最新代码。
   - 前端默认通过 `http://127.0.0.1:5000` 调用后端，如需变更可在 `frontend/js/main.js` 顶部的 `AUTH_API_BASE_URL` 进行覆盖。
