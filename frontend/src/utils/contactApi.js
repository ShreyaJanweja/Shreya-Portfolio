// Contact form API utility
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export const sendContact = async (formData) => {
  const response = await fetch(`${BACKEND_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  const data = await response.json()
  return data
}

