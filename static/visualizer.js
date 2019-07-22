
var sketch = function(p){
    p.song; 
    p.amp;
    p.fft; 
    p.viz;
    p.cnv;
    p.pointer;

    p.fadetimer;

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
        p.fadetimer = setTimeout(function(){
        	p.song.setVolume(1);
        	p.song.setVolume(0,3);
        	p.song.stop(3);}, 12000);
        // p.fadein();
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
    

    p.fadeout = function(){
    	clearTimeout(p.fadetimer);
        p.song.setVolume(1);
        p.song.setVolume(0,3);
        p.song.stop(3);
    }
    
    
    p.setup = function(){
        p.cnv= p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL); //coordinate system changes with WEBGL 
        p.cnv.position(0,0);
        // puts canvas element in the background 
        p.cnv.style('z-index','-1');
        p.cnv.style('position','fixed');
        p.colorMode(myp5.RGB);
        p.pointer = 0;
        
        p.amp = new p5.Amplitude;
        p.amp.setInput(p.song);
        p.amp.smooth(0.8);
        
        p.fft = new p5.FFT(.5, 1024); //(smoothing, bit range)

        p.viz = new visualizer(); // cant use Vi
        p.fill=0;
    
    }
    
    p.draw = function(){
        
        // visualizer
        p.background(45);
        p.viz.render();


        // get amplitude
        var level = p.amp.getLevel();

        
        // p.viz.updatecirclesize(level);
       
        var size = level*1080;
        if (size <= 200){
        	size = 200;
        }

        p.viz.beatdetect(level,size);

        // p.rotateX(-myp5.PI/3); // undo rotation before drawing circle

        //circle
        p.translate(p.viz.x_offset*-1, p.viz.y_offset*-1);
        p.strokeWeight(10);
        p.stroke (255);

        // p.smooth();
        p.arc(0,0,size,size, 0, 2*myp5.PI,myp5.OPEN,50); 


        if (p.viz.beat){
        	p.pointer += 1;
        		p.arc(0,0,p.viz.array[p.pointer],p.viz.array[p.pointer],0,2*myp5.PI,myp5.OPEN,50);

        	}

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
        this.decay = .9;
        this.lastframe = 0; 

        this.d = 100;

        // turn on or off visualizer
        this.on = true;
        this.counter = 0;
        this.beat = false;
        this.array = [];
    }
    
    //draw function
    render(){
        
        if (this.on){
        	myp5.frameRate(30);

    //        //fly backward
    //        this.z_value.shift(); //remove array or row from the front
    //        this.z_value.push(this.avg_spectrum()); 

            /*fly foward & calulate z_value*/
            this.z_value.pop();
            this.z_value.unshift(this.avg_spectrum());

            myp5.noFill();
            myp5.strokeWeight(2);
            myp5.rotateX(myp5.PI/3);
            myp5.translate(this.x_offset,this.y_offset); // offset by a certain amount (manual offset might be faster)
            

          
            for (let y = 0; y<this.rows-1 ; y++){ // rows-1 with triangle strpip
                
                myp5.beginShape(myp5.LINES);
                for ( let x = 0; x<this.columes ; x++){  
                	

                	myp5.colorMode(myp5.HSB,100);

                	if (this.z_value[y][x]==0){	
                    	myp5.stroke(0,0,60);

                    }else{
                    	myp5.stroke(myp5.map(this.z_value[y][x],0,300,100,1),60,95);
                    }

                    myp5.vertex(x*this.scale, y*this.scale, this.z_value[y][x]);

                   myp5.vertex(x*this.scale, (y+1)*this.scale, this.z_value[y+1][x]);
                }
                
                myp5.endShape();

            }

            myp5.colorMode(myp5.RGB,255);
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

    /* Source for algorithm*/
    beatdetect(level,size){
        // amp level has to be bigger than cutoff but less than threshold
        if ((level > this.cutoff) && (level>this.threshold)){
            
            //if beat is detect run onbeat function
            this.onbeat(size);

            // increase amplitude cutoff
            this.cutoff = level *1.15;
            this.lastframe = 0; 
        }else{
        	if (this.lastframe <= this.hold){
        		this.lastframe++;
        	}
        	else{
        		this.cutoff *= this.decay; // lower cutoff by 10%
        		this.cutoff = Math.max(this.cutoff, this.threshold); // new cutoff
        	}
        }
    }
    
    onbeat(size){
        // runs when beat is detected
        console.log("THERE IS A BEAT");
        var t = size
        this.beat = true;
        this.array = [];
        myp5.pointer = 0; 
        for( let i = 0; i < 25; i ++){
        	this.array.push(t);
        	t += 100;
        }

    }



    
}//end Visuzlizer

