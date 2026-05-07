import React from 'react'
import image from '../assets/news.jpg'
const NewsItem = ({title,description,src,url}) => {
  return (
    
 <div className="card bg-dark text-light h-100" style={{maxWidth:"345px"}}>
  <img src={src?src:image}  className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title.slice(0,50)}</h5>
    <p className="card-text">{description?description.slice(0,90):"It is information about something that has just happened."}</p>
    <a href={url} className="btn btn-primary">Read More</a>
  </div>
</div>
  )
}

export default NewsItem
