let ObjectCounter=0;

var allObjects=[];
var Objects=[];
var Checkboxes=[];
var CheckedObjects=[];

let labels= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var theTable = document.getElementById("tableInfo");



class point{
  constructor(index,id,cx,cy,r,fill,stroke,property,opacity,dx,dy){
    this.index = index;
    this.id = id;
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.fill = fill;
    this.stroke=stroke;
    this.property=property;
    this.opacity = opacity;
    this.dx=dx;
    this.dy=dy;

    var newChbox = document.createElement("INPUT");
    newChbox.setAttribute("type", "checkbox");

    let chkCode= ' if( this.checked==true){ addToChecked('
                +this.index
                +')  }  if( this.checked==false){removeFromChecked('
                +this.index+')}';

    newChbox.setAttribute("onchange",chkCode);

    this.chkbox = newChbox;
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

    return P;
  }

  infoRow(){
    var newRow = document.createElement("TR");
    let cell_check=newRow.insertCell(0);
    let cell_shape = newRow.insertCell(1);
    let cell_id = newRow.insertCell(2);
    let cell_label=newRow.insertCell(3);
    let cell_coordinates=newRow.insertCell(4);
    let cell_property=newRow.insertCell(5);

    cell_check.className="tableCheck";
    cell_shape.className="tableShape";
    cell_id.className="tableID";
    cell_label.className="tableLabel";
    cell_coordinates.className="tableCoordinates";
 
    cell_property.className="tableProperty";

    coor_text = '('+this.cx.toFixed(0)+','+this.cy.toFixed(0)+')';

    cell_check.appendChild(this.checkBox);
    cell_shape.innerText=this.figure;
    cell_id.innerHTML=this.id;
    cell_label.innerHTML=this.id;
    cell_coordinates.innerText=coor_text;
    cell_property.innerHTML=this.property;

    return newRow;
  }

}

/* newPoint */
function newPoint(p_index,p_id,p_cx,p_cy,p_r,p_fill,p_stroke,p_property,p_dx,p_dy){
  var newChbox = document.createElement("INPUT");
  newChbox.setAttribute("type", "checkbox");

  let chkCode= ' if( this.checked==true){ addToChecked('
              +p_index
              +')  }  if( this.checked==false){removeFromChecked('
              +p_index+')}';

  newChbox.setAttribute("onchange",
  chkCode);

  let prop = toTikz(p_cx,p_cy);

  var NP ={objectIndex:p_index,checkBox:newChbox,figure:"Point",id:p_id, cx:p_cx, cy:p_cy, r:p_r, fill:p_fill,stroke:p_stroke, property:prop,dx:p_dx,dy:p_dy};

  return NP;
}

function toTikz(x,y)
{
  let Tx = Number(x/60)-1;
  let Ty = 9-Number(y/60);
  if(Number.isInteger(Tx)==false){ Tx=Tx.toFixed(2); }
  
  if(Number.isInteger(Ty)==false){Ty=Ty.toFixed(2)};
  
  let PTikZ = '(' +Tx +','+Ty +')';
  return PTikZ;
}


/* newLine */
function newLine(Point1,Point2,obj_index,l_stroke,l_size){
  var newChbox = document.createElement("INPUT");
  newChbox.setAttribute("type", "checkbox");

  let chkCode= ' if( this.checked==true){ addToChecked('
              +obj_index
              +')  }  if( this.checked==false){removeFromChecked('
              +obj_index+')}';

  newChbox.setAttribute("onchange", chkCode);

  let l_id= Point1.id+Point2.id;

  var NL ={objectIndex:obj_index,checkBox:newChbox,figure:"Line",id:l_id, P1:Point1,P2:Point2, x1:Number(Point1.cx), y1:Number(Point1.cy), x2:Number(Point2.cx), y2:Number(Point2.cy), stroke:l_stroke, property:"",size:l_size};

  return NL;
}

function newPolygon(Pts,obj_index,p_stroke,p_fill,p_prop,p_width){
  var newChbox = document.createElement("INPUT");
  newChbox.setAttribute("type", "checkbox");

  let chkCode= ' if( this.checked==true){ addToChecked('
              +obj_index
              +')  }  if( this.checked==false){removeFromChecked('
              +obj_index+')}';
  newChbox.setAttribute("onchange", chkCode);

  let p_id="";
  let p_figure="Polygon";

  if(Pts.length==3){
    p_id = Pts[0].id+Pts[1].id+Pts[2].id;
    p_figure="Triangle";
  }
  if(Pts.length==4){
    p_id = Pts[0].id+Pts[1].id+Pts[2].id+Pts[3].id;
    p_figure="Quad";
  }
  if(Pts.length>4){
  p_id = Pts[0].id+'...'+Pts[Pts.length-1].id;
  }

  var NP ={objectIndex:obj_index,checkBox:newChbox,figure:p_figure,id:p_id,points:Pts , stroke:p_stroke, fill:p_fill, property:p_prop,size:p_width};

  return NP;
}


function newPerpSign(C,A,B,obj_index,s_stroke,s_size){

}


document.getElementById("drawingFrame").ondblclick = function(event) {CreatePoint(event)};

function CreatePoint(e)
{
  let Px=e.clientX-10;
  let Py=e.clientY-10;

  let P=newPoint(ObjectCounter,labels[0],e.clientX-10,e.clientY-10,3,"none","Gray","",-6,-6);

  ObjectCounter++;



  allObjects.push(P);
  Objects.push(P);

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);
  loadCheckBoxes(Objects);

  loadLabel(Objects);

  clearButtons();
}

function clickLine(){
  let A = CheckedObjects[0];
  let B = CheckedObjects[1];

  let L = newLine(A,B,ObjectCounter,"MidnightBlue",2);

  ObjectCounter++;

  allObjects.push(L);
  Objects.push(L);

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);

  clearButtons();
}



function clickMidPoint(){
  let A = CheckedObjects[0];
  let B= CheckedObjects[1];
  let midPoint = weightedPoint(A,B,1,1);

  let p_prop = "MidPoint:"+A.id+B.id;

  let P=newPoint(ObjectCounter,'P<sub>'+ObjectCounter+'</sub>',midPoint.cx ,midPoint.cy ,3,"None","Gray",p_prop);

  ObjectCounter++;

  allObjects.push(P);
  Objects.push(P);

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);
  loadCheckBoxes(Objects);

  clearButtons();
}


function clickDrawPolygon(){
  let Pol=newPolygon(CheckedObjects,ObjectCounter,"MidnightBlue","none","",2);

  ObjectCounter++;

  allObjects.push(Pol);
  Objects.push(Pol);

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);

  clearButtons();
}

function clickDrawCircumCirle(){

  let A = CheckedObjects[0];
  let B = CheckedObjects[1];
  let C = CheckedObjects[2];

  let CCirc = CircumCircle(A,B,C);

  let cx = CCirc.O.cx
  let cy = CCirc.O.cy;
  let cR = CCirc.R;

   let c_id=A.id+B.id+C.id;

  let o_prop = "&#8858; <sub>"+A.id+B.id+C.id+"</sub>";
  let c_prop = "R:"+cR.toFixed(0);

  let NO = newPoint(ObjectCounter,labels[0],cx,cy,2,"Maroon","none",o_prop,-5,-5);

  ObjectCounter++;

  allObjects.push(NO);
  Objects.push(NO);

  let NC = newPoint(ObjectCounter,c_id,cx,cy,cR,"none","Gray",c_prop,0,0);
  ObjectCounter++;
  NC.figure="Circle";

  allObjects.push(NC);
  Objects.push(NC);

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);

  loadLabel(Objects);

  clearButtons();
}



function clickEdit(){
  document.getElementById("idInput").value=CheckedObjects[0].id;
  document.getElementById("idInput").disabled=false;


  document.getElementById("cxInput").value=CheckedObjects[0].cx;
  document.getElementById("cxInput").disabled=false;


  document.getElementById("cyInput").value=CheckedObjects[0].cy;
  document.getElementById("cyInput").disabled=false;

  document.getElementById("rInput").value=CheckedObjects[0].r;
  document.getElementById("rInput").disabled=false;

  document.getElementById("dxInput").value=CheckedObjects[0].dx;
  document.getElementById("dxInput").disabled=false;

  document.getElementById("dyInput").value=CheckedObjects[0].dy;
  document.getElementById("dyInput").disabled=false;

  document.getElementById("strokeInput").value=CheckedObjects[0].stroke;
  document.getElementById("strokeInput").disabled=false;

  document.getElementById("fillInput").value=CheckedObjects[0].fill;
  document.getElementById("fillInput").disabled=false;


}

function clickEditOK(){
  CheckedObjects[0].id = document.getElementById("idInput").value;
  CheckedObjects[0].cx = Number(document.getElementById("cxInput").value);
  CheckedObjects[0].cy = Number(document.getElementById("cyInput").value);
  CheckedObjects[0].r = Number(document.getElementById("rInput").value);
  CheckedObjects[0].dx = Number(document.getElementById("dxInput").value);
  CheckedObjects[0].dy = Number(document.getElementById("dyInput").value);
  CheckedObjects[0].stroke = document.getElementById("strokeInput").value;
  CheckedObjects[0].fill = document.getElementById("fillInput").value;



  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);

  loadLabel(Objects);

  clearButtons();
}

function clickEditBACK(){
  document.getElementById("idInput").value="";
  document.getElementById("idInput").disabled=true;

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

}


function clickPerp(){
  var A;
  var B;
  var C;
  if(CheckedObjects[0].figure=="Point" && CheckedObjects[1].figure=="Line"){
    C = CheckedObjects[0];
    A = CheckedObjects[1].P1;
    B = CheckedObjects[1].P2;
  }

  if(CheckedObjects[1].figure=="Point" && CheckedObjects[0].figure=="Line"){
    C = CheckedObjects[1];
    A = CheckedObjects[0].P1;
    B = CheckedObjects[0].P2;
  }

  let PP = Perpendicular(C,A,B);

  let p_prop = C.id+'&perp;'+A.id+B.id;

  let NP = newPoint(ObjectCounter,labels[0],Number(PP.cx),Number(PP.cy),2,"MidnightBlue","none",p_prop,-5,-5);

  ObjectCounter++;

  allObjects.push(NP);
  Objects.push(NP);

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);
  loadLabel(Objects);
  clearButtons();
}

function clickPerpSign(){
  let A;
  let B;
  let C;

  let Tsides=sides(CheckedObjects[0],CheckedObjects[1],CheckedObjects[2]);
  if( Tsides.a >Tsides.b && Tsides.a >Tsides.c   ){
    C = CheckedObjects[0];
    A = CheckedObjects[1];
    B = CheckedObjects[2];
  }

  if( Tsides.b >Tsides.a && Tsides.b >Tsides.c   ){
    C = CheckedObjects[1];
    A = CheckedObjects[0];
    B = CheckedObjects[2];
  }

  if( Tsides.c >Tsides.a && Tsides.c >Tsides.b   ){
    C = CheckedObjects[2];
    A = CheckedObjects[0];
    B = CheckedObjects[1];
  }

  let D = weightedPoint(C,B,12,Number(sideLength(B,C) )-12 );
  let E = weightedPoint(C,A,12,Number( sideLength(A,C) )-12 );

  let Fx= Number(D.cx) + Number(E.cx)-Number(C.cx);
  let Fy= Number(D.cy) + Number(E.cy)-Number(C.cy);

  let F = {cx:Fx,cy:Fy};

  let p_prop= "&perp;";

  let PD=newPoint(-1,"",D.cx,D.cy,0,"none","none","",0,0);
  let PE=newPoint(-1,"",E.cx,E.cy,0,"none","none","",0,0);
  let PF=newPoint(-1,"",F.cx,F.cy,0,"none","none","",0,0);
  let pts=[C,PD,PF,PE];

  let NPsign = newPolygon(pts,ObjectCounter,"MidnightBlue","none",p_prop,2);

  NPsign.figure="Sign";
  NPsign.id = A.id+C.id+B.id;

  ObjectCounter++;

  allObjects.push(NPsign);
  Objects.push(NPsign);

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);
  loadLabel(Objects);
  clearButtons();

}




function clickIntersection(){
  if(CheckedObjects.length==2 && CheckedObjects[0].figure=="Line" && CheckedObjects[1].figure=="Line"){

    let A = CheckedObjects[0].P1;
    let B = CheckedObjects[0].P2;
    let C = CheckedObjects[1].P1;
    let D = CheckedObjects[1].P2;

    let intsP= intersectionPoint(A,B,C,D);
    let p_prop = A.id+B.id+"&cap;"+C.id+D.id;

    let P=newPoint(ObjectCounter,labels[0],intsP.cx,intsP.cy,2,"black","none",p_prop,-6,-6);

    ObjectCounter++;

    allObjects.push(P);
    Objects.push(P);

    loadSVGDrawing(Objects);
    loadTable(Objects);
    loadSVGCode(Objects);
    loadCheckBoxes(Objects);

    loadLabel(Objects);

  }
    clearButtons();
}


function loadSVGDrawing(Objs){

  // drawing the coordinate lines:

  document.getElementById("drawingFrame").innerHTML="";

  let patrn = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
  patrn.setAttribute("id","coorsystem");
  patrn.setAttribute("viewBox","0,0,10,10");
  patrn.setAttribute("width","10%");
  patrn.setAttribute("height","10%");

  let rct = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rct.setAttribute("width","10");
  rct.setAttribute("height","10");
  rct.setAttribute("style","fill:none;stroke:#85BBB6;stroke-width:0.1");

  patrn.appendChild(rct);

  let coorect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  coorect.setAttribute("width","600");
  coorect.setAttribute("height","600");
  coorect.setAttribute("style","fill:url(#coorsystem);");

  document.getElementById("drawingFrame").appendChild(patrn);
  document.getElementById("drawingFrame").appendChild(coorect);

  //drawing everything else:

  for(let i=0;i<Objs.length;i++){
    document.getElementById("drawingFrame").innerHTML+=SVGcode(Objs[i]);
  }

}



function loadSVGCode(Objs){
  document.getElementById("test").innerText="";
  for(let i=0;i<Objs.length;i++){
    document.getElementById("test").innerHTML+='<br>';
    document.getElementById("test").innerText+= SVGcode(Objs[i]);
  }
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
    theTable.appendChild( infoRow( Objs[i] ) );
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

    scode+=' <text '
    +' style="font-size:18;font-family:Arial;'
    +'fill:'+ 'Gray'
    +';" x = "' +Obj.cx.toFixed(1)
    +'" y =" '+Obj.cy.toFixed(1)
    +'" dx = "' +Obj.dx.toFixed(1)
    +'" dy =" '+Obj.dy.toFixed(1)
    +'" >'+Obj.id+' </text>';
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

    for(i=0;i<Obj.points.length;i++)
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




function infoRow(Obj){
  var newRow = document.createElement("TR");
  let cell_check=newRow.insertCell(0);
  let cell_shape = newRow.insertCell(1);
  let cell_id = newRow.insertCell(2);
  let cell_label=newRow.insertCell(3);
  let cell_coordinates=newRow.insertCell(4);
  let cell_property=newRow.insertCell(5);

  cell_check.className="tableCheck tableItem2";
  cell_shape.className="tableShape tableItem2";
  cell_id.className="tableID";
  cell_label.className="tableLabel";
  cell_coordinates.className="tableCoordinates";

  let coor_text="";
  if(Obj.figure=="Point"){
    coor_text = '('+Obj.cx.toFixed(0)+','+Obj.cy.toFixed(0)+')';
  }


  cell_check.appendChild(Obj.checkBox);
  cell_shape.innerText=Obj.figure;
  cell_id.innerHTML=Obj.id;
  cell_label.innerHTML=Obj.id;
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
  CheckedObjects.splice(allObjects[i],1);
}


function clickRemoveObject(){

  allObjects[CheckedObjects[0].objectIndex].checkBox.checked=false;
  Objects.splice( Objects.indexOf(CheckedObjects[0]),1  );

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);

  document.getElementById("test").innerHTML=CheckedObjects.length + "," + CheckedObjects[0].id + ','+CheckedObjects[0].objectIndex;

  removeFromChecked(CheckedObjects[0].objectIndex);
}

function clearButtons(){
  for(let i=0;i<allObjects.length;i++){
    allObjects[i].checkBox.checked=false;
  }

  CheckedObjects=[];
  clickEditBACK();

}

function resetAll(){
  clearButtons();

  ObjectCounter=0;

  allObjects=[];
  Objects=[];
  labels= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  loadSVGDrawing(Objects);
  loadTable(Objects);
  loadSVGCode(Objects);
  loadCheckBoxes(Objects);

  loadLabel(Objects);
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