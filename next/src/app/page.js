// use client

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div onClick={() => { console.log("123"); }}>按钮</div>
    </main>
  )
}