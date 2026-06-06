/**
 * Function adds class "active" to menu items (when you go the the page, you see what page is currently shown to you)
 * Function is responsible for responsive adjustments in interface
 * Function is written using jQuery.
 *
 *
 */
function navigation() {
  var newLi;

  $(function () {
    var url = window.location.href;
    $('#primary-menu a').each(function () {
      if (url === this.href) {
        $(this).closest('li').addClass('active');
        navArray();
      }
    });
  });

  $(function () {
    var url = window.location.href;
    $('.sub-menu a').each(function () {
      if (url === this.href) {
        $(this).parent().parent().parent().addClass('active');
        navArray();
      }
    });
  });

  $(window).resize(function () {
    if ($(window).width() > 1129) {
      navArray();
    } else {
      $('.nav__dropdown-toggle').css('display', 'none');
    }
  });

  if ($(window).width() < 1129) {
    var navItems = $('.nav-menu li a');
    navItems.each(function () {
      if ($(this).siblings('.sub-menu').length) {
        $(this).attr('onclick', 'return false');
        console.log($(this));
        console.log($(this).siblings());
      } else {
        $(this).attr('onclick', 'return true');
      }
    });
    $('.active').addClass('hover');
  }

  if ($(window).width() > 1130) {
    $('.nav-menu li a').attr('onclick', 'return true');
  }

  if ($(window).width() < 1129) {
    $('.sub-menu li a').attr('onclick', 'return true');
  }

  $(window).resize(function () {
    if ($(window).width() < 1129) {
      var navItems = $('.nav-menu li a');
      navItems.each(function () {
        if ($(this).siblings('.sub-menu').length) {
          $(this).attr('onclick', 'return false');
          console.log($(this));
          console.log($(this).siblings());
        } else {
          $(this).attr('onclick', 'return true');
        }
      });
    }

    if ($(window).width() > 1130) {
      $('.nav-menu li a').attr('onclick', 'return true');
    }

    if ($(window).width() < 1129) {
      $('.sub-menu li a').attr('onclick', 'return true');
    }
  });

  $('.nav-menu li').click(function () {
    if ($(this).hasClass('hover')) {
      $(this).removeClass('hover');
    } else {
      $('li').removeClass('hover');
      $(this).addClass('hover');
    }
  });

  /**
   * Function is written using jQuery.
   *
   *
   */
  function navArray() {
    var listItems = $('.active ul li');
    var totalWidth = 0;
    var extraItems = [];
    listItems.each(function (index, li) {
      totalWidth += li.offsetWidth;
      if (totalWidth > 1050) {
        extraItems.push($(li));
        newLi = $(li);
        $('.more-list-box').append(newLi);
        $(li).css('display', 'none');
        $('.nav__dropdown-toggle').addClass('present');
      }
      if ($('.nav__dropdown-toggle').hasClass('present')) {
        $('.nav__dropdown-toggle').css('display', 'block');
      } else {
        $('.nav__dropdown-toggle').css('display', 'none');
      }
    });
  }

  var bool = false;

  $('.nav__dropdown-toggle').click(function () {
    if (bool === false) {
      $('.more-list-box').css('display', 'block');
      $('.nav__dropdown-toggle').addClass('is-open');
      bool = true;
    } else if (bool === true) {
      $('.more-list-box').css('display', 'none');
      $('.nav__dropdown-toggle').removeClass('is-open');
      bool = false;
    }
  });

  // This function toggles mobile menu see acm.js previous commits for more details (search for this function there)
  $('.top-bar .menu-icon a').click(function (e) {
    e.preventDefault();
    $(this)
      .parents('.top-bar')
      .find('.top-bar-section')
      .stop()
      .slideToggle(function () {
        'none' === $(this).css('display') && $(this).css({ display: '' });
      });
  });

  if ($(window).width() > 1129) {
    navArray();
  } else {
    $('.nav__dropdown-toggle').css('display', 'none');
  }
}

export default navigation;
