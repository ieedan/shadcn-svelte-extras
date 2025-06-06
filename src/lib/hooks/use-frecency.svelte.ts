import { PersistedState } from 'runed';

type FrecencyItem = {
	uses: number;
	lastUsage: number;
};

type PersistedStateOptions<T> = ConstructorParameters<typeof PersistedState<T>>[2];

type FrecencyMap = Record<string, FrecencyItem>;

export class UseFrecency {
	#items: PersistedState<FrecencyMap>;

	constructor(
		key: string,
		initialValue: FrecencyMap = {},
		opts: PersistedStateOptions<FrecencyMap> = {}
	) {
		this.#items = new PersistedState<FrecencyMap>(key, initialValue, opts);

		this.use = this.use.bind(this);
	}

	use(key: string) {
		const item = this.#items.current[key];

		this.#items.current[key] = {
			uses: 1 + (item?.uses ?? 0),
			lastUsage: Date.now()
		};
	}

	get items() {
		return Array.from(Object.entries(this.#items.current))
			.sort(([_a, a], [_b, b]) => {
				if (a.uses > b.uses) return -1;

				if (b.uses > a.uses) return 1;

				return a.lastUsage - b.lastUsage;
			})
			.map(([key]) => key);
	}
}
