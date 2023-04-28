import * as tf from "@tensorflow/tfjs";

import { BoundingBox, emotions } from "../types";
import { BaseEmotionNet, cropImage } from "./base";

export class TERGAN extends BaseEmotionNet {
	protected recognition: tf.GraphModel | null = null;
	constructor(url: string) {
		super("TER-GAN");
		tf.loadGraphModel(url, {
			fromTFHub: false,
		})
			.then((model) => (this.recognition = model))
			.catch(() => console.log(`Could not load TER-GAN model ${url}`));
	}

	public preprocess(data: ImageData, box: BoundingBox): tf.Tensor4D {
		return tf.tidy(() => {
			const cropped = cropImage(data, box, [224, 224]);
			const channelsFirst = tf.transpose(cropped, [0, 3, 1, 2]);
			return tf.div(channelsFirst, 255);
		});
	}

	public run(data: tf.Tensor4D) {
		if (this.recognition === null) return;
		return tf.tidy(() => {
			if (this.recognition === null) return;
			const out = this.recognition.execute(data) as tf.Tensor;
			const best = tf.argMax(tf.softmax(out), 1).arraySync() as [number];
			return emotions[best[0]];
		});
	}
}
