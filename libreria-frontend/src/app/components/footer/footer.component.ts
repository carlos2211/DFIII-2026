import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  template: `
    <footer class="footer">
      <div class="container text-center">
        <p class="mb-1">📚 <strong>LibreríaOnline</strong> — Tu librería digital</p>
        <p class="mb-0 small text-muted">© {{ year }} Todos los derechos reservados | Desarrollo Full Stack III</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #1a1a2e, #0f3460);
      color: rgba(255,255,255,0.75);
      padding: 20px 0;
      margin-top: auto;
    }
    strong { color: #e94560; }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
