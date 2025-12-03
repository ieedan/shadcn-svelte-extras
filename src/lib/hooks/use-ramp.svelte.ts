export type UseRampOptions = {
	/** The function to call to increment the value */
	increment: () => void;
	/**
	 * The maximum amount of time it should take to increment the value by 1 in milliseconds
	 * @default 200
	 */
	maxFrequency?: number;
	/**
	 * The minimum amount of time it should take to increment the value by 1 in milliseconds
	 * @default 25
	 */
	minFrequency?: number;
	/**
	 * The amount of time to wait in milliseconds before starting to ramp up.
	 * @default 100
	 */
	startDelay?: number;
	/**
	 * The amount of time it should take to ramp up to the minimum frequency
	 * @default 2500
	 */
	rampUpTime?: number;
	/** A function to determine whether the value can be incremented. When false the ramp will be reset. */
	canRamp: () => boolean;
};

export function useRamp({
	increment,
	maxFrequency = 200,
	minFrequency = 25,
	startDelay = 100,
	rampUpTime = 2500,
	canRamp
}: UseRampOptions) {
	let active = $state(false);
	let rampStartTimeout: ReturnType<typeof setTimeout> | undefined;
	let rampIntervalTimeout: ReturnType<typeof setTimeout> | undefined;
	let rampStartedAt: number | undefined;

	function rampUp() {
		if (!active) return;
		const timeSinceStart = Date.now() - (rampStartedAt ?? 0);
		const freq = rampUpTime === 0 ? 0 : Math.min(timeSinceStart, rampUpTime) / rampUpTime;
		if (!canRamp()) {
			reset();
			return;
		}
		increment();
		rampIntervalTimeout = setTimeout(
			() => rampUp(),
			maxFrequency - freq * (maxFrequency - minFrequency)
		);
	}

	function reset() {
		clearTimeout(rampStartTimeout);
		clearTimeout(rampIntervalTimeout);
		rampStartedAt = undefined;
		active = false;
	}

	function start() {
		active = true;
		rampStartedAt = Date.now();
		rampStartTimeout = setTimeout(() => rampUp(), startDelay);
	}

	return {
		start,
		reset,
		get active() {
			return active;
		}
	};
}
