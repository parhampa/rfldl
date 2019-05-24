var siteurl = "http://profeb.ir/rfldl/";
var moburl = "http://profeb.ir/rfldl/mob/";
localStorage["lastpage"]="";
function gotohome() {
	onLoad();
    location.replace("#home");
	localStorage["lastpage"]="home";
}
function dispslid()
{
	document.getElementById('slidpart').style.display="";
	document.getElementById('dasteha').style.display='';
}

function playclick(){
	var audio = new Audio('click.mp3');
	audio.play();
}

var sss=Math.random();
var testSound=[];
testSound[sss] = new Audio();
testSound[sss].src = "loading.mp3";
/*var clone = $(testSound).clone()[0];
clone.play();
clone.onended = function() {
    $(clone).remove();   
}*/
function playSound () {
    testSound[sss].play().then(response => {

    }).catch(e => {
        console.log(e);
    })
}
function loading() {
    //gotohome();
	location.replace("#menuplc");
	/*var audio = new Audio('loading.wav');
	audio.play();*/
	//$(".my_audio").trigger('load');
	setTimeout(playSound,100)
	setTimeout(dispslid, 1000);
}



function loaddaste() {
    url = moburl + "daste.php";
    if (url.length == 0) {
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                myObj = JSON.parse(xmlhttp.responseText);
                res = "";
                for (i = 0; i < myObj.dasteha.length; i++) {
					clss="w3-animate-left";
					if(i%2==0)
					{
						clss="w3-animate-right";
					}
                    res += '<span class="'+clss+'" onclick="playclick(); ' + myObj.dasteha[i].func + '(' + "'" + myObj.dasteha[i].enname + "'" + ",'" + myObj.dasteha[i].place + "'" + ",'" + myObj.dasteha[i].locat + "'" + ')"><i style="font-size:20px;" class="' + myObj.dasteha[i].logo + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;' + myObj.dasteha[i].name + '</span><hr>';
                }
                document.getElementById('dasteha').innerHTML = res;
				onLoad();
                setTimeout(loading, 5000);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

function loadslide() {
    url = moburl + "slider.php";
    if (url.length == 0) {
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                myObj = JSON.parse(xmlhttp.responseText);
                res = "";
                for (i = 0; i < myObj.slides.length; i++) {
                    res += '<img class="mySlides w3-animate-left" src="' + siteurl + myObj.slides[i].pic + '" style="width:100%">';
                }
                document.getElementById('slidpart').innerHTML = res;
                loaddaste();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

function loadpg(id) {
    url = moburl + "onenew.php?id=" + id;
    if (url.length == 0) {
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                res = xmlhttp.responseText;
                document.getElementById('newcontent').innerHTML = res;
                location.replace('#singlenews');
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

function loadfirst() {
    url = moburl + "newslist.php";
    if (url.length == 0) {
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                myObj = JSON.parse(xmlhttp.responseText);
                res = "";
                for (i = 0; i < myObj.news.length; i++) {

                    res += '<tr onclick="loadpg(' + myObj.news[i].id + ');" class="w3-panel w3-card-2">';
                    newspic = myObj.news[i].picture;
                    if (newspic != "") {
                        newspic = siteurl + myObj.news[i].picture;
                    }
                    else {
                        newspic = "news1.jpg";
                    }
                    res += '<td style="width:30%; vertical-align:middle;"><img style="width:100%;" src="' + newspic + '"></td>';
                    res += '<td style="width:70%; vertical-align: top; padding:5px;">';
                    res += '<span style="font-family:' + "BTitrBold,'BTitrBold'" + '; color:blue; font-size:16px;">' + myObj.news[i].title + '</span><br>';
                    res += '<span style="color:black; line-height: 1.6;">';
                    kholase = myObj.news[i].minitext.substr(0, 120) + "...";
                    res += kholase + '</span></td></tr><tr><td style="height:10px;"></td><td></td></tr>';
                }
                document.getElementById('lastnewspart').innerHTML = res;

                loadslide();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

loadfirst();
function nazarsanji(enname, place, locat) {
	localStorage["lastpage"]=locat;
    url = moburl + "nazarsanji.php";
    if (url.length == 0) {
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                myObj = JSON.parse(xmlhttp.responseText);
                res = '<option value="0">وضعیت شما</option>';
                document.getElementById('titlenazarsanji').innerHTML = myObj.nazarsanji;
                for (i = 0; i < myObj.items.length; i++) {
                    res += '<option value="' + myObj.items[i].val + '">' + myObj.items[i].title + '</option>';
                }
                document.getElementById('itemnazarsanji').innerHTML = res;
                location.replace("#" + locat);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

}

function loaddastenews(enname, place, locat) {
localStorage["lastpage"]=locat;
    url = moburl + "newslist.php?d=" + enname;
    if (url.length == 0) {
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                myObj = JSON.parse(xmlhttp.responseText);
                res = "";
                for (i = 0; i < myObj.news.length; i++) {
                    res += '<tr onclick="loadpg(' + myObj.news[i].id + ');" class="w3-panel w3-card-2">';
                    newspic = myObj.news[i].picture;
                    if (newspic != "") {
                        newspic = siteurl + myObj.news[i].picture;
                    }
                    else {
                        newspic = "news1.jpg";
                    }
                    res += '<td style="width:30%; vertical-align:middle;"><img style="width:100%;" src="' + newspic + '"></td>';
                    res += '<td style="width:70%; vertical-align: top; padding:5px;">';
                    res += '<span style="font-family:' + "BTitrBold,'BTitrBold'" + '; color:blue; font-size:16px;">' + myObj.news[i].title + '</span><br>';
                    res += '<span style="color:black; line-height: 1.6;">';
                    kholase = myObj.news[i].minitext.substr(0, 120) + "...";
                    res += kholase + '</span></td></tr><tr><td style="height:10px;"></td><td></td></tr>';
                }
                document.getElementById(place).innerHTML = res;

                location.replace("#" + locat);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

function addnazarsanji() {
    selval = document.getElementById('itemnazarsanji').value;
    if (selval == 0) {
        alert("لطفا یک گزینه را انتخاب نمایید...");
    }
    else {
        url = moburl + "addnazarsanjires.php?ans=" + selval;
        if (url.length == 0) {
            return;
        } else {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    myObj = JSON.parse(xmlhttp.responseText);
                    if (myObj.msg == 0) {
                        alert("نظر شما با موفقیت ثبت شد.");
                    }
                    else {
                        alert("اشکال در ثبت نظر...");
                    }
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
    }
}