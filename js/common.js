// 갤러리 슬라이드
var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: true,
  loop: true,
  breakpoints: {
    720: {
      slidesPerView: 3,
      spaceBetween: 80,
    },
  }
});

// 헤더 고정
$(window).on('scroll', function(){
  // console.log( $(document).scrollTop() )
  if( $(document).scrollTop() > 100 ) {
    $('.header_top').addClass('scrolled')
  } else {
    $('.header_top').removeClass('scrolled')
  }
})

// 모바일 메뉴 열기 닫기
$('.btn_menu').on('click', function(){
  $('.header_top').addClass('opened')
  $('body').addClass('non_scroll')
})
$('.btn_menu_close').on('click', function(){
  $('.header_top').removeClass('opened')
  $('body').removeClass('non_scroll')
})

// 메일 보내기
$('#contact button').on('click', function(e){
  e.preventDefault()
  
  emailjs.init('deu4YkrzA2w3WmoNc');

  emailjs.sendForm('service_byrcinb', 'template_g15t1z1', '#myForm')
    .then(function(response) {
      alert('메일 전송 성공')
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      alert('메일 전송 실패')
       console.log('FAILED...', error);
    });
})

// 포트폴리오 리스트 만들기
let portfolioData = [ {
  'subject': '포트폴리오 1번라고 ~~!!',  
  'tags': ['남산 서울타워', '2022년 4월 완성', '3개월 걸림', '반응형', '혼자 작업함'],
  'imgsrc': ['./images/portfolio01.jpg', './images/portfolio01.jpg', './images/portfolio01.jpg'],
  'desc': '처음 퍼블리싱 배울때 공부삼아 ~~~ '
} , 
{
  'subject': '포트폴리오 2번입니다',  
  'tags': ['2개월 걸림', '반응형', '혼자 작업함'],
  'imgsrc': './images/portfolio02.jpg',
  'desc': '처음 퍼블리싱 배울때 공부삼아 ~~~ '
}, {
  'subject': '포트폴리오 3번입니다',  
  'tags': ['jacascript', '남산 서울타워', '2022년 4월 완성', '3개월 걸림', '반응형', '혼자 작업함'],
  'imgsrc': './images/portfolio03.jpg',
  'desc': '처음 퍼블리싱 배울때 공부삼아 ~~~ '
}, {
  'subject': '포트폴리오 4번입니다',  
  'tags': ['남산 서울타워', '2022년 4월 완성', '3개월 걸림', '반응형', '혼자 작업함'],
  'imgsrc': './images/portfolio04.jpg',
  'desc': '처음 퍼블리싱 배울때 공부삼아 ~~~ '
}, {
  'subject': '포트폴리오 5번입니다',  
  'tags': [ '2022년 8월 완성', '3개월 걸림', '반응형', '혼자 작업함'],
  'imgsrc': './images/portfolio05.jpg',
  'desc': '처음 퍼블리싱 배울때 공부삼아 ~~~ '
}, 
{
  'subject': '포트폴리오 6번입니다',  
  'tags': ['남산 서울타워', '반응형', '혼자 작업함'],
  'imgsrc': './images/portfolio06.jpg',
  'desc': '처음 퍼블리싱 배울때 공부삼아 ~~~ '
}]

portfolioData.forEach(function(data){
  let img = null
  if( Array.isArray(data.imgsrc) ) {
    img = data.imgsrc[0]
  } else {
    img = data.imgsrc
  }

  let html = `<li>
                <a href="">
                  <div class="txt">
                    <strong>${data.subject}</strong>
                    <p>${data.tags}</p>
                  </div>
                  <img src="${img}" alt="">
                </a>
              </li>`

  $('.portfolio_list').append(html)         
})

// Array.isArray(portfolioData)

$('.portfolio_list a').on('click', function(e){
  e.preventDefault()

  // alert(  $(this).parent().index() )
  let index = $(this).parent().index()

  $('.portfolio_pop').show()
  $('.portfolio_pop h1').html( portfolioData[index].subject )
  $('.portfolio_pop p').html( portfolioData[index].tags )
  
  if( Array.isArray( portfolioData[index].imgsrc ) ) {
    $('.portfolio_pop img').remove()
    portfolioData[index].imgsrc.forEach(function(data){
      $('<img>').attr('src', data).attr('alt', '').appendTo('.portfolio_pop .content')
    })
  } else {
    $('.portfolio_pop img').attr('src', portfolioData[index].imgsrc )
  }


})
$('.portfolio_pop button').on('click', function(){
  $('.portfolio_pop').hide()
})

// 메뉴 이동
$('.gnb a').on('click', function(e){
  e.preventDefault() // 기본기능 막기
  /* 
    $(this).attr('href')//  -> #gallery
    $('#gallery').offset().top

    $(   $(this).attr('href')   ).offset().top 
  */

  // 메뉴 활성화 / 비활성화
  $(this).addClass('active')
  $(this).parent().siblings().children().removeClass('active')

  // 모바일 메뉴를 클릭할 때 -> 메뉴 닫기
  $('.header_top').removeClass('opened')
  $('body').removeClass('non_scroll')

  // 클릭한 a의 href값 섹션 영역으로 이동
  $('html, body').animate({
    scrollTop:     $(   $(this).attr('href')   ).offset().top - 50
  })
})


// 스크롤하다가 활서화된 메뉴 표시

const navLinks = document.querySelectorAll('nav a');

function highlightMenu() {
    let currentSection = "";

    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute("href")); // 링크의 href 속성으로 섹션 선택
        const sectionTop = section.offsetTop - 100; // 섹션의 최상단 위치
        const sectionHeight = section.clientHeight; // 섹션의 높이

        // 스크롤 위치가 섹션 범위 내에 있는지 확인
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = link.getAttribute("href"); // 현재 섹션 ID를 가져옴
        }
    });

    // 모든 링크에서 active 클래스 제거
    navLinks.forEach(link => link.classList.remove('active'));
    // 현재 섹션에 해당하는 링크에 active 클래스 추가
    if (currentSection) {
        document.querySelector(`nav a[href="${currentSection}"]`).classList.add('active');
    }
}

window.addEventListener('scroll', highlightMenu);
