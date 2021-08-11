// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 12;
let raio = diametro/2;

// padrões para raquetes
let widthRaquete = 8;
let heightRaquete = 60;

// variáveis da raquete player 1
let xRaquete1 = 5;
let yRaquete1 = 150;

// variáveis da raquete player 2
let xRaquete2 = 585;
let yRaquete2 = 155;
let yvelocidade2;
let chanceDeErrar = 0;

// velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variável biblioteca
let hit = false;

// pontuação
let placar1 = 0;
let placar2 = 0;

// variáveis sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();  
  mostraRaquete(xRaquete1,yRaquete1);
  movimentaRaquete1();
  // verificaColisaoRaquete1();
  //verificaColisaoRaquete1bibli(); 
  verificaColisaoRaquete(xRaquete1,yRaquete1);
  mostraRaquete(xRaquete2,yRaquete2);
  movimentaRaquete2();
  //verificaColisaoRaquete2bibli(); 
  verificaColisaoRaquete(xRaquete2,yRaquete2);
  mostraPlacar();
  marcaPonto();
}

// refatoração de funções

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
  
}

function mostraRaquete(x,y){
  rect (x,y,widthRaquete,heightRaquete)
}

// funções movimentar raquetes

 function movimentaRaquete1(){
   if(keyIsDown(UP_ARROW)){
    yRaquete1 -= 10;
    }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete1 += 10;
    }
}

function calculaChanceDeErrar() {
  if (placar2 >= placar1) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaquete2(){
  yvelocidade2 = yBolinha - yRaquete2 - heightRaquete / 2 - 30;
  yRaquete2 += yvelocidade2 + chanceDeErrar;
  calculaChanceDeErrar();
}

function verificaColisaoRaquete1(){
  if(xBolinha - raio < xRaquete1 + widthRaquete && yBolinha - raio < yRaquete1 + heightRaquete &&  yBolinha + raio > yRaquete1){
    velocidadeXBolinha *= -1;
  }
}

// função da biblioteca

function verificaColisaoRaquete(x,y){
  hit = collideRectCircle(x, y, widthRaquete, heightRaquete, xBolinha, yBolinha, raio);
  if (hit){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function mostraPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0));
  rect(150,10,40,25);
  fill(255);
  text(placar1, 170, 30);
  fill(color(255,140,0));
  rect(430,10,40,25);
  fill(255);
  text(placar2, 450, 30);
}

function marcaPonto(){
  if (xBolinha > 595){
    placar1 += 1;
    ponto.play();
  }
  if (xBolinha < 5){
    placar2 += 1;
    ponto.play();
  }
}