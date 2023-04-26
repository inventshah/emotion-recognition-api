import * as tf from "@tensorflow/tfjs";
import { BoundingBox, Emotion } from "../types";

export abstract class BaseEmotionNet {
	protected name: string;

	constructor(_name: string) {
		this.name = _name;
	}

	public abstract run(data: tf.Tensor4D): Emotion | undefined;

	toString() {
		return `EmotionNet: ${this.name}`;
	}
}

export function cropImage(
	data: ImageData,
	box: BoundingBox,
	shape: [number, number]
) {
	const image3d = tf.cast(tf.browser.fromPixels(data), "float32");
	const image4d = tf.expandDims<tf.Tensor4D>(image3d, 0);
	const cropped = tf.image.cropAndResize(
		image4d,
		[
			[
				box.yMin / data.height,
				box.xMin / data.width,
				box.yMax / data.height,
				box.xMax / data.width,
			],
		],
		[0],
		shape
	);
	return cropped;
}
