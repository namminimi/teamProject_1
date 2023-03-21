// 상황판
const strike = document.querySelectorAll("#yellow_strike p");
const ball = document.querySelectorAll("#green_ball p");
const out = document.querySelectorAll("#red_out p");

//유저 팀이름을 입력받음  
const teamname ="d" //prompt("구단주님 팀 이름을 입력하세요");
const userTeamName = document.querySelector("#right_team").innerHTML ="teamname";
document.querySelector("#left_team").innerHTML = `Siri`; //컴퓨터 이름ar

// 점수가 들어갈 dom요소
const leftScore = document.querySelector("#left_score");
const rightScore = document.querySelector("#right_score");
const turn =document.querySelector("#turn p"); //n회 초/말 공격/수비 ...etc
let homerunNum //홈런값 2진수

//버튼 클릭시 결과가 로그로 전송
const ul = document.querySelector("#logBox ul");

// 공격 버튼연결
const Swing = document.querySelector("#attack input:nth-child(2)")
const swingSkill = document.querySelector("#attack input:nth-child(3)")
const watch = document.querySelector("#attack input:nth-child(4)")
// 수비 버튼연결
const Pitch = document.querySelector("#defense input:nth-child(2)");
const pitchSkill = document.querySelector("#defense input:nth-child(3)");
// 버튼요소연결
const defensebutton = document.querySelector("#button #defense");
const attackbutton = document.querySelector("#button #attack");
// 알람요소연결
const alarm = document.querySelector("#alarm");
//캐릭터
const userChar = document.querySelectorAll("#user img");
const computerChar = document.querySelectorAll("#computer img");
userChar.forEach(a=>a.classList.add("hidden"));
computerChar.forEach(a=>a.classList.add("hidden"));
// 



let user_value;
let computer_value;


const user = {
    score: 0,
    batter_try: 5,     //0 swing:성공, 1 swing:실패, 2 homerun, 3 스킬, 4.watch
    pitcher_try: 3,    //0 strike, 1 ball, 2 스킬
    name: "user",
    go: 0, 
    count: 0         //1번 1루 2번 2루 3번 3루 4번 홈  
 }
 const computer ={
     score: 0,
     batter_try: 5,    //0 swing:성공, 1 swing:실패, 2 homerun, 3 스킬, 4.watch
     pitcher_try: 3,   //0 strike, 1 ball, 2 스킬
     name: "computer",
     result: "",  // 컴퓨터 결과값 저장
     go: 0,
     count: 0  
 }
 const game = {
     strike: 0, 
     ball: 0,
     out: 0,
     inning: 1,
     tun: 0,
     base1: 0,
     base2: 0,
     base3: 0,
     home: 0,
       
 }
 


let catcher = ["원", "투", "쓰리"]

// 유저가 선공격  수비버튼숨김
function attackdefense(){
    if(game.tun == 0){ // 0--유저공격/컴퓨터수비 1--유저수비/컴퓨터공격
        // 0일때 공격버튼만나타나고 수비버튼은 숨김
        defensebutton.classList.add("hidden");
        attackbutton.classList.remove("hidden");
        computerChar.forEach(a=>a.classList.add("hidden"))
        userChar[0].classList.remove("hidden")
        computerChar[0].classList.remove("hidden");
        computerChar[0].style.top = "40%"
        userChar[0].style.top ="74%"
    }else {
        defensebutton.classList.remove("hidden");
        attackbutton.classList.add("hidden");
        userChar.forEach(a=>a.classList.add("hidden"))
        userChar[0].classList.remove("hidden")
        userChar[0].style.top = "40%"
        computerChar[0].classList.remove("hidden");
        computerChar[0].style.top="74%"
    }
}

/* ------------------------------------------------------------------ */

//컴퓨터만들기
function computerPlay() {
    let computerBtn; //컴퓨터에 공격버튼 or수비버튼들 연결
    let random_com; 
    if(game.tun == 1){
        // 컴퓨터가 공격일때
        computerBtn=document.querySelectorAll("#attack input")
        random_com = Math.floor(Math.random() * computerBtn.length);
        computer.result = computerBtn[random_com].value //컴퓨터 결과값에 컴퓨터가선택한버튼의value 가 담김
        if (computer.result == "Swing") {
            judges1_com(); //컴퓨터용 함수 따로 만들었엉... 이쪽 함수에 주석 적어놈
            console.log("ssss");
        } else if (computer.result == "Skill:진심 스윙") {
            judges2_com();
            console.log("sksksk진심");
        } else if (computer.result == "Watch") {
            judges3_com();
            console.log("wawawa");
        }
        
    }else if(game.tun == 0){
        // 컴퓨터가 수비일때
        computerBtn=document.querySelectorAll("#defense input")
        random_com = Math.floor(Math.random() * computerBtn.length);
        computer.result = computerBtn[random_com].value ; //컴퓨터 결과값에 컴퓨터가선택한버튼의value 가 담김
        if (computer.result == "Pitch") {
            judge1_com();
            console.log("pipip");
        } else if (computer.result == "Skill:fire Pitc") {
            judge2_com();
            console.log("sksksk파이어");
        }
    }
}

// strike,ball,out갯수에 따라 상황판 색칠
function strikefc(){
    for(let i=0;i < game.strike;i++){
        if(game.strike >= 3) {
            log(`${catcher[game.out]}아웃~ ㅎㅎ`);
            game.out += 1; 
            zero();
            return
        }
        strike[i].style.background = "yellow";
    }
    
}
function ballfc(){
    for(let i=0;i < game.ball;i++){
        if(game.ball == 4) {
            //user.ball = 0;
            game.strike = 0;
            ball.forEach(a=>a.style.background = "none")
            strike.forEach(a=>a.style.background = "none")
            return
        }
        ball[i].style.background = "green";
    }
}
function outfc(){
    for(let i=0;i < game.out;i++){
        if(game.out >= 3) {
            tuntun();  //턴 0 일 경우 1로 바꿔주는 함수 반대도 가능
            user_turn(); //이닝 연결
            game.out = 0;
            out.forEach(a=>a.style.background = "none")
            return;
        }
    out[i].style.background = "red";
   }
}

/* ------------------------------------------------------------------ */
// 공수 변경될때마다 이닝 변경
function user_turn() {
    if (game.tun == 0) { //game.tun == 0 초
        attackdefense();
        user.count = 0;
        computer.count = 0;
        turn.innerHTML = `${game.inning}회 초 공격`;
    } else if(game.tun == 1) {//game.tun == 1 말
        attackdefense();
        user.count = 0;
        computer.count = 0;
        turn.innerHTML = `${game.inning}회 말 수비`;
        game.inning += 1;   // 이닝 추가
    }
}

/* ------------------------------------------------------------------ */
//턴 0 과 1 변경
function tuntun() {
    if(game.tun == 0) {
        game.tun = 1; 
    } else if (game.tun == 1) {
        game.tun = 0;
    }
}


/* ------------------------------------------------------------------ */
///////       공격        ///////////
//처음에 버튼 한 함수에 다 몰았었는데 컴퓨터가 인식을 못해서 컴퓨터용 함수, 유저용 함수로 나눠놨어
// 유저가 스윙을 클릭했을 때
function judges1(event) {
    let random_num = Math.random();
    if (event.target.value == "Swing" && random_num < 0.1) {
        log(`${user.name}가 Homerun을 시도합니다`);
        user.batter_try = 2;
    } else if (event.target.value == "Swing" && random_num< 0.5) {
        log(`${user.name}가 Swing를 시도합니다`); 
        user.batter_try = 0;
    } else if(event.target.value == "Swing" && random_num>= 0.5) {
        log(`${user.name}가 Swing를 시도합니다`);
        user.batter_try = 1;
    }
    connect();
}
// 컴퓨터가 스윙을 클릭했을 때
function judges1_com() {
    let random_num = Math.random();
    if (random_num < 0.1) {
        log(`${computer.name}가 Homerun을 시도합니다`);
        computer.batter_try = 2;
    } else if (random_num< 0.5) {
        log(`${computer.name}가 Swing을 시도합니다`); 
        computer.batter_try = 0;
    } else if(random_num >= 0.5) {
        game.make = 1;  //1이면 밑에 이름이 컴퓨터로 뜸
        log(`${computer.name}가 Swing을 시도합니다`);
        computer.batter_try = 1;
    }
}
//유저가 스킬을 클릭했을 때
function judges2(event) {
    if (event.target.value == "Skill:진심 스윙" ) {
        log(`${user.name}가 무시무시한 스킬을 시도합니다`);
        user.batter_try = 3;
    } 
    connect();
}
//컴퓨터가 스킬을 클릭했을 때
function judges2_com() {
    log(`${computer.name}가 무시무시한 스킬을 시도합니다`);
    computer.batter_try = 3; 
}

//유저가 watch를 클릭했을 때
function judges3(event) {
    if (event.target.value == "Watch" ) {
        log(`${user.name}가 가만히 지켜보기를 시도합니다`);
        user.batter_try = 4;
    }else if(event.target.value == "Watch" ) {
        log(`${computer.name}가 가만히 지켜보기를 시도합니다`);
        computer.batter_try = 4;
    }
    connect();
}
//컴퓨터가 watch를 클릭했을 때
function judges3_com() {
    log(`${computer.name}가 가만히 지켜보기를 시도합니다`);
    computer.batter_try = 4;
}

/* ------------------------------------------------------------------ */
//////////         수비          /////////
//유저가 pitch를 클릭했을 때
function judge1(event) {
    let random_num = Math.random();
    if(event.target.value == "Pitch" && random_num <= 0.5 ){
        log(`${user.name}가 공을 던졌습니다`);
        user.pitcher_try = 1;
        
    }else if (event.target.value == "Pitch" && random_num > 0.5 ) {
        log(`${user.name}가 공을 던졌습니다`);
        user.pitcher_try = 0;
    }
    connect();
}

//컴퓨터가 pitch를 클릭했을 때
function judge1_com() {
    let random_num = Math.random();
    if(random_num <= 0.5 ){
        log(`${computer.name}가 공을 던졌습니다`);
        computer.pitcher_try = 1;
    }else if(random_num > 0.5 ) {
        log(`${computer.name}가 공을 던졌습니다`);
        computer.pitcher_try = 0;
    } 
}

//유저가 스킬을 클릭했을 때
function judge2(event) {
    if(event.target.value == "Skill:fire Pitc"){
        log(`${user.name}가 무시무시한 공을 던졌습니다`);
        user.pitcher_try = 2;
    } else if(event.target.value == "Skill:fire Pitc") {
        log(`${computer.name}가 무시무시한 공을 던졌습니다`);
        computer.pitcher_try = 2;
    }
    connect();
} 
//컴퓨터가 스킬을 클릭했을 때
function judge2_com() {
    log(`${computer.name}가 무시무시한 공을 던졌습니다`);
    computer.pitcher_try = 2;
}

//비교해주는 함수와 연결해주는 함수
//밑에 조건함수에 매개변수를 따로 지정해줫어 여기서 한번 정리하고 조건함수로 이동
function connect() {
    if (game.tun == 0) {
        computer_compare(computer.pitcher_try, user.batter_try);
    } else {
        user_compare(user.pitcher_try, computer.batter_try);
    }
    homerunNum = parseInt(`${game.base3}${game.base2}${game.base1}`,2)
    console.log(`${homerunNum}홈런값`)
}

//컴퓨터 수비일때 함수
function computer_compare(num1, num2) {
    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 스윙성공 = 유저(타자) 1루 진출
    if (num1 == 0 && num2 == 0) {
        user.go += 1;//이게 아까 객체쪽 주석에 적어둔거
        charmove(userChar,user)
        swingSave2();
        console.log("0,0 컴터조건1") //이거는 어떤 버튼눌렀는지 구분쫌할려구.. 너무많아ㅜㅜ

    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 헛스윙 = 유저(타자) 1strike
    } else if (num1 == 0 && num2 == 1) {
        strikeSave();
        console.log("0,1 컴터조건2");

    //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 스윙성공 = 유저(타자) 1루 진출
    } else if (num1 == 1 && num2 == 0) {
        user.go += 1;
        charmove(userChar,user)
        swingSave2();
        console.log("1,0 컴터조건3")

    //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 헛스윙 = 유저(타자) 1strike
    } else if (num1 == 1 && num2 == 1) {
        strikeSave();
        console.log("1,1 컴터조건4");

    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 홈런 = 유저(타자) 베이스인원+본인점수
    } else if (num1 == 0 && num2 == 2) {
        
        charmove(userChar,user)
        document.querySelector("#turn h3").innerText = "HOMERUN!!";
        homerun(user, userChar);
        alarm.innerHTML = "남민섭 선수 대박터졌습니다!! 홈런입니다 홈런이에요!!!! 와ㅏㅏㅏㅏㅏ";
        zero();
        console.log("0,2 컴터조건5");
        user.go = 5;

    //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 홈런 = 유저(타자) 베이스인원+본인점수    
    } else if (num1 == 1 && num2 == 2) {
        
        document.querySelector("#turn h3").innerText = "HOMERUN!!";
        homerun(user, userChar);
        charmove(userChar,character)
        alarm.innerHTML = "남민섭 선수 대박터졌습니다!! 홈런입니다 홈런이에요!!!! 와ㅏㅏㅏㅏㅏ";
        zero();
        console.log("1,2 컴터조건6");
        user.go = 5;

    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 skill = 유저(타자) 1루 진출    
    } else if (num1 == 0 && num2 == 3) {
        user.go += 1;
        charmove(userChar,user)
        swingSave2();
        console.log("0,3 컴터조건7");

    //컴퓨터(수비)가 ball을 했을 때 유저(타자)는 skill = 유저(타자) 1루 진출
    } else if (num1 == 1 && num2 == 3) {
        user.go += 1;
        charmove(userChar,user)
        swingSave2();
        console.log("1,3 컴터조건8");

    //컴퓨터(수비)가 strike을 했을 때 유저(타자)는 watch = 유저(타자) 1strike
    } else if (num1 == 0 && num2 == 4) {
        strikeSave();
        console.log("0,4 컴터조건9");

    //컴퓨터(수비)가 ball을 했을 때 유저(타자)는 watch = 유저(타자) 1ball    
    } else if (num1 == 1 && num2 == 4) {
        game.ball = game.ball + 1;
        document.querySelector("#turn h3").innerText = "BALL!";
        alarm.innerHTML = `${catcher[game.ball-1]}볼~~ `;
        console.log("1,4 컴터조건10");

    //컴퓨터(수비)가 skill을 했을 때 유저(타자)는 watch = 유저(타자) 1strike     
    } else if (num1 == 2 && num2 == 4) {
        strikeSave();
        console.log("2,4 컴터조건11");

    //컴퓨터(수비)가 skill을 했을 때 유저(타자)는 swing = 유저(타자) 1strike
    } else if (num1 == 2 && num2 == 0) {
        strikeSave();
        console.log("2,0 컴터조건12");

    //컴퓨터(수비)가 skill을 했을 때 유저(타자)는 헛스윙 = 유저(타자) 1strike
    } else if (num1 == 2 && num2 == 1) {
        strikeSave();
        console.log("2,1 컴터조건13");

    //컴퓨터(수비)가 skill을 했을 때 유저(타자)는 homerun = 유저(타자) 1strike    
    } else if (num1 == 2 && num2 == 2) {
        strikeSave();
        console.log("2,2 컴터조건14");

    //컴퓨터(수비)가 skill을 했을 때 유저(타자)는 skill = 유저(타자) 1strike    
    } else if (num1 == 2 && num2 == 3) {
        strikeSave();
        console.log("2,3 컴터조건15");
    }
    strikefc();   
    ballfc();     
    outfc();      
    computerPlay();    
}


//유저 수비일때 함수
function user_compare(num1, num2) {
    //유저(수비)가 strike를 했을 때 컴퓨터(타자)는 스윙성공 = 컴퓨터(타자) 1루 진출
    if (num1 == 0 && num2 == 0) {
        computer.go += 1; 
        charmove(computerChar,computer)
        swingSave();
        console.log("0,0 유저조건1")

    //유저(수비)가 strike를 했을 때 컴퓨터(타자)는 헛스윙 = 컴퓨터(타자) 1strike
    } else if (num1 == 0 && num2 == 1) {
        strikeSave();
        console.log("0,1 유저조건2");

    //유저(수비)가 ball를 했을 때 컴퓨터(타자)는 스윙성공 = 컴퓨터(타자) 1루 진출
    } else if (num1 == 1 && num2 == 0) {
        computer.go += 1; 
        charmove(computerChar,computer)
        swingSave();
        console.log("1,0 유저조건3")

    //유저(수비)가 ball를 했을 때 컴퓨터(타자)는 헛스윙 = 컴퓨터(타자) 1strike
    } else if (num1 == 1 && num2 == 1) {
        strikeSave();
        console.log("1,1 유저조건4");

    //유저(타자)가 strike를 했을 때 컴퓨터(수비)는 홈런 = 컴퓨터(수비) 베이스인원+본인점수
    } else if (num1 == 0 && num2 == 2) {
        
        charmove(computerChar,computer)
        document.querySelector("#turn h3").innerText = "HOMERUN!";
        homerun(computer, computerChar);
        alarm.innerHTML = "김동현 선수 대박터졌습니다!! 홈런입니다 홈런이에요!!!! 와ㅏㅏㅏㅏㅏ";
        zero();
        console.log("0,2 유저조건5");
        computer.go = 5; 

    //유저(타자)가 ball를 했을 때 컴퓨터(수비)는 홈런 = 컴퓨터(수비) 베이스인원+본인점수    
    } else if (num1 == 1 && num2 == 2) {
        charmove(computerChar,computer)
        document.querySelector("#turn h3").innerText = "HOMERUN!";
        homerun(computer, computerChar);
        alarm.innerHTML = "김동현 선수 대박터졌습니다!! 홈런입니다 홈런이에요!!!! 와ㅏㅏㅏㅏㅏ";
        zero();
        console.log("1,2 유저조건6");
        computer.go = 5; 

    //유저(타자)가 strike를 했을 때 컴퓨터(수비)는 skill = 컴퓨터(수비) 1루 진출    
    } else if (num1 == 0 && num2 == 3) {
        computer.go += 1;  
        charmove(computerChar,computer)
        swingSave();
        console.log("0,3 유저조건7");

    //유저(타자)가 ball을 했을 때 컴퓨터(수비)는 skill = 컴퓨터(수비) 1루 진출
    } else if (num1 == 1 && num2 == 3) {
        computer.go += 1; 
        charmove(computerChar,computer)
        swingSave();
        console.log("1,3 유저조건8");

    //유저(타자)가 strike을 했을 때 컴퓨터(수비)는 watch = 컴퓨터(수비) 1strike
    } else if (num1 == 0 && num2 == 4) {
        strikeSave();
        console.log("0,4 유저조건9");

    //유저(타자)가 ball을 했을 때 컴퓨터(수비)는 watch = 컴퓨터(수비) 1ball    
    } else if (num1 == 1 && num2 == 4) {
        game.ball = game.ball + 1;
        document.querySelector("#turn h3").innerText = "BALL!";
        alarm.innerHTML = `${catcher[game.ball-1]}볼~~ `;
        console.log("1,4 유저조건10");

    //유저(타자)가 skill을 했을 때 컴퓨터(수비)는 watch = 컴퓨터(수비) 1strike     
    } else if (num1 == 2 && num2 == 4) {
        strikeSave();
        console.log("2,4 유저조건11");

    //유저(타자)가 skill을 했을 때 컴퓨터(수비)는 swing = 컴퓨터(수비) 1strike
    } else if (num1 == 2 && num2 == 0) {
        strikeSave();
        console.log("2,0 유저조건12");

    //유저(타자)가 skill을 했을 때 컴퓨터(수비)는 헛스윙 = 컴퓨터(수비) 1strike
    } else if (num1 == 2 && num2 == 1) {
        strikeSave();
        console.log("2,1 유저조건13");

    //유저(타자)가 skill을 했을 때 컴퓨터(수비)는 homerun = 컴퓨터(수비) 1strike    
    } else if (num1 == 2 && num2 == 2) {
        strikeSave();
        console.log("2,2 유저조건14");

    //유저(타자)가 skill을 했을 때 컴퓨터(수비)는 skill = 컴퓨터(수비) 1strike    
    } else if (num1 == 2 && num2 == 3) {
        strikeSave();
        console.log("2,3 유저조건15");
    }
    strikefc();
    ballfc();
    outfc();
    computerPlay();
}

/* ------------------------------------------------------------------ */
//로그창에 기록남기기
function log(text) {
    let newLi = document.createElement("li");
    newLi.innerHTML = `${text}`;
    ul.appendChild(newLi);  
     //scroll바 아래 고정
    const logbox = document.querySelector("#logBox");
    logbox.scrollTop = logbox.scrollHeight;
}

/* -------------------------------------------------------------- */
//유저 컴퓨터

function goLimit(team) {
    team.count++;
    if (team.count == 5) {
        team.count = 0;
    }
    batter_oneBase();
    batter_twoBase();
    batter_threeBase();
    batter_homeBase(team);
}

//1루   
function batter_oneBase() {
    //유저 
    if(user.count == 1) {  // go가 1이면 1번자식 캐릭 remove .on
        userChar[1].classList.remove("on");
        game.base1 = 1;
    }
    //컴퓨터
    if(computer.count == 1) {  // go가 1이면 1번자식 캐릭 remove .on
        computerChar[1].classList.remove("on");
        game.base1 = 1;
    }
      
} 
//2루 
function batter_twoBase() {
    //유저 
    if(game.base1 == 1 && user.count == 2) {
        userChar[2].classList.remove("on");
        game.base2 = 1;
    }
    //컴퓨터
    if(game.base1 == 1 && computer.count == 2) {
        computerChar[2].classList.remove("on");
        game.base2 = 1;
    }
}

//3루 
function batter_threeBase() {
    //유저 컴퓨터
    if(game.base1 == 1 && game.base2 == 1 && user.count == 3) {
        userChar[3].classList.remove("on");
        game.base3 = 1; 
    } 
    //컴퓨터
    if(game.base1 == 1 && game.base2 == 1 && computer.count == 3) {
        computerChar[3].classList.remove("on");
        game.base3 = 1; 
    } 
}

//3루에서 홈 이동 score
function batter_homeBase(tem) {
    //유저 컴퓨터
    if(game.base1 == 1 && game.base2 == 1 && game.base3 == 1 && tem.count == 4) {
        tem.score += 1;
        baseballTeam(tem);
    }
} 

//홈런일 경우 점수 
function homerun(name, charName) {
    if(homerunNum==7) {
        name.score += 4;
        // charName[1].classList.add("on");
        // charName[2].classList.add("on");
        // charName[3].classList.add("on");
        charName[0].classList.remove("hidden")
        charName[1].classList.remove("hidden")
        charName[2].classList.remove("hidden")
        charName[3].classList.remove("hidden")

        charName[0].classList.add("homerun1");
        charName[1].classList.add("homerun2");
        charName[2].classList.add("homerun3");
        charName[3].classList.add("homerun4");
        charName[4].classList.add("hidden");

        homerunZero(name)
        console.log("만루홈런")
    } else if(homerunNum==6) {
        name.score += 3;
        // charName[1].classList.add("on");
        // charName[2].classList.add("on");
        homerunZero(name)
    } else if(homerunNum==5) {
        name.score += 3;
        // charName[1].classList.add("on");
        // charName[3].classList.add("on");
        homerunZero(name)
    } else if(homerunNum==3) {
        name.score += 3;
        // charName[2].classList.add("on");
        // charName[3].classList.add("on");
        charName[0].classList.remove("hidden")
        charName[1].classList.remove("hidden")
        charName[2].classList.remove("hidden")

        charName[0].classList.add("homerun1");
        charName[1].classList.add("homerun2");
        charName[2].classList.add("homerun3");
        charName[4].classList.add("hidden");

        homerunZero(name)
    } else if(homerunNum==4) {
        name.score += 2;
        // charName[1].classList.add("on");
        homerunZero(name)
    } else if(homerunNum==2) {
        name.score += 2;
        // charName[2].classList.add("on");
        homerunZero(name)
    } else if(homerunNum==1) {
        charName[0].classList.remove("hidden")
        charName[1].classList.remove("hidden")

        charName[0].classList.add("homerun1");
        charName[1].classList.add("homerun2");
        charName[4].classList.add("hidden");

        name.score += 2;
        // charName[3].classList.add("on");
        homerunZero(name)
    } else if(homerunNum==0) {
        charName[0].classList.remove("hidden")
        charName[0].classList.add("homerun1");
        charName[4].classList.add("hidden");

        name.score += 1;
        homerunZero(name)
    }
}

//왼쪽팀 점수
function baseballTeam(team) {
    if(team == computer) {
        leftScore.innerHTML = team.score;
    } else {
        rightScore.innerHTML = team.score;
    }
}

//중복 함수로 처리
function zero() {
    game.strike = 0;
    game.ball = 0;
    ball.forEach(a=>a.style.background = "none");
    strike.forEach(a=>a.style.background = "none");
}

//strike 중복 처리
function strikeSave() {
    game.strike = game.strike + 1;
    document.querySelector("#turn h3").innerText = "STRIKE!";
    alarm.innerHTML = `${catcher[game.strike-1]}스트라이쿠~ `;
}

//swing 컴퓨터 중복 처리
function swingSave() {
    goLimit(computer);
    document.querySelector("#turn h3").innerText = "SWING!";
    alarm.innerHTML = "김동현 선수~ 공을 쳐냈습니다 호우~"
    zero();
}
//swing 유저 중복 처리
function swingSave2() {
    goLimit(user); 
    document.querySelector("#turn h3").innerText = "SWING!";
    alarm.innerHTML = "남민섭 선수~ 공을 쳐냈습니다 호우~"
    zero();
}

function homerunZero(team) {
    game.base1 = 0;
    game.base2 = 0;
    game.base3 = 0;
    baseballTeam(team);
}
// 캐릭터이동함수
function charmove(whois,whose) {
    whois.forEach(a=>{
        a.classList.add("hidden");
        a.classList.remove("base1")
        a.classList.remove("base2")
        a.classList.remove("base3")
        a.classList.remove("base4")
        a.offsetWidth = a.offsetWidth;
    });
    if(whose.go == 1 ){
        whois[0].classList.remove("hidden");
        whois[4].classList.remove("hidden");

        whois[4].classList.add("char1");
    }
    if(whose.go == 2){
        whois[0].classList.remove("hidden");
        whois[4].classList.remove("hidden");
        whois[1].classList.remove("hidden");

        whois[0].classList.add("base1");
        whois[1].classList.add("base2");

        whois[4].classList.remove("char1");
        whois[4].classList.add("char2");
    }
    if(whose.go == 3){
        whois[0].classList.remove("hidden");
        whois[1].classList.remove("hidden");
        whois[2].classList.remove("hidden");
        whois[4].classList.remove("hidden");

        whois[0].classList.add("base1");
        whois[1].classList.add("base2");
        whois[2].classList.add("base3");


        whois[4].classList.remove("char2");
        whois[4].classList.add("char3");

    }
    if(whose.go == 4){
        whois[0].classList.remove("hidden");
        whois[1].classList.remove("hidden");
        whois[2].classList.remove("hidden");
        whois[3].classList.remove("hidden");
        whois[4].classList.remove("hidden");

        whois[0].classList.add("base1");
        whois[1].classList.add("base2");
        whois[2].classList.add("base3");
        whois[3].classList.add("base4");

        
        whois[4].classList.remove("char3");
        whois[4].classList.add("char4");
        whose.go =3;
    }
    if(whose.go == 5){
        whose.go =0;
        console.log(`${homerunNum}성공`);
    }
    whois.forEach(a=>{
        a.classList.remove("homerun1")
        a.classList.remove("homerun2")
        a.classList.remove("homerun3")
        a.classList.remove("homerun4")

        a.offsetWidth = a.offsetWidth;
    });

    console.log(`${whose.go}go값`)
}



user_turn();
attackdefense();
computerPlay();


Swing.addEventListener("click",judges1);
swingSkill.addEventListener("click",judges2);
watch.addEventListener("click",judges3);

Pitch.addEventListener("click",judge1);
pitchSkill.addEventListener("click",judge2);