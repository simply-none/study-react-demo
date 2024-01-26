import { Profiler, StrictMode } from "react";
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
  /**
   * 渲染性能分析
   * @param {*} id 测量的ui目标
   * @param {*} phase 测量ui目标的渲染阶段（mount、update、nested-update）
   * @param {*} actualDuration 实际渲染时间
   * @param {*} baseDuration 使用记忆化（memo、useMemo）前的渲染时间，即未优化的渲染时间
   * @param {*} startTime
   * @param {*} commitTime 
   */
  function onRender (id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, 'args')
  }

  return (
    <Profiler id="StrictMode" onRender={onRender}>
      <StrictMode>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StrictMode>
    </Profiler>
  );
}
