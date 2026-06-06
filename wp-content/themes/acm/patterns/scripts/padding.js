/**
 * Function that adjusts main tag's margin top based on visibility of sub-menu
 * using vanilla JS.
 *
 *
 */
function makeAllElementsVisible() {
  //   if sub-menu is active and there is no banner present on the page, then give main text area 42px margin or padding
  //   it will help to make all content visible to the user
  //   this is needed only if the viewport width is more then 1130px

  if (window.innerWidth > 1130) {
    const subMenu = document.querySelector('#primary-menu .active .sub-menu');
    const banner = document.querySelector('.banner-container');
    const mainTextArea = document.querySelector('main > .columns');

    if (subMenu && !banner) {
      mainTextArea.style.marginTop = '42px';
    }
  } else {
    return;
  }
}

export default makeAllElementsVisible;
