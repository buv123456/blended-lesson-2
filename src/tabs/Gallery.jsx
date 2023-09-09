import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    isEmpty: false,
    isVisible: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page)
    } 
  }
  
  getPhotos = async(query, page) => {
    if (!query) {
      return
    }
    this.setState({isLoading: true})
    try {
      const { photos, total_results, per_page, page: currentPage } = await ImageService.getImages(query, page)
      if (photos.length === 0) {
        this.setState({isEmpty: true})
      }
      /* console.log(Math.ceil(total_results / per_page), 'hi') */
      this.setState(prevState => ({images: [...prevState.images, ...photos], isVisible: currentPage < Math.ceil(total_results / per_page)})) 
    } catch(error) {
      this.setState({error: error.message})
    } finally {
      this.setState({isLoading: false})
    }
  }

  onHandleSubmit = value => {
    this.setState({ query: value });
  };

  render() {
    console.log(this.state.query);
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
