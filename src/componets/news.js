import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  // adding categry and proptype
  // eslint-disable-next-line react/no-typos
  static defaultprops = {
    countrt: 'in',
    pagesize: 8,
    catagory: 'general',
  }

  static propType = {
    countrt: PropTypes.string,
    pagesize: PropTypes.number,
    catagory: PropTypes.string,
  }
  // TO capital 1st latter on title 
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;

  }


  async updateNews(props) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=5aa6df3a4dd54192abe8f6d015e544d1&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.props.setProgress(30);
    
    this.setState({ loading: true });
    
    const data = await fetch(url);
    const parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
    console.log(parsedData);
  }

  async componentDidMount() {
    // const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=5aa6df3a4dd54192abe8f6d015e544d1&pagesize=${this.props.pagesize}`;

    // this.setState({ loading: true });

    // const data = await fetch(url);
    // const parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    //  });
    this.updateNews();
  }

  handlePrevious = async () => {
    // console.log('previous');
    // const { page } = this.state;
    // const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=5aa6df3a4dd54192abe8f6d015e544d1&page=${page - 1}&pagesize=${this.props.pagesize}`;

    // this.setState({ loading: true });

    // const data = await fetch(url);
    // const parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   page: page - 1,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNext = async () => {

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=5aa6df3a4dd54192abe8f6d015e544d1&page=${this.state.page +1}&pagesize=${this.props.pagesize}`;
    this.setState({page: this.page + 1})
    
    // this.setState({ loading: true });

    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
    
  };

  render() {

    // use "this" to import value from same function
    const { articles,   } = this.state; // page, totalResults /- REmove to this line
    return (


      <>
        <h1 className='text-center' style={{margin:'35px 0px', marginTop: '90px'}}>TopNews - TopHeadline News on {this.capitalizeFirstLetter(this.props.category)}</h1>

        {/* Add Spiner whne page is loading */}
        {this.state.loading && <Spinner />}
        
        {/* Add infinite Scrollar */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >

          <div className="container">
          <div className='row'>
            {articles.map((element) => (
              <div className='col-md-4' key={element.url}>

                {/* This is a main part of news */}
                <NewsItem
                  title = {element.title? element.title.slice(0, 40) : ' '}
                  description={element.description ? element.description.slice(0, 88) : ' '}
                  imageurl={element.urlToImage}
                  newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                />
              </div>
            ))}
          </div>
          </div>
              </InfiniteScroll>

          {/* <div className='container d-flex justify-content-between'>
            <button
              type='button'
              className='btn btn-dark'
              onClick={this.handlePrevious}
              disabled={page <= 1}
            >
              &larr; Previous
            </button>
            <button
              type='button'
              className='btn btn-dark'
              onClick={this.handleNext}
              disabled={page + 1 > Math.ceil(totalResults / this.props.pagesize)}
            >
              Next &rarr;
            </button>
          </div> */}
      </>
    );
  }
}

export default News;
