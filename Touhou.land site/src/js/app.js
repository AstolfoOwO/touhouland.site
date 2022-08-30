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

function scrollNav(){
    $('.docs_list, .docs_list_to').click(function(){
        $(".docs_active").removeClass("docs_active");
        $(this).addClass("docs_active");
        $('html, body').stop().animate({scrollTop:$($(this).attr('href')).offset().top-1},300);
        return true;
    }
    );
}
scrollNav();
function checkMeNSFW(selected){
    if(selected)document.getElementById("violations_content").style.display="none";
    else document.getElementById("violations_content").style.display="flex";
}

function autosize(){
    var text=$('textarea');
    text.each(function(){
        $(this).attr('rows',1);
        resize($(this));
    });
    text.on('input', function(){
        resize($(this));
    });
    function resize($text){
        $text.css('height','auto');
        $text.css('height',$text[0].scrollHeight+'px');
    }
}
autosize();