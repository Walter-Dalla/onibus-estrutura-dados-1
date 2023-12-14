function drawPerson()
{
    circle(configs.person.x, configs.person.y, 10);
}


function personWalk(key)
{
    if(configs.person.onBus)
    {
        exitBus();
        return;
    }
    
    let { x, y} = configs.person;
    
    if (key === UP_ARROW) {
        y = y - 10;
    } else if (key === DOWN_ARROW) {
        y = y + 10;
    }
    if (key === LEFT_ARROW) {
        x = x - 10;
    } else if (key === RIGHT_ARROW) {
        x = x + 10;
    }
    configs.person.x = x;
    configs.person.y = y;
    
}