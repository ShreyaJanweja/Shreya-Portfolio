// Contact form API utility
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export const sendContact = async (formData) => {
  try {
    console.log('📤 Sending contact form to:', `${BACKEND_URL}/api/contact`)
    console.log('📋 Form data:', formData)
    
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    console.log('📬 Response status:', response.status, response.statusText)
    
    const data = await response.json()
    console.log('📨 Response data:', data)

    if (!response.ok) {
      const errorMessage = data.error || `HTTP Error: ${response.status}`
      console.error('❌ API Error:', errorMessage)
      throw new Error(errorMessage)
    }

    console.log('✅ Message sent successfully!')
    return data
  } catch (error) {
    console.error('❌ Contact API Error:', {
      message: error.message,
      stack: error.stack,
      url: `${BACKEND_URL}/api/contact`
    })
    throw error
  }
}

