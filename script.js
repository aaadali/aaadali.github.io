let ObjectCounter=0;

var allObjects=[];
var Objects=[];
var Checkboxes=[];
var CheckedObjects=[];

var CheckedCircles=[];
var CheckedLines=[];
var CheckedPoints=[];

var Pselected=0;
var Lselected=0;
var Cselected=0;


let labels= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var theTable = document.getElementById("tableInfo");



function checkTheObject(i)
{
  let Obj= allObjects[i];

  CheckedObjects.push(Obj);

  switch(Obj.figure)
  {
  case "Point":
    CheckedPoints.push(Obj);
    break;

  case "Line":
    CheckedLines.push(Obj);
    break;

  case "Circle":
    CheckedCircles.push(Obj);
    break;
  }

  showButtons(CheckedPoints,CheckedLines,CheckedCircles);

}

function uncheckTheObject(i)
{
  let Obj= allObjects[i];

  CheckedObjects.splice( CheckedObjects.indexOf(Obj) ,1);

  switch(Obj.figure){
  case "Point":
    CheckedPoints.splice(Obj,1);
    break;

  case "Line":
    CheckedLines.splice(Obj,1);
    break;

  case "Circle":
    CheckedCircles.splice(Obj,1);
  
  }

  showButtons(CheckedPoints,CheckedLines,CheckedCircles);

}


function selectTheObject(i)
{
  allObjects[i].checkBox.checked=true ; 
  checkTheObject(i);
}

function unselectTheObject(i)
{
  allObjects[i].checkBox.checked=false ; 
  uncheckTheObject(i);
}


function showButtons(points,lines,circles)
{ 
  let testCode = "P: "+ points.length 
  + ", Lines: "+lines.length + ", Circles: " + circles.length;

  document.getElementById("buttonTest").innerText = testCode;


}



/*Point Class*/
class point{
  constructor(index,id,cx,cy,r,fill,stroke,dx,dy,labeled,pointType,objs){
    this.index = index;
    this.id = id;

    if( pointType =="intersectionLL")
    {
      let intP=intersectionPoint(objs[0],objs[1],objs[2],objs[3]);
      this.cx = intP.cx;
      this.cy = intP.cy;
    }
    else {
      this.cx = cx;
      this.cy = cy;
    }
    this.r = r;
    this.fill = fill;
    this.stroke=stroke;
    this.dx=dx;
    this.dy=dy;
    this.labeled=labeled;
    this.figure="Point";
    this.pointType=pointType;
    this.objs= objs;

    let prop = '';

    if( this.pointType =="base")
    { prop = this.pointType; }

    if( this.pointType =="weighted")
    { prop = this.objs[0].id+'/'+this.objs[1].id+':'+' '+this.objs[2]+'/'+this.objs[3];  }

    if( this.pointType =="weightedAngle")
    { prop = this.objs[0].id+this.objs[1].id+this.id+'/'+this.id+this.objs[1].id+ this.objs[2].id+':' + this.objs[4]+ '/'+this.objs[3];  }

    if( this.pointType =="intersectionLL")
    { prop = this.objs[0].id+this.objs[1].id+"&cap;"+this.objs[2].id+this.objs[3].id;  }

    if( this.pointType =="perpendicularLP")
    { prop = objs[1].id + '&perp;'+ this.objs[0].P1.id+this.objs[0].P2.id;  }

    if(this.pointType=="Circumcenter"){
      prop = "$\\circledcirc$ of "+objs[0].id+objs[1].id+objs[2].id;
    }
    this.property = prop;

    var newChbox = document.createElement("INPUT");
    newChbox.setAttribute("type", "checkbox");

    /*

    let chkCode= ' if( this.checked==true){ addToChecked('
                +this.index
                +'); Pselected++;  };  if( this.checked==false){removeFromChecked('
                +this.index+');Pselected--; };  showPoints(Pselected,Cselected,Lselected);';

    chkCode+="buttonAppear();"
    */


    let chkCode= ' if( this.checked==true){ checkTheObject('+this.index+');   };  if( this.checked==false){uncheckTheObject('+this.index+'); }; ';


    newChbox.setAttribute("onchange",chkCode);

    this.checkBox = newChbox;
    /*
    */

    let editID=document.createElement("INPUT");
    editID.setAttribute("type","text");
    this.EditID = editID;

    let editcx=document.createElement("INPUT");
    editcx.setAttribute("type","number");
    this.Editcx = editcx;

    let editcy=document.createElement("INPUT");
    editcy.setAttribute("type","number");
    this.Editcy = editcy;

    let editLabeled=document.createElement("INPUT");
    editLabeled.setAttribute("type","checkbox");
    this.EditLabeled = editLabeled;

    let editdx=document.createElement("SELECT");
    let dxOptNone = document.createElement("option");
    dxOptNone.text="";
    dxOptNone.value = -5;
    let dxOptLeft= document.createElement("option");
    dxOptLeft.text="left";
    dxOptLeft.value = -20;
    let dxOptRight= document.createElement("option");
    dxOptRight.text="right";
    dxOptRight.value = 10;
    editdx.add(dxOptNone);
    editdx.add(dxOptRight);
    editdx.add(dxOptLeft);

    this.Editdx=editdx;

    let editdy=document.createElement("SELECT");
    let dyOptNone = document.createElement("option");
    dyOptNone.text="";
    dyOptNone.value =5;
    let dyOptAbove= document.createElement("option");
    dyOptAbove.text="above";
    dyOptAbove.value = -5;
    let dyOptBelow= document.createElement("option");
    dyOptBelow.text="below";
    dyOptBelow.value = 20;
    editdy.add(dyOptNone);
    editdy.add(dyOptAbove);
    editdy.add(dyOptBelow);

    this.Editdy=editdy;
  }

  SVGcode(){
    var scode = ' <circle '
    +' style="fill:'+this.fill
    +'; stroke:'+ this.stroke
    +'" id="'+this.id
    +'" cx = "'+ this.cx.toFixed(1)
    +'" cy =" '+this.cy.toFixed(1)
    +'" r = " '+ this.r.toFixed(1)
    +' " /> ';

    scode+=' <text '
    +' style="font-size:18;font-family:Arial;'
    +'fill:'+ 'Gray'
    +';" x = "' +this.cx.toFixed(1)
    +'" y =" '+this.cy.toFixed(1)
    +'" dx = "' +this.dx.toFixed(1)
    +'" dy =" '+this.dy.toFixed(1)
    +'" >'+this.id+' </text>';

    return scode;
  }

  SVGObject(){
    let P = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    P.setAttribute("cx", this.cx );
    P.setAttribute("cy", this.cy);
    P.setAttribute("r", this.r);
    P.setAttribute("stroke",this.stroke);
    P.setAttribute("fill",this.fill);
    P.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");


    return P;
  }

  SVGLabel(){
    let L = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    L.setAttribute("x", Number(this.cx) + Number(this.dx)   );
    L.setAttribute("y", Number(this.cy) + Number(this.dy) -15);
    L.setAttribute("width", 20);
    L.setAttribute("height", 20);

    let labd ="Gray";

    if(this.labeled){
      labd = "Black";
    }
  
    L.setAttribute("style","font-size:15;font-family:Arial;cursor:all-scroll;");
    L.setAttribute("onclick", ' if( allObjects['+this.index+'].checkBox.checked==true){unselectTheObject('+this.index+') ;this.style.color = "' + labd + '";} else { selectTheObject('+this.index+') ; this.style.color = "red";   }' );
    L.setAttribute("color",labd);
    L.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

    let textNode = document.createTextNode( '$'+ this.id+'$'); 
    L.appendChild(textNode);

    return L;
  }


  tikZObjectCode(){
    let cT = '';

    if(this.pointType=="intersectionLL")
    {
      cT= '(intersection cs: first line={('+ this.objs[0].id+ ')--('+this.objs[1].id+')}, second line={('+this.objs[2].id+')--('+this.objs[3].id+')})';
    }
    else if(this.pointType=="weighted")
    {
      let sg='';
      let dnm = Number(this.objs[3]) + Number(this.objs[2]);
      if(Number(this.objs[2])>0){sg='+'}
      let a = (this.objs[3]/dnm).toFixed(2);
      let b = (1-a).toFixed(2);
      cT= '($'+a+'*('+this.objs[0].id+')'+sg+b+'*('+this.objs[1].id+')$)';
    }
    else {
      cT=toTikz(this.cx,this.cy);
    }

    let tcode = ' \\coordinate ('+this.id+') at '+cT+';' ;
    if(this.fill=="Black"||this.fill=="black")
    {tcode +=  '\\filldraw['+this.fill+'] ('+this.id+') circle (1pt);';}

    return tcode;
  }

  tikZLabelCode(){
    let tcode='';

    if(this.labeled==true){
      let locCode = '';
      if(this.dy==20){locCode += 'below';}
      if(this.dy==-5){locCode += 'above';}
      if(this.dx==10){locCode += ' right';}
      if(this.dx==-20){locCode += ' left';}

      if(locCode!=''){locCode = '['+locCode+']';}
      tcode += ' \\node'+locCode+' at ('+this.id+') { $'+this.id+'$ };';
    }
    return tcode;

  }

  infoRow(){
    var newRow = document.createElement("TR");
    let cell_check=newRow.insertCell(0);
    let cell_id = newRow.insertCell(1);
    let cell_shape=newRow.insertCell(2);
    let cell_property = newRow.insertCell(3);
    let cell_label=newRow.insertCell(4);
    let cell_coordinates=newRow.insertCell(5);

    cell_check.className="tableCheck tableItem2";
    cell_shape.className="tableShape tableItem2";
    cell_id.className="tableID";
    cell_label.className="tableLabel";
    cell_coordinates.className="tableCoordinates";

    let e_figure=document.createTextNode('$\\bullet$');
    let e_id=document.createTextNode('$'+ this.id+'$');
    let e_label=document.createTextNode(this.property);
    let e_property=document.createTextNode('('+this.cx.toFixed(0)+','+this.cy.toFixed(0)+')' );
    let e_tikZCoord=document.createTextNode(toTikz(this.cx,this.cy));

    cell_check.appendChild(this.checkBox);
    cell_shape.appendChild(e_figure);
    cell_id.appendChild(e_id);
    /*
    cell_label.innerHTML=this.property;
    */


    let textNode = document.createTextNode( this.property); 
    cell_label.appendChild(textNode);

    cell_coordinates.appendChild(e_property);
    cell_property.appendChild(e_tikZCoord);

    return newRow;
  }

  editRow(){
    var newRow = document.createElement("TR");
    let cell_id = newRow.insertCell(0);
    let cell_cx=newRow.insertCell(1);
    let cell_cy = newRow.insertCell(2);
    let cell_labeled=newRow.insertCell(3);
    let cell_dx=newRow.insertCell(4);
    let cell_dy=newRow.insertCell(5);

    this.EditID.value=this.id;
    this.Editcx.value=this.cx;
    this.Editcy.value=this.cy;
    this.Editdx.value=this.dx;
    this.Editdy.value=this.dy;



    cell_id.innerText="id";
    cell_id.appendChild(this.EditID);

    cell_cx.innerText="x";
    cell_cx.appendChild(this.Editcx) ;

    cell_cy.innerText="y";
    cell_cy.appendChild(this.Editcy) ;

    cell_labeled.innerText="label"
    cell_labeled.appendChild(this.EditLabeled);

    cell_dx.innerText="L/R";
    cell_dx.appendChild(this.Editdx) ;

    cell_dy.innerText="A/B";
    cell_dy.appendChild(this.Editdy) ;

    return newRow;
  }
}

class circle{
  constructor(index,Center,r,fill,stroke,circleType,objs){
    this.index = index;
    this.id = Center.id;
    this.cx = Center.cx;
    this.cy = Center.cy;
    this.r = r;
    this.fill = fill;
    this.stroke=stroke;

    this.figure="Circle";
    this.circleType=circleType;
    this.objs= objs;

    let prop = '';

    if( this.circleType =="ABdefined")
    { prop = "pass "+this.objs[1].id; }

    if( this.circleType =="ORdefined")
    { prop = "R:"+Number(this.r)/60; }

    if(this.circleType=="Circumcircle"||this.circleType=="Incircle"){
      prop ="of "+objs[0].id+objs[1].id+objs[2].id;
    }
    this.property = prop;

    var newChbox = document.createElement("INPUT");
    newChbox.setAttribute("type", "checkbox");

    let chkCode= ' if( this.checked==true){ checkTheObject('+this.index+');   };  if( this.checked==false){uncheckTheObject('+this.index+'); }; ';

    newChbox.setAttribute("onchange",chkCode);

    this.checkBox = newChbox;
    /*
    */

    let editID=document.createElement("INPUT");
    editID.setAttribute("type","text");
    this.EditID = editID;

    let editcx=document.createElement("INPUT");
    editcx.setAttribute("type","number");
    this.Editcx = editcx;

    let editcy=document.createElement("INPUT");
    editcy.setAttribute("type","number");
    this.Editcy = editcy;

    let editR=document.createElement("INPUT");
    editR.setAttribute("type","number");
    this.EditR = editR;

  }

  SVGcode(){
    var scode = ' <circle '
    +' style="fill:'+this.fill
    +'; stroke:'+ this.stroke
    +'" id="'+this.id
    +'" cx = "'+ this.cx.toFixed(1)
    +'" cy =" '+this.cy.toFixed(1)
    +'" r = " '+ this.r.toFixed(1)
    +' " /> ';

    return scode;
  }

  SVGObject(){
    let P = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    P.setAttribute("cx", this.cx );
    P.setAttribute("cy", this.cy);
    P.setAttribute("r", this.r);
    P.setAttribute("stroke",this.stroke);
    P.setAttribute("fill",this.fill);
    P.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    P.setAttribute("style", "cursor:all-scroll;");
    P.setAttribute("onclick", ' if( allObjects['+this.index+'].checkBox.checked==true){unselectTheObject('+this.index+') ;this.style.stroke = "' + this.stroke + '";} else { selectTheObject('+this.index+') ; this.style.stroke = "red";   }' );

    return P;
  }

  tikZObjectCode(){
    let cT=toTikz(this.cx,this.cy);

    let rtkz=Number(this.r)/60;
    let fillcode='';
    if(this.fill=="none"||this.fill=="None"){ fillcode=''; }
    else {
      fillcode = '[fill='+this.fill+']';
    }
    let tcode = '\\draw'+fillcode+' ('+this.id+') circle ('+ rtkz.toFixed(2)+');';

    return tcode;
  }

  infoRow(){
    var newRow = document.createElement("TR");
    let cell_check=newRow.insertCell(0);
    let cell_id = newRow.insertCell(1);
    let cell_shape=newRow.insertCell(2);
    let cell_property = newRow.insertCell(3);
    let cell_label=newRow.insertCell(4);
    let cell_coordinates=newRow.insertCell(5);

    cell_check.className="tableCheck tableItem2";
    cell_shape.className="tableShape tableItem2";
    cell_id.className="tableID";
    cell_label.className="tableLabel";
    cell_coordinates.className="tableCoordinates";

    let e_figure=document.createTextNode('$\\bigcirc$');
    let e_id=document.createTextNode(this.id);
    let e_label=document.createTextNode(this.property);
    let e_property=document.createTextNode('O:('+this.cx.toFixed(0)+','+this.cy.toFixed(0)+')' );
    let e_tikZCoord=document.createTextNode(toTikz(this.cx,this.cy));

    cell_check.appendChild(this.checkBox);
    cell_shape.appendChild(e_figure);
    cell_id.appendChild(e_id);
    cell_label.appendChild(e_label);
    cell_coordinates.appendChild(e_property);
    cell_property.appendChild(e_tikZCoord);

    return newRow;
  }

  editRow(){
    var newRow = document.createElement("TR");
    let cell_id = newRow.insertCell(0);
    let cell_cx=newRow.insertCell(1);
    let cell_cy = newRow.insertCell(2);
    let cell_r=newRow.insertCell(3);

    this.EditID.value=this.id;
    this.Editcx.value=this.cx;
    this.Editcy.value=this.cy;
    this.EditR.value=this.r;


    cell_id.innerText='id';
    cell_id.appendChild(this.EditID);

    cell_cx.innerText='Ox';
    cell_cx.appendChild(this.Editcx) ;

    cell_cy.innerText='Oy';
    cell_cy.appendChild(this.Editcy) ;

    cell_r.innerText='R';
    cell_r.appendChild(this.EditR);

    return newRow;
  }
}



class line{
  constructor(index,point1,point2,stroke,size,pattern){
    this.index = index;
    this.id = point1.id+point2.id;
    this.P1 = point1;
    this.P2 = point2;
    this.stroke=stroke;
    this.property=point1.id+point2.id;
    this.size=size;
    this.pattern=pattern;
    this.figure="Line";


    var newChbox = document.createElement("INPUT");
    newChbox.setAttribute("type", "checkbox");

   let chkCode= ' if( this.checked==true){ checkTheObject('+this.index+');   };  if( this.checked==false){uncheckTheObject('+this.index+'); }; ';

    newChbox.setAttribute("onchange",chkCode);

    this.checkBox = newChbox;

    /*
    */

    let editPattern=document.createElement("SELECT");
    let solidOpt = document.createElement("option");
    solidOpt.text="solid";
    solidOpt.value = "solid";
    let dashedOpt= document.createElement("option");
    dashedOpt.text="dashed";
    dashedOpt.value = "dashed";

    editPattern.add(solidOpt);
    editPattern.add(dashedOpt);

    this.EditPattern=editPattern;
  }

  SVGcode(){
    let scode = ' <line '
    +' style="stroke :'+this.stroke
    +';stroke-width:'+this.size+';stroke-linecap:round;" '
    +'" x1="'+this.P1.cx.toFixed(1)
    +'" x2="'+this.P2.cx.toFixed(1)
    +'" y1="' +this.P1.cy.toFixed(1)
    +'" y2="'+this.P2.cy.toFixed(1)
    +' "/> ';

    return scode;
  }

  SVGObject(){
    let l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("x1", this.P1.cx );
    l.setAttribute("y1", this.P1.cy );
    l.setAttribute("x2", this.P2.cx );
    l.setAttribute("y2", this.P2.cy );
    l.setAttribute("stroke",this.stroke);
    l.setAttribute("stroke-width",this.size);
    l.setAttribute("stroke-linecap","round");
    l.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

    l.setAttribute("style", "cursor:all-scroll;");
    l.setAttribute("onclick", ' if( allObjects['+this.index+'].checkBox.checked==true){unselectTheObject('+this.index+') ;this.style.stroke = "' + this.stroke + '";} else { selectTheObject('+this.index+') ; this.style.stroke = "red";   }' );

    return l;
  }

  tikZObjectCode(){
    let tcode = ' \\draw ('+this.P1.id+')--('+this.P2.id+');';
    return tcode;
  }

  infoRow(){
    var newRow = document.createElement("TR");
    let cell_check=newRow.insertCell(0);
    let cell_id = newRow.insertCell(1);
    let cell_shape=newRow.insertCell(2);
    let cell_property = newRow.insertCell(3);
    let cell_label=newRow.insertCell(4);
    let cell_coordinates=newRow.insertCell(5);

    cell_check.className="tableCheck tableItem2";
    cell_shape.className="tableShape tableItem2";
    cell_id.className="tableID";
    cell_label.className="tableLabel";
    cell_coordinates.className="tableCoordinates";

    let e_figure=document.createTextNode(this.figure);
    let e_id=document.createTextNode(this.id);
    let e_label=document.createTextNode(this.property);
    let e_property=document.createTextNode('' );
    let e_tikZCoord=document.createTextNode('');

    cell_check.appendChild(this.checkBox);
    cell_shape.appendChild(e_figure);
    cell_id.appendChild(e_id);

    /*

    cell_label.innerHTML=this.property;
    */
    let textNode = document.createTextNode( this.property); 
    cell_label.appendChild(textNode);


    cell_coordinates.appendChild(e_property);
    cell_property.appendChild(e_tikZCoord);

    return newRow;
  }

  editRow(){
    var newRow = document.createElement("TR");
    let cell_pattern = newRow.insertCell(0);

    this.EditPattern.value=this.pattern;

    cell_pattern.appendChild(this.EditPattern);

    return newRow;

  }

}



class polygon{
  constructor(index,points,fill,stroke,property,size){
    this.index = index;
    this.points = points;
    this.fill = fill;
    this.stroke = stroke;
    this.size=size;
    this.property = property;


    var newChbox = document.createElement("INPUT");
    newChbox.setAttribute("type", "checkbox");

    let chkCode= ' if( this.checked==true){ checkTheObject('+this.index+');   };  if( this.checked==false){uncheckTheObject('+this.index+'); }; ';

    newChbox.setAttribute("onchange",chkCode);

    this.checkBox = newChbox;

    let p_id=this.points[0].id ;
    let p_figure="Polygon";

    let poly_shape=points[0].cx.toFixed(1)+',' +points[0].cy.toFixed(1);

    for(let i=0;i<points.length;i++)
      {
        poly_shape += ' '+ points[i].cx.toFixed(1)+',' +points[i].cy.toFixed(1);
      }

    switch(this.points.length)
    {
    case 3:
      p_id = "&#9651;" + this.points[0].id+this.points[1].id+this.points[2].id;
      p_figure="Triangle";
      break;
    case 4:
      p_id = this.points[0].id+this.points[1].id+this.points[2].id+this.points[3].id;
      p_figure="Quad";
      break;
    default:
      p_id = this.points[0].id+'...'+this.points[this.points.length-1].id;
    }

    this.id = p_id;
    this.figure=p_figure;
    this.polyshape=poly_shape;

  }
  


  SVGcode(){

    let poly_shape=this.points[0].cx.toFixed(1)+',' +this.points[0].cy.toFixed(1);

    for(let i=0;i<this.points.length;i++)
     {poly_shape += ' '+ this.points[i].cx.toFixed(1)+',' +this.points[i].cy.toFixed(1);}

   let scode = ' <polygon '
     +' style="stroke-linejoin:round;  fill :'+ this.fill
     +';stroke-width:'+this.size 
     + '; stroke:'+this.stroke
     +';" points=" '+ this.polyshape
     + ' " /> ';

    return scode;
  }
  



  SVGObject(){

    let pl = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    pl.setAttribute("fill", this.fill );
    pl.setAttribute("points", this.polyshape);
    pl.setAttribute("stroke",this.stroke);
    pl.setAttribute("stroke-width",this.size);
    pl.setAttribute("stroke-linejoin","round");
    pl.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

    pl.setAttribute("style", "cursor:all-scroll;");
    pl.setAttribute("onclick", ' if( allObjects['+this.index+'].checkBox.checked==true){unselectTheObject('+this.index+') ;this.style.stroke = "' + this.stroke + '";} else { selectTheObject('+this.index+') ; this.style.stroke = "red";   }' );

    return pl;
  }
  

 


  tikZObjectCode()
  {
    let tcode='\\draw ';

    for(let i=0;i<this.points.length;i++)
      {tcode += ' ('+ this.points[i].id+')--';}

    tcode+='cycle;';

    return tcode;
  }

}



class midText{
  constructor(index,text,P1,P2,fill,dx,dy,location,sloped){
    this.index = index;
    this.id = text;
    this.P1=P1;
    this.P2=P2;
    this.fill=fill;

    this.location=location;
    let wP = weightedPoint(P1,P2,Number(location),1-Number(location));

    this.cx = Number(P1.cx)*(1-Number(location)) +Number(P2.cx)*Number(location)  ;
    this.cy =Number(P1.cy)*(1-Number(location)) +Number(P2.cy)*Number(location)  ;
    this.dx=dx;
    this.dy=dy;

    this.sloped=sloped;
    this.figure="MidText";
    this.property = 'on '+P1.id+P2.id;


    var newChbox = document.createElement("INPUT");
    newChbox.setAttribute("type", "checkbox");
    let chkCode= ' if( this.checked==true){ addToChecked('
                +this.index
                +')  }  if( this.checked==false){removeFromChecked('
                +this.index+')}';
    newChbox.setAttribute("onchange",chkCode);

    this.checkBox = newChbox;


    let editText=document.createElement("INPUT");
    editText.setAttribute("type","text");
    this.EditText = editText;

    let editdx=document.createElement("SELECT");
    let dxOptNone = document.createElement("option");
    dxOptNone.text="";
    dxOptNone.value = -5;
    let dxOptLeft= document.createElement("option");
    dxOptLeft.text="left";
    dxOptLeft.value = -20;
    let dxOptRight= document.createElement("option");
    dxOptRight.text="right";
    dxOptRight.value = 10;
    editdx.add(dxOptNone);
    editdx.add(dxOptRight);
    editdx.add(dxOptLeft);

    this.Editdx=editdx;

    let editdy=document.createElement("SELECT");
    let dyOptNone = document.createElement("option");
    dyOptNone.text="";
    dyOptNone.value =5;
    let dyOptAbove= document.createElement("option");
    dyOptAbove.text="above";
    dyOptAbove.value = -5;
    let dyOptBelow= document.createElement("option");
    dyOptBelow.text="below";
    dyOptBelow.value = 20;
    editdy.add(dyOptNone);
    editdy.add(dyOptAbove);
    editdy.add(dyOptBelow);

    this.Editdy=editdy;



    let editLocation=document.createElement("SELECT");
    let locMidway = document.createElement("option");
    locMidway.text="Midway";
    locMidway.value =1/2;

    let locAtStart= document.createElement("option");
    locAtStart.text="at start";
    locAtStart.value = 0;

    let locVeryNearStart= document.createElement("option");
    locVeryNearStart.text="very near start";
    locVeryNearStart.value = 1/8;

    let locNearStart= document.createElement("option");
    locNearStart.text="near start";
    locNearStart.value = 1/4;

    let locNearEnd= document.createElement("option");
    locNearEnd.text="near end";
    locNearEnd.value = 3/4;

    let locVeryNearEnd= document.createElement("option");
    locVeryNearEnd.text="very near end";
    locVeryNearEnd.value = 7/8;

    let locAtEnd= document.createElement("option");
    locAtEnd.text="at end";
    locAtEnd.value = 1;


    editLocation.add(locMidway);
    editLocation.add(locAtStart);
    editLocation.add(locVeryNearStart);
    editLocation.add(locNearStart);
    editLocation.add(locAtEnd);
    editLocation.add(locVeryNearEnd);
    editLocation.add(locNearEnd);

    this.EditLocation=editLocation;


    let editSloped=document.createElement("SELECT");
    let slopedFalse = document.createElement("option");
    slopedFalse.text="";
    slopedFalse.value =false;
    let slopedTrue= document.createElement("option");
    slopedTrue.text="sloped";
    slopedTrue.value = true;

    editSloped.add(slopedFalse);
    editSloped.add(slopedTrue);

    this.EditSloped=editSloped;
  }

  SVGcode(){
    scode=' <text '
    +' style="font-size:18;font-family:Arial;'
    +'fill:'+ 'Black'
    +';" x = "' +Number(this.cx)
    +'" y =" '+Number(this.cy)
    +'" dx = "' +Number(this.dx).toFixed(1)
    +'" dy =" '+Number(this.dy).toFixed(1)
    +'" >'+this.id+' </text>';

    return scode;
  }

  SVGObject(){
  
    let coorx = Number(this.P1.cx)*(1-Number(this.location)) +Number(this.P2.cx)*Number(this.location)  ;
    let coory =Number(this.P1.cy)*(1-Number(this.location)) +Number(this.P2.cy)*Number(this.location)  ;
    let sl = this.id.length;
    let wd = Number(sl)*9;




    let P = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    P.setAttribute("x", Number(coorx)+Number(this.dx) );
    P.setAttribute("y", Number(coory)+Number(this.dy) -10 );
    P.setAttribute("width", wd);
    P.setAttribute("height", 20);
    P.setAttribute("style", "font-family:Arial; font-size:18;fill:yellow;opacity:0.3;");
    P.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

    P.setAttribute("style","cursor:all-scroll;");
    P.setAttribute("onclick", ' if( allObjects['+this.index+'].checkBox.checked==true){unselectTheObject('+this.index+') ;this.style.color = "' + this.fill + '";} else { selectTheObject('+this.index+') ; this.style.color = "red";   }' );

    let textNode = document.createTextNode( '$'+ this.id+'$'); 
    P.appendChild(textNode);

    return P;

  }

  tikZObjectCode(){
    var tcode;

    let A = this.P1;
    let B = this.P2;

    let t_loc = '';
    switch (Number(this.location)) {
      case 0: t_loc = "at start";
        break;
     case 0.125: t_loc = "very near start";
        break;
     case 0.25: t_loc = "near start";
       break;
     case 0.75: t_loc = "near end";
       break;
     case 0.875: t_loc = "very near end";
         break;
     case 1: t_loc = "at end";
           break;
     default:
      t_loc = "midway";
    }

    let t_dydx = '';



    if(Number(this.dy)==20){t_dydx += 'below';}
    if(Number(this.dy)==-5){t_dydx += 'above';}
    if(Number(this.dx)==10){t_dydx += ' right';}
    if(Number(this.dx)==-20){t_dydx += ' left';}

    if(t_dydx!=''){t_dydx = ','+t_dydx;}

    var slopedcode;
    if(this.sloped){slopedcode = ',sloped';}
    else {
      slopedcode='';
    }

    tcode= '\\path ('+A.id+')--('+B.id+') node['+t_loc+t_dydx+slopedcode+']{$'+Obj.id +'$};';

    return tcode;

  }

  infoRow(){
    var newRow = document.createElement("TR");
    let cell_check=newRow.insertCell(0);
    let cell_id = newRow.insertCell(1);
    let cell_shape=newRow.insertCell(2);
    let cell_property = newRow.insertCell(3);
    let cell_label=newRow.insertCell(4);
    let cell_coordinates=newRow.insertCell(5);


    cell_check.className="tableCheck tableItem2";
    cell_shape.className="tableShape tableItem2";
    cell_id.className="tableID";
    cell_label.className="tableLabel";
    cell_coordinates.className="tableCoordinates";


    cell_check.appendChild(this.checkBox);
    cell_shape.innerText=this.figure;

    let textNode = document.createTextNode( '$'+ this.id+'$'); 
    cell_id.appendChild(textNode);
    /*
    cell_id.innerHTML='$'+ this.id+'$' ;
    */
    cell_label.innerHTML='';
    cell_coordinates.innerText='';
    cell_property.innerHTML=this.property;


    return newRow;

  }

  editRow(){
    var newRow = document.createElement("TR");
    let cell_text = newRow.insertCell(0);
    let cell_dx=newRow.insertCell(1);
    let cell_dy = newRow.insertCell(2);
    let cell_loc=newRow.insertCell(3);
    let cell_sloped = newRow.insertCell(4);

    this.EditText.value=this.id;
    this.Editdx.value=this.dx;
    this.Editdy.value=this.dy;
    this.EditLocation.value=this.location;
    this.EditSloped.value = this.sloped;


    cell_text.innerText='text';
    cell_text.appendChild(this.EditText);

    cell_dx.innerText='R/L';
    cell_dx.appendChild(this.Editdx) ;

    cell_dy.innerText='A/B';
    cell_dy.appendChild(this.Editdy) ;

    cell_loc.innerText='loc';
    cell_loc.appendChild(this.EditLocation);

    cell_sloped.innerText='sloped';
    cell_sloped.appendChild(this.EditSloped);

    return newRow;
  }

}



class angle{
  constructor(index,points,scale,fill,stroke,rightAngle,text,eccentricity,draw){
    this.index = index;
    this.text = text;
    this.id ='&#8737;'+points[0].id+points[1].id+points[2].id;
    this.points = points;
    this.scale = scale;
    this.fill = fill;
    this.stroke = stroke;
    this.rightAngle = rightAngle;

    this.eccentricity=eccentricity;
    this.draw=draw;

    this.figure="Angle";

    var newChbox = document.createElement("INPUT");
    newChbox.setAttribute("type", "checkbox");

    let chkCode= ' if( this.checked==true){ addToChecked('
                +this.index
                +')  }  if( this.checked==false){removeFromChecked('
                +this.index+')}';

    newChbox.setAttribute("onchange",chkCode);

    this.checkBox = newChbox;

    let editText=document.createElement("INPUT");
    editText.setAttribute("type","text");
    this.EditText = editText;

    let editScale=document.createElement("INPUT");
    editScale.setAttribute("type","number");
    this.EditScale = editScale;

    let editEccent=document.createElement("INPUT");
    editEccent.setAttribute("type","number");
    this.EditEccent = editEccent;

    let editRightAngle=document.createElement("INPUT");
    editRightAngle.setAttribute("type","checkbox");
    this.EditRightAngle = editRightAngle;

    let editDraw=document.createElement("INPUT");
    editDraw.setAttribute("type","checkbox");
    this.EditDraw = editDraw;
  }

  SVGcode(){
    let poly_shape=this.points[0].cx.toFixed(1)+',' +this.points[0].cy.toFixed(1);

    for(let i=0;i<this.points.length;i++)
     {
     poly_shape += ' '+ this.points[i].cx.toFixed(1)+',' +this.points[i].cy.toFixed(1);
     }
     let scode = ' <clipPath id='+this.id+' > <polygon  points=" '+ poly_shape + ' " /> </clipPath>';

     /*
     <circle style="fill:blue; fill-opacity:0.2; stroke:red;stroke-width:3;" cx = "267.0" cy =" 78.0" r = " 20 " clip-path="url(#tri1)" />
     */
     scode+= ' <circle style="fill:'+this.fill+'; stroke:'+this.stroke
     +';stroke-width:3;" cx ='+this.points[1].cx
     +' cy ='+this.points[1].cy
     +' r = '+Number( Number(this.scale)*15)+' clip-path="url(#'+this.id+' )" /> ';

     return scode;

  }

  SVGObject(){
    let A1 = this.points[0];
    let B1 = this.points[1];
    let C1 = this.points[2];

    let r = Number(this.scale)*30;
    let a = sideLength(B1,A1);
    let c = sideLength(B1,C1);

    let Bs = weightedPoint(B1,A1,Number(r),Number(a)-Number(r));
    let Be = weightedPoint(B1,C1,Number(r),Number(c)-Number(r));
    let pth;

    if(this.draw){

      if(!this.rightAngle){
        pth= 'M '+Number(B1.cx)+" "+Number(B1.cy)+" L "+Number(Bs.cx)+' '+Number(Bs.cy) +' A '+r+','+r+' 0 0,0 '+Be.cx+','+Be.cy+' Z ';
      }

      else if(this.rightAngle){
        let Px= Number(Be.cx)+Number(Bs.cx)-Number(B1.cx);
        let Py = Number(Be.cy)+Number(Bs.cy)-Number(B1.cy);

        pth= 'M '+Number(B1.cx)+" "+Number(B1.cy)+" L "+Number(Bs.cx)+' '+Number(Bs.cy) +' L '+Number(Px)+' '+Number(Py)+' L '+Be.cx+','+Be.cy+' Z ';
      }

    }

    else {pth='';}

    let Pth = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    Pth.setAttribute("stroke",this.stroke);
    Pth.setAttribute("fill",this.fill);
    Pth.setAttribute("stroke-width","2");
    Pth.setAttribute("d",pth);
    Pth.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

    Pth.setAttribute("style", "cursor:all-scroll;");
    Pth.setAttribute("onclick", ' if( allObjects['+this.index+'].checkBox.checked==true){unselectTheObject('+this.index+') ;this.style.stroke = "' + this.stroke + '";} else { selectTheObject('+this.index+') ; this.style.stroke = "red";   }' );


    return Pth;
  }

  SVGLabel(){
    let A1 = this.points[0];
    let B1 = this.points[1];
    let C1 = this.points[2];

    let ee = Number(this.eccentricity)*20;
    let cc = sideLength(B1,A1);
    let aa = sideLength(B1,C1);

    let B1bottom = weightedPoint(B1,A1,Number(ee),Number(cc)-Number(ee));

    let B1top = weightedPoint(B1,C1,Number(ee),Number(aa)-Number(ee));

    let BM = weightedPoint(B1bottom,B1top,1,1);

    let dd= sideLength(B1,BM);

    let Bx = weightedPoint(BM,B1,Number(dd) - Number(ee),Number(ee));



    let L = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    L.setAttribute("x",Number(Bx.cx)   );
    L.setAttribute("y", Number(Bx.cy)-10 );
    L.setAttribute("width", 40);
    L.setAttribute("height", 32);
    L.setAttribute("style","font-size:18;font-family:Arial;");

    L.setAttribute("color",this.stroke);
    L.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

    /*

    L.setAttribute("style","cursor:all-scroll;");
    L.setAttribute("onclick", ' if( allObjects['+this.index+'].checkBox.checked==true){unselectTheObject('+this.index+') ;this.style.color = "' + this.stroke + '";} else { selectTheObject('+this.index+') ; this.style.color = "red";   }' );
    */

    let textNode = document.createTextNode( '$'+ this.text+'$'); 
    L.appendChild(textNode);


    return L;
  }

  tikZObjectCode(){
    var tcode;

    let A = this.points[0];
    let B = this.points[1];
    let C = this.points[2];

    let rcode='';
    if(this.rightAngle){rcode ='right ';}

    let aIn_code='';

    if(this.text!=''){aIn_code='"$'+this.text+'$",';}

    let a_draw='';
    if(this.draw){a_draw = 'draw,'; }


    tcode= '\\path ('+A.id+') coordinate ('+A.id+') -- ('+B.id+ ') coordinate ('+B.id+') -- ('+C.id+') coordinate ('+C.id+') pic['+aIn_code+a_draw+'angle eccentricity='+this.eccentricity+',scale='+this.scale+ '] {'+rcode+'angle='+A.id+'--'+B.id+'--'+C.id+'};';

    return tcode;

  }

  infoRow(){
    var newRow = document.createElement("TR");
    let cell_check=newRow.insertCell(0);
    let cell_id = newRow.insertCell(1);
    let cell_shape=newRow.insertCell(2);
    let cell_property = newRow.insertCell(3);
    let cell_label=newRow.insertCell(4);
    let cell_coordinates=newRow.insertCell(5);

    cell_check.className="tableCheck tableItem2";
    cell_shape.className="tableShape tableItem2";
    cell_id.className="tableID";
    cell_label.className="tableLabel";
    cell_coordinates.className="tableCoordinates";

    cell_check.appendChild(this.checkBox);
    cell_shape.innerText= '$\\measuredangle$' ;
    cell_id.innerHTML=this.id;
    cell_property.innerText = "$\\square$:"+this.rightAngle ;
    cell_coordinates.innerText = "("+this.scale+","+this.eccentricity+")";
    cell_label.innerText = '$'+this.text+'$' ;

    return newRow;
  }

  editRow(){
    var newRow = document.createElement("TR");
    let cell_text = newRow.insertCell(0);
    let cell_scale=newRow.insertCell(1);
    let cell_eccent = newRow.insertCell(2);
    let cell_rightAngle=newRow.insertCell(3);
    let cell_draw=newRow.insertCell(4);

    this.EditText.value=this.text;
    this.EditScale.value=this.scale;
    this.EditEccent.value=this.eccentricity;
    this.EditRightAngle.checked=this.rightAngle;
    this.EditDraw.checked=this.draw;

    cell_text.innerText="Ang";
    cell_text.appendChild(this.EditText );

    cell_scale.innerText="Scale";
    cell_scale.appendChild(this.EditScale);

    cell_eccent.innerText="Eccnt";
    cell_eccent.appendChild(this.EditEccent);

    cell_rightAngle.innerText="$\\square$";
    cell_rightAngle.appendChild(this.EditRightAngle);

    cell_draw.innerText="$\\measuredangle$";
    cell_draw.appendChild(this.EditDraw);

    return newRow;
  }

}




function toTikz(x,y)
{
  let Tx = Number(x/50)-1;
  let Ty = 9-Number(y/50);
  if(Number.isInteger(Tx)==false){ Tx=Tx.toFixed(2); }

  if(Number.isInteger(Ty)==false){Ty=Ty.toFixed(2)};

  let PTikZ = '(' +Tx +','+Ty +')';
  return PTikZ;
}




document.getElementById("drawingFrame").ondblclick = function(event) {CreatePoint(event)};

function CreatePoint(e)
{
  let Px=e.clientX-10;
  let Py=e.clientY-10;
  /*
  (index,id,cx,cy,r,fill,stroke,property,dx,dy,labeled,pointType,Objs)
  */

  let oo = [];

  let P= new point(ObjectCounter,labels[0],e.clientX-10,e.clientY-10,3,"none","Gray",-5,-5,false,"base",oo);

  ObjectCounter++;

  allObjects.push(P);
  Objects.push(P);

  reBuild(Objects);
  clearButtons();
}


function reBuild(Objs)
{
  loadSVGDrawing(Objs);
  loadTable(Objs);
  loadSVGCode(Objs);

  loadCheckBoxes(Objs);
  loadLabel(Objs);
    MathJax.typeset();

    loadTikZCode(Objs);

}


function clickLine()
{
  if(CheckedPoints.length==2&& CheckedLines.length== 0&&CheckedCircles.length==0)
  {
    let A = CheckedPoints[0];
    let B = CheckedPoints[1];

    let L = new line(ObjectCounter,A,B,"MidnightBlue",2,"solid");
    ObjectCounter++;

    allObjects.push(L);
    Objects.push(L);
  }

  reBuild(Objects);
  clearButtons();
}


function clickFillPoint()
{
  for(let i=0;i<CheckedPoints.length;i++)
  {
    CheckedPoints[i].fill="black";
  }

  reBuild(Objects);
  clearButtons();
}


function clickAddLabel()
{
  for(let i=0;i<CheckedPoints.length;i++){
    CheckedPoints[i].labeled=true;
  }

  reBuild(Objects);
  clearButtons();
}

function clickMidText(){
  /*
  EditText
  Editdx
  Editdy
  EditLocation
  EditSloped
  constructor(index,text,P1,P2,fill,dx,dy,location,sloped)
  */


  if(CheckedObjects.length==2&& CheckedPoints.length==2)
  {
    CheckedPoints[0].checkBox.disabled=true;
    CheckedPoints[1].checkBox.disabled=true;


    let nMT = new midText(ObjectCounter,'',CheckedObjects[0],CheckedObjects[1],'black',0,0,1/2,false);

    ObjectCounter++;
    allObjects.push(nMT);
    Objects.push(nMT);

    document.getElementById("OKMidText").style.display="block";
    document.getElementById("editTable").appendChild(nMT.editRow());

    MathJax.typeset();
  }

}




function clickMidTextOK(){
  CheckedPoints[0].checkBox.disabled=false;
  CheckedPoints[1].checkBox.disabled=false;

  let O = Objects[ Objects.length-1];
  O.id = O.EditText.value;
  O.dx = O.Editdx.value;
  O.dy = O.Editdy.value;
  O.location = O.EditLocation.value;
  O.sloped = O.EditSloped.value;

  reBuild(Objects);
  clearButtons();

  document.getElementById("OKMidText").style.display="none";
  
  while ( document.getElementById("editTable").rows.length > 0 )
  {
    document.getElementById("editTable").deleteRow(0);
  }





}


function clickDrawPolygon(){
  if(CheckedPoints.length>2 && CheckedPoints.length==CheckedObjects.length)
  {
    let Pol=new polygon(ObjectCounter, CheckedPoints, "none","MidnightBlue","","2");
    ObjectCounter++;
    
    allObjects.push(Pol);
    Objects.push(Pol);
  }
  
  reBuild(Objects);
  clearButtons();
}

function clickDrawCirle(){

  if(CheckedPoints.length==3&& CheckedObjects.length==3)
  {
    let A = CheckedPoints[0];
    let B = CheckedPoints[1];
    let C = CheckedPoints[2];

    let CCirc = CircumCircle(A,B,C);

    let cx = CCirc.O.cx
    let cy = CCirc.O.cy;
    let cR = CCirc.R;

     let c_id='&#9711;'+ A.id+B.id+C.id;

    let o_prop = "&#9711; <sub>"+A.id+B.id+C.id+"</sub>";
    let c_prop = "R:"+cR.toFixed(0);

    let cO_id='&#9737;'+ A.id+B.id+C.id;

    /*

    (index,id,cx,cy,r,fill,stroke,dx,dy,labeled,pointType,objs)
    */
    let NO = new point(ObjectCounter,labels[0],cx,cy,3,"none","Maroon",-5,-5,false,"Circumcenter",CheckedPoints);


    ObjectCounter++;
    allObjects.push(NO);
    Objects.push(NO);

    let NC = new circle(ObjectCounter,NO,cR,"none","Gray","Circumcircle",CheckedObjects);

    ObjectCounter++;

    allObjects.push(NC);
    Objects.push(NC);
  }

  reBuild(Objects);
  clearButtons();
}


function clickIncircle(){

  if(CheckedPoints.length==3&& CheckedObjects.length==3)
  {
    let A = CheckedPoints[0];
    let B = CheckedPoints[1];
    let C = CheckedPoints[2];

    let ICirc = InnerCircle(A,B,C);

    let cx = ICirc.I.cx;
    let cy = ICirc.I.cy;
    let cR = ICirc.r;

     let c_id='&#9711;'+ A.id+B.id+C.id;

    let o_prop = "&#9711; <sub>"+A.id+B.id+C.id+"</sub>";
    let c_prop = "r:"+cR.toFixed(0);
    let cO_id='&#9737;'+ A.id+B.id+C.id;

    let NO = new point(ObjectCounter,labels[0],cx,cy,3,"none","Maroon",-5,-5,false,"Incenter",CheckedPoints);



    ObjectCounter++;
    allObjects.push(NO);
    Objects.push(NO);

    let NC = new circle(ObjectCounter,NO,cR,"none","Gray","Incircle",CheckedPoints);

    ObjectCounter++;

    allObjects.push(NC);
    Objects.push(NC);
  }

  reBuild(Objects);
  clearButtons();
}


function clickCircleWithR(){
  if(CheckedObjects.length==1&&CheckedPoints.length==1)
  {
    CheckedObjects[0].checkBox.disabled=true;

    let eth = document.createElement("TR");
    let ethR = eth.insertCell(0);
    let ethRI = eth.insertCell(1);

    let e0=document.createTextNode("R:");
    ethR.appendChild(e0);

    let Rinput = document.createElement("INPUT");
    Rinput.setAttribute("type","number");
    Rinput.setAttribute("id","Rinput");

    ethRI.appendChild(Rinput);

    document.getElementById("editTable").appendChild(eth);
    document.getElementById("OKCircleWithR").style.display="block";
  }



}

function clickOKCircleWithR(){
  CheckedObjects[0].checkBox.disabled=false;
  let P = CheckedObjects[0];
  let cR = document.getElementById("Rinput").value;

  let NC = new circle(ObjectCounter,P,Number(cR)*60,"none","Gray","ORdefined",[P,cR]);

  ObjectCounter++;

  allObjects.push(NC);
  Objects.push(NC);

  document.getElementById("OKCircleWithR").style.display="none";

  while ( document.getElementById("editTable").rows.length > 0 ) {
    document.getElementById("editTable").deleteRow(0);
  }

  reBuild(Objects);
  clearButtons();

}

function clickCircAB(){

  if(CheckedObjects.length==2&&CheckedPoints.length==2)
  {

    let eth = document.createElement("TR");
    let ethR = eth.insertCell(0);
    let ethRI = eth.insertCell(1);

    let e0=document.createTextNode("Center:");
    ethR.appendChild(e0);

    let ABinput = document.createElement("SELECT");
    ABinput.setAttribute("id","ABinput");

    let OptA = document.createElement("option");
    OptA.text=CheckedObjects[0].id;
    OptA.value = 0;

    let OptB = document.createElement("option");
    OptB.text=CheckedObjects[1].id;
    OptB.value = 1;

    ABinput.add(OptA);
    ABinput.add(OptB);

    ethRI.appendChild(ABinput);

    document.getElementById("editTable").appendChild(eth);

    document.getElementById("OKCircAB").style.display="block";

  }

}

function clickOKCircleAB(){
  let A = CheckedObjects[ Number(document.getElementById("ABinput").value)] ;
  let B = CheckedObjects[ 1 - Number(document.getElementById("ABinput").value)] ;
  let cR = Number(sideLength( CheckedObjects[0],CheckedObjects[1] )).toFixed(2);

  let NC = new circle(ObjectCounter,A,Number(cR),"none","Gray","ABdefined",[A,B,cR]);

  ObjectCounter++;

  allObjects.push(NC);
  Objects.push(NC);

  document.getElementById("OKCircAB").style.display="none";

  while ( document.getElementById("editTable").rows.length > 0 ) 
  {
    document.getElementById("editTable").deleteRow(0);
  }

  reBuild(Objects);
  clearButtons();

}



function clickWP(){

  if(CheckedObjects.length==2&&CheckedPoints.length==2){

    CheckedPoints[0].checkBox.disabled=true;
    CheckedPoints[1].checkBox.disabled=true;

    let eth = document.createElement("TR");
    let ethuw = eth.insertCell(0);

    let e0=document.createTextNode(CheckedObjects[0].id+"X:"+"X"+CheckedObjects[1].id);

    let uInput = document.createElement("INPUT");
    uInput.setAttribute("type","number");
    uInput.setAttribute("id","WPuInput");

    let wInput = document.createElement("INPUT");
    wInput.setAttribute("type","number");
    wInput.setAttribute("id","WPwInput");

    ethuw.appendChild(e0);
    ethuw.appendChild(uInput);
    ethuw.appendChild(wInput);


    document.getElementById("editTable").appendChild(eth);

    document.getElementById("OKWP").style.display="block";

  }

}

function clickOKWP(){



  let A = CheckedObjects[0];
  let B = CheckedObjects[1];
  let u= document.getElementById("WPuInput").value;
  let w= document.getElementById("WPwInput").value;

  let u1 = Number(u)/(Number(u)+Number(w));
  let w1 = Number(w)/(Number(u)+Number(w));

  let wP = weightedPoint(A,B,u1,w1);


  /*(index,id,cx,cy,r,fill,stroke,dx,dy,labeled,pointType,objs)  */

  let NP = new point(ObjectCounter,labels[0],wP.cx,wP.cy,3,"none","Gray",-5,-5,false,"weighted",[A,B,u,w]);

  ObjectCounter++;

  allObjects.push(NP);
  Objects.push(NP);

  document.getElementById("OKWP").style.display="none";


  CheckedPoints[0].checkBox.disabled=false;
  CheckedPoints[1].checkBox.disabled=false;

  while ( document.getElementById("editTable").rows.length > 0 ) {
    document.getElementById("editTable").deleteRow(0);
  }

  reBuild(Objects);
  clearButtons();



}

function clickWA(){

  if(CheckedObjects.length==3&&CheckedPoints.length==3)
  {
    CheckedPoints[0].checkBox.disabled=true;
    CheckedPoints[1].checkBox.disabled=true;
    CheckedPoints[2].checkBox.disabled=true;


    let eth = document.createElement("TR");
    let ethAnguw = eth.insertCell(0);

    let e0=document.createTextNode(CheckedObjects[0].id+CheckedObjects[1].id+"X:"+"X"+CheckedObjects[1].id+CheckedObjects[2].id);

    let AnguInput = document.createElement("INPUT");
    AnguInput.setAttribute("type","number");
    AnguInput.setAttribute("id","WAuInput");

    let AngwInput = document.createElement("INPUT");
    AngwInput.setAttribute("type","number");
    AngwInput.setAttribute("id","WAwInput");

    ethAnguw.appendChild(e0);
    ethAnguw.appendChild(AnguInput);
    ethAnguw.appendChild(AngwInput);


    document.getElementById("editTable").appendChild(eth);

    document.getElementById("OKWA").style.display="block";

  }

}

function clickOKWA(){
  CheckedPoints[0].checkBox.disabled=false;
  CheckedPoints[1].checkBox.disabled=false;
  CheckedPoints[2].checkBox.disabled=false;
  
  let A = CheckedObjects[0];
  let B = CheckedObjects[1];
  let C = CheckedObjects[2];

  let u= document.getElementById("WAuInput").value;
  let w= document.getElementById("WAwInput").value;

  let u1 = Number(u)/(Number(u)+Number(w));
  let w1 = Number(w)/(Number(u)+Number(w));

  let wP = weightedAngle(A,C,B,u,w);


  /*(index,id,cx,cy,r,fill,stroke,dx,dy,labeled,pointType,objs)  */

  let NP = new point(ObjectCounter,labels[0],wP.cx,wP.cy,3,"none","Gray",-5,-5,false,"weightedAngle",[A,B,C,u,w]);

  ObjectCounter++;

  allObjects.push(NP);
  Objects.push(NP);

  document.getElementById("OKWA").style.display="none";

  while ( document.getElementById("editTable").rows.length > 0 ) {
    document.getElementById("editTable").deleteRow(0);
  }

  reBuild(Objects);
  clearButtons();



}








function clickAngle()
{
  if(CheckedObjects.length==3&&CheckedPoints.length==3)
  {
    CheckedPoints[0].checkBox.disabled=true;
    CheckedPoints[1].checkBox.disabled=true;
    CheckedPoints[2].checkBox.disabled=true;

    let nA = new angle(ObjectCounter,CheckedObjects,0.4,"none",'MidnightBlue',false,' ',1,true);
    ObjectCounter++;
    allObjects.push(nA);
    Objects.push(nA);
    reBuild(Objects);

    document.getElementById("AngleOKButton").style.display="block";
    document.getElementById("editTable").appendChild(nA.editRow());

    MathJax.typeset();
  }
}


function clickAngleOK()
{
  CheckedPoints[0].checkBox.disabled=false;
  CheckedPoints[1].checkBox.disabled=false;
  CheckedPoints[2].checkBox.disabled=false;

  let Ang = Objects[ Objects.length-1];
  Ang.text=Ang.EditText.value;
  Ang.scale=Ang.EditScale.value;
  Ang.eccentricity=Ang.EditEccent.value;
  Ang.rightAngle=Ang.EditRightAngle.checked;
  Ang.draw=Ang.EditDraw.checked;

  reBuild(Objects);
  clearButtons();

  while ( document.getElementById("editTable").rows.length > 0 ) {
    document.getElementById("editTable").deleteRow(0);
  }
  document.getElementById("AngleOKButton").style.display="none";

}


function clickEditRow(){
  document.getElementById("EditOKButton").style.display="block";

  for(let i=0;i<CheckedObjects.length;i++){
    let fig = CheckedObjects[i].figure;
    if(fig=="Point"||fig=="Line"||fig=="Angle"||fig=="Circle"||fig=="MidText")
    {
      document.getElementById("editTable").appendChild(CheckedObjects[i].editRow());
    }
  }

  MathJax.typeset();

}




function clickEdit(){}

function toTIKZCoordinates(){
  for(let i =0;i<CheckedObjects.length;i++){
    if(CheckedObjects[i].figure=="Point"){
      let x = CheckedObjects[i].cx;
      let y = CheckedObjects[i].cy;

      let Tx = Number(Number(Number(x)/50)-1).toFixed(0);
      let Ty = Number(9-Number(Number(y)/50)).toFixed(0);

      CheckedObjects[i].cx = Number(50*(Number(Tx)+1));
      CheckedObjects[i].cy = Number(50*(9-Number(Ty)));
    }
  }

  reBuild(Objects);
  clearButtons();

}

function clickOKEditMultiple(){
  for(let i=0;i<CheckedObjects.length;i++){
    let P = CheckedObjects[i];

    if(P.figure=="Point"){
      P.id=P.EditID.value;
      P.cx = Number(P.Editcx.value);
      P.cy = Number(P.Editcy.value);
      P.labeled = P.EditLabeled.checked;
      P.dx = Number(P.Editdx.value);
      P.dy = Number(P.Editdy.value);
    }

    if(P.figure=="Circle"){
      P.id=P.EditID.value;
      P.cx = Number(P.Editcx.value);
      P.cy = Number(P.Editcy.value);
      P.r = Number(P.EditR.value);
    }

    if(P.figure=="Line"){
      P.pattern=P.EditPattern.value;
    }

    if(P.figure=="Angle"){
      P.text=P.EditText.value;
      P.scale = Number(P.EditScale.value);
      P.eccentricity = Number(P.EditEccent.value);
      P.rightAngle = P.EditRightAngle.checked;
      P.draw = P.EditDraw.checked;
    }

    if(P.figure=="MidText"){
      P.id=P.EditText.value;
      P.dx =  Number(P.Editdx.value);
      P.dy =  Number(P.Editdy.value);
      P.location = Number(P.EditLocation.value);
      P.sloped = P.EditSloped.value;

    }

  }


  reBuild(Objects);
  clearButtons();

  while ( document.getElementById("editTable").rows.length > 0 ) {
    document.getElementById("editTable").deleteRow(0);
  }

  document.getElementById("EditOKButton").style.display="none";


}

function clickEditOK(){
  reBuild(Objects);
  clearButtons();
}


function clickEditBACK(){
    /*
  document.getElementById("idInput").value="";


  document.getElementById("cxInput").value="";
  document.getElementById("cxInput").disabled=true;

  document.getElementById("cyInput").value="";
  document.getElementById("cyInput").disabled=true;

  document.getElementById("rInput").value="";
  document.getElementById("rInput").disabled=true;

  document.getElementById("dxInput").value="";
  document.getElementById("dxInput").disabled=true;

  document.getElementById("dyInput").value="";
  document.getElementById("dyInput").disabled=true;



  document.getElementById("strokeInput").value="";
  document.getElementById("strokeInput").disabled=true;

  document.getElementById("fillInput").value="";
  document.getElementById("fillInput").disabled=true;
  */

}


function clickPerp(){
  
  if(CheckedObjects.length=3||CheckedObjects.length==2)
  {
    var A;
    var B;
    var C;
    var objs=[];

    if(CheckedPoints.length==3)
      {
        C=CheckedPoints[0];
        A=CheckedPoints[1];
        B=CheckedPoints[2];

        let l = new line('nn',A,B,"MidnightBlue",2,"solid");
        objs.push(l);
        objs.push(C);
      }

      else if(CheckedPoints.length==1&&CheckedLines.length==1)
      {
        C=CheckedPoints[0];
        A=CheckedLines[0].P1;
        B=CheckedLines[0].P2;

        objs.push(CheckedLines[0]);
        objs.push(CheckedPoints[0]);
      }

      let PP = Perpendicular(C,A,B);

      let NP = new point(ObjectCounter,labels[0],Number(PP.cx),Number(PP.cy),3,"none","Gray",-5,-5,false,"perpendicularLP",objs);
      ObjectCounter++;

      allObjects.push(NP);
      Objects.push(NP);
  }

  reBuild(Objects);
  clearButtons();
}

function clickMerge()
{
  if(CheckedObjects.length==2)
  {
    if(CheckedPoints.length==1&&CheckedCircles.length==1)
    {mergeCP( CheckedCircles[0],CheckedPoints[0]);}

    else if(CheckedPoints.length==1&&CheckedLines.length==1)
    {mergeLP(CheckedLines[0],CheckedPoints[0]);}
  }

  else if(CheckedObjects.length==3)
  {
    if(CheckedPoints.length==1&&CheckedCircles.length==2)
      {mergeCCP( CheckedCircles[0],CheckedCircles[1],CheckedPoints[0] ); }

    else if(CheckedPoints.length==1&&CheckedCircles.length==1&&CheckedLines.length==1)
    {
      mergeCLP( CheckedCircles[0],CheckedLines[0],CheckedPoints[0] );
    }
  }

  reBuild(Objects);
  clearButtons();
}



function mergeCP(Circ,Pt)
{
  let d=sideLength(Circ,Pt);
  let newPt = weightedPoint(Pt,Circ,Number(d - Number(Circ.r)),Number(Circ.r));
  Pt.cx = Number(newPt.cx);
  Pt.cy = Number(newPt.cy);
}

function mergeLP(Ln,Pt)
{
  let newPt = Perpendicular(Pt,Ln.P1,Ln.P2);
  Pt.cx = Number(newPt.cx);
  Pt.cy = Number(newPt.cy);
}

function mergeCCP(C1,C2,Pt)
{

  for(let i =0;i<10;i++)
  {
    mergeCP(C1,Pt);
    mergeCP(C2,Pt);
  }
}

function mergeCLP(C,L,Pt)
{
  for(let i =0;i<10;i++)
  {
    mergeCP(C,Pt);
    mergeLP(L,Pt);
  }
}



function clickPerpSign(){
  for(let i=0;i<CheckedObjects.length;i++){
    if(CheckedObjects.figure=="Angle"){
      CheckedObjects.rightAngle=true;
    }
  }
  

  reBuild(Objects);
  clearButtons();

}




function clickIntersection(){
  if(CheckedObjects.length==4 || CheckedObjects.length==2 ){
    let pts=[];

    if(CheckedPoints.length==4)
    {
      pts = CheckedPoints;
    }

    else if(CheckedLines.length==2)
    {
      pts.push(CheckedLines[0].P1);
      pts.push(CheckedLines[0].P2);
      pts.push(CheckedLines[1].P1);
      pts.push(CheckedLines[1].P2);
    }
    let P=new point(ObjectCounter,labels[0],0,0,3,"none","Gray",-5,-5,false,"intersectionLL",pts);

    ObjectCounter++;

    allObjects.push(P);
    Objects.push(P);
  }
  reBuild(Objects);
  clearButtons();
}


function loadSVGDrawing(Objs){

  // drawing the coordinate lines:

  document.getElementById("drawingFrame").innerHTML="";

  let patrn = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
  patrn.setAttribute("id","coorsystem");
  patrn.setAttribute("viewBox","0,0,10,10");
  patrn.setAttribute("width","6.25%");
  patrn.setAttribute("height","10%");

  let rct = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rct.setAttribute("width","10");
  rct.setAttribute("height","10");
  rct.setAttribute("style","fill:none;stroke:#85BBB6;stroke-width:0.1");

  patrn.appendChild(rct);

  let coorect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  coorect.setAttribute("width","800");
  coorect.setAttribute("height","500");
  coorect.setAttribute("style","fill:url(#coorsystem);");

  document.getElementById("drawingFrame").appendChild(patrn);
  document.getElementById("drawingFrame").appendChild(coorect);

  //drawing everything else:





  for(let i=0;i<Objs.length;i++)
  {
    let P = Objs[i];
    let fig = P.figure;
    if(i<Objs.length-1)
    {
      document.getElementById("drawingFrame").appendChild(P.SVGObject());
    }


    

    if(fig=="Point"||fig=="Angle")
      {document.getElementById("drawingFrame").appendChild(P.SVGLabel());}
    /*
    if(fig=="Point" || fig=="Line"||fig=="Circle"||fig=="MidText"||fig=="Angle"||fig=="Polygon")
    {}
    */

  }

  let Pl=Objs[Objs.length-1 ];
  
  switch(Pl.figure)
  {
  case "Line":
    let llO = Pl.SVGObject();
    let ll=llO.getTotalLength();
    llO.setAttribute("stroke-dashoffset",ll);
    llO.setAttribute("stroke-dasharray",ll);

    let Pinit = Pl.P1.SVGObject();
    let Pend = Pl.P2.SVGObject();

    document.getElementById("drawingFrame").appendChild(Pinit);
    Pinit.animate(  [{ strokeWidth : "20", }, { strokeWidth : "1",} ], { duration: 200, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );
    
    document.getElementById("drawingFrame").appendChild(llO);
    llO.animate(  [{ strokeDashoffset : ll }, { strokeDashoffset : "0"} ], { duration: 500, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );

    document.getElementById("drawingFrame").appendChild(Pend);
    Pend.animate(  [{ strokeWidth : "20", }, { strokeWidth : "1",} ], { duration: 200, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );
        





    break;


  case "Point":
    let P0 = Pl.SVGObject();
    let LP0 = Pl.SVGLabel();
    let strk= Pl.stroke;

    document.getElementById("drawingFrame").appendChild( P0 );
    P0.animate(  [{ strokeWidth : "20", stroke: "red" }, { strokeWidth : "1",stroke: strk} ], { duration: 200, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );

    document.getElementById("drawingFrame").appendChild( LP0 );
    LP0.animate(  [{ opacity : 0 }, { opacity : 1 } ], { duration: 600, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );


    
    break;

  case "Angle":
    document.getElementById("drawingFrame").appendChild(Pl.SVGLabel());

    let AO = Pl.SVGObject();
    let Al=AO.getTotalLength();
    AO.setAttribute("stroke-dashoffset",Al);
    AO.setAttribute("stroke-dasharray",Al);
    document.getElementById("drawingFrame").appendChild(AO);
    AO.animate(  [{ strokeDashoffset : Al }, { strokeDashoffset : "0"} ], { duration: 500, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );

  
    break;

  case "Circle":
    let CO = Pl.SVGObject();
    let Cl=CO.getTotalLength();
    CO.setAttribute("stroke-dashoffset",Cl);
    CO.setAttribute("stroke-dasharray",Cl);
    document.getElementById("drawingFrame").appendChild(CO);
    CO.animate(  [{ strokeDashoffset : Cl }, { strokeDashoffset : "0"} ], { duration: 500, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );
    break;

  case "Polygon":
    let PoO = Pl.SVGObject();
    let Pol=PoO.getTotalLength();
    PoO.setAttribute("stroke-dashoffset",Pol);
    PoO.setAttribute("stroke-dasharray",Pol);
    document.getElementById("drawingFrame").appendChild(PoO);
    PoO.animate(  [{ strokeDashoffset : Pol }, { strokeDashoffset : "0"} ], { duration: 500, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );
    break;

  case "Triangle":
    let ToO = Pl.SVGObject();
    let Tol=ToO.getTotalLength();
    ToO.setAttribute("stroke-dashoffset",Tol);
    ToO.setAttribute("stroke-dasharray",Tol);
    document.getElementById("drawingFrame").appendChild(ToO);
    ToO.animate(  [{ strokeDashoffset : Tol }, { strokeDashoffset : "0"} ], { duration: 500, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );
    break;

  case "Quad":
    let QoO = Pl.SVGObject();
    let Qol=QoO.getTotalLength();
    QoO.setAttribute("stroke-dashoffset",Qol);
    QoO.setAttribute("stroke-dasharray",Qol);
    document.getElementById("drawingFrame").appendChild(QoO);
    QoO.animate(  [{ strokeDashoffset : Qol }, { strokeDashoffset : "0"} ], { duration: 500, iterations: 1, begin:0, fill:"forwards", easing:"ease-in-out"}  );
    break;

  default:
    document.getElementById("drawingFrame").appendChild(Pl.SVGObject());
  }


}

function copySVGcode()
{
   let copySVGcode = document.getElementById("test");
   /*
  
  navigator.clipboard.writeText(copySVGcode.innerText);
  */


  var SVGcodeWindow = window.open("", "MsgWindow", "width=600,height=600");
    SVGcodeWindow.document.write(copySVGcode.innerHTML);

}

function copyTIKZcode()
{
   let copySVGcode = document.getElementById("tikZcode");
   /*
  
  navigator.clipboard.writeText(copySVGcode.innerText);
  */


  var SVGcodeWindow = window.open("", "MsgWindow", "width=600,height=600");
  SVGcodeWindow.document.write(" ");
  SVGcodeWindow.document.write(copySVGcode.innerHTML);

}



function loadSVGCode(Objs){
  document.getElementById("test").innerText="";
  for(let i=0;i<Objs.length;i++){
    let P = Objs[i];
    let fig = P.figure;
    document.getElementById("test").innerHTML+='<br>';
    if(fig=="Point"||fig=="Line"||fig=="Circle"){
      document.getElementById("test").innerText+= P.SVGcode();
    }
    else{
      document.getElementById("test").innerText+= SVGcode(Objs[i]);
    }

  }

  /*
  document.getElementById("test").innerText="";
  document.getElementById("test").style="font-size:6;font-family:Courier New;"
  let t1 = document.createElement( "p" );
  t1.innerText="<svg>";
  document.getElementById("test").appendChild(t1);


  for(let i=0;i<Objs.length;i++)
  {
    let P = Objs[i];
    let fig = P.figure;
    let itxtnd=" ";

    if(fig=="Point"||fig=="Line"||fig=="Circle"){
      itxtnd = P.SVGcode();
    }
    else{
      itxtnd= SVGcode(Objs[i]);
    }
    let txtnd = document.createElement( "p" );
    txtnd.innerText=itxtnd;
    document.getElementById("test").appendChild(txtnd);

  }

  let tl = txtnd = document.createElement( "p" );
  tl.innerText="</svg>";
  document.getElementById("test").appendChild(tl);

  */


}

function loadTikZCode(Objs){
  document.getElementById("tikZcode").innerText="";
  let t1 = document.getElementById("tikZcode");
  t1.innerText+="\\begin{center}";
  t1.innerHTML+='<br>';
  t1.innerText+="\\begin{tikzpicture}[scale=1] ";
  t1.innerHTML+='<br>';
  



  for(let i=0;i<Objs.length;i++)
  {
    document.getElementById("tikZcode").innerHTML+='<br>';
    let P = Objs[i];
    let fig = P.figure;
    if(fig=="Point" || fig=="Line" || fig=="Circle"|| fig=="Angle" )
    {
      document.getElementById("tikZcode").innerText+=P.tikZObjectCode();
      if(fig=="Point"){document.getElementById("tikZcode").innerText+=P.tikZLabelCode();}
    }

    else
    {
      document.getElementById("tikZcode").innerText+= tikZcode(Objs[i]);
    }

  }

  t1.innerHTML+='<br>';
  t1.innerHTML+='<br>';
  t1.innerText+="\\end{tikzpicture}";
  t1.innerHTML+="<br>";
  t1.innerText+="\\end{center}";




/*

  document.getElementById("tikZcode").innerText="";

  let t1 = document.createElement( "p" );
  t1.innerText="\\begin{center}";
  document.getElementById("tikZcode").appendChild(t1);

  let t2 = document.createElement( "p" );
  t2.innerText="\\begin{tikzpicture}[scale=1] ";
  document.getElementById("tikZcode").appendChild(t2);


  for(let i=0;i<Objs.length;i++)
  {
    let P = Objs[i];
    let fig = P.figure;

    txt = document.createElement( "p" );
    txt.innerText= P.tikZObjectCode();
    document.getElementById("tikZcode").appendChild(txt);
    
    if(fig=="Point")
      { 
        let labtxt = document.createElement( "p" );
        labtxt.innerText= P.tikZLabelCode();
        document.getElementById("tikZcode").appendChild(labtxt);
      }
  }

  let t3 = document.createElement( "p" );
  t3.innerText="\\end{tikzpicture}";
  document.getElementById("tikZcode").appendChild(t3);

  let t4 = document.createElement( "p" );
  t4.innerText="\\end{center}";
  document.getElementById("tikZcode").appendChild(t4);

 */ 
}



function loadCheckBoxes(Objs){
  Checkboxes.splice(0,Checkboxes.length);

  for(let i=0;i<Objs.lengh;i++){
    Checkboxes.push(Objs[i].checkBox);
  }
}



function loadTable(Objs){
theTable.innerHTML="";

  for(let i=0;i<Objs.length;i++){
    let P = Objs[i];
    let fig = P.figure;
    if(fig=="Point"||fig=="Angle"||fig=="Line"||fig=="MidText"||fig=="Circle"){

      theTable.appendChild( P.infoRow() );
    }
    else{
      theTable.appendChild( infoRow( Objs[i] ) );
    }

  }

}


function loadLabel(Objs){
  labels= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  for(let i=0;i<Objs.length;i++){
    labels.splice( labels.indexOf(Objs[i].id),1 );
  }
}


function SVGcode(Obj){
  var scode;
  if(Obj.figure=="Point"){
    scode = ' <circle '
    +' style="fill:'+Obj.fill
    +'; stroke:'+ Obj.stroke
    +'" id="'+Obj.id
    +'" cx = "'+ Obj.cx.toFixed(1)
    +'" cy =" '+Obj.cy.toFixed(1)
    +'" r = " '+ Obj.r.toFixed(1)
    +' " /> ';

    let fillcode='';
    if(Obj.label==false){fillcode='Gray'; }
    if(Obj.label==true){fillcode='Black'; }

    scode+=' <text '
    +' style="font-size:18;font-family:Arial;'
    +'fill:'+ fillcode
    +';" x = "' +Obj.cx.toFixed(1)
    +'" y =" '+Obj.cy.toFixed(1)
    +'" dx = "' +Obj.dx.toFixed(1)
    +'" dy =" '+Obj.dy.toFixed(1)
    +'" >'+Obj.id+' </text>';
  }

  if(Obj.figure=="MidText"){
    let A= Obj.P1;
    let B=Obj.P2;
    let l = Obj.location;
    let P = weightedPoint(A,B,Number(l),1-Number(l));

    scode=' <text '
    +' style="font-size:18;font-family:Arial;'
    +'fill:'+ 'Black'
    +';" x = "' +Number(P.cx)
    +'" y =" '+Number(P.cy)
    +'" dx = "' +Number(Obj.dx).toFixed(1)
    +'" dy =" '+Number(Obj.dy).toFixed(1)
    +'" >'+Obj.id+' </text>';
  }


  if(Obj.figure=="Angle"){
    /*
    <clipPath id="tri1">
      <polygon points="  267.0,78.0 267.0,78.0  45.0,340.0  490.0,374.0 " />
   </clipPath>
    */
    let poly_shape=Obj.points[0].cx.toFixed(1)+',' +Obj.points[0].cy.toFixed(1);

    for(let i=0;i<Obj.points.length;i++)
     {
     poly_shape += ' '+ Obj.points[i].cx.toFixed(1)+',' +Obj.points[i].cy.toFixed(1);
     }
     scode = ' <clipPath id='+Obj.id+' > <polygon  points=" '+ poly_shape + ' " /> </clipPath>';

     /*
     <circle style="fill:blue; fill-opacity:0.2; stroke:red;stroke-width:3;" cx = "267.0" cy =" 78.0" r = " 20 " clip-path="url(#tri1)" />
     */
     scode+= ' <circle style="fill:'+Obj.fill+'; stroke:'+Obj.stroke
     +';stroke-width:3;" cx ='+Obj.points[1].cx
     +' cy ='+Obj.points[1].cy
     +' r = '+Number( Number(Obj.scale)*15)+' clip-path="url(#'+Obj.id+' )" /> ';

  }

  if(Obj.figure=="Circle"){
    scode = ' <circle '
    +' style="fill:'+Obj.fill
    +'; stroke:'+ Obj.stroke
    +'" id="'+Obj.id
    +'" cx = "'+ Obj.cx.toFixed(1)
    +'" cy =" '+Obj.cy.toFixed(1)
    +'" r = " '+ Obj.r.toFixed(1)
    +' " /> ';
  }

  if(Obj.figure=="Line"){
    scode = ' <line '
    +' style="stroke :'+Obj.stroke
    +';stroke-width:'+Obj.size+';stroke-linecap:round;" '
    +'" x1="'+Obj.x1.toFixed(1)
    +'" x2="'+Obj.x2.toFixed(1)
    +'" y1="' +Obj.y1.toFixed(1)
    +'" y2="'+Obj.y2.toFixed(1)
    +' "/> ';
  }

  if(Obj.figure=="Triangle"||Obj.figure=="Quad"||Obj.figure=="Polygon"||Obj.figure=="Sign"){

    let poly_shape=Obj.points[0].cx.toFixed(1)+',' +Obj.points[0].cy.toFixed(1);

    for(let i=0;i<Obj.points.length;i++)
     {
     poly_shape += ' '+ Obj.points[i].cx.toFixed(1)+',' +Obj.points[i].cy.toFixed(1);
     }

    scode = ' <polygon '
     +' style="stroke-linejoin:round;  fill :'+ Obj.fill
     +';stroke-width:'+Obj.size + '; stroke:'+Obj.stroke
     +';" points=" '+ poly_shape + ' " /> ';
   }


  return scode;
}

function tikZcode(Obj){
  var tcode;
  if(Obj.figure=="Point" || Obj.figure=="Intersection Point" ){
    let cT=toTikz(Obj.cx,Obj.cy);
    tcode = ' \\coordinate ('+Obj.id+') at '+cT+';' ;

    if(Obj.label==true){
      let locCode = '';

      if(Obj.dy==20){locCode += 'below';}
      if(Obj.dy==-5){locCode += 'above';}
      if(Obj.dx==10){locCode += ' right';}
      if(Obj.dx==-20){locCode += ' left';}

      if(locCode!=''){locCode = '['+locCode+']';}

      tcode += ' \\node'+locCode+' at ('+Obj.id+') { $'+Obj.id+'$ };';
    }



    if(Obj.fill=="black"){
    tcode +=  '\\filldraw['+Obj.fill+'] ('+Obj.id+') circle (1pt);';
    }

  }

if(Obj.figure=="Circle"){
  let rtkz=Number(Obj.r)/60;

    tcode = '\\draw ('+Obj.id+') circle ('+ rtkz.toFixed(2)+');';
  }

  if(Obj.figure=="Line"){
    tcode = ' \\draw ('+Obj.P1.id+')--('+Obj.P2.id+');';
  }


  if(Obj.figure=="Triangle"||Obj.figure=="Quad"||Obj.figure=="Polygon"){
     tcode='\\draw ';

    for(let i=0;i<Obj.points.length;i++)
     {
     tcode += ' ('+ Obj.points[i].id+')--';
     }

     tcode+='cycle;';
   }

   if(Obj.figure=="Angle"){

     /*
     \draw (C) coordinate (C) -- (B) coordinate (B) -- (A) coordinate (A) pic["$30^{\circ}$",draw,angle eccentricity=1.4] {angle=A--C--B};
     */
     let A = Obj.points[0];
     let B = Obj.points[1];
     let C = Obj.points[2];

     let rcode='';
     if(Obj.rightAngle){rcode ='right ';}

     let aIn_code='';

     if(Obj.text!=''){aIn_code='"$'+Obj.text+'$",';}

     let a_draw='';
     if(Obj.draw){a_draw = 'draw,'; }


     tcode= '\\path ('+A.id+') coordinate ('+A.id+') -- ('+B.id+ ') coordinate ('+B.id+') -- ('+C.id+') coordinate ('+C.id+') pic['+aIn_code+a_draw+'angle eccentricity='+Obj.eccentricity+',scale='+Obj.scale+ '] {'+rcode+'angle='+A.id+'--'+B.id+'--'+C.id+'};';
   }

   if(Obj.figure=="MidText"){
     /*
     \path(A)--(C) node[midway,above right]{$8$};
     */
     let A = Obj.P1;
     let B = Obj.P2;

     let t_loc = '';
     switch (Number(Obj.location)) {
       case 0: t_loc = "at start";
         break;
      case 0.125: t_loc = "very near start";
         break;
      case 0.25: t_loc = "near start";
        break;
      case 0.75: t_loc = "near end";
        break;
      case 0.875: t_loc = "very near end";
          break;
      case 1: t_loc = "at end";
            break;
      default:
       t_loc = "midway";
     }
     let t_dydx = '';

     if(Obj.dy==20){t_dydx += 'below';}
     if(Obj.dy==-5){t_dydx += 'above';}
     if(Obj.dx==10){t_dydx += ' right';}
     if(Obj.dx==-20){t_dydx += ' left';}
     if(t_dydx!=''){t_dydx = ','+t_dydx;}

     let slopedcode=''
     if(Obj.sloped=='true'){slopedcode = ',sloped';}


     tcode= '\\path ('+A.id+')--('+B.id+') node['+t_loc+t_dydx+slopedcode+']{$'+Obj.id +'$};';
     }

  return tcode;
}




function infoRow(Obj){
  var newRow = document.createElement("TR");
  let cell_check=newRow.insertCell(0);
   let cell_id = newRow.insertCell(1);
  let cell_property=newRow.insertCell(2);
  let cell_shape = newRow.insertCell(3);
  let cell_label=newRow.insertCell(4);
  let cell_coordinates=newRow.insertCell(5);


  cell_check.className="tableCheck tableItem2";
  cell_shape.className="tableShape tableItem2";
  cell_id.className="tableID";
  cell_label.className="tableLabel";
  cell_coordinates.className="tableCoordinates";

  let coor_text="";
  if(Obj.figure=="Point"||Obj.figure=="Circle"){
    coor_text = '('+Obj.cx.toFixed(0)+','+Obj.cy.toFixed(0)+')';
  }


  cell_check.appendChild(Obj.checkBox);
  cell_shape.innerText=Obj.figure;
  cell_id.innerHTML=Obj.id;
  cell_label.innerHTML='';
  cell_coordinates.innerText=coor_text;
  cell_property.innerHTML=Obj.property;

  if(Obj.figure=="Point"){
    cell_property.innerHTML = toTikz(Obj.cx,Obj.cy);
  }

  return newRow;
}



function addToChecked(i){
  CheckedObjects.push( allObjects[i] );
}

function removeFromChecked(i){
  CheckedObjects.splice( CheckedObjects.indexOf(allObjects[i]) ,1);
} 



function clickRemoveObject(){


 while (CheckedObjects.length>0){
  allObjects[CheckedObjects[0].index].checkBox.checked=false;
  Objects.splice( Objects.indexOf(CheckedObjects[0]),1  );
  CheckedObjects.splice( CheckedObjects.indexOf(CheckedObjects[0]),1  );

}

  reBuild(Objects);
  clearButtons();

/*
  removeFromChecked(CheckedObjects[0].index);
  */
}

function clearButtons()
{
  for(let i=0;i<allObjects.length;i++)
  {
    allObjects[i].checkBox.checked=false;
  }



  CheckedObjects=[];
  CheckedPoints=[];
  CheckedLines=[];
  CheckedCircles=[];

  showButtons(CheckedPoints,CheckedLines,CheckedCircles);

  clickEditBACK();

  Pselected=0;
  Cselected=0;
  Lselected=0;

}

function resetAll(){
  location.reload();
}

////// Functions of Geometric objects /////

function sideLength(A,B){
  return Number( Math.sqrt( ( Number(A.cx) - Number(B.cx) ) ** 2 + ( Number(A.cy) - Number(B.cy) ) ** 2 ) );
}

function sides(A,B,C){
  let a_val = Math.sqrt( ( Number(B.cx) - Number(C.cx) ) ** 2 + ( Number(B.cy) - Number(C.cy) ) ** 2 );
  let b_val = Math.sqrt( ( Number(A.cx) - Number(C.cx) ) ** 2 + ( Number(A.cy) - Number(C.cy) ) ** 2 );
  let c_val = Math.sqrt( ( Number(A.cx) - Number(B.cx) ) ** 2 + ( Number(A.cy) - Number(B.cy) ) ** 2 );

  return {a:a_val, b:b_val, c:c_val};
}

function triangleArea(A,B,C){
  let TriangleSides = sides(A,B,C);
  let s = (Number(TriangleSides.a)+Number(TriangleSides.b)+Number(TriangleSides.c))/2;
  let area = Math.sqrt( Number(s-TriangleSides.a)*Number(s-TriangleSides.b)*Number(s-TriangleSides.c)*Number(s) );

  return area;
}

// P on AB where AP:PB is x:y

function weightedPoint(A,B,x,y){
  let Px= (Number(A.cx)*Number(y) + Number(B.cx)*Number(x))/Number(x+y);
  let Py= (Number(A.cy)*Number(y) + Number(B.cy)*Number(x))/Number(x+y);
  return {cx:Px, cy:Py};
}

function PinABCwithSides(A,B,C,BD,AE){
  let triangleSides = sides(A,B,C);
  let x1= Number(BD);
  let y1= Number(AE);

  let P_x = Number( Number(x1)*Number(y1)*Number(C.cx) + Number(x1)*Number(triangleSides.b-y1)*Number(A.cx) + Number(y1)*Number(triangleSides.a-x1)*Number(B.cx) ) / Number( Number(triangleSides.b)*Number(x1) +Number(y1)*Number(triangleSides.a-x1) );

  let P_y = Number( Number(x1)*Number(y1)*Number(C.cy) + Number(x1)*Number(triangleSides.b-y1)*Number(A.cy) + Number(y1)*Number(triangleSides.a-x1)*Number(B.cy) ) / Number( Number(triangleSides.b)*Number(x1) +Number(y1)*Number(triangleSides.a-x1) );

  return {cx:P_x,cy:P_y};
}

function OrthoCentre(A,B,C){
  let triangleSides= sides(A,B,C);
  let S = Number( triangleArea(A,B,C) ) ;
  let h = Number(2*S/triangleSides.c);
  let x = Math.sign( Number(triangleSides.b)**2 + Number(triangleSides.c)**2 - Number(triangleSides.a)**2     )*Math.sqrt(triangleSides.b**2 - h**2 );
  let y = Math.sign( Number(triangleSides.a)**2 + Number(triangleSides.c)**2 - Number(triangleSides.b)**2     )*Math.sqrt(triangleSides.a**2 - h**2 );

  let AE = Number(triangleSides.c)*Number(x)/Number(triangleSides.b);
  let BD = Number(triangleSides.c)*Number(y)/Number(triangleSides.a);

  return PinABCwithSides(A,B,C,BD,AE);
}

function CircumCircle(A,B,C){
  let D = weightedPoint(B,C,1,1);
  let E = weightedPoint(A,C,1,1);
  let F = weightedPoint(A,B,1,1);

  let O_val= OrthoCentre(D,E,F);
  let R_val =  Number( Math.sqrt( (A.cx - O_val.cx)**2 + (A.cy-O_val.cy)**2 ) );

  return {O: O_val, R: R_val};
}


//perpendicular from C to AB

function Perpendicular(C,A,B){
  let triangleSides= sides(A,B,C);
  let S = Number( triangleArea(A,B,C) ) ;
  let h = Number(2*S/triangleSides.c);
  let x =Math.sign( Number(triangleSides.b)**2 + Number(triangleSides.c)**2 - Number(triangleSides.a)**2     )*Math.sqrt(triangleSides.b**2 - h**2 );
  let y = Math.sign( Number(triangleSides.a)**2 + Number(triangleSides.c)**2 - Number(triangleSides.b)**2     )*Math.sqrt(triangleSides.a**2 - h**2 );

  return weightedPoint(A,B,x,y);
}

function weightedAngle(A,B,C,m,n)
{
let TS = sides(A,B,C);
let Area = triangleArea(A,B,C);
let angC = Math.asin( Number( 2*Number(Area)/Number(TS.a * TS.b ) ) );
let alpha = Number(m)*Number(angC)/( Number(m)+Number(n));
let beta = Number(n)*Number(angC)/( Number(m)+Number(n));

let x = Number(TS.b)*Number(TS.c)*Math.sin(alpha);
let y = Number(TS.a)*Number(TS.c)*Math.sin(beta);

return weightedPoint(A,B,x,y);

}



function intersectionPoint(A,B,C,D)
{
  let sABC = triangleArea(A,B,C);
  let sABD = triangleArea(A,B,D);
  let sACD = triangleArea(A,C,D);
  let sBCD = triangleArea(B,C,D);

  let X_AB = weightedPoint(A,B,sACD,sBCD);
  let Y_AB = weightedPoint(A,B,1,0);

  if( sACD > sBCD )
  {
    Y_AB = weightedPoint(A,B,sACD,-sBCD);
  }

  else if(sACD < sBCD)
  {
    Y_AB = weightedPoint(A,B,-sACD,sBCD);
  }

  let X_CD = weightedPoint(C,D,sABC,sABD);
  let Y_CD = weightedPoint(C,D,1,0);

  if( sABC > sABD )
  {
    Y_CD = weightedPoint(C,D,sABC,-sABD);
  }
  else if(sABC < sABD)
  {
    Y_CD = weightedPoint(C,D,-sABC,sABD);
  }

  let intPoint={cx:-1,cy:-1};
  let d1 = sideLength(X_AB,X_CD);
  let d2 = sideLength(X_AB,Y_CD);
  let d3 = sideLength(Y_AB,X_CD);
  let d4 = sideLength(Y_AB,Y_CD);

  if( d1 < 0.1 )
  {intPoint = X_AB;}

  else if (d2<0.1)
  {intPoint = X_AB;}

  else
  {intPoint = Y_AB;}

return intPoint;
}

function InnerCircle(A,B,C){

triangleSides= sides(A,B,C);

let s = (Number(triangleSides.a)+Number(triangleSides.b)+Number(triangleSides.c))/2;

let D_val = weightedPoint(B,C, s - triangleSides.b, s - triangleSides.c );
let E_val = weightedPoint(A,C, s - triangleSides.a, s - triangleSides.c );
let F_val = weightedPoint(A,B, s - triangleSides.a, s - triangleSides.b );

let CC = CircumCircle(D_val,E_val,F_val);

return {I:CC.O,r:CC.R, D:D_val, E:E_val, F:F_val};

}


function showPoints(Pn,Cn,Ln){
  hideAllPoints();
  if(Cn==0&&Ln==0){
    switch (Pn)
    {
      case 0:
      break;

      case 1:
      document.getElementById("PButton").style.display="block";
      break;

      case 2:
      document.getElementById("PPButton").style.display="block";
      break;

      case 3:
      document.getElementById("PPPButton").style.display="block";
      break;

      case 4:
      document.getElementById("PPPPButton").style.display="block";
      break;

      default:
      document.getElementById("ManyPButton").style.display="block";
    }
  }
  else if (Ln==0&&Pn==0)
  { switch (Cn) {
    case 1:
      document.getElementById("CButton").style.display="block";
      break;

      default:
      break;
  }

  }

}

function hideAllPoints(){
  document.getElementById("PButton").style.display="none";
  document.getElementById("PPButton").style.display="none";
  document.getElementById("PPPButton").style.display="none";
  document.getElementById("PPPPButton").style.display="none";
  document.getElementById("ManyPButton").style.display="none";
  document.getElementById("CButton").style.display="none";
}
