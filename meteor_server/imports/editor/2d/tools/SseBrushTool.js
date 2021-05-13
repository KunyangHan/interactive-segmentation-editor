import SseTool from "./SseTool";
import Paper from "paper";

export default class SseBrushTool extends SseTool{
    constructor(editor) {
        super(editor);
        this.pixels = [];

        this.cursor = "crosshair";
        this.bindCallbacks();
    }

    finish() {
        this.pixels = [];
    }

    add(x, y, isRight) {
        x = Math.floor(x);
        y = Math.floor(y);
        let r = this.editor.brushSize;
        let r2 = r * r;
        let temp = [];
        for (var i = -r; i <= r; i++) {
            for (var j = -r; j <= r; j++) {
                if (i * i + j * j > r2) {
                    continue;
                }
                var offset = 4 * ((y + i) * this.editor.imageWidth + (x + j));
                temp.push(offset);
            }
        }
        this.editor._updateAnnotation(temp, isRight);
    }

    onMouseDown(event) {
        let isRight = false;
        if (!this.isLeftButton(event))
            isRight = true;

        const point = this.editor.rasterLayer.globalToLocal(this.editor.keepPointInsideRaster(event.point));

        this.add(point.x, point.y, isRight);
    }

    onMouseDrag(event) {
        let isRight = false;
        if (!this.isLeftButton(event))
            isRight = true;

        const point = this.editor.rasterLayer.globalToLocal(event.point);
        this.add(point.x, point.y, isRight);
    }

    onMouseUp(event) {
        let isRight = false;
        if (!this.isLeftButton(event))
            isRight = true;

        const point = this.editor.rasterLayer.globalToLocal(event.point);
        this.add(point.x, point.y, isRight);
        this.finish();
    }
}