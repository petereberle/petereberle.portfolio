import themeColorsSets from "../../../theme/theme-colorset"

export default function Sketch({p5, renderRef, resize}) {

    var   x,
          speed = 5,
          t = 0,
          a,
          b,
          parent = {
            elem: renderRef.current,
            width: renderRef.current.offsetWidth,
            height: renderRef.current.offsetHeight
          }

    var   yoff = 0.0,
          cappedFirst = parent.height*.5,
          cappedSecond = parent.height*.85;

    new p5(p => {

        p.setup = () => {
            p.createCanvas(parent.width, parent.height).parent(parent.elem);
        }

        p.windowResized = () => {

          p.resizeCanvas(renderRef.current.offsetWidth, renderRef.current.offsetHeight)

          parent = {
            elem: renderRef.current,
            width: renderRef.current.offsetWidth,
            height: renderRef.current.offsetHeight
          }

        }

        p.draw = () => {

          // p.start();
          p.clear();
          p.fill('#ffffff');
          p.beginShape(); 
          p.stroke(themeColorsSets.border_color);
          p.strokeWeight(themeColorsSets.border_width);

          var xoff = 0;       // Option #1: 2D Noise
          
            // Iterate over horizontal pixels
          for (var x = 0; x <= parent.width+20; x += 10) {

            // Calculate a y value according to noise, map to 
            var y = p.map(p.noise(yoff, xoff), 0, 1, cappedFirst, cappedSecond);
            
            // Set the vertex
            p.vertex(x, y); 
            // Increment x dimension for noise
            xoff += 0.05;

          }

          // increment y dimension for noise

          yoff += 0.01;

          p.vertex(parent.width+themeColorsSets.border_width, 0-themeColorsSets.border_width);

          p.vertex(-themeColorsSets.border_width, 0-themeColorsSets.border_width);

          p.endShape();

        }
    })


  }