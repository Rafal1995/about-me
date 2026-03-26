import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  signal,
  viewChild, inject,
} from '@angular/core';
import { ThemeService } from '../../theme.service';

type Particle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
};

@Component({
  selector: 'app-interactive-background',
  standalone: true,
  templateUrl: "./interactive-background.html",
  styleUrl: "./interactive-background.scss",
})
export class InteractiveBackgroundComponent {
  themeService = inject(ThemeService);
  canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  mouse = signal({
    x: 0,
    y: 0,
  });

  particles = signal<Particle[]>([]);
  particleColor = computed(() => {
    const theme = this.themeService.theme();
    const styles = getComputedStyle(
      document.documentElement
    );
    return styles
      .getPropertyValue('--color-particles')
      .trim()
  })
  particleLineColor = computed(() => {
    const theme = this.themeService.theme();
    const styles = getComputedStyle(
      document.documentElement
    );
    return styles
      .getPropertyValue('--color-particles-line')
  })

  particleCount = computed(() => {
    const width = window.innerWidth;

    if (width < 768) return 60;

    return 140;
  });

  ctx?: CanvasRenderingContext2D;

  constructor() {
    afterNextRender(() => {
      this.initCanvas();
      this.createParticles();
      this.animate();

      window.addEventListener(
        'resize',
        this.resizeCanvas
      );
    });

    effect(() => {
      console.log(
        'Particles:',
        this.particles().length
      );
    });
  }

  initCanvas() {
    const canvas = this.canvasRef()?.nativeElement;

    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.ctx = canvas.getContext('2d')!;
  }

  resizeCanvas = () => {
    const canvas = this.canvasRef()?.nativeElement;

    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.createParticles();
  };

  createParticles() {

    const newParticles: Particle[] = [];

    for (let i = 0; i < this.particleCount(); i++) {

      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,

        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,

        size: Math.random() * 2 + 1,
      });
    }

    this.particles.set(newParticles);
  }

  onMouseMove(event: MouseEvent) {
    this.mouse.set({
      x: event.clientX,
      y: event.clientY,
    });
  }

  animate = () => {

    requestAnimationFrame(this.animate);

    const canvas = this.canvasRef()?.nativeElement;

    if (!canvas || !this.ctx) return;

    this.ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const mouse = this.mouse();

    for (const particle of this.particles()) {

      particle.x += particle.dx;
      particle.y += particle.dy;

      if (
        particle.x < 0 ||
        particle.x > canvas.width
      ) {
        particle.dx *= -1;
      }

      if (
        particle.y < 0 ||
        particle.y > canvas.height
      ) {
        particle.dy *= -1;
      }

      const distance = Math.hypot(
        mouse.x - particle.x,
        mouse.y - particle.y
      );

      if (distance < 120) {

        particle.x +=
          (particle.x - mouse.x) * 0.015;

        particle.y +=
          (particle.y - mouse.y) * 0.015;
      }

      this.ctx.beginPath();

      this.ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );

      this.ctx.fillStyle = this.particleColor();

      this.ctx.fill();
    }

    this.connectParticles();
  };

  connectParticles() {

    if (!this.ctx) return;

    const particles = this.particles();

    for (let i = 0; i < particles.length; i++) {

      for (let j = i + 1; j < particles.length; j++) {

        const a = particles[i];
        const b = particles[j];

        const distance = Math.hypot(
          a.x - b.x,
          a.y - b.y
        );

        if (distance < 120) {

          this.ctx.beginPath();

          this.ctx.moveTo(a.x, a.y);

          this.ctx.lineTo(b.x, b.y);

          const opacity = 1 - distance / 120;
          const hexOpacity = Math.round(opacity * 255).toString(16);
          this.ctx.strokeStyle = `${this.particleLineColor()}${hexOpacity}`;

          this.ctx.lineWidth = 0.5;

          this.ctx.stroke();
        }
      }
    }
  }
}
