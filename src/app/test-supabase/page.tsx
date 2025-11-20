'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabase() {
  const [result, setResult] = useState('')

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('sessions').select('count')
      setResult(JSON.stringify({ data, error }, null, 2))
    } catch (err) {
      setResult('Error: ' + err)
    }
  }

  return (
    <div className="p-4">
      <h1>Supabase接続テスト</h1>
      <pre>{result}</pre>
    </div>
  )
}