
function registerRoute()
{
  fill(0,0,0);

  if(configs.points.length >= 1){
    stroke(0,0,0);
    const lastPoint = configs.points[configs.points.length-1];
    line(lastPoint.x, lastPoint.y, mouseX, mouseY);
  }
  
  configs.points.push({
    x:mouseX,
    y:mouseY
  })
  
  var sla = {
    "data":[
      {
        "ID": 1,
        "RoutePoints": configs.points
      }
    ]
  }
  console.log(sla)
}

function RestartRoute(bus, routePoints){
    const firstRoutePoint = routePoints[0];
    bus.x = firstRoutePoint.x
    bus.y = firstRoutePoint.y
      
    bus.routeNextPoint ={
      x: firstRoutePoint.x,
      y: firstRoutePoint.y 
    }
    
    bus.routeIndex = 0;
  }