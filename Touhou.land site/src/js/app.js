const oauth = () => {
    location.replace("https://discord.com/api/oauth2/authorize?client_id=1013094806324510770&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2FTouhou.land%2520site%2Fsrc%2Fhtml%2Findex.html&response_type=code&scope=identify")
}

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