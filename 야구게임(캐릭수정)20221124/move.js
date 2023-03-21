
 //현 변수 다른파일에서 사용하기
 


function position(charNum,left,top){
    userChar[charNum].style.left = `${left}%`
    userChar[charNum].style.top = `${top}%`   
    userChar[charNum].style.transition = "0.5s"     
}
position(0,50,74)
position(1,81,31)
position(2,50,10)
position(3,18,33)

function baseballTeam(team) {
    if(team == computer) {
        leftScore.innerHTML = team.score;
    } else {
        rightScore.innerHTML = team.score;
    }

    //게임종료 화면에 띄울 점수 
    gameover_p.innerHTML = `${computer.score} : ${user.score}`
     //게임종료 화면용
    if (computer.score == user.score) {
        gameover_h4.innerHTML = "무승부입니다."
    } else if(computer.score > user.score) {
        gameover_h4.innerHTML = `${comTeamName} 팀이 이겼습니다`
    } else {
        gameover_h4.innerHTML = `${userTeamName.innerHTML} 팀이 이겼습니다`
    }
    gameover_h3.innerHTML = comTeamName + " vs " + userTeamName.innerHTML;
}


// function hiddenclass(){
//     userChar.forEach(a=>a.classList.add("hidden"));
//     userChar[0].classList.remove("hidden");
//     userChar[1].classList.remove("hidden");
//     userChar[2].classList.remove("hidden");
//     userChar[3].classList.remove("hidden");
// }

function charmove(team){
    console.log(`who play Now.${team.name}`)
    console.log("charmove실행중")
    //스킬  
    if(team.count == 7 && game.base1==0 && game.base2==1 && game.base3==0){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 =1;
        game.base2 = 0;
        game.base3 =1;
        console.log("실행11스킬")
        baseballTeam(team)
        return
    }
    if(team.count == 7 && game.base1==0 && game.base2==0 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 0;
        team.score += 1;
        console.log("실행12스킬")
        baseballTeam(team)
        return
    }
    if(team.count == 7 && game.base1==1 && game.base2==1 && game.base3==0){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 1;
        console.log("실행13스킬")
        baseballTeam(team)
        return
    }
    if(team.count == 7 && game.base1==1 && game.base2==0 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 0;
        team.score +=1;
        console.log("실행14스킬")
        baseballTeam(team)
        return
    }
    if(team.count == 7 && game.base1==1 && game.base2==0 && game.base3==0){
        // 홈에서 1루로 이동 
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 0;
        console.log("실행10스킬")
        baseballTeam(team)
        return
    }


    if(team.count == 7 && game.base1==0 && game.base2==1 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 1
        console.log("실행15스킬");
        baseballTeam(team);
        return
    }
    if(team.count == 7 && game.base1==1 && game.base2==1 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 1;
        team.score += 1
        console.log("실행16스킬")
        baseballTeam(team)
        return
    }
    if (team.count == 7 && game.base1==0 && game.base2==0 && game.base3==0) {
        // 홈에서 1루로 이동 
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 0;
        console.log("실행9스킬")
        baseballTeam(team)
        return

    }

    // 볼넷
    if (game.ball == 4 && game.base1==0 && game.base2==0 && game.base3==0) {
        // 홈에서 1루로 이동 
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 0;
        console.log("실행1")
        baseballTeam(team)
        game.ball = 0;
        return


    }
    if(game.ball == 4 && game.base1==1 && game.base2==0 && game.base3==0){
        // 홈에서 1루로 이동 
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 0;
        console.log("실행2")
        baseballTeam(team)
        game.ball = 0;
        return


    }

    if(game.ball == 4 && game.base1==0 && game.base2==1 && game.base3==0){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 =1;
        game.base2 = 0;
        game.base3 =1;
        console.log("실행3")
        baseballTeam(team)
        game.ball = 0;
        return


    }
    if(game.ball == 4 && game.base1==0 && game.base2==0 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 0;
        team.score += 1
        console.log("실행4")
        baseballTeam(team)
        game.ball = 0;
        return


    }
    if(game.ball == 4 && game.base1==1 && game.base2==1 && game.base3==0){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 1;
        console.log("실행5")
        baseballTeam(team)
        game.ball = 0;
        return


    }
    if(game.ball == 4 && game.base1==1 && game.base2==0 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 0;
        console.log("실행6")
        baseballTeam(team)
        game.ball = 0;
        return


    }

    if(game.ball == 4 && game.base1==0 && game.base2==1 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 1
        console.log("실행7")
        baseballTeam(team)
        game.ball = 0;
        return


    }
    if(game.ball == 4 && game.base1==1 && game.base2==1 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 1;
        team.score += 1
        console.log("실행8")
        baseballTeam(team)
        game.ball = 0;
        return


    }

    // 1루타
    
    if(team.count == 0 && game.base1==0 && game.base2==1 && game.base3==0){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 =1;
        game.base2 = 0;
        game.base3 =1;
        console.log("실행11")
        baseballTeam(team)
        return


    }
    if(team.count == 0 && game.base1==1 && game.base2==1 && game.base3==0){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 1;
        console.log("실행13")
        baseballTeam(team)
        return
    }

    if(team.count == 0 && game.base1==1 && game.base2==0 && game.base3==0){
        // 홈에서 1루로 이동 
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 0;
        console.log("실행10")
        baseballTeam(team)
        return


    }
    if(team.count == 0 && game.base1==0 && game.base2==0 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 0;
        team.score += 1
        console.log("실행12")
        baseballTeam(team)
        return


    }



    if(team.count == 0 && game.base1==1 && game.base2==0 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 0;
        team.score += 1;
        console.log("실행14")
        baseballTeam(team)
        return


    }

    if(team.count == 0 && game.base1==0 && game.base2==1 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 1
        console.log("실행15")
        baseballTeam(team)
        return


    }
    if(team.count == 0 && game.base1==1 && game.base2==1 && game.base3==1){
        userChar[1].classList.remove("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 1;
        game.base2 = 1;
        game.base3 = 1;
        team.score += 1
        console.log("실행16")
        baseballTeam(team)
        return


    }
    if (team.count == 0 && game.base1==0 && game.base2==0 && game.base3==0) {
        // 홈에서 1루로 이동 
        userChar[1].classList.remove("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 1;
        game.base2 = 0;
        game.base3 = 0;
        console.log("실행9")
        baseballTeam(team)
        return

    }
    //2루타
    if(team.count ==5 && game.base1==1 && game.base2==0 && game.base3==0){
        userChar[1].classList.add("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 1;
        game.base3 = 1;
        console.log("실행18")
        baseballTeam(team)
        return


    }
    if(team.count ==5 && game.base1==0 && game.base2==1 && game.base3==0){
        userChar[1].classList.add("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 =0;
        game.base2 = 1;
        game.base3 =0;
        team.score += 1;
        console.log("실행19")
        baseballTeam(team)
        return


    }
    if(team.count == 5 && game.base1==0 && game.base2==0 && game.base3==1){
        userChar[1].classList.add("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 0;
        game.base2 = 1;
        game.base3 = 0;
        team.score += 1;
        console.log("실행20")
        baseballTeam(team)
        return


    }
    if(team.count == 5 && game.base1==1 && game.base2==1 && game.base3==0){
        userChar[1].classList.add("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 1;
        game.base3 = 1;
        team.score += 1;
        console.log("실행21")
        baseballTeam(team)
        return


    }
    if(team.count == 5 && game.base1==1 && game.base2==0 && game.base3==1){
        userChar[1].classList.add("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 1;
        game.base3 = 1;
        team.score += 1;
        console.log("실행22")
        baseballTeam(team)
        return


    }

    if(team.count == 5 && game.base1==0 && game.base2==1 && game.base3==1){
        userChar[1].classList.add("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 0;
        game.base2 = 1;
        game.base3 = 0;
        team.score += 2
        console.log("실행23")
        baseballTeam(team)
        return


    }
    if(team.count == 5 && game.base1 == 1 && game.base2 == 1 && game.base3 == 1){
        userChar[1].classList.add("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 1;
        game.base3 = 1;
        team.score += 2
        console.log("실행24")
        baseballTeam(team)
        return


    }
    if (team.count ==5 && game.base1==0 && game.base2==0 && game.base3==0) { 
        userChar[1].classList.add("hidden");
        userChar[2].classList.remove("hidden");
        userChar[3].classList.add("hidden");
        game.base1 = 0;
        game.base2 = 1;
        game.base3 = 0;
        console.log("실행17")
        baseballTeam(team)
        return

    }

    //3루타
    
    if(team.count ==6 && game.base1 ==1 && game.base2 ==0 && game.base3 ==0){
        userChar[1].classList.add("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 1
        console.log("실행26")
        baseballTeam(team)
        return


    }
   
    if(team.count ==6 && game.base1 == 0 && game.base2 == 1 && game.base3 == 0 ){
        userChar[1].classList.add("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 =0;
        game.base2 = 0;
        game.base3 =1;
        team.score += 1;
        console.log("실행27")
        baseballTeam(team)
        return


    }
    
    if(team.count == 6 && game.base1 == 0 && game.base2 == 0 && game.base3 == 1){
        userChar[1].classList.add("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 1;
        console.log("실행28")
        baseballTeam(team)
        return


    }
    if(team.count == 6 && game.base1 == 1 && game.base2 == 1 && game.base3 == 0){
        userChar[1].classList.add("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 2;
        console.log("실행29")
        baseballTeam(team)
        return


    }
    if(team.count == 6 && game.base1 == 1 && game.base2 == 0 && game.base3 == 1){
        userChar[1].classList.add("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 2;
        console.log("실행30")
        baseballTeam(team)
        return


    }

    if(team.count == 6 && game.base1 == 0 && game.base2 == 1 && game.base3 == 1){
        userChar[1].classList.add("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 2
        console.log("실행31")
        baseballTeam(team)
        return


    }
    if(team.count == 6 && game.base1 == 1 && game.base2 == 1 && game.base3 == 1){
        userChar[1].classList.add("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 0;
        game.base3 = 1;
        team.score += 3
        console.log("실행32")
        baseballTeam(team)
        return


    }
    if (team.count ==6 && game.base1==0 && game.base2==0 && game.base3==0) { 
        userChar[1].classList.add("hidden");
        userChar[2].classList.add("hidden");
        userChar[3].classList.remove("hidden");
        game.base1 = 0;
        game.base2 = 0;
        game.base3 = 1;
        console.log("실행25")
        baseballTeam(team)
        return


    }
}
function homerun(team){
    
    homerun_img.classList.remove("hidden");   
        // button disable 
    attackbuttoninput.forEach(arr=>arr.disabled = true);
    defensebuttoninput.forEach(arr=>arr.disabled = true);
    
    function homerunchar(charNum){
        // 인덱스번호를 받아서 히든클래스를 없애고 홈런애니메이션 클래스 추가
        userChar[charNum].classList.add(`homerun${charNum+1}`)
        userChar[charNum].classList.remove("hidden") 
    }
    

    if(homerunNum == 0){
        homerunchar(0);
        team.score += 1;
        console.log("실행1홈런")

    }
    if(homerunNum == 1){
        homerunchar(0);
        homerunchar(1);
        console.log("실행2홈런")
        team.score += 2;
    }
    if(homerunNum == 2){
        homerunchar(0);
        homerunchar(2);
        console.log("실행3홈런")
        team.score += 2;
    }
    if(homerunNum == 3){
        homerunchar(1);
        homerunchar(2);
        console.log("실행4홈런")
        team.score += 3;
    }
    if(homerunNum == 4){
        homerunchar(3);
        console.log("실행5홈런")
        team.score += 2;
    }
    if(homerunNum == 5){
        homerunchar(1);
        homerunchar(3);
        console.log("실행6홈런")
        team.score += 3;
    }
    if(homerunNum == 6){
        homerunchar(2);
        homerunchar(3);
        console.log("실행7홈런")
        team.score += 3;
    }
    if(homerunNum == 7){
        homerunchar(1);
        homerunchar(2);
        homerunchar(3);
        console.log("실행8홈런")
        team.score += 4;
    }
    // 조건문 실행후 베이스 초기화
    game.base1 = 0;
    game.base2 = 0;
    game.base3 = 0;
    // 각팀점수 전광판에 입력
    baseballTeam(team)

    setTimeout(function(){
        userChar.forEach(arr=>{
            arr.classList.remove("homerun1","homerun2","homerun3","homerun4");
            arr.classList.add("hidden");
        })
        userChar[0].classList.remove("hidden")
    },3000)
    // homerun img,button disabled 해제
    setTimeout(function(){
        homerun_img.classList.add("hidden"); 
        attackbuttoninput.forEach(arr=>arr.disabled = false);
        defensebuttoninput.forEach(arr=>arr.disabled = false);

    },4000)
}






// style="animation: name duration timing-function delay iteration-count direction fill-mode;"