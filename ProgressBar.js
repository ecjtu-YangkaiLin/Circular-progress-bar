class ProgressBar {
    constructor(id){
        this.mainDiv = document.getElementById(id);
        this.mainDiv.innerHTML = "<canvas id=\"ProgressBar_canvas\"></canvas><div style=\"position: absolute;white-space: pre;text-align: center;word-break: normal;word-wrap: break-word;\" id=\"ProgressBar_content\"></div>";
        this.canvas = document.getElementById('ProgressBar_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.content = document.getElementById('ProgressBar_content');
        this.x = 0;
        this.y = 0;
        this.lineWidth = 8;
        this.radius = 0;
        this.startAngle = -90 * (Math.PI/180);
        this.animate = {
            beginValues: 0,
            changeValues: 0,
            currentValues: 0,
            currentTime: 0,
            duration: 0,
            interval: 5
        };
    }
    init(Values, duration, interval, format, fontSize) {
        let css = window.getComputedStyle(this.mainDiv);
        this.canvas.width = parseInt(css.getPropertyValue('width').replace('px', ''));
        this.canvas.height = parseInt(css.getPropertyValue('height').replace('px', ''));
        this.x = this.canvas.width / 2;
        this.y = this.canvas.width / 2;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = 'round';
        this.animate.beginValues = this.animate.currentValues;
        this.animate.changeValues = Values > 100 ? 360 - this.animate.currentValues : Values * 3.6 - this.animate.currentValues;
        this.animate.duration = duration;
        this.animate.currentTime = 0;
        this.animate.interval = interval;
        this.format = format;
        //let offset
        let offset = this.lineWidth / 2, l = 0;
        this.content.style.opacity = "0";
        this.content.innerText = this.format;
        this.content.style.fontSize = fontSize;
        if(this.canvas.width > this.canvas.height){
            this.radius = this.canvas.height / 2 - this.lineWidth / 2;
            l = this.canvas.height / 1.414213562373095 - this.lineWidth * 1.5;
            offset += (this.canvas.height - this.canvas.height / 1.414213562373095) / 2;
            this.content.style.width = l + 'px';
            this.content.style.top = ((l - this.content.offsetHeight) / 2 + offset) + 'px';
            //this.content.style.height = l + 'px';

        }else{
            this.radius = this.canvas.width / 2 - this.lineWidth / 2;
            offset += (this.canvas.width - this.canvas.width / 1.414213562373095) / 2;
            l = this.canvas.width / 1.414213562373095 - this.lineWidth * 1.5;
            this.content.style.width = l + 'px';
            this.content.style.top = ((l - this.content.offsetHeight) / 2 + offset) + 'px';
        }
        this.content.style.left = offset + 'px';
        this.content.style.opacity = "1";
        this.draw();
    }
    draw() {
        let r,g,b;
        if(this.animate.currentValues <= 252){
            let t = this.animate.currentValues / 252;
            r = Math.floor(102 + (153 * t));
            g = Math.floor(255 - (51 * t));
            b = 102;
        }else{
            let t = 1 - (360 - this.animate.currentValues) / 108;
            r = 255;
            g = Math.floor(204 - (124 * t));
            b = Math.floor(102 - (22 * t));
        }

        if(this.animate.currentTime + this.animate.interval > this.animate.duration) {
            this.animate.currentTime = this.animate.duration;
        }else{
            this.animate.currentTime += this.animate.interval;
        }

        if(this.animate.currentTime > this.animate.duration){
            this.animate.currentTime = this.animate.duration;
        }
        this.animate.currentValues = easeInOutQuint(0, this.animate.currentTime, this.animate.beginValues, this.animate.changeValues, this.animate.duration);
        this.ctx.strokeStyle = '#e6e6e6';
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        //--------------------------draw background-------------------------
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, this.startAngle, 2 * Math.PI);
        this.ctx.stroke();
        //------------------------------------------------------------------
        this.ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, this.startAngle, (this.animate.currentValues - 90) * (Math.PI/180));
        this.ctx.stroke();
        this.content.innerText = this.format.replace('%s', (this.animate.currentValues / 3.6).toFixed(2));
        if(this.animate.currentTime < this.animate.duration){
            setTimeout(() =>{this.draw()}, this.animate.interval);
        }
    }
}
