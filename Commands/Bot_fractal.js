

module.exports = {
    Bot_fractal : function(msg,args) {
        var obj =  new Fractal(msg,args);
        obj.Run();
        },
    Info : function() {
        return "Self Explanatory";
    }
    };
    
var jimp = require("jimp");

class  Fractal {
    constructor(msg,args) {
        this.message = msg;
        this.args = args;
        } 
    
    Run() {
        var zoom = 1.0;
        
        try {
            zoom = parseInt(args[0]);
        } catch (err) { };
        
        var image = new jimp(256, 256, function (err, image) { });
                
        var x,y;
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    // x, y is the position of this pixel on the image
    // idx is the position start position of this rgba tuple in the bitmap Buffer
    // this is the image
           var v = CheckIfBelongsToMandelbrotSet((x-128)/600,(y-128)/600);
           this.bitmap.data[ idx + 0 ] = v;
           this.bitmap.data[ idx + 1 ] = 0;
           this.bitmap.data[ idx + 2 ] = 0;
           this.bitmap.data[ idx + 3 ] = 255; });
       
       image.write("test.png"); 
    }
    }
    
    function CheckIfBelongsToMandelbrotSet(x, y) {
        var realComponentOfResult = x;
                var imaginaryComponentOfResult = y;
                var maxIterations = 100;
                for (var i = 0; i < maxIterations; i++) {
        var tempRealComponent = realComponentOfResult * realComponentOfResult
                - imaginaryComponentOfResult * imaginaryComponentOfResult
                + x;
                var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                + y;
                realComponentOfResult = tempRealComponent;
                imaginaryComponentOfResult = tempImaginaryComponent;
                // Return a number as a percentage
                if (realComponentOfResult * imaginaryComponentOfResult > 5) return (i / maxIterations * 100);
        }
        return 0; // Return zero if in set        
    }


    


           

