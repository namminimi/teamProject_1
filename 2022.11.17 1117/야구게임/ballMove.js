/*  1. 야구규칙 11/15xxxxxxxxxxxxxxxx
인원 9명의 선수와 감독이 한 팀
횟수는 1~9회(몇회 초/ 몇회 말)
매회 공격팀에서 타자 3명이 아웃되면 공수 교대


수비쪽에서 공을 던지지 않고 포수와 의견 교류중일때 베이스에 서있는 공격은 도루
수비쪽에서 공을 던졌을때 공격이 공을 못친다면 스타라이크(3개쌓이면 아웃) / 볼(4개 쌓이면 베이스이동) / 데드볼(베이스로 이동)
수비쪽에서 공을 던졌을때 공격이 공을 친다면  안타/파울/홈런
수비쪽에서 공을 던졌을때 공격이 공을 치긴했는데 뒤나 왼쪽 오른쪽 라인 밖으로 나갈경우 파울(이때는 게이지 안채워짐)
타자 3명이 아웃될 경우 공수 교대 몇회 초 -> 말로 변경

--------------------------------------------------------------------------------

공격
1.안타 (1루타30% 2루타15% 3루타8% 확률)
땅볼 (30%)
2.파울(공이 밖 으로 나갔을 때 10% x
3.데드볼 (공이 타자몸에 맞았을때 5%) x
4.홈런 (장외 1%)
5. 도루(투수가 공던지기전에 12루에 있는 타자가 눈치보고 다음베이스로 이동 1%) x


-------------------------------------------------------------------------------

수비
스트라이크 S( 1. 헛스윙했을때/ 타자가 스윙하지 않았을때 )
    (타자쪽 범위 안타, 파울, 홈런, 스트라이크 당하던가)
볼 B( 스트라이크 존 밖에서 포수가 공을 잡았을 때 )//볼이 4회 쌓였을때 한 베이스씩 진출\
    (타자쪽 범위 안타. 파울, 홈런, 가만히있기, 데드볼)
아웃 O(스트라이크 3회 쌓였을때/ 타자가 친 공이 땅에 닿기 전에 수비수가 잡을떄)


-------------------------------------------------------------------------------'

4. 자바스크립트 11/18~ 11/20
1) strike, ball, out 게이지 채우는거(좌측상단
2) 몇회인지 초/말 변경, strike인지, ball인지, foul인지(공격 %확인/좌측 하단 버튼 클릭) 변경
3) 팀명 바뀌기, 팀점수 선수 endbase들어올때마다 +1
4) 로그 기록 유저, 컴퓨터 공격 수비 기록
5)1루 2루 3루 캐릭터 이동 코드 */

/*
변수선언 요소
몇게임 할껀지 turn
n회초 n회말 inning_start
strike ball -- 

버튼을 클릭하면 바껴야되는 요소
strile or ball -- #turn h3
if strike,ball,out 상태에따라 게이지에 색칠
결과에 따라 캐릭터가 이동 
로그 추가
alarm에 결과표시.
*/

// 상황판
const strike = document.querySelectorAll("#yellow_strike p");
const ball = document.querySelectorAll("#green_ball p");
const out = document.querySelectorAll("#red_out p");

//유저 팀이름을 입력받음  -
const teamname ="d" //prompt("구단주님 팀 이름을 입력하세요");
const userTeamName = document.querySelector("#right_team").innerHTML =teamname;
document.querySelector("#left_team").innerHTML = `Siri`;
// 점수가 들어갈 dom요소
const leftsocre = document.querySelector("#left_score");
const rightsocre = document.querySelector("#right_score");
//버튼 클릭시 결과가 로그로 전송
const ul = document.querySelector("#logBox ul");

//각 객체
// 공격 버튼연결
const longSwing = document.querySelector("#attack input:nth-child(2)")
const bunt = document.querySelector("#attack input:nth-child(3)")
const homeRun = document.querySelector("#attack input:nth-child(4)")
const skill_batter = document.querySelector("#attack input:nth-child(5)")
// 수비 버튼연결
const strike_button = document.querySelector("#defense input:nth-child(2)");
const ball_button = document.querySelector("#defense input:nth-child(3)");
const skill_pitcher = document.querySelector("#defense input:nth-child(4)");


const user = {
   strike: 0, 
   ball: 0,
   out: 0,
   score:0,
   type: 0   //0일때 공격 x
}
const computer ={
    // 컴퓨터 객체
    strike: 0, 
    ball: 0,
    out: 0,
    score:0,
    type: !user.type   //1일때 공격 x
}
const game = {
    inning:1,
    tun:0             // 0,1
}

// strike,ball,out갯수에 따라 상황판 색칠
function strikefc(){
    for(let i=0;i < user.strike;i++){
        if(user.strike >= 3){
            strike.forEach(a=>a.style.background = "none")
            user.out += 1; 
            user.strike = 0;
            return
        }
        strike[i].style.background = "yellow";
    }
}
function ballfc(){
    for(let i=0;i < user.ball;i++){
        if(user.ball == 4){
            //user.ball = 0;
            ball.forEach(a=>a.style.background = "none")
            return
        }

        ball[i].style.background = "green";
    }
}
function outfc(){
    for(let i=0;i < user.out;i++){
        if(user.out >= 3){
            tuntun();  //턴 0 일 경우 1로 바꿔주는 함수 반대도 가능
            user_turn(); //이닝 연결
            user.out = 0;
            out.forEach(a=>a.style.background = "none")
        return;
        }
    out[i].style.background = "red";
   }
   
}


// 유저팀 아웃이 3회 일경우 1회 초->말 변경
// 컴퓨터팀 아웃이  3회일경우  1회 말 => 2회초 변경
// 공수 변경될때마다 이닝 변경

//유저 컴퓨터 교대및 이닝횟수
function user_turn() {
    if (game.tun == 0) {
        document.querySelector("#turn p").innerHTML = `${game.inning}회 초 공격`;
    } else if(game.tun == 1) {
        document.querySelector("#turn p").innerHTML = `${game.inning}회 말 수비`;
        game.inning = game.inning + 1;
    }
}

user_turn();

//턴 0 과 1 변경
function tuntun() {
    if(game.tun == 0) {
        game.tun = 1; 
    } else if (game.tun == 1) {
        game.tun = 0;
    }
}


/*///////// 공격 판정///////////////////
1.안타 (1루타70% 2루타30% 3루타5% 확률)
땅볼 (30%)
2.파울(공이 밖 으로 나갔을 때 10% x
3.데드볼 (공이 타자몸에 맞았을때 5%) x
4.홈런 (장외 1%)
5. 도루(투수가 공던지기전에 12루에 있는 타자가 눈치보고 다음베이스로 이동 1%) x */

///////////////////////////수정해야한다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ 확룰 ㅈ가턴야랴ㅐ
function judges(event) {
    let random_num = Math.random();

    if (event.target.value == "홈런" && random_num < 0.1) {
        log("꺄ㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑ홈ㅁㅁㅁㅁ런ㄴㄴㄴㄴ!!!!");
    } else {
        log("sfsdfsdfsdf");
    }

    //번트 클릭했을 때
    if (event.target.value == "번트") {
        log("남민섭 선수 번트 성공ㅎㅎ");   //1루 진출
    } 

    //안타를 클릭했을 때
    if (event.target.value == "안타") {
        if (random_num < 0.2) {
            console.log("남민섭 선수!!! 3루타입니다~~ WOW!!!!");
            log("남민섭 선수!!! 3루타입니다~~ WOW!!!!"); //3루까지 진출
        } else if (random_num < 0.25) {
            console.log("남민섭 선수! 2루타 2루타입니다~~");
            log("남민섭 선수! 2루타 2루타입니다~~"); //2루까지 진출
        } else if (random_num < 0.7 ) {
            console.log("남민섭 선수가 1루타를 쳤습니다.");
            log("남민섭 선수가 1루타를 쳤습니다.");  //1루까지 진출
        }
    }
}



/////////////   판정   ////////////////////
//usesr가 strike를 클릭시 strike 가 화면에 뜸/ 20% 확률로 ball이 뜰 때도 있음
//usesr가 ball을 클릭시 ball이 화면에 뜸 // 10%확룰로 strike가 뜰 수 있음
//usert가 skill을 클릭시 strike 화면에 뜸 // 99%확률로 strike뜸



function judge(event) {
    let random_num = Math.random();
    // 스트라이크를 클릭했을때
    if (event.target.value == "스트라이크" && user.strike <3) {
        if(random_num < 0.8){
            console.log("스트라이크")
            document.querySelector("#turn h3").innerText = "STRIKE";
            log("스타라이크를 성공!!");
            user.strike = user.strike + 1;
        }else{
            document.querySelector("#turn h3").innerText = "BALL";
            log("아쉽습니다. 스트라이크 실패 볼이 나왔네요 ㅠㅠ");
            user.ball= user.ball + 1;
            console.log("볼")
        };
    } 
    //볼을 클릭했을때
    if(event.target.value == "볼"){
        document.querySelector("#turn h3").innerText = "BALL";
        user.ball= user.ball + 1;
        log("볼 성공");
    }
    //스킬을 클릭했을때
    if(event.target.value == "스킬: 빛보다 빠르게"){
        document.querySelector("#turn h3").innerText = "STRIKE";
        user.strike = user.strike + 1;
        log("스킬을 사용합니다. strike!!!!!!");
    }
    
    strikefc();
    ballfc();
    outfc();
    pitcher();
} 

//로그창에 기록남기기  ////스크롤바 아래 고정 어케하노ㅗㅗㅗㅗㅗㅗ멘붕랴ㅐㅇ먼뢔ㅑㄴㅇㄹ
function log(text) {
    let newLi = document.createElement("li")
    newLi.innerHTML = `${text}`;
    ul.appendChild(newLi);
}




/* -------------------------------------------------------------- */

// 캐릭터 움직임
// 1루 left:2352px top:810px
// 2루 left:1504px top:414px
// 3루 left:658px top:784px

const character = document.querySelector("#character");
const wrap =document.querySelector("#wrap");



function pitcher() {
    if(character.style.left == `400px` &&  character.style.top == `310px` && user.ball == 4){
        character.style.left = `50%`
        character.style.top = `95%`
        user.ball = 0;    
    }
    if(character.style.left == `750px` &&  character.style.top == `150px` && user.ball == 4){
        character.style.left = `400px`
        character.style.top = `310px`
        user.ball = 0;    
    }
    if(character.style.left == `1152px` &&  character.style.top == `310px` && user.ball == 4){
        character.style.left = `750px`
        character.style.top = `150px`
        user.ball = 0;    
    }
    if (user.ball == 4) {
        console.log(1)
        character.style.left = `1152px`
        character.style.top = `310px`
        user.ball = 0;
    }
    
}
pitcher();

// wrap.addEventListener("click",function(event){
    //     let x = event.pageX;
    //     let y = event.pageY;
    //     character.style.left = `${x}px`
    //     character.style.top = `${y}px`
    // })
    
    
strike_button.addEventListener("click",judge);
ball_button.addEventListener("click",judge);
skill_pitcher.addEventListener("click",judge);

longSwing.addEventListener("click",judges);
bunt.addEventListener("click",judges);
homeRun.addEventListener("click",judges);
skill_batter.addEventListener("click",judges);

