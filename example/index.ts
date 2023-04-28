import * as faceDetection from "@tensorflow-models/face-detection";
import { TERGAN } from "emotion-recognition-api";

const video = document.getElementById("webcam") as HTMLVideoElement;
const canvas = document.getElementById("overlay") as HTMLCanvasElement;
const vid2data = document.createElement("canvas") as HTMLCanvasElement;

function videoToImageData(video: HTMLVideoElement) {
	const width = video.videoWidth;
	const height = video.videoHeight;
	if (width === 0) return null;

	vid2data.width = width;
	vid2data.height = height;
	const ctx = vid2data.getContext("2d", { willReadFrequently: true });
	if (ctx === null) return null;
	ctx.drawImage(video, 0, 0, width, height);
	return ctx.getImageData(0, 0, width, height);
}

function draw(label: string, box) {
	const ctx = canvas.getContext("2d");
	if (ctx === null) return;
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle = "blue";
	ctx.rect(box.xMin, box.yMin, box.width, box.height);
	ctx.stroke();

	ctx.font = "bold 16px serif";
	ctx.fillStyle = "#efefef";
	ctx.fillText(label, box.xMin, box.yMin);
}

async function requestCamera() {
	if (video === null) return;
	const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
	video.srcObject = stream;
}

let detector: faceDetection.FaceDetector;
faceDetection
	.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
		runtime: "tfjs",
		modelType: "short",
		maxFaces: 1,
	})
	.then((d) => (detector = d));

const model = new TERGAN(
	"node_modules/emotion-recognition-api/models/TER/model.json"
);

function run() {
	const data = videoToImageData(video);

	if (data === null) return;
	const start = Date.now();
	detector.estimateFaces(data).then((results) => {
		if (results.length !== 0) {
			const cropped = model.preprocess(data, results[0].box);
			const emotion = model.run(cropped);
			cropped.dispose();
			const end = Date.now();
			const fps = Math.floor(1 / ((end - start) / 1000));
			draw(`${emotion} (fps: ${fps})`, results[0].box);
		}
		setTimeout(() => run());
	});
}

requestCamera();
video.onloadedmetadata = () => {
	run();
};
