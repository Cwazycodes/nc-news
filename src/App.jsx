import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ArticleList from './components/ArticleList'
import './index.css' 
import Header from './components/Header'
import ArticleDetailPage from './components/ArticleDetailPage'

const App = () => {
  return (
    <Router>
      <div className='app'>
       <Header />
      <main>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path='/articles/:article_id' element={<ArticleDetailPage />} />
        </Routes>
      </main>
      </div>
    </Router>
  )
}

export default App