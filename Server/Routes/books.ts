// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let newBook = new book({
       Title: "",
       Description: "",
       Price: "",
       Author: "",
       Genre: ""
     });

     res.render('books/details', {
      title: 'Add Book',
      page: 'Add Book', 
      books:newBook
    })   

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let newBook = new book({
      Title: req.body.title,
      Description: req.body.author,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
  });

  book.create(newBook, (err, book) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     book.findById(id, (err:any, bookToEdit:any) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             //show the edit view
             res.render('books/details', {title: 'Edit Book',
             page: 'edit Book', books: bookToEdit})
         }
     });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id

    let updatedBook = new book({
        _id: id,
        Title: req.body.title,
        Description: req.body.author,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre
    });

    book.updateOne({_id: id}, updatedBook, (err:any) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/books');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     book.remove({_id: id}, (err:any) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
              // refresh the book list
              res.redirect('/books');
         }
     });
});


//module.exports = router;
