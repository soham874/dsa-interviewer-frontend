import { useState, useEffect } from 'react'
import App from './App'
import Login from './login'
import { API_BASE_URL } from './config'

const AuthRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/me`, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                setIsAuthenticated(data.authenticated)
            } else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? <App /> : <Login />
}

export default AuthRouter
