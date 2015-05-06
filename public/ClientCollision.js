/**
 * ClientCollision
 * @param Playground
 * @param Ball
 * @returns {{collision: Function}}
 * @constructor
 */

function ClientCollision(Playground, Ball, Racket, User) {

    var attributes = {
        'ball': Ball,
        'playground': Playground,
        'racket': Racket,
        'user': User
    };

    return {
        reflect: function (v, n) {
            var d = this.dot(v, n);
            return {
                x: v.vx - 2 * d * n.vx,
                y: v.vy - 2 * d * n.vy
            }
        },
        dot: function (v1, v2) {
            return ( v1.vx * v2.vx ) + ( v1.vy * v2.vy );
        },
        normalize: function (v) {
            var len = this.getLength(v);
            v.vx /= len;
            v.vy /= len;
            return v;
        },
        getLength: function (v) {
            return Math.sqrt(v.vx * v.vx + v.vy * v.vy);
        },
        collision: function () {
            var ballAxis = attributes.ball.getAxis();
            var ballVectors = attributes.ball.getVectors();

            var playgroundDimension = attributes.playground.getDimension();
            var racketVector = attributes.racket.getVector();

            var racketAxis = attributes.racket.getAxis();
            var racketDimension = attributes.racket.getDimension();
            /**
             * Racket collision
             */
            if (attributes.user.getIsTurn()
                &&
                (ballAxis.x > racketAxis.x && ballAxis.x < racketAxis.x + racketDimension.width) //x coordinate
                &&
                (ballAxis.y < racketAxis.y && ballAxis.y > racketAxis.y - racketDimension.height) //y coordinate
            ) {
                var BD = racketAxis, // bod dotyku (poz. lopticky)
                    vR = racketVector, //vektor rakety
                    vL = ballVectors; // vektor lopticky

                var nvR = this.normalize(vR);
                var vL2 = this.reflect(vL, nvR);


                attributes.ball.setVectors(vL2.x, vL2.y);
                if (vL2.x == 0 && vL2.y == 0) {
                    attributes.ball.setVectors(1, 1);
                }
                //if (vL2.x == 0 && vL2.y == 0) {
                //    attributes.user.setIsTurn(true);
                //} else {
                //    attributes.user.setIsTurn(false);
                //}

                attributes.user.setIsTurn(false);
                return true;
            }

            if (ballAxis.y > playgroundDimension.h) {
                ballVectors.vy = -ballVectors.vy;
                ballAxis.y = playgroundDimension.h;
            }
            else if (ballAxis.y < 0) {
                ballVectors.vy = -ballVectors.vy;
                ballAxis.y = 0;
            }

            // If ball strikes the vertical walls, invert the
            // x-velocity vector of ball
            if (ballAxis.x > playgroundDimension.w) {
                ballVectors.vx = -ballVectors.vx;
                ballAxis.x = playgroundDimension.w;
            }

            else if (ballAxis.x < 0) {
                ballVectors.vx = -ballVectors.vx;
                ballAxis.x = 0;
            }

            //console.log(ballVectors.vx, ballVectors.vy);
            attributes.ball.setAxis(ballAxis.x, ballAxis.y);
            attributes.ball.setVectors(ballVectors.vx, ballVectors.vy);

            return false;
        }
    }
}
