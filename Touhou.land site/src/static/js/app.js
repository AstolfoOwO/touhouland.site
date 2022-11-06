const parallax = (e) => {
    document.querySelectorAll('.layer').forEach(
        layer=>{
            const speed=layer.getAttribute('data-speed');
            const x=(window.innerWidth-e.pageX*speed)/100;
            const y=(window.innerHeight-e.pageY*speed)/100;
            layer.style.transform=`translate(${x}px, ${y}px)`;
        }
    );
}

document.addEventListener(
    'mousemove',
    e => parallax(e)
);

const NavBar = () => {
    var x=document.getElementById("respNav");
    if(x.className==="navbar"){
        x.className+=" responsive";
    }else{
        x.className="navbar";
    }
}

const getDate = () => {
    let date = new Date();
    let hours = date.getHours();
    if (hours >= 0 && hours < 6) {
        document.getElementById('hello').innerHTML = "Доброй ночи! Почему еще не спите? Добро пожаловать на";
    } else if (hours >= 6 && hours < 12) {
        document.getElementById('hello').innerHTML = "Доброе утро! Добро пожаловать на";
    } else if (hours >= 12 && hours < 18) {
        document.getElementById('hello').innerHTML = "Добрый день! Добро пожаловать на";
    } else if (hours >= 18) {
        document.getElementById('hello').innerHTML = "Добрый вечер! Добро пожаловать на";
    }

}

setInterval(getDate, 0);
