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

function NavBar(){
    var x=document.getElementById("respNav");
    if(x.className==="navbar"){
        x.className+=" responsive";
    }else{
        x.className="navbar";
    }
}
