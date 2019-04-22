var moves = 0;
var prev = null;
var ar = [];
var black_pieces = ["brook1", "bknight1", "bbishop1", "bking1", "bqueen1", "brook2", "bknight2", "bbishop2", "bpawn1", "bpawn2", "bpawn3", "bpawn4", "bpawn5", "bpawn6", "bpawn7", "bpawn8"];
var white_pieces = ["wrook1", "wknight1", "wbishop1", "wking1", "wqueen1", "wrook2", "wknight2", "wbishop2", , "wpawn1", "wpawn2", "wpawn3", "wpawn4", "wpawn5", "wpawn6", "wpawn7", "wpawn8"];
var cells = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8"
          , "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"
          , "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"
          , "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"
          , "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8"
          , "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"
          , "g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"
          , "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"];
var record = [];
var paths = [];
var trace = [];
var states = [];
window.onclick = function (e) {
    var cName = (e.srcElement.className); // then e.srcElement.className has the class
    li = cName.split(" ");
    //console.log(li);
    for (var i = 0; i < li.length; i++) {
        if (li[i].length == 2)
            record.push(li[i]);
        if (record.length > 2)
            record.shift();
    }

    if (li.length > 3)
        tgt = "." + li[li.length - 2];
    else
        tgt = "." + li[li.length - 1];

    //console.log("tgt="+tgt);
    //console.log(record);
    if (ar.length <= 1) {
        if (tgt.length == 3) {
            //document.querySelector(tgt).classList.toggle("from");
            //console.log("inside if");
            ar.push(tgt);
        }
    } else {
        if (tgt.length == 3) {
            //document.querySelector(ar[0]).classList.toggle("from");
            //document.querySelector(ar[1]).classList.toggle("from");
            //document.querySelector(tgt).classList.toggle("from");
            ar.shift();
            ar.push(tgt);
        }
    }
    //console.log("end");

    var elmnt = (e.srcElement.className).split(" ");
    console.log("element");
    //console.log(elmnt);

    if (white_pieces.includes(elmnt[elmnt.length - 2])) {
        paths = showpath_w(elmnt);
        console.log(e.srcElement);
        states.push(e.srcElement);
        if (states.length > 2)
            states.shift();

    } else if (black_pieces.includes(elmnt[elmnt.length - 2])) {
        paths = showpath_b(elmnt);
        console.log(e.srcElement);
        states.push(e.srcElement);
        if (states.length > 2)
            states.shift();
    } else {
        paths = null;
        //console.log(e.srcElement.firstElementChild);
        states.push(e.srcElement.firstElementChild);
        if (states.length > 2)
            states.shift();
    }

    trace.push(paths);
    if (trace.length > 2)
        trace.shift();
    /*console.log("elements");
    console.log(elmnt);
    console.log("trace");
    console.log(trace);
    console.log("states");
    console.log(states);
    console.log("record");
    console.log(record);*/
    if (trace[0].includes(record[record.length - 1])) {
        if(moves%2==0 && states[0].classList[0]=="w")
            moves=move(states, record,moves);
        else if(moves%2!=0 && states[0].classList[0]=="b")
             moves=move(states, record,moves);

    }
    //console.log(trace[0]);
    //console.log(record[record.length-1]);


}

function move(states, record,moves) {
    console.log("states");
    console.log(states);
    states[1].src = states[0].src;
    states[0].src = "";
    cnames = states[0].className.split(" ");
    cnames.pop();
    cnames.push(record[record.length - 1]);
    var names = "";
    for (var i = 0; i < cnames.length; i++) {
        if (i != cnames.length - 1)
            names = names + cnames[i] + " ";
        else
            names = names + cnames[i];
    }
    states[1].className = names;
    states[0].className = "";

    var mv = record[0] + "-" + record[1];
    var node = document.createElement("p"); // Create a <li> node
    var textnode = document.createTextNode(mv); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    document.getElementById("history").appendChild(node);
    
    moves++;
    return moves;
}

function showpath_w(elmnt) {
    var s = elmnt[1];
    var pos = elmnt[2];
    var clr = elmnt[0];
    var paths = [];
    var piece = s.substring(1, s.length - 1);
    if (piece == "pawn") {
        var a = pos.substring(0, 1);
        var b = pos.substring(1);
        if (a == "b") {
            var p1 = "c" + b;
            var check_cell = "img" + "." + p1;
            var dummy = document.querySelectorAll(check_cell);
            if (dummy.length == 0)
                paths.push(p1);
            p1 = "d" + b;
            check_cell = "img" + "." + p1;
            dummy = document.querySelectorAll(check_cell);
            if (dummy.length == 0)
                paths.push(p1);
        } else {
            var p1 = String.fromCharCode(a.charCodeAt() + 1) + b;
            var check_cell = "img" + "." + p1;
            var dummy = document.querySelectorAll(check_cell);
            if (dummy.length == 0)
                paths.push(p1);
        }
        var p1 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() - 1);
        var check_cell = "img" + "." + p1;
        var dummy = document.querySelector(check_cell);
        if (dummy != null) {

            if (dummy.classList != null) {
                //console.log("dummy");
                var li = dummy.classList;
                if (li[0] == "b")
                    paths.push(p1);
            }
        }
        p1 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() + 1);
        check_cell = "img" + "." + p1;
        dummy = document.querySelector(check_cell);
        if (dummy != null) {

            if (dummy.classList != null) {
                //console.log("dummy");
                var li = dummy.classList;
                if (li[0] == "b")
                    paths.push(p1);
            }
        }
    } else if (piece == "rook") {
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        for (var i = 1; i <= 8; i++) {
            var p1 = String.fromCharCode(a.charCodeAt() - i) + b;
            var p2 = String.fromCharCode(a.charCodeAt() + i) + b;
            var p3 = a + String.fromCharCode(b.charCodeAt() + i);
            var p4 = a + String.fromCharCode(b.charCodeAt() - i);
            if (cells.includes(p1))
                var e1 = document.querySelector("img." + p1);
            if (cells.includes(p2))
                var e2 = document.querySelector("img." + p2);
            if (cells.includes(p3))
                var e3 = document.querySelector("img." + p3);
            if (cells.includes(p4))
                var e4 = document.querySelector("img." + p4);

            if (e1 == null && b1 == 0)
                paths.push(p1);
            else if (e1 != null && e1.classList[0] == "w")
                b1 = 1;
            else if (e1 != null && e1.classList[0] == "b" && b1 == 0) {
                b1 = 1;
                paths.push(p1);
            }

            if (e2 == null && b2 == 0)
                paths.push(p2);
            else if (e2 != null && e2.classList[0] == "w")
                b2 = 1;
            else if (e2 != null && e2.classList[0] == "b" && b2 == 0) {
                b2 = 1;
                paths.push(p2);
            }

            if (e3 == null && b3 == 0)
                paths.push(p3);
            else if (e3 != null && e3.classList[0] == "w")
                b3 = 1;
            else if (e3 != null && e3.classList[0] == "b" && b3 == 0) {
                b3 = 1;
                paths.push(p3);
            }

            if (e4 == null && b4 == 0)
                paths.push(p4);
            else if (e4 != null && e4.classList[0] == "w")
                b4 = 1;
            else if (e4 != null && e4.classList[0] == "b" && b4 == 0) {
                b4 = 1;
                paths.push(p4);
            }
        }
        //console.log("paths");
        //console.log(paths);

    } else if (piece == "knight") {
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var p1 = String.fromCharCode(a.charCodeAt() - 2) + String.fromCharCode(b.charCodeAt() + 1);
        var p2 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() + 2);
        var p3 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() + 2);
        var p4 = String.fromCharCode(a.charCodeAt() + 2) + String.fromCharCode(b.charCodeAt() + 1);
        var p5 = String.fromCharCode(a.charCodeAt() + 2) + String.fromCharCode(b.charCodeAt() - 1);
        var p6 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() - 2);
        var p7 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() - 2);
        var p8 = String.fromCharCode(a.charCodeAt() - 2) + String.fromCharCode(b.charCodeAt() - 1);
        if (cells.includes(p1))
            var e1 = document.querySelector("img." + p1);
        if (cells.includes(p2))
            var e2 = document.querySelector("img." + p2);
        if (cells.includes(p3))
            var e3 = document.querySelector("img." + p3);
        if (cells.includes(p4))
            var e4 = document.querySelector("img." + p4);
        if (cells.includes(p5))
            var e5 = document.querySelector("img." + p5);
        if (cells.includes(p6))
            var e6 = document.querySelector("img." + p6);
        if (cells.includes(p7))
            var e7 = document.querySelector("img." + p7);
        if (cells.includes(p8))
            var e8 = document.querySelector("img." + p8);

        if (e1 == null)
            paths.push(p1);
        else if (e1 != null && e1.classList[0] == "b")
            paths.push(p1);
        if (e2 == null)
            paths.push(p2);
        else if (e2 != null && e2.classList[0] == "b")
            paths.push(p2);
        if (e3 == null)
            paths.push(p3);
        else if (e3 != null && e3.classList[0] == "b")
            paths.push(p3);
        if (e4 == null)
            paths.push(p4);
        else if (e4 != null && e4.classList[0] == "b")
            paths.push(p4);
        if (e5 == null)
            paths.push(p5);
        else if (e5 != null && e5.classList[0] == "b")
            paths.push(p5);
        if (e6 == null)
            paths.push(p6);
        else if (e6 != null && e6.classList[0] == "b")
            paths.push(p6);
        if (e7 == null)
            paths.push(p7);
        else if (e7 != null && e7.classList[0] == "b")
            paths.push(p7);
        if (e8 == null)
            paths.push(p8);
        else if (e8 != null && e8.classList[0] == "b")
            paths.push(p8);
    } else if (piece == "bishop") {
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        for (var i = 1; i <= 8; i++) {
            var p1 = String.fromCharCode(a.charCodeAt() + i) + String.fromCharCode(b.charCodeAt() + i);
            var p2 = String.fromCharCode(a.charCodeAt() + i) + String.fromCharCode(b.charCodeAt() - i);
            var p3 = String.fromCharCode(a.charCodeAt() - i) + String.fromCharCode(b.charCodeAt() + i);
            var p4 = String.fromCharCode(a.charCodeAt() - i) + String.fromCharCode(b.charCodeAt() - i);
            if (cells.includes(p1))
                var e1 = document.querySelector("img." + p1);
            if (cells.includes(p2))
                var e2 = document.querySelector("img." + p2);
            if (cells.includes(p3))
                var e3 = document.querySelector("img." + p3);
            if (cells.includes(p4))
                var e4 = document.querySelector("img." + p4);

            if (e1 == null && b1 == 0)
                paths.push(p1);
            else if (e1 != null && e1.classList[0] == "w")
                b1 = 1;
            else if (e1 != null && e1.classList[0] == "b" && b1 == 0) {
                b1 = 1;
                paths.push(p1);
            }

            if (e2 == null && b2 == 0)
                paths.push(p2);
            else if (e2 != null && e2.classList[0] == "w")
                b2 = 1;
            else if (e2 != null && e2.classList[0] == "b" && b2 == 0) {
                b2 = 1;
                paths.push(p2);
            }

            if (e3 == null && b3 == 0)
                paths.push(p3);
            else if (e3 != null && e3.classList[0] == "w")
                b3 = 1;
            else if (e3 != null && e3.classList[0] == "b" && b3 == 0) {
                b3 = 1;
                paths.push(p3);
            }

            if (e4 == null && b4 == 0)
                paths.push(p4);
            else if (e4 != null && e4.classList[0] == "w")
                b4 = 1;
            else if (e4 != null && e4.classList[0] == "b" && b4 == 0) {
                b4 = 1;
                paths.push(p4);
            }
        }
    } else if (piece == "queen") {
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        for (var i = 1; i <= 8; i++) {
            var p1 = String.fromCharCode(a.charCodeAt() - i) + b;
            var p2 = String.fromCharCode(a.charCodeAt() + i) + b;
            var p3 = a + String.fromCharCode(b.charCodeAt() + i);
            var p4 = a + String.fromCharCode(b.charCodeAt() - i);
            if (cells.includes(p1))
                var e1 = document.querySelector("img." + p1);
            if (cells.includes(p2))
                var e2 = document.querySelector("img." + p2);
            if (cells.includes(p3))
                var e3 = document.querySelector("img." + p3);
            if (cells.includes(p4))
                var e4 = document.querySelector("img." + p4);

            if (e1 == null && b1 == 0)
                paths.push(p1);
            else if (e1 != null && e1.classList[0] == "w")
                b1 = 1;
            else if (e1 != null && e1.classList[0] == "b" && b1 == 0) {
                b1 = 1;
                paths.push(p1);
            }

            if (e2 == null && b2 == 0)
                paths.push(p2);
            else if (e2 != null && e2.classList[0] == "w")
                b2 = 1;
            else if (e2 != null && e2.classList[0] == "b" && b2 == 0) {
                b2 = 1;
                paths.push(p2);
            }

            if (e3 == null && b3 == 0)
                paths.push(p3);
            else if (e3 != null && e3.classList[0] == "w")
                b3 = 1;
            else if (e3 != null && e3.classList[0] == "b" && b3 == 0) {
                b3 = 1;
                paths.push(p3);
            }

            if (e4 == null && b4 == 0)
                paths.push(p4);
            else if (e4 != null && e4.classList[0] == "w")
                b4 = 1;
            else if (e4 != null && e4.classList[0] == "b" && b4 == 0) {
                b4 = 1;
                paths.push(p4);
            }
        }
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        for (var i = 1; i <= 8; i++) {
            var p1 = String.fromCharCode(a.charCodeAt() + i) + String.fromCharCode(b.charCodeAt() + i);
            var p2 = String.fromCharCode(a.charCodeAt() + i) + String.fromCharCode(b.charCodeAt() - i);
            var p3 = String.fromCharCode(a.charCodeAt() - i) + String.fromCharCode(b.charCodeAt() + i);
            var p4 = String.fromCharCode(a.charCodeAt() - i) + String.fromCharCode(b.charCodeAt() - i);
            if (cells.includes(p1))
                var e1 = document.querySelector("img." + p1);
            if (cells.includes(p2))
                var e2 = document.querySelector("img." + p2);
            if (cells.includes(p3))
                var e3 = document.querySelector("img." + p3);
            if (cells.includes(p4))
                var e4 = document.querySelector("img." + p4);

            if (e1 == null && b1 == 0)
                paths.push(p1);
            else if (e1 != null && e1.classList[0] == "w")
                b1 = 1;
            else if (e1 != null && e1.classList[0] == "b" && b1 == 0) {
                b1 = 1;
                paths.push(p1);
            }

            if (e2 == null && b2 == 0)
                paths.push(p2);
            else if (e2 != null && e2.classList[0] == "w")
                b2 = 1;
            else if (e2 != null && e2.classList[0] == "b" && b2 == 0) {
                b2 = 1;
                paths.push(p2);
            }

            if (e3 == null && b3 == 0)
                paths.push(p3);
            else if (e3 != null && e3.classList[0] == "w")
                b3 = 1;
            else if (e3 != null && e3.classList[0] == "b" && b3 == 0) {
                b3 = 1;
                paths.push(p3);
            }

            if (e4 == null && b4 == 0)
                paths.push(p4);
            else if (e4 != null && e4.classList[0] == "w")
                b4 = 1;
            else if (e4 != null && e4.classList[0] == "b" && b4 == 0) {
                b4 = 1;
                paths.push(p4);
            }
        }
    }
    else if (piece == "king") {
        console.log("entered white king");
        console.log(pos);
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        var p1 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() + 1);
        var p2 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() - 1);
        var p3 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() + 1);
        var p4 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() - 1);
        if (cells.includes(p1))
            var e1 = document.querySelector("img." + p1);
        if (cells.includes(p2))
            var e2 = document.querySelector("img." + p2);
        if (cells.includes(p3))
            var e3 = document.querySelector("img." + p3);
        if (cells.includes(p4))
            var e4 = document.querySelector("img." + p4);

        if (e1 == null && b1 == 0)
            paths.push(p1);
        else if (e1 != null && e1.classList[0] == "w")
            b1 = 1;
        else if (e1 != null && e1.classList[0] == "b" && b1 == 0) {
            b1 = 1;
            paths.push(p1);
        }

        if (e2 == null && b2 == 0)
            paths.push(p2);
        else if (e2 != null && e2.classList[0] == "w")
            b2 = 1;
        else if (e2 != null && e2.classList[0] == "b" && b2 == 0) {
            b2 = 1;
            paths.push(p2);
        }

        if (e3 == null && b3 == 0)
            paths.push(p3);
        else if (e3 != null && e3.classList[0] == "w")
            b3 = 1;
        else if (e3 != null && e3.classList[0] == "b" && b3 == 0) {
            b3 = 1;
            paths.push(p3);
        }

        if (e4 == null && b4 == 0)
            paths.push(p4);
        else if (e4 != null && e4.classList[0] == "w")
            b4 = 1;
        else if (e4 != null && e4.classList[0] == "b" && b4 == 0) {
            b4 = 1;
            paths.push(p4);
        }
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        var p1 = String.fromCharCode(a.charCodeAt() - 1) + b;
        var p2 = String.fromCharCode(a.charCodeAt() + 1) + b;
        var p3 = a + String.fromCharCode(b.charCodeAt() + 1);
        var p4 = a + String.fromCharCode(b.charCodeAt() - 1);
        if (cells.includes(p1))
            var e1 = document.querySelector("img." + p1);
        if (cells.includes(p2))
            var e2 = document.querySelector("img." + p2);
        if (cells.includes(p3))
            var e3 = document.querySelector("img." + p3);
        if (cells.includes(p4))
            var e4 = document.querySelector("img." + p4);

        if (e1 == null && b1 == 0)
            paths.push(p1);
        else if (e1 != null && e1.classList[0] == "w")
            b1 = 1;
        else if (e1 != null && e1.classList[0] == "b" && b1 == 0) {
            b1 = 1;
            paths.push(p1);
        }

        if (e2 == null && b2 == 0)
            paths.push(p2);
        else if (e2 != null && e2.classList[0] == "w")
            b2 = 1;
        else if (e2 != null && e2.classList[0] == "b" && b2 == 0) {
            b2 = 1;
            paths.push(p2);
        }

        if (e3 == null && b3 == 0)
            paths.push(p3);
        else if (e3 != null && e3.classList[0] == "w")
            b3 = 1;
        else if (e3 != null && e3.classList[0] == "b" && b3 == 0) {
            b3 = 1;
            paths.push(p3);
        }

        if (e4 == null && b4 == 0)
            paths.push(p4);
        else if (e4 != null && e4.classList[0] == "w")
            b4 = 1;
        else if (e4 != null && e4.classList[0] == "b" && b4 == 0) {
            b4 = 1;
            paths.push(p4);
        }
        console.log(paths);
    }
    return paths;

}

function showpath_b(elmnt) {
    var s = elmnt[1];
    var pos = elmnt[2];
    var clr = elmnt[0];
    var paths = [];
    var piece = s.substring(1, s.length - 1);
    //console.log(elmnt);
    if (piece == "pawn") {
        var a = pos.substring(0, 1);
        var b = pos.substring(1);
        if (a == "g") {
            var p1 = "f" + b;
            var check_cell = "img" + "." + p1;
            var dummy = document.querySelectorAll(check_cell);
            if (dummy.length == 0)
                paths.push(p1);
            p1 = "e" + b;
            check_cell = "img" + "." + p1;
            dummy = document.querySelectorAll(check_cell);
            if (dummy.length == 0)
                paths.push(p1);
        } else {
            var p1 = String.fromCharCode(a.charCodeAt() - 1) + b;
            var check_cell = "img" + "." + p1;
            var dummy = document.querySelectorAll(check_cell);
            if (dummy.length == 0)
                paths.push(p1);
        }
        var p1 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() - 1);
        var check_cell = "img" + "." + p1;
        var dummy = document.querySelector(check_cell);

        if (dummy != null) {

            if (dummy.classList != null) {
                //console.log("dummy");
                var li = dummy.classList;
                if (li[0] == "w")
                    paths.push(p1);
            }
        }
        p1 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() + 1);
        check_cell = "img" + "." + p1;
        dummy = document.querySelector(check_cell);
        console.log(dummy);
        if (dummy != null) {

            if (dummy.classList != null) {
                //console.log("dummy");
                var li = dummy.classList;
                if (li[0] == "w")
                    paths.push(p1);
            }
        }
    } else if (piece == "rook") {

        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        for (var i = 1; i <= 8; i++) {
            var p1 = String.fromCharCode(a.charCodeAt() - i) + b;
            var p2 = String.fromCharCode(a.charCodeAt() + i) + b;
            var p3 = a + String.fromCharCode(b.charCodeAt() + i);
            var p4 = a + String.fromCharCode(b.charCodeAt() - i);
            if (cells.includes(p1))
                var e1 = document.querySelector("img." + p1);
            if (cells.includes(p2))
                var e2 = document.querySelector("img." + p2);
            if (cells.includes(p3))
                var e3 = document.querySelector("img." + p3);
            if (cells.includes(p4))
                var e4 = document.querySelector("img." + p4);

            if (e1 == null && b1 == 0)
                paths.push(p1);
            else if (e1 != null && e1.classList[0] == "b")
                b1 = 1;
            else if (e1 != null && e1.classList[0] == "w" && b1 == 0) {
                b1 = 1;
                paths.push(p1);
            }

            if (e2 == null && b2 == 0)
                paths.push(p2);
            else if (e2 != null && e2.classList[0] == "b")
                b2 = 1;
            else if (e2 != null && e2.classList[0] == "w" && b2 == 0) {
                b2 = 1;
                paths.push(p2);
            }

            if (e3 == null && b3 == 0)
                paths.push(p3);
            else if (e3 != null && e3.classList[0] == "b")
                b3 = 1;
            else if (e3 != null && e3.classList[0] == "w" && b3 == 0) {
                b3 = 1;
                paths.push(p3);
            }

            if (e4 == null && b4 == 0)
                paths.push(p4);
            else if (e4 != null && e4.classList[0] == "b")
                b4 = 1;
            else if (e4 != null && e4.classList[0] == "w" && b4 == 0) {
                b4 = 1;
                paths.push(p4);
            }
        }
        //console.log("paths");
        //console.log(paths);

    } else if (piece == "knight") {
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var p1 = String.fromCharCode(a.charCodeAt() - 2) + String.fromCharCode(b.charCodeAt() + 1);
        var p2 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() + 2);
        var p3 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() + 2);
        var p4 = String.fromCharCode(a.charCodeAt() + 2) + String.fromCharCode(b.charCodeAt() + 1);
        var p5 = String.fromCharCode(a.charCodeAt() + 2) + String.fromCharCode(b.charCodeAt() - 1);
        var p6 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() - 2);
        var p7 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() - 2);
        var p8 = String.fromCharCode(a.charCodeAt() - 2) + String.fromCharCode(b.charCodeAt() - 1);
        if (cells.includes(p1))
            var e1 = document.querySelector("img." + p1);
        if (cells.includes(p2))
            var e2 = document.querySelector("img." + p2);
        if (cells.includes(p3))
            var e3 = document.querySelector("img." + p3);
        if (cells.includes(p4))
            var e4 = document.querySelector("img." + p4);
        if (cells.includes(p5))
            var e5 = document.querySelector("img." + p5);
        if (cells.includes(p6))
            var e6 = document.querySelector("img." + p6);
        if (cells.includes(p7))
            var e7 = document.querySelector("img." + p7);
        if (cells.includes(p8))
            var e8 = document.querySelector("img." + p8);

        if (e1 == null)
            paths.push(p1);
        else if (e1 != null && e1.classList[0] == "w")
            paths.push(p1);
        if (e2 == null)
            paths.push(p2);
        else if (e2 != null && e2.classList[0] == "w")
            paths.push(p2);
        if (e3 == null)
            paths.push(p3);
        else if (e3 != null && e3.classList[0] == "w")
            paths.push(p3);
        if (e4 == null)
            paths.push(p4);
        else if (e4 != null && e4.classList[0] == "w")
            paths.push(p4);
        if (e5 == null)
            paths.push(p5);
        else if (e5 != null && e5.classList[0] == "w")
            paths.push(p5);
        if (e6 == null)
            paths.push(p6);
        else if (e6 != null && e6.classList[0] == "w")
            paths.push(p6);
        if (e7 == null)
            paths.push(p7);
        else if (e7 != null && e7.classList[0] == "w")
            paths.push(p7);
        if (e8 == null)
            paths.push(p8);
        else if (e8 != null && e8.classList[0] == "w")
            paths.push(p8);
    } else if (piece == "bishop") {
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        for (var i = 1; i <= 8; i++) {
            var p1 = String.fromCharCode(a.charCodeAt() + i) + String.fromCharCode(b.charCodeAt() + i);
            var p2 = String.fromCharCode(a.charCodeAt() + i) + String.fromCharCode(b.charCodeAt() - i);
            var p3 = String.fromCharCode(a.charCodeAt() - i) + String.fromCharCode(b.charCodeAt() + i);
            var p4 = String.fromCharCode(a.charCodeAt() - i) + String.fromCharCode(b.charCodeAt() - i);
            if (cells.includes(p1))
                var e1 = document.querySelector("img." + p1);
            if (cells.includes(p2))
                var e2 = document.querySelector("img." + p2);
            if (cells.includes(p3))
                var e3 = document.querySelector("img." + p3);
            if (cells.includes(p4))
                var e4 = document.querySelector("img." + p4);

            if (e1 == null && b1 == 0)
                paths.push(p1);
            else if (e1 != null && e1.classList[0] == "b")
                b1 = 1;
            else if (e1 != null && e1.classList[0] == "w" && b1 == 0) {
                b1 = 1;
                paths.push(p1);
            }

            if (e2 == null && b2 == 0)
                paths.push(p2);
            else if (e2 != null && e2.classList[0] == "b")
                b2 = 1;
            else if (e2 != null && e2.classList[0] == "w" && b2 == 0) {
                b2 = 1;
                paths.push(p2);
            }

            if (e3 == null && b3 == 0)
                paths.push(p3);
            else if (e3 != null && e3.classList[0] == "b")
                b3 = 1;
            else if (e3 != null && e3.classList[0] == "w" && b3 == 0) {
                b3 = 1;
                paths.push(p3);
            }

            if (e4 == null && b4 == 0)
                paths.push(p4);
            else if (e4 != null && e4.classList[0] == "b")
                b4 = 1;
            else if (e4 != null && e4.classList[0] == "w" && b4 == 0) {
                b4 = 1;
                paths.push(p4);
            }
        }

    } else if (piece == "queen") {
        //console.log("entered black queen");    
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        for (var i = 1; i <= 8; i++) {
            var p1 = String.fromCharCode(a.charCodeAt() + i) + String.fromCharCode(b.charCodeAt() + i);
            var p2 = String.fromCharCode(a.charCodeAt() + i) + String.fromCharCode(b.charCodeAt() - i);
            var p3 = String.fromCharCode(a.charCodeAt() - i) + String.fromCharCode(b.charCodeAt() + i);
            var p4 = String.fromCharCode(a.charCodeAt() - i) + String.fromCharCode(b.charCodeAt() - i);
            if (cells.includes(p1))
                var e1 = document.querySelector("img." + p1);
            if (cells.includes(p2))
                var e2 = document.querySelector("img." + p2);
            if (cells.includes(p3))
                var e3 = document.querySelector("img." + p3);
            if (cells.includes(p4))
                var e4 = document.querySelector("img." + p4);

            if (e1 == null && b1 == 0)
                paths.push(p1);
            else if (e1 != null && e1.classList[0] == "b")
                b1 = 1;
            else if (e1 != null && e1.classList[0] == "w" && b1 == 0) {
                b1 = 1;
                paths.push(p1);
            }

            if (e2 == null && b2 == 0)
                paths.push(p2);
            else if (e2 != null && e2.classList[0] == "b")
                b2 = 1;
            else if (e2 != null && e2.classList[0] == "w" && b2 == 0) {
                b2 = 1;
                paths.push(p2);
            }

            if (e3 == null && b3 == 0)
                paths.push(p3);
            else if (e3 != null && e3.classList[0] == "b")
                b3 = 1;
            else if (e3 != null && e3.classList[0] == "w" && b3 == 0) {
                b3 = 1;
                paths.push(p3);
            }

            if (e4 == null && b4 == 0)
                paths.push(p4);
            else if (e4 != null && e4.classList[0] == "b")
                b4 = 1;
            else if (e4 != null && e4.classList[0] == "w" && b4 == 0) {
                b4 = 1;
                paths.push(p4);
            }
        }
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        for (var i = 1; i <= 8; i++) {
            var p1 = String.fromCharCode(a.charCodeAt() - i) + b;
            var p2 = String.fromCharCode(a.charCodeAt() + i) + b;
            var p3 = a + String.fromCharCode(b.charCodeAt() + i);
            var p4 = a + String.fromCharCode(b.charCodeAt() - i);
            if (cells.includes(p1))
                var e1 = document.querySelector("img." + p1);
            if (cells.includes(p2))
                var e2 = document.querySelector("img." + p2);
            if (cells.includes(p3))
                var e3 = document.querySelector("img." + p3);
            if (cells.includes(p4))
                var e4 = document.querySelector("img." + p4);

            if (e1 == null && b1 == 0)
                paths.push(p1);
            else if (e1 != null && e1.classList[0] == "b")
                b1 = 1;
            else if (e1 != null && e1.classList[0] == "w" && b1 == 0) {
                b1 = 1;
                paths.push(p1);
            }

            if (e2 == null && b2 == 0)
                paths.push(p2);
            else if (e2 != null && e2.classList[0] == "b")
                b2 = 1;
            else if (e2 != null && e2.classList[0] == "w" && b2 == 0) {
                b2 = 1;
                paths.push(p2);
            }

            if (e3 == null && b3 == 0)
                paths.push(p3);
            else if (e3 != null && e3.classList[0] == "b")
                b3 = 1;
            else if (e3 != null && e3.classList[0] == "w" && b3 == 0) {
                b3 = 1;
                paths.push(p3);
            }

            if (e4 == null && b4 == 0)
                paths.push(p4);
            else if (e4 != null && e4.classList[0] == "b")
                b4 = 1;
            else if (e4 != null && e4.classList[0] == "w" && b4 == 0) {
                b4 = 1;
                paths.push(p4);
            }
        }
        //console.log(paths);
    }
    else if (piece == "king") {
        console.log("entered black king");
        console.log(pos);
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        var p1 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() + 1);
        var p2 = String.fromCharCode(a.charCodeAt() + 1) + String.fromCharCode(b.charCodeAt() - 1);
        var p3 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() + 1);
        var p4 = String.fromCharCode(a.charCodeAt() - 1) + String.fromCharCode(b.charCodeAt() - 1);
        if (cells.includes(p1))
            var e1 = document.querySelector("img." + p1);
        if (cells.includes(p2))
            var e2 = document.querySelector("img." + p2);
        if (cells.includes(p3))
            var e3 = document.querySelector("img." + p3);
        if (cells.includes(p4))
            var e4 = document.querySelector("img." + p4);

        if (e1 == null && b1 == 0)
            paths.push(p1);
        else if (e1 != null && e1.classList[0] == "b")
            b1 = 1;
        else if (e1 != null && e1.classList[0] == "w" && b1 == 0) {
            b1 = 1;
            paths.push(p1);
        }

        if (e2 == null && b2 == 0)
            paths.push(p2);
        else if (e2 != null && e2.classList[0] == "b")
            b2 = 1;
        else if (e2 != null && e2.classList[0] == "w" && b2 == 0) {
            b2 = 1;
            paths.push(p2);
        }

        if (e3 == null && b3 == 0)
            paths.push(p3);
        else if (e3 != null && e3.classList[0] == "b")
            b3 = 1;
        else if (e3 != null && e3.classList[0] == "w" && b3 == 0) {
            b3 = 1;
            paths.push(p3);
        }

        if (e4 == null && b4 == 0)
            paths.push(p4);
        else if (e4 != null && e4.classList[0] == "b")
            b4 = 1;
        else if (e4 != null && e4.classList[0] == "w" && b4 == 0) {
            b4 = 1;
            paths.push(p4);
        }
        var a = pos.substring(0, 1); // eg. pos=a5,d7,etc
        var b = pos.substring(1);
        var b1 = 0;
        var b2 = 0;
        var b3 = 0;
        var b4 = 0;
        var p1 = String.fromCharCode(a.charCodeAt() - 1) + b;
        var p2 = String.fromCharCode(a.charCodeAt() + 1) + b;
        var p3 = a + String.fromCharCode(b.charCodeAt() + 1);
        var p4 = a + String.fromCharCode(b.charCodeAt() - 1);
        if (cells.includes(p1))
            var e1 = document.querySelector("img." + p1);
        if (cells.includes(p2))
            var e2 = document.querySelector("img." + p2);
        if (cells.includes(p3))
            var e3 = document.querySelector("img." + p3);
        if (cells.includes(p4))
            var e4 = document.querySelector("img." + p4);

        if (e1 == null && b1 == 0)
            paths.push(p1);
        else if (e1 != null && e1.classList[0] == "b")
            b1 = 1;
        else if (e1 != null && e1.classList[0] == "w" && b1 == 0) {
            b1 = 1;
            paths.push(p1);
        }

        if (e2 == null && b2 == 0)
            paths.push(p2);
        else if (e2 != null && e2.classList[0] == "b")
            b2 = 1;
        else if (e2 != null && e2.classList[0] == "w" && b2 == 0) {
            b2 = 1;
            paths.push(p2);
        }

        if (e3 == null && b3 == 0)
            paths.push(p3);
        else if (e3 != null && e3.classList[0] == "b")
            b3 = 1;
        else if (e3 != null && e3.classList[0] == "w" && b3 == 0) {
            b3 = 1;
            paths.push(p3);
        }

        if (e4 == null && b4 == 0)
            paths.push(p4);
        else if (e4 != null && e4.classList[0] == "b")
            b4 = 1;
        else if (e4 != null && e4.classList[0] == "w" && b4 == 0) {
            b4 = 1;
            paths.push(p4);
        }
        console.log(paths);
    }
    console.log("paths");
    console.log(paths);
    return paths;

}
