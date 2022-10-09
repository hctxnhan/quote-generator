async function getRandomQuote() {
  let url = 'https://api.quotable.io/random';

  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

const quote = document.querySelector('.quote');
const author = document.querySelector('.quote__author');
const quoteContainer = document.querySelector('.quote-container');
console.log(quote, author);

function setQuote(data) {
  if (!data) {
    quote.innerText = 'Oops! Something went wrong!';
    author.innerText = '';
    return;
  }
  quote.innerText = data.content;
  author.innerText = data.author ? data.author : 'Unknown';

  console.log(data.content.length);

  if (data.content.length > 130) {
    quote.classList.add('quote--long');
  } else {
    quote.classList.remove('quote--long');
  }
}

const loading = document.querySelector('.loading-container');
loading.hidden = true;
console.log(quoteContainer);

function stopLoading() {
  loading.hidden = true;
  quoteContainer.style.display = '';
}

function startLoading() {
  loading.hidden = false;
  quoteContainer.style.display = 'none';
}

const nextBtn = document.querySelector('.next-button');

function getQuote() {
  startLoading();
  getRandomQuote()
    .then((data) => {
      stopLoading();
      setQuote(data);
    })
    .catch((error) => setQuote(null));
}

getQuote();

nextBtn.addEventListener('click', () => {
  getQuote();
});
