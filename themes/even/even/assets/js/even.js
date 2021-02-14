'use strict';

const Even = {};

Even._initToc = function () {
  const SPACING = 20;
  const toc = document.querySelector('.post-toc');
  const footer = document.querySelector('.post-footer');

  if (toc.length) {
    const minScrollTop = toc.getBoundingClientRect().top + document.body.scrollTop - SPACING;
    const maxScrollTop = footer.getBoundingClientRect().top + document.body.scrollTop - toc.height() - SPACING;

    const tocState = {
      start: {
        'position': 'absolute',
        'top': minScrollTop,
      },
      process: {
        'position': 'fixed',
        'top': SPACING,
      },
      end: {
        'position': 'absolute',
        'top': maxScrollTop,
      },
    };

    window.scroll(function () {
      const scrollTop = window.scrollTop();

      if (scrollTop < minScrollTop) {
        toc.css(tocState.start);
      } else if (scrollTop > maxScrollTop) {
        toc.css(tocState.end);
      } else {
        toc.css(tocState.process);
      }
    });
  }

  const HEADERFIX = 30;
  const toclink = document.querySelector('.toc-link');
  const headerlink = document.querySelectorAll('.headerlink');
  const tocLinkLis = document.querySelector('.post-toc-content li');

  const headerlinkTop = Array.from(headerlink).map(function (link) {
    return link.getBoundingClientRect().top + document.body.scrollTop;
  });

  const headerLinksOffsetForSearch = Array.from(headerlinkTop).map(function (offset) {
    return offset - HEADERFIX;
  });

  const searchActiveTocIndex = function (array, target) {
    for (let i = 0; i < array.length - 1; i++) {
      if (target > array[i] && target <= array[i + 1]) return i;
    }
    if (target > array[array.length - 1]) return array.length - 1;
    return -1;
  };

  window.scroll(function () {
    const scrollTop = window.scrollTop();
    const activeTocIndex = searchActiveTocIndex(headerLinksOffsetForSearch, scrollTop);

    toclink.classList.remove('active');
    tocLinkLis.classList.remove('has-active');

    if (activeTocIndex !== -1 && toclink[activeTocIndex] != null) {
      toclink[activeTocIndex].classList.add('active');
      let ancestor = toclink[activeTocIndex].parentNode;
      while (ancestor.tagName !== 'NAV') {
        ancestor.classList.add('has-active');
        ancestor = ancestor.parentNode.parentNode;
      }
    }
  });
};

Even.chroma = function () {
  const blocks = document.querySelectorAll('.highlight > .chroma');
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const afterHighLight = block.querySelector('pre.chroma > code[data-lang]');
    const lang = afterHighLight ? afterHighLight.className : '';
    block.className += ' ' + lang;
  }
};

Even.toc = function () {
  const tocContainer = document.getElementById('post-toc');
  if (tocContainer !== null) {
    const toc = document.getElementById('TableOfContents');
    if (toc === null) {
      // toc = true, but there are no headings
      tocContainer.parentNode.removeChild(tocContainer);
    } else {
      this._refactorToc(toc);
      this._linkToc();
      this._initToc();
    }
  }
};

Even._refactorToc = function (toc) {
  // when headings do not start with `h1`
  const oldTocList = toc.children[0];
  let newTocList = oldTocList;
  let temp;
  while (newTocList.children.length === 1
    && (temp = newTocList.children[0].children[0]).tagName === 'UL') {
    newTocList = temp;
  }

  if (newTocList !== oldTocList) toc.replaceChild(newTocList, oldTocList);
};

Even._linkToc = function () {
  const links = document.querySelectorAll('#TableOfContents a:first-child');
  for (let i = 0; i < links.length; i++) links[i].className += ' toc-link';

  for (let num = 1; num <= 6; num++) {
    const headers = document.querySelectorAll('.post-content>h' + num);
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      header.innerHTML = `<a href="#${header.id}" class="headerlink anchor"><i class="iconfont icon-link"></i></a>${header.innerHTML}`;
    }
  }
};

Even.responsiveTable = function () {
  const tables = document.querySelectorAll('.post-content table:not(.lntable)');
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentElement.replaceChild(wrapper, table);
    wrapper.appendChild(table);
  }
};

