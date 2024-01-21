import Layout from '../components/layout'
 
const Page = () => {
  return <p>hello world</p>
}
 
Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      
    </Layout>
  )
}
 
export default Page