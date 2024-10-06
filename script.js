let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;
  }

  init(paper) {
    // Handle both touch and mouse events
    document.addEventListener('mousemove', (e) => this.handleMove(e, paper));
    document.addEventListener('touchmove', (e) => this.handleMove(e, paper));

    paper.addEventListener('mousedown', (e) => this.handleDown(e, paper));
    paper.addEventListener('touchstart', (e) => this.handleDown(e, paper));

    window.addEventListener('mouseup', () => this.handleUp());
    window.addEventListener('touchend', () => this.handleUp());
  }

  handleMove(e, paper) {
    e.preventDefault(); // Prevent scrolling on mobile

    // Determine if touch or mouse event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (!this.rotating) {
      this.mouseX = clientX;
      this.mouseY = clientY;

      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }

    if (this.holdingPaper) {
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }

  handleDown(e, paper) {
    e.preventDefault(); // Prevent any default touch behavior

    if (this.holdingPaper) return;
    this.holdingPaper = true;

    // Detect whether the event is a mouse or touch event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    paper.style.zIndex = highestZ;
    highestZ += 1;

    this.mouseTouchX = clientX;
    this.mouseTouchY = clientY;
    this.prevMouseX = clientX;
    this.prevMouseY = clientY;

    if (e.type === 'mousedown' || (e.touches && e.touches.length === 1)) {
      this.mouseTouchX = clientX;
      this.mouseTouchY = clientY;
    }

    if (e.button === 2 || (e.touches && e.touches.length > 1)) {
      this.rotating = true;
    }
  }

  handleUp() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
