import { Component } from '@angular/core';

declare var OpenSeadragon: any;
declare var fabric: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi primera app';
  viewer: any;
  dibujar = false
  lineHeight = 1

  constructor() {

  }

  ngOnInit() {
    this.viewer = OpenSeadragon({
      id: "openseadragon1",
      prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@2.3/build/openseadragon/images/",
      tileSources: "/assets/map.dzi"
    })
    

    // initialize overlay
    let options = {
      scale: 1000
    }

    let overlay = this.viewer.fabricjsOverlay(options)

    let pointer1: any
    let pointer2: any
    let line: any
    let isDown = false

    overlay.fabricCanvas().on('mouse:down', (options) => {
      if (!this.dibujar) return;

      let pointer = overlay.fabricCanvas().getPointer(options.e)

      if (isDown) {
        console.log('weey');
        line.set({ x2: pointer.x, y2: pointer.y })
        isDown = false
      } else {
        isDown = true;
        let points = [pointer.x, pointer.y, pointer.x, pointer.y];
        line = new fabric.Line(
          points,
          {
            strokeWidth: this.lineHeight,
            stroke: 'red',
            selectable: false
          });

        overlay.fabricCanvas().add(line);
      }

    });
    overlay.fabricCanvas().on('mouse:move', (options) => {
      if (!this.dibujar) return;
      if (!isDown) return;
      let pointer = overlay.fabricCanvas().getPointer(options.e)

      line.set({ x2: pointer.x, y2: pointer.y });
      overlay.fabricCanvas().renderAll()

    })

    overlay.fabricCanvas().on('mouse:up', (options) => {
      if (!this.dibujar) return;
      console.log('up')
      isDown = false
    })
  }

  handleButton () {
    this.dibujar = !this.dibujar
    console.log(this.dibujar)
  }

  handleChange(event: any) {
    this.lineHeight = event.value
  }
}
