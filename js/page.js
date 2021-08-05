
if (window.location.pathname == '/blog-empty.html') {
  document.getElementById('grid-shop').onclick = () => {window.location.href = 'shop-empty.html';};
  document.getElementById('grid-landing').onclick = () => {window.location.href = 'landing-empty.html';};
} else if (window.location.pathname == '/shop-empty.html') {
  document.getElementById('grid-landing').onclick = () => {window.location.href = 'landing-empty.html';};
  document.getElementById('grid-blog').onclick = (event) => {window.location.href = 'blog-empty.html';};
} else if (window.location.pathname == '/landing-empty.html') {
  document.getElementById('grid-blog').onclick = (event) => {window.location.href = 'blog-empty.html';};
  document.getElementById('grid-shop').onclick = () => {window.location.href = 'shop-empty.html';};
}

function hide () {
  const all = document.querySelectorAll('.choose-elem');
  all.forEach(el => {
    if (!el.classList.contains('visually-hidden')) {
      el.classList.add('visually-hidden');
    }
  });
}
hide();

const createElem = (elem, parent) => {
  const txtParent = parent.classList[0].slice('-');
  if (!parent.querySelector(`.${txtParent}__elements-wrapper`)) {
    let wrap = document.createElement('div');
    wrap.classList.add(`${txtParent}__elements-wrapper`);
    parent.appendChild(wrap);
  }
  let wrap = parent.querySelector(`.${txtParent}__elements-wrapper`)
  let new_div = document.createElement('div');
  new_div.classList.add('element');

  if (elem == 'h1') {
    new_div.classList.add('title');
    let new_element = document.createElement('h1');
    new_element.innerText = 'Заголовок H1';
    new_element.setAttribute('contenteditable', "true");
    new_div.appendChild(new_element);
  }
  else if (elem == 'h2') {
    new_div.classList.add('title');
    let new_element = document.createElement('h2');
    new_element.innerText = 'Заголовок H2';
    new_element.setAttribute('contenteditable', "true");
    new_div.appendChild(new_element);
  }
  else if (elem == 'h3') {
    new_div.classList.add('title');
    let new_element = document.createElement('h3');
    new_element.innerText = 'Заголовок H3';
    new_element.setAttribute('contenteditable', "true");
    new_div.appendChild(new_element);
  }
  else if (elem == 'p') {
    new_div.classList.add('text');
    let new_element = document.createElement('p');
    new_element.innerText = 'Абзац текста';
    new_element.setAttribute('contenteditable', "true");
    new_div.appendChild(new_element);
  }
  else if (elem == 'img') {
    new_div.classList.add('element--image');
    new_div.classList.add('image');

    let new_element = document.createElement('div');
    new_element.classList.add('img-upload');

    let p = document.createElement('p');
    p.innerText = 'Загрузите изображение';
    new_element.appendChild(p);

    let inputt = document.createElement('input');
    inputt.setAttribute('type', 'url');
    inputt.classList.add('content-element')
    inputt.setAttribute('placeholder', 'Вставьте ссылку на изображение');

    let label = document.createElement('label');
    label.classList.add('img-upload__label');
    label.innerHTML = `Загрузить`;

    new_element.appendChild(inputt);
    new_element.appendChild(label);

    if (parent.classList[0] != 'content') {
      let new_svg = document.createElement('button');
      new_svg.classList.add('add-img-btn');
      new_svg.setAttribute('type', "button");

      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      svg.setAttribute('width', '32');
      svg.setAttribute('height', '32');
      svg.setAttribute('viewBox', '0 0 48 48');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('clip-rule', 'evenodd');
      path.setAttribute('d', 'M6 2V8H0V12H6V18H10V12H16V8H10V2H6ZM12 14V20H6V40C6 42.2 7.8 44 10 44H42C44.2 44 46 42.2 46 40V16C46 13.8 44.2 12 42 12H35.66L32 8H18V14H12ZM26 38C31.52 38 36 33.52 36 28C36 22.48 31.52 18 26 18C20.48 18 16 22.48 16 28C16 33.52 20.48 38 26 38ZM26 34C22.68 34 20 31.32 20 28C20 24.68 22.68 22 26 22C29.32 22 32 24.68 32 28C32 31.32 29.32 34 26 34Z');

      svg.appendChild(path);
      new_svg.appendChild(svg);
      new_div.appendChild(new_svg);

      new_svg.addEventListener('click', function() {
        new_div.classList.add('element--uploading');
      })
    }

    new_div.appendChild(new_element);

    label.addEventListener('click', function() {
      let imgSrc = inputt.value;
      console.log(imgSrc, typeof(imgSrc))
      if (imgSrc != '') {
        new_div.classList.remove('element--image');
        new_div.classList.add('element--uploaded');

        let img = document.createElement('img');
        if (imgSrc == 'default') {
          img.setAttribute('src', 'img/default.jpg');
        } else {
          img.setAttribute('src', imgSrc);
        }
        new_div.appendChild(img)
      }

    new_div.classList.remove('element--uploading');
    })
  }

  let button = document.createElement('button');
  button.classList.add('delete-btn');
  let span = document.createElement('span');
  span.classList.add('visually-hidden');
  span.innerText = 'Удалить элемент';
  button.appendChild(span);
  new_div.appendChild(button);

  button.addEventListener('click', function() {
    new_div.remove();
    if (wrap.children.length == 0) {
      wrap.remove();
      parent.classList.add(`${txtParent}--empty`)
    }
  })

  wrap.appendChild(new_div);
}

const foo = (boxName, box_empty) => {
  const box = document.querySelector(boxName);
  const box__add_btn = box.querySelector('.add-btn');
  const box__choose_el = box.querySelector('.choose-elem');
  box__add_btn.addEventListener('click', function (evt) {
    box__choose_el.classList.remove('visually-hidden');
  });

  box__choose_el.children[0].addEventListener('click', function(evt) {
    if (box.classList.contains(box_empty)) {
      box.classList.remove(box_empty);
    }

    createElem('h1', box);
    
    hide();
  })

  box__choose_el.children[1].addEventListener('click', function(evt) {
    if (box.classList.contains(box_empty)) {
      box.classList.remove(box_empty);
    }
    
    createElem('h2', box);

    hide();
  })

  box__choose_el.children[2].addEventListener('click', function(evt) {
    if (box.classList.contains(box_empty)) {
      box.classList.remove(box_empty);
    }
    
    createElem('h3', box);

    hide();
  })

  box__choose_el.children[3].addEventListener('click', function(evt) {
    if (box.classList.contains(box_empty)) {
      box.classList.remove(box_empty);
    }
    
    createElem('p', box);

    hide();
  })

  box__choose_el.children[4].addEventListener('click', function(evt) {
    if (box.classList.contains(box_empty)) {
      box.classList.remove(box_empty);
    }
    
    createElem('img', box);

    hide();
  })
}

foo('.header', 'header--empty');
foo('.content-1', 'content--empty');
if (document.querySelector('.content-2')) {foo('.content-2', 'content--empty')};
if (document.querySelector('.content-3')) {foo('.content-3', 'content--empty')};
foo('.footer', 'footer--empty');