var moves = 0;
var prev = null;
var ar = [];
var black_pieces = ["brook1", "bknight1", "bbishop1", "bking", "bqueen", "brook2", "bknight2", "bbishop2", "bpawn1", "bpawn2", "bpawn3", "bpawn4", "bpawn5", "bpawn6", "bpawn7", "bpawn8"];
var white_pieces = ["wrook1", "wknight1", "wbishop1", "wking", "wqueen", "wrook2", "wknight2", "wbishop2", , "wpawn1", "wpawn2", "wpawn3", "wpawn4", "wpawn5", "wpawn6", "wpawn7", "wpawn8"];
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
    

    if (white_pieces.includes(elmnt[elmnt.length - 2])) {
        paths = showpath_w(elmnt);
        //console.log(e.srcElement);
        states.push(e.srcElement);
        if (states.length > 2)
            states.shift();
    
    }
    else if (black_pieces.includes(elmnt[elmnt.length - 2])) {
        paths = showpath_b(elmnt);
        //console.log(e.srcElement);
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
        move(states,record);

    }
    //console.log(trace[0]);
    //console.log(record[record.length-1]);


}

function move(states,record) {
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
            var check_cell="img"+"."+p1;
            var dummy=document.querySelectorAll(check_cell);
            if(dummy.length==0)
            paths.push(p1);
            p1 = "d" + b;
            check_cell="img"+"."+p1;
            dummy=document.querySelectorAll(check_cell);
            if(dummy.length==0)
            paths.push(p1);
        } else {
            var p1 = String.fromCharCode(a.charCodeAt() + 1) + b;
            var check_cell="img"+"."+p1;
            var dummy=document.querySelectorAll(check_cell);
            if(dummy.length==0)
            paths.push(p1);
        }
        var p1=String.fromCharCode(a.charCodeAt() +1) + String.fromCharCode(b.charCodeAt() -1);
        var check_cell="img"+"."+p1;
        var dummy=document.querySelector(check_cell);
        if(dummy!=null)
        {
            
            if(dummy.classList!=null){
                //console.log("dummy");
                var li=dummy.classList;
            if(li[0]=="b")
            paths.push(p1);}
        }
        p1=String.fromCharCode(a.charCodeAt() +1) + String.fromCharCode(b.charCodeAt() +1);
        check_cell="img"+"."+p1;
        dummy=document.querySelector(check_cell);
        if(dummy!=null)
        {
            
            if(dummy.classList!=null){
                //console.log("dummy");
                var li=dummy.classList;
            if(li[0]=="b")
            paths.push(p1);}
        }
    }
    return paths;

}
function showpath_b(elmnt) {
    var s = elmnt[1];
    var pos = elmnt[2];
    var clr = elmnt[0];
    var paths = [];
    var piece = s.substring(1, s.length - 1);
    if (piece == "pawn") {
        var a = pos.substring(0, 1);
        var b = pos.substring(1);
        if (a == "g") {
            var p1 = "f" + b;
            var check_cell="img"+"."+p1;
            var dummy=document.querySelectorAll(check_cell);
            if(dummy.length==0)
            paths.push(p1);
            p1 = "e" + b;
            check_cell="img"+"."+p1;
            dummy=document.querySelectorAll(check_cell);
            if(dummy.length==0)
            paths.push(p1);
        } 
        else {
            var p1 = String.fromCharCode(a.charCodeAt() -1) + b;
            var check_cell="img"+"."+p1;
            var dummy=document.querySelectorAll(check_cell);
            if(dummy.length==0)
            paths.push(p1);
        }
        var p1=String.fromCharCode(a.charCodeAt() -1) + String.fromCharCode(b.charCodeAt() -1);
        var check_cell="img"+"."+p1;
        var dummy=document.querySelector(check_cell);
        
        if(dummy!=null)
        {
            
            if(dummy.classList!=null){
                //console.log("dummy");
                var li=dummy.classList;
            if(li[0]=="w")
            paths.push(p1);}
        }
        p1=String.fromCharCode(a.charCodeAt() -1) + String.fromCharCode(b.charCodeAt() +1);
        check_cell="img"+"."+p1;
        dummy=document.querySelector(check_cell);
        console.log(dummy);
        if(dummy!=null)
        {
            
            if(dummy.classList!=null){
                //console.log("dummy");
                var li=dummy.classList;
            if(li[0]=="w")
            paths.push(p1);}
        }
    }
    return paths;

}

