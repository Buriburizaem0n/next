(function cherry() {
    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = {x: width/2, y: width/2};
    var particles = [];
    
    function init() {
      bindEvents();
      loop();
    }  
    // Bind events that are needed
    function bindEvents() {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchstart', onTouchMove);
      
      window.addEventListener('resize', onWindowResize);
    }  
    function onWindowResize(e) {
      width = window.innerWidth;
      height = window.innerHeight;
    } 
    function onTouchMove(e) {
      if( e.touches.length > 0 ) {
        for( var i = 0; i < e.touches.length; i++ ) {
          addParticle( e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
        }
      }
    }
    function onMouseMove(e) {
      console.log("Mouse X:", e.clientX, "Mouse Y:", e.clientY);  // 调试输出
  
      var offsetX = 0;
      var offsetY = 0;

      cursor.x = e.clientX - offsetX;
      cursor.y = e.clientY - offsetY;
  
      addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
  }  
    function addParticle(x, y, color) {
      var particle = new Particle();
      particle.init(x, y, color);
      particles.push(particle);
    }
    function updateParticles() {
      for( var i = 0; i < particles.length; i++ ) {
        particles[i].update();
      }
      for( var i = particles.length -1; i >= 0; i-- ) {
        if( particles[i].lifeSpan < 0 ) {
          particles[i].die();
          particles.splice(i, 1);
        }
      }
    }
    function loop() {
      requestAnimationFrame(loop);
      updateParticles();
    }
    function Particle() {
      this.character = "*";
      this.lifeSpan = 120; //ms
      this.initialStyles = {
        "position": "fixed",
        "top": "0",
        "display": "block",
        "pointerEvents": "none",
        "z-index": "10000000",
        "fontSize": "20px",
        "will-change": "transform"
      };
      this.init = function(x, y, color) {
        this.velocity = {
          x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
          y: 1
        };
        // 动态调整偏移量，如果页面有其他影响鼠标位置的元素，可以加到这里
        var offsetX = 0; // 如果有水平偏移，可以在此调整
        var offsetY = 0; // 如果有垂直偏移，可以在此调整
        
        this.position = {x: x + offsetX, y: y + offsetY};
        this.initialStyles.color = color;
  
        this.element = document.createElement('span');
        this.element.innerHTML = this.character;
        applyProperties(this.element, this.initialStyles);
        this.update();
        
        document.body.appendChild(this.element);
      };
      this.update = function() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
        this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
      }
      this.die = function() {
        this.element.parentNode.removeChild(this.element);
      }
  }
    function applyProperties( target, properties ) {
      for( var key in properties ) {
        target.style[ key ] = properties[ key ];
      }
    }
    init();
  })();