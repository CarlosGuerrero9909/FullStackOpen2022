import { useState, useEffect, useLayoutEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useCallback } from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      const user = loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'LoggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedBlogAppUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <div>
        <h3>Log in into application</h3>
        <form onSubmit={handleLogin}>
          <div>
            username 
            <input
            type='text'
            name='Username'
            value={username}
            onChange={target => setUsername(target.value)}
            />
          </div>
          <div>
            password 
            <input
            type='password'
            name='Password'
            value={password}
            onChange={target => setPassword(target.value)}
            />
          </div>
          <button type='submit'>Log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage}/>
      {
        user === null ? 
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p> 
          <button onClick={handleLogout}>Log out</button>
        </div>
      }
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
  )
}

export default App