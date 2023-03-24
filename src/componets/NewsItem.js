import React, { Component } from 'react'

export class NewsItem extends Component {



  render() {
    // ex {imageurl} so this value is render from "this.props" 
    let { title, description, imageurl, newsurl, author, date, source } = this.props


    //  in news use title pics and description ane next-page url give their value in this part
    return (
      <div className='my-3'>
        <div className="card " >

          <div>
          <span class=" badge rounded-pill bg-danger" style={{display:'flex', justifyContent:'flex-end', position:'absolute' , right:'0' }}>{source}</span>

          </div>
          <img src={!imageurl ? "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> {title}

            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text" ><small className="text-muted">by {!author ? "Unknow" : author} on {new Date(date).toGMTString()}</small> </p>

            {/* Change the button style */}
            <a href={newsurl} target='_blank' className="btn   button" rel="noreferrer"><span>read more</span></a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
