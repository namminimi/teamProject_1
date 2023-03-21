function charmove(whois) {

    whois.forEach(a=>{
        a.classList.add("hidden");
        a.classList.remove("base1")
        a.classList.remove("base2")
        a.classList.remove("base3")
        a.classList.remove("base4")
        a.offsetWidth = a.offsetWidth;
    });
    if(game.tun ==0){
        user.go +=1;
    }else{
        computer.go +=1;
    }
    
    if(user.go == 1 ){
        whois[0].classList.remove("hidden");
        whois[4].classList.remove("hidden");

        whois[4].classList.add("char1");
    }
    if(user.go == 2){
        whois[0].classList.remove("hidden");
        whois[4].classList.remove("hidden");
        whois[1].classList.remove("hidden");

        whois[0].classList.add("base1");
        whois[1].classList.add("base2");

        whois[4].classList.remove("char1");
        whois[4].classList.add("char2");
    }
    if(user.go == 3){
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
    if(user.go == 4){
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
        user.go =3;
    }


    console.log (user.go)
}
