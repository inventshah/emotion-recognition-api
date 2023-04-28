# emotion-recognition-api

Library for recognizing emotions.

## Usage

### JavaScript

The [example](https://github.com/inventshah/emotion-recognition-api/tree/main/example) shows how to use the API with a camera.

Model weights are in `node_modules/emotion-recognition-api/models`. You should set them as static files on your server.

```js
import { TERGAN } from "emotion-recognition-api";

const model = new TERGAN(urlToModelJson);

const tensor = model.preprocess(imageData, boundingBox);
const emotion = model.run(tensor);
tensor.dispose();
```

## Citation

If you find the TER-GAN model useful in your research, please cite:

```bibtex
@INPROCEEDINGS{Ali:2021:TER,
	author={Ali, Kamran and Hughes, Charles E.},
	booktitle={2020 25th International Conference on Pattern Recognition (ICPR)},
	title={Facial Expression Recognition By Using a Disentangled Identity-Invariant Expression Representation},
	year={2021},
	pages={9460-9467},
	doi={10.1109/ICPR48806.2021.9412172}
}
```
