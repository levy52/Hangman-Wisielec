var password = "Chłopaki nie płaczą";
password = password.toUpperCase();

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

var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ź";
letters[34] = "Ż";

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
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        write_password();
    }
    else {
        no.play();
        var element = "let" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
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