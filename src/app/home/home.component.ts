import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Create a 40x4 grid (160 images)
  images = Array.from({ length: 160 }, () => '');
  imageStates = Array(160).fill({ loading: false, url: '' });
  abortController = new AbortController();

  async fetchImage(index: number) {
    if (this.imageStates[index].loading || this.imageStates[index].url) return;

    this.imageStates[index] = { loading: true, url: '' };
    try {
      const response = await fetch(
        `https://picsum.photos/400/300?random=${index + 1}`,
        { signal: this.abortController.signal }
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      this.imageStates[index] = { loading: false, url };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Fetch aborted for image', index);
      } else {
        console.error('Error loading image:', error);
      }
      this.imageStates[index] = { loading: false, url: '' };
    }
  }

  abortRequests() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}
