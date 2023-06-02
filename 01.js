

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGEyN2RhZGEzZmIyMzZjOWFiMDEwY2IyZmRhNmQ4MyIsInN1YiI6IjY0NzU2MTY1ZGQyNTg5MDBjMzI0ZGZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HDK-jrZxT07rId8Dq5fbX5H9FTAJp6IB0RmWisVR8QI'
  }

};

function mbc() {

  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)  //패치로 통해서 api를 받아오고  행으로 받아서 html_temp를 지정해서 받아 오려는 요소들을 복사해서 `` 안에 넣어준다
    .then(response => response.json())
    .then((data) => {

      let rows = data.results     // 배열 형태로 받아옴 

      let html_temp = '';
      
      rows.forEach(function (a) { // 반복문을 통해 맞는값을 불러온다  

        html_temp = html_temp + `
        <div class="list"> <div class="card" id=${a.id} onclick="showAlert(this)" style="display: block;">
                              <img src="https://image.tmdb.org/t/p/w500/${a.poster_path}"
                                    alt = ''>
                                 <h3>${a.title}</h3>
                                   <p>${a.overview}</p>
                                   <p>Rating:${a.vote_average}</p>   </div>
                                  
                                   `
                                   
      })

      document.querySelector('.card').innerHTML = html_temp    //  card값을 html에 넣어준다 

    })
    .catch(err => console.error(err));

}
mbc()


function showAlert(pid) {           // 클릭시 id값 알림창을 구현 
  let id = pid.id
  alert(`영화 넘버 ${id} 입니다`)

}
//검색 출력 
const btn = document.querySelector("#button1") // 버튼 element 요소를 가져옴 




function searchmovies(event) {
  event.preventDefault();  // .sumit 과 겹치지 않게  막아줌
  let text = document.querySelector('.searchinput').value
 
  if (!text.length) {
    alert('영화 제목의 일부분을 입력해주세요.') // 아무것도 입력없이 검색시 출력 
    return;
  } else if (text.length <= 1) {
    alert('조금 더 길게 입력해주세요.') // 한글자 검색시 출력
    return;
  }

 // 검색 구현 
  let reg = new RegExp(text, 'i') // regexp 정규 표현 방식으로 text 문자열 검색을 통해서 조건문을 통해 치환시켜줌  (i)문자열 대소문자 구분없이 검색 가능)
  let findmovies = [];
 
  document.querySelector('.card').innerHTML = ""   // 지정한 elment 요소를 가져옴  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)  //패치로 한번더 받아와서 검색에 대한 비교를 해줌 
    .then(response => response.json())
    .then((data) => {

      let rows = data.results
  
      rows.forEach((movie) => {         //    movie title  만 비교를 해서 타이틀 값push 해줌  
        if (reg.test(movie.title)) {  
          findmovies.push(movie)

        }
      })
      findmovies.forEach(a => { // 비교할 요소들을 다시 가져옴 
        let html_temp = `
        <div class="list"  id=${a.id} onclick="showAlert(this)" style="display: block;"></div>
        <div> <img src="https://image.tmdb.org/t/p/w500/${a.poster_path}"</div>
             alt = ''>
          <h3>${a.title}</h3>
            <p>${a.overview}</p>
            <p>Rating:${a.vote_average}</p>  
            
                          
  
                                `
        document.querySelector('.card').innerHTML += html_temp
      })
    })
}




btn.addEventListener('click', searchmovies)  // 이벤트 객체를 이용해 복수의 엘리먼트를 하나의 리스너를 등록해 재사용 가능 




