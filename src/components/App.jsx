import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import './styles.css';

export class App extends Component {
  state = {
    galleryImgName: '',
    currentImg: [],
    showModal: false,
    gallery: null,
    page: 1,
    isLoading: false,
    totalHits: 0,
    err: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.galleryImgName !== this.state.galleryImgName ||
      prevState.page !== this.state.page
    ) {
      this.doFetch();
    }
  }

  doFetch() {
    this.setState({ isLoading: true });
    fetch(
      `https://pixabay.com/api/?q=${this.state.galleryImgName}&page=${this.state.page}&key=27612779-03056b38fcc0dd588e982ef22&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(resp => resp.json())
      .then(gallery => {
        if (gallery.hits.length === 0) {
          this.setState({
            gallery: gallery.hits,
            totalHits: gallery.totalHits,
            isLoading: false,
            err: null,
          });
          return toast.error('Нажаль за даним запитом картонок не знайденно');
        }
        this.handleResponse(gallery);
      })
      .catch(err => this.setState({ err }))
      .finally(this.setState(prev => ({ isLoading: false })));
  }
  handleResponse(gallery) {
    this.state.gallery.length === 0
      ? this.setState({
          gallery: gallery.hits,
          totalHits: gallery.totalHits,
          isLoading: false,
          err: null,
        })
      : this.setState(prev => ({
          gallery: [...prev.gallery, ...gallery.hits],
          isLoading: false,
          err: null,
        }));
  }

  onLoad = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  onSubmit = evt => {
    evt.preventDefault();
    this.setState({
      galleryImgName: evt.target.elements.searchName.value.trim().toLowerCase(),
      page: 1,
      gallery: [],
    });
  };

  toggleModal = img => {
    this.setState(prev => ({ showModal: !prev.showModal, currentImg: img }));
  };
  handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) this.toggleModal({});
  };
  handleEsc = evt => {
    if (evt.code === 'Escape') this.toggleModal({});
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          galleryImgName={this.state.galleryImgName}
          showModal={this.toggleModal}
          gallery={this.state.gallery}
          modal={this.state.showModal}
          totalHits={this.state.totalHits}
          page={this.state.page}
          loadmore={this.onLoad}
          isLoading={this.isLoading}
        />
        {this.state.isLoading && (
          <div>
            (<Loader />)
          </div>
        )}

        {this.state.showModal && (
          <Modal
            handleOverlayClick={this.handleOverlayClick}
            onEsc={this.handleEsc}
            currentImg={this.state.currentImg}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
