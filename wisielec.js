var password = "Chłopaki nie płaczą".toUpperCase();
var distance = password.length;
var fail = 0;
var yes = new Audio("audio/yes.wav");
var no = new Audio("audio/no.wav");
var password1 = "";

for (i = 0; i < distance; i++) {
    if (password.charAt(i) == " ") password1 = password1 + " ";
    else password1 = password1 + "-";
}

function write_password() {
    document.getElementById("board").innerHTML = password1;
}

window.onload = start;

var letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";

function start() {
    var content = "";

    for (i = 0; i <= 34; i++) {
        var element = "let" + i;
        content = content + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>';
        if ((i + 1) % 7 == 0) content = content + '<div style="clear:both;"></div>'
    }

    document.getElementById("alphabet").innerHTML = content;

    write_password();

}

String.prototype.setsign = function (place, sign) {
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + sign + this.substr(place + 1);
}

function check(nr) {
    var hit = false;

    for (i = 0; i < distance; i++) {
        if (password.charAt(i) == letters[nr]) {
            password1 = password1.setsign(i, letters[nr]);
            hit = true;
        }
    }

    if (hit == true) {
        yes.play();
        var element = "let" + nr;
        document.getElementById(element).classList.add("background-yes");
        document.getElementById(element).setAttribute("onclick", ";");
        write_password();
    }
    else {
        no.play();
        var element = "let" + nr;
        document.getElementById(element).classList.add("background-no");
        document.getElementById(element).setAttribute("onclick", ";");

        //fail
        fail++;
        var image = "img/s" + fail + ".jpg";
        document.getElementById("hangman").innerHTML = '<img src="' + image + '" alt="" />';

    }

    //winner
    if (password == password1)
        document.getElementById("alphabet").innerHTML = "Tak jest!<br/> Podane hasło jest prawidłowe:<br/>" + password + '<br/><br/><span class="reset" onclick="location.reload()">Grasz jeszcze raz?</span>'

    //loss
    if (fail >= 9)
        document.getElementById("alphabet").innerHTML = "Przegrana!<br/> Prawidłowe hasło to:<br/>" + password + '<br/><br/><span class="reset" onclick="location.reload()">Grasz jeszcze raz?</span>'
}