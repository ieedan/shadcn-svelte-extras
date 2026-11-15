import type { CropArea } from 'svelte-easy-crop';

export const getFileFromUrl = async (url: string, fileName?: string): Promise<File> => {
	// Fetch the file data from the URL
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
	}

	// Convert the response into a Blob
	const blob = await response.blob();

	// Create and return a File, named after its format unless a name is given
	return new File([blob], fileName ?? `cropped.${blob.type.replace('image/', '')}`, {
		type: blob.type
	});
};

const createImage = (url: string): Promise<HTMLImageElement> => {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});
};

/** Gets the cropped image from the src using the cropped area
 *
 * @param imageSrc
 * @param pixelCrop
 * @param type
 * @param quality
 * @returns
 */
export const getCroppedImg = async (
	imageSrc: string,
	pixelCrop: CropArea,
	type: string,
	quality?: number
): Promise<string> => {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Error getting 2d rendering context');
	}

	const { x, y, width, height } = pixelCrop;

	canvas.width = width;
	canvas.height = height;

	// draw only the cropped area
	ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

	return new Promise((resolve) => {
		// encodes the passed in type directly, falling back to PNG if the browser can't encode it
		// https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/toBlob
		canvas.toBlob(
			(file) => {
				resolve(URL.createObjectURL(file!));
			},
			type,
			quality
		);
	});
};
