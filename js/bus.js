

function drawBus()
{
  for(var busIndex in configs.buses)
  {
    const bus = configs.buses[busIndex];
    const route = configs.routes.find(r => r.ID == bus.routeId);
    
    HandleBusMovement(bus, route)
    
    image(configs.busImage, bus.x, bus.y, configs.busSizeX, configs.busSizeY);    
  }
  MarkRoute()
}


function HandleBusMovement(bus, route)
{
  const routePoints = route.RoutePoints;
  const busOnPoint = SamePoint(bus, bus.routeNextPoint)
  if(busOnPoint)
  {
    GoToNextPoint(bus, routePoints)  
  }
  
  MoveBus(bus);
}

function SamePoint(point1, point2){
  return point1.x == point2.x && point1.y == point2.y;
}

function GoToNextPoint(bus, routePoints)
{
  const busOnEndRoute = bus.routeIndex == Object.keys(routePoints).length;
  if(busOnEndRoute){
    return RestartRoute(bus, routePoints)
  }
  
  let {x:posX, y: posY} = routePoints[bus.routeIndex];
    
  bus.routeNextPoint.x = posX;
  bus.routeNextPoint.y = posY;

  bus.routeIndex++;
}

function MoveBus(bus){  
  if(bus.x != bus.routeNextPoint.x){
    if(bus.x < bus.routeNextPoint.x){
      bus.x++;
    }
    else
    {
      bus.x--;
    }    
  }
  
  if(bus.y != bus.routeNextPoint.y){
    if(bus.y < bus.routeNextPoint.y){
      bus.y++;
    }
    else
    {
      bus.y--;
    }    
  }

  if(bus.id == configs.person.busId && configs.person.onBus)
  {
    configs.person.x = bus.x;
    configs.person.y = bus.y;
  }
}

function registerPassenger()
{ 
    if(configs.person.onBus){
        exitBus()
    }
    else
    {
        enterOnBus()
    }
}

function exitBus()
{
    configs.person.onBus = false;
    configs.person.busId = 0;
    configs.person.gpsOnControl = true;
    configs.enterBusButton.elt.textContent = "Entrar no onibus"
}

function enterOnBus()
{
    let x = configs.person.x;
    let y = configs.person.y;

  const route = configs.routes.find(r => r.ID == configs.inputValue);
  let closerPointIndex = 0;
  let found = 0;
  
  for(pointIndex in route.RoutePoints)
  { 
    const point = route.RoutePoints[pointIndex];
    const lastPoint = route.RoutePoints[closerPointIndex];
    
    const distPersonFromPoint = dist(x, y, point.x, point.y)
    if(distPersonFromPoint > 50) continue;
    
    const distMouseFromLastPoint = dist(x, y, lastPoint.x, lastPoint.y)
    if(distPersonFromPoint > distMouseFromLastPoint){
        continue;
    }

    closerPointIndex = parseInt(pointIndex);
    found = true;
    }

    if(!found) return;

    var busesOnSameLine = configs.buses.filter(b => (b.routeId == configs.inputValue) && (b.routeIndex-1 <= closerPointIndex));

    if(!busesOnSameLine) return;

    var busGot = busesOnSameLine.reduce((acc, bus) => acc = acc.routeIndex > bus.routeIndex ? acc : bus, 0);

    if(!busGot) return;
    busGot.routeIndex = closerPointIndex+1;

    GoToNextPoint(busGot, route.RoutePoints);
    busGot.x = route.RoutePoints[closerPointIndex].x;
    busGot.y = route.RoutePoints[closerPointIndex].y
    
    configs.person.onBus = true;
    configs.person.busId = busGot.id;
    configs.person.gpsOnControl = false;
    configs.enterBusButton.elt.textContent = "Sair do onibus"
}
