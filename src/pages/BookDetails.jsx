import React from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import "../styles/BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    // Simulate fetching book details from a local dataset
    const books = [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10.99, description: 'A classic novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.', reviews: [{ id: 1, content: 'Amazing book!' }, { id: 2, content: 'Loved the writing style.' }], image: 'https://via.placeholder.com/150x200?text=The+Great+Gatsby' },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 12.99, description: 'A novel about racial injustice and moral growth in the Deep South.', reviews: [{ id: 1, content: 'A must-read for everyone.' }, { id: 2, content: 'Very moving story.' }], image: 'https://via.placeholder.com/150x200?text=To+Kill+a+Mockingbird' },
      { id: 3, title: '1984', author: 'George Orwell', price: 14.99, description: 'A dystopian novel about totalitarianism and surveillance.', reviews: [{ id: 1, content: 'Chilling and thought-provoking.' }], image: 'https://via.placeholder.com/150x200?text=1984' },
      { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 9.99, description: 'A romantic novel about manners, marriage, and societal expectations.', reviews: [{ id: 1, content: 'Timeless classic!' }], image: 'https://via.placeholder.com/150x200?text=Pride+and+Prejudice' },
      { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 11.99, description: 'A story about teenage rebellion and self-discovery.', reviews: [{ id: 1, content: 'Relatable and raw.' }], image: 'https://via.placeholder.com/150x200?text=The+Catcher+in+the+Rye' },
      { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 13.99, description: 'A fantasy adventure about a hobbit’s journey to reclaim a lost treasure.', reviews: [{ id: 1, content: 'Magical and adventurous.' }], image: 'https://via.placeholder.com/150x200?text=The+Hobbit' },
      { id: 7, title: 'Moby Dick', author: 'Herman Melville', price: 15.99, description: 'A tale of obsession and revenge between a sailor and a great white whale.', reviews: [{ id: 1, content: 'A bit long, but worth it.' }], image: 'https://via.placeholder.com/150x200?text=Moby+Dick' },
      { id: 8, title: 'War and Peace', author: 'Leo Tolstoy', price: 19.99, description: 'An epic novel about Russian society during the Napoleonic Wars.', reviews: [{ id: 1, content: 'A masterpiece of literature.' }], image: 'https://via.placeholder.com/150x200?text=War+and+Peace' },
      { id: 9, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', price: 14.99, description: 'A psychological exploration of guilt and redemption.', reviews: [{ id: 1, content: 'Deep and thought-provoking.' }], image: 'https://via.placeholder.com/150x200?text=Crime+and+Punishment' },
      { id: 10, title: 'The Alchemist', author: 'Paulo Coelho', price: 10.99, description: 'A philosophical tale about following your dreams.', reviews: [{ id: 1, content: 'Inspiring and uplifting.' }], image: 'https://via.placeholder.com/150x200?text=The+Alchemist' },
      { id: 11, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', price: 25.99, description: 'An epic fantasy about the battle between good and evil.', reviews: [{ id: 1, content: 'A timeless classic.' }], image: 'https://via.placeholder.com/150x200?text=The+Lord+of+the+Rings' },
      { id: 12, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', price: 20.99, description: 'The magical beginning of Harry Potter’s journey.', reviews: [{ id: 1, content: 'Magical and captivating.' }], image: 'https://via.placeholder.com/150x200?text=Harry+Potter' },
      { id: 13, title: 'The Kite Runner', author: 'Khaled Hosseini', price: 12.99, description: 'A story of friendship, betrayal, and redemption.', reviews: [{ id: 1, content: 'Heartbreaking and beautiful.' }], image: 'https://via.placeholder.com/150x200?text=The+Kite+Runner' },
      { id: 14, title: 'The Book Thief', author: 'Markus Zusak', price: 11.99, description: 'A tale of love and loss during World War II.', reviews: [{ id: 1, content: 'A unique perspective on history.' }], image: 'https://via.placeholder.com/150x200?text=The+Book+Thief' },
      { id: 15, title: 'Brave New World', author: 'Aldous Huxley', price: 13.99, description: 'A dystopian novel about a technologically advanced society.', reviews: [{ id: 1, content: 'Fascinating and unsettling.' }], image: 'https://via.placeholder.com/150x200?text=Brave+New+World' },
      { id: 16, title: 'The Road', author: 'Cormac McCarthy', price: 14.99, description: 'A post-apocalyptic journey of survival and hope.', reviews: [{ id: 1, content: 'Haunting and powerful.' }], image: 'https://via.placeholder.com/150x200?text=The+Road' },
      { id: 17, title: 'The Shining', author: 'Stephen King', price: 16.99, description: 'A chilling tale of isolation and madness.', reviews: [{ id: 1, content: 'Terrifying and gripping.' }], image: 'https://via.placeholder.com/150x200?text=The+Shining' },
      { id: 18, title: 'Dracula', author: 'Bram Stoker', price: 10.99, description: 'The original vampire novel that started it all.', reviews: [{ id: 1, content: 'A gothic masterpiece.' }], image: 'https://via.placeholder.com/150x200?text=Dracula' },
      { id: 19, title: 'Frankenstein', author: 'Mary Shelley', price: 9.99, description: 'A tale of science, ambition, and unintended consequences.', reviews: [{ id: 1, content: 'A thought-provoking classic.' }], image: 'https://via.placeholder.com/150x200?text=Frankenstein' },
      { id: 20, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', price: 11.99, description: 'A story about vanity, morality, and the cost of eternal youth.', reviews: [{ id: 1, content: 'Dark and captivating.' }], image: 'https://via.placeholder.com/150x200?text=Dorian+Gray' },
        { id: 21, title: 'The Hunger Games', author: 'Suzanne Collins', price: 12.99, description: 'A dystopian novel about survival and rebellion in a totalitarian society.', reviews: [{ id: 1, content: 'Action-packed and thrilling.' }], image: 'https://via.placeholder.com/150x200?text=The+Hunger+Games' },
        { id: 22, title: 'Dune', author: 'Frank Herbert', price: 18.99, description: 'A science fiction epic about politics, religion, and ecology on a desert planet.', reviews: [{ id: 1, content: 'A masterpiece of sci-fi.' }], image: 'https://via.placeholder.com/150x200?text=Dune' },
        { id: 23, title: 'The Fault in Our Stars', author: 'John Green', price: 10.99, description: 'A touching story about love and loss between two teenagers with cancer.', reviews: [{ id: 1, content: 'Heartbreaking and beautiful.' }], image: 'https://via.placeholder.com/150x200?text=The+Fault+in+Our+Stars' },
        { id: 24, title: 'The Chronicles of Narnia', author: 'C.S. Lewis', price: 22.99, description: 'A fantasy series about children discovering a magical world through a wardrobe.', reviews: [{ id: 1, content: 'Enchanting and timeless.' }], image: 'https://via.placeholder.com/150x200?text=Narnia' },
        { id: 25, title: 'The Maze Runner', author: 'James Dashner', price: 11.99, description: 'A dystopian novel about teenagers trapped in a deadly maze.', reviews: [{ id: 1, content: 'Fast-paced and gripping.' }], image: 'https://via.placeholder.com/150x200?text=Maze+Runner' },
        { id: 26, title: 'Percy Jackson & The Olympians', author: 'Rick Riordan', price: 13.99, description: 'A modern fantasy series about a boy discovering he is a demigod.', reviews: [{ id: 1, content: 'Fun and adventurous.' }], image: 'https://via.placeholder.com/150x200?text=Percy+Jackson' },
        { id: 27, title: 'The Giver', author: 'Lois Lowry', price: 9.99, description: 'A dystopian novel about a boy discovering the truth about his seemingly perfect society.', reviews: [{ id: 1, content: 'Thought-provoking and emotional.' }], image: 'https://via.placeholder.com/150x200?text=The+Giver' },
        { id: 28, title: 'The Outsiders', author: 'S.E. Hinton', price: 8.99, description: 'A coming-of-age story about friendship and class struggles.', reviews: [{ id: 1, content: 'Raw and emotional.' }], image: 'https://via.placeholder.com/150x200?text=The+Outsiders' },
        { id: 29, title: 'The Secret Garden', author: 'Frances Hodgson Burnett', price: 7.99, description: 'A story about a young girl discovering a hidden garden and healing through nature.', reviews: [{ id: 1, content: 'Charming and uplifting.' }], image: 'https://via.placeholder.com/150x200?text=The+Secret+Garden' },
        { id: 30, title: 'Anne of Green Gables', author: 'L.M. Montgomery', price: 6.99, description: 'A heartwarming tale about an imaginative orphan finding a home.', reviews: [{ id: 1, content: 'Delightful and inspiring.' }], image: 'https://via.placeholder.com/150x200?text=Anne+of+Green+Gables' },
      
    ];

    const bookDetails = books.find((b) => b.id === parseInt(id));
    setBook(bookDetails);
  }, [id]);

  if (!book) {
    return <div>Book not found</div>;
  }

  const handleRating = (newRating) => {
    console.log(`Rated ${newRating} for book ID ${book.id}`);
    // Add logic to update the rating dynamically if needed
  };

  return (
    <div className="book-details">
      <img src={book.image} alt={book.title} className="book-image" />
      <h1>{book.title}</h1>
      <h2>By {book.author}</h2>
      <p>{book.description}</p>
      <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
      <Rating rating={4} onRate={handleRating} />
      <button className="add-to-cart-button">Add to Cart</button>
      <h3>Reviews</h3>
      <ul className="reviews-list">
        {book.reviews.map((review) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetails;