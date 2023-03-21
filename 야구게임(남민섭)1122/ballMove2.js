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
const userChar_run = document.querySelectorAll("#user_run img");
const computerChar = document.querySelectorAll("#computer img");
const computerChar_pit = document.querySelector("#computer_pitcher img");
const computerChar_run = document.querySelectorAll("#computer_run img");
computerChar.forEach(a=>a.classList.add("hidden"));
computerChar_run.forEach(a=>a.classList.add("hidden"));
// 



let user_value;
let computer_value;


const user = {
    score: 0,
    batter_try: 8,     //0 swing:성공(1루타:0 2루타:5 3루타:6), 1 swing:실패(헛스윙1, 파울:7), 2 homerun, 3 스킬, 4.watch
    pitcher_try: 3,    //0 strike, 1 ball, 2 스킬     0 5 6 2 3
    name: "user",
    go: 0, 
    count: 0         //1번 1루 2번 2루 3번 3루 4번 홈  
 }
 const computer ={
     score: 0,
     batter_try: 8,    //0 swing:성공, 1 swing:실패, 2 homerun, 3 스킬, 4.watch
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
     tun: 1,
     base1: 0,
     base2: 0,
     base3: 0,
     home: 0,
       
 }
 


let catcher = ["원", "투", "쓰리", "볼넷"]

// 유저가 선공격  수비버튼숨김
function attackdefense(){
    if(game.tun == 0){ // 0--유저공격/컴퓨터수비 1--유저수비/컴퓨터공격
        // 0일때 공격버튼만나타나고 수비버튼은 숨김
        defensebutton.classList.add("hidden");
        attackbutton.classList.remove("hidden");
        computerChar.forEach(a=>a.classList.add("hidden"))
        userChar[0].classList.remove("hidden")
        computerChar_pit.classList.remove("hidden");
        computerChar_pit.style.top = "40%"
        userChar[0].style.top ="74%"
    }else {
        defensebutton.classList.remove("hidden");
        attackbutton.classList.add("hidden");
        userChar.forEach(a=>a.classList.add("hidden"))
        userChar[0].classList.remove("hidden")
        userChar[0].style.top = "40%"
        computerChar_pit.classList.add("hidden");
        computerChar[0].classList.remove("hidden");
        computerChar_pit.style.top="74%"
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
        if (random_num < 0.1 && random_num > 0) {
            user.batter_try = 6; //3루타
        } else if(random_num < 0.5  && random_num >= 0.1){
            user.batter_try = 5; //2루타
        } else if (random_num >= 0.5) {
            user.batter_try = 0; //1루타
        } 
    } else if(event.target.value == "Swing" && random_num>= 0.5) {
        log(`${user.name}가 Swing를 시도합니다`);
        let fail = random_num <= 0.5 ? 2 : 3;
        if(fail == 2) {
            user.batter_try = 1; //헛스윙
        } else {
            user.batter_try = 7; //파울
        }
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
        if (random_num < 0.1 && random_num > 0) {
            computer.batter_try = 6; //3루타
        } else if(random_num < 0.5  && random_num >= 0.1){
            computer.batter_try = 5; //2루타
        } else if (random_num >= 0.5) {
            computer.batter_try = 0; //1루타
        } 
    } else if(random_num >= 0.5) {
        game.make = 1;  //1이면 밑에 이름이 컴퓨터로 뜸
        log(`${computer.name}가 Swing을 시도합니다`);
        let fail = random_num <= 0.5 ? 2 : 3;
        if(fail == 2) {
            computer.batter_try = 1; //헛스윙
        } else {
            computer.batter_try = 7; //파울
        }
        
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
        user.count = 1;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 1루타입니다!"
        console.log("0,0 컴터조건1") 

    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 헛스윙 = 유저(타자) 1strike
    } else if (num1 == 0 && num2 == 1) {
        strikeSave();
        console.log("0,1 컴터조건2");

    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 2루타스윙성공 = 유저(타자) 2루 진출
    } else if(num1 == 0 && num2 == 5) {
        user.count = 2;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 2루타입니다! 호호홓홓홓"
        console.log("0,5 컴터조건3");

    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 3루타스윙성공 = 유저(타자) 3루 진출
    } else if (num1 == 0 && num2 == 6) {
        user.count = 3;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 3루타입니다! 허어어어어억!!!"
        console.log("0,5 컴터조건3");

    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 파울 = 유저(타자) 대기     
    } else if (num1 == 0 && num2 == 7) {
        document.querySelector("#turn h3").innerText = "FOUL";
        alarm.innerHTML = "파울!~"   //가만히
        console.log("0,7 컴터조건3");
        //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 스윙성공 = 유저(타자) 1루 진출
    } else if (num1 == 1 && num2 == 0) {
        user.count = 1;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 1루타입니다!"
        console.log("1,0 컴터조건3")

    //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 헛스윙 = 유저(타자) 1strike
    } else if (num1 == 1 && num2 == 1) {
        strikeSave();
        console.log("1,1 컴터조건4");

    
    } //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 2루타스윙성공 = 유저(타자) 2루 진출
    else if(num1 == 1 && num2 == 5) {
        user.count = 2;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 2루타입니다! 호호홓홓홓"
        console.log("1,5 컴터조건3");

    //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 3루타스윙성공 = 유저(타자) 3루 진출
    } else if (num1 == 1 && num2 == 6) {
        user.count = 3;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 3루타입니다! 허어어어어억!!!"
        console.log("1,5 컴터조건3");

    //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 파울 = 유저(타자) 대기     
    } else if (num1 == 1 && num2 == 7) {
        document.querySelector("#turn h3").innerText = "FOUL";
        alarm.innerHTML = "파울!~" //가만히
        console.log("1,7 컴터조건3");
        
    }
    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 홈런 = 유저(타자) 베이스인원+본인점수
     else if (num1 == 0 && num2 == 2) {
        user.count = 4;
        document.querySelector("#turn h3").innerText = "HOMERUN!!";
        homerun(user);
        alarm.innerHTML = "남민섭 선수 대박터졌습니다!! 홈런입니다 홈런이에요!!!! 와ㅏㅏㅏㅏㅏ";
        zero();
        console.log("0,2 컴터조건5");

    //컴퓨터(수비)가 ball를 했을 때 유저(타자)는 홈런 = 유저(타자) 베이스인원+본인점수    
    } else if (num1 == 1 && num2 == 2) {
        user.count = 4;
        document.querySelector("#turn h3").innerText = "HOMERUN!!";
        homerun(user);
        alarm.innerHTML = "남민섭 선수 대박터졌습니다!! 홈런입니다 홈런이에요!!!! 와ㅏㅏㅏㅏㅏ";
        zero();
        console.log("1,2 컴터조건6");

    //컴퓨터(수비)가 strike를 했을 때 유저(타자)는 skill = 유저(타자) 1루 진출    
    } else if (num1 == 0 && num2 == 3) {
        user.count = 1;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 1루타입니다!"
        console.log("0,3 컴터조건7");

    //컴퓨터(수비)가 ball을 했을 때 유저(타자)는 skill = 유저(타자) 1루 진출
    } else if (num1 == 1 && num2 == 3) {
        user.count = 1;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 1루타입니다!"
        console.log("1,3 컴터조건8");

    //컴퓨터(수비)가 strike을 했을 때 유저(타자)는 watch = 유저(타자) 1strike
    } else if (num1 == 0 && num2 == 4) {
        strikeSave();
        console.log("0,4 컴터조건9");

    //컴퓨터(수비)가 ball을 했을 때 유저(타자)는 watch = 유저(타자) 1ball    
    } else if (num1 == 1 && num2 == 4) {
        game.ball = game.ball + 1;
        document.querySelector("#turn h3").innerText = "BALL!";
        if (game.ball != 4) {
            alarm.innerHTML = `${catcher[game.ball-1]}볼~~ `;
        } else {
            alarm.innerHTML = `${catcher[game.ball-1]}`;
        }
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

    } //컴퓨터(수비)가 skill를 했을 때 유저(타자)는 2루타스윙실패 = 유저(타자) 1strike
    else if(num1 == 2 && num2 == 5) {
        strikeSave()
        console.log("1,5 컴터조건3");

    //컴퓨터(수비)가 skill를 했을 때 유저(타자)는 3루타스윙성공 = 유저(타자) 3루 진출
    } else if (num1 == 2 && num2 == 6) {
        user.count = 3;
        swingSave2();
        alarm.innerHTML = "남민섭 선수~ 3루타입니다! 허어어어어억!!!"
        console.log("1,5 컴터조건3");

    //컴퓨터(수비)가 skill를 했을 때 유저(타자)는 파울 = 유저(타자) 대기     
    } else if (num1 == 2 && num2 == 7) {
        document.querySelector("#turn h3").innerText = "FOUL";
        alarm.innerHTML = "파울!~"
        console.log("1,7 컴터조건3");
        
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
        computer.count = 1;
        swingSave();
        alarm.innerHTML = "김동현 선수~ 1루타입니다!"
        console.log("0,0 유저조건1")

    //유저(수비)가 strike를 했을 때 컴퓨터(타자)는 헛스윙 = 컴퓨터(타자) 1strike
    } else if (num1 == 0 && num2 == 1) {
        strikeSave();
        console.log("0,1 유저조건2");

    
    //유저(타자)가 strike를 했을 때 컴퓨터(수비)는 2루타스윙성공 = 컴퓨터(타자) 2루 진출
    } else if(num1 == 0 && num2 == 5) {
        computer.count = 2;
        swingSave();
        alarm.innerHTML = "김동현 선수~ 2루타입니다! 호호홓홓홓"
        console.log("0,5 컴터조건3");

    //유저(수비)가 strike를 했을 때 컴퓨터(타자)는 3루타스윙성공 = 컴퓨터(타자) 3루 진출
    } else if (num1 == 0 && num2 == 6) {
        computer.count = 3;
        swingSave();
        alarm.innerHTML = "김동현 선수~ 3루타입니다! 허어어어어억!!!"
        console.log("0,5 컴터조건3");

    //유저(수비)가 strike를 했을 때 컴푸터(타자)는 파울 = 컴퓨터(타자) 대기     
    } else if (num1 == 0 && num2 == 7) {
        document.querySelector("#turn h3").innerText = "FOUL";
        alarm.innerHTML = "파울!~"   //가만히
        console.log("0,7 컴터조건3");
        
    }
    //유저(수비)가 ball를 했을 때 컴퓨터(타자)는 스윙성공 = 컴퓨터(타자) 1루 진출
     else if (num1 == 1 && num2 == 0) {
        computer.count = 1;
        swingSave();
        alarm.innerHTML = "김동현 선수~ 1루타입니다!"
        console.log("1,0 유저조건3")

    //유저(수비)가 ball를 했을 때 컴퓨터(타자)는 헛스윙 = 컴퓨터(타자) 1strike
    } else if (num1 == 1 && num2 == 1) {
        strikeSave();
        console.log("1,1 유저조건4");

    
    } //유조(수비)가 ball를 했을 때 컴퓨토(타자)는 2루타스윙성공 = 컴퓨터(타자) 2루 진출
    else if(num1 == 1 && num2 == 5) {
        computer.count = 2;
        swingSave();
        alarm.innerHTML = "김동현 선수~ 2루타입니다! 호호홓홓홓"
        console.log("1,5 컴터조건3");

    //유저(수비)가 ball를 했을 때 컴퓨터(타자)는 3루타스윙성공 = 컴퓨터(타자) 3루 진출
    } else if (num1 == 1 && num2 == 6) {
        computer.count = 3;
        swingSave();
        alarm.innerHTML = "김동현 선수~ 3루타입니다! 허어어어어억!!!"
        console.log("1,5 컴터조건3");

    //유저(수비)가 ball를 했을 때 컴퓨터(타자)는 파울 = 컴퓨터(타자) 대기     
    } else if (num1 == 1 && num2 == 7) {
        document.querySelector("#turn h3").innerText = "FOUL";
        alarm.innerHTML = "파울!~" //가만히
        console.log("1,7 컴터조건3");
        
    }
    //유저(타자)가 strike를 했을 때 컴퓨터(수비)는 홈런 = 컴퓨터(수비) 베이스인원+본인점수
     else if (num1 == 0 && num2 == 2) {
        
        document.querySelector("#turn h3").innerText = "HOMERUN!";
        homerun(computer);
        alarm.innerHTML = "김동현 선수 대박터졌습니다!! 홈런입니다 홈런이에요!!!! 와ㅏㅏㅏㅏㅏ";
        zero();
        console.log("0,2 유저조건5");
        computer.count = 4;

    //유저(타자)가 ball를 했을 때 컴퓨터(수비)는 홈런 = 컴퓨터(수비) 베이스인원+본인점수    
    } else if (num1 == 1 && num2 == 2) {
        document.querySelector("#turn h3").innerText = "HOMERUN!";
        homerun(computer);
        alarm.innerHTML = "김동현 선수 대박터졌습니다!! 홈런입니다 홈런이에요!!!! 와ㅏㅏㅏㅏㅏ";
        zero();
        console.log("1,2 유저조건6");
        computer.count = 4;

    //유저(타자)가 strike를 했을 때 컴퓨터(수비)는 skill = 컴퓨터(수비) 1루 진출    
    } else if (num1 == 0 && num2 == 3) {
        computer.count = 1;  
        swingSave();
        alarm.innerHTML = "김동현 선수~ 1루타입니다!"
        console.log("0,3 유저조건7");

    //유저(타자)가 ball을 했을 때 컴퓨터(수비)는 skill = 컴퓨터(수비) 1루 진출
    } else if (num1 == 1 && num2 == 3) {
        computer.count = 1;
        swingSave();
        alarm.innerHTML = "김동현 선수~ 1루타입니다!"
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

    }//유조(수비)가 skill를 했을 때 컴퓨터(타자)는 2루타스윙실패 = 컴퓨터(타자) 1strike
    else if(num1 == 2 && num2 == 5) {
        strikeSave()
        console.log("1,5 컴터조건3");

    //유저(수비)가 skill를 했을 때 유저(타자)는 3루타스윙성공 = 유저(타자) 3루 진출
    } else if (num1 == 2 && num2 == 6) {
        computer.count = 3;
        swingSave();
        alarm.innerHTML = "김동현 선수~ 3루타입니다! 허어어어어억!!!"
        console.log("1,5 컴터조건3");

    //유저(수비)가 skill를 했을 때 컴퓨터(타자)는 파울 = 컴퓨터(타자) 대기     
    } else if (num1 == 2 && num2 == 7) {
        document.querySelector("#turn h3").innerText = "FOUL";
        alarm.innerHTML = "파울!~"
        console.log("1,7 컴터조건3");
        
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

function goLimit(team, run) {
    batter_oneBase();
    batter_twoBase();
    batter_threeBase();
    batter_homeBase(team, run);
}

// 1루타 함수
function one_ru(team) {
   if(team.count == 1) {
    computerChar_run[0].classList.remove("hidden");
    computerChar_run[0].classList.add("char1");
    game.base1 = 1;
    setTimeout(()=>oneRu1_hidden(),2000);  //2초뒤에 함수 실행
    } else if (team.count == 1 && base1 == 1) {
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        game.base1 = 1;
        computerChar_run[1].classList.remove("hidden");
        computerChar_run[1].classList.add("char2");
        game.base1 = 2;
        setTimeout(()=>oneRu1_hidden(),2000);
        setTimeout(()=>oneRu2_hidden(),2000);
    } else if (team.count == 1 && base1 == 1 && base2 == 1) {
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        game.base1 = 1;
        computerChar_run[1].classList.remove("hidden");
        computerChar_run[1].classList.add("char2");
        game.base1 = 2;
        computerChar_run[2].classList.remove("hidden");
        computerChar_run[2].classList.add("char3");
        game.base1 = 3;
        setTimeout(()=>oneRu1_hidden(),2000);
        setTimeout(()=>oneRu2_hidden(),2000);
        setTimeout(()=>oneRu3_hidden(),2000);
    } else if (team.count == 1 && base1 == 1 && base2 == 1 && base3 == 1) {
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        game.base1 = 1;
        computerChar_run[1].classList.remove("hidden");
        computerChar_run[1].classList.add("char2");
        game.base1 = 2;
        computerChar_run[2].classList.remove("hidden");
        computerChar_run[2].classList.add("char3");
        game.base1 = 3;
        computerChar_run[3].classList.remove("hidden");
        computerChar_run[3].classList.add("char4");
        score += 1;
        setTimeout(()=>oneRu1_hidden(),2000);
        setTimeout(()=>oneRu2_hidden(),2000);
        setTimeout(()=>oneRu3_hidden(),2000);
        setTimeout(()=>oneRu4_hidden(),2000);
    } else if (team.count == 1 && base2 == 1) {
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        game.base1 = 1;
        computerChar_run[2].classList.remove("hidden");
        computerChar_run[2].classList.add("char3");
        game.base1 = 3;
        setTimeout(()=>oneRu1_hidden(),2000);
        setTimeout(()=>oneRu3_hidden(),2000);
    } else if (team.count == 1 && base2 == 1 && base3 == 1) {
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        game.base1 = 1;
        computerChar_run[2].classList.remove("hidden");
        computerChar_run[2].classList.add("char3");
        game.base1 = 3;
        computerChar_run[3].classList.remove("hidden");
        computerChar_run[3].classList.add("char4");
        score += 1;
        setTimeout(()=>oneRu1_hidden(),2000);
        setTimeout(()=>oneRu3_hidden(),2000);
        setTimeout(()=>oneRu4_hidden(),2000);
    } else if (team.count == 1 && base3 == 1) {
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        game.base1 = 1;
        computerChar_run[3].classList.remove("hidden");
        computerChar_run[3].classList.add("char4");
        score += 1;
        setTimeout(()=>oneRu1_hidden(),2000);
        setTimeout(()=>oneRu4_hidden(),2000);
    } else if (team.count == 1 && base3 == 1 && base1 == 1) {
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        game.base1 = 1;
        computerChar_run[1].classList.remove("hidden");
        computerChar_run[1].classList.add("char2");
        game.base1 = 2;
        computerChar_run[3].classList.remove("hidden");
        computerChar_run[3].classList.add("char4");
        score += 1;
        setTimeout(()=>oneRu1_hidden(),2000);
        setTimeout(()=>oneRu2_hidden(),2000);
        setTimeout(()=>oneRu4_hidden(),2000);
    } 
} 

//1루타 hidden처리
function oneRu1_hidden() {
    computerChar_run[0].classList.add("hidden");
    computerChar_run[0].classList.remove("char1");
    computerChar[1].classList.remove("hidden");
}
function oneRu2_hidden() {
    computerChar_run[1].classList.add("hidden");
    computerChar_run[1].classList.remove("char2");
    computerChar[2].classList.remove("hidden");
}
function oneRu3_hidden() {
    computerChar_run[2].classList.add("hidden");
    computerChar_run[2].classList.remove("char3");
    computerChar[3].classList.remove("hidden");
}

function oneRu4_hidden() {
    computerChar_run[3].classList.add("hidden");
    computerChar_run[3].classList.remove("char4");
}







//1루   
function batter_oneBase() {
    //유저 
    if(user.count == 1) { 
        
        game.base1 = 1;
    }
    //컴퓨터
    if(computer.count == 1) { 
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        game.base1 = 1;
        setTimeout(()=>oneBase_hidden(),2000);  //2초뒤에 함수 실행
    }
} 
//1루 hidden처리
function oneBase_hidden() {
    computerChar_run[0].classList.add("hidden");
    computerChar_run[0].classList.remove("char1");
    computerChar[1].classList.remove("hidden");
}
//2루 
function batter_twoBase() {
    //유저 
    if(game.base1 == 1 && user.count == 2) {
        
        game.base2 = 1;
    }
    //컴퓨터
    if(game.base1 == 1 && computer.count == 2) {
        computerChar_run[1].classList.remove("hidden");
        computerChar_run[1].classList.add("char2");
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        computerChar[1].classList.add("hidden");
        game.base2 = 1;
        setTimeout(()=>twoBase_hidden(),2000); //2초뒤에 함수 실행
    }
}

//2루 hidden처리
function twoBase_hidden() {
    computerChar_run[1].classList.add("hidden");
    computerChar_run[1].classList.remove("char2");
    computerChar_run[0].classList.add("hidden");
    computerChar_run[0].classList.remove("char1");
    computerChar[2].classList.remove("hidden");
    computerChar[1].classList.remove("hidden");
}

//3루 
function batter_threeBase() {
    //유저 컴퓨터
    if(game.base1 == 1 && game.base2 == 1 && user.count == 3) {
        
        game.base3 = 1; 
    } 
    //컴퓨터
    if(game.base1 == 1 && game.base2 == 1 && computer.count == 3) {
        computerChar_run[2].classList.remove("hidden");
        computerChar_run[2].classList.add("char3");
        computerChar_run[1].classList.remove("hidden");
        computerChar_run[1].classList.add("char2");
        computerChar_run[0].classList.remove("hidden");
        computerChar_run[0].classList.add("char1");
        computerChar[2].classList.add("hidden");
        computerChar[1].classList.add("hidden");
        game.base3 = 1; 
        setTimeout(()=>threeBase_hidden(),2000); //2초뒤에 함수 실행
    } 
}

//3루 hidden처리
function threeBase_hidden() {
    computerChar_run[2].classList.add("hidden");
    computerChar_run[2].classList.remove("char3");
    computerChar_run[1].classList.add("hidden");
    computerChar_run[1].classList.remove("char2");
    computerChar_run[0].classList.add("hidden");
    computerChar_run[0].classList.remove("char1");
    computerChar[3].classList.remove("hidden");
    computerChar[2].classList.remove("hidden");
    computerChar[1].classList.remove("hidden");
}

//3루에서 홈 이동 score
function batter_homeBase(tem, run) {
    //유저 컴퓨터
    if(game.base1 == 1 && game.base2 == 1 && game.base3 == 1 && tem.count == 4) {
        run[3].classList.remove("hidden");
        run[3].classList.add("char4");
        run[2].classList.remove("hidden");
        run[2].classList.add("char3");
        run[1].classList.remove("hidden");
        run[1].classList.add("char2");
        run[0].classList.remove("hidden");
        run[0].classList.add("char1");
        computerChar[3].classList.remove("hidden");
        computerChar[2].classList.remove("hidden");
        computerChar[1].classList.remove("hidden");
        setTimeout(()=>home_hidden(),2000); //2초뒤에 함수 실행
        tem.score += 1;
        baseballTeam(tem);
    }
} 

//home hidden처리
function home_hidden() {
    computerChar_run[3].classList.add("hidden");
    computerChar_run[3].classList.remove("char4");
    computerChar_run[2].classList.add("hidden");
    computerChar_run[2].classList.remove("char3");
    computerChar_run[1].classList.add("hidden");
    computerChar_run[1].classList.remove("char2");
    computerChar_run[0].classList.add("hidden");
    computerChar_run[0].classList.remove("char1");
    computerChar[3].classList.remove("hidden");
    computerChar[2].classList.remove("hidden");
    computerChar[1].classList.remove("hidden");
}

//홈런일 경우 점수 
function homerun(name) {
    if(game.base1 == 1 &&  game.base2 == 1 && game.base3 == 1) {
        name.score += 4;
        homerunZero(name)
        console.log("만루홈런")
    } else if(game.base1 == 1 &&  game.base2 == 1 && game.base3 == 0) {
        name.score += 3;
        homerunZero(name)
    } else if(game.base1 == 1 &&  game.base2 == 0 && game.base3 == 1) {
        name.score += 3;
        homerunZero(name)
    } else if(game.base1 == 0 &&  game.base2 == 1 && game.base3 == 1) {
        name.score += 3;
        homerunZero(name)
    } else if(game.base1 == 1 &&  game.base2 == 0 && game.base3 == 0) {
        name.score += 2;
        homerunZero(name)
    } else if(game.base1 == 0 &&  game.base2 == 1 && game.base3 == 0) {
        name.score += 2;
        homerunZero(name)
    } else if(game.base1 == 0 &&  game.base2 == 0 && game.base3 == 1) {
        name.score += 2;
        homerunZero(name)
    } else if(game.base1 == 0 &&  game.base2 == 0 && game.base3 == 0) {
        name.score += 1;
        homerunZero(name)
    }
}


//왼쪽오른팀 점수
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
    goLimit(computer, computerChar_run);
    document.querySelector("#turn h3").innerText = "SWING!";
    zero();
}
//swing 유저 중복 처리
function swingSave2() {
    goLimit(user, userChar_run); 
    document.querySelector("#turn h3").innerText = "SWING!";
    zero();
}

function homerunZero(team) {
    game.base1 = 0;
    game.base2 = 0;
    game.base3 = 0;
    baseballTeam(team);
}
// 캐릭터이동함수


/******************************************* */
/* var popupObj;

var stopTimeCheck="";

function popupOpen(motion) {
    popupObj = motion;
    
    if(stopTimeCheck != "")
    clearTimeout(stopTimeCheck);

    stopTimeCheck = setTimeout(closePopup, 3000);
}

function closePopup(){
    if(popupObj != undefined){
        popupObj.close();
        popupObj = undefined;
    }
} */



user_turn();
attackdefense();
computerPlay();


Swing.addEventListener("click",judges1);
swingSkill.addEventListener("click",judges2);
watch.addEventListener("click",judges3);

Pitch.addEventListener("click",judge1);
pitchSkill.addEventListener("click",judge2);