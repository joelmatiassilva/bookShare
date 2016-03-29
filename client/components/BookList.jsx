import React from 'react';
import Slider from 'react-slick';
import {BookListEntryContainer} from './BookListEntry';

class BookList extends React.Component{
  render(){
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return <div className="book-list">
    <Slider {settings}>
      {this.props.books ? this.props.books.map((book) => {
        return <BookListEntryContainer {...book} key={book.id} />
      }) : null}
      </Slider>
    </div>;
  }
}

export default BookList;