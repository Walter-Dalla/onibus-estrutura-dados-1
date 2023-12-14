const configs = { // 0 = onibus; 1 = cadastrar rota
    mode: 0,
    busSizeX: 25,
    busSizeY: 25,
    busImage: null,
    map: null,
    routesJsonData: [],
    routes: [],
    points: [],
    inputValue: "1",
    debug: false,
    buses: [],
    person: {
        x: 700, 
        y:200,
        onBus: false,
        busId: 0,
        gpsOnControl: true 
    },
    enterBusButton: null
    
}
  
var busCleanObject = {
    id: 0,
    x: 0,
    y: 0,
    routeNextPoint:{
    x: 0,
    y: 0
    },
    routeIndex: 0,
    routeId: 1
}


function preload()
{
  configs.map = loadImage('map.png');
  configs.routesJsonData = loadJSON('route.json');
  configs.busImage = loadImage('bus.png');
}

function setup() {
  createCanvas(1437, 757);
  image(configs.map, 0, 0);
  
  configs.routes = parseRoute(configs.routesJsonData.data)

  parseBus(configs.buses)
  
  let inp = createInput(configs.inputValue, '');
  inp.position(100, 0);
  inp.size(100);
  inp.input(onInput);
  
  newBusButton = createButton('Criar novo onibus');
  newBusButton.position(0, 0);
  newBusButton.size(100);
  newBusButton.mousePressed(CreateNewBus);

  configs.enterBusButton = createButton('Entrar no onibus');
  configs.enterBusButton.position(0, 40);
  configs.enterBusButton.size(100);
  configs.enterBusButton.mousePressed(registerPassenger);
}

function onInput(){
    if(this.value() == '' || this.value() == undefined || this.value() == ' ')
        return;

    configs.inputValue = this.value()
}

function CreateNewBus()
{  
  const bus = JSON.parse(JSON.stringify(busCleanObject)); // clone object
  bus.routeId = configs.inputValue;
  const route = configs.routes.find(r => r.ID == bus.routeId);
  if(route){
    const routePoints = route.RoutePoints;
    RestartRoute(bus, routePoints)

    bus.id = configs.buses.length -1;

    configs.buses.push(bus)
  } 
}


function keyPressed() {
    personWalk(keyCode);
}


function mousePressed(){
    if(configs.mode == 1){
        registerRoute()
    }
    else if(configs.debug)
    {
        registerPassenger(mouseX, mouseY)
    }
}

function draw() {
  
  if(configs.mode != 0)
  {
    return;
  }
  
  image(configs.map, 0, 0);
  
  drawBus();
  drawPerson();
}