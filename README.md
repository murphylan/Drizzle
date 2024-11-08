<div align="center"><strong>Next.js 15 Admin Dashboard Template</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="https://next-admin-dash.vercel.app/">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Clone & Deploy</a>
<span>
</div>

## Overview

This is a starter template using the following stack:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Auth.js](https://authjs.dev)
- Database - [Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

1. 准备Postgres数据库。
2. 安装依赖
   
```bash
  pnpm install
```

3. 准备环境变量，修改`.env.example`文件为`.env`文件，同时修改里面的的环境变量
4. 初始化数据库，依次执行下列命令：

```bash
 pnpm run db:generate # 使用 drizzle-kit 工具生成数据库迁移文件
 pnpm run db:migrate # 运行 migrate.ts 文件，以执行数据库迁移操作
 pnpm run db:seed # 将预定义的数据插入数据库，生成测试数据
```

5. 启动应用
   
```bash
  pnpm dev
```


You should now be able to access the application at http://localhost:3000.
