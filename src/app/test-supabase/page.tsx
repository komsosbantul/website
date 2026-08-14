import { createClient } from '@/utils/supabase/server'

export default async function TestSupabase() {
  const supabase = await createClient()
  
  // Try to fetch gallery events to inspect structure
  const { data, error } = await supabase.from('gallery_events').select('*').limit(1)

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-4">Supabase Data Inspection</h1>
      
      {error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded border border-red-200">
          <h2 className="font-bold">Error ❌</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      ) : (
        <div className="bg-green-50 text-green-700 p-4 rounded border border-green-200">
          <h2 className="font-bold">Last Gallery Event Data:</h2>
          <pre className="mt-4 bg-slate-900 text-slate-50 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
