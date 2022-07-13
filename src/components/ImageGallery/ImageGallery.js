import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { nanoid } from 'nanoid';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  state = {
    gallery: null,
    page: 1,
    isLoading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.galleryImgName !== this.props.galleryImgName) {
      this.setState({ isLoading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.galleryImgName}&page=${this.state.page}&key=27612779-03056b38fcc0dd588e982ef22&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(gallery => {
          if (gallery.hits.length === 0) {
            return Promise.reject(new Error('поиск не дал результата'));
          }
          this.setState({ gallery: gallery.hits });
          this.setState({ isLoading: false });
        })
        .catch(err => {
          toast.error('За такими даними картинок не знайденно!');
          this.setState({ isLoading: false });
          this.setState({ gallery: null });
        });
    }
  }
  onLoad = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
    this.setState({ isLoading: true });
    fetch(
      `https://pixabay.com/api/?q=${this.props.galleryImgName}&page=${this.state.page}&key=27612779-03056b38fcc0dd588e982ef22&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(gallery =>
        this.setState(
          prev => ({ gallery: [...prev.gallery, ...gallery.hits] }),
          this.setState({ isLoading: false })
        )
      );
  };

  render() {
    return (
      <div>
        <ul className="ImageGallery">
          {this.state.gallery && (
            <div className="ImageGallery">
              {this.state.gallery.map(item => (
                <ImageGalleryItem
                  key={nanoid()}
                  item={item}
                  onClick={this.props.showModal}
                />
              ))}
            </div>
          )}
        </ul>
        {this.state.isLoading && (
          <div>
            (<Loader />)
          </div>
        )}
        {this.state.gallery && <Button loadmore={this.onLoad} />}
      </div>
    );
  }
}
