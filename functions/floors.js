export async function onRequestGet(context) {
  const supabaseUrl = context.env.SUPABASE_URL
  const supabaseKey = context.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return new Response(
      JSON.stringify({
        error: 'Cloudflare側のSupabase設定がまだありません'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/floors?select=id,name,sort_order,map_image_url,is_public&is_public=eq.true&order=sort_order.asc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    }
  )

  const data = await response.text()

  return new Response(data, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
