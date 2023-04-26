export type BoundingBox = {
	xMin: number;
	yMin: number;
	xMax: number;
	yMax: number;
};

export const emotions = [
	"neutral",
	"happy",
	"sad",
	"surprised",
	"fearful",
	"disgusted",
	"angry",
	"contempt",
] as const;
export type Emotion = (typeof emotions)[number];
