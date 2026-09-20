import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('Cloudflare経由で階数を取得中...')
  const [floors, setFloors] = useState([])

  useEffect(() => {
    async function loadFloors() {
      try {
        const response = await fetch('/floors')

        if (!response.ok) {
          const text = await response.text()
          console.error(text)
          setStatus(`❌ エラー: ${response.status}`)
          return
        }

        const data = await response.json()

        setFloors(data)
        setStatus('✅ Cloudflare経由でSupabaseに接続成功！')
      } catch (error) {
        console.error(error)
        setStatus(`❌ 通信エラー: ${error.message}`)
      }
    }

    loadFloors()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'system-ui, sans-serif',
      background: '#f5f7fb'
    }}>
      <h1>九段校舎マップ</h1>

      <p>{status}</p>

      <h2>階数</h2>

      {floors.length === 0 ? (
        <p>階数データがありません。</p>
      ) : (
        floors.map((floor) => (
          <div
            key={floor.id}
            style={{
              background: 'white',
              padding: '16px',
              marginBottom: '10px',
              borderRadius: '12px'
            }}
          >
            <strong>{floor.name}</strong>
          </div>
        ))
      )}
    </div>
  )
}

export default App
