"use client"
// 导入路由依赖
import { useRoutes } from "react-router-dom";
// 导入所需组件，首页  关于
// import HomeView from "./hooks/useEffect/connect-to-chat";
import dynamic from 'next/dynamic'

// 创建路由
const routes = [
  {
    path: "/",
    element: dynamic(() => import('./hooks/useEffect/connect-to-chat'), { ssr: false})
  },
  {
    path: "/about",
    element:dynamic(() => import('./hooks/useEffect/connect-to-chat'), { ssr: false})
  },
];
// 使用useRoutes 创建
export default function RouterView() {
  // 创建路由
  const elem = useRoutes(routes);
  // 返回接口
  return elem;
}
