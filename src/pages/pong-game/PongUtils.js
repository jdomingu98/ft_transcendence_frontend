function gradeToRadians(angle)
{
    return angle * (Math.PI / 180);
}

function paddleBouncedBall(ball, paddle, sign)
{
    const dy = ball.y - paddle.getCenterPaddle().y;
    let angle = (ball.maxAngle * dy) / (paddle.height / 2);
    angle = gradeToRadians(angle);
    if(sign === -1)
        ball.velocity.x = -Math.abs(ball.speed * Math.cos(angle));
    else
        ball.velocity.x = Math.abs(ball.speed * Math.cos(angle));
    ball.velocity.y = ball.speed * Math.sin(angle);
    ball.increaseSpeed();
}

export function ballPaddleCollision(ball, paddle) {
    if (ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x - ball.radius > paddle.x &&
        ball.y + ball.radius > paddle.y &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.velocity.x < 0)
    {
        paddleBouncedBall(ball, paddle, 1);
    }

    if (ball.x + ball.radius > paddle.x &&
        ball.x + ball.radius < paddle.x + paddle.width &&
        ball.y + ball.radius > paddle.y &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.velocity.x > 0)
    {
        paddleBouncedBall(ball, paddle, -1);
    }
}

export function drawFieldLine(ctx, width, height) {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 10;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
}

export function timerDisplay(remainingTime){
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;
    const formattedTime = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    return formattedTime;
}