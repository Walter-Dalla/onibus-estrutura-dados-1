function parseRoute(routes)
{
    for(var routeIndex in routes)
    {
        for(var pointIndex in routes[routeIndex].RoutePoints)
        {
            routes[routeIndex].RoutePoints[pointIndex].x = Math.floor(routes[routeIndex].RoutePoints[pointIndex].x)
            routes[routeIndex].RoutePoints[pointIndex].y = Math.floor(routes[routeIndex].RoutePoints[pointIndex].y)
        }
    }

    return routes;
}


function parseBus(buses){
    for(var busIndex in buses)
    {
        const bus = buses[busIndex];
        const route = configs.routes.find(r => r.ID == bus.routeId);
        const routePoints = route.RoutePoints;
        
        RestartRoute(bus, routePoints)
    }
}