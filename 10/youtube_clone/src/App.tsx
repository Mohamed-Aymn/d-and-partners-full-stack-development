import './App.css'
import Navbar from "@/components/Navbar"
import VideoCard from './components/VideoCard'

function App() {
  const data = [
    {
      title: "hello1",
      description: "hellohellohellohellohellohellohellohello"
    },
    {
      title: "hello1",
      description: "hellohellohellohellohellohellohellohello"
    },
    {
      title: "hello1",
      description: "hellohellohellohellohellohellohellohello"
    },
    {
      title: "hello1",
      description: "hellohellohellohellohellohellohellohello"
    },
  ]


  return (
    <>
      <Navbar />

      {/* aside - body */}
      <main>
        {data.map((item) => {
          return (
            <VideoCard title={item.title} description={item.description} />
          )
        })}
      </main>
    </>
  )
}

export default App
