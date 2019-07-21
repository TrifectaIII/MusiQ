
var sketch = function(p){
    p.song; 
    p.amp;
    p.fft; 
    p.viz;
    p.cnv;

      
    p.whileloading = function(completion){
        // draws a loading circle
        // console.log("loading");
        // p.strokeWeight(10);
        // p.stroke (255);
        // p.arc(0,0,500,500, 0, 360*completion);       
    }
    
    p.load_success = function(){
        console.log("File loaded properly");
        p.song.playMode('restart'); //dont need stop 

        p.song.play(); // does not work on chrome 
        p.fadein();
    }
    
    p.load_fail = function(){
        console.log("File didn't load");
    }
    
    p.loadsong = function(file){
        p.song = p.loadSound(file,p.load_success,p.load_fail,p.whileloading);
    }
    
    p.stopsong = function(){
        p.fadeout();
    }
    
    
    p.fadein = function(){
        p.song.setVolume(1); 
        // p.song.setVolume(1, 3); // fade volume to 0.7 in 2 secs
    }
    
    p.fadeout = function(){
        p.song.setVolume(1);
        p.song.setVolume(0,3);
    }
    
    
    p.setup = function(){
        p.cnv= p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL); //coordinate system changes with WEBGL 
        p.cnv.position(0,0);
        // puts canvas element in the background 
        p.cnv.style('z-index','-1');
        p.cnv.style('position','fixed');
        
        p.amp = new p5.Amplitude;
        p.amp.setInput(p.song);
        p.amp.smooth(0.8);
        
        p.fft = new p5.FFT(.5, 1024); //(smoothing, bit range)

        p.viz = new visualizer(); // cant use Vi
    
    }
    
    p.draw = function(){
        
        // visualizer
        p.background(45);
        p.viz.render();

        //circle
        p.translate(p.viz.x_offset*-1, p.viz.y_offset*-1);
        p.rotateX(-myp5.PI/3);
        p.strokeWeight(10);
        p.stroke (255);
        p.arc(0,0,500,500, 0, 2*myp5.PI,myp5.OPEN,50);     
    }
    
    p.windowResized= function(){
        p.resizeCanvas(p.windowWidth,p.windowHeight);
    }
}

var myp5 = new p5(sketch);


class visualizer{
    
    constructor(){
        this.scale = 20; 
        this.columes = myp5.floor(myp5.windowWidth/this.scale);
        this.rows = myp5.floor(myp5.windowHeight/this.scale); 
//        console.log("columes: ", this.columes, "rows:", this.rows);
        this.x_offset = -(myp5.windowWidth/2);
        this.y_offset = -(myp5.windowHeight/2);
        this.z_value = Array(this.rows).fill(Array(this.columes).fill(0)); // all zeros
//        console.log("z-matrix:",this.z_value, "end");
//        console.log("visualizer initialize success");
        
        this.hold = 30; 
        this.threshold = 0.12;
        this.cutoff = 0;
        this.decay = .98;
        this.lastframe = 0; 


        this.on = true;
        
    }
    
    //draw function
    render(){
        
        
        if (this.on){

    //        //fly backward
    //        this.z_value.shift(); //remove array or row from the front
    //        this.z_value.push(this.avg_spectrum()); 

            /*fly foward & calulate z_value*/
            this.z_value.pop();
            this.z_value.unshift(this.avg_spectrum());

            myp5.noFill();
            myp5.strokeWeight(7);
            myp5.rotateX(myp5.PI/3);
            myp5.translate(this.x_offset,this.y_offset); // offset by a certain amount (manual offset might be faster)
            

           // myp5.frameRate(30);


            for (let y = 0; y<this.rows-1 ; y++){ // rows-1 with triangle strpip
                
                myp5.beginShape(myp5.POINTS);
                for ( let x = 0; x<this.columes ; x++){  
                    myp5.stroke(this.get_color(this.z_value[y][x]));

                    myp5.vertex(x*this.scale, y*this.scale, this.z_value[y][x]);

    //                vertex(x*this.scale, (y+1)*this.scale, this.z_value[y+1][x]);
                }
                
                myp5.endShape();

            }
        }

    }
    
    // helper function 
    avg_spectrum(){
        let temp = [];

        myp5.fft.analyze();
        // magic number 10 is to skip every other 10 element 
        for ( let i = 1; i < 1024; i += 10 ){
            temp.push( myp5.map(myp5.fft.getEnergy(i,i+10), 0,255,0,300 )  );
        }
        return temp;

    }   

    beatdetect(level){
        
        // amp level has to be bigger than cutoff but less than threshold
        if ((level > this.cutoff) && (level>this.threshold)){
            
            //if beat is detect run onbeat function
            this.onBeat()
        }
    }
    
    onbeat(){
        
    }
    
    // helper function 
    get_color(z){
        
        if (z >= 200){
            return "#f6efef"; // white 
        }


        if (z >= 180){

            return "#d93030"; // red 
        }

        if(z>= 160){
            return  "#d65e27"; //orange
        }

        if(z >= 140){
            return "#e7eb2d"; //yellow 
        }

        if (z >= 120){
            return "#a5eb2d"; // greenish
        }

        if(z >= 100){
            return "#30eb2d"; //deeper green

        }

        if(z >= 80){
            return "#2debd5"; // sky blue 
        }

        if (z >= 60){
            return "#2d79eb"; // dark blue 
        }

        if (z >= 40){
            return "432deb"; // dark purle blue
        }else{
            return "#4c4b52"; //grey
        }

    }
    
}//end Visuzlizer

