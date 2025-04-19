let type_content=document.querySelector('.type_content p');
let input=document.getElementById('typeValue');
let resetBtn = document.querySelector('.bottom_part button');

let soundBtn = document.getElementById('sound-toggle');


let letterIndex = (mistakes = isTyping = 0);

let time;
let t_left = document.querySelector('.t_left');
let error = document.querySelector('.error');
let wpm = document.querySelector('.wpm');
let cpm = document.querySelector('.cpm');
let maxTime=60;
let timeleft=maxTime;

let correctType = new Audio('type.mp3');
let IncorrectType = new Audio('wrong.mp3');


const playSound = (audio) => {
    if (soundBtn.checked) {
      audio.currentTime = 0;
      audio.play();
    }
  };

const loadpara=()=>{
    let random_para=Math.floor(Math.random()*article.length);
    type_content.innerHTML = '';
    article[random_para].split('').forEach(element =>{
        let realData = `<span>${element}</span>`;
        type_content.innerHTML += realData;
    })

    type_content.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('click',()=>{
        input.focus();
    })
    type_content.addEventListener('click',()=>{
        input.focus();
    })

};
loadpara();

input.addEventListener('input',(e)=>{
    let char = type_content.querySelectorAll('span');
    let inputValue = e.target.value.split('')[letterIndex];

    if(!isTyping){
        time=setInterval(timeSetup,1000);
        isTyping = true;
    }

    if(letterIndex <( char.length -1)){
        if(inputValue == null){
           if(letterIndex>0){
            letterIndex--;
            if(char[letterIndex].classList.contains('incorrect')){
                // mistakes--;
            }
            char[letterIndex].classList.contains('correct','incorrect');
           }
        }
        else{
            if(char[letterIndex].innerText == inputValue){
               char[letterIndex].classList.add('correct');
               playSound( correctType);
              
               
            }else{
                char[letterIndex].classList.add('incorrect');
                playSound(IncorrectType);
                
                
                mistakes++;
            }
        }


        letterIndex++;
        char.forEach(element=>{
            element.classList.remove('active');
        })
       char[letterIndex].classList.add('active');
       error.innerText = `Mistakes : ${mistakes}`;
       cpm.innerText = `CPM : ${letterIndex-mistakes}`;
    }else{
        clearInterval(time);
        input.value = '';
    }
    
})

const timeSetup=() => {
    if(timeleft > 0){
        timeleft--;
        t_left.innerText = `Time-Left : ${timeleft}`;
        let wpmTab = Math.floor((letterIndex-mistakes)/5/(maxTime-timeleft)*60);
        wpm.innerText = `WPM : ${wpmTab}`;
    }
    else{
        clearInterval(time);
        input.value = '';
    }
}

resetBtn.addEventListener('click',()=>{
    loadpara();
    clearInterval(time);
    wpm.innerText = `WPM :`;
    cpm.innerText = `CPM :`;
    error.innerText = `Mistakes :`;
    timeleft = maxTime;
    t_left.innerText = `Time-Left : ${maxTime}`;
    input.value = '';
     letterIndex = mistakes = isTyping = 0;

})