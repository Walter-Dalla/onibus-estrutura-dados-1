function MarkRoute()
{
  const route = configs.routes.find(r => r.ID == configs.inputValue);

  for(var pointIndex in route.RoutePoints)
  {
    const routePoint = route.RoutePoints[pointIndex];
    if(configs.debug)
    {
        text(pointIndex, routePoint.x, routePoint.y)
    }
    
    if(pointIndex == 0)
    {
      continue;  
    }
    
    const lastRoutePoint = route.RoutePoints[pointIndex-1];
    stroke(0,0,0);
    const lastPoint = configs.points[configs.points.length-1];
    line(routePoint.x, routePoint.y, lastRoutePoint.x, lastRoutePoint.y);
  }
}